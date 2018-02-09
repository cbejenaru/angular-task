import {Component, OnInit} from '@angular/core';
import {NavigationService} from './navigation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private navService: NavigationService,
              private router: Router) {

  }

  ngOnInit() {
    this.router.navigate(['/step', this.navService.currentStep]);
  }


}
