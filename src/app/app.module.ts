import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {LocationInfoComponent} from './location-info/location-info.component';
import {FooterComponent} from './footer/footer.component';
import {WorkingHoursComponent} from './working-hours/working-hours.component';
import {ContactDataComponent} from './contact-data/contact-data.component';
import {PhotosComponent} from './photos/photos.component';
import {FiltersComponent} from './filters/filters.component';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {IqSelect2Module} from './filters/component-wrapper/src/app/iq-select2.module';
import {AdditionsAndPricesComponent} from './additions-and-prices/additions-and-prices.component';
import {CongratsLastComponent} from './congrats-last/congrats-last.component';
import {AppRoutingModule} from './app-routing.module';
import {NavigationButtonsComponent} from './navigation-buttons/navigation-buttons.component';
import {NavigationService} from './navigation.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {Ng2ImgurUploaderModule} from 'ng2-imgur-uploader';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProgressBarComponent,
    LocationInfoComponent,
    FooterComponent,
    WorkingHoursComponent,
    ContactDataComponent,
    PhotosComponent,
    FiltersComponent,
    AdditionsAndPricesComponent,
    CongratsLastComponent,
    NavigationButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    IqSelect2Module,
    ImageCropperModule,
    Ng2ImgMaxModule,
    Ng2ImgurUploaderModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
