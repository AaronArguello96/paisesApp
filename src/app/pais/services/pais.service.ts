import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  //private apiUrl: string = 'https://restcountries.com/v2'

  get httpParams(){
    return new HttpParams().set('fields', 'name,capital,alpha2Code,flag,population' ); //Sirve para almacenar los parametros de la petición http al api en una constante
  }

  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {

    const url = `https://restcountries.com/v2/name/${termino}`;

    //this.http.get(url).subscribe();

    return this.http.get<Country[]>(url, {params: this.httpParams});//.pipe(
    //   catchError(err=>of(['Error al buscar'])) //Esta funcion devuelve un observable, por eso se le pone el of (funcion de convierte en observable el objeto que se le pasa)
    // ); //Sirve para manejar trazas de error.
  }

  buscarCapital(termino: string): Observable<Country[]> {

    const url = `https://restcountries.com/v2/capital/${termino}`;
    //const url = `${this.apiUrl}/capital/${termino}`;
    //https://restcountries.com/v2/capital
    return this.http.get<Country[]>(url, {params: this.httpParams});//.pipe(
    //   catchError(err=>of(['Error al buscar'])) //Esta funcion devuelve un observable, por eso se le pone el of (funcion de convierte en observable el objeto que se le pasa)
    // ); //Sirve para manejar trazas de error.
  }

  getPaisPorAlpha(id: string): Observable<Country> {

    const url = `https://restcountries.com/v2/alpha/${id}`;
    return this.http.get<Country>(url);
  
  }

  buscarRegion(region:string): Observable<Country[]>{

    const url = `https://restcountries.com/v2/regionalbloc/${region}`;
    return this.http.get<Country[]>(url, {params: this.httpParams}).pipe(tap(console.log)); //También se podría poner unicamente params si la constante creada en el HttpParams se llama igual
  }
  
}
