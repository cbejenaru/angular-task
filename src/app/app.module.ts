import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { Ng2ImgurUploaderModule } from 'ng2-imgur-uploader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LocationInfoComponent } from './location-info/location-info.component';
import { FooterComponent } from './footer/footer.component';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { ContactDataComponent } from './contact-data/contact-data.component';
import { PhotosComponent } from './photos/photos.component';
import { FiltersComponent } from './filters/filters.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { IqSelect2Module } from './filters/component-wrapper/src/app/iq-select2.module';
import { IqSelect2IconModule } from './additions-and-prices/component-wrapper/src/app/iq-select2-icon.module';
import { AdditionsAndPricesComponent } from './additions-and-prices/additions-and-prices.component';
import { CongratsLastComponent } from './congrats-last/congrats-last.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationService } from './navigation.service';
import { DropdownDirective } from './shared/dropdown.directive';

export function httpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProgressBarComponent,
    FooterComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    IqSelect2Module,
    IqSelect2IconModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
