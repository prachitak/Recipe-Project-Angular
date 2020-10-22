import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-c6206.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {   
      return this.http.get<Recipe[]>('https://ng-course-recipe-book-c6206.firebaseio.com/recipes.json')
        .pipe(
        map(recipes => {   
            //map() method of array that executes a function for each array element               
            return recipes.map( recipe => { 
                //replace Ingradients field with Empty array when recipe has no ingedients
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })               
        }),
        tap(recipes => {
            return this.recipeService.setRecipes(recipes);
        })
        );
    }

}