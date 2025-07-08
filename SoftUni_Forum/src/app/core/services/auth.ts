import { Injectable, signal } from '@angular/core';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Auth {
    private _isLoggedIn = signal(false);
    readonly isLoggedIn = this._isLoggedIn.asReadonly();

    private _user = signal<User | null>(null);
    readonly user = this._user.asReadonly();

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        if (!email || !password || password.length < 4) {
            throw new Error('Invalid email or password');
        }
        return this.http.post<User>('https://your.api/login', { email, password })
      .pipe(
        tap((user: User) => {
          this._user.set(user);
          this._isLoggedIn.set(true);
        })
      );
    };

    logout(): void {
        this._isLoggedIn.set(false);
    }
}
