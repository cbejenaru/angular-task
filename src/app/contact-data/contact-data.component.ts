import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import {} from '@types/googlemaps';
import Utils from '../shared/utils';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css', '../app.component.css'],
})
export class ContactDataComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('street') streetInput: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  chisinauLatLng = new google.maps.LatLng(47.02563089705273, 28.8307);
  geocoder = new google.maps.Geocoder();
  autocomplete: google.maps.places.Autocomplete;

  contactDataForm: FormGroup;
  phoneValidator = '^\\+373\\s[0-9]{3}-[0-9]{2}-[0-9]{3}$';

  mapProp = {
    center: this.chisinauLatLng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    key: 'AIzaSyDb21uXC-hgApdwzkO158N3xbO9KuFbhZo',
  };

  constructor(
    private navService: NavigationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.contactDataForm = this.createForm();

    this.map = new google.maps.Map(
      this.gmapElement.nativeElement,
      this.mapProp,
    );

    this.marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.chisinauLatLng,
      map: this.map,
      title: 'Location',
      icon: '../../assets/images/map-icon.png',
    });

    this.marker.addListener('dragend', () => {
      this.geocoder.geocode(
        {
          location: this.marker.getPosition(),
        },
        (
          results: google.maps.GeocoderResult[],
          status: google.maps.GeocoderStatus,
        ) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const address = results[0].formatted_address.split(',');
            this.contactDataForm.get('country').setValue(address[2]);
            this.contactDataForm.get('city').setValue(address[1]);
            this.contactDataForm.get('street').setValue(address[0]);
          } else {
            console.log(status);
          }
        },
      );
    });

    this.map.addListener('click', event => {
      this.marker.setPosition(event.latLng);
      google.maps.event.trigger(this.marker, 'dragend');
    });

    this.autocomplete = new google.maps.places.Autocomplete(
      this.streetInput.nativeElement,
      {
        types: ['geocode'],
        componentRestrictions: { country: ['MD'] },
      },
    );

    this.autocomplete.addListener('place_changed', () => {
      const response = this.autocomplete.getPlace();
      const address = this.streetInput.nativeElement.value
        .toString()
        .split(',');
      let country = response.address_components[2].long_name;
      let city = response.address_components[1].long_name;
      const street = response.address_components[0].long_name;
      for (const component of response.address_components) {
        if (component.types.indexOf('country') !== -1) {
          country = component.long_name;
        }
        if (component.types.indexOf('city') !== -1) {
          city = component.long_name;
        }
      }
      this.contactDataForm.get('country').setValue(country);
      this.contactDataForm.get('city').setValue(city);
      this.contactDataForm.get('street').setValue(street);
      if (response.place_id) {
        this.setMarker({ placeId: response.place_id });
      } else {
        this.setMarker({ location: this.chisinauLatLng });
      }
    });

    if (localStorage.getItem('step3') !== null) {
      let stored = JSON.parse(localStorage.getItem('step3'));
      Object.keys(this.contactDataForm.controls).forEach(key => {
        this.contactDataForm.get(key).setValue(stored['form'][key]);
      });
      this.marker.setPosition(stored['LatLng']);
      this.map.setCenter(stored['LatLng']);
    }
  }

  createForm() {
    return this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: ['', [Validators.pattern(this.phoneValidator)]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postCode: [''],
    });
  }

  onNext() {
    if (this.contactDataForm.valid) {
      let data = {
        form: this.contactDataForm.value,
        LatLng: this.marker.getPosition(),
      };
      localStorage.setItem('step3', JSON.stringify(data));
      this.navService.currentStep += 1;
      this.router.navigate(['step', this.navService.currentStep]);
    } else {
      Utils.markFormGroupTouched(<FormGroup>this.contactDataForm);
    }
  }

  onBack() {
    this.navService.currentStep -= 1;
    this.router.navigate(['step', this.navService.currentStep]);
  }

  onCancel() {
    this.contactDataForm.reset();
    this.map.setCenter(this.chisinauLatLng);
    this.marker.setPosition(this.chisinauLatLng);
  }

  setMarker(request: google.maps.GeocoderRequest) {
    this.geocoder.geocode(
      request,
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus,
      ) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const geocoderLocation = results[0].geometry.location;
          this.marker.setPosition(geocoderLocation);
          this.map.setCenter(geocoderLocation);
        } else {
          console.log(status);
        }
      },
    );
  }
}
