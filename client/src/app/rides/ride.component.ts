import {Component, OnInit} from '@angular/core';
import {RideListService} from "./ride-list.service";
import {Ride} from "./ride";

@Component({
  selector: 'ride-component',
  templateUrl: 'ride.component.html',
  styleUrls: ['./ride.component.css'],
})

export class RideComponent implements OnInit {

  public ride: Ride = null;
  private destination: string;
  private roundTrip: boolean;
  private noSmoking: boolean;
  private Eco: boolean;
  private petFriendly: boolean;


  constructor(private rideListService: RideListService) {
  }

  private subscribeToServiceForDestination() {
      this.rideListService.getRideByDestination(this.destination).subscribe(
        ride => this.ride = ride,
        err => {
          console.log(err);
        }
      );
  }

  private subscribeToServiceForRoundTrip() {
      this.rideListService.getRideByRoundTrip(this.roundTrip).subscribe(
        ride => this.ride = ride,
        err => {
          console.log(err);
        }
      );
  }

  private subscribeToServiceForNoSmoking() {
    this.rideListService.getRideByNoSmoking(this.noSmoking).subscribe(
      ride => this.ride = ride,
      err => {
        console.log(err);
      }
    );
  }

  private subscribeToServiceForEco() {
    this.rideListService.getRideByEco(this.Eco).subscribe(
      ride => this.ride = ride,
      err => {
        console.log(err);
      }
    );
  }

  private subscribeToServiceForPetFriendly() {
    this.rideListService.getRideByPetFriendly(this.petFriendly).subscribe(
      ride => this.ride = ride,
      err => {
        console.log(err);
      }
    );
  }

  setDestination(destination: string) {
    this.destination = destination;
    this.subscribeToServiceForDestination();
  }

  setRoundTrip(roundTrip: boolean) {
    this.roundTrip = roundTrip;
    this.subscribeToServiceForRoundTrip();
  }

  setNoSmoking(noSmoking: boolean) {
    this.noSmoking = noSmoking;
    this.subscribeToServiceForNoSmoking();
  }

  setEco(Eco: boolean) {
    this.Eco = Eco;
    this.subscribeToServiceForEco();
  }

  setPetFriendly(petFriendly: boolean) {
    this.petFriendly = petFriendly;
    this.subscribeToServiceForPetFriendly();
  }

  ngOnInit(): void {
    this.subscribeToServiceForDestination();
    this.subscribeToServiceForRoundTrip();
  }


}
