import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Ride} from "./ride";

@Injectable()
export class RideListService {
  readonly baseUrl: string = environment.API_URL + 'rides';
  private rideUrl: string = this.baseUrl;
  public hour: string;
  public minute: string;

  constructor(private http: HttpClient) {

  }

  getRides(searchedDestination: string, searchedOrigin: string, searchedDate: string, searchedTime: string,
           searchedDriving: boolean, searchedRoundTrip: boolean, searchedNoSmoking: boolean, searchedEco: boolean,
           searchedPetFriendly: boolean, searchedVisible: boolean): Observable<Ride[]> {
    console.log("searched Destination to getRides is " + searchedDestination);
    console.log("searched Origin to getRides is " + searchedOrigin);
    console.log("searched date to getRides is " + searchedDate);
    console.log("searched time to getRides is " + searchedTime);
    console.log("searched driving to getRides is " + searchedDriving);
    console.log("searched roundTrip to getRides is " + searchedRoundTrip);
    console.log("searched noSmoking to getRides is " + searchedNoSmoking);
    console.log("searched Eco to getRides is " + searchedEco);
    console.log("searched petFriendly to getRides is " + searchedPetFriendly);
    console.log("searched visible to getRides is " + searchedVisible);

    console.log("Ride Url before filter By PARAMETERS " + this.rideUrl);

    this.filterByParameters(searchedDestination,searchedOrigin,searchedDate,searchedTime,searchedDriving,
      searchedRoundTrip, searchedNoSmoking, searchedEco, searchedPetFriendly, searchedVisible);

    console.log("Ride Url after filter By PARAMETERS " + this.rideUrl);

    return this.http.get<Ride[]>(this.rideUrl);
  }

  getRides2(rideDestination?: string): Observable<Ride[]> {
    this.filterByDestination(rideDestination);
    return this.http.get<Ride[]>(this.rideUrl);
  }

  filterByDestination(rideDestination?: string): void {
    if (!(rideDestination == null || rideDestination === '')) {
      if (this.parameterPresent('destination=')) {
        // there was a previous search by company that we need to clear
        this.removeParameter('destination=');
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += 'destination=' + rideDestination + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += '?destination=' + rideDestination + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent('destination=')) {
        let start = this.rideUrl.indexOf('destination=');
        const end = this.rideUrl.indexOf('&', start);
        if (this.rideUrl.substring(start - 1, start) === '?') {
          start = start - 1;
        }
        this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
      }
    }
  }

