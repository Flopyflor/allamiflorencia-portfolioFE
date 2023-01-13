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


  //file declaration
  filename = "persona.png";
  file : File | null = null;
  fileSrc = "";

  changed = false;
  saveSub: Subscription;

  constructor(private DB:PersonalInfoService, private uiService: UiService, private formBuilder: FormBuilder, private sanitizer : DomSanitizer) {
    this.form = this.formBuilder.group({
      nombre : [this.persona.nombre, []],
      bio: [this.persona.bio, []]
    });

    this.DB.getPersonalInfo().subscribe({
      next:
        (persona) => {
          this.persona = persona;
          this.ponerValores();
        },
      error: (error) => {DB.handleError(error)}
    });

    this.subscription = this.uiService.onToggle().subscribe((value)=>{
      this.editable=value;
    });

    this.saveSub = this.uiService.onSaveAll().subscribe({
      next:
      ()=>{
          this.updateDBInfo();
      },
      error: (err)=>{DB.handleError(err)}
    });

    // tratando de recibir la img del backend

    this.DB.traerImagen(this.filename).subscribe((img) =>{     
       this.fileSrc = sanitizer.bypassSecurityTrustResourceUrl(img) as string;
      });
    
   }

  ngOnInit(): void {
    this.editable = this.uiService.isEditable();

  }

  get Nombre(){
    return this.form.get("nombre");
  }

  get Bio(){
    return this.form.get("bio");
  }

  updateDBInfo(): void{
    this.DB.updatePersona({
      id: this.persona.id,
      nombre: this.Nombre?.value,
      bio: this.Bio?.value
    });
    this.persona.nombre = this.Nombre?.value;
    this.persona.bio = this.Bio?.value;
    this.changed=false;

    //enviar la img

    if(this.file){
      var fileReader = new FileReader();

      fileReader.readAsDataURL(this.file);
 
      fileReader.onload = () =>{
        if(this.file){
          this.DB.enviarImagen(this.filename, fileReader.result).subscribe({
            error: (err)=>{this.DB.handleError(err)}
          });
        }
      }
    }
  }

  ponerValores():void {
    this.Nombre?.setValue(this.persona.nombre);
    this.Bio?.setValue(this.persona.bio);
  }

  unsaved(){
    if(this.form.dirty){
      this.uiService.markUnsaved();
      this.changed=true;
    }
  }

  //storage
  getFile(event: any){
    this.file = event.target.files[0];
    console.log(this.file);
    
  }

}
