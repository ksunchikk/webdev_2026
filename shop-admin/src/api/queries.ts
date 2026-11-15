import {
  fetchCategories,
  fetchCategory,
  fetchProducts,
  searchProducts,
} from "./products";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export type ListParams = {
  q: string;
  category: string;
  page: number;
  pageSize: number;
};

export const productKeys = {
  all: ["products"],
  list: (params: ListParams) => [...productKeys.all, "list", params],
  categories: ["categories"],
};

async function loadProducts({ q, category, page, pageSize }: ListParams) {
  const skip = (page - 1) * pageSize;

  if (q) return searchProducts(q, pageSize, skip);
  if (category) return fetchCategory(category, pageSize, skip);
  return fetchProducts(pageSize, skip);
}

export function useProducts(params: ListParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => loadProducts(params),
    placeholderData: keepPreviousData,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: productKeys.categories,
    queryFn: fetchCategories,
    staleTime: Infinity,
  });
}
