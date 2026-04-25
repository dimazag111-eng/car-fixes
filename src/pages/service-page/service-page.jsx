import cn from "classnames";

import { Api } from "../../api/api";
import { Button } from "../../components/button/button";
import { Container } from "../../components/container/container";
import { Layout } from "../../components/layout/layout";
import { getCatalogCategoryNameById } from "../../helpers/get-catalog-category-name-by-id";
import { useQuery } from "../../services/api-query/use-query";
import { useCartStore } from "../../services/cart-store/cart-store-service";
import { useRouter } from "../../services/router/router-service";
import styles from "./service-page.module.css";

export const ServicePage = () => {
  const router = useRouter();

  const serviceId = router.route.id || ":serviceId";

  const {
    data: { serviceData, servicesCategoryData },
    isLoading,
    isError,
  } = useQuery({
    serviceData: {
      queryKey: ["getService"],
      queryFn: () => Api.getService(serviceId),
      initialData: null,
    },
    servicesCategoryData: {
      queryKey: ["getServicesCategory"],
      queryFn: () => Api.getServicesCategory(),
      initialData: null,
    },
  });

  const cartStore = useCartStore();

  return (
    <Layout>
      <section className={cn(styles.section)}>
        <Container>
          <Button className={cn(styles.buttonBack)} use="primary" onClick={() => router.back()}>
            ← Назад
          </Button>

          <>
            {isLoading && <p>Загрузка...</p>}
            {isError && <p>Ошибка загрузки!</p>}

            {!isLoading && !isError && (
              <>
                <h1 className={cn(styles.title)}>Услуга</h1>

                <div className={cn(styles.picture)}>
                  <img className={cn(styles.pictureImg)} src={serviceData.picture} alt={""} />
                </div>

                <div className={cn(styles.content)}>
                  <div className={cn(styles.header)}>
                    <div className={cn(styles.info)}>
                      <h1 className={cn(styles.service)}>{serviceData.name}</h1>

                      <p className={cn(styles.category)}>
                        {getCatalogCategoryNameById(servicesCategoryData ?? [], serviceData.categoryId) ||
                          "Неизвестная категория"}
                      </p>
                    </div>

                    <p className={cn(styles.price)}>
                      <span className={cn(styles.priceSum)}>{serviceData.price}</span>
                      <span className={cn(styles.priceSymbol)}>₸</span>
                    </p>
                  </div>

                  <div className={cn(styles.description)}>
                    {serviceData.description.map((text, index) => (
                      <p key={index}>{text}</p>
                    ))}
                  </div>

                  <div className={cn(styles.footer)}>
                    {!cartStore.hasItem(serviceId) ? (
                      <Button use="accent" onClick={() => cartStore.add(serviceId)}>
                        В корзину
                      </Button>
                    ) : (
                      <Button use="accent" onClick={() => cartStore.remove(serviceId)}>
                        Удалить из корзины
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        </Container>
      </section>
    </Layout>
  );
};
