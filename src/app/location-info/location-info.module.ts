import { LocationInfoComponent } from './location-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationInfoRoutingModule } from './location-info-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    LocationInfoRoutingModule,
    ReactiveFormsModule,
    TranslateModule 
  ],
  declarations: [LocationInfoComponent]
})
export class LocationInfoModule { }
