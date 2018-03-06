import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationService} from '../navigation.service';

@Component({
  selector: 'app-congrats-last',
  templateUrl: './congrats-last.component.html',
  styleUrls: ['./congrats-last.component.css',
    '../app.component.css']
})
export class CongratsLastComponent implements OnInit {

  constructor(private navServ: NavigationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSend() {
    let dataToSend = {
      step1: JSON.parse(localStorage.getItem('step1')),
      step2: JSON.parse(localStorage.getItem('step2')),
      step3: JSON.parse(localStorage.getItem('step3')),
      step4: JSON.parse(localStorage.getItem('step4')),
      step5: JSON.parse(localStorage.getItem('step5')),
      step6: JSON.parse(localStorage.getItem('step6')),
    };
    console.log(JSON.stringify(dataToSend));
  }

  onBack() {
    this.router.navigate(['/step', --this.navServ.currentStep]);
  }
}
