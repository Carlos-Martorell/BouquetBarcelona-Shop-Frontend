import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flower } from '@catalog';

@Component({
  selector: 'app-flower-card',
  imports: [RouterLink],
  templateUrl: './flower-card.html',
})
export class FlowerCard {
  flower = input.required<Flower>();
}
