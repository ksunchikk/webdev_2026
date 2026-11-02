import type { Product } from "../../types/products";
import { Badge, type BadgeTone } from "../../ui";
import styles from "./Products.module.css";

type ProductListProps = {
  items: Product[];
};

function formatter(value: number): string {
  return `${value.toLocaleString("ru-RU")} Р`;
}

export function getStatus(stock: number): { tone: BadgeTone; label: string } {
  if (stock === 0) return { tone: "error", label: "Нет на складе" };
  if (stock > 5) return { tone: "success", label: "В наличии" };
  return { tone: "warning", label: "Мало товаров" };
}

export function ProductList({ items }: ProductListProps) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>Товар</th>
          <th>Категория</th>
          <th className={styles.num}>Цена</th>
          <th className={styles.num}>Остаток, шт.</th>
          <th className={styles.num}>Рейтинг</th>
          <th className={styles.num}>Сумма на складе</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {items.map((product) => {
          const status = getStatus(product.stock);
          const stockValue = product.price * product.stock;

          return (
            <tr>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td className={styles.num}>{formatter(product.price)}</td>
              <td className={styles.num}>{product.stock}</td>
              <td className={styles.num}>{product.rating}</td>
              <td className={styles.num}>{formatter(stockValue)}</td>
              <td>
                <Badge tone={status.tone}>{status.label}</Badge>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
