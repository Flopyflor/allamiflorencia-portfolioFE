import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
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

  constructor(private uiService: UiService, private formBuilder: FormBuilder, private DB : PersonalInfoService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.editable = value;
    });

    this.sectionForm = this.formBuilder.group({
      titulo: [this.titulo, [Validators.required]]
    })
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
    var index = this.data.indexOf(card);
    this.data.splice(index);
  }

  actualizarSeccion(){
    var newTitulo = this.Titulo?.value;

    this.DB.getSectionTitle().subscribe((data)=>{
      this.titulos = data as string[];

      if(this.titulos.includes(newTitulo)){
        this.Titulo?.setValue(this.titulo);
        alert("No puede haber dos secciones con el mismo nombre");
      } else {
        this.titulo = newTitulo;
        this.DB.updateSeccion(this.id, this.Titulo?.value).subscribe();
      }
    })

    
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
          }
        });
      } else {
        this.data = [];
      }
    };

    if(!this.data.length){
      this.sendEliminar.emit(seccion);
    }
    
  }
}
