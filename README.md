JWT tokens (stored in localStorage)
Signals for reactive state
Functional guards (Angular 20+)
HTTP interceptor for automatic token injection

SSR Compatibility:
The AuthService is SSR-ready using isPlatformBrowser() to safely access localStorage only in the browser context:
typescriptimport { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

private platformId = inject(PLATFORM_ID);

private loadFromStorage() {
  if (isPlatformBrowser(this.platformId)) {
    // Safe to use localStorage here
    const token = localStorage.getItem('token');
    // ...
  }
}

Features:

✅ Login / Register with reactive forms
✅ Auto-login after registration
✅ Token persistence in localStorage
✅ JWT interceptor (adds token to all requests)
✅ Route guards (authGuard, guestGuard)
✅ Role-based access (admin/user)
✅ SSR compatible (no localStorage errors)

Guards:
// Protect routes requiring authentication
{
  path: 'orders',
  canActivate: [authGuard],
  loadComponent: () => import('./orders/pages/orders-list')
}

// Redirect logged users away from auth pages
{
  path: 'login',
  canActivate: [guestGuard],
  loadComponent: () => import('./auth/pages/login')
}

State Management:
// Read-only signals (components can't mutate)
readonly currentUser = this.currentUserSignal.asReadonly();
readonly token = this.tokenSignal.asReadonly();

// Computed properties
readonly isLoggedIn = computed(() => !!this.token());
readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
```






fix(cart): Guard localStorage access against SSR environments

Addresses the "ReferenceError: localStorage is not defined" error encountered during server-side rendering (SSR) by ensuring all browser-specific operations, such as calling loadCart() and initializing the persistence effect, are gated using isPlatformBrowser.


## ⚠️ SSR Desactivado (Vercel Deploy Fix)

Este proyecto usa **Client-Side Rendering (CSR)** en lugar de SSR por las siguientes razones:

### Por qué CSR en lugar de SSR:
1. **Rutas dinámicas** (`/catalog/:id`) causaban errores de prerendering en Vercel
2. **PWA** (próximamente) no requiere SSR
3. **E-commerce client-side** con carrito en localStorage
4. **Simplifica deployment** y reduce complejidad
5. **Mejora tiempo de build** en Vercel

### Configuración actual:
```json
// angular.json
"outputMode": "static",
"prerender": false
```

### Para reactivar SSR en el futuro:
1. Cambiar `"outputMode": "static"` → `"outputMode": "server"`
2. Añadir `"server": "src/main.server.ts"`
3. Implementar `getPrerenderParams()` en `server.ts` para rutas dinámicas
4. Añadir `"ssr": { "entry": "src/server.ts" }`

### Archivos SSR presentes pero NO usados:
- `src/main.server.ts`
- `src/app/app.config.server.ts`
- `server.ts`

Estos archivos se mantienen para facilitar migración futura a SSR si se necesita SEO avanzado.
```
