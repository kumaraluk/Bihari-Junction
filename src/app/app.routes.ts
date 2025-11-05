import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [

     { path: '', component: WelcomeComponent },
     { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
            { path: 'dashboard', component: DashboardComponent },
];
