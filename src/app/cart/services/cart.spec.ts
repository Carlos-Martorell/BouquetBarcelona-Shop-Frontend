import { TestBed } from '@angular/core/testing';

import { CartService } from '@cart';
import { Flower } from '@catalog';

describe('CartService', () => {
  let service: CartService;

  const mockFlower: Flower = {
    _id: '1',
    name: 'Rosa Roja',
    price: 15,
    description: 'Rosa hermosa',
    category: 'romántico',
    images: ['image.jpg'],
    stock: 22,
    size: 'mediano',
    colors: ['rojo'],
    occasion: 'amor',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty cart', () => {
    expect(service.cartItems()).toEqual([]);
    expect(service.totalItemsCount()).toBe(0);
    expect(service.cartTotal()).toBe(0);
  });

  it('should add item to cart', () => {
    service.addToCart(mockFlower, 2);

    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].flower).toEqual(mockFlower);
    expect(service.cartItems()[0].quantity).toBe(2);
    expect(service.totalItemsCount()).toBe(2);
  });

  it('should increment quantity if item already exists', () => {
    service.addToCart(mockFlower, 1);
    service.addToCart(mockFlower, 2);

    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].quantity).toBe(3);
    expect(service.totalItemsCount()).toBe(3);
  });

  it('should calculate total correctly', () => {
    service.addToCart(mockFlower, 2);

    expect(service.cartTotal()).toBe(30);
  });

  it('should update quantity', () => {
    service.addToCart(mockFlower, 2);
    service.updateQuantity(mockFlower._id, 5);

    expect(service.cartItems()[0].quantity).toBe(5);
    expect(service.totalItemsCount()).toBe(5);
  });

  it('should remove item from cart', () => {
    service.addToCart(mockFlower, 2);
    service.removeFromCart(mockFlower._id);

    expect(service.cartItems().length).toBe(0);
    expect(service.totalItemsCount()).toBe(0);
  });

  it('should clear cart', () => {
    service.addToCart(mockFlower, 2);
    service.clearCart();

    expect(service.cartItems()).toEqual([]);
    expect(service.totalItemsCount()).toBe(0);
  });

  it('should load cart from localStorage on init', () => {
    const mockCart = [{ flower: mockFlower, quantity: 3 }];
    localStorage.setItem('cart', JSON.stringify(mockCart));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const newService = TestBed.inject(CartService);

    expect(newService.cartItems().length).toBe(1);
    expect(newService.cartItems()[0].quantity).toBe(3);
    expect(newService.cartItems()[0].flower.name).toBe('Rosa Roja');
  });
});
