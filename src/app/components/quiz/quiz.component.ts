import { Component, OnInit } from '@angular/core';
import { FactWithUserInfo, FactType, Fact } from '../../../types/Facts';
import { FactService } from '../../services/fact.service';
import { FavoritesService } from '../../services/fact-favorites.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { FactCardComponent } from '../fact-card/fact-card.component';

@Component({
  selector: 'app-quiz',
  imports: [ButtonComponent, CommonModule, FactCardComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  currentFact: FactWithUserInfo | null = null;
  currentTrueFact: FactWithUserInfo | null = null;
  isCorrectAnswer: boolean | null = null;
  yourAnswer: boolean = false;
  wasFactModified: boolean = false
  isLoading = false;
  nextFactButtonEnabled = false;

  constructor(
    private factService: FactService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.fetchRandomFact();
  }

  // Fetch a random fact from a random category
  fetchRandomFact(): void {
    this.isLoading = true;
    const randomCategory: FactType = this.getRandomCategory();

    this.factService.getRandomFact(randomCategory).subscribe(
      (data: Fact) => {
        const modifiedFact = this.modifyFact(data);
    
        const isInFavorite = this.favoritesService.isFavorite(modifiedFact);
        this.currentFact = { ...modifiedFact, isInFavorite };
        this.currentTrueFact = { ...data, isInFavorite };
        this.isLoading = false;
        this.nextFactButtonEnabled = true;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  getRandomCategory(): FactType {
    const categories: FactType[] = Object.values(FactType);
    return categories[Math.floor(Math.random() * categories.length)];
  }

  getRandomNumberForCategory(category: FactType): number {
    if (category === 'year') {
      return Math.floor(Math.random() * 2024);
    } else if (category === 'date') {
      return Math.floor(Math.random() * 365) + 1;
    } else {
      return Math.floor(Math.random() * 100) + 1;
    }
  }

  modifyFact(fact: Fact): Fact {
    const newFact = { ...fact };

    if (Math.random() > 0.5) {
      return newFact;
    }

    if (newFact.type === 'year') {
      const modifiedYear = newFact.number + Math.floor(Math.random() * 10) - 5;
      newFact.number = modifiedYear;

      newFact.text = newFact.text.replace(/\d{4}/, modifiedYear.toString());
    } else if (newFact.type === 'date') {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const dateMatch = newFact.text.match(/([A-Za-z]+)\s(\d{1,2})/);
      if (dateMatch) {
        const month = dateMatch[1];
        let day = parseInt(dateMatch[2], 10);

        let monthIndex = months.indexOf(month);
        if (monthIndex === -1) {
          return newFact;
        }

        day += Math.floor(Math.random() * 5) - 2;

        if (day < 1) day = 1;
        if (day > 31) day = 31;

        monthIndex = (monthIndex + Math.floor(Math.random() * 3) - 1 + 12) % 12;

        newFact.text = newFact.text.replace(
          `${months[monthIndex]} ${dateMatch[2]}`,
          `${months[monthIndex]} ${day}`
        );
      }
    } else {
      const modifiedNumber =
        newFact.number + Math.floor(Math.random() * 10) - 5;
      newFact.number = modifiedNumber;

      newFact.text = newFact.text.replace(
        new RegExp(`\\b${fact.number}\\b`, 'g'),
        modifiedNumber.toString()
      );
    }

    return newFact;
  }

  checkAnswer(isTrue: boolean): void {
    if (this.currentFact) {
      const isFactModified = this.isFactModifiedFunc()
      this.wasFactModified = isFactModified
      this.yourAnswer = isTrue
      this.isCorrectAnswer =
        (isTrue && !isFactModified) ||
        (!isTrue && isFactModified);
      this.nextFactButtonEnabled = true;
    }
  }

  isFactModifiedFunc(): boolean {
    if (!this.currentFact || !this.currentTrueFact) return false;
    console.log(this.currentFact.number === this.currentTrueFact?.number)
    return this.currentFact.number !== this.currentTrueFact?.number;
  }

  // Load next fact
  nextFact(): void {
    this.isCorrectAnswer = null;
    this.nextFactButtonEnabled = false;
    this.fetchRandomFact();
  }
}
