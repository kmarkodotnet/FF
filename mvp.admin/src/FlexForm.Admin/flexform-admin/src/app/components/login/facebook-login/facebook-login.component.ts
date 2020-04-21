import { Component, OnInit } from '@angular/core';
declare var FB: any;
// import { Component } from '@angular/core';

// import { Router } from '@angular/router';
// import { UserService } from '../../../services/user.service';
 

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit {
  ngOnInit() {

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '2457057304581279',
        cookie     : true,
        xfbml      : true,
        version    : 'v4.0'
      });
      FB.AppEvents.logPageView();
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

  }

   checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    });
  }
    
    statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
  }

  submitLogin(){
    console.log("submit login to facebook");
    FB.login((response)=>
        {
          console.log(response);
          if (response.authResponse)
          {
            //The method FB.api can no longer be called from http pages. https://developers.facebook.com/blog/post/2018/06/08/enforce-https-facebook-login/
            FB.api('/me', {fields: 'name, email'}, function(response) {
              console.log(response);
            });
           }
           else
           {
           console.log('User login failed');
         }
      });

  }
}