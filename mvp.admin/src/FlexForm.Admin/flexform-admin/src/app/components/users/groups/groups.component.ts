import { Component, OnInit } from '@angular/core';
import { ElementWithItemsComponent } from '../../common/element-with-items/element-with-items.component';
import { UserGroupModel, UserModel } from '../../../models/dtos';
import { UserGroupService } from '../../../services/user-group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: '../../common/element-with-items/element-with-items.component.html',
  styleUrls: ['../../common/element-with-items/element-with-items.component.css']
})
export class GroupsComponent  extends ElementWithItemsComponent<UserGroupModel,UserModel> {
  deleteElementCustom(element: UserGroupModel): void {
    this.userGroupService.deleteUserGroup(element.id).then(() =>
      {
        this.reloadElementWithItems();
      }
    );
  }
  deleteElementIsVisible(element: UserGroupModel): boolean {
    return !element.usersInGroup || element.usersInGroup.length == 0;
  }

  newElementCustom(): void {
    this.router.navigate(['usergroup/new']);
  }
  newElementIsVisible(): boolean {
    return true;
  }
  getElementDisplayType():string{
    return "User group";
  }

  userGroups: UserGroupModel[];

  constructor(private router: Router,  private userGroupService:UserGroupService) {
    super();
  }

  reloadElementWithItems(): void {
    let that = this;
    this.userGroupService.getUserGroups().then(u =>
      {
        that.userGroups = u as UserGroupModel[];
        this.initToggleDictionary();
      });
  }

  get getElements(): UserGroupModel[]{
    return this.userGroups;
  }

  getElementName(element: UserGroupModel): string {
    return element.name;
  }

  modifyElementCustom(element: UserGroupModel): void {
    this.router.navigate(['usergroup/modify', element.id]);
  }
  modifyElementIsVisible(element: UserGroupModel): boolean {
    return true;
  }

  getItems(element: UserGroupModel): UserModel[] {
    return element.usersInGroup;
  }
  getItemName(element: UserModel): string {
    return element.userName;
  }

  modifyItemCustom(element: UserModel): void {
    this.router.navigate(['user/modify', element.id]);
  }
  modifyItemIsVisible(element: UserModel): boolean {
    return true;
  }

  deleteItemCustom(element: UserGroupModel, item: UserModel): void {
    let index = element.usersInGroup.findIndex(ug => ug === item);
    if(index>=0){
      element.usersInGroup.splice(index, 1);
    }
  }
  deleteItemIsVisible(element: UserGroupModel,item: UserModel): boolean {
    return true;
  }


  viewItemCustom(element: UserModel): void {
    throw new Error("Method not implemented.");
  }
  viewItemIsVisible(element: UserModel): boolean {
    return false;
  }

  cloneItemCustom(element: UserModel): void {
    throw new Error("Method not implemented.");
  }
  cloneItemIsVisible(element: UserModel): boolean {
    return false;
  }
  
  addItemCustom(element: UserGroupModel): void {
    throw new Error("Method not implemented.");
  }
  addItemIsVisible(element: UserGroupModel): boolean {
    return false;
  }

}
