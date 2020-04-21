import { Component } from '@angular/core';
import { DateSelectorModel } from '../../../models/basicModels/date-selector.model';
import { PrimitiveForm } from '../primitive-form/primitive-form.component';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent extends PrimitiveForm<Date, DateSelectorModel>  {
}
