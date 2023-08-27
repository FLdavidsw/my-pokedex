
export interface pokemon {
    abilities:                Ability[];
    forms:                    Species[];
    height:                   number;
    id:                       number;
    location_area_encounters: string;
    moves:                    Move[];
    name:                     string;
    species:                  Species;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
    img?:                     string;
    colorType?:               string[];
}

// pokemons divided by type
export interface typesPokemon {
    damage_relations:      DamageRelations;
    game_indices:          GameIndex[];
    generation:            Generation;
    id:                    number;
    move_damage_class:     Generation;
    moves:                 Generation[];
    name:                  string;
    names:                 Name[];
    past_damage_relations: any[];
    pokemon:               resultType[];
}

export interface DamageRelations {
    double_damage_from: Generation[];
    double_damage_to:   Generation[];
    half_damage_from:   Generation[];
    half_damage_to:     Generation[];
    no_damage_from:     Generation[];
    no_damage_to:       Generation[];
}

export interface Generation {
    name: string;
    url:  string;
}

export interface GameIndex {
    game_index: number;
    generation: Generation;
}

export interface Name {
    language: Generation;
    name:     string;
}

export interface Pokemon {
    pokemon: Generation;
    slot:    number;
}

//
export interface region {
    name: string;
    url: string;
}

export interface type {
    name: string;
    url: string;
}

export interface Ability {
    ability:   Species;
    is_hidden: boolean;
    slot:      number;
}

export interface Species {
    name: string;
    url:  string;
}

export interface Move {
    move:                  Species;
    version_group_details: VersionGroupDetail[];
}

// pokemon objects

export interface Sprites {
    back_default:       string;
    back_female:        null;
    back_shiny:         string;
    back_shiny_female:  null;
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
    'official-artwork': OfficialArtwork;
    //animated?:          Sprites;
    //versions?:          Versions;
}

export interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
}

export interface VersionGroupDetail {
    level_learned_at:  number;
    move_learn_method: Species;
    version_group:     Species;
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Species;
}

export interface Type {
    slot: number;
    type: Species;
}

export interface resultPokemon {
    name: string;
    url: string;
}

export interface resultType {
    pokemon: resultPokemon;
    slot: number;
}

export interface pokemonPagination {
    count: number;
    next: string;
    previous: string | undefined | null;
    results: resultPokemon[];
}