import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flower } from '@app/catalog/models/flower';
import { FlowersService } from '@app/catalog/services/flowers';

@Component({
  selector: 'app-flower-card',
  imports: [RouterLink],
  templateUrl: './flower-card.html',
  styleUrl: './flower-card.css',
})
export class FlowerCard {
  flower = input.required<Flower>();
}
