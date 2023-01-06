import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  persona: Person = {nombre: "", bio: ""};
  form: FormGroup;

  constructor(private DB:PersonalInfoService, private uiService: UiService, private formBuilder: FormBuilder) {
    this.subscription = this.uiService.onToggle().subscribe((value)=>{
      this.editable=value;
    });

    this.form = this.formBuilder.group({
      nombre : [this.persona.nombre, []],
      bio: [this.persona.bio, []]
    });
   }

  ngOnInit(): void {
    this.DB.getPersonalInfo().subscribe((persona) => {
      this.persona = persona;
    })
  }

  updateDBInfo(): void{
    this.DB.updateInfo(this.form.value);
  }

}
