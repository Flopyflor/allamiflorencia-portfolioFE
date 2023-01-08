import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private editable:boolean = false;
  private subject = new Subject<any>();

  constructor() { 
    if(sessionStorage.getItem("editable") == "true"){
      this.editable = true;
    }
  }

  toggleEditable() {
    this.editable = !this.editable;
    this.subject.next(this.editable);
    sessionStorage.setItem("editable", this.editable.toString());
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  isEditable(): boolean{
    return this.editable;
  }

}
