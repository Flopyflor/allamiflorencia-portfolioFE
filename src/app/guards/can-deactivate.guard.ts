import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MainComponent } from '../main/main.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<unknown> {
  canDeactivate(target: MainComponent) {

    if(target.canDeactivate()){
      console.log("guard duerme");
      return true;
    } else {
      return window.confirm("Cuidado, puede haber información no guardada");

    }
    
  }
}
