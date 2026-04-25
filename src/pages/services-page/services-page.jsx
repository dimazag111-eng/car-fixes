import cn from "classnames";
import { useState } from "react";

import { Api } from "../../api/api";
import { Button } from "../../components/button/button";
import { Container } from "../../components/container/container";
import { Input } from "../../components/input/input";
import { Layout } from "../../components/layout/layout";
import { Select } from "../../components/select/select";
import { getCatalogCategoryNameById } from "../../helpers/get-catalog-category-name-by-id";
import { pipe } from "../../helpers/pipe";
import { useQuery } from "../../services/api-query/use-query";
import { useCartStore } from "../../services/cart-store/cart-store-service";
import { ROUTER_PATHS } from "../../services/router/router-paths";
import { useRouter } from "../../services/router/router-service";
import { catalogCategoriesOptions } from "./model/catalog-categories-options";
import { catalogFilters } from "./model/catalog-filters";
import styles from "./services-page.module.css";
import { ServiceCard } from "./ui/service-card/service-card";

export const ServicesPage = () => {
  const router = useRouter();

  const cartStore = useCartStore();

  const {
    data: { servicesData, servicesCategoryData },
    isLoading,
    isError,
  } = useQuery({
    servicesData: {
      queryKey: ["getServices"],
      queryFn: () => Api.getServices(),
      initialData: null,
    },
    servicesCategoryData: {
      queryKey: ["getServicesCategory"],
      queryFn: () => Api.getServicesCategory(),
      initialData: null,
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState(null);

  const catalogData = pipe(
    catalogFilters.bySearch(searchQuery),
    catalogFilters.byCategory(filterQuery),
    catalogFilters.groupByCategory(),
  )(servicesData ?? []);

  return (
    <Layout>
      <section className={cn(styles.section)}>
        <Container>
          <h1 className={cn(styles.title)}>Наши услуги</h1>

          <div className={cn(styles.filters)}>
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Поиск услуг"
              disabled={isLoading}
            />

            <Select
              value={filterQuery ?? ""}
              onChange={(event) => setFilterQuery(event.target.value)}
              onReset={() => setFilterQuery(null)}
              options={catalogCategoriesOptions(servicesCategoryData ?? [])}
              placeholder="Фильтр по категории"
              disabled={isLoading}
            />
          </div>

          <>
            {isLoading && <p>Загрузка...</p>}
            {isError && <p>Ошибка загрузки!</p>}

            {!isLoading && !isError && (
              <div className={cn(styles.categories)}>
                {catalogData.map(([categoryId, services]) => (
                  <div key={categoryId} className={cn(styles.category)}>
                    <h2 className={cn(styles.categoryName)}>
                      {getCatalogCategoryNameById(servicesCategoryData ?? [], categoryId) || "Неизвестная категория"}
                    </h2>

                    <ul className={cn(styles.categoryList)}>
                      {services.map((item) => (
                        <li key={item.id}>
                          <ServiceCard
                            name={item.name}
                            picture={item.picture}
                            price={`от ${item.price}`}
                            actionsSlot={
                              <>
                                <Button
                                  use="secondary"
                                  onClick={() => router.navigate(ROUTER_PATHS.service, { id: item.id })}
                                >
                                  Подробнее
                                </Button>

                                {!cartStore.hasItem(item.id) ? (
                                  <Button use="accent" onClick={() => cartStore.add(item.id)}>
                                    В корзину
                                  </Button>
                                ) : (
                                  <Button use="accent" onClick={() => cartStore.remove(item.id)}>
                                    Удалить из корзины
                                  </Button>
                                )}
                              </>
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </>
        </Container>
      </section>
    </Layout>
  );
};
