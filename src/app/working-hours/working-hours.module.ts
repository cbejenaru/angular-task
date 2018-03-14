import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingHoursRoutingModule } from './working-hours-routing.module';
import { WorkingHoursComponent } from './working-hours.component';

@NgModule({
  imports: [
    CommonModule,
    WorkingHoursRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [WorkingHoursComponent]
})
export class WorkingHoursModule { }
