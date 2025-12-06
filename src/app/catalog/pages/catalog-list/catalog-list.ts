import { Component, computed, inject, signal } from '@angular/core';
import { Flower, FlowersService, ProductGrid } from '@catalog';

@Component({
  selector: 'app-catalog-list',
  imports: [ProductGrid],
  templateUrl: './catalog-list.html',
  styleUrl: './catalog-list.css',
})
export class CatalogList {

  private flowersService = inject(FlowersService)
  private flowersSignal = this.flowersService.flowers()
  readonly flowers = this.flowersSignal.

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

    ngOnInit() {
    this.loadFlowers();  
  }
   
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
