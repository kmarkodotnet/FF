import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { DynamicFormHostComponent } from '../../dynamic-form/components/dynamic-form-host/dynamic-form-host.component';
import { FormDefinitionService, EntityDefinitionService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { FormDefinition } from '../../models/dtos';
import { EditorDynamicFormHostComponent } from '../../dynamic-form/components/editor-dynamic-form-host/editor-dynamic-form-host.component';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  //@ViewChild('host') host: EditorDynamicFormHostComponent;
  @ViewChild('host') host: DynamicFormHostComponent;
  formDefinition:FormDefinition;
  constructor(
    private route: ActivatedRoute,
    private formDefinitionService:FormDefinitionService,
    private entityDefinitionService:EntityDefinitionService,
    private testDataService:TestDataService
  ) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    let that = this;
    this.formDefinitionService.get(id).then(formDefinition => {
      //that.formDefinition = f;
      that.testDataService.get(formDefinition.entityDefinitionId).then(entityInstance =>{
        //console.log(JSON.stringify(entityInstance));
        setTimeout(() => {
          that.host.render(formDefinition, entityInstance);
        }, 10);
      });
      
    });
  }
}
