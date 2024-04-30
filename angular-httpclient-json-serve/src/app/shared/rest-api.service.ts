import { Injectable } from '@angular/core';

//import { RestApiService } from './rest-api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError} from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  //apiURL
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //http options é a credencial de apresentacao do servico ao DOM(poderia ser outro nome)
  
  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'
    })
  }
  //HttpClient API método get() => Busca a Lista employee
  getEmployees(): Observable<Employee> {

    return this.http.get<Employee>(this.apiURL + '/employees')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //HttpClient API método get()=> busca employee por id
  getEmployee(id): Observable<Employee> {
    
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
    .pipe (
      retry(1),
      catchError(this.handleError)
    )
  }

  //httpClient API método post() => Cria employee
  createEmployee(employee): Observable<Employee> {
    
    return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
        catchError(this.handleError)
    )
  }

  //httpClient API método put() => Update employee
  updateEmployee(id, employee): Observable<Employee> {
    
    return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //HttpClient API método delete() => exclir employee
  deleteEmployee(id){
    return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Error handling (manipulador de erro)
  handleError (error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //pegar o erro no lado do Cliente
      errorMessage = error.error.message;
    } else {
      //Manipulador de erro do servidor
      errorMessage = `Error Code: ${error.status}\nMessage:${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}



