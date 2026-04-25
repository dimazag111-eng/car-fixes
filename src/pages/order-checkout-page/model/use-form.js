import { useState } from "react";

import { useCartStore } from "../../../services/cart-store/cart-store-service";
import { useOrderSnapshotStore } from "../../../services/order-snapshot-store/order-snapshot-store-service";
import { ROUTER_PATHS } from "../../../services/router/router-paths";
import { useRouter } from "../../../services/router/router-service";

export const useForm = () => {
  const router = useRouter();

  const cartStore = useCartStore();
  const orderSnapshotStore = useOrderSnapshotStore();
  
  const [formValues, setFormValues] = useState({
    brand: null,
    model: null,
    fullName: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (formValues) => (event) => {
    event.preventDefault();

    const orderId = Array(6)
      .fill(null)
      .map(() => Math.floor(Math.random() * 10))
      .join("");

    const orderDate = new Date().toLocaleDateString("ru-RU");

    orderSnapshotStore.resetSnapshot();

    orderSnapshotStore.addSnapshot({
      id: orderId,
      date: orderDate,
      form: formValues,
      cartItems: cartStore.items,
    });

    router.navigate(ROUTER_PATHS.orderResult);
    cartStore.reset();
  };

  return {
    formValues,
    setFormValues,
    handleSubmit,
  };
};
