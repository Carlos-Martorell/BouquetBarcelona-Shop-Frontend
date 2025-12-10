
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth';
import { OrdersService } from '@core';

@Component({
  selector: 'app-orders-list',
  imports: [],
  templateUrl: './orders-list.css',
  styleUrl: './orders-list.css',
})
export class OrdersList implements OnInit {

  private router = inject(Router)
  private authService = inject(AuthService)
  private ordersService = inject(OrdersService)

  isLoading = signal(false)

  userOrders = computed (() => {
    const user = this.authService.currentUser()
    if(!user) return 
    return this.ordersService.orders()
  })

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    this.isLoading.set(true)
    this.ordersService.getAll().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false)
    })
  }

  goHome(){
    this.router.navigate(['/'])
  }
}
