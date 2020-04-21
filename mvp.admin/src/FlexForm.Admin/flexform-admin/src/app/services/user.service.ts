import { Injectable } from '@angular/core';
import { UserModel } from '../models/dtos';
import { DynamicService } from '.';
import { ApiUrls } from './apiUrls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
  public constructor(private http: HttpClient,private dynamicService: DynamicService) { }

  public getUsers(): Promise<UserModel[]> {
      return this.http.get(ApiUrls.API_USER)
          .toPromise()
          .then(o => {
            let eds = o as UserModel[];
            //this.dynamicService.setEntityDefinitions(eds);
            return eds;
          });
  }

  public getUser(id: string): Promise<UserModel> {
    return this.http.get(ApiUrls.API_USER + id)
        .toPromise()
        .then(o => o as UserModel);
  }

  public saveUser(entityDefinition: UserModel): Promise<UserModel> {
    return this.http.post(ApiUrls.API_USER,entityDefinition)
    .toPromise()
    .then(o => o as UserModel);
  }

  public deleteUser(id: string): Promise<{}>{
    return this.http.delete(ApiUrls.API_USER + id).toPromise();
  }

  public grant(userId: string, groupId: string): Promise<{}>{
    return this.http.get(ApiUrls.API_USER+"membership/"+userId+"/"+groupId).toPromise();
  }

  public revoke(userId: string, groupId: string): Promise<{}>{
    return this.http.delete(ApiUrls.API_USER+"membership/"+userId+"/"+groupId).toPromise();
  }

  baseUrl: string = '';
  facebookLogin(accessToken:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ accessToken });  
    // return this.http
    //   .post(
    //   this.baseUrl + '/externalauth/facebook', body, { 
    //   //  headers
    //    })
    //   //.map(res => res.json())
    //   .map(res => {
    //     localStorage.setItem('auth_token', res.auth_token);
    //     // this.loggedIn = true;
    //     // this._authNavStatusSource.next(true);
    //     return true;
    //   })
    //   .catch(this.handleError);
  }
}