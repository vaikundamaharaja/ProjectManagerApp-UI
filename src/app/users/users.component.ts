import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersServices } from './user-service/users-service';
import { UsersModel } from './user-model/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  addUserForm= this.fb.group({
    firstName:[''],
    lastName:[''],
    employeeID:['']
  });
  updateUserForm= this.fb.group({
    firstName:[''],
    lastName:[''],
    employeeID:[''],
    userID:['']
  });

  constructor(private fb:FormBuilder, private userService: UsersServices) { }

  ngOnInit() {
  }

  user:UsersModel = new UsersModel();
  firstName: string;
  lastName: string;
  userID: string;
  users: any=[];
  enableSort:boolean = false;
  /*
  Adding new User --> addUser
  */
  addUser(){
    this.user.firstName = this.addUserForm.controls.firstName.value;
    this.firstName = this.addUserForm.controls.firstName.value;
    this.user.lastName = this.addUserForm.controls.lastName.value;
    this.lastName = this.addUserForm.controls.lastName.value;
    this.user.employeeID = this.addUserForm.controls.employeeID.value;
    this.userService.addUser(this.user).subscribe((res)=>{
    });
    document.getElementById('addUserPopup').style.display='block';
  }
  /*
  Task added success popup close
*/
addUserPopupClose(){
  this.getAllUser();
    document.getElementById('addUserPopup').style.display='none';
  }

  getAllUser(){
    this.userService.getAllUsers().subscribe((data:{})=>{
      this.users=data;
    });
    this.enableSort= true;
  }

  showUpdateUserPopup(user: UsersModel){
    document.getElementById('updateUserPopup').style.display='block';
    this.updateUserForm.controls['firstName'].setValue(user.firstName);
    this.updateUserForm.controls['lastName'].setValue(user.lastName);
    this.updateUserForm.controls['employeeID'].setValue(user.employeeID);
    this.updateUserForm.controls['userID'].setValue(user.userID);
    

  }
  updateUser(){
    const userModel = new UsersModel();
    userModel.userID= this.updateUserForm.controls.userID.value;
    const userID: string= this.updateUserForm.controls.userID.value;
    userModel.firstName= this.updateUserForm.controls.firstName.value;
    this.firstName = this.updateUserForm.controls.firstName.value;
    this.lastName = this.updateUserForm.controls.lastName.value;
    userModel.lastName= this.updateUserForm.controls.lastName.value;
    userModel.employeeID= this.updateUserForm.controls.employeeID.value;
    this.userService.updateUser(userModel,userID).subscribe();
    document.getElementById('updateUserPopup').style.display='none';
    this.getAllUser();
    document.getElementById('updateUserSuccessPopup').style.display='block';

  }
  updateUserPopupClose(){
    document.getElementById('updateUserPopup').style.display='none';
  }
  updateUserSuccessPopupClose(){
    document.getElementById('updateUserSuccessPopup').style.display='none';

  }
  showDeleteUserPopup(user: UsersModel){
    document.getElementById('deleteUserPopup').style.display='block';
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userID = user.userID;
  }
  deleteUser(){
    this.userService.deleteUser(this.userID).subscribe();
    document.getElementById('deleteUserPopup').style.display='none';
    this.getAllUser();
    document.getElementById('deleteUserSuccessPopup').style.display='block';

  }
  deleteUserPopupClose()
  {
    document.getElementById('deleteUserPopup').style.display='none';
  }
  deleteUserSuccessPopupClose(){
    document.getElementById('deleteUserSuccessPopup').style.display='none';

  }
  sortByFirstName(){
    this.userService.getUsersSortByFirstName().subscribe((data:{})=>{
      this.users=data;
    });
  }
  sortByLastName(){
    this.userService.getUsersSortByLastName().subscribe((data:{})=>{
      this.users=data;
    });
  }
  sortByEmployeeID(){
    this.userService.getUsersSortByEmployeeID().subscribe((data:{})=>{
      this.users=data;
    });
  }
}
