import { useState, useRef, useEffect } from "react";
import "./order.scss";

type Props = {
  placeholder: string;
  setOrder: (
    value: "Mais Recente" | "Menor Preço" | "Maior Preço" | ""
  ) => void;
};

export default function Order({ placeholder, setOrder }: Props) {
  const options = ["Mais Recente", "Menor Preço", "Maior Preço"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectOrder = (option: string) => {
    if (selected === option) {
      setSelected(null);
      setIsOpen(false);
      setOrder("");
    } else {
      setSelected(option);
      setIsOpen(false);
      setOrder(option as "Mais Recente" | "Menor Preço" | "Maior Preço" | "");
    }
  };

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        {selected ? selected : placeholder}
        <img alt="Arrow" src="./img/arrow_down.svg"></img>
      </div>

      {isOpen && (
        <ul className="options">
          {options.map((option, index) => (
            <li
              key={index}
              className={selected === option ? "selected" : ""}
              onClick={() => selectOrder(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
