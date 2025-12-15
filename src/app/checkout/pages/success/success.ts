// success.ts
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '@cart';
import { BouquetIcon, BikesIcon } from '@shared';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterLink, BouquetIcon, BikesIcon],
  templateUrl: './success.html',
})
export class Success {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  sessionId = signal<string | null>(null);
  isLoading = signal(true);

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParams['session_id'];

    if (sessionId) {
      this.sessionId.set(sessionId);
      this.cartService.clearCart();
    }

    this.isLoading.set(false);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }
}
