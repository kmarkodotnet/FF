import { IFormHost } from '../../models/interfaces/form-host.interface';
import { FormHostDirective } from '../../directives/form-host.directive';
import { EntityInstance } from '../../../models/dtos/entity-instance.model';
import { ViewChild } from '@angular/core';

export abstract class Host implements IFormHost{
    @ViewChild(FormHostDirective) formHost: FormHostDirective;
    
    abstract render(): Promise<void>;

    abstract clear(): void;

    abstract load(entityInstance: EntityInstance): void;
}