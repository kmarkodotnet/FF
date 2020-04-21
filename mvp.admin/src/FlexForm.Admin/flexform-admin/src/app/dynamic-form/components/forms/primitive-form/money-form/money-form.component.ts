import { Component, OnInit } from '@angular/core';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';

@Component({
  selector: 'app-money-form',
  templateUrl: './money-form.component.html',
  styleUrls: ['./money-form.component.css']
})
export class MoneyFormComponent  extends PrimitiveFormComponent implements OnInit {

  constructor(protected basePropertyConverterService:BasePropertyConverterService) {
    super(basePropertyConverterService);
  }

  ngOnInit() {
    
  }

}
