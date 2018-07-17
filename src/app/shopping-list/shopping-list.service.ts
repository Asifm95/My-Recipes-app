import { Injectable, EventEmitter } from '@angular/core';
import { Ingreduent } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

    // ingtredientsUpdated = new EventEmitter<Ingreduent[]>();
    startedEditing = new Subject<string>();
    ingredients: Ingreduent[]
    ingredientsCollection: AngularFirestoreCollection<Ingreduent>
    ingredientsDoc: AngularFirestoreDocument<Ingreduent>

    constructor(private afs:AngularFirestore) {
        this.ingredientsCollection = this.afs.collection('ingredients')
     }

    getIngredients(){
            return this.ingredientsCollection.snapshotChanges().
            pipe(map( (actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data() as Ingreduent
                    const id = a.payload.doc.id
                    return {id, ...data}
                })
            }))
    }

    getIngredient(id:string){
        this.ingredientsDoc = this.afs.doc<Ingreduent>(`ingredients/${id}`);
        return this.ingredientsDoc.valueChanges();
    }

    getIngredientData(id:string){
        return this.afs.doc<Ingreduent>(`ingredients/${id}`);
    }

    addIngredients(newIngredient:Ingreduent){
        // this.ingredients.push(newIngredient);
        // this.ingtredientsUpdated.emit(this.ingredients.slice());

        this.ingredientsCollection.add(newIngredient)
    }

    updateIngredient(id:string, ingredient:Ingreduent){
        // this.ingredients[id] = ingredient;
        // this.ingtredientsUpdated.emit(this.ingredients.slice());
        return this.getIngredientData(id).update(ingredient)
    }

    deleteIngredient(id:string){
        // this.ingredients.splice(id,1);
        // this.ingtredientsUpdated.emit(this.ingredients.slice());
        this.getIngredientData(id).delete()
    }

    addToList(ingredients){
        // this.ingredients.push(...ingredients);
        // this.ingtredientsUpdated.emit(this.ingredients.slice());

    }


}
