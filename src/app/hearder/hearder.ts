import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FontAwesomeModule],
  templateUrl: './hearder.html',
  styleUrls: ['./hearder.scss'],
})
export class HeaderComponent {
  cartCount = 0;
  searchText = '';
  searchSubject = new Subject<string>();
  faSearch = faSearch;

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  isDropdownOpen = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartCount.subscribe((count) => {
      this.cartCount = count;
    });
// Debounce logic
    this.searchSubject
      .pipe(debounceTime(400))
      .subscribe((value: string) => {
        console.log('🔥 Debounced Search Triggered:', value);
        this.router.navigate(['/dashboard'], {
          queryParams: { search: value.trim() },
        });
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

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }
}
