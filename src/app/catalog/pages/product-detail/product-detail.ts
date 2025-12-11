import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Flower, FlowersService } from '@catalog';
import { CartService } from '@cart';
import { NotificationService } from '@shared';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  flowersService = inject(FlowersService);
  cartService = inject(CartService);
  notificationService = inject(NotificationService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  flower = signal<Flower | null>(null);
  loading = signal(true);
  selectedImage = signal(0);
  quantity = signal(1);

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
        this.notificationService.showError('Producto no encontrado');
        this.router.navigate(['/']);
      },
    });
  }

  selectImage(index: number) {
    this.selectedImage.set(index);
  }

  incrementQuantity() {
    const max = this.flower()?.stock || 0;
    this.quantity.update((q) => (q < max ? q + 1 : q));
  }

  decrementQuantity() {
    this.quantity.update((q) => (q > 1 ? q - 1 : 1));
  }

  addToCart() {
    const flower = this.flower();
    if (!flower) return;
    this.cartService.addToCart(flower, this.quantity());
    this.notificationService.showSuccess(`${flower.name} añadido al carrito`);
    this.quantity.set(1);
  }

  goBack() {
    this.router.navigate(['/catalog']);
  }
}
