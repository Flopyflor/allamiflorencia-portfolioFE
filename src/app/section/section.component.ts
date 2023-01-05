import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../Interfaces/Card';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() titulo = "";
  @Input() tipo = "";
  @Input() data : Card[] = [
    {"id":0,
      'titulo': '',
    'link': '',
    'descripcion': ''}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
