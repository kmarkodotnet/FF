import { Injectable } from '@angular/core';
import { EntityInstance } from '../../models/dtos/entity-instance';

@Injectable()
export class ClaimInstancesData {

    entityInstances:string;
    constructor() {
        this.entityInstances = '{ "claims":[{ "id":11, "entityDefinition":"claim", "fieldValues":{"claimDate":"1812-03-05","place":{ "id":111, "entityDefinition":"address", "fieldValues":{"addressLine1":"7706 Grant Street","addressLine2":"","city":"Peoria","country":"Epuyta","postcode":"IL 61604" }}, "description":"Pirate attack", "solution":"None", "finished":true }},{ "id":12, "entityDefinition":"claim", "fieldValues":{"claimDate":"1815-07-22","place":{ "id":121, "entityDefinition":"address", "fieldValues":{"addressLine1":"9041 North Lakeshore Dr.","addressLine2":"","city":"Hempstead","country":"Epuyta","postcode":"NY 11550" }}, "description":"Bonefire became uncontrolled", "solution":"", "finished":false }} ]}';
    }
    
    getClaims():EntityInstance[]{
        let obj = JSON.parse(
            this.entityInstances
        );
        let ps = obj.claims;
        return ps;
    }
    
    setClaims(entityInstances: EntityInstance[]):void{
        let str = JSON.stringify(
            entityInstances
        );
        this.entityInstances = '{"claims": ' +str+ '}';
    }
}
