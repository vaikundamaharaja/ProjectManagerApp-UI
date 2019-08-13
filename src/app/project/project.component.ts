import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProjectServices } from './project-service/project-services';
import { fbind } from 'q';
import { UsersServices } from '../users/user-service/users-service';
import { ProjectModel } from './project-model/project';
import { UsersModel } from '../users/user-model/users';
import { isNullOrUndefined } from 'util';
import { TaskServices } from '../task/task-service/task-service';
import { TaskModel } from '../task/task-model/task';

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
    endDate:[{value: '',disabled:true}],
    priority:['0'],
    employeeID:['']
  });
  updateProjectForm = this.fb.group({
    projectName:[''],
    projectID:[''],
    setDate:[''],
    startDate:[{value: '',disabled:true}],
    endDate:[{value: '',disabled:true}],
    priority:['0'],
    employeeID:['']
  });
  project: ProjectModel =new ProjectModel();
  projects: any = [];
  users: any = [];
  user: UsersModel =new UsersModel();
  tasks: any = [];
  priority:number=0;

  projectName: string;
  projectID: string;
  enableSort: boolean = false;


  constructor(private fb: FormBuilder,
     private projectService: ProjectServices,
     private usersService: UsersServices,
     private taskService: TaskServices) { }

    

  ngOnInit() {
    //this.getAllProject();
  }

  addProject(){
    this.project.projectName = this.addProjectForm.controls.projectName.value;
    this.projectName =  this.addProjectForm.controls.projectName.value;
    this.project.startDate = this.addProjectForm.controls.startDate.value;
    this.project.endDate = this.addProjectForm.controls.endDate.value;
    this.project.priority = this.addProjectForm.controls.priority.value;
    this.project.employeeID = this.addProjectForm.controls.employeeID.value;
    this.projectService.addProject(this.project).subscribe((res)=>{
  });
  document.getElementById('addProjectSuccess').style.display='block';
  
  }
  onAddSuccessClose(){
    this.getAllProject();
    document.getElementById('addProjectSuccess').style.display='none';
  }

  searchManager(){
    this.usersService.getAllUsers().subscribe((data:{})=>{
      this.users = data;
    });
    document.getElementById('searchUser').style.display='block';


  }
  onSearchUserClose(){
    document.getElementById('searchUser').style.display='none';
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
  updatePopupEnableDate(){
    const checkBoxValue: Boolean =this.updateProjectForm.controls.setDate.value;
    if(checkBoxValue){
      this.updateProjectForm.controls['startDate'].enable();
      this.updateProjectForm.controls['endDate'].enable();
      //console.log(this.getFormattedDate(new Date(this.tomorrow())));
      //(<HTMLInputElement>document.getElementById('end-date')).value = this.getFormattedDate(new Date(this.tomorrow()));
     // this.addProjectForm.controls['endDate'].setValue('2019-08-08');
    }
    else{
      this.updateProjectForm.controls['startDate'].disable();
      this.updateProjectForm.controls['endDate'].disable();
    }
  }
  getAllProject(){
    this.projectService.getAllProjects().subscribe((data:{})=>{
      this.projects = data;
    });
    this.enableSort = true;
  }
  showUpdateProject(project: ProjectModel){
    document.getElementById('updateProject').style.display='block';
    this.updateProjectForm.controls['projectID'].setValue(project.projectID);
    this.updateProjectForm.controls['projectName'].setValue(project.projectName);
    this.updateProjectForm.controls['priority'].setValue(project.priority);
    this.priority=project.priority;
    this.updateProjectForm.controls['employeeID'].setValue(project.employeeID);
    this.updateProjectForm.controls['startDate'].setValue(project.startDate);
    this.updateProjectForm.controls['endDate'].setValue(project.endDate);
  }
  updateProject(){
    this.project.projectID = this.updateProjectForm.controls.projectID.value;
    this.project.projectName = this.updateProjectForm.controls.projectName.value;
    this.projectName = this.updateProjectForm.controls.projectName.value;
    this.project.priority = this.updateProjectForm.controls.priority.value;
    this.project.startDate = this.updateProjectForm.controls.startDate.value;
    this.project.endDate = this.updateProjectForm.controls.endDate.value;
    this.project.employeeID = this.updateProjectForm.controls.employeeID.value;
    const projectID=  this.updateProjectForm.controls.projectID.value;
    this.projectService.updateProject(this.project, projectID).subscribe();
    document.getElementById('updateProject').style.display='none';
    this.getAllProject();
    document.getElementById('updateProjectSuccessPopup').style.display='block';

  }
  updateProjectClose(){
    document.getElementById('updateProject').style.display='none';
  }
  updateProjectSuccessPopupClose(){
    document.getElementById('updateProjectSuccessPopup').style.display='none';

  }
  showSuspendProject(project: ProjectModel){
    document.getElementById('suspendProjectPopup').style.display='block';    
    this.projectName = project.projectName;
    this.projectID = project.projectID;
  }
  suspendProject(){
    this.projectService.deleteProject(this.projectID).subscribe();
    document.getElementById('suspendProjectPopup').style.display='none';
    this.getAllProject();
    document.getElementById('suspendProjectSuccessPopup').style.display='block';

  }
  suspendProjectPopupClose(){
    document.getElementById('suspendProjectPopup').style.display='none';
  }
  suspendProjectSuccessPopupClose()
  {
    document.getElementById('suspendProjectSuccessPopup').style.display='none';

  }
  getTaskList(project: ProjectModel){
    this.taskService.getTaskByProjectID(project.projectID).subscribe((data:{})=>{
      this.tasks = data;
    });
    document.getElementById('showTaskList').style.display='block';

  }
  sortByStartDate(){
    this.projectService.getProjectsSortByStartDate().subscribe((data:{})=>{
      this.projects = data;
    });
  }
  sortByEndDate(){
    this.projectService.getProjectsSortByEndDate().subscribe((data:{})=>{
      this.projects = data;
    });
  }
  sortByPriority(){
    this.projectService.getProjectsSortByPriority().subscribe((data:{})=>{
      this.projects = data;
    });
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
