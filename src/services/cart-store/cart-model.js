export class CartModel {
  static has(items, id) {
    return items.includes(id);
  }

  static add(items, id) {
    if (items.includes(id)) {
      return items;
    }

    return [...items, id];
  }

  static remove(items, id) {
    return items.filter((itemId) => itemId !== id);
  }

  static reset() {
    return [];
  }
}
