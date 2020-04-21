import { BaseProperty } from "../properties";
import { Guid } from 'guid-typescript';

export interface LowLevelPropertyService{
    createProperty(guid: Guid, defaultValue: any, filterProperty?: any):Promise<BaseProperty<any>>;
    reloadProperty(guid: Guid, value: any, filterProperty?: any):Promise<BaseProperty<any>>;
    getName():string;
}