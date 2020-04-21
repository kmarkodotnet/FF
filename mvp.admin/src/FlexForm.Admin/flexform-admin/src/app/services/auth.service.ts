import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(protected http: HttpClient) { }

  token:string;
  setToken(token:string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  public callApi(token:string){
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     //'access_token': token
    //   })
    // };
    //,httpOptions
    return this.http.get('http://localhost:54856/home/callapi')
      .toPromise()
      .then(() => 
        {
          console.log("xxx");
        }
      ).catch(ex=>{
        console.log(ex);
      });
    // 
  }
}
