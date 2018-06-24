import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeForm:FormGroup;
  constructor(private route:ActivatedRoute,
      private recipeService:RecipeService, private router:Router) { }

  ngOnInit() {
      this.route.params.subscribe(
          (param:Params) => {
              this.id = param['id'];
              this.editMode = this.id != null;
              this.initForm();
          }
      )
  }

  // initalise the recipe Form
  private initForm(){
      let recipeName = '';
      let recipePath = '';
      let recipeDesc = '';
      let recipeIngredients = new FormArray([]);
      if (this.editMode) {
          const recipe = this.recipeService.getRecipe(this.id);
          recipeName = recipe.name;
          recipePath = recipe.imagePath;
          recipeDesc = recipe.description;
          if(recipe['ingredients']){
              for(let ingredient of recipe.ingredients){
                  recipeIngredients.push(
                      new FormGroup({
                          'name': new FormControl(ingredient.name),
                          'amount': new FormControl(ingredient.amount)
                      })
                  )

              }
          }
      }


      //creating reactive form
      this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'imagepath': new FormControl(recipePath),
          'description': new FormControl(recipeDesc, [Validators.required]),
          'ingredients': recipeIngredients
      });
  }

  //fn to add new form field
  onAddIngredient(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
          new FormGroup({
              'name': new FormControl(null, Validators.required),
              'amount': new FormControl(null, [
                  Validators.required,
                  Validators.pattern(/^[1-9]\d*$/)
              ])
          })
      )
  }

  //delete ingredient control
  onDeleteIngredient(index:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit(){
      // console.log(this.recipeForm);
      const newRecipes = new Recipe(
          this.recipeForm.value['name'],
          this.recipeForm.value['description'],
          this.recipeForm.value['imagepath'],
          this.recipeForm.value['ingredients']
      )

      if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipes);
    }else{
      this.recipeService.addRecipe(newRecipes);
      }
      this.onCancel();
  }

  onCancel(){
      this.router.navigate(['../'], {relativeTo:this.route});
  }

}
