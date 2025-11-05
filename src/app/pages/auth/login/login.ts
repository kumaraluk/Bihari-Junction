import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const userData = { email: this.email, password: this.password };
    // console.log("the entered details is",userData);

    this.authService.login(userData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.message = 'Login successful!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: (err) => {
        this.message = err.error.message || 'Invalid credentials!';
      }
    });
  }


}
