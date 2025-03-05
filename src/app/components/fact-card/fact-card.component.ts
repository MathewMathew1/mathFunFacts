import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FactWithUserInfo } from '../../../types/Facts';
import { FavoritesService } from '../../services/fact-favorites.service';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-fact-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './fact-card.component.html',
  styleUrls: ['./fact-card.component.css']
})
export class FactCardComponent {
  @Input() fact!: FactWithUserInfo; 
  @Input() showButton?: boolean = true; 

  constructor(private favoritesService: FavoritesService) {}

  addToFavorites(): void {
    this.favoritesService.addFavorite(this.fact);
    this.fact.isInFavorite = true;  
  }

  removeFromFavorites(): void {
    this.favoritesService.removeFavorite(this.fact);
    this.fact.isInFavorite = false; 
  }
}