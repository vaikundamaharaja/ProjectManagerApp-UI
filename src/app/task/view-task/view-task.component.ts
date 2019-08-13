import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../task-model/task';
import { TaskServices } from '../task-service/task-service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  constructor(private fb: FormBuilder, private taskService: TaskServices) { }

  ngOnInit() {
    //this.viewTask();
  }
  tasksModel: any =[];
  enableSort:boolean = false;
  updateTaskForm = this.fb.group ({
    projectID:[''],
    task:[''],
    priority:[''],
    taskName: [''],
    parentTaskID:[''],
    startDate:[''],
    endDate:[''],
    status:['']
  });
  task: TaskModel = new TaskModel();
  taskID: string="";
  priority: number =0;

viewTask(){
  this.taskService.getAllTasks().subscribe((data:{})=>{
    this.tasksModel = data;
  });
  this.enableSort = true;
}
showUpdateTask(task: TaskModel){
  document.getElementById('updateTask').style.display='block';
  this.updateTaskForm.controls['projectID'].setValue(task.projectID);
  this.updateTaskForm.controls['task'].setValue(task.taskID);
  this.priority=task.priority;
  this.updateTaskForm.controls['priority'].setValue(task.priority);
  this.updateTaskForm.controls['taskName'].setValue(task.task)
  this.updateTaskForm.controls['parentTaskID'].setValue(task.parentID);
  this.updateTaskForm.controls['startDate'].setValue(task.startDate);
  this.updateTaskForm.controls['endDate'].setValue(task.endDate);
  this.updateTaskForm.controls['status'].setValue(task.status);

 }
 cancel(){
   document.getElementById('updateTask').style.display='none';
 }
 updateTask(){
   document.getElementById('updateTask').style.display='none';
   this.task.projectID = this.updateTaskForm.controls.projectID.value;
   this.taskID= this.updateTaskForm.controls.task.value;
   this.task.taskID = this.updateTaskForm.controls.task.value;
   this.task.task = this.updateTaskForm.controls.taskName.value;
   this.task.priority = this.updateTaskForm.controls.priority.value;
   this.task.parentID = this.updateTaskForm.controls.parentTaskID.value;
   this.task.startDate = this.updateTaskForm.controls.startDate.value;
   this.task.endDate = this.updateTaskForm.controls.endDate.value;
   this.task.status = this.updateTaskForm.controls.status.value;
   this.taskService.updateTask(this.task, this.taskID).subscribe((res)=>{
     console.log("Update the Task");
});;
document.getElementById('updateSuccess').style.display='block';
 }
onSuccessUpdateClose(){
 document.getElementById('updateSuccess').style.display='none';
 this.viewTask();
}

showDeleteTask(task: TaskModel){
   this.taskID = task.taskID;
   document.getElementById('deleteTask').style.display='block';
}
deleteTask(){
 document.getElementById('deleteTask').style.display='none';
 this.taskService.deleteTask(this.taskID).subscribe((res)=>{
   console.log("Delete the dask");
});;
document.getElementById('deleteSuccess').style.display='block';
}
onSuccessDeleteClose(){
  document.getElementById('deleteSuccess').style.display='none';
  this.viewTask();
}

closeDeletePopup(){
  document.getElementById('deleteTask').style.display='none';
}

sortByStartDate(){
  this.taskService.getTasksSortByStartDate().subscribe((data:{})=>{
    this.tasksModel = data;
  });
}
sortByEndDate(){
  this.taskService.getTasksSortByEndDate().subscribe((data:{})=>{
    this.tasksModel = data;
  });
}
sortByPriority(){
  this.taskService.getTasksSortByPriority().subscribe((data:{})=>{
    this.tasksModel = data;
  });
}


}
