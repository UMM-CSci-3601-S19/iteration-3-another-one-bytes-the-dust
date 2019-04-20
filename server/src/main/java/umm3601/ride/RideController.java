package umm3601.ride;

import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Iterator;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.*;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Sorts.*;
import org.bson.conversions.Bson;




public class RideController {

  private final MongoCollection<Document> rideCollection;

  public RideController(MongoDatabase database) {
    rideCollection = database.getCollection("Rides");
  }

  String getRide(String id) {
    FindIterable<Document> jsonRides = rideCollection.find(eq("_id", new ObjectId(id)));

    Iterator<Document> iterator = jsonRides.iterator();
    if (iterator.hasNext()) {
      Document ride = iterator.next();
      return ride.toJson();
    } else {
      // We didn't find the desired ride
      return null;
    }
  }

  // Method for appending the filterDoc in getRides for strings
  private Document appendFilterDocString(Map<String, String[]> appendParams, String targetString, Document appendDoc){
    String targetContent = (appendParams.get(targetString)[0]);
    Document contentRegQuery = new Document();
    contentRegQuery.append("$regex", targetContent);
    contentRegQuery.append("$options", "i");
    appendDoc = appendDoc.append(targetString, contentRegQuery);
    return appendDoc;
  }
  // Method for appending the filterDoc in getRides for booleans
  private Document appendFilterDocBoolean(Map<String, String[]> appendParams, String appendBoolean, Document appendDoc){
    String targetContent = (appendParams.get(appendBoolean)[0]);
    System.out.println("test string");
    System.err.println("This is the targetContent " + targetContent);
    Boolean targetBoolean = Boolean.parseBoolean(targetContent);
    System.err.println("This is the targetBoolean " + targetBoolean);
    Document contentRegQuery = new Document();
    contentRegQuery.append("$regex", targetContent);
    contentRegQuery.append("$options", "i");
    appendDoc = appendDoc.append(appendBoolean, contentRegQuery);
    return appendDoc;
  }

  //Method for getting Rides from the database
  String getRides(Map<String, String[]> queryParams){
    Document filterDoc = new Document();

    System.err.println("I got to ride Controller");

    //the following _id filter was added by Mitchell, it might have unintended consequences, so be wary
    if (queryParams.containsKey("_id")) {
      String key = "_id";
      filterDoc = appendFilterDocString(queryParams, key, filterDoc);
    }
    System.err.println("I got past the _id filter");


    if (queryParams.containsKey("destination")) {
      String key = "destination";
      filterDoc = appendFilterDocString(queryParams, key, filterDoc);
    }
    System.err.println("I got past destination");

    if (queryParams.containsKey("origin")) {
      String key = "origin";
      filterDoc = appendFilterDocString(queryParams, key, filterDoc);
    }
    System.err.println("I got past origin");

    if (queryParams.containsKey("departureDate")) {
      String targetContent = queryParams.get("departureDate")[0];
      System.err.println("this is the targetContent before parse is " + targetContent);
      String targetContent2 = parseDateController(targetContent);
      System.err.println("this is the targetContent after parsing " + targetContent2);
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetContent);
      contentRegQuery.append("$options", "i");
      System.err.println("this is the content reg " + contentRegQuery);
      filterDoc = filterDoc.append("departureDate", contentRegQuery);
      System.err.println("this is the filter Doc in date " + contentRegQuery);
    }
    System.err.println("I got past departureDate");

    if (queryParams.containsKey("departureTime")) {
      String key = "departureTime";
      filterDoc = appendFilterDocString(queryParams, key, filterDoc);
    }
    System.err.println("I got past departureTime");

    if (queryParams.containsKey("driving")) {
      String key = "driving";
      filterDoc = appendFilterDocString(queryParams, key, filterDoc);
    }
    System.err.println("I got past driving");

    if (queryParams.containsKey("roundTrip")) {
      String key = "roundTrip";
      filterDoc = appendFilterDocBoolean(queryParams, key, filterDoc);
    }
    System.err.println("I got past roundTrip");

    if (queryParams.containsKey("noSmoking")) {
      String key = "noSmoking";
      filterDoc = appendFilterDocBoolean(queryParams, key, filterDoc);
    }
    System.err.println("I got past noSmoking");

    if (queryParams.containsKey("Eco")) {
      String key = "Eco";
      filterDoc = appendFilterDocBoolean(queryParams, key, filterDoc);
    }
    System.err.println("I got past Eco");

    if (queryParams.containsKey("petFriendly")) {
      String key = "petFriendly";
      filterDoc = appendFilterDocBoolean(queryParams, key, filterDoc);
    }
    System.err.println("I got past petFriendly");

    FindIterable<Document> matchingRides = rideCollection.find(filterDoc);

