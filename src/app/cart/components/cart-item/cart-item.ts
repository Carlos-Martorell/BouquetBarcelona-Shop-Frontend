import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CartItem } from '@cart';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();

  quantityChange = output<{ flowerId: string; quantity: number }>();
  remove = output<string>();

  increment() {
    const newQuantity = this.item().quantity + 1;
    this.quantityChange.emit({
      flowerId: this.item().flower._id,
      quantity: newQuantity,
    });
  }

  decrement() {
    const newQuantity = this.item().quantity - 1;
    if (newQuantity > 0) {
      this.quantityChange.emit({
        flowerId: this.item().flower._id,
        quantity: newQuantity,
      });
    }
  }

  onRemove() {
    this.remove.emit(this.item().flower._id);
  }
}
