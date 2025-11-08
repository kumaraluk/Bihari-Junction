import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { faSearch, faExpand, faCompress, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FoodService } from '../../services/foodservice';
 import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterLink,FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {

  foods: any[] = [];
  loading = true;
  errorMessage = '';
  cartCount: number = 0;

  constructor(private foodService: FoodService, private cartService: CartService) {
     this.cartService.cartCount.subscribe(count => {
    this.cartCount = count;
  });
  }

  user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
 ser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  faSearch = faSearch;
  faExpand = faExpand;
  faCompress = faCompress;
  faMoon = faMoon;
  faSun = faSun;

  isDarkMode = false;
  isFullScreen = false;
  isDropdownOpen = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullScreen = true;
    } else {
      document.exitFullscreen();
      this.isFullScreen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  ngOnInit(): void {
    this.loadFoods(); // <-- Fetch food data on component load
  }

  loadFoods() {
    this.foodService.getFoods().subscribe({
      next: (res) => {
        this.foods = res;
        this.loading = false;
        console.log("Food API Response:", res);
      },
      error: (err) => {
        this.errorMessage = "Failed to load foods";
        this.loading = false;
      }
    });
  }
  addToCart(food: any) {
  this.cartService.addToCart(food);
  alert(`${food.name} added to cart ✅`);
}
  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isDropdownOpen = false;
    window.location.href = '/login';
  }

}
