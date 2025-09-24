import { useEffect, useState } from "react";
import { useGetProducts } from "../../hooks/use-product";
import { Product } from "../../ts/Product";
import Filters from "../Filters/filters";
import ProductCard from "../Product-Card/product-card";
import "./list-products.scss";
import { useMobile } from "../../hooks/use-mobile";
import FiltersMobile from "../Drawers/Filters-Mobile/filters-mobile";
import OrderMobile from "../Drawers/Order-Mobile/order-mobile";
import Order from "../Order/order";

export default function ListProducts() {
  const { data, isLoading, isError } = useGetProducts();
  const isMobile = useMobile();
  const [visibleCount, setVisibleCount] = useState(9);
  const increment = 3;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<
    "Mais Recente" | "Menor Preço" | "Maior Preço" | ""
  >("");

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, [data, visibleCount]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "Menor Preço":
        return a.price - b.price;
      case "Maior Preço":
        return b.price - a.price;
      // case "Mais recente":
      //   return b.date - a.date;
      default:
        return 0;
    }
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore =
    data && filteredProducts.length > 0 && visibleCount < data.length;

  return (
    <div className="container">
      <div className="header-list">
        <span>Blusas</span>

        {isMobile ? (
          <div className="mobile-bar mobile-actions">
            <button
              onClick={() => document.body.classList.add("drawer-filters-open")}
            >
              Filtrar
            </button>
            <button
              onClick={() => document.body.classList.add("drawer-order-open")}
            >
              Ordenar
            </button>
          </div>
        ) : (
          <Order placeholder="Ordenar por: " setOrder={setSortOrder} />
        )}
      </div>

      {isMobile && (
        <div>
          <FiltersMobile products={data} setProducts={setFilteredProducts} />
          <OrderMobile setOrder={setSortOrder} />
        </div>
      )}

      <div className="content-list">
        <div className="filters-container">
          <Filters products={data} setProducts={setFilteredProducts} />
        </div>

        <div className="list-data">
          {(isError || visibleProducts.length <= 0 || isLoading) && (
            <div className="nothing-data">
              <span>Nenhum produto encontrado! :(</span>
            </div>
          )}

          {visibleProducts.length > 0 &&
            !isError &&
            !isLoading &&
            visibleProducts.map((product: Product, index) => (
              <ProductCard
                key={index}
                product={product}
                onClickBuy={() => {}}
              />
            ))}
        </div>
      </div>

      {hasMore && (
        <div
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
        >
          <button
            className="load-more"
            onClick={() => setVisibleCount((prev) => prev + increment)}
          >
            CARREGAR MAIS
          </button>
        </div>
      )}
    </div>
  );
}
