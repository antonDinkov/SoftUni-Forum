import { Injectable, signal } from '@angular/core';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';
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
        if (!email || !password || password.length < 5) {
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

                    console.error('Registration error:', err);
                    return throwError(() => err);
                })
            );
    }

    restoreSession() {
        return this.http.get<User>(`${environment.apiUrl}/api/users/profile`, { withCredentials: true })
            .pipe(
                tap(user => {
                    this._user.set(user);
                    this._isLoggedIn.set(true);
                }),
                catchError(err => {
                    console.warn('❗ Session restore failed', err);
                    return of(null);
                })
            );
    }

    update(tel: string, username: string, email: string) {
        if (!username || !email || !tel) {
            throw new Error('All fields required!');
        }
        console.log('auth function inside');

        return this.http.put<User>(`${environment.apiUrl}/api/users/profile`, { tel, username, email }, { withCredentials: true })
            .pipe(
                tap((user: User) => {
                    this._user.set(user);
                }),
                catchError(err => {
                    // обработка на грешки
                    console.error('Error updating profile info:', err);
                    return throwError(() => err);
                })
            )
    }

    logout() {
        console.log('Logout activated');

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
