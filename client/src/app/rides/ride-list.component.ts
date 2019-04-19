import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Ride} from "./ride";
import {RideListService} from "./ride-list.service";
import {AddRideComponent} from "./add-ride.component";
import {EditRideComponent} from "./edit-ride.component";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DeleteRideComponent} from "./delete-ride.component";
import {SearchRideComponent} from "./search-ride.component";
import {AppComponent} from "../app.component";


@Component({
  selector: 'ride-list-component',
  templateUrl: 'ride-list.component.html',
  styleUrls: ['./ride-list.component.css'],
})


export class RideListComponent implements OnInit {

  public rides: Ride[];
  public searchedRides: Ride[];
  public filteredRides: Ride[];

  public rideDriving: boolean;
  public rideDestination: string;
  public rideRoundTrip: boolean;
  public rideNoSmoking: boolean;
  public rideEco: boolean;
  public ridePetFriendly: boolean;


  private highlightedDestination: string = '';



  constructor(public appComponent: AppComponent, public rideListService: RideListService, public dialog: MatDialog) {
  }

  public toggleRoundTrip() {
    this.rideRoundTrip = !this.rideRoundTrip;
  }

  public toggleDriving() {
    this.rideDriving = !this.rideDriving;
  }

  public toggleNoSmoking() {
    this.rideNoSmoking = !this.rideNoSmoking;
  }

  public toggleEco() {
    this.rideEco = !this.rideEco;
  }

  public togglePetFriendly() {
    this.ridePetFriendly = !this.ridePetFriendly;
  }

  appendDatesUnder10(date: number): string{
    let newDate;
    if(date<10){
      newDate = "0" + date.toString()
    }
    else{
      newDate = date.toString();
    }
    return newDate;
  }

  // To use to delete past rides
  getCurrentTime(): string{
    let today = new Date();
    console.log("getFullYear is " + today.getFullYear());
    console.log("getMonth is " + today.getUTCMonth());
    console.log("getDate is " + today.getDate());
    console.log("getHours is " + today.getHours());
    console.log("getMinutes is " + today.getMinutes());
    let year = this.appendDatesUnder10(today.getFullYear());
    let month = this.appendDatesUnder10(today.getMonth());
    let day = this.appendDatesUnder10(today.getDate());
    let hours = this.appendDatesUnder10(today.getHours());
    let minutes = this.appendDatesUnder10(today.getMinutes());
    console.log("Year is " + year);
    console.log("Month is " + month);
    console.log("Date is " + day);
    console.log("Hours is " + hours);
    console.log("Minutes is " + minutes);

    let date = year + month + day;
    let time = hours + minutes;
    let blah = date + time;
    console.log("The Current Time Is " + blah);
    return blah;
  }

  //Method for deleting past rides


