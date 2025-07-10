export enum GENDER_TYPE {
  male,
  female,
  other
}

export interface Name {
  value: string;
  gender: GENDER_TYPE;
  origin: string;
}

export enum WORD_TYPE {
  noun,
  adjective,
  verb
}

export interface Word {
  value: string;
  definition: string;
  type: WORD_TYPE;
  tags: string;
}

export interface Phrase {
  id: string;
  value: string;
  origin: string;
  tags: string;
}

export interface Reference {
  id: string;
  value: string;
  origin: string;
  definition: string;
  tags: string;
}

export interface Song {
  id: string; // name + album
  name: string;
  album: string;
  band: string;
  rank: number;
  link: string;
  tags: string;
}

export interface Book {
  name: string;
  isComic: boolean;
  tags: string;
}

export interface Film {
  name: string;
  rank: number;
  service: string;
  tags: string;
}

export interface Show {
  name: string;
  rank: number;
  service: string;
  tags: string;
}

export interface Game {
  name: string;
  rank: number;
  price: string;
  lowestPrice: string;
  releaseDate: string;
  tags: string;
}

export enum FAVORITE_TYPE {
  art,
  music,
  game,
  programming,
  entertainment,
  other
}

export interface Favorite {
  name: string;
  link: string;
  type: FAVORITE_TYPE;
  tags: string;
  notes: string;
}

export const DefaultName: Name = {
  value: '',
  gender: GENDER_TYPE.male,
  origin: ''
};

export const DefaultWord: Word = {
  value: '',
  definition: '',
  type: WORD_TYPE.noun,
  tags: ''
};

export const DefaultPhrase: Phrase = {
  id: '',
  value: '',
  origin: '',
  tags: ''
};

export const DefaultReference: Reference = {
  id: '',
  value: '',
  origin: '',
  definition: '',
  tags: ''
};

export const DefaultSong: Song = {
  id: '',
  name: '',
  album: '',
  band: '',
  rank: 1,
  link: '',
  tags: '',
}

export const DefaultVideo: Video = {
  name: '',
  link: '',
  tags: '',
}

export const DefaultBook: Book = {
  name: '',
  isComic: false,
  tags: '',
}

export const DefaultFilm: Film = {
  name: '',
  rank: 1,
  service: '',
  tags: '',
}

export const DefaultShow: Show = {
  name: '',
  rank: 1,
  service: '',
  tags: '',
}

export const DefaultGame: Game = {
  name: '',
  rank: 1,
  price: "",
  lowestPrice: "",
  releaseDate: "",
  tags: ''
}

export const DefaultFavorite: Favorite = {
  name: '',
  link: '',
  type: FAVORITE_TYPE.other,
  tags: '',
  notes: ''
}