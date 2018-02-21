import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Utils from '../shared/utils';
import {NavigationService} from '../navigation.service';
import {Router} from '@angular/router';
import GeocoderResult = google.maps.GeocoderResult;
import GeocoderStatus = google.maps.GeocoderStatus;
import GeocoderRequest = google.maps.GeocoderRequest;

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css', '../app.component.css']
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


  constructor(private navService: NavigationService,
              private router: Router) {
  }

  ngOnInit() {
    this.contactDataForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(null, Validators.pattern('^\\+373\\s[0-9]{3}-[0-9]{2}-[0-9]{3}$')),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      postCode: new FormControl()
    });

    const mapProp = {
      center: this.chisinauLatLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      key: 'AIzaSyDb21uXC-hgApdwzkO158N3xbO9KuFbhZo'

    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.chisinauLatLng,
      map: this.map,
      title: 'Location',
      icon: '../../assets/images/map-icon.png'
    });
    this.marker.addListener('dragend', () => {
      this.geocoder.geocode(
        {
          location: this.marker.getPosition()
        }, (results: GeocoderResult[], status: GeocoderStatus) => {
          if (status === GeocoderStatus.OK) {
            const address = results[0].formatted_address.split(',');
            this.contactDataForm.get('country').setValue(address[2]);
            this.contactDataForm.get('city').setValue(address[1]);
            this.contactDataForm.get('street').setValue(address[0]);
          } else {
            console.log(status);
          }
        }
      );
    });

    this.map.addListener('click', (event) => {
      this.marker.setPosition(event.latLng);
      google.maps.event.trigger(this.marker, 'dragend');
    });

    this.autocomplete = new google.maps.places.Autocomplete(
      this.streetInput.nativeElement,
      {
        types: ['geocode'],
        componentRestrictions: {country: ['MD']}
      });

    this.autocomplete.addListener('place_changed', () => {
      const response = this.autocomplete.getPlace();
      console.log(response);
      const address = this.streetInput.nativeElement.value.toString().split(',');
      let country = response.address_components[2].long_name;
      let city = response.address_components[1].long_name;
      const street = response.address_components[0].long_name;
      for (const component of response.address_components) {
        if (component.types.indexOf('country') !== -1) {
          country = component.long_name;
        }
        if (component.types.indexOf('administrative_area_level_1') !== -1) {
          city = component.long_name;
        }
      }
      this.contactDataForm.get('country').setValue(country);
      this.contactDataForm.get('city').setValue(city);
      this.contactDataForm.get('street').setValue(street);
      if (response.place_id) {
        this.setMarker({placeId: response.place_id});
      } else {
        this.setMarker({location: this.chisinauLatLng});
      }
    });

  }

  onNext() {
    if (this.contactDataForm.valid) {
      console.log({form: this.contactDataForm, latLng: this.marker.getPosition().toString()});
      this.router.navigate(['step', ++this.navService.currentStep]);
    } else {
      Utils.markFormGroupTouched(<FormGroup>this.contactDataForm);
    }
  }

  onBack() {
    this.router.navigate(['step', --this.navService.currentStep]);
  }

  onCancel() {
    this.contactDataForm.reset();
    this.map.setCenter(this.chisinauLatLng);
    this.marker.setPosition(this.chisinauLatLng);
  }

  setMarker(request: GeocoderRequest) {
    this.geocoder.geocode(request, (results: GeocoderResult[], status: GeocoderStatus) => {
        if (status === GeocoderStatus.OK) {
          const geocoderLocation = results[0].geometry.location;
          this.marker.setPosition(geocoderLocation);
          this.map.setCenter(geocoderLocation);
        } else {
          console.log(status);
        }
      }
    );
  }
}
