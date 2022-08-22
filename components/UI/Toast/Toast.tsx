import { Bounce, ToastContainer } from "react-toastify";

import styles from "./Toast.module.scss";

export default function Toast() {
  return (
    <ToastContainer
      autoClose={2000}
      draggable
      position="top-center"
      bodyClassName={styles.toastBody}
      transition={Bounce}
      className={styles.toast_container}
      toastClassName={styles.toast}
      closeButton={false}
      limit={3}
    />
  );
}
