import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingreduent } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeCollection: AngularFirestoreCollection<Recipe>;
  recipeDoc: AngularFirestoreDocument<Recipe>;

  recipeChanged = new Subject<Recipe[]>();

  constructor(
    private afs: AngularFirestore,
    private shoppingListService: ShoppingListService
  ) {
    this.recipeCollection = this.afs.collection('recipes');
  }

  getData() {
    // return this.recipes.slice();
    return this.recipeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Recipe;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getRecipe(id: string) {
    this.recipeDoc = this.afs.doc<Recipe>(`recipes/${id}`);
    return this.recipeDoc.valueChanges();
    // return this.recipes[id];
  }

  getRecipeData(id: string) {
    return this.afs.doc<Recipe>(`recipes/${id}`);
  }

  toShoppingList(ingredients: Ingreduent[]) {
    this.shoppingListService.addToList(ingredients);
  }

  addRecipe(newRecipe: Recipe) {
    // this.recipes.push(newRecipe);
    // this.recipeChanged.next(this.recipes.slice());
    this.recipeCollection.add(newRecipe);
  }

  updateRecipe(id: string, editedRecipe) {
    // this.recipes[id] = editedRecipe;
    // this.recipeChanged.next(this.recipes.slice());
    return this.getRecipeData(id).update(editedRecipe);
  }

  deleteRecipe(id: string) {
    // this.recipes.splice(id, 1);
    // this.recipeChanged.next(this.recipes.slice());

    return this.getRecipeData(id).delete();
  }
}
