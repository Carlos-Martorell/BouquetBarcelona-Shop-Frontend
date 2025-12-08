import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Flower } from '@catalog';
import { CartItem } from '@cart';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartItemsSignal = signal<CartItem[]>([]);
  readonly cartItems = this.cartItemsSignal.asReadonly()

  private platformId = inject(PLATFORM_ID);

  readonly totalItemsCount = computed(() => this.cartItems().reduce((acc, item) => acc  + item.quantity, 0))

  readonly cartTotal = computed(() => 
    this.cartItems().reduce((acc, item) => acc  + (item.flower.price * item.quantity), 0)
  )

  constructor(){
    if (isPlatformBrowser(this.platformId)) {
        
        this.loadCart();

        effect(() => {
            localStorage.setItem('cart', JSON.stringify(this.cartItems()));
        });
    }
  }

  loadCart() {
    const stored = localStorage.getItem('cart');
    if(stored) {
      try {
        const items = JSON.parse(stored)
        this.cartItemsSignal.set(items)
      } catch (e) {
        console.error('Error loading cart, clearing:', e);
        localStorage.removeItem('cart');
        this.cartItemsSignal.set([]);
      }
    }
  }

  addToCart(flower: Flower, quantity: number) {
    const items = [...this.cartItems()];
    const existingIndex = items.findIndex(item => flower._id === item.flower._id)
    if (existingIndex >= 0){
      items[existingIndex].quantity += quantity;
    } else {
      items.push({ flower, quantity });
    }
    this.cartItemsSignal.set(items); 
  }

  removeFromCart(id:string){
    const items = this.cartItems().filter(item => item.flower._id !== id)
    this.cartItemsSignal.set(items)
  }

  updateQuantity(id: string, quantity: number){
    const items = this.cartItems().map(item => 
      item.flower._id === id
      ? {...item, quantity}
      : item
    )
    this.cartItemsSignal.set(items)
  }

  clearCart(){
    this.cartItemsSignal.set([])
  }

}
