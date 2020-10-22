import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    //need to emit the event because we are returning copy of array in getIngredients() method
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [new Ingredient('Rice', 2), new Ingredient('Chicken', 1)];
    startedEditing = new Subject<number>();

    getIngredients() {
        //returns copy of an array instead of reference to actual array in the memory
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // ...ingredients (Spread operator) converts array of ingredients into list of ingredients
        //This is done because we cannot directly insert array in push() method as it will insert array as a single object.
        this.ingredients.push(...ingredients); 
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}