import cn from "classnames";

import { Api } from "../../api/api";
import { Button } from "../../components/button/button";
import { CartItem } from "../../components/cart-item/cart-item";
import { Container } from "../../components/container/container";
import { Layout } from "../../components/layout/layout";
import { SimpleList } from "../../components/simple-list/simple-list";
import { getCarBrandNameById, getCarModelsNameById } from "../../helpers/get-car-brand-and-model-name-by-id";
import { getCatalogCategoryNameById } from "../../helpers/get-catalog-category-name-by-id";
import { useQuery } from "../../services/api-query/use-query";
import { useOrderSnapshotStore } from "../../services/order-snapshot-store/order-snapshot-store-service";
import { ROUTER_PATHS } from "../../services/router/router-paths";
import { useRouter } from "../../services/router/router-service";
import styles from "./order-result-page.module.css";

export const OrderResultPage = () => {
  const router = useRouter();

  const orderSnapshotStore = useOrderSnapshotStore();
  // TODO: Добавить сброс хранилища при анмаунте страницы

  const {
    data: { cartServicesData, servicesCategoryData, carBrandsData, carModelsData },
    isLoading,
    isError,
  } = useQuery({
    cartServicesData: {
      queryKey: ["getCartServices"],
      queryFn: () => Api.getCartServices(orderSnapshotStore.snapshot.cartItems),
      initialData: null,
    },
    servicesCategoryData: {
      queryKey: ["getServicesCategory"],
      queryFn: () => Api.getServicesCategory(),
      initialData: null,
    },
    carBrandsData: {
      queryKey: ["getCarBrands"],
      queryFn: () => Api.getCarBrands(),
      initialData: null,
    },
    carModelsData: {
      queryKey: ["getCarModels"],
      queryFn: () => Api.getCarModels(),
      initialData: null,
    },
  });

  const prettifyCarBrand = getCarBrandNameById(carBrandsData ?? [], orderSnapshotStore.snapshot?.form?.brand) || "-";
  const prettifyCarModel = getCarModelsNameById(carModelsData ?? [], orderSnapshotStore.snapshot?.form?.model) || "-";

  return (
    <Layout>
      <section className={cn(styles.section)}>
        <Container>
          {orderSnapshotStore.snapshot ? (
            <>
              {isLoading && <p>Загрузка...</p>}
              {isError && <p>Ошибка загрузки!</p>}

              {!isLoading && !isError && (
                <div className={cn(styles.content)}>
                  <div className={cn(styles.status)}>
                    <div className={cn(styles.statusIcon)}>✓</div>
                    <h1 className={cn(styles.title)}>Заказ успешно оформлен!</h1>
                    <p className={cn(styles.subtitle)}>Мы сохранили ваш заказ и данные для записи.</p>
                  </div>

                  <div className={cn(styles.card)}>
                    <h2 className={cn(styles.cardTitle)}>Информация о заказе</h2>

                    <div className={cn(styles.infoGrid)}>
                      <div className={cn(styles.infoItem)}>
                        <div className={cn(styles.infoLabel)}>Номер заказа</div>
                        <div className={cn(styles.infoValue)}>{orderSnapshotStore.snapshot?.id}</div>
                      </div>

                      <div className={cn(styles.infoItem)}>
                        <div className={cn(styles.infoLabel)}>Дата</div>
                        <div className={cn(styles.infoValue)}>{orderSnapshotStore.snapshot?.date}</div>
                      </div>

                      <div className={cn(styles.infoItem)}>
                        <div className={cn(styles.infoLabel)}>Автомобиль</div>
                        <div className={cn(styles.infoValue)}>
                          {prettifyCarBrand} {prettifyCarModel}
                        </div>
                      </div>

                      <div className={cn(styles.infoItem)}>
                        <div className={cn(styles.infoLabel)}>Количество услуг</div>
                        <div className={cn(styles.infoValue)}>{cartServicesData.items?.length ?? 0}</div>
                      </div>
                    </div>
                  </div>

                  <div className={cn(styles.card)}>
                    <h2 className={cn(styles.cardTitle)}>Данные клиента</h2>

                    <div className={cn(styles.customer)}>
                      <div className={cn(styles.customerContacts)}>
                        <div className={cn(styles.customerRow)}>
                          <span className={cn(styles.customerLabel)}>Имя Фамилия</span>
                          <span className={cn(styles.customerValue)}>
                            {orderSnapshotStore.snapshot?.form?.fullName || "-"}
                          </span>
                        </div>

                        <div className={cn(styles.customerRow)}>
                          <span className={cn(styles.customerLabel)}>Телефон</span>
                          <span className={cn(styles.customerValue)}>
                            {orderSnapshotStore.snapshot?.form?.phone || "-"}
                          </span>
                        </div>

                        <div className={cn(styles.customerRow)}>
                          <span className={cn(styles.customerLabel)}>Email</span>
                          <span className={cn(styles.customerValue)}>
                            {orderSnapshotStore.snapshot?.form?.email || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={cn(styles.card)}>
                    <h2 className={cn(styles.cardTitle)}>Услуги в заказе</h2>

                    <ul className={cn(styles.services)}>
                      <SimpleList
                        items={cartServicesData.items}
                        rowSlot={(item) => {
                          const category =
                            getCatalogCategoryNameById(servicesCategoryData ?? [], item.categoryId) || "-";

                          return (
                            <CartItem
                              key={item.id}
                              name={item.name}
                              category={category}
                              picture={item.picture}
                              price={item.price}
                            />
                          );
                        }}
                      />
                    </ul>

                    <div className={cn(styles.summaryFooter)}>
                      <div className={cn(styles.totalRow)}>
                        <p className={cn(styles.totalRowLabel)}>Итого:</p>

                        <p className={cn(styles.totalRowValue)}>
                          {cartServicesData.total}
                          <span className={cn(styles.totalRowValueSymbol)}>₸</span>
                        </p>
                      </div>

                      <Button use="primary" onClick={() => router.navigate(ROUTER_PATHS.services)}>
                        Вернуться на главную
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Результат заказа пуст!</p>
          )}
        </Container>
      </section>
    </Layout>
  );
};
