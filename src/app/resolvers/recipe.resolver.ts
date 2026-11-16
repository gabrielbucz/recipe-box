import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

/**
 * Módulo 7 — Routing Avançado: Resolver
 * Carrega os dados da receita antes de ativar a rota de detalhe.
 * Se a receita já estiver em cache no RecipeService, retorna imediatamente;
 * caso contrário, busca via API.
 */
export const recipeResolver: ResolveFn<Recipe | null> = (route) => {
  const service = inject(RecipeService);
  const id = Number(route.paramMap.get('id'));

  return service.getRecipeById(id).pipe(
    map((recipe) => (recipe ? recipe : null)),
    catchError(() => of(null))
  );
};