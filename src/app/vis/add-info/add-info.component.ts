import { Component, Input, OnInit } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {

  @Input() seccion="";
  @Input() tipo="";

  constructor(private DB: PersonalInfoService) { }

  ngOnInit(): void {
  }

  agregarInfo(){
    //maybe directamente cargarlo a la DB-cómo se vería eso?
    this.DB.updateInfo({
      seccion: this.seccion,
      tipo: this.tipo
    })
  }

}
