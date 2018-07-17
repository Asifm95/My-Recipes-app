import { Ingreduent } from "../shared/ingredients.model";

export class Recipe {
  // public name: string;
  // public description: string;
  // public imagePath: string;
  // public ingredients: Ingreduent[];

  id?: string
  nameauthor: string
  authorId: string
  title: string
  description: string
  imagepath: string
  ingredients: Ingreduent[] 


  // constructor(name: string, desc: string, imagePath: string, ingredients: Ingreduent[]) {
  //   this.name = name;
  //   this.description = desc;
  //   this.imagePath = imagePath;
  //   this.ingredients = ingredients;
  // }
}
