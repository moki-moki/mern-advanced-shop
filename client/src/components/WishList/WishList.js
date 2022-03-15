import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCartHelper } from "../utils/addingFunc";
import Ratings from "../Ratings";
import { AiOutlineDelete } from "react-icons/ai";
import { removeWishList } from "../../redux/wishList/wishListSlice";
const WishList = () => {
  const { products } = useSelector((state) => state.wishList);
  const { products: cartProducts } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem) => {
    addToCartHelper(cartItem, user, cartProducts, dispatch);
  };

  const removeWishListHandler = (id) => {
    dispatch(removeWishList(id));
  };

  return (
    <div>
      {products.length === 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Your wish list is empty :(</h1>
        </div>
      ) : (
        <div className="   grid grid-cols-3 grid-rows-1 md:w-full md:grid-cols-2 sm:grid-cols-2 sm:w-full xsm:grid-cols-1 xsm:w-full">
          {products.map((item) => (
            <div className="card-primary" key={item._id}>
              <span
                onClick={() => removeWishListHandler(item._id)}
                className="absolute top-1 right-1 border-2 border-link-color rounded-full bg-p-primary text-link-color p-1.5 text-xl cursor-pointer hover:text-link-hover hover:border-link-hover duration-300 transition-colors"
              >
                <AiOutlineDelete />
              </span>
              <Link
                to={`/singleProduct/${item._id}`}
                className="h-full flex flex-col"
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
                  className="btn-primary z-20"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
