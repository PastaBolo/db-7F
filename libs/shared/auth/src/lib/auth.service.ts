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
    this.refresh();
  }

  public googleSignIn() {
    return from(
      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(
      switchMap((credentials) => credentials.user?.getIdToken() || EMPTY),
      tap((token) => this.refreshStoredToken(token)),
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

  public refresh() {
    this.afAuth.onAuthStateChanged((user) => {
      user?.getIdToken().then((token) => {
        this.refreshStoredToken(token);
        this._isLoggedIn$.next(!!user);
      });
    });
  }

  private signIn() {
    return this.http.get('auth/signin').pipe(
      catchError(() => {
        this.signOut();
        return EMPTY;
      })
    );
  }

  private refreshStoredToken(token: string): void {
    this.localStorage.setItem('token', token);
  }
}
