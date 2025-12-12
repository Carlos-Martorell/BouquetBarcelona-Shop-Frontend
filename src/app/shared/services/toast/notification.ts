// import { Injectable, signal } from '@angular/core';

// export interface Toast {
//   message: string;
//   type: 'success' | 'error' | 'info';
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class NotificationService {
//   private toastSignal = signal<Toast | null>(null);
//   readonly toast = this.toastSignal.asReadonly();

//   showSuccess(message: string) {
//     this.show(message, 'success');
//   }

//   showError(message: string) {
//     this.show(message, 'error');
//   }

//   showInfo(message: string) {
//     this.show(message, 'info');
//   }

//   private show(message: string, type: Toast['type']) {
//     this.toastSignal.set({ message, type });
//     setTimeout(() => this.toastSignal.set(null), 3000);
//   }

//   clear() {
//     this.toastSignal.set(null);
//   }
// }
// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner'; // 💡 Importa la función toast

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Ya no necesitas el signal privado ni el readonly toast
  // private toastSignal = signal<Toast | null>(null);
  // readonly toast = this.toastSignal.asReadonly();

  // Los métodos ahora llaman a la función toast de ngx-sonner
  showSuccess(message: string) {
    // Usa toast.success() de ngx-sonner
    toast.success(message);
  }

  showError(message: string) {
    // Usa toast.error() de ngx-sonner
    toast.error(message);
  }

  showInfo(message: string) {
    // Usa toast.info() de ngx-sonner
    toast.info(message);
  }

  // Este método privado ya no es necesario
  /* private show(message: string, type: Toast['type']) {
    this.toastSignal.set({ message, type });
    setTimeout(() => this.toastSignal.set(null), 3000);
  }
  clear() {
    this.toastSignal.set(null);
  } */
}
