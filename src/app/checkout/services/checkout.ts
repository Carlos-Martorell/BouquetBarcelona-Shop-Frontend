import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@cart';
import { NotificationService } from '@shared';
import { CreateOrder, OrderItem, OrdersService } from '@core';
import { CheckoutData } from '@checkout';
import { tap } from 'rxjs';
import { environment } from '@env/environments';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private router = inject(Router);
  private cartService = inject(CartService);
  private ordersService = inject(OrdersService);
  private notificationService = inject(NotificationService);

  cartItems = this.cartService.cartItems();
  cartTotal = this.cartService.cartTotal();

  createOrder(checkoutData: CheckoutData) {
    const orderItems: OrderItem[] = this.cartService.cartItems().map((item) => ({
      flowerId: item.flower._id,
      flowerName: item.flower.name,
      quantity: item.quantity,
      price: item.flower.price,
    }));

    const order: CreateOrder = {
      customerName: checkoutData.customerName,
      customerEmail: checkoutData.customerEmail,
      customerPhone: checkoutData.customerPhone,
      deliveryAddress: checkoutData.deliveryAddress,
      deliveryDetails: checkoutData.deliveryDetails,
      deliveryDate: checkoutData.deliveryDate,
      deliveryTime: checkoutData.deliveryTime,
      items: orderItems,
      total: this.cartService.cartTotal(),
      notes: checkoutData.notes,
      status: 'pending',
    };

    return this.ordersService.create(order).pipe(
      tap(() => {
        this.notificationService.showSuccess('¡Pedido confirmado!');
      }),
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login'], {
      queryParams: { redirect: '/checkout' },
    });
  }

  async processPayment(orderId: string) {
    try {
      const response = await fetch(`${environment.apiUrl}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Error creating payment session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  }
}
