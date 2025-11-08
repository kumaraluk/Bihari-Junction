import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';

export const routes: Routes = [

     { path: '', component: WelcomeComponent },
     { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: "cart", component: CartComponent },
            { path: "checkout", component: CheckoutComponent }

];
