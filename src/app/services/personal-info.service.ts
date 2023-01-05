import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Section } from '../Interfaces/Section';
import { Person } from '../Interfaces/Person';


@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  url = "http://localhost:8080/traer/"

  sections = "secciones";
  person = "persona";

  constructor(private http : HttpClient) { }

  getSections():Observable<Section[]> {
    return this.http.get<Section[]>(this.url+this.sections);
  }

  getPersonalInfo():Observable<Person> {
    return this.http.get<Person>(this.url+this.person);
  }
}
