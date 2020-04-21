import { Component } from '@angular/core';
import { FormDefinitionService, ErrorHandlerService, EntityDefinitionService, DynamicService } from '../../../services';
import { FormDefinition, EntityDefinition } from '../../../models/dtos';
import { EntityFormGroup } from '../../../models/ui';
import { Router } from '@angular/router';
import { ElementWithItemsComponent } from '../../common/element-with-items/element-with-items.component';

@Component({
  selector: 'app-form-list',
  templateUrl: '../../common/element-with-items/element-with-items.component.html',
  styleUrls: ['../../common/element-with-items/element-with-items.component.css']
})
export class FormListComponent extends ElementWithItemsComponent<EntityDefinition,FormDefinition> {

  private entityDefinitions: EntityDefinition[];
  formDefinitions: FormDefinition[];
  groupedDefinitions: EntityFormGroup[];
  constructor(private router: Router, 
    private dynamicService: DynamicService, private formDefinitionService: FormDefinitionService, private entityDefinitionService:EntityDefinitionService, private errorHandlerService: ErrorHandlerService) { 
    super();
  }

  getElementName(element: EntityDefinition): string {
    return element.name;
  }

  reloadElementWithItems(): void {
    this.dynamicService.clearFormControls();
    this.groupedDefinitions = new Array<EntityFormGroup>();
    this.entityDefinitionService.getAll().then((es) =>
    {
      this.entityDefinitions = es;

      this.formDefinitionService.getAll().then((fs) =>
      {
        this.formDefinitions = fs;

        this.entityDefinitions.forEach(ed => {
          let fds = this.formDefinitions.filter(fd => fd.entityDefinitionId == ed.id);
          this.groupedDefinitions.push(new EntityFormGroup(ed,fds));
        });
        
        this.initToggleDictionary();

      }).catch((error) => {
        this.errorHandlerService.handle(error);
      });
    }).catch((error) => {
      this.errorHandlerService.handle(error);      
    });
  }
  get getElements(){
    return this.entityDefinitions;
  }
  addItemCustom(element: EntityDefinition): void {
    this.router.navigate(['form/editor/new', element.id]);
  }
  addItemIsVisible(element: EntityDefinition): boolean {
    return true;
  }

  modifyElementCustom(element: EntityDefinition): void {
    this.router.navigate(['entity/editor/modify', element.id]);
  }
  modifyElementIsVisible(element: EntityDefinition): boolean {
    return true;
  }

  getItems(element: EntityDefinition): FormDefinition[] {
    if(this.groupedDefinitions){
      let index = this.groupedDefinitions.findIndex(d => d.entityDefinition === element);
      if(index >= 0){
        return this.groupedDefinitions[index].formDefinitions;
      }
    }
    return new Array<FormDefinition>();
  }
  getItemName(element: FormDefinition): string {
    return element.formName;
  }

  modifyItemCustom(element: FormDefinition): void {
    this.router.navigate(['form/editor/modify', element.id]);
  }  
  modifyItemIsVisible(element: FormDefinition): boolean {
    return true;
  }

  deleteItemCustom(element: EntityDefinition, item: FormDefinition): void {
    this.formDefinitionService.delete(item.id).then(() =>
    {
      this.reloadElementWithItems();
    }).catch((error) => {
      this.errorHandlerService.handle(error);
    });
  }
  deleteItemIsVisible(element: EntityDefinition,item: FormDefinition): boolean {
    return true;
  }

  viewItemCustom(element: FormDefinition): void {
    this.router.navigate(['form/editor/view', element.id]);
  }
  viewItemIsVisible(element: FormDefinition): boolean {
    return true;
  }

  cloneItemCustom(element: FormDefinition): void {
    this.router.navigate(['form/editor/clone', element.id]);
  }  
  cloneItemIsVisible(element: FormDefinition): boolean {
    return true;
  }
  
  deleteElementCustom(element: EntityDefinition): void {
    throw new Error("Method not implemented.");
  }
  deleteElementIsVisible(element: EntityDefinition): boolean {
    return false;
  }

  newElementCustom(): void {
    throw new Error("Method not implemented.");
  }
  newElementIsVisible(): boolean {
    return false;
  }
  getElementDisplayType():string{
    throw new Error("Method not implemented.");
  }
}
