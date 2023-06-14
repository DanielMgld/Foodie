import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientCrudService } from '../ingredient-crud.service';
import { Ingredient } from '../ingredients/ingredients.interface';
import { Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.scss']
})

export class AddIngredientDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddIngredientDialogComponent>,
    private fb: FormBuilder,
    private ingredientCrudService: IngredientCrudService,
  ) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      option1: this.fb.group({
        q: ['', Validators.required],
        price: ['', Validators.required],
      }),
      option2: this.fb.group({
        q: ['', Validators.required],
        price: ['', Validators.required],
      })
    });
    
  }

    ngOnInit(): void {}

    @Output() ingredientAdded = new EventEmitter();
onSubmit(): void {
  if (this.form.valid) {
    console.log(this.form.value);
    const newIngredient: Ingredient = {
      id: this.generateId(),
      name: this.form.get('name')?.value,
      options: [
        {
          q: this.form.get('option1.q')?.value,
          price: this.form.get('option1.price')?.value
        },
        {
          q: this.form.get('option2.q')?.value,
          price: this.form.get('option2.price')?.value
        }
      ]
      
    }
    this.ingredientCrudService.createIngredient(newIngredient).subscribe( 
      () => {
      console.log ('Created Successfully');
      this.dialogRef.close(newIngredient);
      }
    )
  }
}

generateId(): string {
  return new Date().getTime().toString();
}

  
}
