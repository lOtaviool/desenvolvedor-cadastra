import "./home.scss";
import Header from "../../components/Header/header";
import ListProducts from "../../components/List-Products/list-products";
import Footer from "../../components/Footer/footer";

export default function Home() {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <ListProducts />
      </div>
      <Footer />
    </div>
  );
}
