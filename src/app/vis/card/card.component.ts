import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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

    form: FormGroup
  
    constructor(private formBuilder: FormBuilder, private uiService: UiService, private DB : PersonalInfoService) {
      this.form = this.formBuilder.group({
        link : [this.link, []],
        titulo: [this.titulo, []],
        descripcion: [this.descripcion, []]
      });

      this.subscription = this.uiService.onToggle().subscribe((value) => {
        this.editable = value;
      });

     }
  
    ngOnInit(): void {
      this.Link?.setValue(this.link);
      this.Titulo?.setValue(this.titulo);
      this.Descripcion?.setValue(this.descripcion);
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
    }

    eliminarDB():void{
      this.DB.eliminarInfo(this.id);
    }
  
  }