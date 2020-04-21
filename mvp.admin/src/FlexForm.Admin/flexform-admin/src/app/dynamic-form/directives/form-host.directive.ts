import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Dynamic form host
 */
@Directive({
  selector: '[appFormHost]'
})
export class FormHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
