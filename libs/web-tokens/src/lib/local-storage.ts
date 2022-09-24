import { inject, InjectionToken } from '@angular/core';

import { WINDOW } from './window';

export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage', {
  factory: () => inject(WINDOW).localStorage,
});
