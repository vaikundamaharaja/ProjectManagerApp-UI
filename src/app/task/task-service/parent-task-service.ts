import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ParentModel } from '../task-model/parent-task';
@Injectable()
export class ParentTaskServices{
     endpoint = 'http://localhost:9090/ParentTaskManager/';
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

      addParentTask (taskModel: ParentModel): Observable<any> {
        return this.http.post<any>(this.endpoint + 'addParentTask', JSON.stringify(taskModel), this.httpOptions).pipe(
        tap(),
        catchError(this.handleError<any>('Add Parent Task'))
      );
    }
    getAllParentTasks(): Observable<any> {
        return this.http.get(this.endpoint + 'getAllParentTasks').pipe(
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