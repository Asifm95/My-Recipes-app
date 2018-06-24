import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingreduent } from "../shared/ingredients.model";
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingreduent[];

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
      this.ingredients = this.shoppingListService.getIngredients();
      this.shoppingListService.ingtredientsUpdated.subscribe(
          (ingredients:Ingreduent[]) => this.ingredients = ingredients
      );
      // console.log(this.ingredients);
  }

  onEditItem(id:number){
      this.shoppingListService.startedEditing.next(id);
  }



}
