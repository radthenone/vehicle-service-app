import { ServiceBookletControls, ServiceBooklet } from './service-booklet.interface';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { BehaviorSubject, catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { Vehicle } from '../vehicles/vehicle.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VehicleService } from '../vehicles/vehicle.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceBookletService {
  private readonly bookletsUrl = `${environment.backendUrl}booklets/`;
  private selectedBookletSubject = new BehaviorSubject<ServiceBooklet | null>(null);
  public selectedBooklet$ = this.selectedBookletSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  getBooklets(): Observable<ServiceBooklet[]> {
    return this.http.get<ServiceBooklet[]>(this.bookletsUrl);
  }

  getBooklet(id: number): Observable<ServiceBooklet> {
    return this.http.get<ServiceBooklet>(`${this.bookletsUrl}${id}/`);
  }

  createBooklet(booklet: Omit<ServiceBooklet, 'id' | 'vehicle'>): Observable<Omit<ServiceBooklet, 'vehicle'>> {
    return this.vehicleService.selectedVehicle$.pipe(
      take(1),
      switchMap((vehicle) => {
        if (vehicle) {
          const vehicleId = vehicle.id!;
          return this.http.post<Omit<ServiceBooklet, 'vehicle'>>(this.bookletsUrl, { vehicle: vehicleId, ...booklet });
        }
        return throwError(() => new Error('No vehicle selected'));
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  deleteBooklet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.bookletsUrl}${id}/`);
  }
}
