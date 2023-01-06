import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Section } from '../Interfaces/Section';
import { Person } from '../Interfaces/Person';
import { Card } from '../Interfaces/Card';


@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  private url = "http://localhost:8080/"

  private sections = "traer/secciones";
  private person = "traer/persona";

  private upInfo= "update/info";
  private borrarInfo = "borrar/info";

  constructor(private http : HttpClient) { }

  getSections():Observable<Section[]> {
    return this.http.get<Section[]>(this.url+this.sections);
  }

  getPersonalInfo():Observable<Person> {
    return this.http.get<Person>(this.url+this.person);
  }

  updateInfo(info: any): void{
    console.log(info);
    this.http.post(this.url+this.upInfo, info).subscribe();
  }

  eliminarInfo(id: number){
    console.log("eliminar ", id);
    this.http.post(this.url+this.borrarInfo, id);
  }
}
