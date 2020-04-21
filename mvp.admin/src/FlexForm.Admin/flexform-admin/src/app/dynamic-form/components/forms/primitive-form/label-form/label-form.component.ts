import { Component, OnInit } from '@angular/core';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { NonBindingFormComponent } from '../non-binding-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';

@Component({
  selector: 'app-label-form',
  templateUrl: './label-form.component.html',
  styleUrls: ['./label-form.component.css']
})
export class LabelFormComponent  extends NonBindingFormComponent implements OnInit {

  constructor(protected basePropertyConverterService:BasePropertyConverterService) {
    super(basePropertyConverterService);
  }

  ngOnInit() {
    
  }

}
