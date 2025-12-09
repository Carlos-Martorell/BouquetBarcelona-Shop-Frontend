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
export class DeliveryForm {

  
}
