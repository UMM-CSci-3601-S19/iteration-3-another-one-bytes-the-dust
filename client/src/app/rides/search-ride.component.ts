import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Ride} from './ride';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";


@Component({
  selector: 'search-ride.component',
  templateUrl: 'search-ride.component.html',
})

export class SearchRideComponent implements OnInit {
  searchRideForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ride: Ride }, private fb: FormBuilder) {
  }

  search_ride_validation_messages = {
    'destination': [
      // {type: 'required', message: 'Destination is required'},
      {type: 'minlength', message: 'Destination must be at least 2 characters long'},
      {type: 'maxlength', message: 'Destination cannot be more than 50 characters long'},
      {type: 'pattern', message: 'Destination must contain only numbers, letters, dashes, underscores, and dots'}
    ],
    'origin': [
      // {type: 'required', message: 'Origin is required'},
      {type: 'minlength', message: 'Origin must be at least 2 characters long'},
      {type: 'maxlength', message: 'Origin cannot be more than 50 characters long'},
      {type: 'pattern', message: 'Origin must contain only numbers, letters, dashes, underscores, and dots'}
    ]

  };

  createForms() {
    this.searchRideForm = this.fb.group({
      destination: new FormControl('destination', Validators.compose([

        Validators.pattern('^[ a-zA-Z0-9.]+$'),
        Validators.minLength(2),
        Validators.maxLength(50),
        // Validators.required
      ])),
      origin: new FormControl('origin', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50),
        // Validators.required,
        Validators.pattern('^[ a-zA-Z0-9.]+$')
      ]))
    })
  }

  ngOnInit() {
    this.createForms();
  }
}
