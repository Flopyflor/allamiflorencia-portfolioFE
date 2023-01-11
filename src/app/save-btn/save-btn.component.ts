import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-save-btn',
  templateUrl: './save-btn.component.html',
  styleUrls: ['./save-btn.component.css']
})
export class SaveBtnComponent implements OnInit {

  autenticado = false;
  editando = false;
  subEditando :Subscription;
  guardando = false;

  constructor(private uiService : UiService, private authService: AuthenticationService) { 
    this.subEditando = uiService.onToggle().subscribe((data)=>{
      this.editando = data;
    })
  }

  ngOnInit(): void {
    this.autenticado=this.authService.isAutenticado();
    this.editando = this.uiService.isEditable();
  }

  saveAll(){
    this.uiService.saveAll();

    this.guardando = true;
    setTimeout(()=>{this.guardando = false;}, 3000)
    
    
  }

}
