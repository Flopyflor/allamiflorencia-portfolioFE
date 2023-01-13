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

    file : File | null = null;
    filename = ".png";
    fileSrc = "";
  
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
            this.updateDB();
        },
        error: (err)=>{DB.handleError(err)}
      });

     }
  
    ngOnInit(): void {
      this.Titulo?.setValue(this.titulo);
      this.Descripcion?.setValue(this.descripcion);
      this.editable = this.uiService.isEditable();
      this.filename = this.id+this.filename;

      this.DB.traerImagen(this.filename).subscribe((img) =>{     
        this.fileSrc = this.sanitizer.bypassSecurityTrustResourceUrl(img) as string;
       });
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
        descripcion: this.Descripcion?.value,
        seccion: this.seccion
      });

      if(this.file){        
        var fileReader = new FileReader();
  
        fileReader.readAsDataURL(this.file);
   
        fileReader.onload = () =>{
          if(this.file){
            this.DB.enviarImagen(this.filename, fileReader.result).subscribe({
              error: (err)=>{this.DB.handleError(err)}
            });
            this.fileSrc = fileReader.result as string;
          }
        }
      }

      this.titulo = this.Titulo?.value;
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
        this.changed = true;
        this.uiService.markUnsaved();
      }
    }

    //storage
    getFile(event: any){
      this.file = event.target.files[0];
      console.log(this.file);
      
    }
  
  }