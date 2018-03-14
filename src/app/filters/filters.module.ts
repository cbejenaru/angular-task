import { ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters.component';
import { IqSelect2Module } from './component-wrapper/src/app/iq-select2.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FiltersRoutingModule,
    IqSelect2Module,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [FiltersComponent],
})
export class FiltersModule {}
