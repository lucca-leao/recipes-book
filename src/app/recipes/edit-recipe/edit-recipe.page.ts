import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  loadedRecipe: Recipe;
  ingredientForm: FormGroup;
  ingredientCount: number;
  indexToReplace: number;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private recipesService: RecipesService, alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('recipeId')){
        this.router.navigate(['/recipes']);
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId);
      this.ingredientCount = this.loadedRecipe.ingredients.length;
    });

    this.ingredientForm = this.formBuilder.group({
      recipeName: [this.loadedRecipe.title, Validators.required],
      recipeDescription: [this.loadedRecipe.description, Validators.required],
      recipeImageUrl: [this.loadedRecipe.imageUrl, Validators.required],
      recipeVideoUrl: [this.loadedRecipe.videoUrl],
      ingredient1: ['', Validators.required]
    });
    /* for(var i = 1; i <= this.ingredientCount; i++){
      this.ingredientForm.addControl('ingredient' + i, new FormControl(this.loadedRecipe.ingredients[i-1], Validators.required));
      console.log(this.loadedRecipe.ingredients[i-1]);
    } */
  }

  addControl(){
    this.ingredientCount++;
    this.ingredientForm.addControl('ingredient' + this.ingredientCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    this.ingredientCount--;
    this.ingredientForm.removeControl(control.key);
  }

  onConfirmEdit(){
    var ings = new Array();
    /* for(var propt in this.ingredientForm.value){
     if(propt.startsWith('ingredient')){
        ings.push(this.ingredientForm.value[propt]);
      }
    } */
    for (let [key, value] of Object.entries(this.ingredientForm.value)) {
      if(key.startsWith('ingredient')){
        ings.push(value);
      }
    }
    this.loadedRecipe.title = this.ingredientForm.value.recipeName;
    this.loadedRecipe.description = this.ingredientForm.value.recipeDescription;
    this.loadedRecipe.imageUrl = this.ingredientForm.value.recipeImageUrl;
    this.loadedRecipe.videoUrl = this.ingredientForm.value.recipeVideoUrl;
    this.loadedRecipe.ingredients = ings;
    this.recipesService.replaceRecipe(this.loadedRecipe);
    this.router.navigate(['/recipes']);
  }
}
