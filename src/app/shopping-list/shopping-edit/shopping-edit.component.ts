import { Component, OnInit, ViewChild} from '@angular/core';
import { Ingreduent } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') ingredientForm: NgForm;
  ingredient:Ingreduent;
  ingredientEditId:number;
  editMode = false;
  subscription:Subscription;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
      this.subscription= this.shoppingListService.startedEditing
      .subscribe((id:number) => {
          this.ingredientEditId = id;
          this.editMode = true;
          this.ingredient = this.shoppingListService.getIngredient(this.ingredientEditId);
          this.ingredientForm.setValue({
              name: this.ingredient.name,
              amount: this.ingredient.amount
          })
      });
  }

  saveData(data:NgForm){
      const value = data.value;
      const newIngredient = new Ingreduent(value.name , value.amount);
      //Update function
      if (this.editMode) {
          this.shoppingListService.updateIngredient(this.ingredientEditId, newIngredient);
       //add function
      }else{
          this.shoppingListService.addIngredients(newIngredient);
      }
      this.editMode = false;
      data.reset();//reseting form

  }



  onClear(){
      this.ingredientForm.reset();
      this.editMode = false;
  }

  onDelete(){
      this.shoppingListService.deleteIngredient(this.ingredientEditId);
      this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
