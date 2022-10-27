import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';

export const listFade = trigger('listFade', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        stagger(
          50,
          animate('200ms ease-out', style({ transform: 'none', opacity: 1 }))
        ),
      ],
      { optional: true }
    ),
  ]),
]);
