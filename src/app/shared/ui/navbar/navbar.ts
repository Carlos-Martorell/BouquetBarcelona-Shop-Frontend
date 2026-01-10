import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
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
  isCartOpen = signal(false);

  @ViewChild('cartModal') cartModal!: ElementRef<HTMLDialogElement>;

  totalItemsCount = computed(() => this.cartService.totalItemsCount());
  cartTotal = computed(() => this.cartService.cartTotal());

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openCartModal() {
    this.cartModal?.nativeElement.showModal();
  }

  goToCart() {
    this.cartModal?.nativeElement.close();
    this.router.navigate(['/cart']);
  }
}
