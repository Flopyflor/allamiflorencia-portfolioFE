import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Section } from '../Interfaces/Section';
import { Person } from '../Interfaces/Person';


@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  url = "http://localhost:3000/"

  sections = "sections";
  person = "person";

  constructor(private http : HttpClient) { }

  getSections():Observable<Section[]> {
    return this.http.get<Section[]>(this.url+this.sections);
  }

  getPersonalInfo():Observable<Person> {
    return this.http.get<Person>(this.url+this.person);
  }
}
