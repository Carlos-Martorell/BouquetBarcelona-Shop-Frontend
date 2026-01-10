import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-basket-icon',
  imports: [],
  templateUrl: './empty-basket-icon.html',
})
export class EmptyBasketIcon {
  size = input<number>(128);
}
