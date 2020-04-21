import { Component, OnInit } from '@angular/core';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { NonBindingFormComponent } from '../non-binding-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';

@Component({
  selector: 'app-panel-form',
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.css']
})
export class PanelFormComponent  extends NonBindingFormComponent implements OnInit {

  constructor(protected basePropertyConverterService:BasePropertyConverterService) {
    super(basePropertyConverterService);
  }

  ngOnInit() {
    
  }

}
