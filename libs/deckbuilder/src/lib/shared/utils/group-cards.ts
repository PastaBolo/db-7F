export const groupCards = (cards: any[]) =>
  cards.reduce((groups: { card: any; qty: number }[], card) => {
    const group = groups.find((group) => group.card.id === card.id);
    if (group) {
      group.qty++;
      return groups;
    } else {
      return [...groups, { card, qty: 1 }];
    }
  }, []);
