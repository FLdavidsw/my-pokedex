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
  colorTypes: object = {"normal": '#B6F0EF', "fire": '#FB251B', "water": '#1BA0FB', "grass": '#1ACB35', "flying": '#90D6FA', "fighting": '#F58D25',
  "poison": '#BE29C1', "electric": '#FFFF00', "ground": '#C55710', "rock": '#903F0A', "psychic": '#EC4895', "ice": '#00FFFB', "bug": '#6F8F2A',
  "ghost": '#95849E', "steel": '#A3B1B2', "dragon": '#77EEB6', "dark": '#8C8593', "fairy": '#EE2F54'}
  colorType!: string;
  types: string[] = [];
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
    return this.http.get<pokemonPagination>(`${this.urlApi}/pokemon/`,{params})
  }

  getPokemon(pokemonName: string) {
    return this.http.get<any>(`${this.urlApi}/pokemon/${pokemonName}`)
    .pipe(
      map(pokemon => {
        pokemon.img = pokemon.sprites.other['official-artwork'].front_default;
        for (var i = 0; i < pokemon.types.length; i++) {
          this.colorType = this.colorAssign(this.colorTypes, pokemon.types[i]);
          this.types = this.types.concat(this.colorType);
        }
        pokemon.colorType = this.types;
        console.log(pokemon.colorType);
        this.types = [];
        return pokemon;
      })
    )
  }

  colorAssign(colorTypes: object, Type: any) {
    for (let [key, value] of Object.entries(colorTypes)) {
      if (Type.type.name === key) {
        return value;
      }
    }
  }
}
