export const getCatalogCategoryNameById = (categories, categoryId) => {
  return categories.find((value) => value.id === categoryId)?.name;
};
