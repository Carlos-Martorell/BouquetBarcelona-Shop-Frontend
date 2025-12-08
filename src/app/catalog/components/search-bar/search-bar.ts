import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.html',
})
export class SearchBar {

  isOpen = signal(false);
  searchValue = signal('');
  categoryValue = signal('all');
  occasionValue = signal('all');

  activeFiltersCount = signal(0);


  searchChange = output<string>();
  categoryChange = output<string>();
  occasionChange = output<string>();
  clearFilters = output<void>();


  toggleOpen() {
    this.isOpen.update((open) => !open);
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue.set(value);
    this.searchChange.emit(value);
    this.updateFiltersCount();
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.categoryValue.set(value);
    this.categoryChange.emit(value);
    this.updateFiltersCount();
  }

  onOccasionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.occasionValue.set(value);
    this.occasionChange.emit(value);
    this.updateFiltersCount();
  }

  onClearFilters() {
    this.searchValue.set('');
    this.categoryValue.set('all');
    this.occasionValue.set('all');
    this.clearFilters.emit();
    this.updateFiltersCount();
  }

  private updateFiltersCount() {
    let count = 0;
    if (this.searchValue()) count++;
    if (this.categoryValue() !== 'all') count++;
    if (this.occasionValue() !== 'all') count++;
    this.activeFiltersCount.set(count);
  }
}
