import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { NavigationService } from '../navigation.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css', '../app.component.css'],
})
export class LocationInfoComponent implements OnInit {
  locationInfoForm: FormGroup;
  company: string = '';
  categories: String[] = [];
  prices: String[] = [];

  constructor(
    private router: Router,
    private navService: NavigationService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.loadData();

    this.locationInfoForm = this.formBuilder.group({
      company: [this.company],
      comercialName: ['', [Validators.required, Validators.maxLength(25)]],
      discount: ['', [Validators.required, this.discountValidator]],
      reservation: [false],
      category: ['', [Validators.required]],
      averagePrice: ['', [Validators.required]],
      descriptionRo: ['', [Validators.required, Validators.maxLength(250)]],
      descriptionRu: ['', [Validators.required, Validators.maxLength(250)]],
    });

    if (localStorage.getItem('step1') !== null) {
      const stored = JSON.parse(localStorage.getItem('step1'));

      Object.keys(this.locationInfoForm.controls).forEach(key => {
        this.locationInfoForm.get(key).setValue(stored[key]);
      });
    }
  }

  private loadData() {
    this.httpClient.get('./assets/mock/first.json').subscribe(data => {
      this.company = data['company'];
      this.locationInfoForm.get('company').setValue(this.company);
      this.categories = data['categories'];
      this.prices = data['prices'];
    });
  }

  onNext() {
    if (this.locationInfoForm.valid) {
      this.navService.currentStep += 1;
      this.router.navigate(['step', this.navService.currentStep]);
      localStorage.setItem(
        'step1',
        JSON.stringify(this.locationInfoForm.value),
      );
    } else {
      Utils.markFormGroupTouched(this.locationInfoForm);
    }
  }

  onCancel() {
    this.locationInfoForm.reset({ company: this.company });
  }

  private discountValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value < 7 || control.value > 100) {
      return { invalidRange: true };
    }
    return null;
  }
}
