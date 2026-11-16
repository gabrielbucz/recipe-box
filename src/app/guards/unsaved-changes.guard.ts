import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { RecipeForm } from '../components/recipe-form/recipe-form';

/**
 * Módulo 7 — Routing Avançado: CanDeactivate
 * Impede que o usuário saia da rota de formulário (nova/editar receita)
 * quando há alterações não salvas (formulário dirty).
 */
export const unsavedChangesGuard: CanDeactivateFn<RecipeForm> = (component) => {
  if (component.recipeForm.dirty) {
    return confirm(
      'Você tem alterações não salvas. Tem certeza que deseja sair desta página?'
    );
  }
  return true;
};