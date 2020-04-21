import { UserSaveModel } from './user-save.model';
import { UserGroupModel } from './user-group.model';

export class UserModel extends UserSaveModel{
    userGroups:UserGroupModel[];
}