import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'seven-fallen-kingdom-select',
  templateUrl: './kingdom-select.component.html',
  styleUrls: ['./kingdom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KingdomSelectComponent),
      multi: true,
    },
  ],
})
export class KingdomSelectComponent implements ControlValueAccessor {
  @Input() public value?: string | null;
  @Output() public readonly valueChange = new EventEmitter<string | null>();

  public readonly kingdoms = [
    { id: '32ac1793-8519-47fa-b79f-e6f0becf3042', imgPath: 'logo_eondra.png' },
    {
      id: 'a4e00b23-0197-45bd-91fa-6ce9f6cdf75d',
      imgPath: 'logo_poseidia.png',
    },
    {
      id: '0ae86bda-1623-46fe-b9c1-a9a4179c6ec2',
      imgPath: 'logo_metascience.png',
    },
    { id: '72ab7997-0037-46c8-aee4-1562fd7cdb62', imgPath: 'logo_nsf.png' },
    { id: '5b9c3653-9350-4c4b-a7c8-b6200fce022e', imgPath: 'logo_tdl.png' },
    { id: '8ebcfb93-13e0-4fc5-8949-8cdf44e804ea', imgPath: 'logo_voie.png' },
    {
      id: 'd7e4c035-28a0-46ca-a0f3-d45d213e7908',
      imgPath: 'logo_purete_celeste.png',
    },
  ];

  private onChange = (value: string | null) => {};
  private onTouched = () => {};

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string | null) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public onClick(value: string) {
    if (value !== this.value) {
      this.value = value;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }
    this.onTouched();
  }
}
