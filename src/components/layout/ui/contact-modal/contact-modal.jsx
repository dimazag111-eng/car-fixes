import { useState } from "react";

import styles from "./contact-modal.module.css";

export const ContactModal = (props) => {
  const { renderSlot } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  return (
    <>
      {renderSlot({ onOpenModal })}

      {isOpen && (
        <div className={styles.overlay} onClick={onCloseModal}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <button className={styles.closeButton} onClick={onCloseModal}>
              ×
            </button>

            <h2 className={styles.title}>Контакты</h2>

            <div className={styles.content}>
              <p>
                <strong>Адрес:</strong> г.Караганды, Муканова 51/4А
              </p>

              <p>
                <strong>Время работы:</strong> Пн–Вс, 09:00–21:00
              </p>

              <p>
                <strong>Телефон:</strong> +7 (777) 123-45-67
              </p>

              <p>
                <strong>Почта:</strong> maslenka-service@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
