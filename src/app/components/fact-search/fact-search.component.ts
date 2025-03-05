import { Component } from '@angular/core';
import { FactService } from '../../services/fact.service';
import { Fact, FactType, FactWithUserInfo } from '../../../types/Facts';
import { ButtonComponent } from '../../button/button.component';
import { FactCardComponent } from '../fact-card/fact-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../../services/fact-favorites.service';

@Component({
  selector: 'app-fact-search',
  templateUrl: './fact-search.component.html',
  imports: [ButtonComponent, FactCardComponent, CommonModule, FormsModule ], 
  styleUrls: ['./fact-search.component.css']
})
export class FactSearchComponent {
  fact: FactWithUserInfo | null = null;
  selectedType: FactType = FactType.Trivia;
  inputValue: string = ''; 
  factTypes = Object.values(FactType);

  constructor(private factService: FactService, private favoritesService: FavoritesService ) {}

  selectType(type: FactType) {
    this.selectedType = type;
    this.inputValue = '';
  }

  getFact() {
    let value = this.inputValue
 
    if (typeof value !== "number" && !value.trim()) return;

    if (this.selectedType === 'date') {
      const parts = this.inputValue.split('/');
      if (parts.length !== 2) return;
      value = `${parts[1]}/${parts[0]}`; 
    }

    this.factService.getFactByNumber(value, this.selectedType).subscribe((data: Fact) => {
      this.fact = {...data, isInFavorite: this.favoritesService.isFavorite(data)}
    });
  }
}
