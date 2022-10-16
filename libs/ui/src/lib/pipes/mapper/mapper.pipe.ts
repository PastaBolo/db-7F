import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'map' })
export class MapperPipe<T, U> implements PipeTransform {
  transform(
    value: T,
    fn: (value: T, ...args: unknown[]) => U,
    ...args: unknown[]
  ): U {
    return fn(value, ...args);
  }
}
