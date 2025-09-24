import "./header.scss";

export default function Header() {
  return (
    <div className="content">
      <img alt="Logo" src="./img/logo_cadastra.svg"></img>
      <button className="icon-button">
        <img alt="Logo" width={22} src="./img/icon.png"></img>
      </button>
    </div>
  );
}
