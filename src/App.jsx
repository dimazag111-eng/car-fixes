import "./styles/reset.css";
import "./styles/colors.css";
import "./styles/base.css";

import { CartPage } from "./pages/cart-page/cart-page";
import { OrderCheckoutPage } from "./pages/order-checkout-page/order-checkout-page";
import { OrderResultPage } from "./pages/order-result-page/order-result-page";
import { ServicePage } from "./pages/service-page/service-page";
import { ServicesPage } from "./pages/services-page/services-page";
import { CartStoreProvider } from "./services/cart-store/cart-store-service";
import { OrderSnapshotStoreProvider } from "./services/order-snapshot-store/order-snapshot-store-service";
import { ROUTER_PATHS } from "./services/router/router-paths";
import { RouterProvider, useRouter } from "./services/router/router-service";

const Routes = () => {
  const { route } = useRouter();

  return (
    {
      [ROUTER_PATHS.services]: <ServicesPage />,
      [ROUTER_PATHS.service]: <ServicePage />,
      [ROUTER_PATHS.cart]: <CartPage />,
      [ROUTER_PATHS.orderCheckout]: <OrderCheckoutPage />,
      [ROUTER_PATHS.orderResult]: <OrderResultPage />,
    }[route.path] ?? <ServicesPage />
  );
};

export const App = () => {
  return (
    <RouterProvider>
      <OrderSnapshotStoreProvider>
        <CartStoreProvider>
          <Routes />
        </CartStoreProvider>
      </OrderSnapshotStoreProvider>
    </RouterProvider>
  );
};
