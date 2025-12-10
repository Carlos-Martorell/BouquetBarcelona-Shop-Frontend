import { inject, Injectable, signal } from '@angular/core';
import { CreateOrder, Order } from '../../models/orders';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environments';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient)
  private readonly apiUrl = `${environment.apiUrl}/api/orders`;
  
  private ordersSignal = signal<Order[]>([]);
  readonly orders = this.ordersSignal.asReadonly();

  create(order: CreateOrder): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order).pipe(
      tap(newOrder => {
        this.ordersSignal.update(orders => [...orders, newOrder]);
      })
    );
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      tap(orders => this.ordersSignal.set(orders))
    );
  }

  getOne(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  getShortId(id: string): string {
    return id.slice(-6).toUpperCase();
  }
}
