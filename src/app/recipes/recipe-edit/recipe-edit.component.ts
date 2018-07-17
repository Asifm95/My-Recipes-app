import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingreduent } from '../../shared/ingredients.model';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:string;
  ingredients: Ingreduent[];
  recipe:Recipe


  editMode = false;
  recipeForm:FormGroup;
  constructor(private route:ActivatedRoute,
      private recipeService:RecipeService, private router:Router,
      private auth: AuthService, private toastr:ToastrService) {
          if(!this.auth.authenticated){
              this.router.navigate(['../'], { relativeTo: this.route });
              this.toastr.error('Please Login', 'Access Denied')
          }
       }

  ngOnInit() {
      this.route.params.subscribe(
          (param:Params) => {
              this.id = param['id'];
              console.log(this.id);
              
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
        this.recipeService.getRecipe(this.id).
              subscribe((data) => {
                  this.recipe = data
                  recipeName = this.recipe.title;
                  recipePath = this.recipe.imagepath;
                  recipeDesc = this.recipe.description;
                  
                //   console.log(recipeName);
                  if(this.recipe['ingredients']){
                      for(let ingredient of this.recipe.ingredients){
                          recipeIngredients.push(
                              new FormGroup({
                                  'name': new FormControl(ingredient.name),
                                  'amount': new FormControl(ingredient.amount)
                                  
                                })  
                            )
                        }
                    }
                    //creating reactive form
                    
                    this.recipeForm = new FormGroup({
                        'name': new FormControl(recipeName, Validators.required),
                        'imagepath': new FormControl(recipePath),
                        'description': new FormControl(recipeDesc, Validators.required),
                        'ingredients': recipeIngredients
                    })
                })
                
            }

      this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'imagepath': new FormControl(recipePath),
          'description': new FormControl(recipeDesc, Validators.required),
          'ingredients': recipeIngredients
      })

            
            
            
        }
        
        //   fn to add new form field
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
    
// delete ingredient control
    onDeleteIngredient(index:number){
            (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
        }
        
    onSubmit(){

            const recipeData = {
                nameauthor:this.auth.authState.displayName,
                authorId: this.auth.currentUserId,
                title: this.recipeForm.value['name'],
                description: this.recipeForm.value['description'],
                imagepath: this.recipeForm.value['imagepath'],
                ingredients: this.recipeForm.value['ingredients']

            }

            console.log(recipeData);
            
            
            if(this.editMode){
                this.recipeService.updateRecipe(this.id, recipeData);
                this.toastr.success('Recipe Updated', 'Success')
            }else{
                this.recipeService.addRecipe(recipeData);
                this.toastr.success('Recipe Created', 'Success')

            }
            this.onCancel();
        }
            

                        
    onCancel(){
            this.router.navigate(['../'], {relativeTo:this.route});
        }
    
    }
                            
