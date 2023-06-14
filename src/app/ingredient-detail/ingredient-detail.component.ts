import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../cart.service';
import { Ingredient, Option } from '../ingredients/ingredients.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.scss']
})
export class IngredientDetailComponent implements OnInit {
  selectedOption: Option | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public ingredient: Ingredient, private cartService: CartService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selectedOption = this.ingredient.options[0];
  }

  onNoClick(): void { }

  selectOption(option: Option): void {
    this.selectedOption = option;
  }

  addToCart(): void {
    if(this.selectedOption) {
      this.cartService.addToCart({...this.ingredient, ...this.selectedOption});
      console.log('item added');
      this.snackBar.open('Added to Cart', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

    } 
  }
}
