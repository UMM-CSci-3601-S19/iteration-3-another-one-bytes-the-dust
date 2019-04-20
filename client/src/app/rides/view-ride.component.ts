import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Ride} from "./ride";
import {RideListService} from "./ride-list.service";
import {AddRideComponent} from "./add-ride.component";
import {EditRideComponent} from "./edit-ride.component";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DeleteRideComponent} from "./delete-ride.component";
import {SearchRideComponent} from "./search-ride.component";
// import {RideListComponent} from "./ride-list.component";
import {AppComponent} from "../app.component";



@Component({
  selector: 'view-ride-component',
  templateUrl: 'view-ride.component.html',
  styleUrls: ['./view-ride.component.css'],
})


export class ViewRideComponent implements OnInit {

  public rides: Ride[];
  public searchedRides: Ride[];
  public filteredRides: Ride[];

  public rideDriving: boolean;
  public rideDestination: string;
  public rideRoundTrip: boolean;
  public rideNoSmoking: boolean;
  public rideEco: boolean;
  public ridePetFriendly: boolean;

  public viewRideId: object;

  private highlightedDestination: string = '';



  constructor(public appComponent: AppComponent) {
  }



  static testFunction(currentId: object): void {
    console.log("view-ride.component reached");
    console.log(currentId);
    //ViewRideComponent.testFunction2();
//Why doesn't the above function work?
    //note to self: research static contexts and how they work

  }

  public testFunction2(){
    const testConstant = this.viewRideId;
    console.log(testConstant);
  }

  ngOnInit(): void {
  //   this.refreshRides();
  //   this.loadService();
  //   this.refreshRides2();
  }
}
