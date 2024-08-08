import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
export default function Cart({
  cart,
  bill,
  paginate,
  handleDecrement,
  handleIncrement,
  handleRemove,
  handleCheckout,
}) {
  const checkCart = cart;
  return checkCart.length === 0 ? (
    <div className="cart-page flex-g">
      <h1>Thank You!!!</h1>
      <h2>There is no products in your cart</h2>
      <h2>Would you like to buy something. Go home</h2>
      <Link
        style={{ textDecoration: "none" }}
        to={`/products/${paginate.page}`}
      >
        <div className="nav-home-buy">Go Home</div>
      </Link>
    </div>
  ) : (
    <div className="cart-page flex-g">
      <h1>SHOPPING CART</h1>
      {cart.map((item) => {
        return (
          <div key={item._id} className="tag-cart flex-g">
            <div className="quantity-img flex-g">
              <img src={item.image} />
              <div className="change-quantity flex-g">
                <div
                  onClick={() => handleDecrement(item._id)}
                  className={item.total === 1 ? "disableBtn" : ""}
                >
                  -
                </div>
                <div>{item.total}</div>
                <div onClick={() => handleIncrement(item._id)}>+</div>
              </div>
            </div>
            <div className="info-tag flex-g">
              <div className="name">{item.name}</div>
              <div className="price">
                <span>$</span>
                {item.price}
              </div>
              <div className="quantity">Amount: {item.quantity}</div>
            </div>
            <div className="bill-price flex-g">
              <span>$</span>
              {item.price * item.total}
              <div className="trash" onClick={() => handleRemove(item._id)}>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        );
      })}
      <div className="checkout-bar">
        <h1>
          Total Bill: <span style={{ color: "rgba(233, 152, 0)" }}>$</span>
          {bill}
        </h1>
        <div className="nav-cart">
          <Link to={`/products/${paginate.page}`}>
            <div className="nav-home">Go Home</div>
          </Link>
          <div className="check-out" onClick={handleCheckout}>
            Check Out!
          </div>
        </div>
      </div>
    </div>
  );
}
