import React, { useState } from "react";
import { Product } from "../../ts/Product";

interface Props {
  products?: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Filters: React.FC<Props> = ({ products, setProducts }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>("Amarelo");
  const [selectedSize, setSelectedSize] = useState<string | null>("M");
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const colors = ["Amarelo", "Azul", "Branco", "Cinza", "Laranja"];
  const sizes = ["P", "M", "G", "GG", "U", "36", "38", "40"];
  const prices = [
    "de R$0 até R$50",
    "de R$51 até R$150",
    "de R$151 até R$300",
    "de R$301 até R$500",
    "a partir de R$ 500",
  ];

  return (
    <div className="filter-sidebar">
      <div className="filter-section">
        <h3 className="filter-title">CORES</h3>
        <ul className="filter-list">
          {colors.map((color) => (
            <li key={color}>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                />
                {color}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">TAMANHOS</h3>
        <div className="size-grid">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-button ${selectedSize === size ? "active" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">FAIXA DE PREÇO</h3>
        <ul className="filter-list">
          {prices.map((price) => (
            <li key={price}>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedPrice === price}
                  onChange={() => setSelectedPrice(price)}
                />
                {price}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filters;
