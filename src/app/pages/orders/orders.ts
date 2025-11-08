import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss']
})
export class OrdersPage implements OnInit {

  orders: any[] = [];
  userId: string = "";    // ✅ initialize

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.error("❌ No user found in localStorage");
      return;
    }

    const user = JSON.parse(storedUser);

    // ✅ Supports both "id" AND "_id"
    this.userId = user.id || user._id;

    console.log("Fetching Orders for:", this.userId);

    this.http.get(`http://localhost:5000/api/orders/user/${this.userId}`)
      .subscribe(
        (res: any) => {
          console.log("✅ Orders fetched from backend:", res);
          this.orders = res;
        },
        (err) => {
          console.error("❌ Error fetching orders:", err);
        }
      );
  }
}
