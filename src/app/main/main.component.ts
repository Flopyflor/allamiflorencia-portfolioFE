import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from '../services/personal-info.service';
import { Section } from '../Interfaces/Section';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'PortfolioFrontEnd';

  persona = {
    'nombre': 'Florencia Allami',
    'bio': 'Soy una estudiante universitaria de 18 años que busca constantemente aumentar su repertorio de habilidades.'
  }

  sections: Section[] = [{titulo: "", tipo: "", data: [{titulo: "", link: "", descripcion: ""}]}];

  constructor( private DB:PersonalInfoService) { }

  ngOnInit(): void {
    this.DB.get().subscribe( (sections) => {
      this.sections = sections;
    })
  }

  getTitles(): string[] {
    var titles = [];
    for(var grupo of this.sections!) {
      titles.push(grupo.titulo);
    }
    return titles;
  }

}
