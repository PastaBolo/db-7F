import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { _isNumberValue } from '@angular/cdk/coercion';
import { ChartData } from 'chart.js';

type Cards = { id: string; type: string; ec: number; revoquer: number }[];

@Component({
  selector: 'seven-fallen-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  animations: [
    trigger('expand', [
      state('*', style({ height: '*', opacity: 1 })),
      state('void', style({ height: 0, opacity: 0 })),
      transition('* => *', animate('150ms ease-in-out')),
    ]),
  ],
})
export class ChartsComponent {
  @Input() public cards: Cards = [];

  public readonly types = [
    { id: 'Divinite', label: 'Divinité', displayCounter: false },
    { id: 'Archange', label: 'Archange', displayCounter: false },
    { id: 'Temple', label: 'Temple', displayCounter: false },
    { id: 'Ange', label: 'Anges', displayCounter: true },
    { id: 'Adorateur', label: 'Adorateurs', displayCounter: true },
    { id: 'Golem', label: 'Golems', displayCounter: true },
    { id: 'Benediction', label: 'Bénédictions', displayCounter: true },
    { id: 'Equipement', label: 'Equipements', displayCounter: true },
    { id: 'Miracle', label: 'Miracles', displayCounter: true },
  ];

  public readonly typesLivreSacre = [
    { id: 'Ange', label: 'Anges' },
    { id: 'Golem', label: 'Golems' },
    { id: 'Benediction', label: 'Bénédictions' },
    { id: 'Equipement', label: 'Equipements' },
    { id: 'Miracle', label: 'Miracles' },
  ];

  public readonly averageCosts = (cards: Cards): ChartData => ({
    labels: ['Anges', 'Golems', 'Bénédictions', 'Equipements'],
    datasets: [
      {
        data: [
          ...['Ange', 'Golem', 'Benediction', 'Equipement'].map((type, i) => ({
            x: i,
            y: cards
              .filter((card) => card.type === type && _isNumberValue(card.ec))
              .reduce(
                (average, card, _, cards) => average + card.ec / cards.length,
                0
              ),
          })),
          {
            x: 4,
            y: cards
              .filter(
                (card) =>
                  card.type === 'Miracle' && _isNumberValue(card.revoquer)
              )
              .reduce(
                (average, card, _, cards) =>
                  average + card.revoquer / cards.length,
                0
              ),
          },
        ],
        backgroundColor: ['rgba(0, 0, 0, 0.3)'],
      },
    ],
  });

  public readonly detailedCosts = (cards: Cards): ChartData => {
    const cardsToDisplay = cards.filter(
      (card) =>
        ['Ange', 'Golem', 'Benediction', 'Equipement'].includes(card.type) &&
        _isNumberValue(card.ec)
    );
    return {
      labels: [...new Set(cardsToDisplay.map((card) => card.ec))].sort(
        (a, b) => a - b
      ),
      datasets: [
        { type: 'Ange', backgroundColor: 'rgba(255, 255, 255, 0.3)' },
        { type: 'Golem', backgroundColor: 'rgba(85, 0, 0, 0.3)' },
        { type: 'Benediction', backgroundColor: 'rgba(0, 85, 0, 0.3)' },
        { type: 'Equipement', backgroundColor: 'rgba(0, 0, 85, 0.3)' },
      ]
        .filter(({ type }) =>
          cardsToDisplay.map((card) => card.type).includes(type)
        )
        .map(({ type, backgroundColor }) => ({
          label: `${type}s`,
          data: cards
            .filter((card) => card.type === type && _isNumberValue(card.ec))
            .reduce((acc: { x: number; y: number }[], card) => {
              const index = acc.findIndex(({ x }) => x === card.ec);
              return index > -1
                ? [
                    ...acc.slice(0, index),
                    { x: acc[index].x, y: acc[index].y + 1 },
                    ...acc.slice(index + 1),
                  ]
                : [...acc, { x: card.ec, y: 1 }];
            }, []),
          backgroundColor,
        })),
    };
  };

  public readonly byType = (deck: Cards, type: string) =>
    deck.filter((item) => item.type === type);

  public readonly totalLivreSacre = (deck: Cards) =>
    deck.filter((item) =>
      this.typesLivreSacre.map((type) => type.id).includes(item.type)
    ).length;
}
