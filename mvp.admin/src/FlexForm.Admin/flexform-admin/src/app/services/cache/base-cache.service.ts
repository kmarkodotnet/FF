import { Injectable, OnInit } from '@angular/core';
import { BaseWithTimeStamp } from '../../models/dtos/base-with-timestamp.model';
import { HttpClient } from '@angular/common/http';
import { BaseProperty } from '../../models/properties/base-property.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCacheService<T extends BaseWithTimeStamp<number>> implements OnInit {
  ngOnInit(): void {
    this.refresh();
  }

  refreshMinutes:number;
  refreshDate:Date;
  elements: T[];

  constructor(protected http: HttpClient
    ) { 
      this.refreshMinutes = 10;
  }

  protected getCacheAgeInMinutes():number{
    if(!this.refreshDate){
      return this.refreshMinutes +1;
    }
    let now = (new Date()).getTime();
    let that = this.refreshDate.getTime();
    return (now - that)/(1000*60);
  }

  public save(entity: T) : Promise<T> {           
    let that = this;
    this.beforeSave(entity);
    return this.http.post(this.getSaveUrl(),entity)
      .toPromise()
      .then(o => {
        let result = o as T;
        if(that.getCacheAgeInMinutes()>this.refreshMinutes){
          that.refresh();
        }else{          
          let index = that.elements.findIndex(i => i.id == result.id);
          if(index>=0){
            that.elements[index] = result;
          }else{
            that.elements.push(result);
          }   
        }
        return result;
      });
  }
  protected abstract beforeSave(entity: T):void;
  protected abstract getSaveUrl():string;
  
  public delete(id: number): Promise<any>{
    let that = this;
    return this.http.delete(this.deleteCustom(id))
      .toPromise().then(()=>{
        if(that.getCacheAgeInMinutes()>this.refreshMinutes){
          that.refresh();
        }else{
          let index = that.elements.findIndex(i => i.id == id);
          if(index>=0){
            that.elements.splice(index,1);
          }
        }
      });
  }
  protected abstract deleteCustom(id: number):string;

  public refresh():Promise<T[]>{
    let that = this;
    return this.http.get(this.getSaveUrl())
      .toPromise()
      .then(o => {
        let fds = o as T[];
        that.elements = fds;
        that.refreshDate = new Date();
        this.afterRefresh(fds);
        return fds;
    });
  }
  protected abstract afterRefresh(data: T[]):void;


  public getAll(): Promise<T[]> {
    if(this.getCacheAgeInMinutes()>this.refreshMinutes){
      return this.refresh();
    }else{
      return Promise.resolve(this.elements);
    }       
  }

  public get(id: number): Promise<T> {
    if(this.getCacheAgeInMinutes()>this.refreshMinutes){
      return this.refresh().then(()=>{
        return this.getCustom(id);
      });
    }else{
      return Promise.resolve(this.getCustom(id));
    }
  }
  private getCustom(id: number): T{
    let index = this.elements.findIndex(i => i.id == id);
    if(index>=0){
      return this.elements[index];
    }
  }
}
