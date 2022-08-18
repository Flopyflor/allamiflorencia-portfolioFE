import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonalInfoService } from '../services/personal-info.service';
import { Section } from '../Interfaces/Section';
import { Person } from '../Interfaces/Person';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  persona: Person = {nombre: "", bio: ""}
  sections: Section[] = [{titulo: "", tipo: "", data: [{titulo: "", link: "", descripcion: ""}]}];


  constructor( private DB:PersonalInfoService) { }

  ngOnInit(): void {
    this.DB.getPersonalInfo().subscribe((persona) => {
      this.persona = persona;
    })
    this.DB.getSections().subscribe( (sections) => {
      this.sections = sections;
    });
  }

  getTitles(): string[] {
    var titles = [];
    for(var grupo of this.sections!) {
      titles.push(grupo.titulo);
    }
    return titles;
  }

}
