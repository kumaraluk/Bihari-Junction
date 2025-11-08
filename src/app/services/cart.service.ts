import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = "cartItems";
  cartCount = new BehaviorSubject<number>(0);

  constructor() {
    const storedCart = this.getCart();
    this.cartCount.next(storedCart.length); // initialize count after refresh
  }

  getCart() {
    return JSON.parse(localStorage.getItem(this.cartKey) || "[]");
  }
saveCart(cart: any) {
  localStorage.setItem(this.cartKey, JSON.stringify(cart));
   this.cartCount.next(cart.length); 
}
  addToCart(food: any) {
    let cart = this.getCart();

    const existing = cart.find((item: any) => item._id === food._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }
    this.saveCart(cart); 

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  remove(itemId: string) {
    let cart = this.getCart().filter((item: any) => item._id !== itemId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
     this.saveCart(cart);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
     this.cartCount.next(0); //
  }
}
