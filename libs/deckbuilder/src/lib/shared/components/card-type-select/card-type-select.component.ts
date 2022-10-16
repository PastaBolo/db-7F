import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'seven-fallen-card-type-select',
  templateUrl: './card-type-select.component.html',
  styleUrls: ['./card-type-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardTypeSelectComponent),
      multi: true,
    },
  ],
})
export class CardTypeSelectComponent implements ControlValueAccessor {
  @Input() public value?: number | null;
  @Output() public readonly valueChange = new EventEmitter<number | null>();

  public readonly cardTypes = new Map([
    [2, 'Archange'],
    [3, 'Temple'],
    [4, 'Adorateur'],
    [5, 'Ange'],
    [6, 'Golem'],
    [7, 'Equipement'],
    [8, 'Benediction'],
    [9, 'Miracle'],
    [10, 'CadeauDivin'],
    [11, 'Familier'],
  ]);

  public readonly typeLabels = new Map([
    [2, 'Archanges'],
    [3, 'Temples'],
    [4, 'Adorateurs'],
    [5, 'Anges'],
    [6, 'Golems'],
    [7, 'Equipements'],
    [8, 'Bénédictions'],
    [9, 'Miracles'],
    [10, 'Cadeaux Divins'],
    [11, 'Familiers'],
  ]);

  private onChange = (value: number | null) => {};
  private onTouched = () => {};

  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: number | null) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public onClick(value: number) {
    if (value !== this.value) {
      this.value = value;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }
    this.onTouched();
  }
}
