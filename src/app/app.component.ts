import {Component, OnInit} from '@angular/core';
import {NavigationService} from './navigation.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private navService: NavigationService,
              private router: Router,
              public translateService: TranslateService) {

  }

  ngOnInit() {
    this.router.navigate(['/step', this.navService.currentStep]);
    this.translateService.addLangs(['en', 'ro', 'ru']);
    this.translateService.setDefaultLang('en');

    this.translateService.use('en');
  }


}
