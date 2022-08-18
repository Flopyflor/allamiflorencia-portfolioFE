import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  url = "http://localhost:3000/sections"

  constructor(private http : HttpClient) { }

  get():Observable<Object> {
    return this.http.get(this.url);
  }
}
