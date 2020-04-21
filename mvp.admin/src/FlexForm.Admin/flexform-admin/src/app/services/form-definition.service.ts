import { Injectable } from '@angular/core';
import { FormDefinition } from '../models/dtos';
import { ApiUrls } from './apiUrls';
import { HttpClient } from '@angular/common/http';
import { DynamicService } from './dynamic.service';
import { PropertyHandlerFactoryService } from './property-handler-factory.service';
import { BaseProperty } from '../models/properties/base-property.model';
import { BaseCacheService } from './cache/base-cache.service';

@Injectable({
  providedIn: 'root'
})
export class FormDefinitionService extends BaseCacheService<FormDefinition> {
  
  constructor(protected http: HttpClient, private dynamicService:DynamicService,
    private propertyHandlerFactoryService:PropertyHandlerFactoryService,
    ) { 
      super(http);
  }

  protected beforeSave(formDefinition: FormDefinition):void{
    this.degradeFormDefinitionProperties(formDefinition);
    this.updatePropertiesFromUiProperties(formDefinition);
  }
  protected getSaveUrl():string{
    return ApiUrls.API_FORMDEFINITION;
  }
  protected deleteCustom(id: number):string{
    return ApiUrls.API_FORMDEFINITION + id;
  }
  protected afterRefresh(data: FormDefinition[]): void {
    this.dynamicService.setFormDefinitions(data);
  }
  public getFormDefinitionsOfEntityDefinition(entityDefinitionId:number): Promise<FormDefinition[]> {
    if(this.getCacheAgeInMinutes()>this.refreshMinutes){
      return this.refresh().then(()=>{
        return this.elements.filter(f => f.entityDefinitionId == entityDefinitionId);
      });
    }else{
      return Promise.resolve(this.elements.filter(f => f.entityDefinitionId == entityDefinitionId));
    }
  }  

  protected degradeProperties(uiProperties: BaseProperty<any>[]):BaseProperty<any>[]{
    let degradedProperties = new Array<BaseProperty<any>>();
    uiProperties.forEach(p => 
      {
        let dp = new BaseProperty<any>(p.guid,p.name,p.value,p.emitIfChanged,p.isImmediateBind);
        dp.type = p.type;
        degradedProperties.push(dp);
      });

    return degradedProperties;
  }  
  degradeFormDefinitionProperties(formDefinition:FormDefinition){
    formDefinition.uiProperties = this.degradeProperties(formDefinition.uiProperties);
    formDefinition.formControls.forEach(c =>{
      c.uiProperties = this.degradeProperties(c.uiProperties);
      if(c.formControlBinding)
      {
        c.formControlBinding.uiProperties = this.degradeProperties(c.formControlBinding.uiProperties);
      }
    });
  }
  updatePropertiesFromUiProperties(formDefinition:FormDefinition){
    this.propertyHandlerFactoryService.getPropertyHandlerService(formDefinition).convertUiProperties(formDefinition);
    formDefinition.formControls.forEach(c =>{
      this.propertyHandlerFactoryService.getPropertyHandlerService(c).convertUiProperties(c);
      if(c.formControlBinding)
      {
        //TODO: ez az értékadás a cascade törlés miatt problémát okozna
        //később lesz új néven új (override) objektum, azt kell majd itt beállítani
        //c.itemSourceDefinitionId = c.formControlBinding.fieldDefinition.itemSourceDefinitionId;
        this.propertyHandlerFactoryService.getPropertyHandlerService(c.formControlBinding).convertUiProperties(c.formControlBinding);
      }
    });
  }
}
