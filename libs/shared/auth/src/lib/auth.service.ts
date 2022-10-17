import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, EMPTY, from, ReplaySubject, switchMap, tap } from 'rxjs';

import { LOCAL_STORAGE } from '@seven-fallen/web-tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isLoggedIn$ = new ReplaySubject<boolean>(1);
  public readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly afAuth: AngularFireAuth,
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      this._isLoggedIn$.next(!!user);
    });
  }

  public googleSignIn() {
    return from(
      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(
      switchMap((credentials) => credentials.user?.getIdToken() || EMPTY),
      tap((token) => this.localStorage.setItem('token', token)),
      tap(() => this._isLoggedIn$.next(true)),
      switchMap(() => this.signIn())
    );
  }

  public signOut() {
    return from(this.afAuth.signOut())
      .pipe(
        tap(() => this.localStorage.removeItem('token')),
        tap(() => this._isLoggedIn$.next(false))
      )
      .subscribe(() => this.router.navigate(['auth']));
  }

  public getAuthToken(): string | null {
    return this.localStorage.getItem('token');
  }

  private signIn() {
    return this.http.get('auth/signin').pipe(
      catchError(() => {
        this.signOut();
        return EMPTY;
      })
    );
  }
}
