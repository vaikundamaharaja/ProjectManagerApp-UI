import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { UsersComponent } from './users/users.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';


const routes: Routes = [
  { path: 'addTask', component:TaskComponent},
  { path: 'viewTask', component:ViewTaskComponent},
  { path: 'addProject', component:ProjectComponent},
  { path: 'addUsers', component:UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
