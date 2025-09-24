import { useEffect, useState } from "react";
import "./filters-mobile.scss";
import { Product } from "../../../ts/Product";

interface Props {
  products?: Product[];
  setProducts?: (products: Product[]) => void;
}

export default function FilterMobile({ products, setProducts }: Props) {
  const [openColor, setOpenColor] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  function filterProducts() {
    const filtered = products?.filter((product) => {
      const matchColor = selectedColor ? product.color === selectedColor : true;
      const matchSize = selectedSize ? product.size[0] === selectedSize : true;
      const matchPrice = selectedPrice
        ? checkPrice(product.price, selectedPrice)
        : true;

      return matchColor && matchSize && matchPrice;
    });

    if (setProducts && filtered) setProducts(filtered);
  }

  function activeFilters(e: boolean) {
    if (e) {
      filterProducts();
      document.body.classList.remove("drawer-filters-open");
    } else {
      setSelectedColor(null);
      setSelectedSize(null);
      setSelectedPrice(null);
    }
  }

  const colors = [
    "Amarelo",
    "Azul",
    "Branco",
    "Cinza",
    "Laranja",
    "Verde",
    "Vermelho",
    "Preto",
    "Rosa",
    "Vinho",
  ];
  const sizes = ["P", "M", "G", "GG", "U", "36", "38", "40"];
  const prices = [
    "de R$0 até R$50",
    "de R$51 até R$150",
    "de R$151 até R$300",
    "de R$301 até R$500",
    "a partir de R$ 500",
  ];

  //   const toggleSelection = (color: string) => {
  //     setSelectedColor((prev) =>
  //       prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
  //     );
  //   };

  return (
    <div className="drawer drawer-filters">
      <div className="header">
        <button
          className="close"
          onClick={() => document.body.classList.remove("drawer-filters-open")}
        >
          x
        </button>
        <span>FILTRAR</span>
      </div>
      <div>
        <button className="topic" onClick={() => setOpenColor(!openColor)}>
          <span>CORES</span>
          <img alt="Arrow" src="./img/arrow_down.svg"></img>
        </button>

        {openColor && (
          <ul className="filter-list">
            {colors.map((color) => (
              <li key={color}>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedColor === color}
                    onChange={() =>
                      setSelectedColor(selectedColor === color ? null : color)
                    }
                  />
                  {color}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button className="topic" onClick={() => setOpenSize(!openSize)}>
          <span>TAMANHOS</span>
          <img alt="Arrow" src="./img/arrow_down.svg"></img>
        </button>

        {openSize && (
          <div className="size-grid">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-button ${
                  selectedSize === size ? "active" : ""
                }`}
                onClick={() =>
                  setSelectedSize(selectedSize === size ? null : size)
                }
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <button className="topic" onClick={() => setOpenPrice(!openPrice)}>
          <span>FAIXA DE PREÇO</span>
          <img alt="Arrow" src="./img/arrow_down.svg"></img>
        </button>

        {openPrice && (
          <ul className="filter-list">
            {prices.map((price) => (
              <li key={price}>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedPrice === price}
                    onChange={() =>
                      setSelectedPrice(selectedPrice === price ? null : price)
                    }
                  />
                  {price}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {(openColor || openPrice || openSize) && (
        <div className="btn-footer">
          <button className="load-more" onClick={() => activeFilters(true)}>
            APLICAR
          </button>
          <button className="load-less" onClick={() => activeFilters(false)}>
            LIMPAR
          </button>
        </div>
      )}
    </div>
  );
}

function checkPrice(productPrice: number, priceRange: string) {
  switch (priceRange) {
    case "de R$0 até R$50":
      return productPrice <= 50;
    case "de R$51 até R$150":
      return productPrice >= 51 && productPrice <= 150;
    case "de R$151 até R$300":
      return productPrice >= 151 && productPrice <= 300;
    case "de R$301 até R$500":
      return productPrice >= 301 && productPrice <= 500;
    case "a partir de R$ 500":
      return productPrice >= 500;
    default:
      return true;
  }
}
