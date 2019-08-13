import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersModel } from '../user-model/users';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable()
export class UsersServices{
    endpoint = 'http://localhost:9090/Users/';
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

  addUser (projectModel: UsersModel): Observable<any> {
    return this.http.post<any>(this.endpoint + 'addUser', JSON.stringify(projectModel), this.httpOptions).pipe(
    tap(),
    catchError(this.handleError<any>('Add Users'))
  );
}
getAllUsers(): Observable<any> {
    return this.http.get(this.endpoint + 'getAllUsers').pipe(
      map(this.extractData));
  }
  getUser(userID: string): Observable<any> {
    return this.http.get(this.endpoint + 'getUser/'+`${userID}`).pipe(
      map(this.extractData));
  }
  updateUser (user: UsersModel, userID: string): Observable<any> {
    console.log(user);
    return this.http.put<any>(this.endpoint + 'updateUser/'+`${userID}`, JSON.stringify(user), this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('Update User'))
    );
  }
  deleteUser (userID: string): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'deleteUser/' + userID, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('delete user'))
    );
  }
  getUsersSortByFirstName(): Observable<any> {
    return this.http.get(this.endpoint + 'getUsersOrderByFirstName').pipe(
      map(this.extractData));
  }
  getUsersSortByLastName(): Observable<any> {
    return this.http.get(this.endpoint + 'getUsersOrderByLastName').pipe(
      map(this.extractData));
  }
  getUsersSortByEmployeeID(): Observable<any> {
    return this.http.get(this.endpoint + 'getUsersOrderByEmployeeID').pipe(
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