  openDialog(): void {
    const newRide: Ride = {driver: this.appComponent.getUsername(), destination: '', origin: '', roundTrip: false, driving: false,
      departureDate: '', departureTime: '', notes: '', noSmoking: false, Eco: false, petFriendly: false};
    const dialogRef = this.dialog.open(AddRideComponent, <MatDialogConfig>{
      width: '500px',
      data: {ride: newRide}
    });


    dialogRef.afterClosed().subscribe(newRide => {
      console.log('The Current Time Is ' + this.getCurrentTime());
      if (newRide != null) {

        this.rideListService.addNewRide(newRide).subscribe(
          result => {
            this.highlightedDestination = result;
            this.refreshRides();
          },
          err => {
            console.log('There was an error adding the ride.');
            console.log('The newRide or dialogResult was ' + JSON.stringify(newRide));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }

  openSearchDialog(): void {

    const searchRide: Ride = {driver: '', destination: '', origin: '', roundTrip: null, driving: false,
      departureDate: '', departureTime: '', notes: '', noSmoking: null, Eco: null, petFriendly: null};

    const dialogRef = this.dialog.open(SearchRideComponent, <MatDialogConfig>{
      width: '500px',
      data: {ride: searchRide}
    });

    dialogRef.afterClosed().subscribe(searchRide => {
      if (searchRide != null) {
        console.log('The destination passed in is ' + searchRide.destination);
        console.log('The origin passed in is ' + searchRide.origin);
        console.log('The departureDate passed in is ' + searchRide.departureDate);
        console.log('The departureTime passed in is ' + searchRide.departureTime);
        console.log('The roundTrip passed in is ' + searchRide.roundTrip);
        console.log('The noSmoking passed in is ' + searchRide.noSmoking);
        console.log('The Eco passed in is ' + searchRide.Eco);
        console.log('The petFriendly passed in is ' + searchRide.petFriendly);
        console.log('The Current Time Is ' + this.getCurrentTime());

        this.rideListService.getRides(searchRide.destination,searchRide.origin,searchRide.departureDate,
          searchRide.departureTime,searchRide.driving, searchRide.roundTrip,searchRide.noSmoking,searchRide.Eco,
          searchRide.petFriendly).subscribe(
          result => {
            this.searchedRides = result;
            console.log("The result is " + JSON.stringify(result));
            this.refreshRides(searchRide.destination,searchRide.origin,searchRide.departureDate);
            localStorage.setItem("searched", 'true');
          },
          err => {
            // This should probably be turned into some sort of meaningful response.
            console.log('There was an error searching the ride.');
            console.log('The searchRide or dialogResult was ' + JSON.stringify(searchRide));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }

  openEditDialog(currentId: object,currentDriver: string, currentDestination: string, currentOrigin: string,
                 currentRoundTrip: boolean, currentDriving: boolean, currentDepartureDate: string,
                 currentDepartureTime: string, currentNotes: string, currentNoSmoking: boolean,
                 currentEco: boolean, currentPetFriendly: boolean): void {
    const currentRide: Ride = {
      _id: currentId,
      driver: this.appComponent.getUsername(),
      destination: currentDestination,
      origin: currentOrigin,
      roundTrip: currentRoundTrip,
      driving: currentDriving,
      departureDate: currentDepartureDate,
      departureTime: currentDepartureTime,
      notes: currentNotes,
      noSmoking: currentNoSmoking,
      Eco: currentEco,
      petFriendly: currentPetFriendly
    };

    const dialogRef = this.dialog.open(EditRideComponent, <MatDialogConfig>{
      width: '500px',
      data: {ride: currentRide}
    });


    dialogRef.afterClosed().subscribe(currentRide => {
      if (currentRide != null) {

        this.rideListService.editRide(currentRide).subscribe(
          result => {
            this.highlightedDestination = result;
            this.refreshRides();
            console.log('The currentRide or dialogResult was ' + JSON.stringify(currentRide));
          },
          err => {
            console.log('There was an error editing the ride.');
            console.log('The currentRide or dialogResult was error ' + JSON.stringify(currentRide));
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }


  openDeleteDialog(currentId: object): void {
    console.log("openDeleteDialog");
    const dialogRef = this.dialog.open(DeleteRideComponent, <MatDialogConfig>{
      width: '500px',
      data: {id: currentId}
    });
    dialogRef.afterClosed().subscribe(deletedRideId => {
      if (deletedRideId != null) {
        this.rideListService.deleteRide(deletedRideId).subscribe(
          result => {
            console.log("openDeleteDialog has gotten a result!");
            this.highlightedDestination = result;
            console.log("The result is " + result);
            this.refreshRides();
          },
          err => {
            console.log('There was an error deleting the ride.');
            console.log('The id we attempted to delete was  ' + deletedRideId);
            console.log('The error was ' + JSON.stringify(err));
          });
      }
    });
  }


 public filterRides(searchRoundTrip: boolean, searchDriving: boolean, searchDestination: string, searchNoSmoking: boolean, searchEco: boolean, searchPetFriendly: boolean): Ride[] {

   this.filteredRides = this.rides;

   if (searchRoundTrip === true) {

     this.filteredRides = this.filteredRides.filter(ride => {
       return ride.roundTrip === searchRoundTrip;
     });
   }

   if (searchDriving === true) {

     this.filteredRides = this.filteredRides.filter(ride => {
       return ride.driving === searchDriving;
     });
   }

    if (searchDestination != null) {
     searchDestination = searchDestination.toLocaleLowerCase().trim().replace(/\s+/g, " ");
     this.filteredRides = this.filteredRides.filter(ride => {
       return !searchDestination || ride.destination.toLowerCase().indexOf(searchDestination) !== -1;
     });
   }

   if (searchNoSmoking === true) {

     this.filteredRides = this.filteredRides.filter(ride => {
       return ride.noSmoking === searchNoSmoking;
     });
   }

   if (searchEco === true) {

     this.filteredRides = this.filteredRides.filter(ride => {
       return ride.Eco === searchEco;
     });
   }

   if (searchPetFriendly === true) {

     this.filteredRides = this.filteredRides.filter(ride => {
       return ride.petFriendly === searchPetFriendly;
     });
   }

    return this.filteredRides;
  }


  refreshRides(searchDestination?: string,searchOrigin?: string,searchDate?: string,searchTime?: string,searchDriving?: boolean,
               searchRoundTrip?: boolean, searchNoSmoking?: boolean, searchEco?: boolean, searchPetFriendly?: boolean): Observable<Ride[]> {
    localStorage.setItem("searched", "false");
    localStorage.setItem("load", "false");
  if (searchDestination == null && searchOrigin == null && searchDate == null && searchTime == null && searchDriving == null
  && searchRoundTrip == null && searchNoSmoking == null && searchEco == null && searchPetFriendly == null) {
      const rides: Observable<Ride[]> = this.rideListService.getRides('','','',
        '', null, null, null, null, null);
      rides.subscribe(
        rides => {
          this.rides = rides;
        },
        err => {
          console.log(err);
        });
      return rides;
    }
    else {
    const rides: Observable<Ride[]> = this.rideListService.getRides(searchDestination,searchOrigin,searchDate,searchTime,
      searchDriving,searchRoundTrip, searchNoSmoking, searchEco, searchPetFriendly);
    rides.subscribe(
      rides => {
        this.rides = rides;
      },
      err => {
        console.log(err);
      });
    return rides;
     }
   }

/*   changeWaitText(): boolean {
     setTimeout('', 10000);
     localStorage.setItem("load", "true")
   }*/
  refreshRides2(): Observable<Ride[]> {
    // Get Rides returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const rides: Observable<Ride[]> = this.rideListService.getRides2();
    rides.subscribe(
      rides => {
        this.rides = rides;
        this.filterRides(this.rideRoundTrip, this.rideDriving, this.rideDestination, this.rideNoSmoking, this.rideEco, this.ridePetFriendly);
      },
      err => {
        console.log(err);
      });
    return rides;
  }

  loadService(): void {
    this.rideListService.getRides2().subscribe(
      rides => {
        this.rides = rides;
        this.filteredRides = this.rides;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.refreshRides();
    this.loadService();
    this.refreshRides2();
  }
}
