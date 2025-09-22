import { useGetProducts } from "../../hooks/products.hook";
import { Product } from "../../ts/Product";
import Filters from "../Filters/filters";
import ProductCard from "../Product-Card/product-card";
import "./list-products.scss";

export default function ListProducts() {
  const { data, isLoading, isError } = useGetProducts();

  return (
    <div className="container">
      <h2>Blusas</h2>
      <div className="content-list">
        <Filters />
        <div className="list-data">
          {data?.map((product: Product, index) => (
            <ProductCard key={index} product={product} onClickBuy={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
