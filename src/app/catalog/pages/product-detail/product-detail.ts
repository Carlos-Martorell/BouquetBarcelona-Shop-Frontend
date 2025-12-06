
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flower, FlowersService } from '@catalog';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.html'
})
export class ProductDetail {
  flowersService = inject(FlowersService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  flower = signal<Flower | null>(null);
  loading = signal(true);
  selectedImage = signal(0);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.flowersService.getOne(id).subscribe({
      next: (flower) => {
        this.flower.set(flower);
        this.loading.set(false);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  selectImage(index: number) {
    this.selectedImage.set(index);
  }

  addToCart() {

  }
}