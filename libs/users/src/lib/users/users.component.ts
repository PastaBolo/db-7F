import { Component } from '@angular/core';
import { UsersService } from '@seven-fallen/shared/services';

@Component({
  selector: 'seven-fallen-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public readonly users$ = this.usersService.users$;

  constructor(private readonly usersService: UsersService) {}
}
