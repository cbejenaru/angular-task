import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../navigation.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.css']
})
export class NavigationButtonsComponent implements OnInit {
  hasBack: Boolean;

  constructor(private navServ: NavigationService,
              private router: Router) {
  }

  ngOnInit() {
    this.hasBack = this.navServ.currentStep > 1;
    console.log('currentStep: ' + this.navServ.currentStep);
    console.log('hasBack: ' + this.hasBack);
  }

  onBack() {
    this.navServ.previousStep();
    this.router.navigate(['/step', this.navServ.currentStep]);
  }

  onNext() {
    this.navServ.nextStep();
    this.router.navigate(['/step', this.navServ.currentStep]);

  }
}
