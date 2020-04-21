import { Component, OnInit } from '@angular/core';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';
import { FieldDefinition, EntityInstance } from '../../../../../models/dtos';
import { EntityDefinitionService } from '../../../../../services/entity-definition.service';
import { PrimitiveFormModel } from '../../../../../dynamic-form/models/primitive-form.model';
import { CollectionFormModel } from '../../../../../dynamic-form/models/collection-form.model';
import { CollectionFormComponent } from '../collection-form.component';

@Component({
  selector: 'app-hidden-form',
  templateUrl: './hidden-form.component.html',
  styleUrls: ['./hidden-form.component.css']
})
export class HiddenFormComponent  extends CollectionFormComponent implements OnInit {
  
  constructor(protected basePropertyConverterService:BasePropertyConverterService,
    protected entityDefinitionService:EntityDefinitionService) {
    super(basePropertyConverterService,entityDefinitionService);
  }

  postNgOnInit(): Promise<void> {
    return Promise.resolve();  
  }

  getValue():any{
    if(this.model.items != null && this.model.items != undefined && this.model.items.length >= 0){  
      return this.getDisplayText(this.model.value);
    }else{
      return this.model.value;
    }
  }

  get dataList(){
    return (<CollectionFormModel>this.model).items;
  }
}
