import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {

  form : FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private rutas: Router) { 
    this.form = this.formBuilder.group({
      usuario: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get Usuario(){ 
    return this.form.get('usuario');
  }

  get Password(){
    return this.form.get("password");
  }

  usuarioInvalid(){
    return this.Usuario?.touched && !this.Usuario?.valid;
  }

  passwordInvalid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  enviar(event: Event){
    event.preventDefault();

    this.authService.inicarSesion(this.form.value).subscribe(data=>{
      console.log("DATA", JSON.stringify(data));
      this.rutas.navigate(["/inicio"]);
    })
  }

}
