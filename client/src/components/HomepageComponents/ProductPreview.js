import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Ratings from "../Ratings";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showcaseProducts,
  reset,
} from "../../redux/products/productShowcaseSlice";
import { toast } from "react-toastify";
import { addProduct } from "../../redux/cart/cartSlice";
import { addWishList } from "../../redux/wishList/wishListSlice";
import { config } from "../utils/toastConfig";
import { addToCartHelper, addToWishlistHelper } from "../utils/addingFunc";

const ProductPreview = () => {
  const dispatch = useDispatch();
  const { showcaseProd, loading } = useSelector(
    (state) => state.showcaseProducts
  );
  const { products: cartProducts } = useSelector((state) => state.cart);
  const { products: wishListProducts } = useSelector((state) => state.wishList);
  const { user } = useSelector((state) => state.auth);

  const addToCartHandler = (cartItem) => {
    addToCartHelper(cartItem, user, cartProducts, dispatch);
  };

  const addToWishlistHandler = (product) => {
    addToWishlistHelper(wishListProducts, product, dispatch);
  };

  useEffect(() => {
    dispatch(showcaseProducts());

    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <>
      <div className="grid grid-rows-2 grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1">
        {showcaseProd
          .map((item) => (
            <div className="card-primary  ">
              <Link
                key={item._id}
                to={`/singleProduct/${item._id}`}
                className="h-full"
              >
                {item.sale ? (
                  <span className="bg-p-primary w-14  font-bold text-link-color absolute -left-2 top-2 p-0.5  rounded-r-lg block">
                    Sale
                  </span>
                ) : null}
                <div className="card-img-container">
                  <img src={item.image} className="card-img" />
                </div>
                <div className="card-text-container">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.text}</p>
                  <div className="card-product-desc">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col w-fit">
                        <h5 className="card-cat">
                          Category:
                          <span className="text-p-primary font-normal">
                            {item.category}
                          </span>
                        </h5>
                        <div className="flex">
                          <Ratings value={item.rating} />
                        </div>
                      </div>
                      {item.sale ? (
                        <div className="flex flex-col justify-around items-center">
                          <span className="line-through text-sale-primary">
                            ${item.price}
                          </span>
                          <span className="text-xl text-price-primary">
                            ${item.sale}
                          </span>
                          <span></span>
                        </div>
                      ) : (
                        <span className="text-xl text-price-primary">
                          ${item.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="card-action ">
                <button
                  onClick={() => addToCartHandler(item)}
                  className="btn-primary"
                >
                  Buy Now
                </button>
                <AiOutlineHeart
                  onClick={() => addToWishlistHandler(item)}
                  className="card-fav-icon"
                />
              </div>
            </div>
          ))
          .slice(0, 7)}
        <div className="border-2 border-p-primary m-2 flex justify-center items-center">
          <Link
            to="/allProducts"
            className="cursor-pointer text-4xl text-link-color text-center font-bold hover:text-link-hover transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductPreview;
