// orders/components/order-card/order-card.ts
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '@core';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './order-card.html'
})
export class OrderCard {
  order = input.required<Order>();

  getStatusBadge(status: string) {
    const badges: Record<string, string> = {
      pending: 'badge-warning',
      confirmed: 'badge-info',
      delivered: 'badge-success',
      cancelled: 'badge-error'
    };
    return badges[status] || 'badge-ghost';
  }

  getStatusText(status: string) {
    const texts: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    return texts[status] || status;
  }

  getShortId(id: string) {
    return id.slice(-6).toUpperCase();
  }
}