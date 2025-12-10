import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '@cart';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {
cartService = inject(CartService);
}
