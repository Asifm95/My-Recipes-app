import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingreduent } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form', { static: true }) ingredientForm: NgForm;
  ingredient: Ingreduent;
  ingredientEditId: string;
  editMode = false;
  subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    if (!this.auth.authenticated) {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.toastr.error('Please Login', 'Access Denied');
    }
  }

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe((id: string) => {
      this.ingredientEditId = id;
      this.editMode = this.ingredientEditId != null;

      this.shoppingListService
        .getIngredient(this.ingredientEditId)
        .subscribe((data) => {
          this.ingredient = data;
          console.log(this.ingredient);
          this.ingredientForm.setValue({
            name: this.ingredient.name,
            amount: this.ingredient.amount,
          });
        });
    });
  }

  saveData(data: NgForm) {
    const ingredientData = {
      name: data.value.name,
      amount: data.value.amount,
      authorId: this.auth.currentUserId,
    };
    console.log(ingredientData);

    //   const value = data.value;
    //   const newIngredient = new Ingreduent(value.name , value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.ingredientEditId,
        ingredientData
      );
      this.onClear();
    } else {
      this.shoppingListService.addIngredients(ingredientData);
      this.onClear();
    }
    //   this.editMode = false;
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ingredientEditId);
    this.onClear();
  }
}
