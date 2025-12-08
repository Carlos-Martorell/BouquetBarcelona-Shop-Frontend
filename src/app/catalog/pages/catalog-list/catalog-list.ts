import { Component, computed, inject, signal } from '@angular/core';
import { Spinner } from '@app/shared';
import { Flower, FlowersService, ProductGrid, SearchBar } from '@catalog';

@Component({
  selector: 'app-catalog-list',
  imports: [ProductGrid, Spinner, SearchBar],
  templateUrl: './catalog-list.html',
  styleUrl: './catalog-list.css',
})
export class CatalogList {
  flowersService = inject(FlowersService);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  searchQuery = signal('');
  selectedCategory = signal<string>('all');
  selectedOccasion = signal<string>('all');

  filteredFlowers = computed(() => {
    let flowers = this.flowersService.flowers();

    const query = this.searchQuery().toLowerCase();
    if (query) {
      flowers = flowers.filter(
        (f) => f.name.toLowerCase().includes(query) || f.description.toLowerCase().includes(query),
      );
    }

    const category = this.selectedCategory();
    if (category !== 'all') {
      flowers = flowers.filter((f) => f.category === category);
    }

    const occasion = this.selectedOccasion();
    if (occasion !== 'all') {
      flowers = flowers.filter((f) => f.occasion === occasion);
    }

    return flowers;
  });

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

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
  }

  onOccasionChange(occasion: string) {
    this.selectedOccasion.set(occasion);
  }

  onClearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    this.selectedOccasion.set('all');
  }
}
