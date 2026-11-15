import { z } from "zod";

export const priceShema = z
  .string()
  .trim()
  .min(1, "Укажите цену")
  .regex(/^\d+(?:[.,]\d{1,2})?$/, "Введите цену числом, например 758,80")
  .transform((value) => Number(value.replace(",", ".")))
  .pipe(
    z
      .number()
      .positive("Цена должна быть больше 0")
      .max(10000, "Цена не может быть больше 10000")
  );

const stockSchema = z
  .string()
  .trim()
  .min(1, "Укажите остаток")
  .regex(/^\d+$/, "Остаток должен быть целым числом")
  .transform(Number)
  .pipe(z.number().int().min(0).max(10000));

export const productFormSchema = z.object({
  title: z.string().trim().min(3, "Название: минимум 3 символа"),
  category: z.string().min(1, "Выберите категорию"),
  price: priceShema,
  stock: stockSchema,
});

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormData = z.output<typeof productFormSchema>;
