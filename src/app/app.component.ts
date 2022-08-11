import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PortfolioFrontEnd';

  persona = {
    'nombre': 'Florencia Allami',
    'bio': 'Soy una estudiante universitaria de 18 años que busca constantemente aumentar su repertorio de habilidades.'
  }

  sections = [
    {'titulo':'Educación',
    'tipo': 'card',
    'data': [
      {'titulo': 'ILSE',
      'link': '/assets/ILSE-logo.jpg',
      'descripcion': 'Escuela Secundaria nacional dependiente de la UBA.'},

      {'titulo': 'Codo a Codo',
      'link': '/assets/logocodoacodo.png',
      'descripcion': 'Parte de la agencia "Aprendizaje a lo largo de la vida", dependiente de la ciudad Autónoma de Buenos Aires.'},

      {'titulo': 'UBA',
      'link': '/assets/UBA-logo.png',
      'descripcion': 'Actualmente cursando el segundo semestre del CBC en la UBA, con perspectiva de empezar la carrera de Licenciatura en Ciencia de Datos.'}
    ]},

    {'titulo':'Habilidades',
    'tipo': 'progress-bar',
    'data': [
      {'titulo': 'prueba',
      'link': '',
      'descripcion': '70%'}
    ]},

    {'titulo':'Proyectos',
    'tipo': 'project',
    'data': [
      {'titulo': 'proyecto',
      'descripcion': 'bla bla',
      'link': '#'}
    ]}
  ]

}
