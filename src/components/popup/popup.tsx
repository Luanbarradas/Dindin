import React from "react";
import styles from "./Popup.module.css";
import { PopupProps } from "../../interfaces/transaction";

export const Popup: React.FC<PopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.confirm_delete_popup}>
      <p>Apagar Item?</p>
      <div className={styles.popup_buttons}>
        <button className={styles.popup_buttonYes} onClick={onConfirm}>
          Sim
        </button>
        <button className={styles.popup_buttonNo} onClick={onCancel}>
          Não
        </button>
      </div>
    </div>
  );
};