    return serializeIterable(matchingRides);
  }


  private String serializeIterable(Iterable<Document> documents) {
    return StreamSupport.stream(documents.spliterator(), false)
      .map(Document::toJson)
      .collect(Collectors.joining(", ", "[", "]"));
  }

  String addNewRide(String driver, String destination, String origin, Boolean roundTrip, Boolean driving, String departureDate,
                    String departureTime, String notes, String sortDateTime, Boolean noSmoking, Boolean Eco, Boolean petFriendly) {

    Document newRide = new Document();
    newRide.append("driver", driver);
    newRide.append("destination", destination);
    newRide.append("origin", origin);
    newRide.append("roundTrip", roundTrip);
    newRide.append("driving", driving);
    newRide.append("departureDate", departureDate);
    newRide.append("departureTime", departureTime);
    newRide.append("notes", notes);
    newRide.append("sortDateTime",sortDateTime);
    newRide.append("noSmoking", noSmoking);
    newRide.append("Eco", Eco);
    newRide.append("petFriendly", petFriendly);


    try {
      rideCollection.insertOne(newRide);
      ObjectId _id = newRide.getObjectId("_id");
      System.err.println("Successfully added new ride [_id=" + _id + ", driver=" + driver + ", destination=" + destination + ", origin=" + origin + ", roundTrip=" + roundTrip + ", driving="
        + driving + " departureDate=" + departureDate + " departureTime=" + departureTime + " notes=" + notes +
        " sortDateTime=" + sortDateTime + " noSmoking=" + noSmoking + " Eco=" + Eco + "petFriendly=" + petFriendly + ']');
      return _id.toHexString();
    } catch (MongoException me) {
      me.printStackTrace();
      return null;
    }
  }

  Boolean deleteRide(String id){
    ObjectId objId = new ObjectId(id);
    try{
      DeleteResult out = rideCollection.deleteOne(new Document("_id", objId));
      //Returns true if at least 1 document was deleted
      return out.getDeletedCount() != 0;
    }
    catch(MongoException e){
      e.printStackTrace();
      return false;
    }
  }

  Boolean updateRide(String id, String driver, String destination, String origin, Boolean roundTrip, Boolean driving,
    String departureDate, String departureTime, String notes, String sortDateTime, Boolean noSmoking, Boolean Eco, Boolean petFriendly){
    ObjectId objId = new ObjectId(id);
    Document filter = new Document("_id", objId);
    Document updateFields = new Document();
    updateFields.append("driver", driver);
    updateFields.append("destination", destination);
    updateFields.append("origin", origin);
    updateFields.append("driving", driving);
    updateFields.append("roundTrip", roundTrip);
    updateFields.append("departureDate", departureDate);
    updateFields.append("departureTime", departureTime);
    updateFields.append("notes", notes);
    updateFields.append("sortDateTime", sortDateTime);
    updateFields.append("noSmoking" , noSmoking);
    updateFields.append("Eco" , Eco);
    updateFields.append("petFriendly" , petFriendly);


    Document updateDoc = new Document("$set", updateFields);
    try{
      UpdateResult out = rideCollection.updateOne(filter, updateDoc);
      //returns false if no documents were modified, true otherwise
      return out.getModifiedCount() != 0;
    }catch(MongoException e){
      e.printStackTrace();
      return false;
    }
  }

  //Helper Functions

  private String parseDateController(String rawDate) {

    if (rawDate != null) {

      System.err.println("This is the raw date " + rawDate);
      String departureMonth = rawDate.split(" ", 5)[1];
      System.err.println("This is the month " + departureMonth);
      String departureDay = rawDate.split(" ", 5)[2];
      System.err.println("This is the date " + departureDay);
      String departureYear = rawDate.split(" ", 5)[3];
      System.err.println("This is the year " + departureYear);

      if(departureMonth.equals("Jan")){
        departureMonth = "01";
      }
      if(departureMonth.equals("Feb")){
        departureMonth = "02";
      }
      if(departureMonth.equals("Mar")){
        departureMonth = "03";
      }
      if(departureMonth.equals("Apr")){
        departureMonth = "04";
      }
      if(departureMonth.equals("May")){
        departureMonth = "05";
      }
      if(departureMonth.equals("Jun")){
        departureMonth = "06";
      }
      if(departureMonth.equals("Jul")){
        departureMonth = "07";
      }
      if(departureMonth.equals("Aug")){
        departureMonth = "08";
      }
      if(departureMonth.equals("Sep")){
        departureMonth = "09";
      }
      if(departureMonth.equals("Oct")){
        departureMonth = "10";
      }
      if(departureMonth.equals("Nov")){
        departureMonth = "11";
      }
      if(departureMonth.equals("Dec")){
        departureMonth = "12";
      }


      if(Integer.parseInt(departureDay)<10){
        departureDay = "0" + departureDay;
      }

      return departureMonth + "-" + departureDay + "-" + departureYear;
    } else {
      return "";
    }
  }
}
