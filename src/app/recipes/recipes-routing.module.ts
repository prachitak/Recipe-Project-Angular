import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';


const routes: Routes = [
    {   path: '', //path is blank as it is loaded lazily and this path is appended to what we have define in app-routing.module.js
        component: RecipesComponent, 
        canActivate: [AuthGuard],
        children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent}, //to be written before :id path to avoid error
            {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
            {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}