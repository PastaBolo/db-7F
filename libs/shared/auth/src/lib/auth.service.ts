import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, EMPTY, from, switchMap, tap } from 'rxjs';

import { LOCAL_STORAGE } from '@seven-fallen/web-tokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly afAuth: AngularFireAuth,
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage
  ) {}

  public googleSignIn() {
    return from(
      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(
      switchMap((credentials) => credentials.user?.getIdToken() || EMPTY),
      tap((token) => this.localStorage.setItem('token', token)),
      switchMap(() => this.signIn())
    );
  }

  public signOut() {
    return from(this.afAuth.signOut()).pipe(
      tap(() => this.localStorage.removeItem('token'))
    );
  }

  public getAuthToken(): string | null {
    return this.localStorage.getItem('token');
  }

  private signIn() {
    return this.http
      .get('auth/signin')
      .pipe(catchError(() => this.signOut().pipe(switchMap(() => EMPTY))));
  }
}
