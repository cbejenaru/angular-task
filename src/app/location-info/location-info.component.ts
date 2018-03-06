import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {NavigationService} from '../navigation.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css', '../app.component.css']
})
export class LocationInfoComponent implements OnInit {
  locationInfoForm: FormGroup;

  constructor(private router: Router,
              private navService: NavigationService) {
  }

  ngOnInit() {
    this.locationInfoForm = new FormGroup({
      company: new FormControl({value: 'STAR HOLDING!', disabled: true}),
      comercialName: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      category: new FormControl(null, Validators.required),
      descriptionRo: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      discount: new FormControl(null, [Validators.required, this.discountValidator]),
      reservation: new FormControl(null),
      averagePrice: new FormControl(null, Validators.required),
      descriptionRu: new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });
    if (localStorage.getItem('step1') !== null) {
      const stored = JSON.parse(localStorage.getItem('step1'));
      this.locationInfoForm.get('comercialName').setValue(stored.comercialName);
      this.locationInfoForm.get('category').setValue(stored.category);
      this.locationInfoForm.get('descriptionRo').setValue(stored.descriptionRo);
      this.locationInfoForm.get('discount').setValue(stored.discount);
      this.locationInfoForm.get('reservation').setValue(stored.reservation);
      this.locationInfoForm.get('averagePrice').setValue(stored.averagePrice);
      this.locationInfoForm.get('descriptionRu').setValue(stored.descriptionRu);
    }

  }

  onNext() {
    if (this.locationInfoForm.valid) {
      this.router.navigate(['step', ++this.navService.currentStep]);
      localStorage.setItem('step1', JSON.stringify(this.locationInfoForm.value));
    } else {
      Utils.markFormGroupTouched(this.locationInfoForm);
    }
  }

  onCancel() {
    this.locationInfoForm.reset({company: 'STAR HOLDING!'});
  }

  discountValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value < 7 || control.value > 100) {
      return {'invalidRange': true};
    }
    return null;
  }

}
