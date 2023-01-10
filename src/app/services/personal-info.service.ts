import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { map, Observable, Subject } from 'rxjs';
import { Section } from '../Interfaces/Section';
import { Person } from '../Interfaces/Person';


@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  private url = "http://localhost:8080/"

  private sections = "traer/secciones";
  private person = "traer/persona";

  private authorizedOnly = "api/auth/"
  private noAuth ="api/no-auth/"

  private upInfo= "update/info";
  private borrarInfo = "borrar/info";
  private newInfo = "crear/info"

  private upPersona="update/person";

  private newSection = "crear/seccion";
  private upSection= "update/seccion";
  private borrarSection = "borrar/seccion";
  private sectionsTitles = "traer/secciones-titulo"

  //private tiposNombres = "traer/tipos"

  id: number = 0;

  constructor(private http : HttpClient) {
    
   }

  getSections():Observable<Section[]> {
    return this.http.get<Section[]>(this.url+this.noAuth+this.sections);
  }

  getPersonalInfo():Observable<Person> {
    return this.http.get<Person>(this.url+this.noAuth+this.person);
  }

  createInfo(info: any): Observable<any>{
    return this.http.post(this.url+this.authorizedOnly+this.newInfo, info);
  }

  updateInfo(info: any): void{
    this.http.post(this.url+this.authorizedOnly+this.upInfo, info).subscribe(
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
    return this.http.post(this.url+this.authorizedOnly+this.borrarInfo, id);
  }

  updatePersona(info: any): void{
    this.http.post(this.url+this.authorizedOnly+this.upPersona, info).subscribe(
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

  createSection(titulo: String, tipo: String):Observable<any> {
    var info = {
      titulo: titulo,
      tipo: tipo
    }
    return this.http.post(this.url+this.authorizedOnly+this.newSection, info);
  }

  updateSeccion(id: number, titulo: String): Observable<any>{
    return this.http.post(this.url+this.authorizedOnly+this.upSection, {id: id, titulo: titulo});
  }

  eliminarSeccion(id: number): Observable<any>{
    return this.http.post(this.url+this.authorizedOnly+this.borrarSection, id);
  }

  getSectionTitle(): Observable<any>{
    return this.http.get(this.url+this.noAuth+this.sectionsTitles);
  }
}
