import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CardsService {
  constructor(private readonly http: HttpClient) {}

  public search({
    kingdomId,
    type,
  }: Partial<{ kingdomId: string; type: number }>) {
    return this.http.get<any[]>('cards/search', {
      params: { ...(kingdomId && { kingdomId }), ...(type && { type }) },
    });
  }
}
