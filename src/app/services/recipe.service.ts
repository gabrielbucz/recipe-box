import { Injectable, signal } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes = signal<Recipe[]>([
    {
      id: 1,
      title: 'Bolo de Chocolate',
      description: 'Delicioso bolo de chocolate caseiro',
      ingredients: ['Farinha de trigo', 'Açúcar', 'Cacau em pó', 'Ovos', 'Leite', 'Óleo'],
      instructions: 'Misture todos os ingredientes líquidos, adicione os secos e asse a 180 °C por 35 minutos.',
      image: 'https://via.placeholder.com/300x200?text=Bolo+de+Chocolate',
      createdAt: new Date('2026-01-10')
    },
    {
      id: 2,
      title: 'Salada Caesar',
      description: 'Salada clássica com frango grelhado e molho caesar',
      ingredients: ['Alface americana', 'Frango grelhado', 'Croutons', 'Queijo parmesão', 'Molho caesar'],
      instructions: 'Corte a alface, adicione o frango fatiado, croutons e finalize com o molho e queijo ralado.',
      image: 'https://via.placeholder.com/300x200?text=Salada+Caesar',
      createdAt: new Date('2026-02-05')
    },
    {
      id: 3,
      title: 'Macarrão ao Molho de Tomate',
      description: 'Simples, rápido e saboroso',
      ingredients: ['Macarrão espaguete', 'Molho de tomate', 'Alho', 'Azeite', 'Manjericão fresco', 'Sal'],
      instructions: 'Cozinhe o macarrão, refogue o alho no azeite, junte o molho e misture com a massa.',
      image: 'https://via.placeholder.com/300x200?text=Macarrao+ao+Molho',
      createdAt: new Date('2026-03-15')
    }
  ]);

  getAll() {
    return this.recipes;
  }

  getById(id: number) {
    return this.recipes().find((r) => r.id === id);
  }

  add(recipe: Omit<Recipe, 'id' | 'createdAt'>) {
    const newId = Math.max(...this.recipes().map((r) => r.id), 0) + 1;
    this.recipes.update((list) => [
      ...list,
      { ...recipe, id: newId, createdAt: new Date() }
    ]);
  }

  remove(id: number) {
    this.recipes.update((list) => list.filter((r) => r.id !== id));
  }
}