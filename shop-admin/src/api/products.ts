import type { Product } from "../types/products";
import { request } from "./http";

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export function fetchProducts(limit: number, skip: number) {
  return request<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
}

export function searchProducts(query: string, limit: number, skip: number) {
  return request<ProductsResponse>(
    `/products/search?limit=${limit}&skip=${skip}&q=${encodeURIComponent(
      query
    )}`
  );
}

export function fetchCategories() {
  return request<string[]>("/products/category-list");
}

export function fetchCategory(slug: string, limit: number, skip: number) {
  return request<ProductsResponse>(
    `/products/category/${slug}?limit=${limit}&skip=${skip}`
  );
}

export function createProduct(
  input: Pick<Product, "title" | "category" | "price" | "stock">
) {
  return request<Product>("/products/add", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
