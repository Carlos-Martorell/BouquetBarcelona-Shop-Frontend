import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@env/environments';
import { Flower } from '@catalog';

@Injectable({
  providedIn: 'root',
})
export class FlowersService {
  private readonly apiUrlLH = 'http://localhost:3000/api/flowers';
  private readonly apiUrl = `${environment.apiUrl}/api/flowers`;

  private flowersSignal = signal<Flower[]>([]);

  readonly flowers = this.flowersSignal.asReadonly();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Flower[]> {
    return this.http
      .get<Flower[]>(this.apiUrl)
      .pipe(tap(flowers => this.flowersSignal.set(flowers)));
  }

  
}
