import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CardsService {
  constructor(private readonly http: HttpClient) {}

  public search({
    type,
    kingdomId,
    classId,
    abilityId,
  }: Partial<{
    type: number;
    kingdomId: string;
    classId: string | null;
    abilityId: string | null;
  }>) {
    return this.http.get<any[]>('cards/search', {
      params: {
        ...(type && { type }),
        ...(kingdomId && { kingdomId }),
        ...(classId && { classId }),
        ...(abilityId && { abilityId }),
      },
    });
  }

  public getClasses(kingdomId?: string) {
    return this.http.get<any[]>('cards/classes', {
      params: { ...(kingdomId && { kingdomId }) },
    });
  }

  public getAbilities(kingdomId?: string) {
    return this.http.get<any[]>('cards/abilities', {
      params: { ...(kingdomId && { kingdomId }) },
    });
  }
}
