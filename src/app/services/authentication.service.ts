import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url="https://allamiflorencia-portfolio.fly.dev/api/no-auth/authenticate";
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("currentUser")||'{}'));
  }

  iniciarSesion(credenciales: any): Observable<any> {

    return this.http.post<any>(this.url, credenciales).pipe(map(data =>{
      sessionStorage.setItem("currentUser", JSON.stringify(data));
      this.currentUserSubject.next(data);

      return data
    }));
  }

  get usuarioAutenticado(){
    return this.currentUserSubject.value;
  }

  isAutenticado():boolean{
    return this.currentUserSubject.value.token != null;
  }

  sesionVencida(){
    this.currentUserSubject.next("");
  }
}
