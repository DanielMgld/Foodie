import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientDetailComponent } from '../ingredient-detail/ingredient-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from './ingredients.interface';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})

export class IngredientsComponent {
  ingredients: Observable<Ingredient[]>;

  constructor(private http: HttpClient, public dialog: MatDialog) { 
    this.ingredients = this.http.get<Ingredient[]>('http://localhost:3000/ingredients');
  }
  openDialog(ingredient: Ingredient): void {
    const dialogRef = this.dialog.open(IngredientDetailComponent, {
      width: '500px',
      data: ingredient
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

}