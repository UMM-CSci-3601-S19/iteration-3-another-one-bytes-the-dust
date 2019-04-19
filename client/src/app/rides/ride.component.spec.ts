import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {CustomModule} from "../custom.module";
import {Ride} from "./ride";
import {RideComponent} from "./ride.component";
import {RideListService} from "./ride-list.service";

describe('Ride component', () => {

  let rideComponent: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  let rideListServiceStub: {
    getRideByDestination: (rideDestination: string) => Observable<Ride>
    getRideByRoundTrip: (rideRoundTrip: Boolean) => Observable<Ride>
    getRideByNoSmoking: (NoSmoking: Boolean) => Observable<Ride>
    getRideByEco: (eco: Boolean) => Observable<Ride>
  };

  beforeEach(() => {
    rideListServiceStub = {
      getRideByDestination: (rideDestination: string) => Observable.of([
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
          driving: true,
          notes: 'There is no escaping Morris',
          sortDateTime: '201908021900',
          noSmoking: true,
          Eco: true,
          petFriendly: false,
        }
      ].find(ride => ride.destination === rideDestination)),

      getRideByRoundTrip: (rideRoundTrip: boolean) => Observable.of([
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
      ].find(ride => ride.roundTrip === rideRoundTrip)),

      getRideByNoSmoking: (rideNoSmoking: boolean) => Observable.of([
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
      ].find(ride => ride.noSmoking === rideNoSmoking)),

      getRideByEco: (rideEco: boolean) => Observable.of([
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
      ].find(ride => ride.Eco === rideEco)),
    };


    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [RideComponent],
      providers: [{provide: RideListService, useValue: rideListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RideComponent);
      rideComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve all the fields given destination', () => {
    rideComponent.setDestination('Hogwarts');
    expect(rideComponent.ride).toBeDefined();
    expect(rideComponent.ride.driver).toBe('Hagrid');
    expect(rideComponent.ride.origin).toBe('4 Privet Drive');
    expect(rideComponent.ride.roundTrip).toBe(true);
    expect(rideComponent.ride.departureDate).toBe('05-16-2007');
    expect(rideComponent.ride.departureTime).toBe('6:00 PM');
    expect(rideComponent.ride.driving).toBe(true);
    expect(rideComponent.ride.notes).toBe('I will be arriving in a flying motorcycle');
    expect(rideComponent.ride.sortDateTime).toBe('200705161800');
    expect(rideComponent.ride.noSmoking).toBe(true);
    expect(rideComponent.ride.Eco).toBe(true);
    expect(rideComponent.ride.petFriendly).toBe(false);
  });

  it('returns undefined for Canada', () => {
    rideComponent.setDestination('Canada');
    expect(rideComponent.ride).toBeUndefined();
  });


  it('can retrieve correct roundTrip', () => {
    rideComponent.setRoundTrip(false);
    expect(rideComponent.ride).toBeDefined();
    expect(rideComponent.ride.destination).toBe('Morris');
    expect(rideComponent.ride.driver).toBe('Student');
    expect(rideComponent.ride.origin).toBe('The Outside');
    expect(rideComponent.ride.departureDate).toBe('08-02-2019');
    expect(rideComponent.ride.departureTime).toBe('7:00 PM');
    expect(rideComponent.ride.driving).toBe(false);
    expect(rideComponent.ride.notes).toBe('There is no escaping Morris');
    expect(rideComponent.ride.sortDateTime).toBe('201908021900');
    expect(rideComponent.ride.noSmoking).toBe(true);
    expect(rideComponent.ride.Eco).toBe(true);
    expect(rideComponent.ride.petFriendly).toBe(false);
  });

  it('can retrieve correct tag: noSmoking', ()=> {
    rideComponent.setNoSmoking(true);
    expect(rideComponent.ride).toBeDefined();
    expect(rideComponent.ride.noSmoking).toBe(true);

  });

  it('can retrieve correct tag: Eco', ()=> {
    rideComponent.setEco(true);
    expect(rideComponent.ride).toBeDefined();
    expect(rideComponent.ride.Eco).toBe(true);

  });

});
