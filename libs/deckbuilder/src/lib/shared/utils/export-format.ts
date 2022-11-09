import { DomSanitizer } from '@angular/platform-browser';
import { map, pipe } from 'rxjs';

import { byType } from './by-type';
import { groupCards } from './group-cards';

export const exportFormat = (sanitizer: DomSanitizer) =>
  pipe(
    map(({ deck, cards, side }: { deck: any; cards: any[]; side: any[] }) =>
      [
        {
          label: 'Divinité',
          groupCards: [{ qty: 1, card: deck.deity }],
        },
        ...[
          { type: 'Archange', label: 'Archange' },
          { type: 'Temple', label: 'Temple' },
          { type: 'Adorateur', label: 'Adorateurs' },
          { type: 'Ange', label: 'Anges' },
          { type: 'Golem', label: 'Golems' },
          { type: 'Equipement', label: 'Equipements' },
          { type: 'Benediction', label: 'Bénédictions' },
          { type: 'Miracle', label: 'Miracles' },
          { type: 'CadeauDivin', label: 'Cadeau Divin' },
          { type: 'Familier', label: 'Familiers' },
        ]
          .map(({ type, label }) => ({
            label,
            groupCards: groupCards(byType(cards, type)),
          }))
          .filter(({ groupCards }) => groupCards.length),
        { label: 'Side', groupCards: groupCards(side) },
      ]
        .map(({ label, groupCards }) => groupExportFormat(label, groupCards))
        .join('\r\n\r\n\r\n')
    ),
    map((data) =>
      sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(
          new Blob([data], { type: 'application/octet-stream' })
        )
      )
    )
  );

function groupExportFormat(
  label: string,
  groupCards: { qty: number; card: any }[]
): string {
  return [
    `====== ${label} ======`,
    '\r\n\r\n',
    groupCards.map(({ card, qty }) => `${qty} - ${card.name}`).join('\r\n'),
  ].join('');
}
