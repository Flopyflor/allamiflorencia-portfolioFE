import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-save-btn',
  templateUrl: './save-btn.component.html',
  styleUrls: ['./save-btn.component.css']
})
export class SaveBtnComponent implements OnInit {

  autenticado = false;

  constructor(private uiService : UiService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.autenticado=this.authService.isAutenticado();
  }

  saveAll(){
    console.log("saving (savebtn)");
    
    if(this.uiService.isUnsaved()){
      console.log("is unsaved (savebtn)");
      this.uiService.saveAll();      
    }
    
  }

}
