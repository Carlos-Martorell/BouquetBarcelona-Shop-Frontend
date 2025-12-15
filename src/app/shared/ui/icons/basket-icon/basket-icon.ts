import { Component, input } from '@angular/core';

@Component({
  selector: 'app-basket-icon',
  standalone: true,
  templateUrl: './basket-icon.html',
})
export class BasketIcon {
  size = input<number>(16);
  color = input<string>('currentColor');
}
