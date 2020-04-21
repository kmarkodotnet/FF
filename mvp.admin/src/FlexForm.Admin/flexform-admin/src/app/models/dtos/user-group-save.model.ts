import { Base } from "./base.model";

export class UserGroupSaveModel extends Base<string>{
    name:string;
    description:string;
    concurrencyStamp:string;
}