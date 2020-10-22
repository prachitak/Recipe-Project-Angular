import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    //need to emit the event because we are returning copy of array in getRecipes() method
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Spinach soup', 'Delicious and healthy soup of spinach','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spinach-soup-horizontal-1545404273.jpg',
    //         [new Ingredient('Spinach', 1),
    //         new Ingredient('Cream', 1)]),
    //     new Recipe('Boondi Raita', 'Yummy comnbination of boondi and dahi','https://www.dishesguru.com/uploads/recipe/boondi-raita-4263326926-810.jpg',
    //         [new Ingredient('Dahi', 2),
    //         new Ingredient('Boondi', 1)])
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        //returns copy of an array instead of reference to actual array in the memory
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}