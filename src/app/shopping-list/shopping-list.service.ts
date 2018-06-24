import { Injectable, EventEmitter } from '@angular/core';
import { Ingreduent } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

    ingtredientsUpdated = new EventEmitter<Ingreduent[]>();
    startedEditing = new Subject<number>();
    ingredients: Ingreduent[] = [
        new Ingreduent('apple', 5),
        new Ingreduent('lettuce', 7)
    ]
    constructor() { }

    getIngredients(){
            return this.ingredients.slice();
    }

    getIngredient(id:number){
        return this.ingredients[id];
    }

    addIngredients(newIngredient){
        this.ingredients.push(newIngredient);
        this.ingtredientsUpdated.emit(this.ingredients.slice());
    }

    updateIngredient(id:number, ingredient:Ingreduent){
        this.ingredients[id] = ingredient;
        this.ingtredientsUpdated.emit(this.ingredients.slice());
    }

    deleteIngredient(id:number){
        this.ingredients.splice(id,1);
        this.ingtredientsUpdated.emit(this.ingredients.slice());
    }

    addToList(ingredients){
        this.ingredients.push(...ingredients);
        this.ingtredientsUpdated.emit(this.ingredients.slice());

    }


}
