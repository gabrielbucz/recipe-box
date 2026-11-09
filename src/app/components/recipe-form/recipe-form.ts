import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css'
})
export class RecipeForm {
  protected readonly recipeService = inject(RecipeService);
  protected readonly onRecipeAdded = output<void>();

  // Two-way binding: o modelo inicial está vazio
  protected newRecipe: Omit<Recipe, 'id' | 'createdAt'> = {
    title: '',
    description: '',
    ingredients: [],
    instructions: '',
    image: ''
  };

  protected ingredientsInput = '';

  addRecipe() {
    if (!this.newRecipe.title || !this.newRecipe.description) {
      alert('Preencha pelo menos o título e a descrição.');
      return;
    }

    const ingredientsList = this.ingredientsInput
      .split(',')
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    this.recipeService.add({
      ...this.newRecipe,
      ingredients: ingredientsList
    });

    // Reset do formulário
    this.newRecipe = {
      title: '',
      description: '',
      ingredients: [],
      instructions: '',
      image: ''
    };
    this.ingredientsInput = '';

    this.onRecipeAdded.emit();
  }
}