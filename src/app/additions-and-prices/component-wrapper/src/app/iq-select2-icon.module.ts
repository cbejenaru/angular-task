import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IqSelect2IconComponent } from './iq-select2-icon/iq-select2icon.component';
import { IqSelect2IconResultsComponent } from './iq-select2-icon-results/iq-select2-results.component';
import { CommonModule } from '@angular/common';
import { IqSelect2IconTemplateDirective } from './iq-select2-icon-template/iq-select2-template.directive';

@NgModule({
  declarations: [
    IqSelect2IconComponent,
    IqSelect2IconResultsComponent,
    IqSelect2IconTemplateDirective,
  ],
  imports: [CommonModule, FormsModule, HttpModule, ReactiveFormsModule],
  exports: [
    IqSelect2IconComponent,
    IqSelect2IconResultsComponent,
    IqSelect2IconTemplateDirective,
  ],
})
export class IqSelect2IconModule {}
