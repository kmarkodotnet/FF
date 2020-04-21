import { Injectable } from '@angular/core';
import { EntityInstance } from '../../models/dtos/entity-instance';

@Injectable()
export class AddressInstancesData {

    entityInstances:string;
    constructor() {
        this.entityInstances = '{ "addresses":[]}';
    }
    
    getAddresses():EntityInstance[]{
        let obj = JSON.parse(
            this.entityInstances
        );
        let ps = obj.addresses;
        return ps;
    }
    
    setAddresses(entityInstances: EntityInstance[]):void{
        let str = JSON.stringify(
            entityInstances
        );
        this.entityInstances = '{"addresses": ' +str+ '}';
    }
}
