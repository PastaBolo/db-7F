import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@seven-fallen/shared/services';
import { map } from 'rxjs';

@Component({
  selector: 'seven-fallen-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public readonly form$ = this.userService.currentUser$.pipe(
    map(
      (user) =>
        new FormGroup({
          name: new FormControl(user.name, {
            validators: [Validators.required],
            nonNullable: true,
          }),
        })
    )
  );

  constructor(private readonly userService: UserService) {}

  public update(user: Partial<{ name: string }>) {
    this.userService.update(user as { name: string });
  }
}
