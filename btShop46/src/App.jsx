import Products from "./components/Products";
import Cart from "./components/Cart";
import Productdetails from "./components/Productdetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function App() {
  const totalItem = 25000;
  let itemPerPage = 1000;
  const totalPage = Math.ceil(totalItem / itemPerPage);
  const [paginate, setPaginate] = useState({
    page: 1,
    itemPerPage: itemPerPage,
  });
  const navigate = useNavigate();
  const handlePageClick = (e) => {
    setPaginate({ ...paginate, page: e.selected + 1 });
    navigate(`/products/${e.selected + 1}`);
  };
  //
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [bill, setBill] = useState(0);
  const [notice, setNotice] = useState(0);
  const { data } = useSelector((state) => state.shop.productsList);

  const addToCart = (id) => {
    const isInCart = cart.find((item) => {
      return item._id === id;
    });
    if (!isInCart) {
      const newItem = data.listProduct.find((item) => item._id === id);
      const cloneItem = JSON.parse(JSON.stringify(newItem));
      cloneItem.total = 1;
      cloneItem.quantity -= 1;
      setCart([...cart, cloneItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, cloneItem]));
    } else if (isInCart) {
      const oldItem = cart.map((item) => {
        if (item._id === id) {
          item.total += 1;
          item.quantity -= 1;
        }
        return item;
      });
      setCart(oldItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  const handleDecrement = (id) => {
    const decrement = cart.map((item) => {
      if (item._id === id) {
        item.total -= 1;
        item.quantity += 1;
      }
      return item;
    });
    setCart(decrement);
    localStorage.setItem("cart", JSON.stringify(decrement));
  };
  const handleIncrement = (id) => {
    const increment = cart.map((item) => {
      if (item._id === id) {
        item.total += 1;
        item.quantity -= 1;
      }
      return item;
    });
    setCart(increment);
    localStorage.setItem("cart", JSON.stringify(increment));
  };
  const showTotalBill = () => {
    const arrBillItem = cart.map((item) => {
      return item.price * item.total;
    });
    return arrBillItem.reduce((a, b) => a + b, 0);
  };
  const showNoticeCart = () => {
    const arrItemQuantity = cart.map((item) => {
      return item.total;
    });
    return arrItemQuantity.reduce((a, b) => a + b, 0);
  };
  useEffect(() => {
    setBill(showTotalBill());
    setNotice(showNoticeCart());
  }, [cart.total, cart.quantity, cart]);
  const handleRemove = (id) => {
    if (confirm("Do you want to remove product?")) {
      const afterRemove = cart.filter((item) => {
        return item._id !== id;
      });
      setCart(afterRemove);
      localStorage.setItem("cart", JSON.stringify(afterRemove));
    }
  };
  const handleCheckout = () => {
    if (confirm("take a bill?")) {
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
    }
  };
  return (
    <div className="app-shop">
      <div className="header">
        <Link to={`/products/${paginate.page}`}>
          <div className="logo-home">
            <i
              className="fa-solid fa-shop"
              style={{ color: "#fff", fontSize: "30px" }}
            ></i>
          </div>
        </Link>
        <h1 className="title-header">Welcome to Shop</h1>
        <Link to={"/cart"}>
          <div className="cart">
            <i
              className="fa-solid fa-bag-shopping"
              style={{ color: "#ffffff", fontSize: "30px" }}
            ></i>
            <span className="info-cart">{!notice ? "" : notice}</span>
          </div>
        </Link>
      </div>
      {/*  */}
      <Routes>
        <Route
          path="/products/:page"
          element={
            <Products
              totalPage={totalPage}
              paginate={paginate}
              handlePageClick={handlePageClick}
              addToCart={addToCart}
            />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              handleCheckout={handleCheckout}
              cart={cart}
              bill={bill}
              paginate={paginate}
              handleRemove={handleRemove}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
            />
          }
        ></Route>
        <Route
          path="/details/:id"
          element={<Productdetails paginate={paginate} addToCart={addToCart} />}
        ></Route>
      </Routes>
    </div>
  );
}
