import { Component, inject } from '@angular/core';
import { CartService } from '@app/cart/services/cart';
import { CartItemComponent } from "@app/cart/components/cart-item/cart-item";
import { CartSummaryComponent } from "@app/cart/components/cart-summary/cart-summary";
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CartSummaryComponent, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {


  onQuantityChange(data: { flowerId: string, quantity: number }) {
    this.cartService.updateQuantity(data.flowerId, data.quantity);
  }

  onRemoveItem(flowerId: string) {
    this.cartService.removeFromCart(flowerId);
  }

  cartService = inject(CartService)
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
    this.router.navigate(['/'])
  }
}
