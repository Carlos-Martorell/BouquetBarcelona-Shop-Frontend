import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bouquet-icon',
  standalone: true,
  templateUrl: './bouquet-icon.html',
  styleUrl: './bouquet-icon.css',
})
export class BouquetIcon {
  size = input<number>(128);
}
