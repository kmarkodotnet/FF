import { Injectable } from '@angular/core';
import { UserGroupModel } from '../models/dtos';
import { ApiUrls } from './apiUrls';
import { HttpClient } from '@angular/common/http';
import { DynamicService } from './dynamic.service';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  public constructor(private http: HttpClient,private dynamicService: DynamicService) { }

  public getUserGroups(): Promise<UserGroupModel[]> {
    return this.http.get(ApiUrls.API_USERGROUP)
        .toPromise()
        .then(o => {
          let eds = o as UserGroupModel[];
          //this.dynamicService.setEntityDefinitions(eds);
          return eds;
        });
  }

  public getUserGroup(id: string): Promise<UserGroupModel> {
    return this.http.get(ApiUrls.API_USERGROUP + id)
        .toPromise()
        .then(o => o as UserGroupModel);
  }

  public saveUserGroup(entityDefinition: UserGroupModel): Promise<UserGroupModel> {
    return this.http.post(ApiUrls.API_USERGROUP,entityDefinition)
    .toPromise()
    .then(o => o as UserGroupModel);
  }

  public deleteUserGroup(id: string): Promise<{}>{
    return this.http.delete(ApiUrls.API_USERGROUP + id).toPromise();
  }
}
