import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { UsersService } from '@seven-fallen/shared/services';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[isCurrentUserId]' })
export class IsCurrentUserIdDirective implements OnDestroy {
  private view!: ViewRef;

  private readonly destroy$ = new Subject<void>();

  @Input() public set isCurrentUserId(uid: string) {
    this.usersService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (this.view) {
          this.view.destroy();
        }
        if (user.uid === uid) {
          this.view = this.vcr.createEmbeddedView(this.tmpl);
        }
      });
  }

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly tmpl: TemplateRef<void>,
    private readonly usersService: UsersService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
