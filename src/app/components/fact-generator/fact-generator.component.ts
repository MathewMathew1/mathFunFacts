import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Import FormsModule
import { FactService } from '../../services/fact.service';
import { Fact, FactType } from '../../../types/Facts';
import { FactListComponent } from '../fact-list/fact-list.component';
import { FactSearchComponent } from '../fact-search/fact-search.component';

@Component({
  selector: 'app-fact-generator',
  standalone: true, // 👈 Ensure it's standalone
  imports: [CommonModule, FormsModule, FactListComponent, FactSearchComponent ], // 👈 Add FormsModule to imports
  templateUrl: './fact-generator.component.html',
  styleUrls: ['./fact-generator.component.css']
})
export class FactGeneratorComponent {
  fact: Fact|null = null;
  selectedType: FactType = FactType.Trivia;
  inputNumber: number | null = null;

  factTypes = FactType;

  constructor(private factService: FactService) {}

  getRandomFact() {
    this.factService.getRandomFact(this.selectedType).subscribe((data: any) => {
      this.fact = data.text;
    });
  }

}


