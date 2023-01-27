import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino:string = '';
  hayError: boolean = false;
  paises:Country [] = [];
  paisesSugeridos:Country[] = [];
  mostrarSugerencias:boolean = false;

  constructor(private PaisService:PaisService){

  }

  buscar(termino:string){

    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino; //igualamos el termino local al termino pasado por argumento, que es del eventEmitter del componente paisInput

    console.log(this.termino);

    this.PaisService.buscarPais(this.termino)
    .subscribe((paises)=>{
      console.log('Query: ', paises);
      this.paises = paises; //Igualamos el array de paises al pais introducido en la búsqueda?

    },(err)=>{ //Gestión de errores
      this.hayError = true;
      console.log('Error: ', err);
      this.paises = [];
    });
  }

  sugerencias(termino:string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.PaisService.buscarPais(termino)
      .subscribe(paises=>this.paisesSugeridos = paises.splice(0,5),
      (err)=> this.paisesSugeridos = [])
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
    
  }
}
