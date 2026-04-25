import cn from "classnames";

import { Api } from "../../api/api";
import { Button } from "../../components/button/button";
import { CartItem } from "../../components/cart-item/cart-item";
import { Container } from "../../components/container/container";
import { Layout } from "../../components/layout/layout";
import { SimpleList } from "../../components/simple-list/simple-list";
import { getCatalogCategoryNameById } from "../../helpers/get-catalog-category-name-by-id";
import { useQuery } from "../../services/api-query/use-query";
import { useCartStore } from "../../services/cart-store/cart-store-service";
import { ROUTER_PATHS } from "../../services/router/router-paths";
import { useRouter } from "../../services/router/router-service";
import styles from "./cart-page.module.css";

export const CartPage = () => {
  const router = useRouter();

  const cartStore = useCartStore();

  const {
    data: { cartServicesData, servicesCategoryData },
    isLoading,
    isError,
  } = useQuery({
    cartServicesData: {
      queryKey: ["getCartServices", cartStore.items],
      queryFn: () => Api.getCartServices(cartStore.items),
      initialData: null,
    },
    servicesCategoryData: {
      queryKey: ["getServicesCategory"],
      queryFn: () => Api.getServicesCategory(),
      initialData: null,
    },
  });

  return (
    <Layout>
      <section className={cn(styles.section)}>
        <Container>
          <Button className={cn(styles.buttonBack)} use="primary" onClick={() => router.back()}>
            ← Назад
          </Button>

          <>
            {cartStore.itemsCount ? (
              <>
                {isLoading && <p>Загрузка...</p>}
                {isError && <p>Ошибка загрузки!</p>}
                {!isLoading && !isError && (
                  <>
                    <h1 className={cn(styles.title)}>Корзина</h1>

                    <div className={cn(styles.summary)}>
                      <SimpleList
                        items={cartServicesData.items}
                        rowSlot={(item) => {
                          const category =
                            getCatalogCategoryNameById(servicesCategoryData ?? [], item.categoryId) ||
                            "Неизвестная категория";

                          return (
                            <CartItem
                              key={item.id}
                              name={item.name}
                              category={category}
                              picture={item.picture}
                              price={item.price}
                              actionSlot={
                                <Button use="accent" onClick={() => cartStore.remove(item.id)}>
                                  ×
                                </Button>
                              }
                            />
                          );
                        }}
                      />

                      <div className={cn(styles.summaryFooter)}>
                        <div className={cn(styles.totalRow)}>
                          <p className={cn(styles.totalRowLabel)}>Количество услуг:</p>

                          <p className={cn(styles.totalRowValue)}>{cartStore.itemsCount}</p>
                        </div>

                        <div className={cn(styles.totalRow)}>
                          <p className={cn(styles.totalRowLabel)}>Итого:</p>

                          <p className={cn(styles.totalRowValue)}>
                            {cartServicesData.total}
                            <span className={cn(styles.totalRowValueSymbol)}>₸</span>
                          </p>
                        </div>

                        <Button use="accent" onClick={() => router.navigate(ROUTER_PATHS.orderCheckout)}>
                          Перейти к оформлению
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <p>Корзина пуста!</p>
            )}
          </>
        </Container>
      </section>
    </Layout>
  );
};
