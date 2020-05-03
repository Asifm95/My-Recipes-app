import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingreduent } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<Ingreduent[]>;

  constructor(
    private shoppingListService: ShoppingListService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    //   this.ingredients = this.shoppingListService.getIngredients();
    //   this.shoppingListService.ingtredientsUpdated.subscribe(
    //       (ingredients:Ingreduent[]) => this.ingredients = ingredients
    //   );
    // console.log(this.ingredients);
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onEditItem(id: string) {
    this.shoppingListService.startedEditing.next(id);
  }
}
