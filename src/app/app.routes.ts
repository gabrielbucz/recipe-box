import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { recipeResolver } from './resolvers/recipe.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home').then((m) => m.Home),
    title: 'Home'
  },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./components/recipe-list/recipe-list').then((m) => m.RecipeList),
    title: 'Receitas'
  },
  {
    path: 'recipes/:id',
    loadComponent: () =>
      import('./components/recipe-detail/recipe-detail').then((m) => m.RecipeDetail),
    title: 'Detalhe da Receita',
    resolve: { recipe: recipeResolver }
  },
  {
    path: 'recipes/new',
    loadComponent: () =>
      import('./components/recipe-form/recipe-form').then((m) => m.RecipeForm),
    title: 'Nova Receita',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: 'recipes/:id/edit',
    loadComponent: () =>
      import('./components/recipe-form/recipe-form').then((m) => m.RecipeForm),
    title: 'Editar Receita',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
