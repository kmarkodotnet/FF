import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PrimitiveFormComponent } from '../primitive-form.component';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';
import { EntityDefinitionService } from '../../../../../services';
import { CollectionFormComponent } from '../collection-form.component';
import { CollectionFormModel } from '../../../../../dynamic-form/models/collection-form.model';
import { EntityInstance } from '../../../../../models/dtos';

@Component({
  selector: 'app-auto-complete-box-form',
  templateUrl: './auto-complete-box-form.component.html',
  styleUrls: ['./auto-complete-box-form.component.css']
})
export class AutoCompleteBoxFormComponent extends CollectionFormComponent implements OnInit {
  
  autoCompleteBoxForm = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(protected basePropertyConverterService:BasePropertyConverterService,
    protected entityDefinitionService:EntityDefinitionService) {
    super(basePropertyConverterService,entityDefinitionService);
  }

  postNgOnInit(): Promise<void> {    
    this.filteredOptions = this.autoCompleteBoxForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      )//.subscribe();
      ;

    return Promise.resolve();  
  }

  get dataList():EntityInstance[]{
    return (<CollectionFormModel>this.model).items;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(this.dataList)
    {
      let filtered = this.dataList.filter(option => 
          {
            let cn = this.getDisplayText(option) + "";
            let lc = cn.toLowerCase();
            return lc.includes(filterValue);
          }
        );
      let filteredString = new Array<string>();
      filtered.forEach(f => filteredString.push(this.getDisplayText(f)));
      return filteredString;
    }else{
      return new Array<string>();
    }
  }
}
