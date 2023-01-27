import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../app.component.css'],
  styles: [
  `li{
      cursor: pointer; /*Sirve para dar estilos únicamente a este componente*/
    }`
  ]
})

export class SidebarComponent {
  
}
