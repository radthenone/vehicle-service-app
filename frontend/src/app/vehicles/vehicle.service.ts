import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, take, switchMap } from 'rxjs';
import { environment } from '../../enviroment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Vehicle, VehicleWithBooklets } from './vehicle.interface';
import { ServiceBooklet } from '../service-booklets/service-booklet.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly vehicleUrl = `${environment.backendUrl}vehicles/`;
  private selectedVehicleSubject = new BehaviorSubject<Vehicle | null>(null);
  public selectedVehicle$ = this.selectedVehicleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  public setSelectedVehicle(vehicle: Vehicle) {
    this.selectedVehicleSubject.next(vehicle);
  }

  public selectedVehicle(): Vehicle | null {
    return this.selectedVehicleSubject.value;
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehicleUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getVehicle(id: number): Observable<VehicleWithBooklets> {
    return this.http.get<VehicleWithBooklets>(`${this.vehicleUrl}${id}/`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  downloadVehicleDataCsv(id: string): Observable<Blob> {
    return this.http
      .get(`${this.vehicleUrl}${id}/csv/`, {
        responseType: 'blob',
        headers: {
          Accept: 'text/csv',
          'Content-Type': 'text/csv',
        },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('CSV download error:', error);
          return throwError(() => error);
        })
      );
  }

  getVehicleBooklets(id: number): Observable<Omit<ServiceBooklet, 'vehicle'>[]> {
    return this.http.get<any[]>(`${this.vehicleUrl}${id}/booklets/`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehicleUrl, vehicle).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  // createVehicle(vehicle: Omit<Vehicle, 'id' | 'booklets'>): Observable<Vehicle> {
  //   return this.authService.currentUser$.pipe(
  //     take(1),
  //     switchMap((user) => {
  //       if (!user) {
  //         return throwError(() => new Error('User not found'));
  //       }
  //
  //       vehicle.user = user.id;
  //
  //       return this.http.post<Vehicle>(this.vehicleUrl, vehicle);
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError(() => error);
  //     })
  //   );
  // }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.vehicleUrl}${id}/`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
