import { Component, OnInit } from '@angular/core';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { NonBindingFormComponent } from '../non-binding-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.css']
})
export class LinkFormComponent  extends NonBindingFormComponent implements OnInit {

  constructor(protected basePropertyConverterService:BasePropertyConverterService) {
    super(basePropertyConverterService);
  }
  ngOnInit() {
    
  }

}
