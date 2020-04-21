import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextBoxComponent } from './components/basicComponents/text-box/text-box.component';
import { CheckBoxComponent } from './components/basicComponents/check-box/check-box.component';
import { FormHostDirective } from './form-host.directive';
import { DateSelectorComponent } from './components/basicComponents/date-selector/date-selector.component';
import { FormComponent } from './components/basicComponents/form/form.component';

import { PersonInstancesData } from './services/data/person-instances.data';
import { ClaimInstancesData } from './services/data/claim-instances.data';
import { FormDefinitionsData } from './services/data/form-definitions.data';
import { EntityDefinitionsData } from './services/data/entitiy-definitions.data';
import { EntityInstanceService } from './services/entity-instance.service';
import { EntityDefinitionService } from './services/entity-definition.service';
import { MainFormComponent } from './components/main-form/main-form.component';
import { FormDefinitionService } from './services/form-definition.service';
import { ValidationService } from './services/validation.service';
import { PrimitiveForm } from './components/basicComponents/primitive-form/primitive-form.component';
import { AddressInstancesData } from './services/data/address-instances.data';

@NgModule({
  declarations: [
    AppComponent,
    TextBoxComponent,
    CheckBoxComponent,
    FormHostDirective,
    DateSelectorComponent,
    FormComponent,
    MainFormComponent,
    PrimitiveForm
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    ClaimInstancesData,
    AddressInstancesData,
    PersonInstancesData,
    FormDefinitionsData,
    EntityDefinitionsData,

    EntityInstanceService,
    EntityDefinitionService,
    FormDefinitionService,
    ValidationService
    
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    CheckBoxComponent,
    TextBoxComponent,
    DateSelectorComponent,
    FormComponent,
    PrimitiveForm
  ]
})
export class AppModule { }
