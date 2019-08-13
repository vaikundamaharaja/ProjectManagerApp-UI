import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../project/project-model/project';
import { FormBuilder } from '@angular/forms';
import { TaskServices } from './task-service/task-service';
import { ProjectServices } from '../project/project-service/project-services';
import { UsersServices } from '../users/user-service/users-service';
import { ParentModel } from './task-model/parent-task';
import { ParentTaskServices } from './task-service/parent-task-service';
import { UsersModel } from '../users/user-model/users';
import { TaskModel } from './task-model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  addTaskForm = this.fb.group({
    project:[{value: '', disabled: true}],
    task:[''],
    isParentTask:[''],
    priority:['0'],
    parentTask:[{value: '', disabled: true}],
    startDate:[''],
    endDate:[''],
    user:[{value: '', disabled: true}]

  });
  constructor(private fb: FormBuilder, 
    private taskService: TaskServices,
   private projectService: ProjectServices,
   private userService: UsersServices,
   private parentService: ParentTaskServices) { }

  ngOnInit() {
  }

  projects: any =[];
  parentTasks: any =[];
  users: any = [];
  btnEnableState: boolean= false;
  task:TaskModel =new TaskModel();
  parentTask: ParentModel =new ParentModel();
  status: string = "NO";
  taskName: string  ="";
/*
Fetch Project details  ->getAllProjectList
Set value in text field -> selectedProject
close search project popup  -> searchProjectClose
*/
  getAllProjectList(){
    this.projectService.getAllProjects().subscribe((data:{})=>{
      this.projects = data;
    });
    document.getElementById('searchProject').style.display='block';

  }
  selectedProject(project:ProjectModel){
    this.addTaskForm.controls['project'].setValue(project.projectID);
    document.getElementById('searchProject').style.display='none';
  }
  searchProjectClose(){
    document.getElementById('searchProject').style.display='none';
  }

/*
Fetch Parent task details  ->getAllParentTaskList
Set value in text field -> selectedParentTask
close search parent task popup  -> searchParentTaskClose
*/
  getAllParentTaskList(){
    this.parentService.getAllParentTasks().subscribe((data:{})=>{
      this.parentTasks = data;
    });
    document.getElementById('searchParentTask').style.display='block';
  }
  selectedParentTask(parentTask:ParentModel){
    this.addTaskForm.controls['parentTask'].setValue(parentTask.parentID);
    document.getElementById('searchParentTask').style.display='none';
  }
  searchParentTaskClose(){
    document.getElementById('searchParentTask').style.display='none';
  }

  /*
Fetch Users details  ->getAllUsersList
Set value in text field -> selectedUser
close search Users popup  -> searchUserClose
*/
  getAllUsersList(){
    this.userService.getAllUsers().subscribe((data:{})=>{
      this.users = data;
    });
    document.getElementById('searchUser').style.display='block';
  }
  selectedUser(user:UsersModel){
    this.addTaskForm.controls['user'].setValue(user.userID);
    document.getElementById('searchUser').style.display='none';
  }
  searchUserClose(){
    document.getElementById('searchUser').style.display='none';
  }
/*
isParentTask to enable and disable based on checkbox selection
*/
  isParentTask(){
    const checkBoxValue: Boolean =this.addTaskForm.controls.isParentTask.value;
    if(!checkBoxValue){
      this.addTaskForm.controls['startDate'].enable();
      this.addTaskForm.controls['priority'].enable();
      this.addTaskForm.controls['endDate'].enable();
      this.btnEnableState=false;
    }
    else{
      this.addTaskForm.controls['priority'].disable();
      this.addTaskForm.controls['startDate'].disable();
      this.addTaskForm.controls['endDate'].disable();
      this.btnEnableState=true;

    }
  }
  checkTask(){
    const checkBoxValue: Boolean =this.addTaskForm.controls.isParentTask.value;
    if(checkBoxValue){
      this.addParentTask();
    }
    else{
      this.addTask();
    }
  }
  addParentTask(){
    //this.parentTask.projectID = this.addTaskForm.controls.project.value;
    this.parentTask.parentTask = this.addTaskForm.controls.task.value;
    this.taskName = this.addTaskForm.controls.task.value;
    this.parentService.addParentTask(this.parentTask).subscribe((res)=>{
    });
    document.getElementById('addTaskSuccess').style.display='block';

  }
  /*
  Adding Task in to DB
  */
  addTask(){
    this.task.projectID = this.addTaskForm.controls.project.value;
    this.task.task = this.addTaskForm.controls.task.value;
    this.taskName = this.addTaskForm.controls.task.value;
    this.task.priority = this.addTaskForm.controls.priority.value;
    this.task.parentID =this.addTaskForm.controls.parentTask.value;
    this.task.startDate = this.addTaskForm.controls.startDate.value;
    this.task.endDate = this.addTaskForm.controls.endDate.value;
    this.task.userID = this.addTaskForm.controls.user.value;
    this.task.status = this.status;
    this.taskService.addTask(this.task).subscribe((res)=>{
    });
    document.getElementById('addTaskSuccess').style.display='block';
  }
/*
Task added success popup close
*/
  onAddSuccessClose(){
    document.getElementById('addTaskSuccess').style.display='none';

  }
}
