import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/Interfaces/Card';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    @Input() id = 0;
    @Input() link = "";
    @Input() titulo = "";
    @Input() descripcion = "";
    @Input() seccion = "";
    editable: boolean = false;
    subscription?: Subscription;
    @Output() sendDeleteCard: EventEmitter<Card> = new EventEmitter;



    form: FormGroup;

    changed = false;
    saveSub: Subscription;
  
    constructor(private formBuilder: FormBuilder, private uiService: UiService, private DB : PersonalInfoService) {
      this.form = this.formBuilder.group({
        link : [this.link, []],
        titulo: [this.titulo, []],
        descripcion: [this.descripcion, []]
      });

      this.subscription = this.uiService.onToggle().subscribe((value) => {
        this.editable = value;
      });

      this.saveSub = this.uiService.onSaveAll().subscribe({
        next:
        ()=>{
            this.updateDB();
        },
        error: (err)=>{DB.handleError(err)}
      });

     }

  
     ngOnInit(): void {
      this.Link?.setValue(this.link);
      this.Titulo?.setValue(this.titulo);
      this.Descripcion?.setValue(this.descripcion);

      this.editable=this.uiService.isEditable();
    }

    get Link(){
      return this.form.get('link');
    }

    get Titulo(){
      return this.form.get('titulo');
    }

    get Descripcion(){
      return this.form.get('descripcion');
    }

    updateDB(): void{
      this.DB.updateInfo({
        id: this.id,
        titulo: this.Titulo?.value,
        link: this.Link?.value,
        descripcion: this.Descripcion?.value,
        seccion: this.seccion
      });

      this.titulo = this.Titulo?.value;
      this.link = this.Link?.value;
      this.descripcion = this.Descripcion?.value;

      this.changed=false;
    }

    eliminarDB():void{
      this.sendDeleteCard.emit({
        id: this.id,
        titulo: this.titulo,
        link: this.link,
        descripcion: this.descripcion
      });
      this.changed = false;
      this.saveSub.unsubscribe()
    }

    unsaved(){
      if(this.form.dirty){
        this.changed=true;
        this.uiService.markUnsaved();
      }
    }

}
