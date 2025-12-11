# 🌸 Bouquet Barcelona - E-commerce Shop

[![Angular](https://img.shields.io/badge/Angular-20.3.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Latest-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

Premium flower e-commerce web application built with Angular 20 Signals, Screaming Architecture, and Stripe payment integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Advanced Patterns](#advanced-patterns)
- [Design System](#design-system)
- [Integrations](#integrations)
- [Lessons Learned](#lessons-learned)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

**Bouquet Barcelona** is a modern full-stack e-commerce web application for selling premium artisan flower bouquets in Barcelona. Built with Angular 20's cutting-edge features including Signals, standalone components, and reactive state management with real Stripe payment integration.

### Project Goals

- **Modern Frontend:** Leverage Angular 20 Signals for reactive state management
- **Clean Architecture:** Feature-based structure following Screaming Architecture principles
- **Best Practices:** Smart/Dumb component pattern, barrel exports, functional guards
- **Performance:** Lazy loading, CSR optimization for Vercel deployment
- **Real Payments:** Complete Stripe Checkout integration with webhook confirmations
- **Professional UX:** ngx-sonner toast notifications, loading states, comprehensive ARIA labels

## Live Demo

| Environment | URL |
|-------------|-----|
| **Shop (Frontend)** | [https://bouquet-barcelona-shop-frontend.vercel.app](https://bouquet-barcelona-shop-frontend.vercel.app) |
| **Admin Panel** | [https://bouquet-barcelona-frontend.vercel.app](https://bouquet-barcelona-frontend.vercel.app) |
| **Backend API** | [https://bouquetbarcelona-backend.onrender.com](https://bouquetbarcelona-backend.onrender.com) |

> **Note:** Backend may take approximately 1 minute to wake up if inactive due to Render free tier limitations.

## Key Features

### Authentication (JWT)

- Login/Register with reactive form validation
- JWT tokens persisted in `localStorage`
- Automatic login after successful registration
- HTTP interceptor for automatic token injection
- Functional guards (`authGuard`, `guestGuard`)
- SSR-compatible using `isPlatformBrowser` checks

### Product Catalog

- Responsive grid layout for product display
- **Advanced filtering system:**
  - Full-text search across name and description
  - Category filtering (romantic, mediterranean, botanical, wild, modern)
  - Occasion filtering (love, birthday, sympathy, celebration, etc.)
- Collapsible search bar built with DaisyUI
- Detailed product page with image gallery carousel
- Keyboard navigation support (ArrowUp/Down/Enter in autocomplete)

### Shopping Cart

- Add, update, and remove items with real-time updates
- Persistent storage using `localStorage` with Angular `effect()`
- Computed signals for total, subtotal, and item count
- Stock validation before checkout
- Integrated in navbar with badge counter showing total items

### Checkout with Stripe Integration

**Complete payment flow:**

1. User navigates to checkout page
2. Delivery form (pre-filled if user is logged in)
3. Mapbox address autocomplete for delivery location
4. Click "Proceed to payment" button
5. Backend creates order with `status: 'pending'`
6. Backend validates total amount from database (security measure)
7. Backend creates Stripe Checkout Session
8. User redirects to Stripe hosted payment page
9. User completes payment (test card: `4242 4242 4242 4242`)
10. Stripe sends webhook to backend
11. Backend updates order status to `paid`
12. User redirects to success confirmation page
13. Shopping cart automatically cleared

**Security features:**
- Total amount validated on backend (never trust frontend values)
- Order status verification before payment processing
- Stripe webhook signature verification for authenticity

### Order History

- Protected route requiring user authentication
- Comprehensive order cards displaying:
  - Shortened order ID (last 6 characters)
  - Status badge with color coding (pending/confirmed/delivered/cancelled)
  - Order creation timestamp
  - Scheduled delivery date and time
  - Complete delivery address with optional details
  - Full product list with individual prices
  - Special delivery notes if provided
  - Total amount paid
- Empty state message when no orders exist

### Accessibility

- Comprehensive ARIA labels on all interactive elements
- Proper semantic HTML with `role`, `aria-label`, `aria-live` attributes
- Full keyboard navigation support
- Screen reader optimized
- WCAG 2.1 AA compliance

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 20.3.0 | Core framework with Signals |
| **TypeScript** | 5.9.2 | Type-safe JavaScript superset |
| **Tailwind CSS** | 4.1.17 | Utility-first CSS framework |
| **DaisyUI** | 5.5.8 | Tailwind component library |
| **ngx-sonner** | Latest | Modern toast notifications |
| **RxJS** | 7.8.0 | Reactive programming library |
| **Jasmine/Karma** | Latest | Unit testing framework |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | 10.x | Node.js framework |
| **MongoDB** | 7.x | NoSQL database |
| **Mongoose** | Latest | MongoDB ODM |
| **Stripe** | Latest | Payment processing |
| **node-fetch** | Latest | HTTP client for APIs |

### DevOps & Hosting

- **Vercel** - Frontend static site hosting
- **Render** - Backend API hosting
- **GitHub** - Version control and CI/CD

## Project Architecture

### Screaming Architecture (Feature-Based Structure)
```
src/app/
├── auth/                    # JWT Authentication Module
│   ├── guards/
│   │   ├── auth.guard.ts           # Route protection (requires login)
│   │   └── guest.guard.ts          # Redirect authenticated users
│   ├── services/
│   │   ├── auth.service.ts         # Login, register, logout logic
│   │   └── auth.interceptor.ts     # Automatic JWT token injection
│   ├── pages/
│   │   ├── login/                  # Login page component
│   │   └── register/               # Registration page component
│   └── index.ts                    # Barrel export file
│
├── catalog/                 # Product Catalog Module
│   ├── models/
│   │   └── flower.model.ts         # Flower interface definitions
│   ├── services/
│   │   └── flowers.service.ts      # CRUD operations with signals
│   ├── components/
│   │   ├── flower-card/            # Individual product card (dumb)
│   │   ├── product-grid/           # Grid layout component (dumb)
│   │   └── search-bar/             # Filter controls (dumb)
│   ├── pages/
│   │   ├── catalog-list/           # Product list with filters (smart)
│   │   └── product-detail/         # Single product view (smart)
│   └── index.ts
│
├── cart/                    # Shopping Cart Module
│   ├── models/
│   │   └── cart-item.model.ts      # Cart item interface
│   ├── services/
│   │   └── cart.service.ts         # Cart state with signals
│   ├── components/
│   │   ├── cart-item/              # Single cart item (dumb)
│   │   └── cart-summary/           # Cart totals (dumb)
│   ├── page/
│   │   └── cart/                   # Cart page (smart)
│   └── index.ts
│
├── checkout/                # Payment Flow Module
│   ├── models/
│   │   └── checkout-data.model.ts  # Checkout form interface
│   ├── services/
│   │   └── checkout.service.ts     # Order creation and Stripe
│   ├── components/
│   │   ├── delivery-form/          # Checkout form (dumb)
│   │   └── order-summary/          # Order review (dumb)
│   ├── pages/
│   │   ├── checkout/               # Checkout orchestrator (smart)
│   │   └── success/                # Payment success page
│   └── index.ts
│
├── orders/                  # Order History Module
│   ├── components/
│   │   └── order-card/             # Order display card (dumb)
│   ├── pages/
│   │   └── orders-list/            # Order history list (smart)
│   └── index.ts
│
├── shared/                  # Shared/Reusable Components
│   ├── ui/
│   │   ├── navbar/                 # Main navigation bar
│   │   ├── footer/                 # Site footer
│   │   └── spinner/                # Loading spinner
│   └── services/
│       └── notification/           # Toast notification service
│
├── core/                    # Core/Global Services
│   ├── models/
│   │   └── order.ts                # Order interfaces
│   ├── services/
│   │   ├── orders/                 # Shared order service
│   │   └── geocoding/              # Mapbox API integration
│   └── guards/
│       └── (imported from auth/)
│
├── layouts/
│   └── main-layout/                # Main application layout
│
└── environments/
    ├── environment.ts              # Development config
    └── environment.prod.ts         # Production config
```

## Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (local installation or MongoDB Atlas)
- **Stripe Account** (test mode for development)
- **Mapbox Account** (free tier available)

### Clone Repository
```bash
git clone https://github.com/Carlos-Martorell/bouquet-shop.git
cd bouquet-shop
```

### Install Dependencies
```bash
npm install
```

### Environment Configuration

Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  mapboxKey: 'pk.eyJ1Ijo...' // Obtain from mapbox.com
};
```

Create `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://bouquetbarcelona-backend.onrender.com',
  mapboxKey: 'pk.eyJ1Ijo...'
};
```

## Development

### Start Development Server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200`

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Verify code formatting |

## Testing

### Testing Strategy

**Implemented test suites:**
- **AuthService** (50 tests): Login, register, logout, token persistence, guards
- **CartService** (15 tests): CRUD operations, localStorage persistence, computed signals
- **FlowerCard** (8 tests): Component rendering, event emissions, navigation
- **OrderCard** (10 tests): Status display, formatting, badge rendering

**Total Test Count:** ~83 tests  
**Code Coverage:** ~50% of critical application paths

### Execute Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- --include='**/cart.service.spec.ts'

# Generate coverage report
npm test -- --code-coverage

# Watch mode for development
npm test -- --watch
```

### Signal Testing Example
```typescript
import { fakeAsync, tick } from '@angular/core/testing';

it('should persist cart to localStorage', fakeAsync(() => {
  service.addToCart(mockFlower, 2);
  tick(); // Execute effect()
  
  const stored = localStorage.getItem('cart');
  expect(stored).toBeTruthy();
  
  const parsed = JSON.parse(stored!);
  expect(parsed.length).toBe(1);
  expect(parsed[0].flower.name).toBe('Red Rose');
}));
```

**Why `fakeAsync` + `tick()`?**
- Angular's `effect()` doesn't execute synchronously in test environment
- `tick()` manually advances time and executes pending microtasks
- Without `tick()`, localStorage operations wouldn't complete during test execution

## Deployment

### Frontend Deployment (Vercel)

**Build Configuration:**
```bash
# Build Command
npm run build

# Output Directory
dist/bouquet-shop/browser

# Install Command
npm install
```

**Environment Variables:**
```
MAPBOX_KEY=pk.eyJ1Ijo...
```

**vercel.json Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/bouquet-shop/browser",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Backend Deployment (Render)

**Build Configuration:**
```bash
# Build Command
npm install && npm run build

# Start Command
npm run start:prod
```

**Environment Variables:**
```
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=https://bouquet-barcelona-shop-frontend.vercel.app
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_key_here
MAPBOX_TOKEN=sk.ey... (for backend geocoding)
```

## Advanced Patterns

### Signals vs Observables Decision Matrix

**When to use each approach:**

| Use Case | Tool | Reason |
|----------|------|--------|
| HTTP requests | Observable | Asynchronous, cancellable operations |
| UI state | Signal | Synchronous, automatic change detection |
| Form changes | Observable | Built into Angular Forms API |
| Derived state | Computed | Automatically recalculates dependencies |
| Side effects | Effect | Executes when dependencies change |

**Combined Example:**
```typescript
// Signal for UI loading state
isProcessing = signal(false);

// Observable for HTTP request
onFormSubmit(data: CheckoutData) {
  this.isProcessing.set(true);
  
  this.checkoutService.createOrder(data).subscribe({
    next: async (order) => {
      await this.checkoutService.processPayment(order._id);
    },
    error: () => {
      this.isProcessing.set(false);
    }
  });
}
```

### Barrel Exports Pattern

**Problem:** Long, tightly coupled import statements
```typescript
// ❌ Before
import { Flower } from '@app/catalog/models/flower.model';
import { FlowersService } from '@app/catalog/services/flowers.service';
import { FlowerCard } from '@app/catalog/components/flower-card/flower-card';
```

**Solution:** Centralized barrel exports
```typescript
// catalog/index.ts
export * from './models/flower.model';
export * from './services/flowers.service';
export * from './components/flower-card/flower-card';
export * from './components/product-grid/product-grid';
export * from './pages/catalog-list/catalog-list';
export * from './pages/product-detail/product-detail';

// ✅ After
import { Flower, FlowersService, FlowerCard } from '@catalog';
```

**TypeScript Path Configuration:**
```json
{
  "compilerOptions": {
    "paths": {
      "@catalog": ["src/app/catalog"],
      "@cart": ["src/app/cart"],
      "@checkout": ["src/app/checkout"],
      "@orders": ["src/app/orders"],
      "@auth": ["src/app/auth"],
      "@shared": ["src/app/shared"],
      "@core": ["src/app/core"]
    }
  }
}
```

### Smart/Dumb Component Architecture

**Smart Components (Pages):**
- Inject and use Angular services
- Handle complex business logic
- Orchestrate data flow and events
- Examples: `CatalogList`, `Checkout`, `OrdersList`

**Dumb Components (UI Components):**
- Receive data via `input()` signals
- Emit events via `output()` signals
- No direct service dependencies
- Examples: `FlowerCard`, `DeliveryForm`, `OrderSummary`

**Architecture Benefits:**
- Highly reusable components
- Simplified unit testing with mocked inputs
- Clear separation of concerns
- Better maintainability

**Complete Implementation Example:**
```typescript
// DUMB: search-bar.component.ts
@Component({
  selector: 'app-search-bar',
  standalone: true,
  template: `
    <input 
      [(ngModel)]="searchValue" 
      (input)="onSearchInput()"
      placeholder="Search products..."
    />
    <select [(ngModel)]="categoryValue" (change)="onCategoryChange()">
      <option value="all">All Categories</option>
      <option value="romantic">Romantic</option>
    </select>
  `
})
export class SearchBar {
  searchValue = signal('');
  categoryValue = signal('all');
  
  searchChange = output<string>();
  categoryChange = output<string>();
  
  onSearchInput() {
    this.searchChange.emit(this.searchValue());
  }
  
  onCategoryChange() {
    this.categoryChange.emit(this.categoryValue());
  }
}

// SMART: catalog-list.component.ts
@Component({
  template: `
    <app-search-bar
      (searchChange)="onSearchChange($event)"
      (categoryChange)="onCategoryChange($event)"
    />
    <app-product-grid [flowers]="filteredFlowers()" />
  `
})
export class CatalogList {
  flowersService = inject(FlowersService);
  
  searchQuery = signal('');
  selectedCategory = signal('all');
  
  filteredFlowers = computed(() => {
    let flowers = this.flowersService.flowers();
    // Complex filtering logic implemented here
    return flowers;
  });
  
  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }
  
  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
  }
}
```

### SSR Disabled (Client-Side Rendering)

**Reasons for CSR over SSR:**

1. Dynamic routes (`/catalog/:id`) caused prerendering errors on Vercel
2. E-commerce features don't require SSR for functionality
3. Shopping cart uses `localStorage` (client-side only)
4. Simplified deployment process on Vercel platform
5. Significantly improved build time performance

**Current Configuration:**
```json
// angular.json
"outputMode": "static",
"prerender": false
```

**Future SSR Re-enablement Steps:**
```json
// 1. Change outputMode
"outputMode": "server"

// 2. Add server entry point
"server": "src/main.server.ts"

// 3. Implement dynamic route handling
// In server.ts: getPrerenderParams()

// 4. Configure SSR entry
"ssr": { "entry": "src/server.ts" }
```

**SSR Files Present (Not Currently Used):**
- `src/main.server.ts`
- `src/app/app.config.server.ts`
- `server.ts`

### localStorage Guard for Future SSR

Services prepared for potential SSR implementation:
```typescript
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export class CartService {
  private platformId = inject(PLATFORM_ID);
  
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCart();
      
      effect(() => {
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
      });
    }
  }
  
  private loadCart() {
    const stored = localStorage.getItem('cart');
    if (stored) {
      this.cartItemsSignal.set(JSON.parse(stored));
    }
  }
}
```

## Design System

### Color Palette (Tailwind @theme)
```css
--color-text: #2d3748;        /* Charcoal - primary text */
--color-background: #f7fafc;  /* Ice gray - page background */
--color-primary: #744c3e;     /* French chocolate - brand color */
--color-secondary: #c9a689;   /* Sand - accent elements */
--color-accent: #d4a5a5;      /* Old rose - highlights */
--color-success: #8fa998;     /* Sage - success states */
--color-error: #b85450;       /* Soft burgundy - error states */
--color-border: #e8e3df;      /* Parchment - dividers */
```

### Component Library Stack

- **DaisyUI:** Pre-built buttons, badges, cards, modals, alerts
- **Tailwind CSS:** Custom layouts, spacing, responsive design, animations
- **Custom Components:** Domain-specific business logic components

## Integrations

### Mapbox Geocoding API

**Frontend Address Autocomplete:**
```typescript
// core/services/geocoding/geocoding.service.ts
async searchAddresses(query: string): Promise<AddressSuggestion[]> {
  if (query.length < 3) return [];
  
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${this.token}&limit=5&language=en&country=ES`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data.features || [];
}
```

**Backend Geocoding on Order Creation:**
```typescript
// backend/src/orders/orders.service.ts (NestJS)
async create(dto: CreateOrderDto): Promise<Order> {
  const coordinates = await this.geocodeAddress(dto.deliveryAddress);
  
  const order = new this.orderModel({
    ...dto,
    coordinates,
    status: 'pending'
  });
  
  return order.save();
}

private async geocodeAddress(address: string) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_TOKEN}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.features?.length > 0) {
    const [lng, lat] = data.features[0].center;
    return { lat, lng };
  }
  
  return undefined;
}
```

### Stripe Checkout Integration

**Webhook Configuration Steps:**

1. Navigate to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://bouquetbarcelona-backend.onrender.com/api/stripe/webhook`
4. Select events: `checkout.session.completed`
5. Copy the Signing Secret
6. Add to backend `.env` as `STRIPE_WEBHOOK_SECRET`

**Test Card Credentials:**
```
Card Number: 4242 4242 4242 4242
Expiry Date: 12/34
CVC: 123
ZIP Code: 12345
```

## Toast Notifications (ngx-sonner)

### Installation
```bash
npm install ngx-sonner
```

### Optimized Configuration

**Problem:** Default colors too bright, position overlaps cart icon

**Solution Implementation:**
```typescript
// app.component.ts
import { Component } from '@angular/core';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster 
      position="bottom-right"
      [toastOptions]="{
        style: {
          background: 'var(--color-background)',
          border: '2px solid var(--color-border)',
          color: 'var(--color-text)'
        },
        className: 'custom-toast'
      }"
      [offset]="'5rem'"
    />
    <router-outlet />
  `
})
export class AppComponent {}
```

**Custom Styling (styles.css):**
```css
/* Base toast styling */
.custom-toast {
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Success variant (soft green) */
[data-type='success'] {
  background: rgba(143, 169, 152, 0.1) !important;
  border-color: rgba(143, 169, 152, 0.4) !important;
  color: #8fa998 !important;
}

/* Error variant (soft red) */
[data-type='error'] {
  background: rgba(184, 84, 80, 0.1) !important;
  border-color: rgba(184, 84, 80, 0.4) !important;
  color: #b85450 !important;
}

/* Info variant (soft primary) */
[data-type='info'] {
  background: rgba(116, 76, 62, 0.1) !important;
  border-color: rgba(116, 76, 62, 0.4) !important;
  color: #744c3e !important;
}
```

### Service Implementation
```typescript
// shared/services/notification/notification.service.ts
import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showSuccess(message: string) {
    toast.success(message, {
      duration: 3000,
      position: 'bottom-right'
    });
  }
  
  showError(message: string) {
    toast.error(message, {
      duration: 4000,
      position: 'bottom-right'
    });
  }
  
  showInfo(message: string) {
    toast.info(message, {
      duration: 3000,
      position: 'bottom-right'
    });
  }
}
```

**ngx-sonner Advantages:**
- Modern, polished design aesthetic
- Smooth enter/exit animations
- Automatic toast stacking
- Highly customizable via CSS
- Position adjustable with `offset` property

## Lessons Learned

### Signal vs Observable Selection

| Scenario | Tool | Justification |
|----------|------|---------------|
| HTTP request | Observable | Asynchronous operation, built into HttpClient |
| UI state | Signal | Synchronous updates, automatic change detection |
| Form changes | Observable | Native Angular Forms `valueChanges` API |
| Derived state | Computed | Lazy evaluation, automatic recalculation |
| Side effects | Effect | Automatic execution on dependency changes |

### Effect() for localStorage Persistence
```typescript
// ✅ Correct approach (automatic execution)
constructor() {
  effect(() => {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  });
}

// ❌ Incorrect approach (manual subscription required)
constructor() {
  this.cartItems$.pipe(
    tap(items => localStorage.setItem('cart', JSON.stringify(items)))
  ).subscribe();
}
```

### Signal Immutability Pattern
```typescript
// ✅ Correct (creates new array reference)
addToCart(flower: Flower) {
  const items = [...this.cartItems()];
  items.push({ flower, quantity: 1 });
  this.cartItemsSignal.set(items);
}

// ❌ Incorrect (mutates existing array)
addToCart(flower: Flower) {
  this.cartItems().push({ flower, quantity: 1 }); // Won't trigger updates
}
```

### Testing Signals with fakeAsync
```typescript
// ✅ Correct (waits for effect execution)
it('should save to localStorage', fakeAsync(() => {
  service.addToCart(flower, 1);
  tick(); // Executes pending effect()
  
  const stored = localStorage.getItem('cart');
  expect(stored).toBeTruthy();
}));

// ❌ Incorrect (effect hasn't executed yet)
it('should save to localStorage', () => {
  service.addToCart(flower, 1);
  
  const stored = localStorage.getItem('cart');
  expect(stored).toBeTruthy(); // Test fails
});
```

## Roadmap

### Planned Features

- [ ] Email confirmation system (Nodemailer integration)
- [ ] Business invoicing (NIF/CIF + billing address fields)
- [ ] Admin order management panel
- [ ] Customer wishlist functionality
- [ ] Product review and rating system
- [ ] Advanced filtering (price range, size, color)
- [ ] Multi-language support (i18n)
- [ ] Live chat customer support integration
- [ ] Progressive Web App (PWA) capabilities
- [ ] Push notification system

## Contributing

Contributions are welcome and appreciated! Please follow these guidelines:

1. Fork the repository to your GitHub account
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes with descriptive messages (`git commit -m 'Add some AmazingFeature'`)
4. Push to your branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request with detailed description

### Code Standards

- Follow official Angular Style Guide
- Use Prettier for code formatting (`npm run format`)
- Write unit tests for new features (maintain >50% coverage)
- Update documentation for API changes
- Use conventional commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for complete details.

## Author

**Carlos Martorell**

- GitHub: [@Carlos-Martorell](https://github.com/Carlos-Martorell)
- LinkedIn: [Carlos Martorell Otal](https://www.linkedin.com/in/carlos-martorell-otal)

## Acknowledgments

- Angular team for Signals and standalone component architecture
- Tailwind Labs for Tailwind CSS and DaisyUI component library
- Stripe for secure payment processing infrastructure
- Mapbox for geocoding and mapping services
- ngx-sonner for elegant toast notification system

## Resources

### Official Documentation

- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [DaisyUI Component Library](https://daisyui.com)
- [ngx-sonner Toast Library](https://github.com/tutkli/ngx-sonner)
- [Stripe Checkout Integration](https://stripe.com/docs/payments/checkout)
- [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/)

### Related Repositories

- **Backend API:** [github.com/Carlos-Martorell/bouquet-backend](https://github.com/Carlos-Martorell/bouquet-backend)
- **Admin Panel:** [github.com/Carlos-Martorell/bouquet-admin](https://github.com/Carlos-Martorell/bouquet-admin)

---

**Note:** This is an educational project demonstrating modern Angular 20 patterns, Signals architecture, and full-stack e-commerce implementation.

