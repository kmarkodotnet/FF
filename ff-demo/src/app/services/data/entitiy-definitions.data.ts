import { Injectable } from '@angular/core';
import { EntityDefinition } from '../../models/dtos/entity-definition';

@Injectable()
export class EntityDefinitionsData {

    entityDefinitions:string;
    constructor() {
        this.entityDefinitions = '{  "entityDefinitions": [  {  "name": "person",  "fieldDefinitions": [  {  "name": "firstName",  "type": "text"  },  {  "name": "lastName",  "type": "text"  },  {  "name": "mothersMaidenName",  "type": "text"  },  {  "name": "birthdate",  "type": "date"  },  {  "name": "vipMember",  "type": "bool",  "defaultValue": false  },  {  "name": "homeAddress",  "type": "address"  }  ]  },  {  "name": "claim",  "fieldDefinitions": [  {  "name": "claimDate",  "type": "date"  },  {  "name": "place",  "type": "address"  },  {  "name": "description",  "type": "text"  },  {  "name": "solution",  "type": "text"  },  {  "name": "finished",  "type": "bool",  "defaultValue": false  }  ]  },  {  "name": "address",  "fieldDefinitions": [  {  "name": "addressLine1",  "type": "text"  },  {  "name": "addressLine2",  "type": "text"  },  {  "name": "city",  "type": "text"  },  {  "name": "country",  "type": "text"  },  {  "name": "postcode",  "type": "text"  }  ]  }  ] }';
    }
    
    getEntityDefinitions():EntityDefinition[]{
        let obj = JSON.parse(this.entityDefinitions);
        let es = obj.entityDefinitions;
        return es;
    }
}
