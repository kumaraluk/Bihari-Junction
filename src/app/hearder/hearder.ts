import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FontAwesomeModule],
  templateUrl: './hearder.html',
  styleUrls: ['./hearder.scss']
})
export class HeaderComponent {

  cartCount = 0;
  searchText = "";
  filteredFoods: any[] = [];

  faSearch = faSearch;

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  isDropdownOpen = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isDropdownOpen = false;
    window.location.href = '/login';
  }
  

 search() {
  this.router.navigate(['/dashboard'], {
    queryParams: { search: this.searchText.trim() }
  });
}

}
