import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url="http://localhost:8080/validar/login";
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("currentUser")||'{}'));
  }

  iniciarSesion(credenciales: any): Observable<any> {

    return this.http.post<any>(this.url, credenciales).pipe(map(data =>{
      sessionStorage.setItem("currentUser", JSON.stringify(data));
      this.currentUserSubject.next(data);

      console.log("la data devuelta es: ");
      console.log(data);

      return data
    }));
  }

  get usuarioAutenticado(){
    return this.currentUserSubject.value;
  }
}