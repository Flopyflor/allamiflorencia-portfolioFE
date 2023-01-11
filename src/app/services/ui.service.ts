import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private editable:boolean = false;
  private subject = new Subject<any>();

  private dropdownVisible = false;
  private dropdownSubject = new Subject<any>();

  private saveSubject = new Subject<any>();
  private unsaved = false;

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

  toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible;
    this.dropdownSubject.next(this.dropdownVisible);
    sessionStorage.setItem("dropdown", this.dropdownVisible.toString());    
  }

  dropdownOnToggle(): Observable<any> {    
    return this.dropdownSubject.asObservable();
  }

  closeDropdown() {
    this.dropdownVisible = false;
    this.dropdownSubject.next(false);
  }

  markUnsaved(){
    console.log("sth is unsaved");
    
    this.unsaved = true;
  }

  isUnsaved(){
    return this.unsaved;
  }

  saveAll(){
    console.log("ui service saving all");
    this.unsaved=false;
    
    this.saveSubject.next("");
  }

  onSaveAll(){
    return this.saveSubject.asObservable();
  }

}
