import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ProjectModel } from '../project-model/project';
@Injectable()
export class ProjectServices{
    endpoint = 'http://localhost:9090/Project/';
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

  addProject (projectModel: ProjectModel): Observable<any> {
    return this.http.post<any>(this.endpoint + 'addProject', JSON.stringify(projectModel), this.httpOptions).pipe(
    tap(),
    catchError(this.handleError<any>('Add Project'))
  );
}

  getAllProjects(): Observable<any> {
    return this.http.get(this.endpoint + 'getAllProjects').pipe(
      map(this.extractData));
  }
  getProject(projectID: string): Observable<any> {
    return this.http.get(this.endpoint + 'getProject/'+`${projectID}`).pipe(
      map(this.extractData));
  }

  getProjectByName(projectName: string): Observable<any> {
    return this.http.get(this.endpoint + 'getProjectByName/'+`${projectName}`).pipe(
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