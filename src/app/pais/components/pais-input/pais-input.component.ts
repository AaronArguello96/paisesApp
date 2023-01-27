import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['../../../app.component.css']
})

export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter;
  @Output() onDebounce: EventEmitter<string> = new EventEmitter; //Evento que se emitirá cuando la persona deje de escribir

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject; //El subject es un observable

  termino:string = '';

  ngOnInit() { //El OnInit se dispara una única vez cuando el componente es creado
    this.debouncer
    .pipe(debounceTime(300))//Transforma la salida del subscriber. En este caso es para añadirle un tiempo de espera en cada lectura que hace del valor introducido
    .subscribe(valor =>{
      //console.log('Debouncer: ', valor);
      this.onDebounce.emit(valor);
    });
  }

  buscar(){
    this.onEnter.emit(this.termino);

  }

  teclaPresionada(){
    this.debouncer.next(this.termino);
  }

  // teclaPresionada(event:any){
  //   const valor = event.target.value;
  //   console.log(valor);
  //   console.log(this.termino);
  // }
}
