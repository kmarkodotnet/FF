import { Component, OnInit } from '@angular/core';
import { CollectionFormComponent } from '../collection-form.component';
import { KeyValuePair } from '../../../../../dynamic-form/models/key-value-pair.mode';
import { EntityInstance } from '../../../../../models/dtos';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';
import { EntityDefinitionService } from '../../../../../services';
import { CollectionFormModel } from '../../../../../dynamic-form/models/collection-form.model';

@Component({
  selector: 'app-check-box-group-form',
  templateUrl: './check-box-group-form.component.html',
  styleUrls: ['./check-box-group-form.component.css']
})
export class CheckBoxGroupFormComponent extends CollectionFormComponent implements OnInit {

  itemsDictionary:KeyValuePair<EntityInstance,boolean>[];
  
  constructor(protected basePropertyConverterService:BasePropertyConverterService,
    protected entityDefinitionService:EntityDefinitionService) {
    super(basePropertyConverterService,entityDefinitionService);
  }
  
  postNgOnInit(): Promise<void> {    
    this.itemsDictionary = this.toDictionary((<CollectionFormModel>this.model).items,new Array<EntityInstance>());
    return Promise.resolve();
  }

  toDictionary(allItems:EntityInstance[],selectedItems:EntityInstance[]):KeyValuePair<EntityInstance,boolean>[]{
    let dict = new Array<KeyValuePair<EntityInstance,boolean>>();
    allItems.forEach(item =>{
      let kvp = new KeyValuePair(item,selectedItems.findIndex(i => i.id == item.id)>=0);
      dict.push(kvp);
    });
    return dict;
  }

  itemClicked(data:KeyValuePair<EntityInstance,boolean>){
    data.value = !data.value;
  }

  get selectedItems():EntityInstance[]{
    let selectedItems = new Array<EntityInstance>();
    this.itemsDictionary.filter(i => i.value).forEach(i => selectedItems.push(i.key));
    return selectedItems;
  }
}
