/**
 * @author:msms
 * 11-Jun-17
 */
import {Directive, Host, TemplateRef} from '@angular/core';
import {IqSelect2IconComponent} from '../iq-select2-icon/iq-select2icon.component';

@Directive({selector: '[iq-select2-icon-template]'})
export class IqSelect2IconTemplateDirective<T> {
  constructor(private templateRef: TemplateRef<T>, @Host() host: IqSelect2IconComponent) {
    if (host instanceof IqSelect2IconComponent) {
      host.templateRef = templateRef;
    }
  }
}
