import { Component, HostListener, OnInit } from '@angular/core';
import { PersonalInfoService } from '../services/personal-info.service';
import { Section } from '../Interfaces/Section';
import { UiService } from '../services/ui.service';
import { Observable, Subscription } from 'rxjs';
import { Card } from '../Interfaces/Card';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  CARD = "card";
  FILE_END = ".png"

  sections: Section[] = [{id: 0, titulo: "", tipo: "", data: [{id: 0, titulo: "", link: "", descripcion: ""}]}];
  titles : string[] =[];

  borrarInfos : Observable<Object>[] = [];
  cambiosSecc : Observable<Object>[] = [];
  borrarImgs : Observable<Object>[] = [];
  saveSub : Subscription;


  constructor( private DB:PersonalInfoService, private uiService: UiService) {

    this.saveSub = this.uiService.onSaveAll().subscribe({
      next:
      ()=>{
        const cantInfos = this.borrarInfos.length
        var infosCount = 0;
        for(var i = 0; i < cantInfos; i++){  
          this.borrarInfos[i].subscribe({ //borrando infos
            complete: ()=>{
              infosCount += 1;
              
              if(infosCount == cantInfos){
                
                const cantSecciones = this.cambiosSecc.length;
                var seccCount = 0;
                for(var j = 0; j < cantSecciones; j++){ //hacer los cambios en secciones
                  this.cambiosSecc[j].subscribe({
                    complete: ()=> {
                      seccCount += 1;
                      if(seccCount == cantSecciones){
                                            
                        this.borrarInfos = []
                        this.cambiosSecc = []
                      }
                    },
                    error: (err)=>{DB.handleError(err)}
                  });
                }
              }
            },
            error: (err)=>{DB.handleError(err)}
          });
        }

        for(var img of this.borrarImgs){
          img.subscribe({
            error: (err) => {DB.handleError(err)}
          })
        }

        if(this.borrarInfos.length == 0){ //por si no hay ninguno acá y lo de antes no se ejecutó
          
          var seccCount = 0;
          const cantSecc = this.cambiosSecc.length;
          for(var i = 0; i < cantSecc; i++){ //hacer los cambios en secciones
            this.cambiosSecc[i].subscribe({
              complete: ()=>{
                seccCount+=1;
                if(seccCount == cantSecc){
                  this.cambiosSecc = [];
                }
              },
              error: (err)=>{DB.handleError(err)}
            });
          }
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

    this.setTitulos();
  }

  //Titulos header
  setTitulos () {
    this.DB.getSectionTitle().subscribe({
      next:
      (lista)=>{
        this.titles = lista;
      },
      error: (err) => {this.DB.handleError(err)}
    });
  }


  //agregar secciones
  addSection(section: Section){
    this.sections.push(section);
  }


  //borrar secciones (agregarlos a la cola)
  eliminarSeccion(cardsDescartadas:Card[], cardsMantenidas:Card[], seccion: Section){
    this.titles.splice(this.titles.findIndex(tit =>{return tit == seccion.titulo}), 1); //eliminar la vista
    var index = this.sections.findIndex((sec)=>{
      return sec.id == seccion.id; //obtener el id
    });  
    this.sections.splice(index, 1);

    var infos = cardsDescartadas.concat(cardsMantenidas);
    for (var card of infos){
      this.borrarInfos.push(this.DB.eliminarInfo(card.id));

      if(seccion.tipo == this.CARD) {
        this.borrarImgs.push(this.DB.borrarImagen(card.id+this.FILE_END));
      }
    }

    this.cambiosSecc.push(this.DB.eliminarSeccion(seccion.id));
    this.uiService.markUnsaved();
    
  }


  //dropdown para pantallas pequeñas
  toggleDropdown() {
    this.uiService.closeDropdown();
    
  }  


  //irse sin guardar
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
