import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.css']
})
export class EditBtnComponent implements OnInit {

  autenticado = false;

  editable: boolean = false;
  constructor(private uiService: UiService, private authService: AuthenticationService) { 
  }

  ngOnInit(): void {
    this.autenticado = this.authService.isAutenticado();
    this.editable = this.uiService.isEditable();
  }

  onClick(){
    this.editable=!this.editable;
    this.uiService.toggleEditable();
  }

}
