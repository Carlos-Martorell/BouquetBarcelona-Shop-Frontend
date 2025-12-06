import { Component, input } from '@angular/core';
import { Flower, FlowerCard } from '@catalog';

@Component({
  selector: 'app-product-grid',
  imports: [FlowerCard],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid {

  flowers = input.required<Flower[]>();
}
