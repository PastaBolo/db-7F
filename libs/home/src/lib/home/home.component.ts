import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@seven-fallen/shared/auth';

@Component({
  selector: 'seven-fallen-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  public signOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['auth']));
  }
}
