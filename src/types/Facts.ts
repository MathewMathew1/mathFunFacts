export type Fact = {
  found: boolean;
  number: number;
  text: string;
  type: FactType
};

export type FactWithUserInfo = Fact & {isInFavorite: boolean}

export enum FactType {
    Trivia = 'trivia',
    Math = 'math',
    Date = 'date',
    Year = 'year'
  }
