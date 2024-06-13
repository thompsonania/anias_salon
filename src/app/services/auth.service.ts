import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.api_url + '/api/v1/auth'
  private tokenkey = 'authToken';

  public authToken?: string;
  public user?: any;
  public currentUser?: any;
  public loggedInUser?: any;

 constructor( private http: HttpClient) { }
 private _saveToStorage(key: string, value: any){
  localStorage.setItem(key, value);
 }
 saveAuthToken(): void {
    this._saveToStorage(this.tokenkey, this.authToken);
 }
 public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenkey)
      return token != null && token.length >0;
    }
 public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenkey) : null;
 }
getProfileInfo(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/my-profile')
    .pipe(
      map((res) => {
        return res;
      })
    );
}

getCurrentUser(cb? : () => void){
  this.getProfileInfo().subscribe((res) =>{
    if(res['status'] === 'success'){
      this.currentUser = res['data']!['user'];
      this.loggedInUser = res['data']!['loggedInUser'];
      if(cb){
        cb();
      }
    }
  });
}

login(data: any) : Observable<any>{
  return this.http.post<any>(this.API_URL + '/login', data)
    .pipe(
      map((res) => {
        return res;
      })
    );
}

register(data: any): Observable<any>{
  return this.http.post<any>(this.API_URL + '/register', data)
    .pipe(
      map((res) => {
        return res;
      })
    );
}

logout(): void {
  localStorage.removeItem(this.tokenkey);
  // this.authToken = null;
  // this.getCurrentUser = null;
}


 }

