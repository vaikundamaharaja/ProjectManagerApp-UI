import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProjectServices } from './project-service/project-services';
import { fbind } from 'q';
import { UsersServices } from '../users/user-service/users-service';
import { ProjectModel } from './project-model/project';
import { UsersModel } from '../users/user-model/users';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  addProjectForm = this.fb.group({
    projectName:[''],
    setDate:[''],
    startDate:[{value: '',disabled:true}],
    endDate:[{value: new Date(+new Date() + 86400000),disabled:true}],
    priority:['0'],
    employeeID:['']
  });
  project: ProjectModel =new ProjectModel();
  projects: any = [];
  users: any = [];
  user: UsersModel =new UsersModel();

  constructor(private fb: FormBuilder,
     private projectService: ProjectServices,
     private usersService: UsersServices) { }

    

  ngOnInit() {
  }

  addProject(){
    this.project.projectName = this.addProjectForm.controls.projectName.value;
    this.project.startDate = this.addProjectForm.controls.startDate.value;
    this.project.endDate = this.addProjectForm.controls.endDate.value;
    this.project.priority = this.addProjectForm.controls.priority.value;
    const employeeID = this.addProjectForm.controls.employeeID.value;
    this.projectService.addProject(this.project).subscribe((res)=>{
  });;
  }

  searchManager(){
    this.usersService.getAllUsers().subscribe((data:{})=>{
      this.users = data;
    });
    document.getElementById('searchUser').style.display='block';


  }
  selectedEmployee(user: UsersModel){
    this.addProjectForm.controls['employeeID'].setValue(user.employeeID);
    document.getElementById('searchUser').style.display='none';
  }
  enableDate(){
    const checkBoxValue: Boolean =this.addProjectForm.controls.setDate.value;
    if(checkBoxValue){
      this.addProjectForm.controls['startDate'].enable();
      this.addProjectForm.controls['endDate'].enable();
      //console.log(this.getFormattedDate(new Date(this.tomorrow())));
      //(<HTMLInputElement>document.getElementById('end-date')).value = this.getFormattedDate(new Date(this.tomorrow()));
     // this.addProjectForm.controls['endDate'].setValue('2019-08-08');
    }
    else{
      this.addProjectForm.controls['startDate'].disable();
      this.addProjectForm.controls['endDate'].disable();
    }
  }
  /*
  tomorrow() {
    return new Date().getTime() + 24 * 60 * 60 * 1000;
}
  getFormattedDate(date: Date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}
*/
}
