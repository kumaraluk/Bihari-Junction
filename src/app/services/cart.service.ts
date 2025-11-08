import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = "cartItems";

  getCart() {
    return JSON.parse(localStorage.getItem(this.cartKey) || "[]");
  }
saveCart(cart: any) {
  localStorage.setItem(this.cartKey, JSON.stringify(cart));
}
  addToCart(food: any) {
    let cart = this.getCart();

    const existing = cart.find((item: any) => item._id === food._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  remove(itemId: string) {
    let cart = this.getCart().filter((item: any) => item._id !== itemId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }
}
