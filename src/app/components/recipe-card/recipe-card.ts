import { Component, Input, signal, inject, computed, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink, DatePipe, CapitalizePipe],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css'
})
export class RecipeCard {
  @Input({ required: true }) recipe!: Recipe;

  // Output moderno do Angular: emite evento para o componente pai
  protected readonly remove = output<number>();

  protected readonly recipeService = inject(RecipeService);

  // Ciclo de vida: sinal para controlar se o card está expandido
  protected readonly isExpanded = signal(false);

  // Exemplo de computed signal
  protected readonly ingredientCount = computed(() => this.recipe.ingredients.length);

  toggleExpand() {
    this.isExpanded.update((val) => !val);
  }

  delete() {
    if (confirm(`Tem certeza que deseja remover "${this.recipe.title}"?`)) {
      this.remove.emit(this.recipe.id);
    }
  }
}