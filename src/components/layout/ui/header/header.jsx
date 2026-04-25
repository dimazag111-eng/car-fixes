import cn from "classnames";

import { useCartStore } from "../../../../services/cart-store/cart-store-service";
import { ROUTER_PATHS } from "../../../../services/router/router-paths";
import { useRouter } from "../../../../services/router/router-service";
import { Container } from "../../../container/container";
import { ContactModal } from "../contact-modal/contact-modal";
import styles from "./header.module.css";

export const Header = () => {
  const router = useRouter();

  const cartStore = useCartStore();

  return (
    <>
      <header className={cn(styles.header)}>
        <Container className={cn(styles.container)}>
          <button className={cn(styles.logo)} onClick={() => router.navigate(ROUTER_PATHS.services)}>
            МАСЛЁНКА
          </button>

          <nav className={cn(styles.nav)}>
            <button className={cn(styles.link)} onClick={() => router.navigate(ROUTER_PATHS.services)}>
              Услуги
            </button>

            <button className={cn(styles.link)} onClick={() => router.navigate(ROUTER_PATHS.cart)}>
              {`Корзина (${cartStore.itemsCount})`}
            </button>

            <ContactModal
              renderSlot={({ onOpenModal }) => (
                <button className={cn(styles.link)} onClick={onOpenModal}>
                  Контакты
                </button>
              )}
            />
          </nav>
        </Container>
      </header>
    </>
  );
};
