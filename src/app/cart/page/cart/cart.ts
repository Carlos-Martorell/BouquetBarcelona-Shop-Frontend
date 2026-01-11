import { Component, inject } from '@angular/core';
import { CartService, CartItemComponent } from '@cart';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { EmptyBasketIcon, NotificationService } from '@shared';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CurrencyPipe, EmptyBasketIcon],
  templateUrl: './cart.html',
})
export class Cart {
  cartService = inject(CartService);
  router = inject(Router);
  notificationService = inject(NotificationService);

  onQuantityChange(data: { flowerId: string; quantity: number }) {
    // this.cartService.updateQuantity(data.flowerId, data.quantity);

    const result = this.cartService.updateQuantity(data.flowerId, data.quantity);

    if (!result.success) {
      this.notificationService.showError(result.message || 'Error al actualizar cantidad');
    }
  }

  onRemoveItem(flowerId: string) {
    this.cartService.removeFromCart(flowerId);
  }

  onClearCart() {
    if (confirm('¿Vaciar la cesta?')) {
      this.cartService.clearCart();
    }
  }

  onCheckout() {
    this.router.navigate(['/checkout']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
