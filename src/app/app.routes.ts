import { Routes } from '@angular/router';

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
    title: 'Detalhe da Receita'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
