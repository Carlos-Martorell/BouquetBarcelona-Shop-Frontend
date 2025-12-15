import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '@cart';
import { BikesIcon } from '@shared/index';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe, BikesIcon],
  templateUrl: './order-summary.html',
})
export class OrderSummary {
  cartService = inject(CartService);
}
