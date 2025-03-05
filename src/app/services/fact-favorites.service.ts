import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fact, FactWithUserInfo } from '../../types/Facts';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'favoriteFacts';
  private favoritesSubject = new BehaviorSubject<FactWithUserInfo[]>(this.loadFavoritesFromStorage());
  public favorites$ = this.favoritesSubject.asObservable();  

  constructor() {}


  private loadFavoritesFromStorage(): FactWithUserInfo[] {
    const favorites = localStorage.getItem(this.storageKey);
    const favoritesFacts = favorites ? JSON.parse(favorites) as Fact[]: []

    const favoritesFactMapped = favoritesFacts.map(f => {return {...f, isInFavorite: true}})
    return favoritesFactMapped
  }

  getFavorites(): FactWithUserInfo[] {
    return this.favoritesSubject.getValue();  
  }

  addFavorite(fact: Fact): void {
    const favorites = this.getFavorites();
    if (!favorites.find((f) => f.number === fact.number)) {
      favorites.push({...fact, isInFavorite: true});
      this.updateFavorites(favorites); 
    }
  }

  removeFavorite(fact: Fact): void {
    const favorites = this.getFavorites().filter((f) => f.number !== fact.number);
    this.updateFavorites(favorites);  
  }


  private updateFavorites(favorites: FactWithUserInfo[]): void {
    this.favoritesSubject.next(favorites); 
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  
  isFavorite(fact: Fact): boolean {
    const favorites = this.getFavorites();
    return favorites.some((f) => f.number === fact.number);
  }
}


