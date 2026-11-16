import { Injectable, inject, signal } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly api = inject(RecipeApiService);

  private readonly _recipes = signal<Recipe[]>([]);
  public readonly recipes = this._recipes;

  public readonly loading = signal(false);
  public readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.api.getAll().subscribe({
      next: (recipes) => {
        this._recipes.set(recipes);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Erro ao carregar receitas');
        this.loading.set(false);
      }
    });
  }

  getById(id: number) {
    return this._recipes().find((r) => r.id === id);
  }

  add(recipe: Omit<Recipe, 'id' | 'createdAt'>) {
    this.loading.set(true);
    this.error.set(null);
    this.api.add(recipe).subscribe({
      next: (newRecipe) => {
        this._recipes.update((list) => [...list, newRecipe]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Erro ao adicionar receita');
        this.loading.set(false);
      }
    });
  }

  remove(id: number) {
    this.loading.set(true);
    this.error.set(null);
    this.api.remove(id).subscribe({
      next: () => {
        this._recipes.update((list) => list.filter((r) => r.id !== id));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Erro ao remover receita');
        this.loading.set(false);
      }
    });
  }

  update(id: number, recipe: Partial<Omit<Recipe, 'id' | 'createdAt'>>) {
    const exists = this._recipes().some((r) => r.id === id);
    if (!exists) return;

    this.loading.set(true);
    this.error.set(null);
    this.api.update(id, recipe).subscribe({
      next: (updatedRecipe) => {
        this._recipes.update((list) =>
          list.map((r) => (r.id === id ? updatedRecipe : r))
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Erro ao atualizar receita');
        this.loading.set(false);
      }
    });
  }
}