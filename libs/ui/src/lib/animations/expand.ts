import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const expand = trigger('expand', [
  state('*', style({ height: '*', opacity: 1 })),
  state('void', style({ height: 0, opacity: 0 })),
  transition('* => *', animate('150ms ease-in-out')),
]);
