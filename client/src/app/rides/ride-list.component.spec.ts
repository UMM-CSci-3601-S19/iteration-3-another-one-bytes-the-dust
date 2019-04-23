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
//         { driver: 'Hagrid',
//           destination: 'Hogwarts',
//           origin: '4 Privet Drive',
//           roundTrip: true,
//           departureDate: '05-16-2007',
//           departureTime: '6:00 PM',
//           driving: true,
//           notes: 'I will be arriving in a flying motorcycle',
//           sortDateTime: '200705161800',
//           noSmoking: true,
//           Eco: true,
//           petFriendly: false
//         },
//         { driver: 'Lucy',
//           destination: 'Narnia',
//           origin: 'Wardrobe',
//           roundTrip: true,
//           departureDate: '07-13-2020',
//           departureTime: '5:00 PM',
//           driving: true,
//           notes: 'Dress for cold',
//           sortDateTime: '202007131700',
//           noSmoking: true,
//           Eco: true,
//           petFriendly: false
//         },
//         { driver: 'Student',
//           destination: 'Morris',
//           origin: 'The Outside',
//           roundTrip: false,
//           departureDate: '08-02-2019',
//           departureTime: '7:00 PM',
//           driving: false,
//           notes: 'There is no escaping Morris',
//           sortDateTime: '201908021900',
//           noSmoking: true,
//           Eco: true,
//           petFriendly: false
//         }
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
//   // it('NOT contain one with no round trip', () => {
//   //   expect(rideList.rides.some((ride:Ride) => ride.roundTrip === false)).toBe(true);
//   // });
//
//   it('ride list filters by destination', () => {
//     expect(rideList.filteredRides.length).toBe(3);
//     rideList.rideDestination = 'Bremer';
//     const a: Observable<Ride[]> = rideList.refreshRides();
//     a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(1));
//   });
//
//   it('ride list filters by origin', () => {
//     expect(rideList.filteredRides.length).toBe(3);
//     rideList.rideOrigin = 'Campus';
//     const a: Observable<Ride[]> = rideList.refreshRides();
//     a.do(x => Observable.of(x)).subscribe(x => expect(rideList.filteredRides.length).toBe(2));
//   });
// });
