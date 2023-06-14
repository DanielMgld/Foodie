import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginDialogComponent } from './login-dialog/login-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddIngredientDialogComponent } from './add-ingredient-dialog/add-ingredient-dialog.component';
import { EditIngredientDialogComponent } from './edit-ingredient-dialog/edit-ingredient-dialog.component';
import { ScrollupComponent } from './scrollup/scrollup.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    IngredientsComponent,
    RecipesComponent,
    CheckoutComponent,
    LoginComponent,
    IngredientDetailComponent,
    LoginDialogComponent,
    AddIngredientDialogComponent,
    ScrollupComponent,
    EditIngredientDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
  ],
  entryComponents: [
    LoginDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
