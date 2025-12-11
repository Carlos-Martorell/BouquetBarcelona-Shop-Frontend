// success.ts
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './success.html',
})
export class Success {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  sessionId = signal<string | null>(null);
  isLoading = signal(true);

  ngOnInit() {
    console.log('✅ Success page loaded');
    console.log('Full URL:', window.location.href);
    console.log('Query params:', this.route.snapshot.queryParams);

    const sessionId = this.route.snapshot.queryParams['session_id'];

    if (sessionId) {
      this.sessionId.set(sessionId);
      console.log('✅ Payment successful, session:', sessionId);
    } else {
      console.warn('⚠️ No session_id found');
    }

    this.isLoading.set(false);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToOrders() {
    // Temporal: Redirigir a home si orders no existe
    this.router.navigate(['/']);
  }
}
