import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            //path is blank as it is loaded lazily and this path is appended to what we have define in app-routing.module.js
            {path: '', component: ShoppingListComponent}
        ])
    ]
})
export class ShoppingListModule {
}
