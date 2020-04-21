import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { NgModule } from '@angular/core';

import { DragDropModule  } from '@angular/cdk/drag-drop';
import { AgGridModule } from 'ag-grid-angular';

import { TokenInterceptor } from './services/token.interceptor';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserComponent } from './components/users/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { EntityEditorComponent } from './components/entityEditor/entity-editor/entity-editor.component';
import { FormEditorComponent } from './components/formEditor/form-editor/form-editor.component';
import { AgGridMaterialCheckboxCellComponent } from './components/common/ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridOperationsHeaderComponent } from './components/common/ag-grid-operations-header/ag-grid-operations-header.component';
import { AgGridUserOperationCellRendererComponent } from './components/common/ag-grid-user-operation-cell-renderer/ag-grid-user-operation-cell-renderer.component';
import { EntityListComponent } from './components/entityEditor/entity-list/entity-list.component';
import { AgGridEntityOperationCellRendererComponent } from './components/common/ag-grid-entity-operation-cell-renderer/ag-grid-entity-operation-cell-renderer.component';
import { EntityDefinitionService } from './services';
//import { AgGridPropertyCellRendererComponent } from './components/common/ag-grid-property-cell-renderer/ag-grid-property-cell-renderer.component';
import { AgGridEntityPropertyCellRendererComponent } from './components/common/ag-grid-property-cell-renderer/ag-grid-entity-property-cell-renderer.component';
import { AgGridFormPropertyCellRendererComponent } from './components/common/ag-grid-property-cell-renderer/ag-grid-form-property-cell-renderer.component';
import { EntityDesignerMode, FormDesignerMode } from './models/enums';
import { AlphaNumericCharacterDirective } from './directives/alpha-numeric-character.directive';
import { ErrorDialogComponent } from './components/common/error-dialog/error-dialog.component';
import { FormListComponent } from './components/formEditor/form-list/form-list.component';
//import { ElementWithItemsComponent } from './components/common/element-with-items/element-with-items.component';
import { UsersComponent } from './components/users/users/users.component';
import { GroupsComponent } from './components/users/groups/groups.component';
import { GroupComponent } from './components/users/group/group.component';
import { WarningDialogComponent } from './components/common/warning-dialog/warning-dialog.component';
import { FacebookLoginComponent } from './components/login/facebook-login/facebook-login.component';
import { GoogleLoginComponent } from './components/login/google-login/google-login.component';
import { ElementWithItemsComponent } from './components/common/element-with-items/element-with-items.component';
import { ContainerFormComponent } from './dynamic-form/components/forms/container-form/container-form.component';
import { FormHostDirective } from './dynamic-form/directives/form-host.directive';
import { PrimitiveFormComponent } from './dynamic-form/components/forms/primitive-form/primitive-form.component';
import { AutoCompleteBoxFormComponent } from './dynamic-form/components/forms/primitive-form/auto-complete-box-form/auto-complete-box-form.component';
import { ButtonFormComponent } from './dynamic-form/components/forms/primitive-form/button-form/button-form.component';
import { BreadcrumbFormComponent } from './dynamic-form/components/forms/primitive-form/breadcrumb-form/breadcrumb-form.component';
import { CascadeComboBoxFormComponent } from './dynamic-form/components/forms/primitive-form/cascade-combo-box-form/cascade-combo-box-form.component';
import { CheckBoxFormComponent } from './dynamic-form/components/forms/primitive-form/check-box-form/check-box-form.component';
import { ComboBoxFormComponent } from './dynamic-form/components/forms/primitive-form/combo-box-form/combo-box-form.component';
import { DataGridFormComponent } from './dynamic-form/components/forms/primitive-form/data-grid-form/data-grid-form.component';
import { DateTimeFormComponent } from './dynamic-form/components/forms/primitive-form/date-time-form/date-time-form.component';
import { DocumentDownloadFormComponent } from './dynamic-form/components/forms/primitive-form/document-download-form/document-download-form.component';
import { DocumentUploaderFormComponent } from './dynamic-form/components/forms/primitive-form/document-uploader-form/document-uploader-form.component';
import { DropDownFormComponent } from './dynamic-form/components/forms/primitive-form/drop-down-form/drop-down-form.component';
import { ExpressionEditorFormComponent } from './dynamic-form/components/forms/primitive-form/expression-editor-form/expression-editor-form.component';
import { HiddenFormComponent } from './dynamic-form/components/forms/primitive-form/hidden-form/hidden-form.component';
import { IconFormComponent } from './dynamic-form/components/forms/primitive-form/icon-form/icon-form.component';
import { LabelFormComponent } from './dynamic-form/components/forms/primitive-form/label-form/label-form.component';
import { LinkFormComponent } from './dynamic-form/components/forms/primitive-form/link-form/link-form.component';
import { ListBoxFormComponent } from './dynamic-form/components/forms/primitive-form/list-box-form/list-box-form.component';
import { MoneyFormComponent } from './dynamic-form/components/forms/primitive-form/money-form/money-form.component';
import { DecimalFormComponent } from './dynamic-form/components/forms/primitive-form/decimal-form/decimal-form.component';
import { RadioButtonFormComponent } from './dynamic-form/components/forms/primitive-form/radio-button-form/radio-button-form.component';
import { RichTextFormComponent } from './dynamic-form/components/forms/primitive-form/rich-text-form/rich-text-form.component';
import { TextFormComponent } from './dynamic-form/components/forms/primitive-form/text-form/text-form.component';
import { TreeFormComponent } from './dynamic-form/components/forms/primitive-form/tree-form/tree-form.component';
import { PanelFormComponent } from './dynamic-form/components/forms/primitive-form/panel-form/panel-form.component';
import { ImageFormComponent } from './dynamic-form/components/forms/primitive-form/image-form/image-form.component';
import { EditorDynamicFormHostComponent } from './dynamic-form/components/editor-dynamic-form-host/editor-dynamic-form-host.component';
import { DynamicFormHostComponent } from './dynamic-form/components/dynamic-form-host/dynamic-form-host.component';
import { PrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/primitive-form-wrapper.component';
import { EditorContainerFormComponent } from './dynamic-form/components/forms/editor-container-form/editor-container-form.component';
import { AutoCompleteBoxPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/auto-complete-box-primitive-form-wrapper.component';
import { ButtonPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/button-primitive-form-wrapper.component';
import { BreadcrumbPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/breadcrumb-primitive-form-wrapper.component';
import { CascadeComboBoxPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/cascade-combo-box-primitive-form-wrapper.component';
import { CheckBoxPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/check-box-primitive-form-wrapper.component';
import { ComboBoxPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/combo-box-primitive-form-wrapper.component';
import { DataGridPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/data-grid-primitive-form-wrapper.component';
import { DateTimePrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/date-time-primitive-form-wrapper.component';
import { DocumentDownloadPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/document-download-primitive-form-wrapper.component';
import { DocumentUploaderPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/document-uploader-primitive-form-wrapper.component';
import { DropDownPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/drop-down-primitive-form-wrapper.component';
import { ExpressionEditorPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/expression-editor-primitive-form-wrapper.component';
import { HiddenPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/hidden-primitive-form-wrapper.component';
import { IconPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/icon-primitive-form-wrapper.component';
import { LabelPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/label-primitive-form-wrapper.component';
import { LinkPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/link-primitive-form-wrapper.component';
import { ListBoxPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/list-box-primitive-form-wrapper.component';
import { MoneyPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/money-primitive-form-wrapper.component';
import { DecimalPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/decimal-primitive-form-wrapper.component';
import { RadioButtonPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/radio-button-primitive-form-wrapper.component';
import { RichTextPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/rich-text-primitive-form-wrapper.component';
import { TextPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/text-primitive-form-wrapper.component';
import { TreePrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/tree-primitive-form-wrapper.component';
import { PanelPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/panel-primitive-form-wrapper.component';
import { ImagePrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/image-primitive-form-wrapper.component';
//import { FormPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/form-primitive-form-wrapper.component';
import { FormBaseDirective } from './dynamic-form/directives/form-base.directive';
import { WrapperDirective } from './dynamic-form/directives/wrapper.directive';
import { InputDirective } from './dynamic-form/directives/input.directive';
import { LabelDirective } from './dynamic-form/directives/label.directive';
import { HeaderDirective } from './dynamic-form/directives/header.directive';
import { PreviewComponent } from './components/preview/preview.component';
import { ContainerFormDirective } from './dynamic-form/directives/container-form.directive';
import { NonBindingDirective } from './dynamic-form/directives/non-binding.directive';
import { IdentityComponent } from './components/login/identity/identity.component';
import { CheckBoxGroupFormComponent } from './dynamic-form/components/forms/primitive-form/check-box-group-form-component/check-box-group-form.component';
import { CheckBoxGroupPrimitiveFormWrapperComponent } from './dynamic-form/components/forms/primitive-form-wrapper/check-box-group-primitive-form-wrapper.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'entities', component: EntityListComponent, pathMatch: 'full' },
  { path: 'entity/editor/new', component: EntityEditorComponent, pathMatch: 'full' },  
  { path: 'entity/editor/view/:id', component: EntityEditorComponent, pathMatch: 'full', data: {editorMode: EntityDesignerMode.View} },  
  { path: 'entity/editor/modify/:id', component: EntityEditorComponent, pathMatch: 'full', data: {editorMode: EntityDesignerMode.Modify} },  
  { path: 'entity/editor/clone/:id', component: EntityEditorComponent, pathMatch: 'full', data: {editorMode: EntityDesignerMode.Clone} },  

  { path: 'forms', component: FormListComponent, pathMatch: 'full' },
  { path: 'form/editor/new/:id', component: FormEditorComponent, pathMatch: 'full', data: {editorMode: FormDesignerMode.New} },  
  { path: 'form/editor/view/:id', component: FormEditorComponent, pathMatch: 'full', data: {editorMode: FormDesignerMode.View} },  
  { path: 'form/editor/modify/:id', component: FormEditorComponent, pathMatch: 'full', data: {editorMode: FormDesignerMode.Modify} },  
  { path: 'form/editor/clone/:id', component: FormEditorComponent, pathMatch: 'full', data: {editorMode: FormDesignerMode.Clone} },  

  { path: 'users', component: UsersComponent, pathMatch: 'full' },
  { path: 'user/new', component: UserComponent, pathMatch: 'full' },
  { path: 'user/modify/:id', component: UserComponent, pathMatch: 'full' },
  
  { path: 'usergroups', component: GroupsComponent, pathMatch: 'full' },
  { path: 'usergroup/new', component: GroupComponent, pathMatch: 'full' },
  { path: 'usergroup/modify/:id', component: GroupComponent, pathMatch: 'full' },

  { path: 'preview/:id', component: PreviewComponent, pathMatch: 'full', },  

  { path: 'loginCallBack/:id_token', component: IdentityComponent, pathMatch: 'full', },  

  { path: '**', redirectTo: '' }
  
];

@NgModule({
  declarations: [
    FormHostDirective,
    AppComponent,
    MainComponent,
    UserListComponent,
    UserComponent,
    HomeComponent,
    EntityEditorComponent,
    FormEditorComponent,
    AgGridMaterialCheckboxCellComponent,
    AgGridOperationsHeaderComponent,
    AgGridUserOperationCellRendererComponent,
    AgGridEntityOperationCellRendererComponent,
    EntityListComponent,
    AgGridEntityPropertyCellRendererComponent,
    AgGridFormPropertyCellRendererComponent,
    AlphaNumericCharacterDirective,

    ErrorDialogComponent,
    FormListComponent,
    UsersComponent,
    GroupsComponent,
    GroupComponent,
    WarningDialogComponent,
    FacebookLoginComponent,
    GoogleLoginComponent,
    DynamicFormHostComponent,
    ContainerFormComponent,
    AutoCompleteBoxFormComponent,
    ButtonFormComponent,
    BreadcrumbFormComponent,
    CascadeComboBoxFormComponent,
    CheckBoxFormComponent,
    ComboBoxFormComponent,
    DataGridFormComponent,
    DateTimeFormComponent,
    DocumentDownloadFormComponent,
    DocumentUploaderFormComponent,
    DropDownFormComponent,
    ExpressionEditorFormComponent,
    HiddenFormComponent,
    IconFormComponent,
    LabelFormComponent,
    LinkFormComponent,
    ListBoxFormComponent,
    MoneyFormComponent,
    DecimalFormComponent,
    RadioButtonFormComponent,
    RichTextFormComponent,
    TextFormComponent,
    TreeFormComponent,
    PanelFormComponent,

    ImagePrimitiveFormWrapperComponent,
    //FormPrimitiveFormWrapperComponent,

    PrimitiveFormWrapperComponent,
    EditorContainerFormComponent,
    EditorDynamicFormHostComponent,

    AutoCompleteBoxPrimitiveFormWrapperComponent
,ButtonPrimitiveFormWrapperComponent
,BreadcrumbPrimitiveFormWrapperComponent
,CascadeComboBoxPrimitiveFormWrapperComponent
,CheckBoxPrimitiveFormWrapperComponent
,ComboBoxPrimitiveFormWrapperComponent
,DataGridPrimitiveFormWrapperComponent
,DateTimePrimitiveFormWrapperComponent
,DocumentDownloadPrimitiveFormWrapperComponent
,DocumentUploaderPrimitiveFormWrapperComponent
,DropDownPrimitiveFormWrapperComponent
,ExpressionEditorPrimitiveFormWrapperComponent
,HiddenPrimitiveFormWrapperComponent
,IconPrimitiveFormWrapperComponent
,LabelPrimitiveFormWrapperComponent
,LinkPrimitiveFormWrapperComponent
,ListBoxPrimitiveFormWrapperComponent
,CheckBoxGroupPrimitiveFormWrapperComponent
,MoneyPrimitiveFormWrapperComponent
,DecimalPrimitiveFormWrapperComponent
,RadioButtonPrimitiveFormWrapperComponent
,RichTextPrimitiveFormWrapperComponent
,TextPrimitiveFormWrapperComponent
,TreePrimitiveFormWrapperComponent
,PanelPrimitiveFormWrapperComponent, 
WrapperDirective, InputDirective, LabelDirective, HeaderDirective, PreviewComponent, ContainerFormDirective, NonBindingDirective, FormBaseDirective,

ImageFormComponent,

IdentityComponent,

CheckBoxGroupFormComponent
  ],
  imports: [
    
    RouterModule.forRoot(routes),

    BrowserModule,
    AgGridModule.withComponents([AgGridMaterialCheckboxCellComponent,AgGridUserOperationCellRendererComponent,AgGridOperationsHeaderComponent,AgGridEntityOperationCellRendererComponent,AgGridEntityPropertyCellRendererComponent,AgGridFormPropertyCellRendererComponent]),
    
    DragDropModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    BrowserAnimationsModule,

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  entryComponents: [ ErrorDialogComponent,WarningDialogComponent,ContainerFormComponent
    ,AutoCompleteBoxFormComponent
,ButtonFormComponent
,BreadcrumbFormComponent
,CascadeComboBoxFormComponent
,CheckBoxFormComponent
,ComboBoxFormComponent
,DataGridFormComponent
,DateTimeFormComponent
,DocumentDownloadFormComponent
,DocumentUploaderFormComponent
,DropDownFormComponent
,ExpressionEditorFormComponent
,HiddenFormComponent
,IconFormComponent
,LabelFormComponent
,LinkFormComponent
,CheckBoxGroupFormComponent
,ListBoxFormComponent
,MoneyFormComponent
,DecimalFormComponent
,RadioButtonFormComponent
,RichTextFormComponent
,TextFormComponent
,TreeFormComponent
,PanelFormComponent
,ImageFormComponent

,EditorContainerFormComponent
,EditorDynamicFormHostComponent


,AutoCompleteBoxPrimitiveFormWrapperComponent
,ButtonPrimitiveFormWrapperComponent
,BreadcrumbPrimitiveFormWrapperComponent
,CascadeComboBoxPrimitiveFormWrapperComponent
,CheckBoxPrimitiveFormWrapperComponent
,ComboBoxPrimitiveFormWrapperComponent
,DataGridPrimitiveFormWrapperComponent
,DateTimePrimitiveFormWrapperComponent
,DocumentDownloadPrimitiveFormWrapperComponent
,DocumentUploaderPrimitiveFormWrapperComponent
,DropDownPrimitiveFormWrapperComponent
,ExpressionEditorPrimitiveFormWrapperComponent
,HiddenPrimitiveFormWrapperComponent
,IconPrimitiveFormWrapperComponent
,LabelPrimitiveFormWrapperComponent
,LinkPrimitiveFormWrapperComponent
,ListBoxPrimitiveFormWrapperComponent
,CheckBoxGroupPrimitiveFormWrapperComponent
,MoneyPrimitiveFormWrapperComponent
,DecimalPrimitiveFormWrapperComponent
,RadioButtonPrimitiveFormWrapperComponent
,RichTextPrimitiveFormWrapperComponent
,TextPrimitiveFormWrapperComponent
,TreePrimitiveFormWrapperComponent
,PanelPrimitiveFormWrapperComponent
,ImagePrimitiveFormWrapperComponent
  ],
  providers: [
    EntityDefinitionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
