import { Component, OnInit } from '@angular/core';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { NonBindingFormComponent } from '../non-binding-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';

@Component({
  selector: 'app-icon-form',
  templateUrl: './icon-form.component.html',
  styleUrls: ['./icon-form.component.css']
})
export class IconFormComponent  extends NonBindingFormComponent implements OnInit {

  constructor(protected basePropertyConverterService:BasePropertyConverterService) {
    super(basePropertyConverterService);
  }

  ngOnInit() {
    
  }

}
