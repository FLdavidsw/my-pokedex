import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { filter, map, switchMap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

import { pokemon, region, type, pokemonPagination, resultPokemon, typesPokemon, ResultGeneration, generationData, MainRegion } from './../../models/pokemon.model';
import { PokedexService } from './../../services/pokedex.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit{

  pokemonName: string | null = null;
  
  colorTypes: object = {"normal": '#B6F0EF', "fire": '#FB251B', "water": '#1BA0FB', "grass": '#1ACB35', "flying": '#90D6FA', "fighting": '#F58D25',
                "poison": '#BE29C1', "electric": '#FFFF00', "ground": '#C55710', "rock": '#903F0A', "psychic": '#EC4895', "ice": '#00FFFB', "bug": '#6F8F2A',
                "ghost": '#95849E', "steel": '#A3B1B2', "dragon": '#77EEB6', "dark": '#8C8593', "fairy": '#EE2F54'}
  colorType!: string;
  types: type[] = [];
  typeChosen!: string;
  pokemonsByTypes: typesPokemon[] = [];
  regions: region[] = [];
  generations: ResultGeneration[] = [];
  nameList1 = "Region";
  switchEnterButton = false;
  searchedPokemon = "";
  pokemonExist = false; 
  pokemon!: pokemon;
  pokemonChosen!: pokemon;
  pokemons: pokemon[] = [];
  allPokemons: resultPokemon[] = [];
  pokemonsPagination: pokemonPagination[] = [];
  results: any[] = [];
  resultsByType: any[] = [];
  resultsByGeneration: resultPokemon[] = [];
  filterTypeCounter = 0;
  filterGenerationCounter = 0;
  slicer: resultPokemon[] = [];
  statusPokemonCard = false;
  stateLoadSpinner = false;
  isButtonDisabled: boolean = false;
  add = 20;
  maxNumberLimit = 1280;
  limit = 20;
  offset = 0;

  constructor(
    private pokedexService: PokedexService,
    private route: ActivatedRoute
  ){
    
  }

  ngOnInit(){
    this.getPokemons(this.limit, this.offset);
    this.getGenerations();
    this.getTypes();
    this.route.queryParamMap.subscribe(params => {
      this.pokemonName = params.get('pokemon');
      if(this.pokemonName){
        this.showPokemonCard(this.pokemonName);
      }
    });

  }

  loadMorePokemons(){
    this.offset += this.limit;
    this.addingPokemons(this.offset, this.offset + this.limit);
  }

  showPokemonCard(name: string) {
    this.statusPokemonCard = true;
    this.pokedexService.getPokemon(name)
    .subscribe(data => {
      this.pokemonChosen = data;
    });
  }

  //Here, we are catching the card's current state from the Pokemon card component.
  togglePokemonCard(stateCard: boolean) {
    this.statusPokemonCard = stateCard;
  }

  getPokemons(limit: number, offset: number){
    this.pokedexService.getAllPokemon(this.maxNumberLimit, this.offset).
    subscribe(data => {
      this.allPokemons = data['results'];
      for(let i = offset; i < limit; i++){
        this.slicer = this.slicer.concat(this.allPokemons[i]);
      }
      this.results = this.results.concat(this.slicer);
    })
  }

  addingPokemons(offset: number, limit: number){
    this.slicer = [];
    this.stateLoadSpinner = !this.stateLoadSpinner;
    for(let i = offset; i < limit; i++){
      this.slicer = this.slicer.concat(this.allPokemons[i]);
    }
    delay(3000);
    this.stateLoadSpinner = !this.stateLoadSpinner;
    this.results = this.results.concat(this.slicer);
  }

  getPokemonsPagination(limit: number, offset: number) {
    this.pokedexService.getAllPokemon(limit, offset)
    .subscribe(data => {
      this.stateLoadSpinner = !this.stateLoadSpinner;
      this.pokemonsPagination = this.pokemonsPagination.concat(data);
      this.results = data['results'];
      this.offset += this.limit;
      for (let result of this.results) {
        this.pokedexService.getPokemon(result.name)
        .pipe(delay(1500))
        .subscribe(data => {
          this.pokemon = data;
          this.pokemons = this.pokemons.concat(this.pokemon);
          this.stateLoadSpinner = false;
        });
      }
      
      
      });
  }

  getGenerations(){
    this.pokedexService.getGenerations().
    subscribe(data => {
      this.generations = this.generations.concat(data.results);
    });
  }

  getRegions(){
    this.pokedexService.getLocations().
    subscribe(data => {
      this.regions = this.regions.concat(data.results);
    });
  }

  getTypes(){
    this.pokedexService.getTypes().
    subscribe(data => {
      this.types = this.types.concat(data.results);
    });
  }

  searchPokemon(event: any) {
    this.searchedPokemon = this.searchedPokemon.toLowerCase()
    this.pokedexService.getPokemon(this.searchedPokemon.toLowerCase())
    .subscribe(data => {
      this.pokemonExist = true;
      this.switchEnterButton = !this.switchEnterButton;
    }, errorMsg => {
      this.searchedPokemon = "";
      this.pokemonExist = false;
      Swal.fire({text: errorMsg});
    });
  }
  //function to select pokemons of the same region
  onSelectedGeneration(generationUrl: string){
    this.searchedPokemon = ""; //restarting a null value in the searchedPokemon variable
    this.pokemonExist = false;
    if(generationUrl != undefined){
      this.isButtonDisabled = true;
      this.pokedexService.getPokemonByGenerations(generationUrl).
      subscribe(data => {
        this.results = [];
        this.results = this.results.concat(data.pokemon_species);
      });
      this.filterGenerationCounter = 1;
    }else{
      if(this.filterGenerationCounter > 0){
        this.isButtonDisabled = false;
        this.results = [];
        this.slicer = [];
        this.limit = 20;
        this.offset = 0;
        for(let i = this.offset; i < this.limit; i++){
          this.slicer = this.slicer.concat(this.allPokemons[i]);
        }
        this.results = this.results.concat(this.slicer);
      }
      this.filterGenerationCounter = 0;
    }

  }

  //function to select pokemons of the same type
  onSelectedType(Type: string){
    this.searchedPokemon = ""; //restarting a null value in the searchedPokemon variable
    //type filter
    this.pokemonExist = false;
    if(Type != undefined){
      this.isButtonDisabled = true;
      this.pokedexService.getPokemonByTypes(Type.toLowerCase()).
      subscribe(data => {
        this.results = [];
        this.resultsByType = this.results.concat(data.pokemon);
        for (let result of this.resultsByType){
          this.results = this.results.concat(result.pokemon);
        }
      });
      this.filterTypeCounter = 1;
    }else{
      if(this.filterTypeCounter > 0){
        this.isButtonDisabled = false;
        this.results = [];
        this.slicer = [];
        this.limit = 20;
        this.offset = 0;
        for(let i = this.offset; i < this.limit; i++){
          this.slicer = this.slicer.concat(this.allPokemons[i]);
        }
        this.results = this.results.concat(this.slicer);
      }
      this.filterTypeCounter = 0;
    }
  }

}
