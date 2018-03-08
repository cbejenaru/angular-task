import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('dropDown') dropDownMenu: ElementRef;

  constructor(public translateService: TranslateService) {
  }

  ngOnInit() {
  }

  onLangSelect(lang: string) {
    this.translateService.use(lang);
  }

}
