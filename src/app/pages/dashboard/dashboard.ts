import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { faSearch, faExpand, faCompress, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FoodService } from '../../services/foodservice';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  foods: any[] = [];
  filteredFoods: any[] = [];
  loading = true;
  errorMessage = '';
  cartCount: number = 0;
   faSearch = faSearch;
  faExpand = faExpand;
  faCompress = faCompress;
  faMoon = faMoon;
  faSun = faSun;
  isDropdownOpen = false;



  constructor(private foodService: FoodService, private cartService: CartService,private route: ActivatedRoute) {
    this.cartService.cartCount.subscribe((count) => {
      this.cartCount = count;
    });
  }

  user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  ser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  searchFood(event: any) {
    const query = event.target.value.toLowerCase();

    this.filteredFoods = this.foods.filter(
      (food) =>
        food.name.toLowerCase().includes(query) || food.category?.toLowerCase().includes(query)
    );
  }

 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit(): void {
    this.loadFoods();
      this.route.queryParams.subscribe(params => {
  const search = params['search'] ? params['search'].toLowerCase() : '';

  if (search) {
    this.filteredFoods = this.foods.filter(food =>
      food.name.toLowerCase().includes(search)
    );
  } else {
    this.filteredFoods = [...this.foods];
  }
});
    
  }

  loadFoods() {
    this.foodService.getFoods().subscribe({
      next: (res) => {
        this.foods = res;
        this.filteredFoods = res;
        this.loading = false;
        console.log('Food API Response:', res);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load foods';
        this.loading = false;
      },
    });
  }

  showToast(message: string) {
    const toast = document.getElementById('toast')!;
    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  addToCart(food: any) {
    this.cartService.addToCart(food);
    this.showToast(`${food.name} added to cart ✅`);
  }
}
