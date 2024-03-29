import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/Interfaces/Card';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  
    @Input() id = 0;
    @Input() link = "";
    @Input() titulo = "";
    @Input() descripcion = "";
    @Input() seccion = "";
    editable: boolean = false;
    subscription?: Subscription;
    @Output() sendDeleteCard: EventEmitter<Card> = new EventEmitter;

    form: FormGroup

    changed = false;
    saveSub: Subscription;

  
    constructor(private formBuilder: FormBuilder, private uiService: UiService, private DB : PersonalInfoService, private sanitizer: DomSanitizer) {
      this.form = this.formBuilder.group({
        titulo: [this.titulo, []],
        descripcion: [this.descripcion, []]
      });

      this.subscription = this.uiService.onToggle().subscribe((value) => {
        this.editable = value;
      });

      this.saveSub = this.uiService.onSaveAll().subscribe({
        next:
        ()=>{
          if(this.changed){
            this.updateDB();
          }
        },
        error: (err)=>{DB.handleError(err)}
      });

     }
  
    ngOnInit(): void {
      this.Titulo?.setValue(this.titulo);
      this.Descripcion?.setValue(this.descripcion);
      this.editable = this.uiService.isEditable();

    }


    //getters
    get Titulo(){
      return this.form.get('titulo');
    }

    get Descripcion(){
      return this.form.get('descripcion');
    }

    //subir a la DB
    updateDB(): void{
      this.DB.updateInfo({
        id: this.id,
        titulo: this.Titulo?.value,
        descripcion: this.Descripcion?.value,
        seccion: this.seccion
      }); //auto suscribe pq no tiene retorno

      this.titulo = this.Titulo?.value;
      this.descripcion = this.Descripcion?.value;

      this.changed=false;
    }

    //enviar orden de eliminar
    eliminarDB():void{
      this.sendDeleteCard.emit({
        id: this.id,
        titulo: this.titulo,
        link: this.link,
        descripcion: this.descripcion
      });
      //este elemento no va a necesitar ser actualizado en la db
      this.changed = false;
    
    }

    //marcar cambiado
    unsaved(){
        this.changed = true;
        this.uiService.markUnsaved();
    }
  
  }