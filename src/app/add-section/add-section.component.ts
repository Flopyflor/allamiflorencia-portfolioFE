import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { Section } from '../Interfaces/Section';
import { PersonalInfoService } from '../services/personal-info.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  @Output() sendNewSection : EventEmitter<Section> = new EventEmitter;
  editable:boolean = false;
  subscription?: Subscription;
  form: FormGroup;

  tipos: string[] = [];

  @Input() titulos: string[] = [];
  tituloEnInvalidos: boolean = false;


  alertTipo: boolean = false;

  constructor( private DB:PersonalInfoService, private formBuilder: FormBuilder, private uiService: UiService) { 
    this.form = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      tipo: ["", [Validators.required]]
    });

    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.editable = value;
    });
    
  }

  ngOnInit(): void {
    this.editable = this.uiService.isEditable();
  }

  get Titulo(){
    return this.form.get("titulo");
  }

  get Tipo(){
    return this.form.get("tipo");
  }

  tipoInvalid(){
    return !this.Tipo?.valid;
  }

  checkTituloEnInvalidos(){
    return this.titulos.includes(this.Titulo?.value) || this.Titulo?.value == "";
  }

  onClick(){
    this.titulos.push(this.Titulo?.value);

    var subs = this.DB.createSection(this.Titulo?.value, this.Tipo?.value);

    subs.subscribe((id)=>{
      var section:Section = {id: id, titulo: this.Titulo?.value, tipo: this.Tipo?.value, data: [{id: 0, titulo: "", link: "", descripcion: ""}]};
      this.sendNewSection.emit(section);
      }
    );
  }

}
