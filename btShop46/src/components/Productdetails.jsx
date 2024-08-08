/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { getItemProduct } from "../redux_toolkit/middlewares/shopMiddleware";
// eslint-disable-next-line react/prop-types
export default function Productdetails({ paginate, addToCart }) {
  const details = useSelector((state) => state.shop.details);
  const statusDetails = useSelector((state) => state.shop.statusDetails);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getItemProduct(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="details">
      {statusDetails === "pending" ? (
        <SyncLoader
          style={{ position: "absolute", left: "50%", top: "50%" }}
          color="rgba(233, 152, 0)"
        />
      ) : (
        statusDetails === "success" && (
          <div className="detail-item flex-g">
            <img src={details.data.image} />
            <div className="info-item flex-g">
              <h1 className="brand">{details.data.brand}</h1>
              <h2 className="name">{details.data.name}</h2>
              <p className="description">{details.data.description}</p>
              <div>category: {details.data.category}</div>
              <div className="nav-buttons">
                <Link to={`/products/${paginate.page}`}>
                  <button>Go home</button>
                </Link>
                <div className="add-to-cart flex-g">
                  <div className="price">
                    <span>$</span>
                    {details.data.price}
                  </div>
                  <button onClick={() => addToCart(details.data._id)}>
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
