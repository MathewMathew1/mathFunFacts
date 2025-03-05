import { Component, OnInit } from '@angular/core';
import { Fact, FactWithUserInfo } from '../../../types/Facts';
import { FavoritesService } from '../../services/fact-favorites.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FactCardComponent } from '../fact-card/fact-card.component';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './user-fact-favorites.component.html',
  imports: [CommonModule, FactCardComponent],
  styleUrls: ['./user-fact-favorites.component.css'],
})
export class UserFactFavoritesComponent implements OnInit {
  favorites$: Observable<FactWithUserInfo[]>; 

  constructor(private favoritesService: FavoritesService) {
    this.favorites$ = this.favoritesService.favorites$;

  }
  
  ngOnInit(): void {}

  removeFavorite(fact: Fact): void {
    this.favoritesService.removeFavorite(fact);
  }
}

