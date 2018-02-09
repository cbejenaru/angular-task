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

  onSned() {

  }

  onBack() {
    this.navServ.currentStep--;
    this.router.navigate(['/step', this.navServ.currentStep]);
  }
}
