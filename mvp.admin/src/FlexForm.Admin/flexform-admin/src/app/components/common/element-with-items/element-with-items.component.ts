import { Component, OnInit } from '@angular/core';
import { KeyValueItem } from '../../../models/key-value-item.model';
import { Base } from '../../../models/dtos';

// @Component({
//   selector: 'app-element-with-items',
//   templateUrl: './element-with-items.component.html',
//   styleUrls: ['./element-with-items.component.css']
// })
export abstract class ElementWithItemsComponent<TElement extends Base<any>,TItem> implements OnInit {

  public toggleDictionary:KeyValueItem<TElement,boolean>[];

  constructor() { }

  ngOnInit() {
    this.reloadElementWithItems();
  }


  newElement():void{
    if(!this.newElementIsVisible()){
      return;
    }
    this.newElementCustom();
  }
  abstract newElementCustom():void;
  abstract newElementIsVisible():boolean;

  abstract getElementDisplayType():string;

  public initToggleDictionary():void{
    let elements = this.getElements;
    this.toggleDictionary = new Array<KeyValueItem<TElement,boolean>>();
    elements.forEach(e => {
      this.toggleDictionary.push(new KeyValueItem<TElement,boolean>(e,false));
    });
  }
  public toggleElement(element:TElement):void{
    if(this.toggleDictionary)
    {
      let toggleIndex = this.toggleDictionary.findIndex(e => e.key === element);
      if(toggleIndex>=0){
        this.toggleDictionary[toggleIndex].value = !this.toggleDictionary[toggleIndex].value;
      }
    }
  }
  public elementIsOpen(element:TElement):boolean{
    if(this.toggleDictionary)
    {
      let toggleIndex = this.toggleDictionary.findIndex(e => e.key === element);
      if(toggleIndex>=0){
        return this.toggleDictionary[toggleIndex].value;
      }
    }
    return false;
  }

  getElementId(element: TElement): any {
    return element.id;
  }

  abstract reloadElementWithItems():void;
  abstract get getElements():TElement[];
  abstract getElementName(element:TElement):string;  

  addItem(element:TElement):void{
    if(!this.addItemIsVisible(element)){
      return;
    }
    this.addItemCustom(element);
  }
  abstract addItemCustom(element:TElement):void;
  abstract addItemIsVisible(element:TElement):boolean;

  deleteElement(element:TElement):void{
    if(!this.deleteElementIsVisible(element)){
      return;
    }
    this.deleteElementCustom(element);
  }
  abstract deleteElementCustom(element:TElement):void;
  abstract deleteElementIsVisible(element:TElement):boolean;  

  modifyElement(element:TElement):void{
    if(!this.modifyElementIsVisible(element)){
      return;
    }
    this.modifyElementCustom(element);
  }
  abstract modifyElementCustom(element:TElement):void;
  abstract modifyElementIsVisible(element:TElement):boolean;  

  abstract getItems(element:TElement):TItem[];
  abstract getItemName(element:TItem):string;

  modifyItem(element:TItem):void{
    if(!this.modifyItemIsVisible(element)){
      return;
    }
    this.modifyItemCustom(element);
  }
  abstract modifyItemCustom(element:TItem):void;
  abstract modifyItemIsVisible(element:TItem):boolean;

  deleteItem(element:TElement,item:TItem):void{
    if(!this.deleteItemIsVisible(element,item)){
      return;
    }
    this.deleteItemCustom(element,item);
  }
  abstract deleteItemCustom(element:TElement,item:TItem):void;
  abstract deleteItemIsVisible(element:TElement,item:TItem):boolean;

  viewItem(element:TItem):void{
    if(!this.viewItemIsVisible(element)){
      return;
    }
    this.viewItemCustom(element);
  }
  abstract viewItemCustom(element:TItem):void;
  abstract viewItemIsVisible(element:TItem):boolean;

  cloneItem(element:TItem):void{
    if(!this.cloneItemIsVisible(element)){
      return;
    }
    this.cloneItemCustom(element);
  }
  abstract cloneItemCustom(element:TItem):void;
  abstract cloneItemIsVisible(element:TItem):boolean;  
}
