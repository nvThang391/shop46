/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { getProducts } from "../redux_toolkit/middlewares/shopMiddleware";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

export default function Products({
  totalPage,
  paginate,
  handlePageClick,
  addToCart,
}) {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.shop.productsList);
  const status = useSelector((state) => state.shop.status);
  const params = useParams();

  useEffect(() => {
    dispatch(
      getProducts({ page: params.page, itemPerPage: paginate.itemPerPage })
    );
  }, [dispatch, paginate.itemPerPage, params.page]);
  //

  return (
    <div className="products-shop flex-g">
      <h1 className="title-items flex-g">PRODUCTS</h1>
      {status === "pending" ? (
        <SyncLoader color="rgba(233, 152, 0)" />
      ) : (
        status === "success" && (
          <>
            <div className="list-item">
              {productsList.data.listProduct &&
                productsList.data.listProduct.map(
                  ({ _id, name, price, image }) => (
                    <div className="item flex-g" key={_id}>
                      <div>
                        <Link to={`/details/${_id}`}>
                          <img src={image} />
                        </Link>
                      </div>
                      <h3 className="item-name">{name}</h3>
                      <div className="buy flex-g">
                        <div className="price">
                          <span className="unit">$</span>
                          {price}
                        </div>
                        <div
                          onClick={() => addToCart(_id)}
                          className="add-cart"
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </>
        )
      )}
      {status === "success" && (
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
}
