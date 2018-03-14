import { TranslateModule } from '@ngx-translate/core';
import { CongratsLastComponent } from './congrats-last.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongratsLastRoutingModule } from './congrats-last-routing.module';

@NgModule({
  imports: [CommonModule, CongratsLastRoutingModule, TranslateModule],
  declarations: [CongratsLastComponent],
})
export class CongratsLastModule {}
