import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Ingredient } from './ingredients/ingredients.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientCrudService {
  private baseUrl = 'http://localhost:3000/ingredients';
  private _ingredients = new BehaviorSubject<Ingredient[]>([]);

  constructor(private http: HttpClient) {
    this.refreshIngredients();
  }

  get ingredients(): Observable<Ingredient[]> {
    return this._ingredients.asObservable();
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl);
  }

  refreshIngredients(): void {
    this.getIngredients().subscribe(ingredients => {
      this._ingredients.next(ingredients);
    });
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.baseUrl, ingredient).pipe(
      tap(() => this.refreshIngredients())
    );
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.baseUrl}/${ingredient.id}`, ingredient).pipe(
      tap(() => {
        this.refreshIngredients();
      })
    );
  }
  
  deleteIngredient(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.refreshIngredients())
    );
  }
}
