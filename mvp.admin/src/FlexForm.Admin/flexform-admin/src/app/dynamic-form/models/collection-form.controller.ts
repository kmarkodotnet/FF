import { IFormModel } from './interfaces/form-model.interface';
import { FormDefinition, EntityDefinition, EntityInstance, ItemSourceDefinition } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { IFormView } from './interfaces/form-view.interface';
import { IFormController } from './interfaces/form-controller.interface';
import { PrimitiveFormController } from './primitive-form.controller';
import { IItemSourceService } from '../../models/interfaces/item-source-service.interface';
import { CollectionFormModel } from './collection-form.model';

export class CollectionFormController extends PrimitiveFormController {
    
    itemSourceService:IItemSourceService;
  
    constructor(form: IForm,itemSourceService:IItemSourceService) {
        super(form);
        this.itemSourceService = itemSourceService;
    }

    async loadItems(itemSourceDefinition:ItemSourceDefinition):Promise<void>{
        await this.itemSourceService.itemSource(itemSourceDefinition).then(iss =>{
            (<CollectionFormModel>this.form.model).items = iss;
        });
    }
}