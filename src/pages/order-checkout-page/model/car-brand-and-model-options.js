export const carBrandsOptions = (carBrands) => {
  return carBrands.map((brand) => ({ label: brand.name, value: brand.id }));
};

export const carModelsOptions = (brandId) => (carModels) => {
  if (!brandId) {
    return [];
  }

  return carModels
    .filter((model) => (brandId ? model.brandId === brandId : true))
    .map((model) => ({ label: model.name, value: model.id }));
};
