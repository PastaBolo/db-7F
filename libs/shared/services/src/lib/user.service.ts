import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, shareReplay, Subject, switchMap } from 'rxjs';

interface User {
  uid: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly updateUser$ = new Subject<{ name: string }>();

  public readonly currentUser$ = merge(
    this.http.get<User>('user'),
    this.updateUser$.pipe(
      switchMap((user) => this.http.post<User>('user', user))
    )
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  constructor(private readonly http: HttpClient) {}

  public update(user: { name: string }) {
    this.updateUser$.next(user);
  }
}
