import { Overlay } from '@angular/cdk/overlay';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[previewOver]' })
export class PreviewOverDirective<T> implements OnDestroy {
  @Input('previewOver') public tmpl?: TemplateRef<T>;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('previewContext') public context?: T;

  @Input() previewDisabled = false;

  private readonly overlayRef = this.overlay.create({
    positionStrategy: this.overlay
      .position()
      .flexibleConnectedTo(this.elmtRef.nativeElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]),
  });

  @HostListener('mouseenter') onEnter() {
    if (!this.previewDisabled && this.tmpl) {
      this.overlayRef.attach(
        new TemplatePortal(this.tmpl, this.vcr, this.context)
      );
    }
  }

  @HostListener('mouseleave') onLeave() {
    this.overlayRef.detach();
  }

  constructor(
    private readonly elmtRef: ElementRef<HTMLElement>,
    private readonly vcr: ViewContainerRef,
    private readonly overlay: Overlay
  ) {}

  ngOnDestroy(): void {
    this.overlayRef.dispose();
  }
}
