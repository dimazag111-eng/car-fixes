export const getCarBrandNameById = (carBrands, brandId) => {
  return carBrands.find((value) => value.id === brandId)?.name;
};

export const getCarModelsNameById = (carModels, modelId) => {
  return carModels.find((value) => value.id === modelId)?.name;
};
