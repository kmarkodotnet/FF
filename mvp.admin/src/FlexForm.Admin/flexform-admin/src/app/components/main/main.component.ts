import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormDefinitionService } from '../../services/form-definition.service';
import { EntityDefinitionService } from '../../services/entity-definition.service';
import { FormDefinition } from '../../models/dtos';
import { DynamicFormHostComponent } from '../../dynamic-form/components/dynamic-form-host/dynamic-form-host.component';

//import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('host') host: DynamicFormHostComponent;
  constructor(private formDefinitionService:FormDefinitionService,private entityDefinitionService:EntityDefinitionService) { }
  fd:FormDefinition;
  ngOnInit() {
    this.formDefinitionService.refresh();
    this.entityDefinitionService.refresh();
  }
//   gapi: any;
//   public auth2: any;
//   public googleInit() {
//     this.gapi.load('auth2', () => {
//       this.auth2 = this.gapi.auth2.init({
//         client_id: '"982613788453-jlar17ha7r17d71g3r158smd62ljnjfh.apps.googleusercontent.com',
//         cookiepolicy: 'single_host_origin',
//         scope: 'profile email'
//       });
//       this.attachSignin(document.getElementById('googleBtn'));
//     });
//   }
//   public attachSignin(element) {
//     this.auth2.attachClickHandler(element, {},
//       (googleUser) => {

//         let profile = googleUser.getBasicProfile();
//         console.log('Token || ' + googleUser.getAuthResponse().id_token);
//         console.log('ID: ' + profile.getId());
//         console.log('Name: ' + profile.getName());
//         console.log('Image URL: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail());
//         //YOUR CODE HERE


//       }, (error) => {
//         alert(JSON.stringify(error, undefined, 2));
//       });
//   }

// ngAfterViewInit(){
//       this.googleInit();
// }

}
