import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList implements OnInit {
  protected readonly recipeService = inject(RecipeService);
  protected readonly router = inject(Router);
  protected readonly recipes = this.recipeService.recipes;

  // Filtro com signal (property binding + event binding)
  protected readonly searchTerm = signal('');

  // Computed signal: receitas filtradas
  protected readonly filteredRecipes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.recipes().filter((r) =>
      r.title.toLowerCase().includes(term)
    );
  });

  ngOnInit() {
    console.log('RecipeList inicializado - ciclo de vida ngOnInit');
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onRecipeRemoved(id: number) {
    this.recipeService.remove(id);
    console.log(`Receita ${id} removida pela lista pai.`);
  }

  onRecipeEdited(id: number) {
    this.router.navigate(['/recipes', id, 'edit']);
  }
}