import { BaseWithTimeStamp } from "./base-with-timestamp.model";

export class UserSaveModel extends BaseWithTimeStamp<string> {
    userName:string;
    firstName:string;
    lastName:string;
}