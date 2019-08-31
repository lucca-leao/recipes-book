import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  public myForm: FormGroup;
  public ingredientForm: FormGroup;
  private ingredientCount: number = 1;

  constructor(private router: Router, private formBuilder: FormBuilder, private recipesService: RecipesService) { }

  ngOnInit() {

    this.ingredientForm = this.formBuilder.group({
      recipeName: ['', Validators.required],
      recipeDescription: ['', Validators.required],
      recipeImageUrl: ['', Validators.required],
      recipeVideoUrl: [''],
      ingredient1: ['', Validators.required]
    })
  }

  addControl(){
    this.ingredientCount++;
    this.ingredientForm.addControl('ingredient' + this.ingredientCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    this.ingredientForm.removeControl(control.key);
  }

  logForm(){
    console.log(this.ingredientForm.value);
    var ings = new Array();
    /* for(var propt in this.ingredientForm.value){
     if(propt.startsWith('ingredient')){
        ings.push(propt);
      }
    } */

    for (let [key, value] of Object.entries(this.ingredientForm.value)) {
      console.log(key, value);
      if(key.startsWith('ingredient')){
        ings.push(value);
      }
    }
    console.log(ings);
    var recipe = {id: this.recipesService.amountRecipes.toString(), title: this.ingredientForm.value.recipeName, imageUrl:this.ingredientForm.value.recipeImageUrl, videoUrl:this.ingredientForm.value.recipeVideoUrl, description: this.ingredientForm.value.recipeDescription, ingredients: ings};
    this.recipesService.addRecipe(recipe);
    this.router.navigate(['/recipes']);
  }
}
