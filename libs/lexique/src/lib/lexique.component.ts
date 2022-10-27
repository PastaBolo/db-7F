import { Component } from '@angular/core';

import { expand, fade } from '@seven-fallen/ui';
import { lexique } from './lexique';

const cleanDiacritrics = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const filterList = (list: Item[], search: string) =>
  list.filter((item) =>
    cleanDiacritrics(item.title)
      .toLowerCase()
      .includes(cleanDiacritrics(search).toLowerCase())
  );

interface CapacitesLexique {
  capacites: Item[];
  lexique: Item[];
}

interface Item {
  title: string;
  content: string;
  extension?: string;
}

@Component({
  selector: 'seven-fallen-lexique',
  templateUrl: './lexique.component.html',
  styleUrls: ['./lexique.component.scss'],
  animations: [expand, fade],
})
export class LexiqueComponent {
  public readonly lexique = lexique;

  public readonly filterBy = (
    { capacites, lexique }: CapacitesLexique,
    search: string
  ): CapacitesLexique => {
    return {
      capacites: filterList(capacites, search),
      lexique: filterList(lexique, search),
    };
  };

  public readonly getList = (
    capacitesLexique: CapacitesLexique,
    key: keyof CapacitesLexique
  ) => capacitesLexique[key];

  public readonly sort = (list: Item[]) =>
    list.sort((a, b) =>
      a.title
        .replace(/\W/g, '')
        .localeCompare(b.title.replace(/\W/g, ''), 'fr', { numeric: true })
    );

  public readonly hasOneItem = (filteredCapacitesLexique: CapacitesLexique) =>
    [...filteredCapacitesLexique.capacites, ...filteredCapacitesLexique.lexique]
      .length === 1;
}
