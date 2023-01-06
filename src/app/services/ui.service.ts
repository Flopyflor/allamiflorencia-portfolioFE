import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private editable:boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleEditable() {
    this.editable = !this.editable;
    this.subject.next(this.editable);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  isEditable(): boolean{
    return this.editable;
  }

}
