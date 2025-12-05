import { Component, computed, inject, signal } from '@angular/core';
import { Flower, FlowersService } from '@app/catalog';

@Component({
  selector: 'app-catalog-list',
  imports: [],
  templateUrl: './catalog-list.html',
  styleUrl: './catalog-list.css',
})
export class CatalogList {

    private flowersService = inject(FlowersService)

  flowers = this.flowersService.flowers()

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  
  flowerCount = computed(() => this.flowersService.flowers().length);
  hasFlowers = computed(() => this.flowerCount() > 0);
   
  loadFlowers() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.flowersService.getAll().subscribe({
      next: () => this.isLoading.set(false),
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al cargar ramos');
      },
    });
  }



}
