import { Component } from '@angular/core';
import { RecipeList } from './components/recipe-list/recipe-list';

@Component({
  imports: [RecipeList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'recipe-box';
}
