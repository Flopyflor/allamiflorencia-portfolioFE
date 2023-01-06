import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.css']
})
export class EditBtnComponent implements OnInit {

  editable: boolean = false;
  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.editable=!this.editable;
    this.uiService.toggleEditable();
  }

}
