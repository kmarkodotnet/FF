import { Component, OnInit } from '@angular/core';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';
import { EntityDefinitionService } from '../../../../../services/entity-definition.service';
import { CollectionFormModel } from '../../../../../dynamic-form/models/collection-form.model';
import { CollectionFormController } from '../../../../../dynamic-form/models/collection-form.controller';
import { PropertyNameConstants } from '../../../../../property-name-constants';
import { CollectionFormComponent } from '../collection-form.component';

@Component({
  selector: 'app-radio-button-form',
  templateUrl: './radio-button-form.component.html',
  styleUrls: ['./radio-button-form.component.css']
})
export class RadioButtonFormComponent  extends CollectionFormComponent implements OnInit {
  
  constructor(protected basePropertyConverterService:BasePropertyConverterService,
    protected entityDefinitionService:EntityDefinitionService) {
    super(basePropertyConverterService,entityDefinitionService);
  }

  postNgOnInit(): Promise<void> {
    return Promise.resolve();  
  }
  // async ngOnInit() {
  //   (<CollectionFormModel>this.model).items = await (<CollectionFormController>this.controller).itemSourceService.itemSource(this.view.viewDefinition.formControlBinding.fieldDefinition.itemSourceDefinition);
  //   let fieldDefinitionId = this.basePropertyConverterService.getValue(this.view.viewDefinition.uiProperties,PropertyNameConstants.PROPERTIES);
  //   let ed = await this.entityDefinitionService.get(this.view.viewDefinition.formControlBinding.fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId);
  //   let fieldDefinitionIndex = ed.fieldDefinitions.findIndex(fd => fd.id == fieldDefinitionId);
  //   if(fieldDefinitionIndex >= 0){
  //     this.columnName = ed.fieldDefinitions[fieldDefinitionIndex].name;
  //   }  
  // }

  get dataList(){
    return (<CollectionFormModel>this.model).items;
  }
}
