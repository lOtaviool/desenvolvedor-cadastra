import { Product } from "../../ts/Product";

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
        <p className="product-price">{product?.price}</p>
        {/* <p className="product-installment">{installment}</p> */}
      </div>

      <button className="product-button" onClick={onClickBuy}>
        COMPRAR
      </button>
    </div>
  );
}
