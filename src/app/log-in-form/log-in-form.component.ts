import { HttpErrorResponse } from '@angular/common/http';
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
  loginInvalido = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private rutas: Router) { 
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.authService.sesionVencida();
    sessionStorage.clear();
  }

  get Usuario(){ 
    return this.form.get('username');
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

    this.authService.iniciarSesion(this.form.value).subscribe(
      {next: 
        () => {
            this.rutas.navigate(["/inicio"]);
        },
      error: 
        (err : HttpErrorResponse)=> { 
          if(err instanceof Error){
            console.log("a FE error occurred", err.error.message);
          } else {
            console.log('Backend returned status code: ', err.status);
            console.log('Response body:', err.error);
          }
          this.loginInvalido = true;
          setTimeout(()=>{this.loginInvalido=false;}, 3000);
        }
      }
    );
  }

}
