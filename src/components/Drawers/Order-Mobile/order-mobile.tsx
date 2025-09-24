import { useEffect, useState } from "react";

interface Props {
  setOrder: (
    order: "Mais Recente" | "Menor Preço" | "Maior Preço" | ""
  ) => void;
}

export default function OrderMobile({ setOrder }: Props) {
  const [orderTopic, setOrderTopic] = useState<string>("");

  useEffect(() => {
    activeOrders(orderTopic);
  }, [orderTopic]);

  function activeOrders(e: string) {
    if (e) {
      setOrder(e as "Mais Recente" | "Menor Preço" | "Maior Preço" | "");
      document.body.classList.remove("drawer-order-open");
    } else {
      setOrderTopic("");
    }
  }

  return (
    <div className="drawer drawer-order">
      <div className="head">
        <span>ORDENAR</span>
        <button
          className="close"
          onClick={() => document.body.classList.remove("drawer-order-open")}
        >
          x
        </button>
      </div>
      <div>
        <button className="topic" onClick={() => setOrderTopic("Mais Recente")}>
          <span>Mais Recentes</span>
        </button>

        <button className="topic" onClick={() => setOrderTopic("Maior Preço")}>
          <span>Maior Preço</span>
        </button>

        <button className="topic" onClick={() => setOrderTopic("Menor Preço")}>
          <span>Menor Preço</span>
        </button>
      </div>
    </div>
  );
}
