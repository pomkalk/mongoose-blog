import { RouterModule, Routes, Router } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
