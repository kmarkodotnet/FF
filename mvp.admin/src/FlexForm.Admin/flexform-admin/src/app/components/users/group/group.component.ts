import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserGroupService } from '../../../services/user-group.service';
import { UserGroupModel, UserModel } from '../../../models/dtos';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  
  model: UserGroupModel;
  otherUsers: UserModel[];
  constructor(private router: Router,private route: ActivatedRoute,private userService:UserService,private userGroupService:UserGroupService) {
   
  }

  ngOnInit() {    
    let id = this.route.snapshot.paramMap.get('id');
    this.model = new UserGroupModel();
    if(id){
      let that = this;
      this.userGroupService.getUserGroup(id).then(u => {
        that.model = u;
        that.otherUsers = new Array<UserModel>();
        that.userService.getUsers().then(us=>{
          us.forEach(u =>{
            if(that.model.usersInGroup.findIndex(ug => ug.id == u.id) < 0){
              that.otherUsers.push(u);
            }
          });
        });
      });
    }
  }

  saveUserGroup():void{
    if(!this.isValid){
      return;
    }
    let that = this;
    this.userGroupService.saveUserGroup(this.model).then(u =>
      {
        that.model = u;
      });
  }

  get isValid():boolean{
    return !this.model || !this.model.name || !this.model.name.startsWith("DDE");
  }

  cancel():void{
    this.router.navigate(['usergroups']);    
  }

  moveToGroup(data:UserModel):void{
    this.userService.grant(data.id,this.model.id).then(() =>{
      let index = this.otherUsers.findIndex(g => g.id == data.id);
      if(index >= 0){
        this.model.usersInGroup.push(data);
        this.otherUsers.splice(index,1);
      }
    });
  }

  leaveGroup(data:UserModel):void{
    this.userService.revoke(data.id,this.model.id).then(() =>{
      let index = this.model.usersInGroup.findIndex(g => g.id == data.id);
      if(index >= 0){
        this.otherUsers.push(data);      
        this.model.usersInGroup.splice(index,1);
      }
    });
  }
}
