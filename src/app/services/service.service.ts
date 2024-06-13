import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private API_URL = environment.api_url + '/api/v1/service'
  private SVC_EMP_API_URL = environment.api_url + '/api/v1/srvc_employee'
  private APPT_API_URL = environment.api_url + '/api/v1/appointment'
  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<any>{
    return this.http.get<any>(this.APPT_API_URL + '/all-appointments')
    .pipe(
      map((res) => {
        return res;
      })
    );
}
  getSingleAppointment(id: number): Observable<any>{
    return this.http.get<any>(this.APPT_API_URL + '/single-appointment/' + id)
    .pipe(
      map((res) => {
        return res;
      })
    );
}
  createAppointment(data: any): Observable<any>{
    return this.http.post<any>(this.APPT_API_URL + '/create-appointment', data)
    .pipe(
      map((res) => {
        return res;
      })
    );
}

updateAppointment(id: number, data: any): Observable<any>{
  return this.http.patch<any>(this.APPT_API_URL + '/update-appointment/' + id, data)
  .pipe(
    map((res) => {
      return res;
    })
  );
}
deleteAppointment(id: number): Observable<any> {
  return this.http.delete<any>(this.API_URL + '/delete-appointment/' + id)
    .pipe(
      map((res) => {
        return res;
      })
    );
}
//=====================================================================================================
//        CUSTOMER APPOINTMENTS
//=====================================================================================================
//get all cx appt /all-customer-appointments/:customer_id
getAllCustomerAppointments(id: number): Observable<any>{
  return this.http.get<any>(this.APPT_API_URL + '/all-customer-appointments/' + id)
  .pipe(
    map((res) => {
      return res;
    })
  );
}
// /single-customer-appointment/:id/customer/:customer_id
getSingleCustomerAppointment(id: number, customer_id: number): Observable<any>{
  return this.http.get<any>(this.APPT_API_URL + '/single-customer-appointment/' + id + '/customer' + customer_id)
  .pipe(
    map((res) => {
      return res;
    })
  );
}
createCustomerAppointment(data: any): Observable<any>{
  return this.http.post<any>(this.APPT_API_URL + '/create-customer-appointment', data)
  .pipe(
    map((res) => {
      return res;
    })
  );
}

// updateCustomerAppointment(id: number, data: any): Observable<any>{
// return this.http.get<any>(this.APPT_API_URL + '/update-customer-appointment/' + id, data)
// .pipe(
//   map((res) => {
//     return res;
//   })
// );
// }
//=====================================================================================================
//        CUSTOMER SERVICE APPOINTMENTS
//=====================================================================================================
getAllServices(): Observable<any>{
  return this.http.get<any>(this.API_URL + '/all-services')
  .pipe(
    map((res) => {
      return res;
    })
  );
}
getSingleService(id: number): Observable<any>{
  return this.http.get<any>(this.API_URL + '/single-services' + id)
  .pipe(
    map((res) => {
      return res;
    })
  );
}
createService(data: any): Observable<any>{
  return this.http.post<any>(this.API_URL + '/create-service', data)
  .pipe(
    map((res) => {
      return res;
    })
  );
}
updateService(id: number, data: any): Observable<any>{
  return this.http.patch<any>(this.API_URL + '/update-service' + id, data)
  .pipe(
    map((res) => {
      return res;
    })
  );
}
deleteService(id: number): Observable<any>{
  return this.http.delete<any>(this.API_URL + '/delete-service' + id)
  .pipe(
    map((res) => {
      return res;
    })
  );
}
// /all-srvc-employees/:id
getAllEmployeeService(id: number): Observable<any>{
  return this.http.get<any>(this.SVC_EMP_API_URL + '/all-srvc-employees/' + id)
  .pipe(
    map((res) => {
      return res;
    })
  );
}






//=========================================
//            employee view
//=========================================

getAllemployeeAppointments(id: number): Observable<any>{
  return this.http.get<any>(this.APPT_API_URL + '/employee-appointments/' + id)
  .pipe(
    map((res) => {
      return res;
    })
  );
}



}

