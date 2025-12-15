import { Component, inject } from '@angular/core';
import { CartService, CartItemComponent } from '@cart';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { EmptyBasketIcon } from '@shared';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CurrencyPipe, EmptyBasketIcon],
  templateUrl: './cart.html',
})
export class Cart {
  onQuantityChange(data: { flowerId: string; quantity: number }) {
    this.cartService.updateQuantity(data.flowerId, data.quantity);
  }

  onRemoveItem(flowerId: string) {
    this.cartService.removeFromCart(flowerId);
  }

  cartService = inject(CartService);
  router = inject(Router);

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
