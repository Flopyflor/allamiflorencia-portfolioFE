import { Component, HostListener, OnInit } from '@angular/core';
import { PersonalInfoService } from '../services/personal-info.service';
import { Section } from '../Interfaces/Section';
import { UiService } from '../services/ui.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sections: Section[] = [{id: 0, titulo: "", tipo: "", data: [{id: 0, titulo: "", link: "", descripcion: ""}]}];
  titles : string[] =[];

  cambios : Observable<Object>[] = [];
  saveSub : Subscription;


  constructor( private DB:PersonalInfoService, private uiService: UiService) {
    this.DB.getSectionTitle().subscribe({
      next:
      (lista)=>{
        this.titles = lista;
      },
      error: (err) => {DB.handleError(err)}
    });

    this.saveSub = this.uiService.onSaveAll().subscribe({
      next:
      ()=>{
        for(var i = 0; i < this.cambios.length; i++){
          console.log("deleting sth");
          
          this.cambios[i].subscribe({
            error: (err)=>{DB.handleError(err)}
          })
        }
      },
      error: (err)=>{DB.handleError(err)}
    });
   }

  ngOnInit(): void {
    this.DB.getSections().subscribe( {
      next:
      (sections) => {
      this.sections = sections;
    },
    error: (error) => {this.DB.handleError(error);}
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

    this.cambios.push(this.DB.eliminarSeccion(seccion.id));

    this.uiService.markUnsaved();
  }

  toggleDropdown() {
    this.uiService.closeDropdown();
    
  }  

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(event: any) {
    
    if(this.uiService.isUnsaved()){
      event.returnValue = false;
    }
  }

  canDeactivate() {
    return !this.uiService.isUnsaved()
  }

}
