import { AfterViewInit, Component, computed, effect, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@shared';
import { CheckoutData, CheckoutService, DeliveryForm, OrderSummary } from '@checkout';
import { AddressSuggestion, GeocodingService, OrdersService } from '@core';
import { Router } from '@angular/router';
import { AuthService } from '@auth';
import { CartService } from '@cart';


@Component({
  selector: 'app-checkout',
  imports: [DeliveryForm, OrderSummary ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private checkoutService = inject(CheckoutService);
  private geocodingService = inject(GeocodingService);
  private notificationService = inject(NotificationService);


  addressSuggestions = signal<AddressSuggestion[]>([]);
  isProcessing = signal(false);

  isLoggedIn = computed(() => this.authService.isLoggedIn())
  initialData = computed(() => {
    const user = this.authService.currentUser()
    if(!user) return undefined;

    return {
      customerName: user.name || '',
      customerEmail: user.email || '',
      customerPhone: user.phone || ''
    }
  })

    ngOnInit() {
    if (this.cartService.cartItems().length === 0) {
      this.notificationService.showError('Tu carrito está vacío');
      this.router.navigate(['/cart']);
    }
  }

  async onAddressSearch(query: string) {
    const suggestions = await this.geocodingService.searchAddresses(query);
    this.addressSuggestions.set(suggestions);
  }

  onFormSubmit(data: CheckoutData) {
  this.isProcessing.set(true);

  this.checkoutService.createOrder(data).subscribe({
    next: async (order) => {
      try {
        await this.checkoutService.processPayment(order._id); 
      } catch (error) {
        this.isProcessing.set(false);
        this.notificationService.showError('Error al procesar el pago');
      }
    },
    error: () => {
      this.isProcessing.set(false);
      this.notificationService.showError('Error al crear el pedido');
    }
  });
  }   


    onLogin() {
    this.checkoutService.redirectToLogin();
  }
}