  //This could be changed into a getRideById if we decide to ad id as a field
  getRideByDestination(destination: string): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + destination);
  }

  getRideByOrigin(origin: string): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + origin);
  }

  getRideByDriving(driving: boolean): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + driving.toString());
  }

  getRideByRoundTrip(roundTrip: boolean): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + roundTrip.toString());
  }

  getRideByNoSmoking(noSmoking: boolean): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + noSmoking.toString());
  }

  getRideByEco(Eco: boolean): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + Eco.toString());
  }

  getRideByPetFriendly(petFriendly: boolean): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + petFriendly.toString());
  }



  addNewRide(newRide: Ride): Observable<string> {
    console.log("This the format of departure date when adding " + newRide.departureDate);
    const httpOptions = {
      headers: new HttpHeaders({
        // We're sending JSON
        'Content-Type': 'application/json'
      }),
      // But we're getting a simple (text) string in response
      // The server sends the hex version of the new ride back
      // so we know how to find/access that ride again later.
      responseType: 'text' as 'json'
    };

    // Send post request to add a new ride with the ride data as the body with specified headers.
    return this.http.post<string>(this.rideUrl + '/new', newRide, httpOptions);
  }



  editRide(editedRide: Ride): Observable<string> {
    console.log("The edited Time NON FORMAT and passed was " + editedRide.departureTime);

    this.hour = editedRide.departureTime.split(":",2)[0];
    this.minute = editedRide.departureTime.split(":",2)[1];

    console.log("The hour is " + this.hour );
    console.log("The minute is " + this.minute);

    if(this.minute.includes("PM")){
      this.hour = (parseInt(this.hour) + 12).toString();
    }

    if(this.minute.includes("AM")){
      if(parseInt(this.hour)<10){
        this.hour = "0" + this.hour;
      }
    }

    this.minute = this.minute.replace(" PM","");
    this.minute = this.minute.replace(" AM","");

    editedRide.departureTime = this.hour + ":" + this.minute;

    console.log("The edited Time formatted and passed was " + editedRide.departureTime);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post<string>(this.rideUrl + '/update', editedRide, httpOptions);
  }


  deleteRide(deleteId: String): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    let deleteDoc: string = "{ \"_id\": \"" + deleteId + "\"}";

    return this.http.post<string>(this.rideUrl + '/remove', deleteDoc, httpOptions);
  }


  // Helper Functions

  public hasSearched(): boolean {
    status = localStorage.getItem('searched');
    if (status == 'true') { return true;}
    else {return false;}
  }

  public makeSearchUrlString(searchParam: string, paramKey: string) {
    if (!(searchParam == null || searchParam === '')) {
      if (this.parameterPresent(paramKey)) {
        // there was a previous search by destination that we need to clear
        this.removeParameter(paramKey);
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += paramKey + searchParam.replace(/\s/g, "%20") + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += '?' + paramKey + searchParam.replace(/\s/g, "%20") + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent(paramKey)) {
        if (this.parameterPresent(paramKey)) {
          let start = this.rideUrl.indexOf(paramKey);
          const end = this.rideUrl.indexOf('&', start);
          if (this.rideUrl.substring(start - 1, start) === '?') {
            this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
          }
          else {
            this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
          }
        }
      }
    }
  }
  public makeSearchUrlBoolean(searchParam: boolean, paramKey: string) {
    if (!(searchParam == null)) {
      if (this.parameterPresent(paramKey)) {
        // there was a previous search by destination that we need to clear
        this.removeParameter(paramKey);
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += paramKey + searchParam + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += paramKey + searchParam + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent(paramKey)) {
        let start = this.rideUrl.indexOf(paramKey);
        const end = this.rideUrl.indexOf('&', start);
        if (this.rideUrl.substring(start - 1, start) === '?') {
          this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
        }
        else{
          this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
        }
      }
    }
  }

  filterByParameters(rideDestination: string, rideOrigin: string, rideDate: string, rideTime: string, rideDriving: boolean, rideRoundTrip: boolean, rideNoSmoking: boolean, rideEco: boolean,
                     ridePetFriendly: boolean, rideVisible: boolean): void {

    console.log('Made it to filter by parameters!');

    // Filtering by destination
    this.makeSearchUrlString(rideDestination, 'destination=');
    console.log('Destination filtered: ' + this.rideUrl);

    // Filtering by origin
    this.makeSearchUrlString(rideOrigin, 'origin=');
    console.log('Origin filtered: ' + this.rideUrl);

    // Filtering by departureDate
    this.makeSearchUrlString(rideDate, 'departureDate=');
    console.log('Departure Date filtered: ' + this.rideUrl);

    // Filtering by departureTime
    this.makeSearchUrlString(rideTime, 'departureTime=');
    console.log('Departure Time filtered: ' + this.rideUrl);

    // Filtering by Driving
    this.makeSearchUrlBoolean(rideDriving, 'driving=');
    console.log('Driving filtered: ' + this.rideUrl);


    // Filtering by roundTrip
    this.makeSearchUrlBoolean(rideRoundTrip, 'roundTrip=');
    console.log('Roundtrip filtered: ' + this.rideUrl);

    // Filtering by noSmoking
    this.makeSearchUrlBoolean(rideNoSmoking, 'noSmoking=');
    console.log('No Smoking filtered: ' + this.rideUrl);

    // Filtering by EcoFriendly
    this.makeSearchUrlBoolean(rideEco, 'Eco=');
    console.log('Ecofriendly filtered filtered: ' + this.rideUrl);

    // Filtering by petFriendly
    this.makeSearchUrlBoolean(ridePetFriendly, 'petFriendly=');
    console.log('Petfriendly filtered: ' + this.rideUrl);

    //End of filterByParameters
  }

  private parameterPresent(searchParam: string) {
    return this.rideUrl.indexOf(searchParam) !== -1;
  }

  //remove the parameter and, if present, the &
  private removeParameter(searchParam: string) {
    let start = this.rideUrl.indexOf(searchParam);
    let end = 0;
    if (this.rideUrl.indexOf('&') !== -1) {
      end = this.rideUrl.indexOf('&', start) + 1;
    } else {
      end = this.rideUrl.indexOf('&', start);
    }
    this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end);
  }

}
