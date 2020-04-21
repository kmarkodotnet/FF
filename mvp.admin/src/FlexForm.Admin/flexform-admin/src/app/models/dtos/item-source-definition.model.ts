import { BaseWithTimeStamp } from "./base-with-timestamp.model";

export class ItemSourceDefinition extends BaseWithTimeStamp<number>{
    name: string;
    itemSourceEntityDefinitionId:number;
    isSingleResult:boolean;
    itemSourceCondition:string;
    itemSourceDefaultOrder:string;
    includeProperties:string;
    pageSize:number;    
}