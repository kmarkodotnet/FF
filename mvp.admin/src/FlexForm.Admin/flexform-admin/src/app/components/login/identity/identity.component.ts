import { Component, OnInit } from '@angular/core';
import * as OidcClient from '../../../../../node_modules/oidc-client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {
  mgr:OidcClient.UserManager;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    let query = window.location.href.replace("loginCallBack#","loginCallBack?");
    let that = this;
    let mgr = new OidcClient.UserManager({response_mode:"query"});
    mgr.signinRedirectCallback(query).then(function(user) {
      var url = "http://localhost:54856/api/v1/calltest/";
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = function () {
              console.log(xhr.status);
              console.log(xhr.responseText);
              //console.log(JSON.parse(xhr.responseText));
          }
          xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
          xhr.send();
    }).catch(function(e) {
        console.error(e);
    });

    console.log(query);
  }

  // login() {
  //   let config = {
  //     authority: "http://localhost:54856/",//home/callapi",
  //     client_id: "native.code",
  //     redirect_uri: "http://localhost:49153/loginCallBack",
  //     response_type: "code",
  //     scope:"openid email profile DDE.API offline_access IdentityServerApi",//scope_name 
  //     post_logout_redirect_uri : "http://localhost:49153/",
  //   };

  login() {
    let config = {
      authority: "http://localhost:54856/",//home/callapi",
      client_id: "angularui",
      redirect_uri: "http://localhost:4200/loginCallBack",
      response_type: "id_token token",
      scope:"openid email profile DDE.API offline_access IdentityServerApi",//scope_name 
      post_logout_redirect_uri : "http://localhost:4200/",
    };

    this.mgr = new OidcClient.UserManager(config);
    this.mgr.signinRedirect();
  }

  api() {
    this.mgr.signinRedirect().then(function (user) {
          var url = "http://localhost:54856/home/secure";
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = function () {
              console.log(xhr.status);
              console.log(JSON.parse(xhr.responseText));
          }
          xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
          xhr.send();
      });
  }

  logout() {
    this.mgr.signoutRedirect();
  }
}
