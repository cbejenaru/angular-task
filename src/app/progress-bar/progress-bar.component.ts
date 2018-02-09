import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../navigation.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  constructor(private navSer: NavigationService) {
  }

  ngOnInit() {
  }

  isActive(step: number): boolean {
    return step === this.navSer.currentStep;
  }

  isDone(step: number): boolean {
    return step < this.navSer.currentStep;
  }
}
