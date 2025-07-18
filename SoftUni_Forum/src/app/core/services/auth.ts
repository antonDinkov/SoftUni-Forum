import { Injectable, signal } from '@angular/core';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Auth {
    private _isLoggedIn = signal<boolean>(false);
    readonly isLoggedIn = this._isLoggedIn.asReadonly();

    private _user = signal<User | null>(null);
    readonly user = this._user.asReadonly();

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        if (!email || !password || password.length < 4) {
            throw new Error('Invalid email or password');
        }
        return this.http.post<User>(`${environment.apiUrl}/api/login`, { email, password }, { withCredentials: true })
            .pipe(
                tap((user: User) => {
                    this._user.set(user);
                    this._isLoggedIn.set(true);
                })
            );
    };

    register(username: string, email: string, tel: string, password: string, repass: string) {
        if (!username || !email || !tel || !password || password.length < 5 || password != repass) {
            throw new Error('Invalid input');
        }

        return this.http.post<User>(`${environment.apiUrl}/api/register`, { username, email, tel, password }, { withCredentials: true })
            .pipe(
                tap((user: User) => {
                    this._user.set(user);
                    this._isLoggedIn.set(true);
                }),
                catchError(err => {
                    // обработка на грешки
                    console.error('Registration error:', err);
                    return throwError(() => err);
                })
            );
    }

    logout() {
        return this.http.post(`${environment.apiUrl}/api/logout`, {}, { withCredentials: true })
    .pipe(
        tap(() => {
            this._user.set(null);
            this._isLoggedIn.set(false);
        }),
        catchError(err => {
            console.error('Logout error:', err);
            return throwError(() => err);
        })
    );
    }
}
