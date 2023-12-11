
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
    sprites_default?:         default_sprites;
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

export interface resultType {
    pokemon: resultPokemon;
    slot: number;
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

// POKEMON OBJECTS
export interface default_sprites {
    back_default?:       string;
    back_shiny?:         string;
    front_default?:      string;
    front_shiny?:        string;
}

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
    animated?:          Sprites;
    versions?:          Versions;
}

export interface GenerationV {
    "black-white": Sprites;
}

export interface GenerationIv {
    "diamond-pearl":        Sprites;
    "heartgold-soulsilver": Sprites;
    platinum:               Sprites;
}

export interface RedBlue {
    back_default:      string;
    back_gray:         string;
    back_transparent:  string;
    front_default:     string;
    front_gray:        string;
    front_transparent: string;
}
export interface GenerationI {
    "red-blue": RedBlue;
    yellow:     RedBlue;
}
export interface GenerationIi {
    crystal: Crystal;
    gold:    Gold;
    silver:  Gold;
}
export interface Crystal {
    back_default:            string;
    back_shiny:              string;
    back_shiny_transparent:  string;
    back_transparent:        string;
    front_default:           string;
    front_shiny:             string;
    front_shiny_transparent: string;
    front_transparent:       string;
}

export interface Gold {
    back_default:       string;
    back_shiny:         string;
    front_default:      string;
    front_shiny:        string;
    front_transparent?: string;
}

export interface GenerationIii {
    emerald:             OfficialArtwork;
    "firered-leafgreen": Gold;
    "ruby-sapphire":     Gold;
}

export interface Home {
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
}

export interface GenerationVii {
    icons:                  DreamWorld;
    "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
    front_default: string;
    front_female:  null;
}

export interface GenerationViii {
    icons: DreamWorld;
}

export interface Versions {
    "generation-i":    GenerationI;
    "generation-ii":   GenerationIi;
    "generation-iii":  GenerationIii;
    "generation-iv":   GenerationIv;
    "generation-v":    GenerationV;
    "generation-vi":   { [key: string]: Home };
    "generation-vii":  GenerationVii;
    "generation-viii": GenerationViii;
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

export interface pokemonPagination {
    count: number;
    next: string;
    previous: string | undefined | null;
    results: resultPokemon[];
}

//GENERATIONS
export interface generations {
    count:    number;
    next:     null;
    previous: null;
    results:  ResultGeneration[];
}

export interface ResultGeneration {
    name: string;
    url:  string;
}

// JSON object by every generation

export interface generationData {
    abilities:       MainRegion[];
    id:              number;
    main_region:     MainRegion;
    moves:           MainRegion[];
    name:            string;
    names:           Name[];
    pokemon_species: resultPokemon[];
    types:           MainRegion[];
    version_groups:  MainRegion[];
}

export interface MainRegion {
    name: string;
    url:  string;
}

export interface Name {
    language: MainRegion;
    name:     string;
}
