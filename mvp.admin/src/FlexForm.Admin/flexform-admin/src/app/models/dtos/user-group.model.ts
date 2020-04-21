import { UserGroupSaveModel } from './user-group-save.model';
import { UserModel } from './user.model';

export class UserGroupModel extends UserGroupSaveModel {
    usersInGroup:UserModel[];
}