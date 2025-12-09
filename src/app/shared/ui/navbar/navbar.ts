import { Component, computed, inject } from '@angular/core';
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
  cartService = inject(CartService)
  router = inject(Router);

  totalItemsCount = computed(() => this.cartService.totalItemsCount())
  cartTotal = computed(() =>this.cartService.cartTotal())

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }



}
