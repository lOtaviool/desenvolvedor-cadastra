import { Product } from "../../ts/Product";
import "./product-card.scss";

function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

interface Props {
  product: Product;
  onClickBuy: () => void;
}

export default function ProductCard({ product, onClickBuy }: Props) {
  return (
    <div className="product-card">
      <img src={product?.image} alt={product?.name} className="product-image" />

      <div className="product-info">
        <h4 className="product-title">{product?.name}</h4>
        <p className="product-price">{formatMoney(product?.price)}</p>
        <p className="product-installment">{`até ${
          product?.parcelamento[0]
        }x de ${formatMoney(product?.parcelamento[1])}`}</p>
      </div>

      <button className="product-button" onClick={onClickBuy}>
        COMPRAR
      </button>
    </div>
  );
}
