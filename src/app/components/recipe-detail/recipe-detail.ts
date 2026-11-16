import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, CapitalizePipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected recipe: Recipe | undefined;

  constructor() {
    // Dados já foram resolvidos pelo recipeResolver antes da rota ser ativada
    this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe;
    });
  }

  protected goBack() {
    this.router.navigate(['/recipes']);
  }
}