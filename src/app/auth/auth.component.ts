import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error = null;

    private closeSubscription : Subscription;

    //Finds first occurance of appPlaceHolder directive in the template
    @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {

        if(!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoginMode) {
            authObservable = this.authService.login(email, password);
        }
        else {
            authObservable = this.authService.signUp(email, password);
        }

        authObservable.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },
        //throwError() in authService wraps errorMessage 
        errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });

        form.reset();
    }

    onAlertBoxClose() {
        this.error = null;
    }

    showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        
        hostViewContainerRef.clear();
        const componenetRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componenetRef.instance.message = message;
        this.closeSubscription = componenetRef.instance.close.subscribe( () => {
            this.closeSubscription.unsubscribe();
            hostViewContainerRef.clear();
        }    
        );
    }

    ngOnDestroy() {
        if(this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
    }
}