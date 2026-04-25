export class Api {
  static async getServices() {
    try {
      const result = (await import("./services.json")).default;

      return successResultAdapter(result || null);
    } catch (error) {
      return errorResultAdapter(this.getServices.name, error);
    }
  }

  static async getService(serviceId) {
    try {
      const result = (await import("./services.json")).default;
      const findOne = result.find((value) => value.id === serviceId);

      return successResultAdapter(findOne || null);
    } catch (error) {
      return errorResultAdapter(this.getService.name, error);
    }
  }

  static async getServicesCategory() {
    try {
      const result = (await import("./services-category.json")).default;

      return successResultAdapter(result || null);
    } catch (error) {
      return errorResultAdapter(this.getServicesCategory.name, error);
    }
  }

  static async getCartServices(serviceIds) {
    try {
      const result = (await import("./services.json")).default;
      const findMany = (serviceIds ?? [])
        .map((serviceId) => result.find((value) => value.id === serviceId))
        .filter(Boolean);

      const total = findMany.reduce((sum, item) => sum + (item.price || 0), 0);

      return successResultAdapter({ items: findMany, total });
    } catch (error) {
      return errorResultAdapter(this.getCartServices.name, error);
    }
  }

  static async getCarBrands() {
    try {
      const result = (await import("./car-brands.json")).default;

      return successResultAdapter(result || null);
    } catch (error) {
      return errorResultAdapter(this.getCarBrands.name, error);
    }
  }

  static async getCarModels() {
    try {
      const result = (await import("./car-models.json")).default;

      return successResultAdapter(result || null);
    } catch (error) {
      return errorResultAdapter(this.getCarModels.name, error);
    }
  }
}

const successResultAdapter = (result) => {
  return {
    data: result,
  };
};

const errorResultAdapter = (endpoint, error) => {
  console.debug(`API error [${endpoint}]`, error);

  return {
    data: null,
  };
};
