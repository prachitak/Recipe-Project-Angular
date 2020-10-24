import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        FormsModule,
        CommonModule,
        //path is blank as it is loaded lazily and this path is appended to what we have define in app-routing.module.js
        RouterModule.forChild([{path: '', component: AuthComponent}]),
        SharedModule
    ]
})
export class AuthModule {

}