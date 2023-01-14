import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/Interfaces/Person';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  editable: boolean=false;
  subscription?: Subscription;
  persona: Person = {id: 0, nombre: "", bio: ""};
  form: FormGroup;
  bioFormat = [""];


  changed = false;
  saveSub: Subscription;

  constructor(private DB:PersonalInfoService, private uiService: UiService, private formBuilder: FormBuilder) {
    
    //form
    this.form = this.formBuilder.group({
      nombre : [this.persona.nombre, []],
      bio: [this.persona.bio, []]
    });

    //get data de la db

    this.DB.getPersonalInfo().subscribe({
      next:
        (persona) => {
          this.persona = persona;
          this.ponerValores();
        },
      error: (error) => {DB.handleError(error)}
    });

    //suscribir al editable

    this.subscription = this.uiService.onToggle().subscribe((value)=>{
      this.editable=value;
    });

    //suscribir al update all

    this.saveSub = this.uiService.onSaveAll().subscribe({
      next:
      ()=>{
        if(this.changed){
          this.updateDBInfo();
        }
      },
      error: (err)=>{DB.handleError(err)}
    });
    
   }

  ngOnInit(): void {
    this.editable = this.uiService.isEditable();

  }

  //getters

  get Nombre(){
    return this.form.get("nombre");
  }

  get Bio(){
    return this.form.get("bio");
  }



  //updates

  updateDBInfo(): void{
    this.DB.updatePersona({
      id: this.persona.id,
      nombre: this.Nombre?.value,
      bio: this.Bio?.value
    });
    this.persona.nombre = this.Nombre?.value;
    this.persona.bio = this.Bio?.value;
    this.bioFormat = this.persona.bio.split("\n");
    this.changed=false;

  }

  //actualizar vista al tener los valores de la DB (primera vez)

  ponerValores():void {
    this.Nombre?.setValue(this.persona.nombre);
    this.Bio?.setValue(this.persona.bio);
    this.bioFormat = this.persona.bio.split("\n");
  }

  //marcar cambios

  unsaved(){
    this.uiService.markUnsaved();
    this.changed=true;
  }

}
