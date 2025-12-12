import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth';
import { Order, OrdersService } from '@core';
import { Spinner } from '@shared';
import { OrderCard } from '@orders';

@Component({
  selector: 'app-orders-list',
  imports: [Spinner, OrderCard],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css',
})
export class OrdersList implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private ordersService = inject(OrdersService);

  isLoading = signal(false);

  userOrders = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return [];

    const allOrders = this.ordersService.orders();

    const myOrders = allOrders.filter((order) => order.customerEmail === user.email);

    return myOrders.sort(
      (a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime(),
    );
  });

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading.set(true);
    this.ordersService.getAll().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false),
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
