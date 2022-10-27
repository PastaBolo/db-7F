import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap } from 'rxjs';

import { UsersService } from '@seven-fallen/shared/services';
import { listFade } from '@seven-fallen/ui';

@Component({
  selector: 'seven-fallen-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [listFade],
})
export class UserComponent {
  public readonly uid$ = this.route.params.pipe(
    map((params) => params['uid'] as string),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly user$ = this.uid$.pipe(
    switchMap((uid) => this.usersService.get(uid))
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService
  ) {}
}
