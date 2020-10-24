import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from '../dropdown/dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective,
        CommonModule
    ],
    //needed only before angular 9 when some component is created programatically by us
    entryComponents: [
        AlertComponent
    ]
})
export class SharedModule {

}