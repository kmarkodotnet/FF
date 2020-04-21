import { Injectable } from '@angular/core';
import { EntityInstance } from '../../models/dtos/entity-instance';
@Injectable()
export class PersonInstancesData {

    entityInstances:string;

    constructor() {
        this.entityInstances = '{"persons": [{"id": 1,"entityDefinition": "person","fieldValues": {"firstName": "Pete","lastName": "Blackbeard","mothersMaidenName": "Sally Young","birthdate": "1796-05-23","vipMember": false,"homeAddress": {"id": 101,"entityDefinition": "address","fieldValues": {"addressLine1": "7674 Cathedral St","addressLine2": "","city": "Goodlettsville","country": "Epuyta","postcode": "TN 37072"}}}},{"id": 2,"entityDefinition": "person","fieldValues": {"firstName": "Captain","lastName": "Bill","mothersMaidenName": "Aleena Gibbons","birthdate": "1788-10-15","vipMember": true,"homeAddress": {"id": 102,"entityDefinition": "address","fieldValues": {"addressLine1": "9556 Apostle Street","addressLine2": "","city": "Klewood","country": "Puoset","postcode": "PA 17331"}}}},{"id": 3,"entityDefinition": "person","fieldValues": {"firstName": "John","lastName": "Largeparrot","mothersMaidenName": "Cleo Fuller","birthdate": "1801-03-12","vipMember": false,"homeAddress": {"id": 103,"entityDefinition": "address","fieldValues": {"addressLine1": "1278  Masonic Hill Road","addressLine2": "3th Floor","city": "Antadence","country": "Adenaby","postcode": "AA23C"}}}}]}';
    }
    
    getPersons():EntityInstance[]{
        let obj = JSON.parse(
            this.entityInstances
        );
        let ps = obj.persons;
        return ps;
    }

    setPersons(entityInstances: EntityInstance[]):void{
        let str = JSON.stringify(
            entityInstances
        );
        this.entityInstances = '{"persons": ' +str+ '}';
    }
}
