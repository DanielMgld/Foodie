import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../ingredients/ingredients.interface'; 
import { IngredientCrudService } from '../ingredient-crud.service';

interface DialogData {
  ingredient: Ingredient;
}

@Component({
  selector: 'app-edit-ingredient-dialog',
  templateUrl: './edit-ingredient-dialog.component.html',
  styleUrls: ['./edit-ingredient-dialog.component.scss']
})
export class EditIngredientDialogComponent implements OnInit {
  form: FormGroup;
  ingredient: Ingredient;

  constructor(
    private fb: FormBuilder, 
    private ingredientCrudService: IngredientCrudService, 
    public dialogRef: MatDialogRef<EditIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredient
  ) {
    this.ingredient = data;
    this.form = this.fb.group({
      name: ['', Validators.required],
      options: this.fb.array([
        this.fb.group({
          q: ['', Validators.required],
          price: ['', Validators.required]
        }),
        this.fb.group({
          q: ['', Validators.required],
          price: ['', Validators.required]
        })
      ])
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      option1: this.fb.group({
        q: [this.data.options[0]?.q || '', Validators.required],
        price: [this.data.options[0]?.price || '', Validators.required]
      }),
      option2: this.fb.group({
        q: [this.data.options[1]?.q || '', Validators.required],
        price: [this.data.options[1]?.price || '', Validators.required]
      })
    });
  }
  
  

  get optionsArray() {
    return this.form.get('options') as FormArray;
}  

onSubmit(): void {
  if (this.form.valid) {
    const updatedIngredient: Ingredient = {
      id: this.data.id,
      name: this.form.get('name')?.value,
      options: [
        {
          q: this.form.get(['option1', 'q'])?.value,
          price: this.form.get(['option1', 'price'])?.value
        },
        {
          q: this.form.get(['option2', 'q'])?.value,
          price: this.form.get(['option2', 'price'])?.value
        }
      ]
    }
    this.ingredientCrudService.updateIngredient(updatedIngredient)
      .subscribe(() => this.dialogRef.close(true));
  }
}
}

