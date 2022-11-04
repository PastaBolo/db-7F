import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingComponent } from './loading.component';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private readonly overlayRef = this.overlay.create({
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    hasBackdrop: true,
  });

  public readonly loading$ = defer(() => {
    this.overlayRef.attach(new ComponentPortal(LoadingComponent));
    return NEVER;
  }).pipe(
    finalize(() => {
      this.overlayRef.detach();
    }),
    share()
  );

  constructor(private readonly overlay: Overlay) {}
}
