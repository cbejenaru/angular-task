import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDataRoutingModule } from './contact-data-routing.module';
import { ContactDataComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    ContactDataRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [ContactDataComponent]
})
export class ContactDataModule { }
