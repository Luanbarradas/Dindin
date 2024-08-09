import styles from "./FilterButton.module.css";
import Filter from "../../assets/filter.svg";

export const FilterButton = () => {
  return (
    <div className={styles.filter_button}>
      <img src={Filter} alt="filtro" />
      <strong>Filtrar</strong>
    </div>
  );
};
