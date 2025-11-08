import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms"; 
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: "./checkout.html",
  styleUrls: ["./checkout.scss"],
})
export class CheckoutComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  name: string = "";
  phone: string = "";
  address: string = "";
  lat: number | null = null;
  lon: number | null = null;

  constructor(private cartService: CartService, private router: Router,private http: HttpClient ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  }

 getCurrentLocation() {
  if (!navigator.geolocation) {
    alert("Your browser does not support location");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      console.log("📍 LAT:", this.lat, "LON:", this.lon);

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.lat}&lon=${this.lon}`,
        {
          headers: {
            "User-Agent": "Bihari-Junction-App",
            "Accept-Language": "en",              
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("📌 ADDRESS DATA:", data);

          if (data?.display_name) {
            this.address = data.display_name;
          } else {
            alert("Location received but address not found.");
          }
        })
        .catch((err) => {
          console.error("❌ error", err);
          alert("Failed to fetch address from GPS");
        });
    },
    (error) => {
      alert("⚠️ Please allow location permission from browser settings.");
      console.log(error);
    }
  );
}


  placeOrder() {
    if (!this.name || !this.phone || !this.address) {
      alert("Please fill all fields.");
      return;
    }

    const orderData = {
      user: JSON.parse(localStorage.getItem("user")!),
      cartItems: this.cart,
      totalAmount: this.total,
      deliveryAddress: this.address,
      locationCoordinates: {
        latitude: this.lat,
        longitude: this.lon,
      },
    };

    this.http.post("http://localhost:5000/api/orders/place", orderData).subscribe(
      (res) => {
        console.log("✅ ORDER SAVED TO DB", res);
        alert("✅ Order placed successfully!");
        this.cartService.clearCart();
        this.router.navigate(["/dashboard"]);
      },
      (err) => {
        console.error("❌ Order failed", err);
        alert("Order failed!");
      }
    );
  }
}
