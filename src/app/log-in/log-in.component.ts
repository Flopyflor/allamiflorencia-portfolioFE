import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private rutas : Router) { }

  ngOnInit(): void {
  }

  navigate(){
    this.rutas.navigate(["/log-in"])
  }

}
