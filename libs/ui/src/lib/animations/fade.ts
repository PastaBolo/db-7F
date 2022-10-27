import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const fade = trigger('fade', [
  state('*', style({ opacity: 1 })),
  state('void', style({ opacity: 0 })),
  transition(':enter', animate('150ms 200ms ease-in-out')),
  transition(':leave', animate('150ms ease-in-out')),
]);
