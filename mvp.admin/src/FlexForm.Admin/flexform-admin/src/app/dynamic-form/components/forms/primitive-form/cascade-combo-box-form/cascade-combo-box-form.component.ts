import { Component, OnInit } from '@angular/core';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';

@Component({
  selector: 'app-cascade-combo-box-form',
  templateUrl: './cascade-combo-box-form.component.html',
  styleUrls: ['./cascade-combo-box-form.component.css']
})
export class CascadeComboBoxFormComponent  extends PrimitiveFormComponent implements OnInit {

  constructor(protected basePropertyConverterService:BasePropertyConverterService) {
    super(basePropertyConverterService);
  }

  ngOnInit() {
    
  }

}
