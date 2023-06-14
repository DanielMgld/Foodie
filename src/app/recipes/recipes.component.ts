import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient, Recipe } from '../ingredients/ingredients.interface';
import { CartService } from '../cart.service';
import { IngredientCrudService } from '../ingredient-crud.service';
import { Product } from '../product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Observable<Recipe[]>;
  ingredients: Ingredient[] = [];

  constructor(private http: HttpClient, private cartService: CartService, private ingredientsService: IngredientCrudService, private snackBar: MatSnackBar) { 
    this.recipes = this.http.get<Recipe[]>('http://localhost:3000/recipes');
    this.http.get<Ingredient[]>('http://localhost:3000/ingredients').subscribe(
      data => {
        this.ingredients = data;
      }
    );
  }

  ngOnInit(): void {
  }

  getIngredientNameById(id: string): string {
    let ingredient = this.ingredients.find(ingredient => ingredient.id === id);
    return ingredient ? ingredient.name : 'Unknown ingredient :(';
  }

  getTotalCost(recipeIngredients: {id: string, q: string}[]): string {
    let totalCost = 0;
    for(let recipeIngredient of recipeIngredients) {
      let ingredient = this.ingredients.find(ingredient => ingredient.id === recipeIngredient.id);
      if(ingredient) {
        let ingredientOption = ingredient.options.find(option => option.q === recipeIngredient.q.toString());
        if(ingredientOption) {
          totalCost += Number(ingredientOption.price);
        }
      }
    }
    return totalCost + '';
}
addToCart(recipe: Recipe): void {
  this.ingredientsService.ingredients.subscribe(() => {
    const totalPrice = this.getTotalCost(recipe.ingredients);
    const product: Product = {
      name: recipe.name,
      q: "Quite a bit of",
      //recipe.ingredients.reduce((total, ingredient) => total + Number(ingredient.q), 0).toString()
      price: totalPrice.toString(),
      amount: 1
    };
    this.cartService.addToCart(product);
    this.snackBar.open('Added to Cart', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  });



}
}
