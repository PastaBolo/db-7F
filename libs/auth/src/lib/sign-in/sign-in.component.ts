import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@seven-fallen/shared/auth';

@Component({
  selector: 'seven-fallen-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  public googleSignIn(): void {
    this.authService.googleSignIn().subscribe(() => this.router.navigate(['']));
  }
}
