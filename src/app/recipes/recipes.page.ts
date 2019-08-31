import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getAllRecipes();
  }

  ngOnDestroy(){
  }

  ionViewWillEnter(){
    this.recipes = this.recipesService.getAllRecipes();
  }

  ionViewDidEnter(){
  }

  ionViewWillLeave(){
  }

  ionViewDidLeave(){
  }

  onDownload(){
    this.recipesService.downloadRecipes();
    this.recipes = this.recipesService.getAllRecipes();
  }

  onUpload(){
    this.recipesService.uploadRecipes();
  }
}
