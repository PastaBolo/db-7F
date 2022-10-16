import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[let]' })
export class LetDirective<T> {
  private view!: ViewRef;
  private context!: { let: T };

  @Input() public set let(value: T) {
    if (!this.view) {
      this.context = { let: value };
      this.view = this.vcr.createEmbeddedView(this.tmpl, this.context);
    } else {
      this.context.let = value;
    }
  }

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly tmpl: TemplateRef<{ let: T }>
  ) {}

  static ngTemplateContextGuard<T>(
    dir: LetDirective<T>,
    ctx: unknown
  ): ctx is { let: T } {
    return true;
  }
}
