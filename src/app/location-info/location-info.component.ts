import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationService} from '../navigation.service';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css', '../app.component.css']
})
export class LocationInfoComponent implements OnInit {
  locationInfoForm: FormGroup;
  validForm = true;

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
  }

  onNext() {
    if (this.locationInfoForm.valid) {
      this.validForm = true;
      this.navService.currentStep++;
      this.router.navigate(['step', '2']);
      console.log(this.locationInfoForm);
    } else {
      this.validForm = false;
      this.markFormGroupTouched(this.locationInfoForm);
    }
  }

  onCancel() {
    this.locationInfoForm.reset();
  }

  discountValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value < 7 || control.value > 100) {
      return {'invalidRange': true};
    }
    return null;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

}
