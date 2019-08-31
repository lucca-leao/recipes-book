import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;
  trustedURL: SafeResourceUrl;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService, private router: Router, private alertCtrl: AlertController, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('recipeId')){
        this.router.navigate(['/recipes']);
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId);
      if(this.loadedRecipe.videoUrl){
        this.trustedURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.loadedRecipe.videoUrl);
      }
    });
  }

  onDeleteRecipe(){
    this.alertCtrl.create({header:'Are you sure?', message:'Do you really want to delete this recipe?', buttons: [{
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Delete',
      handler: () => {
        this.recipesService.deleteRecipe(this.loadedRecipe.id);
        this.router.navigate(['/recipes']);
      }
    }  
  ]
  }).then(alertEl => {
    alertEl.present();
  });
  }

  onEditRecipe(){
    this.router.navigate(['recipes/edit/'+this.loadedRecipe.id]);
  }
}
