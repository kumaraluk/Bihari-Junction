import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent implements OnInit {

  cart: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  increase(item: any) {
    item.quantity++;
    this.cartService.saveCart(this.cart);
    this.calculateTotal();
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.saveCart(this.cart);
      this.calculateTotal();
    }
  }

  remove(id: string) {
    this.cart = this.cart.filter(item => item._id !== id);
    this.cartService.saveCart(this.cart);
    this.calculateTotal();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
