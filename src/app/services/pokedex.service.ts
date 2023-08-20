import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { delay, throwError, Observable } from 'rxjs';

import { pokemon, pokemonPagination } from './../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private urlApi = 'https://pokeapi.co/api/v2';
  pokemonId =  0;
  colorTypes: object = {"normal": '#B6F0EF', "fire": '#FB251B', "water": '#1BA0FB', "grass": '#1ACB35', "flying": '#90D6FA', "fighting": '#F58D25',
  "poison": '#BE29C1', "electric": '#FFFF00', "ground": '#C55710', "rock": '#903F0A', "psychic": '#EC4895', "ice": '#00FFFB', "bug": '#6F8F2A',
  "ghost": '#95849E', "steel": '#A3B1B2', "dragon": '#77EEB6', "dark": '#8C8593', "fairy": '#EE2F54'}
  colorType!: string;
  types: string[] = [];
  //https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
  // link to get locations: https://pokeapi.co/api/v2/region
  // link to get types: https://pokeapi.co/api/v2/type
  constructor(
    private http: HttpClient
  ){}
  
  getAllPokemon(limit?:number, offset?:number) {
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined) {
      params = params.set('offset', offset);
      params = params.set('limit', limit);
    }
    return this.http.get<pokemonPagination>(`${this.urlApi}/pokemon/`,{params})
  }

  getPokemon(pokemonNameorId: string | number) {
    return this.http.get<any>(`${this.urlApi}/pokemon/${pokemonNameorId}`)
    .pipe(
      map(pokemon => {
        pokemon.img = pokemon.sprites.other['official-artwork'].front_default;
        for (var i = 0; i < pokemon.types.length; i++) {
          this.colorType = this.colorAssign(this.colorTypes, pokemon.types[i]);
          this.types = this.types.concat(this.colorType);
        }
        pokemon.colorType = this.types;
        this.types = [];
        return pokemon;
      }),
      //catchError( error => throwError(console.log("se obtiene el siguiente error" + error)))
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error ('El pokemon no fue encontrado'));
        }
        return throwError(() => new Error ('Algo esta fallando en el server'));
      })
      )
  }

  getLocations() {
    return this.http.get<any>(`${this.urlApi}/region`);
  }

  getTypes() {
    return this.http.get<any>(`${this.urlApi}/type`);
  }

  colorAssign(colorTypes: object, Type: any) {
    for (let [key, value] of Object.entries(colorTypes)) {
      if (Type.type.name === key) {
        return value;
      }
    }
  }
}
