import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public amountRecipes: number = 1;
  private recipes: Recipe[] = []; /* = [
     {
      id: '1',
      title: 'Bolo de Chocolate',
      imageUrl: 'https://4.bp.blogspot.com/-nCuyLSDIUbc/USv6Xe9dXjI/AAAAAAAAOWc/gm_6TqduVVI/IMG_5273.JPG',
      ingredients: [
      '2 xícaras farinha de trigo',
      '2 xícaras açúcar',
      '200g manteiga',
      '2 colheres de sopa fermento em pó',
      '1/3 xícara chocolate em pó',
      '1 xícara de água',
      '2 caixas creme de leite',
      '2 ovos',
      '1 pitada de sal',
      '1 colher de chá baunilha',
      '1 lata leite condensado',
      '1 barra de chocolate'],
      description: 'Misture o trigo, fermento, sal e açúcar em um bowl. Em uma panela derreta a manteiga com a água e o chocolate, e em seguida misture nos ingredientes secos. Adicione os ovos um por um, a baunilha, e por último o creme de leite. Asse em forno pré-aquecido a 180º em uma forma untada. Para a cobertura, derreta o chocolate numa panela e adicione leite condensado e uma colher de manteiga. Cozinhe até atingir ponto de brigadeiro, e adicione o creme de leite.',
      videoUrl: 'https://www.youtube.com/watch?v=3WoIdWFVYY0'
    } 
  ]; */
  constructor(private storage: Storage, private http: HttpClient) {
    this.storage.forEach((value, key, index) => {
      this.recipes.push(value);
    });
    this.amountRecipes = this.recipes.length;
    for(var i = 0; i < this.amountRecipes; i++){
      this.recipes[i].id = i.toString();
    }
   }

  getAllRecipes(){
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    return {...this.recipes.find(recipe => {
      return recipe.id === recipeId;
    })};
  }

  deleteRecipe(recipeId: string){
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    });
    this.saveData();
  }

  addRecipe(recipe: Recipe){
    this.amountRecipes++;
    this.recipes.push(recipe);
    this.saveData();
  }

  replaceRecipe(recipe: Recipe){
    for(let i = 0; i < this.recipes.length; i++){
      if(this.recipes[i].id === recipe.id){
        var indexToReplace = i;
      }
    }
    this.recipes[indexToReplace] = recipe;
    this.saveData();
  }

  saveData(){
    this.storage.clear();
    for(var i = 0; i < this.recipes.length; i++){
      var key = i.toString();
      this.recipes[i].id = i.toString();
      console.log(this.recipes[i].id);
      this.storage.set(key, this.recipes[i]);
    }
  }

  uploadRecipes(){
    this.http.delete('https://recipesbook-23827.firebaseio.com/recipes.json').subscribe(() => {
        console.log('done deleting');
        this.http.put<Recipe[]>('https://recipesbook-23827.firebaseio.com/recipes.json', this.recipes).subscribe(() => {
          console.log('done posting');
        });
      });
  }

  downloadRecipes(){
    this.http.get('https://recipesbook-23827.firebaseio.com/recipes.json').subscribe((data: Recipe[]) => {
      this.recipes = data;
      this.saveData();
    });
  }
}
