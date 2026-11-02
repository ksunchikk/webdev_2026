import "./App.css";
import { ProductList } from "./features/ProductList/ProductList";
import { products } from "./types/products";

function App() {
  const items = products;
  return (
    <div>
      <h1>Shop Admin</h1>
      <ProductList items={items}></ProductList>
    </div>
  );
}

export default App;
