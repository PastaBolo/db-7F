import { NgModule } from '@angular/core';

import { IsCurrentUserIdDirective } from './is-current-user-id.directive';

@NgModule({
  declarations: [IsCurrentUserIdDirective],
  exports: [IsCurrentUserIdDirective],
})
export class PermissionsModule {}
