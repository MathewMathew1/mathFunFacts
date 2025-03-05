import { Routes } from '@angular/router';
import { FactGeneratorComponent } from './components/fact-generator/fact-generator.component'; 
import { UserFactFavoritesComponent } from './components/user-fact-favorites/user-fact-favorites.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
  { path: '', component: FactGeneratorComponent }, // Default route for the main page
  { path: 'user-favorites', component: UserFactFavoritesComponent }, 
  { path: 'quiz', component: QuizComponent }, 
]
