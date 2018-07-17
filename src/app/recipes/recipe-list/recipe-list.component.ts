import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {


  // recipes:Recipe[];
  recipes: Observable<Recipe[]>

  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
      // this.recipeService.recipeChanged
      // .subscribe( (recipes: Recipe[]) => {
      //     this.recipes = recipes;
      // })
      // this.recipes = this.recipeService.getData();

      this.recipes = this.recipeService.getData()
      // console.log(this);
      
  }


}
