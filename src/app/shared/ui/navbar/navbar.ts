import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CartService } from '@cart';
import { AuthService } from '@auth';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CurrencyPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(AuthService);
  cartService = inject(CartService);
  router = inject(Router);
  isCartOpen = signal(false)

  totalItemsCount = computed(() => this.cartService.totalItemsCount());
  cartTotal = computed(() => this.cartService.cartTotal());

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

    toggleCart() {
    this.isCartOpen.update(value => !value);
  }

    goToCart() {
    this.isCartOpen.set(false);
    this.router.navigate(['/cart']); 
  }
}
