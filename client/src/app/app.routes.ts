// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RideListComponent} from "./rides/ride-list.component";
import {UserListComponent} from "./users/user-list.component";
import {ViewRideComponent} from "./rides/view-ride.component";


// Route Configuration
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'rides', component: RideListComponent},
  {path: 'user', component: UserListComponent},
  {path: 'viewRide', component: ViewRideComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
