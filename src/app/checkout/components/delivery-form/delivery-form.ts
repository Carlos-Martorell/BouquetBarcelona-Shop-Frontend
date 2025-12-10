import { AfterViewInit, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '@shared';
import { CheckoutService, CheckoutData } from '@checkout';
import { AddressSuggestion, GeocodingService, OrdersService } from '@core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-form.html',
  styleUrl: './delivery-form.css',
})
export class DeliveryForm {
  private fb = inject(FormBuilder);
  
  initialData = input<Partial<CheckoutData>>()
  addressSuggestions = input<AddressSuggestion[]>([])
  
  formSubmit = output<CheckoutData>()
  addressSearch = output<string>()
  selectedSuggestionIndex = signal(-1);

  deliveryForm = this.fb.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    customerEmail: ['', [Validators.required, Validators.email]],
    customerPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    deliveryAddress: ['', Validators.required],
    deliveryDetails: [''],
    deliveryDate: ['', Validators.required],
    deliveryTime: ['', Validators.required],
    notes: ['']
  });

  timeSlots = [
    { value: '09:00-10:00', label: '9:00 - 10:00' },
    { value: '10:00-11:00', label: '10:00 - 11:00' },
    { value: '11:00-12:00', label: '11:00 - 12:00' },
    { value: '12:00-13:00', label: '12:00 - 13:00' },
    { value: '16:00-17:00', label: '16:00 - 17:00' },
    { value: '17:00-18:00', label: '17:00 - 18:00' },
    { value: '18:00-19:00', label: '18:00 - 19:00' }
  ];

  minDate = new Date().toISOString().split('T')[0];

  ngOnInit() {
    const data = this.initialData();
    if (data) {
      this.deliveryForm.patchValue(data);
    }
  }

  onAddressKeydown(event: KeyboardEvent) {
    const suggestions = this.addressSuggestions();
    if (suggestions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedSuggestionIndex.update(i => 
          i < suggestions.length - 1 ? i + 1 : i
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.selectedSuggestionIndex.update(i => i > 0 ? i - 1 : 0);
        break;

      case 'Enter':
        event.preventDefault();
        const index = this.selectedSuggestionIndex();
        if (index >= 0 && index < suggestions.length) {
          this.selectAddress(suggestions[index]);
        }
        break;

      case 'Escape':
        this.addressSearch.emit('');
        this.selectedSuggestionIndex.set(-1);
        break;
    }
  }

  onAddressInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.selectedSuggestionIndex.set(-1);
    if (query.length >= 3) {
      this.addressSearch.emit(query);
    }
  }

  selectAddress(suggestion: AddressSuggestion) {
    this.deliveryForm.patchValue({
      deliveryAddress: suggestion.place_name
    });
    this.addressSearch.emit('')
    this.selectedSuggestionIndex.set(-1);
  }
onSubmit() {
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.deliveryForm.value as CheckoutData);
  }

  hasError(fieldName: string): boolean {
    const field = this.deliveryForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getError(fieldName: string): string {
    const field = this.deliveryForm.get(fieldName);
    if (!field?.errors) return '';
    
    if (field.errors['required']) return 'Campo obligatorio';
    if (field.errors['email']) return 'Email inválido';
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['pattern']) return 'Teléfono inválido (9 dígitos)';
    
    return 'Campo inválido';
  }
}

