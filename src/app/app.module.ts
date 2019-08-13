import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { UsersComponent } from './users/users.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';
import { ProjectServices } from './project/project-service/project-services';
import { TaskServices } from './task/task-service/task-service';
import { UsersServices } from './users/user-service/users-service';
import { ParentTaskServices } from './task/task-service/parent-task-service';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProjectComponent,
    UsersComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ProjectServices,
    TaskServices,
    UsersServices,
    ParentTaskServices
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
