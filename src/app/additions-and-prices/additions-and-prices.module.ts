import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IqSelect2IconModule } from './component-wrapper/src/app/iq-select2-icon.module';
import { AdditionsAndPricesComponent } from './additions-and-prices.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionsAndPricesRoutingModule } from './additions-and-prices-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdditionsAndPricesRoutingModule,
    IqSelect2IconModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [AdditionsAndPricesComponent],
})
export class AdditionsAndPricesModule {}
