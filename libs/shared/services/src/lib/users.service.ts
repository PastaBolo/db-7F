import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@seven-fallen/shared/auth';
import { merge, NEVER, shareReplay, Subject, switchMap } from 'rxjs';

interface User {
  uid: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly updateUser$ = new Subject<{ name: string }>();

  public readonly currentUser$ = merge(
    this.authService.isLoggedIn$.pipe(
      switchMap((isLoggedIn) =>
        isLoggedIn ? this.http.get<User>('user') : NEVER
      )
    ),
    this.updateUser$.pipe(
      switchMap((user) => this.http.post<User>('user', user))
    )
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  public readonly users$ = this.http.get<any[]>('users');

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  public get(uid: string) {
    return this.http.get<any>(`users/${uid}`);
  }

  public update(user: { name: string }) {
    this.updateUser$.next(user);
  }
}
