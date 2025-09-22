import "./home.scss";
import Header from "../../components/Header/header";
import ListProducts from "../../components/List-Products/list-products";

export default function Home() {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <ListProducts />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
