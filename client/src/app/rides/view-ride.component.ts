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

  public rideid: string;


  private highlightedDestination: string = '';



  constructor(public appComponent: AppComponent) {
  }

  static testFunction(currentId: object) {
    console.log(currentId.valueOf() + "viewride component reached");

  }

  ngOnInit(): void {
  //   this.refreshRides();
  //   this.loadService();
  //   this.refreshRides2();
  }
}
