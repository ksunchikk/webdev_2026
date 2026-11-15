import { ProductList } from "../features/ProductList/ProductList";
import { useCategories, useProducts } from "../api/queries";

import styles from "./ProductsPage.module.css";
import { useState } from "react";
import { useDebouncedValue } from "../utils/useDebouncedValue";
import { Button } from "../ui";
import { ProductForm } from "./form/ProductForm";

const PAGE_SIZE = 10;

export function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const debounced = useDebouncedValue(search, 600);

  const { data, isPending, isError, isPlaceholderData } = useProducts({
    q: category ? "" : debounced.trim(),
    category: category,
    page: page,
    pageSize: PAGE_SIZE,
  });

  const { data: categories = [] } = useCategories();

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  return (
    <main className={styles.page}>
      <h1>Shop Admin</h1>
      <ProductForm categories={categories}></ProductForm>
      <div className={styles.toolbar}>
        <input
          className={""}
          type="search"
          placeholder="Поиск"
          onChange={(event) => {
            setSearch(event.target.value);
            setCategory("");
            setPage(1);
          }}
        />
        <select
          className={""}
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setSearch("");
            setPage(1);
          }}
        >
          <option value="">Все категории</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {isPending ? (
        <h2>Загрузка...</h2>
      ) : (
        <ProductList items={data.products}></ProductList>
      )}
      <div className={styles.pagination}>
        <Button
          variant="secondary"
          size="sm"
          disabled={page === 1}
          onClick={() => {
            setPage((current) => current - 1);
          }}
        >
          Назад
        </Button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages || isPlaceholderData}
          onClick={() => {
            setPage((current) => current + 1);
          }}
        >
          Вперед
        </Button>
      </div>
      {isError && <p role="alert">Не удалось загрузить товары</p>}
    </main>
  );
}
