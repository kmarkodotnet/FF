import { Guid } from 'guid-typescript';
import { BaseWithTimeStamp } from './base-with-timestamp.model';

export class FormControlItemSource extends BaseWithTimeStamp<number>{

    guid:Guid;

    constructor() {
        super();
        this.guid = Guid.create();
    }

    pageSize:Number;
    itemSourceCondition: string;
    itemSourceOrder: string;
    includeProperties: string;
}