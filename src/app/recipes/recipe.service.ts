import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingreduent } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();

     recipes:Recipe[] = [
        new Recipe('Backyard BBQ' ,
         // tslint:disable-next-line:max-line-length
         'Barbecue or barbeque (informally BBQ or barbie) is a cooking method, a style of food, and a name for a meal or gathering at which this style of food is cooked and served. Barbecuing is done slowly over low, indirect heat and the food is flavored by the smoking process, while grilling, a related process, is generally done quickly over moderate-to-high direct heat that produces little smoke.' , 'https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
          [new Ingreduent('chicken' , 3), new Ingreduent('capsicum', 4)]),
        new Recipe('Gastronomy Cheese' ,
        // tslint:disable-next-line:max-line-length
        'Barbecue or barbeque (informally BBQ or barbie) is a cooking method, a style of food, and a name for a meal or gathering at which this style of food is cooked and served. Barbecuing is done slowly over low, indirect heat and the food is flavored by the smoking process, while grilling, a related process, is generally done quickly over moderate-to-high direct heat that produces little smoke.' , 'https://www.maxpixel.net/static/photo/1x/Gastronomy-Cheese-Food-Spanish-Recipes-Foodie-1139580.jpg',
        [new Ingreduent('cheese' , 3), new Ingreduent('leaves', 4),
        new Ingreduent('bread', 1)]),
        new Recipe('Grilled Steak' ,
         // tslint:disable-next-line:max-line-length
         'Barbecue or barbeque (informally BBQ or barbie) is a cooking method, a style of food, and a name for a meal or gathering at which this style of food is cooked and served. Barbecuing is done slowly over low, indirect heat and the food is flavored by the smoking process, while grilling, a related process, is generally done quickly over moderate-to-high direct heat that produces little smoke.' , 'https://www.maxpixel.net/static/photo/1x/Gourmet-Beef-Steak-Benefit-From-Steak-Grilled-2427434.jpg',
          [new Ingreduent('chicken' , 3), new Ingreduent('capsicum', 4)]),
    ];


    constructor(private shoppingListService:ShoppingListService) { }

    getData(){
        return this.recipes.slice();
    }

    getRecipe(id:number){
        return this.recipes[id];
    }

    toShoppingList(ingredients:Ingreduent[]){
        this.shoppingListService.addToList(ingredients);
    }

    addRecipe(newRecipe:Recipe){
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());

    }

    updateRecipe(id:number, editedRecipe:Recipe){
        this.recipes[id] = editedRecipe;
        this.recipeChanged.next(this.recipes.slice());

    }

    deleteRecipe(id:number){
        this.recipes.splice(id, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

}
