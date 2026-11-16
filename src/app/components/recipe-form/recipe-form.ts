import { Component, inject, output, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

/**
 * Módulo 5 — Formulários Reativos (Reactive Forms)
 * Cadastro/edição de receitas usando FormBuilder, FormGroup, FormArray e Validators.
 * Inclui validação de campos, feedback de erros e manipulação dinâmica de ingredientes.
 */
@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css'
})
export class RecipeForm {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);

  protected readonly onRecipeAdded = output<void>();
  protected readonly isEditMode = signal(false);
  protected readonly editingId = signal<number | null>(null);

  protected readonly recipeForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    ingredients: this.fb.array(
      [this.fb.control('', Validators.required)],
      Validators.required
    ),
    instructions: ['', [Validators.required, Validators.minLength(10)]],
    image: ['']
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.editingId.set(id);
      this.isEditMode.set(true);
      const recipe = this.recipeService.getById(id);
      if (recipe) {
        this.patchForm(recipe);
      }
    }
  }

  private patchForm(recipe: Recipe) {
    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions,
      image: recipe.image ?? ''
    });

    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.clear();
    recipe.ingredients.forEach((ing) => {
      ingredientsArray.push(this.fb.control(ing, Validators.required));
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  protected get title() {
    return this.recipeForm.get('title');
  }

  protected get description() {
    return this.recipeForm.get('description');
  }

  protected get instructions() {
    return this.recipeForm.get('instructions');
  }

  protected get image() {
    return this.recipeForm.get('image');
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const value = this.recipeForm.value;
    const recipeData = {
      title: value.title,
      description: value.description,
      ingredients: value.ingredients.filter((i: string) => i.trim().length > 0),
      instructions: value.instructions,
      image: value.image || undefined
    };

    if (this.isEditMode() && this.editingId()) {
      this.recipeService.update(this.editingId()!, recipeData);
      this.router.navigate(['/recipes', this.editingId()]);
    } else {
      this.recipeService.add(recipeData);
      this.recipeForm.reset();
      this.ingredients.clear();
      this.ingredients.push(this.fb.control('', Validators.required));
      this.onRecipeAdded.emit();
    }
  }
}