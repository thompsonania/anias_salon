import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API_URL = environment.api_url + '/api/v1/customer'
  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/all-customers')
    .pipe(
      map((res) => {
        return res;
      })
    );
}
  getSingleCustomer(id: number): Observable<any>{
    return this.http.get<any>(this.API_URL + '/single-customers/' + id)
    .pipe(
      map((res) => {
        return res;
      })
    );
}
  createCustomer(data: any): Observable<any>{
    return this.http.post<any>(this.API_URL + '/create-customer', data)
    .pipe(
      map((res) => {
        return res;
      })
    );
}

updateCustomer(id: number, data: any): Observable<any>{
  return this.http.patch<any>(this.API_URL + '/update-customer/' + id, data)
  .pipe(
    map((res) => {
      return res;
    })
  );
}

deleteCustomer(id: number): Observable<any> {
  return this.http.delete<any>(this.API_URL + '/delete-customer/' + id)
    .pipe(
      map((res) => {
        return res;
      })
    );
}

}