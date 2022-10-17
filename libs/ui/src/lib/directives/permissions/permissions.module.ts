import { NgModule } from '@angular/core';

import { IsCurrentUserIdDirective } from './is-current-user-id.directive';
import { IsLoggedInDirective } from './is-logged-in.directive';
import { IsNotLoggedInDirective } from './is-not-logged-in.directive';

@NgModule({
  declarations: [
    IsCurrentUserIdDirective,
    IsLoggedInDirective,
    IsNotLoggedInDirective,
  ],
  exports: [
    IsCurrentUserIdDirective,
    IsLoggedInDirective,
    IsNotLoggedInDirective,
  ],
})
export class PermissionsModule {}
