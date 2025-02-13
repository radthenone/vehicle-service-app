import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../enviroment';
import { AuthResponse, User, RegisterData, UserData, LoginData } from '../auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl: string = `${environment.backendUrl}auth/`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUser();
  }

  public setSelectedUser(user: User) {
    this.currentUserSubject.next(user);
  }

  public selectedUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  private loadUser(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.setSelectedUser(JSON.parse(user));
    }
  }

  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.access);
    localStorage.setItem('refreshToken', response.refresh);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
  }

  register(registerData: RegisterData): Observable<UserData> {
    return this.http.post<UserData>(`${this.authUrl}register/`, registerData).pipe(
      map((user: UserData) => {
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
        return user;
      })
    );
  }

  login({ username, password }: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}login/`, { username, password }).pipe(
      tap((response: AuthResponse): AuthResponse => {
        this.storeAuthData(response);
        this.currentUserSubject.next(response.user);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    return this.http.post<AuthResponse>(`${this.authUrl}refresh/`, { refresh: refreshToken }).pipe(
      tap((response: AuthResponse) => {
        this.storeAuthData(response);
        this.currentUserSubject.next(response.user);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
