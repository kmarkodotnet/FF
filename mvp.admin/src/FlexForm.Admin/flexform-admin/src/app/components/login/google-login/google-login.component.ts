import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

declare const gapi: any;
@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {

  constructor(private element: ElementRef, private authService:AuthService) {
    console.log('ElementRef: ', this.element);
  }

  ngOnInit() {
  }
  // onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
  //private clientId:string = '409167539692-4eqnaq2jd1itl211gsgh3m2k7i02aefa.apps.googleusercontent.com';

  //enyém:
  //450672410978-r4no4reg8nob689v94727v4rtllfj065.apps.googleusercontent.com


  //This app hasn't been verified by Google yet. Only proceed if you know and trust the developer.
  private clientId:string = '693420364799-jb419gfl1e22l8641b1to61et3i5lnn9.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public logout(){
    gapi.auth.logout();
  }
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        console.log('Token || ' + token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        that.authService.setToken(token);
        that.authService.callApi(token);
        //YOUR CODE HERE


      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }


  ngAfterViewInit() {
    this.googleInit();
  }
}
