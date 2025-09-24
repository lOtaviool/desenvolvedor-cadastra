import { useEffect, useState } from "react";
import { useGetProducts } from "../../hooks/use-product";
import { Product } from "../../ts/Product";
import Filters from "../Filters/filters";
import ProductCard from "../Product-Card/product-card";
import "./list-products.scss";
import { useMobile } from "../../hooks/use-mobile";

export default function ListProducts() {
  const { data, isLoading, isError } = useGetProducts();
  const isMobile = useMobile();
  const [visibleCount, setVisibleCount] = useState(9);
  const increment = 3;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<
    "Mais recente" | "Menor Preço" | "Maior Preço" | ""
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
          <div className="order-by">
            <label htmlFor="sortOrder">Ordenar por:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value as
                    | "Mais recente"
                    | "Menor Preço"
                    | "Maior Preço"
                    | ""
                )
              }
            >
              <option value="">--</option>
              <option value="Mais recente">Mais recente</option>
              <option value="Menor Preço">Menor Preço</option>
              <option value="Maior Preço">Maior Preço</option>
            </select>
          </div>
        )}
      </div>

      {isMobile && (
        <div>
          <div className="drawer drawer-filters">
            <button
              className="close"
              onClick={() =>
                document.body.classList.remove("drawer-filters-open")
              }
            >
              x
            </button>
            <h3>Filtros</h3>
            <Filters products={data} setProducts={setFilteredProducts} />
          </div>

          <div className="drawer drawer-order">
            <button
              className="close"
              onClick={() =>
                document.body.classList.remove("drawer-order-open")
              }
            >
              x
            </button>
            <h3>Ordenar por</h3>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value as
                    | "Mais recente"
                    | "Menor Preço"
                    | "Maior Preço"
                    | ""
                )
              }
            >
              <option value="">--</option>
              <option value="Mais recente">Mais recente</option>
              <option value="Menor Preço">Menor Preço</option>
              <option value="Maior Preço">Maior Preço</option>
            </select>
          </div>
        </div>
      )}

      <div className="content-list">
        <div className="filters-container">
          <Filters products={data} setProducts={setFilteredProducts} />
        </div>

        <div className="list-data">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product: Product, index) => (
              <ProductCard
                key={index}
                product={product}
                onClickBuy={() => {}}
              />
            ))
          ) : (
            <h1>Nenhum produto encontrado! :(</h1>
          )}
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
