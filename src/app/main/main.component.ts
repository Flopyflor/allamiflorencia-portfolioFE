import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from '../services/personal-info.service';
import { Section } from '../Interfaces/Section';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sections: Section[] = [{id: 0, titulo: "", tipo: "", data: [{id: 0, titulo: "", link: "", descripcion: ""}]}];
  titles : string[] =[];


  constructor( private DB:PersonalInfoService) {
    this.DB.getSectionTitle().subscribe((lista)=>{
      this.titles = lista;
    });
   }

  ngOnInit(): void {
    this.DB.getSections().subscribe( (sections) => {
      this.sections = sections;
    });
  }

  addSection(section: Section){
    this.sections.push(section);
  }

  eliminarSeccion(seccion : Section){
    this.titles.splice(this.titles.findIndex(tit =>{return tit == seccion.titulo}), 1);
    var index = this.sections.findIndex((sec)=>{
      return sec.id == seccion.id;
    });  
    this.sections.splice(index, 1);
    this.DB.eliminarSeccion(seccion.id).subscribe();
  }
  

}
