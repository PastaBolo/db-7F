import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  EMPTY,
  map,
  merge,
  ReplaySubject,
  shareReplay,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'seven-fallen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('searchInput', { read: ElementRef })
  searchInput!: ElementRef<HTMLInputElement>;

  public readonly search$ = new Subject<string>();
  public readonly selectId$ = new ReplaySubject<string>(1);
  public readonly edition$ = new ReplaySubject<string>(1);
  public readonly number$ = new BehaviorSubject<number>(1);
  public readonly previewSrc$ = new Subject();
  public readonly images$ = new ReplaySubject<File[]>(1);
  public readonly index$ = new BehaviorSubject<number>(0);
  public readonly isEden$ = new BehaviorSubject<boolean>(false);

  public readonly selectedId$ = merge(
    this.search$.pipe(map(() => null)),
    this.selectId$
  ).pipe(shareReplay(1));

  public readonly cards$ = this.search$.pipe(
    debounceTime(500),
    switchMap((search) =>
      this.http.get<{ id: string; name: string; type: string }[]>(
        'http://localhost:3333/admin-api/search',
        {
          params: { search },
        }
      )
    )
  );

  constructor(private readonly http: HttpClient) {
    combineLatest({ images: this.images$, index: this.index$ }).subscribe(
      ({ images, index }) => {
        if (images[index]) {
          this.displayImage(images[index]);
        }
      }
    );
  }

  public displayImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.previewSrc$.next(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }

  public upload() {
    combineLatest({ images: this.images$, index: this.index$ })
      .pipe(
        take(1),
        switchMap(({ images, index }) => {
          const file = images[index];
          if (!file) {
            return EMPTY;
          }
          const formData = new FormData();
          formData.append('file', file, file.name);
          return combineLatest({
            id: this.selectedId$,
            edition: this.edition$,
            number: this.number$,
            isEden: this.isEden$,
          }).pipe(
            take(1),
            tap(({ id, edition, number, isEden }) => {
              if (id && edition && number) {
                formData.append('id', id);
                formData.append('edition', edition);
                formData.append(
                  'number',
                  `${isEden ? 'E' : ''}${number.toString().padStart(3, '0')}`
                );
              }
            }),
            switchMap(() =>
              this.http.post('http://localhost:3333/admin-api/upload', formData)
            )
          );
        })
      )
      .subscribe({
        next: () => {
          this.searchInput.nativeElement.select();
          this.index$.next(this.index$.value + 1);
          this.number$.next(this.number$.value + 1);
        },
        error: (err) => alert(err),
      });
  }
}
