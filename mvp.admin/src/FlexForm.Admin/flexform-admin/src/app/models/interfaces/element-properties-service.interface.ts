import { BaseProperty } from "../properties";

export interface ElementPropertiesServiceInterface<TDest>{
    createProperties(dest: TDest):Promise<BaseProperty<any>[]>;
    loadProperties(dest: TDest,uiProperties: BaseProperty<any>[]):Promise<void>;
}