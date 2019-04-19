import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Ride} from "./ride";
import {RideListService} from "./ride-list.service";

describe( 'Ride list service: ', () => {
  const testRides: Ride[] = [
    {
      driver: 'Hagrid',
      destination: 'Hogwarts',
      origin: '4 Privet Drive',
      roundTrip: true,
      departureDate: '05-16-2007',
      departureTime: '6:00 PM',
      driving: true,
      notes: 'I will be arriving in a flying motorcycle',
      sortDateTime: '200705161800',
      noSmoking: true,
      Eco: true,
      petFriendly: false,
    },
    {
      driver: 'Lucy',
      destination: 'Narnia',
      origin: 'Wardrobe',
      roundTrip: true,
      departureDate: '07-13-2020',
      departureTime: '5:00 PM',
      driving: true,
      notes: 'Dress for cold',
      sortDateTime: '202007131700',
      noSmoking: true,
      Eco: true,
      petFriendly: false,
    },
    {
      driver: 'Student',
      destination: 'Morris',
      origin: 'The Outside',
      roundTrip: false,
      departureDate: '08-02-2019',
      departureTime: '7:00 PM',
      driving: false,
      notes: 'There is no escaping Morris',
      sortDateTime: '201908021900',
      noSmoking: true,
      Eco: true,
      petFriendly: false,
    }
  ];

  const rRides: Ride[] = testRides.filter(ride =>
    ride.destination.toLowerCase().indexOf('r') !== -1
  );

  let rideListService: RideListService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    rideListService = new RideListService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('getRides() calls api/rides', () => {

    rideListService.getRides('','','','',null, null, null, null, null).subscribe(
      rides => expect(rides).toBe(testRides)
    );

    const req = httpTestingController.expectOne(rideListService.baseUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testRides);
  });

  it('getRides(rideDestination) adds appropriate param string to called URL', () => {
    rideListService.getRides('r','','','',null,null,null,null, null).subscribe(
      rides => expect(rides).toEqual(rRides)
    );

    const req = httpTestingController.expectOne(rideListService.baseUrl + '?destination=r&');
    expect(req.request.method).toEqual('GET');
    req.flush(rRides);
  });


  it('adding a ride calls api/rides/new', () => {
    const teacherDestination = 'teacherDestination';
    const newRide: Ride = {
      driver: 'Teacher',
      destination: 'St. Cloud',
      origin: 'Becker',
      roundTrip: false,
      departureDate: '10-16-2124',
      departureTime: '5:00 PM',
      driving: true,
      notes: 'There is no escaping Morris',
      sortDateTime: '212410160500',
      noSmoking: true,
      Eco: true,
      petFriendly: false,
    };

    rideListService.addNewRide(newRide).subscribe(
      destination => {
        expect(destination).toBe(teacherDestination);
      }
    );

    const expectedUrl: string = rideListService.baseUrl + '/new';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(teacherDestination);
  });

  it('getRideByDestination() calls api/rides/destination', () => {
    const targetRide: Ride = testRides[1];
    const targetDestination: string = targetRide.destination;
    rideListService.getRideByDestination(targetDestination).subscribe(
      ride => expect(ride).toBe(targetRide)
    );

    const expectedUrl: string = rideListService.baseUrl + '/' + targetDestination;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetRide);
  });

  it('getRideByRoundTrip() calls api/rides/roundTrip', () => {
    const targetRide: Ride = testRides[1];
    const targetRoundTrip: boolean = targetRide.roundTrip;
    rideListService.getRideByRoundTrip(targetRoundTrip).subscribe(
      ride => expect(ride).toBe(targetRide)
    );

    const expectedUrl: string = rideListService.baseUrl + '/' + targetRoundTrip;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetRide);
  });

  it('getRideByNoSmoking calls api/rides/noSmoking', () => {
    const targetRide: Ride = testRides[1];
    const targetNoSmoking: boolean = targetRide.noSmoking;
    rideListService.getRideByNoSmoking(targetNoSmoking).subscribe(
      ride => expect(ride).toBe(targetRide)
    );

    const expectedUrl: string = rideListService.baseUrl + '/' + targetNoSmoking;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetRide);
  });



  it('editing a ride calls api/rides/update', () => {
    const editedTeacherDestination = 'editedTeacherDestination';
    const editedRide: Ride = {
      driver: 'Teacher',
      destination: 'Morris',
      origin: 'Home',
      roundTrip: false,
      departureDate: '10-16-2124',
      departureTime: '5:00 PM',
      driving: true,
      notes: 'There is no escaping Morris',
      sortDateTime: '212410160500',
      noSmoking: true,
      Eco: true,
      petFriendly: false,
    };

    rideListService.editRide(editedRide).subscribe(
      destination => {
        expect(destination).toBe(editedTeacherDestination);
      }
    );

    const expectedUrl: string = rideListService.baseUrl + '/update';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(editedTeacherDestination);
  });

  it('deleting a ride calls api/rides/remove', () => {
    const deletedTeacherDestination = 'deletedTeacherDestination';
    const deletedRide: Ride = {
      _id: Object(),
      driver: 'Teacher',
      destination: 'Office',
      origin: 'Lab',
      roundTrip: false,
      departureTime: '6:00 AM',
      departureDate: '12-13-2019',
      driving: true,
      notes: 'There is no escaping the lab',
      noSmoking: true,
      Eco: true,
      petFriendly: false,
    };

    rideListService.deleteRide(deletedRide._id.toString()).subscribe(
      destination => {
        expect(destination).toBe(deletedTeacherDestination);
      }
    );

    const expectedUrl: string = rideListService.baseUrl + '/remove';
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(deletedTeacherDestination);
  });

});
