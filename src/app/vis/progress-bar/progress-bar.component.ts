import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @Input() link = "";
  @Input() titulo = "";
  @Input() descripcion = "";

  constructor() { }

  ngOnInit(): void {
  }

}
