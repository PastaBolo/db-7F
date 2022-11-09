export const getQuantity = (card: any, cards: any[]) =>
  cards.filter(({ id }) => id === card.id).length;
