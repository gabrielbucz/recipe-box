import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}/recipes`;

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(API_URL);
  }

  getById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${API_URL}/${id}`);
  }

  add(recipe: Omit<Recipe, 'id' | 'createdAt'>): Observable<Recipe> {
    return this.http.post<Recipe>(API_URL, recipe);
  }

  update(
    id: number,
    recipe: Partial<Omit<Recipe, 'id' | 'createdAt'>>
  ): Observable<Recipe> {
    return this.http.put<Recipe>(`${API_URL}/${id}`, recipe);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}