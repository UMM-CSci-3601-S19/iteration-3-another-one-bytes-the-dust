// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { Ride } from './ride';
// import { Observable } from "rxjs/Observable";
// import { CustomModule } from '../custom.module';
//
// import { RideListComponent } from './ride-list.component';
// import { RideListService } from "./ride-list.service";
//
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
//
// describe('Display rides', () => {
//   let rideList: RideListComponent;
//   let fixture: ComponentFixture<RideListComponent>;
//
//   let rideListServiceStub: {
//     getRides: () => Observable<Ride[]>
//   };
//
//   beforeEach(() => {
//     rideListServiceStub = {
//       getRides: () => Observable.of([
//         {
//           driver: "Luke",
//           destination: "Death Orb",
//           origin: 'Wardrobe',
//           roundTrip: true,
//           departureDate: '08-25-2020',
//           departureTime: '8:00 AM',
//           driving: true,
//           notes: 'The',
//           sortDateTime: '202008250800',
//           noSmoking: false,
//           Eco: false,
//           petFriendly: true,
//         },
//         {
//           driver: "Sky",
//           destination: "Under The Sea",
//           origin: '5th street',
//           roundTrip: true,
//           departureDate: '07-13-2020',
//           departureTime: '10:00 PM',
//           driving: false,
//           notes: 'Force',
//           sortDateTime: '202007132200',
//           noSmoking: true,
//           Eco: true,
//           petFriendly: true,
//         },
//         {
//           driver: "Walker",
//           destination: "Cake",
//           origin: 'Gingerbread',
//           roundTrip: false,
//           departureDate: '03-03-2020',
//           departureTime: '5:00 PM',
//           driving: true,
//           notes: 'Is',
//           sortDateTime: '202003031700',
//           noSmoking: false,
//           Eco: false,
//           petFriendly: true,
//         },
//       ])
//     };
//
//     TestBed.configureTestingModule({
//       imports:[CustomModule],
//       declarations: [RideListComponent],
//       providers: [{provide: RideListService, useValue: rideListServiceStub}]
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(RideListComponent);
//       rideList = fixture.componentInstance;
//       fixture.detectChanges();
//     });
//   }));
//
//
//   it('contains all the rides', () => {
//     expect(rideList.rides.length).toBe(3);
//   });
//
//   it('contain one with driver Bob ', () => {
//     expect(rideList.rides.some((ride:Ride) => ride.driver === "Bob")).toBe(true);
//   });
//
//   it('contain one with driver Bobby ', () => {
//     expect(rideList.rides.some((ride:Ride) => ride.driver === "Bobby")).toBe(true);
//   });
//
//   it('contain one with driver Fran ', () => {
//     expect(rideList.rides.some((ride:Ride) => ride.driver === "Fran")).toBe(true);
//   });
//
//   it('NOT contain one with driver Phil ', () => {
//     expect(rideList.rides.some((ride:Ride) => ride.driver === "Phil")).toBe(false);
//   });
//
//
//   it('contain one with destination Willies ', () => {
//     expect(rideList.rides.some((ride:Ride) => ride.destination === "Willies")).toBe(true);
//   });
//
//   it('contain one with destination St Cloud ', () => {
//     expect(rideList.rides.some((ride:Ride) => ride.destination === "St Cloud")).toBe(true);
//   });
//
//   it('contain one with destination bremer', () => {
//     expect(rideList.rides.some((ride:Ride) => ride.destination === "Bremer")).toBe(true);
//   });
//
//   it('NOT contain one with destination Moon', () => {
//     expect(rideList.rides.some((ride:Ride) => ride.destination === "Moon")).toBe(false);
//   });
//
//
//   it('ride list filters by driving', ()=> {
//     expect(rideList.filteredRides.length).toBe(3);
//     rideList.rideDriving = true;
//     const a: Observable<Ride[]> = rideList.refreshRides();
//     a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(2));
//   });
//
//   it('ride list filters by destination', () => {
//     expect(rideList.filteredRides.length).toBe(3);
//     rideList.rideDestination = 'Cake';
//     const a: Observable<Ride[]> = rideList.refreshRides();
//     a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(1));
//   });
//
//   // it('ride list filters by origin', () => {
//   //   expect(rideList.filteredRides.length).toBe(3);
//   //   rideList.rideOrigin = 'Campus';
//   //   const a: Observable<Ride[]> = rideList.refreshRides();
//   //   a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(2));
//   // });
//
//   it('ride list filters by roundTrip', () => {
//     expect(rideList.filteredRides.length).toBe(3);
//     rideList.rideRoundTrip = false;
//     const a: Observable<Ride[]> = rideList.refreshRides();
//     a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(1));
//   });
//
//   it('ride list filters by noSmoking', () => {
//     expect(rideList.filteredRides.length).toBe(3);
//     rideList.rideNoSmoking = false;
//     const a: Observable<Ride[]> = rideList.refreshRides();
//     a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(2));
//   });
//
//   it('ride list filters by Eco', () => {
//     expect(rideList.filteredRides.length).toBe(3);
//     rideList.rideEco = true;
//     const a: Observable<Ride[]> = rideList.refreshRides();
//     a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(1));
//   });
//
//   it('ride list filters by petFriendly', () => {
//     expect(rideList.filteredRides.length).toBe(3);
//     rideList.ridePetFriendly = false;
//     const a: Observable<Ride[]> = rideList.refreshRides();
//     a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(0));
//   });
// });
