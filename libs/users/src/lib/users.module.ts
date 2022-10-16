import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [CommonModule, UsersRoutingModule, MatCardModule],
})
export class UsersModule {}
