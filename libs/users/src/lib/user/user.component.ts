import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { UsersService } from '@seven-fallen/shared/services';

@Component({
  selector: 'seven-fallen-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  public readonly user$ = this.route.params.pipe(
    switchMap((params) => this.usersService.get(params['uid']))
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService
  ) {}
}
