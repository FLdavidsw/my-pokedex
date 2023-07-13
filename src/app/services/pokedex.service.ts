import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { pokemon, pokemonPagination } from './../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private urlApi = 'https://pokeapi.co/api/v2';
  pokemonId =  0;
  //https://pokeapi.co/api/v2/pokemon/?limit=20&offset=40
  constructor(
    private http: HttpClient
  ){}
  getAllPokemon(limit?:number, offset?:number) {
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<pokemonPagination>(`${this.urlApi}/pokemon/`)
  }

  getPokemon(pokemonName: string) {
    return this.http.get<any>(`${this.urlApi}/pokemon/${pokemonName}`)
  }
}
