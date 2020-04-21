import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITestDataService } from '../models/interfaces/test-data-service.interface';
import { ApiUrls } from './apiUrls';
import { EntityInstance } from '../models/dtos/entity-instance.model';
import { ItemSourceDefinition } from '../models/dtos/item-source-definition.model';
import { IItemSourceService } from '../models/interfaces/item-source-service.interface';

@Injectable({
  providedIn: 'root'
})
export class TestDataService implements ITestDataService,IItemSourceService {

  constructor(protected http: HttpClient) { }

  get(entityDefinitionId: number): Promise<EntityInstance> {
    return this.http.get(ApiUrls.API_TESTDATA + "entityinstance/"+entityDefinitionId)
      .toPromise()
      .then(o => 
        {
          return o as EntityInstance;
        }
      );
  }

  itemSource(itemSourceDefinition: ItemSourceDefinition): Promise<EntityInstance[]> {
    return this.http.post(ApiUrls.API_TESTDATA + "itemSource/",itemSourceDefinition)
      .toPromise()
      .then(o => 
        {
          return o as EntityInstance[];
        }
      );
  }
}
