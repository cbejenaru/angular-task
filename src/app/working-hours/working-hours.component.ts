import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {NavigationService} from '../navigation.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.css', '../app.component.css']
})
export class WorkingHoursComponent implements OnInit {
  workingHoursForm: FormGroup;
  timePattern = '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';
  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  constructor(private navService: NavigationService,
              private router: Router) {
  }

  ngOnInit() {
    this.workingHoursForm = new FormGroup({
      'monday': new FormGroup({
        'from': new FormControl({
          value: null,
          disabled: false
        }, [Validators.pattern(this.timePattern), Validators.required]),
        'to': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'mode': new FormControl('open')
      }),
      'tuesday': new FormGroup({
        'from': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'to': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'mode': new FormControl('open')
      }),
      'wednesday': new FormGroup({
        'from': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'to': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'mode': new FormControl('open')
      }),
      'thursday': new FormGroup({
        'from': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'to': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'mode': new FormControl('open')
      }),
      'friday': new FormGroup({
        'from': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'to': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'mode': new FormControl('open')
      }),
      'saturday': new FormGroup({
        'from': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'to': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'mode': new FormControl('open')
      }),
      'sunday': new FormGroup({
        'from': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'to': new FormControl(null, [Validators.pattern(this.timePattern), Validators.required]),
        'mode': new FormControl('open')
      }),
    });
  }

  onNext() {
    if (this.workingHoursForm.valid) {
      this.router.navigate(['step', ++this.navService.currentStep]);
      console.log(this.workingHoursForm);
    } else {
      for (const day of this.days) {
        Utils.markFormGroupTouched(<FormGroup>this.workingHoursForm.get(day));
      }
    }
  }

  onBack() {
    this.router.navigate(['step', --this.navService.currentStep]);
  }

  onCancel() {
    this.workingHoursForm.reset();
    for (const day of this.days) {
      this.workingHoursForm.get(day + '.mode').setValue('open');
      this.enableInputs(day);
    }
  }

  cleanAndDisableInputs(day: string) {
    this.workingHoursForm.get(day + '.from').reset();
    this.workingHoursForm.get(day + '.to').reset();
    this.workingHoursForm.controls[day].get('from').disable();
    this.workingHoursForm.controls[day].get('to').disable();
  }

  enableInputs(day: string) {
    this.workingHoursForm.controls[day].get('from').enable();
    this.workingHoursForm.controls[day].get('to').enable();
  }

}
