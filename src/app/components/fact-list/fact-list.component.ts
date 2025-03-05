import {
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactCardComponent } from '../fact-card/fact-card.component';
import { FactService } from '../../services/fact.service';
import { Fact, FactType, FactWithUserInfo } from '../../../types/Facts';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { FavoritesService } from '../../services/fact-favorites.service';

@Component({
  selector: 'app-fact-list',
  standalone: true,
  imports: [CommonModule, FactCardComponent, LoadingSpinnerComponent],
  templateUrl: './fact-list.component.html',
  styleUrls: ['./fact-list.component.css'],
})
export class FactListComponent {
  @Input() category: FactType = FactType.Trivia;

  facts: FactWithUserInfo[] = []; 
  fetchedNumbers: Set<number> = new Set();

  isLoading = true;
  constructor(
    private factService: FactService,
    private favoritesService: FavoritesService 
  ) {}

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;

    if (
      element.scrollLeft + element.clientWidth >= element.scrollWidth - 10 &&
      !this.isLoading
    ) {
      this.loadFacts();
    }
  }

  ngAfterViewInit() {
    this.loadFacts();
  }

  loadFacts() {
    this.isLoading = true;
    const newNumbers: number[] = [];

    if (this.category === 'date') {
      while (newNumbers.length < 10) {
        const randomDay = Math.floor(Math.random() * 366) + 1;
        if (!this.fetchedNumbers.has(randomDay)) {
          this.fetchedNumbers.add(randomDay);
          newNumbers.push(randomDay);
        }
      }
    } else if (this.category === 'year') {
      while (newNumbers.length < 10) {
        const randomYear = Math.floor(Math.random() * (2024 + 1));
        if (!this.fetchedNumbers.has(randomYear)) {
          this.fetchedNumbers.add(randomYear);
          newNumbers.push(randomYear);
        }
      }
    } else {
      while (newNumbers.length < 10) {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        if (!this.fetchedNumbers.has(randomNum)) {
          this.fetchedNumbers.add(randomNum);
          newNumbers.push(randomNum);
        }
      }
    }

    const apiUrl =
      `http://numbersapi.com/${newNumbers.join(',')}` + '/' + this.category;

    this.factService.getMultipleFacts(apiUrl, this.category).subscribe(
      (data: any) => {
        const fetchedFacts: FactWithUserInfo[] = Object.entries(data).map(
          ([key, text]) => {
            const fact: Fact = {
              number: Number(key),
              text: text as string,
              type: this.category,
              found: true,
            };

            const isInFavorite = this.favoritesService.isFavorite(fact);

            return {
              ...fact,
              isInFavorite, 
            };
          }
        );

        this.facts = [...this.facts, ...fetchedFacts];
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}

