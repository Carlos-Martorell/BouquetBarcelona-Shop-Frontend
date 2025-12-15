import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { Flower } from '@catalog';

@Injectable({
  providedIn: 'root',
})
export class FlowersService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/flowers`;

  private flowersSignal = signal<Flower[]>([]);
  readonly flowers = this.flowersSignal.asReadonly();

  getAll(): Observable<Flower[]> {
    return this.http
      .get<Flower[]>(this.apiUrl)
      .pipe(tap((flowers) => this.flowersSignal.set(flowers)));
  }

  getOne(id: string) {
    return this.http.get<Flower>(`${this.apiUrl}/${id}`);
  }
}
