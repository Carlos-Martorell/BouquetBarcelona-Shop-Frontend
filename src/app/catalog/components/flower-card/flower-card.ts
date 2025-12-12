import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flower } from '@catalog';

@Component({
  selector: 'app-flower-card',
  imports: [RouterLink],
  templateUrl: './flower-card.html',
  styleUrl: './flower-card.css',
})
export class FlowerCard {
  flower = input.required<Flower>();

  //   getPrevIndex(currentIndex: number, totalImages: number): number {
  //   return currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
  // }

  // getNextIndex(currentIndex: number, totalImages: number): number {
  //   return currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
  // }

  // scrollToSlide(slideId: string) {
  //   const element = document.getElementById(slideId);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: 'smooth', // Hace que el movimiento sea fluido
  //       block: 'nearest',   // Evita que la pantalla entera salte hacia arriba/abajo
  //       inline: 'start'
  //     });
  //   }
  // }
}
