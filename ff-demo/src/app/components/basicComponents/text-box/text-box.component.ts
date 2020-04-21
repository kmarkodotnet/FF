import { Component } from '@angular/core';
import { TextBoxModel } from '../../../models/basicModels/text-box.model';
import { PrimitiveForm } from '../primitive-form/primitive-form.component';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent extends PrimitiveForm<string, TextBoxModel> {
}
