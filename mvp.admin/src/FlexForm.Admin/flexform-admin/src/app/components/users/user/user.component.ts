import { Component, OnInit } from '@angular/core';
import { UserModel, UserGroupModel } from '../../../models/dtos';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserGroupService } from '../../../services/user-group.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  model: UserModel;
  notOwnedUserGroups:UserGroupModel[];

  constructor(private router: Router,private route: ActivatedRoute,private userService:UserService,private userGroupService:UserGroupService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.model = new UserModel();
    if(id){
      let that = this;
      this.userService.getUser(id).then(us => {
        that.model = us;
        that.notOwnedUserGroups = new Array<UserGroupModel>();
        that.userGroupService.getUserGroups().then(gs=>{
          gs.forEach(g =>{
            if(that.model.userGroups.findIndex(ug => ug.id == g.id) < 0){
              that.notOwnedUserGroups.push(g);
            }
          });
        });
      });
    }
  }

  moveToNotOwned(data: UserGroupModel):void{
    this.userService.revoke(this.model.id,data.id).then(() =>{
      let index = this.model.userGroups.findIndex(g => g.id == data.id);
      if(index >= 0){
        this.notOwnedUserGroups.push(data);      
        this.model.userGroups.splice(index,1);
      }
    });
  }

  moveToOwned(data: UserGroupModel):void{    
    this.userService.grant(this.model.id,data.id).then(() =>{
      let index = this.notOwnedUserGroups.findIndex(g => g.id == data.id);
      if(index >= 0){
        this.model.userGroups.push(data);
        this.notOwnedUserGroups.splice(index,1);
      }
    });
  }

  saveUser():void{
    let that = this;
    this.userService.saveUser(this.model).then(u =>
      {
        that.model = u;
      });
  }

  cancel():void{
    this.router.navigate(['users']);
  }
}
