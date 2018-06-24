import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;
  id:number;

  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
      this.route.params
      .subscribe( (param:Params) =>{
       this.id = +param['id'] ;
       this.recipe = this.recipeService.getRecipe(this.id);
   });
  }

  addToShopping(){
      this.recipeService.toShoppingList(this.recipe.ingredients);
  }

  onDelete(){
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
  }

}
