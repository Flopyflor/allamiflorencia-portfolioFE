import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, VirtualTimeScheduler } from 'rxjs';
import { Card } from '../Interfaces/Card';
import { Section } from '../Interfaces/Section';
import { PersonalInfoService } from '../services/personal-info.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() id = 0;
  @Input() titulo = "";
  @Input() tipo = "";
  @Input() data : Card[] = [
    {"id":0,
      'titulo': '',
    'link': '',
    'descripcion': ''}
  ];

  @Output() sendEliminar: EventEmitter<Section> = new EventEmitter;

  subscription: Subscription;
  editable: boolean=false;

  sectionForm: FormGroup;

  titulos: string[] = [];

  saveSub: Subscription;
  changed =false;

  cambios: Observable<Object>[] = [];

  constructor(private uiService: UiService, private formBuilder: FormBuilder, private DB : PersonalInfoService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.editable = value;
    });

    this.sectionForm = this.formBuilder.group({
      titulo: [this.titulo, [Validators.required]]
    });

    this.saveSub = this.uiService.onSaveAll().subscribe({
      next:
      ()=>{
        for(var i = 0; i < this.cambios.length; i++){
          this.cambios[i].subscribe({
            error: (err)=>{DB.handleError(err)}
          })
        }
      },
      error: (err)=>{DB.handleError(err)}
    });
   }

  ngOnInit(): void {
    this.editable= this.uiService.isEditable();
    this.Titulo?.setValue(this.titulo);
  }

  get Titulo(){
    return this.sectionForm.get("titulo");
  }

  agregarInfo(id: any){
    var card : Card = {
      id: id,
      titulo: '',
      link: '',
      descripcion: ''
    }
    this.data.push(card);
  }

  borrarInfo(card: Card){
    var index = this.data.findIndex((tarjeta)=>{return tarjeta.id == card.id}); 
    console.log(this.data);
    console.log(card);
    console.log(index);
    
    this.data.splice(index, 1);

    this.cambios.push(this.DB.eliminarInfo(card.id));

    this.uiService.markUnsaved();
    
  }

  actualizarSeccion(){
    var newTitulo = this.Titulo?.value;

    this.DB.getSectionTitle().subscribe({
      next:
      (data)=>{
        this.titulos = data as string[];
  
        if(this.titulos.includes(newTitulo)){
          this.Titulo?.setValue(this.titulo);
          alert("No puede haber dos secciones con el mismo nombre");
        } else {
          this.titulo = newTitulo;
          this.DB.updateSeccion(this.id, this.Titulo?.value).subscribe();
        }
      },
      error: (err) => {this.DB.handleError(err);}
    });
  }

  eliminarSeccion(){
    var seccion:Section = {
      id : this.id,
      titulo: this.titulo,
      tipo: this.tipo,
      data: this.data
    };

    for(var card of this.data){
      if (card.id!=0){
        this.DB.eliminarInfo(card.id).subscribe({
          next:()=>{
            if(this.data.indexOf(card) == this.data.length-1){
              this.sendEliminar.emit(seccion);
            }
          },
          error: (err)=> {this.DB.handleError(err);}
        });
      } else {
        this.data = [];
      }
    };

    if(!this.data.length){
      this.sendEliminar.emit(seccion);
    }

    this.changed=false;
    this.saveSub.unsubscribe()
    
  }

  unsaved(){
    if(this.sectionForm.dirty){
      this.uiService.markUnsaved();
      this.changed = true;
    } 
  }
}
