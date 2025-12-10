// checkout/pages/success/success.ts
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './success.html'
})
export class Success {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  sessionId = signal<string | null>(null);

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParams['session_id'];
    if (sessionId) {
      this.sessionId.set(sessionId);
      console.log('Payment successful, session:', sessionId);
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }
}