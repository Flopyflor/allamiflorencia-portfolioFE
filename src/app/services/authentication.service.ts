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

  inicarSesion(credenciales: any): Observable<any> {

    console.log("Enviando credenciales hardcoded");

    var data = this.http.post<any>("localhost:8080/validar/login", {usuario: "admin", password: "constraseña"}).pipe(map(data =>{
      sessionStorage.setItem("currentUser", JSON.stringify(data));
      this.currentUserSubject.next(data);

      console.log("la data devuelta es: ");
      console.log(data);

      return data
    }));

    /*
    console.log("Enviando credenciales");
    var data =  this.http.post<any>(this.url, credenciales).pipe(map(data =>{
      sessionStorage.setItem("currentUser", JSON.stringify(data));
      this.currentUserSubject.next(data);

      console.log("la data devuelta es: ");
      console.log(data);

      return data
    }));

    console.log("mi data primer intento");
    console.log(data);
    /*


    /*
    //Este llega al servidor y da un wrong method error

    this.http.get(this.url, credenciales).subscribe((data)=>{
      console.log("intentando ver la data con suscribe")
      console.log(data);
    });
    */


    return data;
  }

  get usuarioAutenticado(){
    return this.currentUserSubject.value;
  }
}