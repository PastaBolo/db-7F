import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { SharedAuthModule } from '@seven-fallen/shared/auth';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, SharedAuthModule, AuthRoutingModule, MatButtonModule],
})
export class AuthModule {}
