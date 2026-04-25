export const catalogCategoriesOptions = (catalogCategories) => {
  return catalogCategories.map((category) => ({ label: category.name, value: category.id }));
};
