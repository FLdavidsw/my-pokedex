import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {

    @Input() pokemonChosen!: pokemon;
    @Input() showDetail = false;

    ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
    }

}
