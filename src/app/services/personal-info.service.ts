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

  titulos : String[] =[];
  subject: Subject<any> = new Subject;

  private upInfo= "update/info";
  private borrarInfo = "borrar/info";
  private newInfo = "crear/info"

  private upPersona="update/person";

  private newSection = "crear/seccion";
  private upSection= "update/seccion";
  private borrarSection = "borrar/seccion";
  private sectionsTitles = "traer/secciones-titulo"

  id: number = 0;

  constructor(private http : HttpClient) {
    this.http.get(this.url+this.sectionsTitles).subscribe((lista)=>{
      this.titulos = lista as String[];
      this.subject.next(lista);
    });
    
   }

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
    return this.http.post(this.url+this.borrarInfo, id);
  }

  updatePersona(info: any): void{
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

  createSection(titulo: String, tipo: String):Observable<any> {
    var info = {
      titulo: titulo,
      tipo: tipo
    }
    return this.http.post(this.url+this.newSection, info);
  }

  updateSeccion(id: number, titulo: String): Observable<any>{
    return this.http.post(this.url+this.upSection, {id: id, titulo: titulo});
  }

  eliminarSeccion(id: number): Observable<any>{
    return this.http.post(this.url+this.borrarSection, id);
  }

  getSectionTitle(): Observable<any>{
    return this.subject.asObservable();
  }
}
