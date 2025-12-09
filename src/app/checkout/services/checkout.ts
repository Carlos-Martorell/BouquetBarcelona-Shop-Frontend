import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@cart';
import { NotificationService } from '@shared';
import { CreateOrder, OrderItem, OrdersService } from '@core';
import { CheckoutData } from '@checkout';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private router = inject(Router)
  private cartService = inject(CartService)
  private ordersService = inject(OrdersService)
  private notificationService = inject(NotificationService)
  
  isProcessing = signal(false);

  cartItems = this.cartService.cartItems()
  cartTotal = this.cartService.cartTotal()

  clearCart = this.cartService.clearCart()

  createOrder(checkoutData: CheckoutData) {

    const orderItems: OrderItem[] = this.cartService.cartItems().map(item => ({
      flowerId: item.flower._id,
      flowerName: item.flower.name,
      quantity: item.quantity,
      price: item.flower.price
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
      status: 'pending'
    };


    return this.ordersService.create(order).pipe(
      tap(createdOrder => {
        this.clearCart;
        this.notificationService.showSuccess('¡Pedido confirmado!');
        
        this.router.navigate(['/orders', createdOrder._id]);
      })
    );
  }


  redirectToLogin() {
    this.router.navigate(['/login'], {
      queryParams: { redirect: '/checkout' }
    });
  }
}
