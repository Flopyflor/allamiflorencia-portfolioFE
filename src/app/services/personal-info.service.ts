import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Section } from '../Interfaces/Section';


@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  url = "http://localhost:3000/sections"

  constructor(private http : HttpClient) { }

  get():Observable<Section[]> {
    return this.http.get<Section[]>(this.url);
  }
}
