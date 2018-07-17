import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;
  id:string;

  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router,
              private auth:AuthService) {
                console.log(auth.currentUserId);
                
               }

  ngOnInit() {
    
    this.getRecipe()
    console.log(this)

}

getRecipe(){
 
    this.route.params.subscribe((param:Params) => {
        this.id = param['id']
        return this.recipeService.getRecipe(this.id).
        subscribe((data) => {
          this.recipe = data
        })
    })

}

  addToShopping(){
    //   this.recipeService.toShoppingList(this.recipe.ingredients);
  }

  onDelete(){
    const id = this.route.snapshot.paramMap.get('id')
    console.log(id);
    
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
      
  }

}
