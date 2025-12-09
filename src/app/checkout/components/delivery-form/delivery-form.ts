import { AfterViewInit, Component, computed, effect, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@shared';
import { CheckoutService } from '@checkout';
import { AddressSuggestion, GeocodingService, OrdersService } from '@core';

@Component({
  selector: 'app-delivery-form',
  imports: [],
  templateUrl: './delivery-form.html',
  styleUrl: './delivery-form.css',
})
export class DeliveryForm implements AfterViewInit{

  private fb = inject(FormBuilder);
  private checkoutService = inject(CheckoutService);
  private ordersService = inject(OrdersService);
  private notificationService = inject(NotificationService);
  private geocodingService = inject(GeocodingService);

  addressSuggestions = signal<AddressSuggestion[]>([]);
  isSubmitting = signal(false);
  orderForm!: FormGroup;

  minDate = new Date().toISOString().split('T')[0];
  timeSlots = [
    { value: '09:00-10:00', label: '9:00 - 10:00' },
    { value: '10:00-11:00', label: '10:00 - 11:00' },
    { value: '11:00-12:00', label: '11:00 - 12:00' },
    { value: '12:00-13:00', label: '12:00 - 13:00' },
    { value: '16:00-17:00', label: '16:00 - 17:00' },
    { value: '17:00-18:00', label: '17:00 - 18:00' },
    { value: '18:00-19:00', label: '18:00 - 19:00' },
  ];

  constructor() {
    this.initForm();
    if (this.checkoutService.cartItems.length === 0) {
      this.ordersService.getAll().subscribe();
    }
    effect(() => {
      const orderId = this.formService.editingOrderId();
      if (orderId) {
        this.loadOrderData(orderId);
      } else {
        this.resetForm();
      }
    });
  }

  ngAfterViewInit() {
    this.itemsArray.valueChanges.subscribe(() => {
      this.updateTotal();
    });
  }
  private updateTotal(): void {
    const total = this.itemsArray.value.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    this.totalSignal.set(total);
  }

  initForm() {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      deliveryAddress: ['', Validators.required],
      deliveryDetails: [''],
      deliveryDate: ['', Validators.required],
      deliveryTime: ['', Validators.required],
      items: this.fb.array([]),
      status: ['pending'],
      notes: [''],
    });
  }

  get itemsArray(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }


  async onAddressInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;

    if (query.length < 3) {
      this.addressSuggestions.set([]);
      return;
    }

    const suggestions = await this.geocodingService.searchAddresses(query);
    this.addressSuggestions.set(suggestions);
  }

  selectAddress(suggestion: AddressSuggestion) {
    this.orderForm.patchValue({
      deliveryAddress: suggestion.place_name,
    });
    this.addressSuggestions.set([]);
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      this.notificationService.showError('Completa todos los campos');
      return;
    }

    if (this.itemsArray.length === 0) {
      this.notificationService.showError('Añade al menos un producto');
      return;
    }

    this.isSubmitting.set(true);

    const formData = {
      ...this.orderForm.value,
      total: this.totalSignal(),
    };

    const orderId = this.formService.editingOrderId();

    
      this.ordersService.create(formData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Pedido creado');
          this.isSubmitting.set(false);
        },
        error: () => {
          this.notificationService.showError('Error al crear');
          this.isSubmitting.set(false);
        },
      });
    }
  }

  close() {
    this.formService.close();
  }


  private loadOrderData(id: string) {
    const order = this.checkoutService.orders().find(o => o._id === id);
    if (!order) return;

    const formattedDate = order.deliveryDate.split('T')[0];

    this.orderForm.patchValue({
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      deliveryAddress: order.deliveryAddress,
      deliveryDetails: order.deliveryDetails,
      deliveryDate: formattedDate,
      deliveryTime: order.deliveryTime,
      status: order.status,
      notes: order.notes,
    });

    this.itemsArray.clear();
    order.items.forEach(item => {
      this.itemsArray.push(
        this.fb.group({
          flowerId: [item.flowerId],
          flowerName: [item.flowerName],
          quantity: [item.quantity],
          price: [item.price],
        })
      );
    });

    // Recalcular total después de cargar items
    this.updateTotal();
  }

  private resetForm() {
    this.orderForm.reset({
      status: 'pending',
    });
    this.itemsArray.clear();
    this.addressSuggestions.set([]);
    this.totalSignal.set(0);
  }

  hasError(fieldName: string): boolean {
    const field = this.orderForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getError(fieldName: string): string {
    const field = this.orderForm.get(fieldName);
    if (!field?.errors) return '';
    if (field.errors['required']) return 'Campo obligatorio';
    if (field.errors['email']) return 'Email inválido';
    return 'Campo inválido';
  }
}


}
