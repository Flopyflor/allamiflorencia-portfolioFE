import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Card } from '../Interfaces/Card';
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

  @Output() sendEliminar: EventEmitter<Card[]> = new EventEmitter;
  @Output() sendActualizarTitulos: EventEmitter<null> = new EventEmitter;


  subscription: Subscription;
  editable: boolean=false;

  sectionForm: FormGroup;

  titulos: string[] = [];

  saveSub: Subscription;
  changed =false;

  aBorrar: Card[] = [];

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
        for(var card of this.aBorrar){ //estos cambios son los de eliminar. las updates se hacen localmente
          DB.eliminarInfo(card.id).subscribe({
            error: (err)=>{DB.handleError(err)}
          })
        }

        this.aBorrar = [];

        if(this.changed){
          this.actualizarSeccion();
        }

        this.changed = false;
      },
      error: (err)=>{DB.handleError(err)}
    });
   }

  ngOnInit(): void {
    this.editable= this.uiService.isEditable();
    this.Titulo?.setValue(this.titulo);
  }

  //Getter
  get Titulo(){
    return this.sectionForm.get("titulo");
  }

  //cuando se agrega una tarjeta
  agregarInfo(id: any){
    var card : Card = {
      id: id,
      titulo: '',
      link: '',
      descripcion: ''
    }
    this.data.push(card);
  }


  //agregar la orden de borrar una tarjeta a los cambios
  borrarInfo(card: Card){
    //borro la vista
    var index = this.data.findIndex((tarjeta)=>{return tarjeta.id == card.id});     
    this.data.splice(index, 1);

    //me pongo en la lista borrarlos
    this.aBorrar.push(card);

    this.uiService.markUnsaved();
    
  }


  //seccion
  actualizarSeccion(){
    var newTitulo = this.Titulo?.value;

    this.DB.getSectionTitle().subscribe({
      next:
      (data)=>{
        this.titulos = data as string[];
  
        if(this.titulos.includes(newTitulo)){ //deshacer si hace secciones con el mismo nombre
          this.Titulo?.setValue(this.titulo);
          alert("No puede haber dos secciones con el mismo nombre");
        } else {
          this.titulo = newTitulo;
          this.DB.updateSeccion(this.id, this.Titulo?.value).subscribe({
            next: ()=>{this.sendActualizarTitulos.emit()}
          });
        }
      },
      error: (err) => {this.DB.handleError(err);}
    });
  }

  //Eliminar secciones
  eliminarSeccion(){    
    this.sendEliminar.emit(this.aBorrar);
    this.changed=false;
    this.saveSub.unsubscribe();
    
  }

  unsaved(){
    this.uiService.markUnsaved();
    this.changed = true;
  }
}
