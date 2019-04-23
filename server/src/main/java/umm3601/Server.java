package umm3601;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.utils.IOUtils;
import umm3601.ride.RideController;
import umm3601.ride.RideRequestHandler;
import umm3601.user.UserController;
import umm3601.user.UserRequestHandler;

import java.io.FileReader;
import java.io.InputStream;
import java.io.File;

import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;


import static spark.Spark.*;
import static spark.debug.DebugScreen.enableDebugScreen;
import org.json.*;
import umm3601.vehicles.VehicleController;
import umm3601.vehicles.VehicleRequestHandler;


public class Server {

  private static final int serverPort=4567;

  private static final String databaseName = "dev";

  public static void main(String[] args) {

    MongoClient mongoClient = new MongoClient();
    MongoDatabase Database = mongoClient.getDatabase(databaseName);

    RideController rideController = new RideController(Database);
    UserController userController = new UserController(Database);
    VehicleController vehicleController = new VehicleController(Database);


    RideRequestHandler rideRequestHandler = new RideRequestHandler(rideController);
    UserRequestHandler userRequestHandler = new UserRequestHandler(userController);
    VehicleRequestHandler vehicleRequestHandler = new VehicleRequestHandler(vehicleController);

    //Configure Spark
    port(serverPort);
    enableDebugScreen();

    // Specify where assets like images will be "stored"
    staticFiles.location("/public");

    options("/*", (request, response) -> {

      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }

      String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }

      return "OK";
    });

    before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

    // Redirects for the "home" page
    redirect.get("", "/");

    Route clientRoute = (req, res) -> {
	  InputStream stream = Server.class.getResourceAsStream("/public/index.html");
	  return IOUtils.toString(stream);
    };

    get("/", clientRoute);

    /// Ride Endpoints ///////////////////////////
    /////////////////////////////////////////////

    get("api/rides", rideRequestHandler::getRides);
    //    get("api/rides/:destination", rideRequestHandler::getRideJSON);
    post("api/rides/new", rideRequestHandler::addNewRide);
    post("api/rides/update", rideRequestHandler::updateRide);
    post("api/rides/remove", rideRequestHandler::deleteRide);

    get("api/user", userRequestHandler::getUsers);

    get("api/vehicles", vehicleRequestHandler::getVehicles);
    post("api/vehicles/new", vehicleRequestHandler::addNewVehicle);



    post("api/login", (req, res) -> {

        JSONObject obj = new JSONObject(req.body());
        String authCode = obj.getString("code");

      try {
        File file = new File("src/main/java/umm3601/server_files/clientSF.json");
        String path = file.getAbsolutePath();
        System.out.println("The path: "+ path);
        String CLIENT_SECRET_FILE = path;

        GoogleClientSecrets clientSecrets =
          GoogleClientSecrets.load(
            JacksonFactory.getDefaultInstance(), new FileReader(CLIENT_SECRET_FILE));


        GoogleTokenResponse tokenResponse =
          new GoogleAuthorizationCodeTokenRequest(
            new NetHttpTransport(),
            JacksonFactory.getDefaultInstance(),
            "https://oauth2.googleapis.com/token",
            clientSecrets.getDetails().getClientId(),

            // Replace clientSecret with the localhost one if testing
            //Your top level domain. Must match "redirect_uris" field in credentials.json. Must be https. No port.
            clientSecrets.getDetails().getClientSecret(),
            authCode,
            "http://localhost:9000")

            //Not sure if we have a redirectUri

            // Specify the same redirect URI that you use with your web
            // app. If you don't have a web version of your app, you can
            // specify an empty string.
            .execute();


        // Get profile info from ID token
          GoogleIdToken idToken = tokenResponse.parseIdToken();
          GoogleIdToken.Payload payload = idToken.getPayload();
          String userId = payload.getSubject();     // Use this value as a key to identify a user.
          String email = payload.getEmail();
          boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
          String name = (String) payload.get("name");
          String pictureUrl = (String) payload.get("picture");
          String locale = (String) payload.get("locale");
          String familyName = (String) payload.get("family_name");
          String givenName = (String) payload.get("given_name");

          // Debugging Code
          System.out.println("---------------------------");
          System.out.println("UserID is " + userId);
          System.out.println("Email is " + email);
          System.out.println("Is Email verified? " + emailVerified);
          System.out.println("Name is " + name);
          System.out.println("Picture Url is " + pictureUrl);
          System.out.println("Locale is " + locale);
          System.out.println("familyName is " + familyName);
          System.out.println("givenName is " + givenName);
          System.out.println("---------------------------");

          return userController.addNewUser(userId, email, name, pictureUrl, familyName, givenName);

        } catch (Exception e) {
          System.out.println(e);
        }

        return "";
      });



    // An example of throwing an unhandled exception so you can see how the
    // Java Spark debugger displays errors like this.
    get("api/error", (req, res) -> {
      throw new RuntimeException("A demonstration error");
    });

    // Called after each request to insert the GZIP header into the response.
    // This causes the response to be compressed _if_ the client specified
    // in their request that they can accept compressed responses.
    // There's a similar "before" method that can be used to modify requests
    // before they they're processed by things like `get`.
    after("*", Server::addGzipHeader);

    get("/*", clientRoute);

    // Handle "404" file not found requests:
    notFound((req, res) -> {
      res.type("text");
      res.status(404);
      return "Sorry, we couldn't find that!";
    });
  }

  // Enable GZIP for all responses
  private static void addGzipHeader(Request request, Response response) {
    response.header("Content-Encoding", "gzip");
  }
}
