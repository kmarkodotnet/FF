import { Component } from '@angular/core';
import { ElementWithItemsComponent } from '../../common/element-with-items/element-with-items.component';
import { UserModel, UserGroupModel } from '../../../models/dtos';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: '../../common/element-with-items/element-with-items.component.html',
  styleUrls: ['../../common/element-with-items/element-with-items.component.css']
})
export class UsersComponent extends ElementWithItemsComponent<UserModel,UserGroupModel> {
  users: UserModel[];
  constructor(private router: Router,  private userService:UserService) {
    super();
  }

  deleteElementCustom(element: UserModel): void {
    this.userService.deleteUser(element.id).then(() =>
      {
        this.reloadElementWithItems();
      }
    );
  }

  deleteElementIsVisible(element: UserModel): boolean {
    return true;
  }

  newElementCustom(): void {
    this.router.navigate(['user/new']);
  }
  newElementIsVisible(): boolean {
    return true;
  }
  getElementDisplayType():string{
    return "User";
  }


  reloadElementWithItems(): void {
    let that = this;
    this.userService.getUsers().then(u =>
      {
        that.users = u as UserModel[];
        
        this.initToggleDictionary();
      });
  }
  get getElements():UserModel[]{
    return this.users;
  }

  getElementName(element: UserModel): string {
    return element.userName;
  }
  
  modifyElementCustom(element: UserModel): void {
    this.router.navigate(['user/modify', element.id]);
  }
  modifyElementIsVisible(element: UserModel): boolean {
    return true;
  }

  getItems(element: UserModel): UserGroupModel[] {
    return element.userGroups;
  }

  getItemName(element: UserGroupModel): string {
    return element.name;
  }

  modifyItemCustom(element: UserGroupModel): void {
    this.router.navigate(['usergroup/modify', element.id]);
  }
  modifyItemIsVisible(element: UserGroupModel): boolean {
    return true;
  }

  deleteItemCustom(element:UserModel, item: UserGroupModel): void {
    this.userService.revoke(element.id,item.id).then(() =>{
      let index = element.userGroups.findIndex(ug => ug === item);
      if(index>=0){
        element.userGroups.splice(index, 1);
      }
    });


  }
  deleteItemIsVisible(element:UserModel, item: UserGroupModel): boolean {
    return true;
  }

  viewItemCustom(element: UserGroupModel): void {
    throw new Error("Method not implemented.");
  }
  viewItemIsVisible(element: UserGroupModel): boolean {
    return false;
  }

  cloneItemCustom(element: UserGroupModel): void {
    throw new Error("Method not implemented.");
  }
  cloneItemIsVisible(element: UserGroupModel): boolean {
    return false;
  }
  addItemCustom(element: UserModel): void {
    throw new Error("Method not implemented.");
  }
  addItemIsVisible(element: UserModel): boolean {
    return false;
  }
}
