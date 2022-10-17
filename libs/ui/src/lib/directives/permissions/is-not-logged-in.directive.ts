import {
  Directive,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '@seven-fallen/shared/auth';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[isNotLoggedIn]' })
export class IsNotLoggedInDirective implements OnDestroy {
  private view!: ViewRef;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly tmpl: TemplateRef<void>,
    private readonly authService: AuthService
  ) {
    this.authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn) => {
        if (this.view) {
          this.view.destroy();
        }
        if (!isLoggedIn) {
          this.view = this.vcr.createEmbeddedView(this.tmpl);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
