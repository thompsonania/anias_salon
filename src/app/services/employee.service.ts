import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private API_URL = environment.api_url + '/api/v1/employee'
  constructor(private http: HttpClient) { }


  getAllEmployees(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/all-employees')
    .pipe(
      map((res) => {
        return res;
      })
    );
}
  getSingleEmployee(id: number): Observable<any>{
    return this.http.get<any>(this.API_URL + '/single-employee/' + id)
    .pipe(
      map((res) => {
        return res;
      })
    );
}
  createEmployee(data: any): Observable<any>{
    return this.http.post<any>(this.API_URL + '/create-employee', data)
    .pipe(
      map((res) => {
        return res;
      })
    );
}

updateEmployee(id: number, data: any): Observable<any>{
  return this.http.patch<any>(this.API_URL + '/update-employee/' + id, data)
  .pipe(
    map((res) => {
      return res;
    })
  );
}


deleteEmployee(id: number): Observable<any> {
  return this.http.delete<any>(this.API_URL + '/delete-employee/' + id)
    .pipe(
      map((res) => {
        return res;
      })
    );
}

}
