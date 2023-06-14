import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth-service.service';
import { Ingredient } from '../ingredients/ingredients.interface';
import { Recipe } from '../ingredients/ingredients.interface';
import { IngredientCrudService } from '../ingredient-crud.service';
import { RecipeCrudService } from '../recipe-crud.service';
import { MatDialog } from '@angular/material/dialog';
import { AddIngredientDialogComponent } from '../add-ingredient-dialog/add-ingredient-dialog.component';
import { EditIngredientDialogComponent } from '../edit-ingredient-dialog/edit-ingredient-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private loginSub: Subscription = new Subscription();
  ingredients!: Observable<Ingredient[]>;
  recipes!: Observable<Recipe[]>;

  constructor(
    private authService: AuthService,
    private ingredientCrudService: IngredientCrudService,
    private recipeCrudService: RecipeCrudService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loginSub = this.authService.isLoggedIn.subscribe(
      loggedIn => this.isLoggedIn = loggedIn
    );

    this.ingredients = this.ingredientCrudService.ingredients;

    this.recipeCrudService.getRecipes().subscribe(recipes => {
      this.recipes = this.recipeCrudService.getRecipes();
    });
  }

  addIngredient(): void {
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {width:'350px'});
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ingredientCrudService.refreshIngredients();
      }
    });
  }

  editIngredient(ingredient: Ingredient) {
    const dialogRef = this.dialog.open(EditIngredientDialogComponent, {
      width: '350px',
      data: ingredient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ingredientCrudService.refreshIngredients();
      }
    });
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.ingredientCrudService.deleteIngredient(ingredient.id).subscribe(() => {
      this.ingredientCrudService.refreshIngredients();
    });
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
