/**
 * @author:msms
 * 11-Jun-17
 */
import {Directive, Host, TemplateRef} from '@angular/core';
import {IqSelect2Component} from '../iq-select2/iq-select2.component';

@Directive({selector: '[iq-select2-icon-template]'})
export class IqSelect2TemplateDirective<T> {
  constructor(private templateRef: TemplateRef<T>, @Host() host: IqSelect2Component) {
    if (host instanceof IqSelect2Component) {
      host.templateRef = templateRef;
    }
  }
}
