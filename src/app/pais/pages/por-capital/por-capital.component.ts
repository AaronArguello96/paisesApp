import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['../../../app.component.css']
})

export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private PaisService: PaisService) {

  }

  buscar(termino: string) {

    this.hayError = false;
    this.termino = termino; //igualamos el termino local al termino pasado por argumento, que es del eventEmitter del componente paisInput

    //console.log(this.termino);

    this.PaisService.buscarCapital(this.termino)
      .subscribe((paises) => {
        this.paises = paises; //Igualamos el array de paises al pais introducido en la búsqueda?

      }, (err) => { //Gestión de errores
        this.hayError = true;
        console.log('Error: ', err);
        this.paises = [];
      });
  }

}
