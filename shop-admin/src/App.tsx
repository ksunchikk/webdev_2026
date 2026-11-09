import { useEffect, useState } from "react";
import "./App.css";
import { ProductList } from "./features/ProductList/ProductList";
import { products, type Product } from "./types/products";
import { fetchProducts } from "./api/products";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(10, 0).then((data) => {
      setProducts(data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Shop Admin</h1>
      {loading && <h2>хагрузка...</h2>}
      {!loading && <ProductList items={products}></ProductList>}
    </div>
  );
}

export default App;
