export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Футболка",
    category: "одежда",
    price: 1990,
    stock: 12,
    rating: 5,
  },
  {
    id: 2,
    title: "Кроссовки",
    category: "обувь",
    price: 5490,
    stock: 0,
    rating: 5,
  },
  {
    id: 3,
    title: "Кружка",
    category: "посуда",
    price: 450,
    stock: 3,
    rating: 4,
  },
  {
    id: 4,
    title: "Рюкзак",
    category: "сумки",
    price: 3200,
    stock: 25,
    rating: 5,
  },
  {
    id: 5,
    title: "Наушники",
    category: "электроника",
    price: 2990,
    stock: 0,
    rating: 5,
  },
  {
    id: 6,
    title: "Чайник",
    category: "кухня",
    price: 2100,
    stock: 8,
    rating: 5,
  },
];
