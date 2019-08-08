import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskModel } from '../task-model/task';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable()
export class TaskServices{
     endpoint = 'http://localhost:9090/TaskManager/';
     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:9090',
        'Access-Control-Allow-Credentials' :'true',
        'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS,PUT,DELETE,UPDATE',
        'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept',
      })
      
    };

    

    constructor(private http: HttpClient){}

    private extractData(res: Response) {
        let body = res;
        return body || [];
      }
      addTask (taskModel: TaskModel): Observable<any> {
          return this.http.post<any>(this.endpoint + 'addTask', JSON.stringify(taskModel), this.httpOptions).pipe(
          tap((taskModel) => console.log(`added Task w/ id=${taskModel.parentID}  ${taskModel.task}`)),
          catchError(this.handleError<any>('Add task'))
        );
      }
      updateTask (taskModel: TaskModel, taskID: string): Observable<any> {
        return this.http.put<any>(this.endpoint + 'updateTask/'+`${taskID}`, JSON.stringify(taskModel), this.httpOptions).pipe(
          tap((taskModel) => console.log(`updated task w/ id=${taskModel.parentID}  ${taskModel.task}`)),
          catchError(this.handleError<any>('Update task'))
        );
      }
      deleteTask (taskID: string): Observable<any> {
        return this.http.delete<any>(this.endpoint + 'deleteTask/' + taskID, this.httpOptions).pipe(
          tap(_ => console.log(`deleted task id=${taskID}`)),
          catchError(this.handleError<any>('delete task'))
        );
      }
      findTasksByDate(startDate: string, endDate: string):Observable<any> {
        return this.http.get(this.endpoint + 'findTasksByDate/'+`${startDate}`+'/'+`${endDate}`).pipe(
          map(this.extractData));
      }
      findByTaskID(taskID: string): Observable<any> {
        return this.http.get(this.endpoint + 'findByTaskID/'+`${taskID}`).pipe(
          map(this.extractData));
      }
      findTasksByPriority(startPriority: string, endPriority: string): Observable<any> {
        return this.http.get(this.endpoint + 'findTasksByPriority/'+`${startPriority}`+'/'+`${endPriority}`).pipe(
          map(this.extractData));
      }
      findTasksByParentID(parentID: string): Observable<any> {
        return this.http.get(this.endpoint + 'findTasksByParentID/'+`${parentID}`).pipe(
          map(this.extractData));
      }    
      
      getAllTasks(): Observable<any> {
        return this.http.get(this.endpoint + 'getAllTasks').pipe(
          map(this.extractData));
      }
      getTasks(task: string): Observable<any> {
        return this.http.get(this.endpoint + 'getTask/'+`${task}`).pipe(
          map(this.extractData));
      }
      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}