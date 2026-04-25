export const catalogFilters = {
  bySearch:
    (search = "") =>
    (catalog) => {
      const value = search.trim().toLowerCase();

      if (!value) {
        return catalog;
      }

      return catalog.filter((item) => item.name.toLowerCase().includes(value));
    },

  byCategory: (categoryId) => (catalog) => {
    if (!categoryId) {
      return catalog;
    }

    return catalog.filter((item) => item.categoryId === categoryId);
  },

  groupByCategory: () => (catalog) => {
    return Object.entries(
      catalog.reduce((acc, item) => {
        if (!acc[item.categoryId]) {
          acc[item.categoryId] = [];
        }

        acc[item.categoryId].push(item);

        return acc;
      }, {}),
    );
  },
};
