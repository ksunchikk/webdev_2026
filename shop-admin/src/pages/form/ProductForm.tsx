import { useState } from "react";
import type { Product } from "../../types/products";
import { useForm } from "react-hook-form";
import {
  productFormSchema,
  type ProductFormInput,
  type ProductFormData,
} from "./products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "../../api/products";
import { Button } from "../../ui";

type ProductFormProps = { categories: string[] };

export function ProductForm({ categories }: ProductFormProps) {
  const [created, setCreated] = useState<Product | null>(null);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { title: "", category: "", price: "", stock: "" },
  });

  async function onSubmit(values: ProductFormData) {
    setServerError("");
    setCreated(null);

    try {
      const response = await createProduct(values);
      setCreated(response);
      reset();
    } catch {
      setServerError("Не удалось добавить товар");
    }
  }

  return (
    <section aria-labelledby="product-heading">
      <h2 id="product-heading">Добавить товар</h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="new-title">Название</label>
            <input
              id="new-title"
              {...register("title")}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "new-title-error" : undefined}
            />
            {errors.title && <p id="new-title-error">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="new-category">Категория</label>
            <select
              id="new-category"
              {...register("category")}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={
                errors.category ? "new-category-error" : undefined
              }
            >
              <option value="">Все категории</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.category && (
              <p id="new-category-error">{errors.category.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="new-price">Цена, Р</label>
            <input
              id="new-price"
              type="text"
              inputMode="decimal"
              placeholder="Например, 758,80"
              {...register("price")}
              aria-invalid={Boolean(errors.price)}
              aria-describedby={errors.price ? "new-price-error" : undefined}
            />
            {errors.price && <p id="new-price-error">{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor="new-stock">Остаток</label>
            <input
              id="new-stock"
              type="number"
              min="0"
              step="1"
              inputMode="decimal"
              {...register("stock")}
              aria-invalid={Boolean(errors.stock)}
              aria-describedby={errors.price ? "new-stock-error" : undefined}
            />
            {errors.stock && <p id="new-stock-error">{errors.stock.message}</p>}
          </div>
        </div>
        <div>
          <Button type="submit" loading={isSubmitting}>
            Добавить товар
          </Button>
        </div>
      </form>
      {serverError && <p role="alert">{serverError}</p>}
      {created && (
        <p role="status">
          Сервер добавил товар "{created.title}", ID {created.id}
        </p>
      )}
    </section>
  );
}
