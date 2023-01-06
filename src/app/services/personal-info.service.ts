import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Section } from '../Interfaces/Section';
import { Person } from '../Interfaces/Person';
import { Card } from '../Interfaces/Card';
import { identifierName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  private url = "http://localhost:8080/"

  private sections = "traer/secciones";
  private person = "traer/persona";

  private upInfo= "update/info";
  private borrarInfo = "borrar/info";
  private newInfo = "crear/info"

  private upPersona="update/person";

  id: number = 0;

  constructor(private http : HttpClient) { }

  getSections():Observable<Section[]> {
    return this.http.get<Section[]>(this.url+this.sections);
  }

  getPersonalInfo():Observable<Person> {
    return this.http.get<Person>(this.url+this.person);
  }

  createInfo(info: any): Observable<any>{
    return this.http.post(this.url+this.newInfo, info);
  }

  updateInfo(info: any): void{
    this.http.post(this.url+this.upInfo, info).subscribe(
      {error: 
        (err : HttpErrorResponse)=> { 
          if(err instanceof Error){
            console.log("a FE error occurred", err.error.message);
          } else {
            console.log('Backend returned status code: ', err.status);
            console.log('Response body:', err.error);
          }
        }
      }
    );
  }

  eliminarInfo(id: number){
    console.log("eliminar ", id);
    this.http.post(this.url+this.borrarInfo, id).subscribe({
      error:
      (err : HttpErrorResponse)=> {
      
        if(err instanceof Error){
          console.log("a FE error occurred", err.error.message);
        } else {
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
        }
      }
    });
  }

  updatePersona(info: any): void{
    console.log(info);
    this.http.post(this.url+this.upPersona, info).subscribe(
      {error: 
        (err : HttpErrorResponse)=> { 
          if(err instanceof Error){
            console.log("a FE error occurred", err.error.message);
          } else {
            console.log('Backend returned status code: ', err.status);
            console.log('Response body:', err.error);
          }
        }
      }
    );
  }
}
