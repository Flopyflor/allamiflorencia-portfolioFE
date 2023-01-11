import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit{

  @Input() seccion="";
  @Input() tipo="";
  @Output() sendAgregarInfo : EventEmitter<any> = new EventEmitter;

  plusIcon = faPlusCircle;

  constructor(private DB: PersonalInfoService) {
   }

  ngOnInit(): void {
  }

  agregarInfo(){
    var info = {
      seccion:this.seccion
    };
    this.DB.createInfo(info).subscribe((id)=>{
      this.sendAgregarInfo.emit(id);
    });
  }

}
