import Carousel from "./Carousel";
import HomepageCards from "./HomepageCards";
import LogoSliders from "./LogoSliders";
import { AiOutlineHeart } from "react-icons/ai";
import ProductPreview from "./ProductPreview";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { previewProducts, reset } from "../../redux/products/productSlice";
import Ratings from "../Ratings";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { config } from "../utils/toastConfig";
import { Link } from "react-router-dom";
import { addToCartHelper, addToWishlistHelper } from "../utils/addingFunc";

const Homepage = () => {
  const dispatch = useDispatch();

  const { products, error, loading } = useSelector(
    (state) => state.previewProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { products: cartProducts } = useSelector((state) => state.cart);
  const { products: wishListProducts } = useSelector((state) => state.wishList);

  useEffect(() => {
    if (!error) {
      dispatch(previewProducts());
    } else {
      toast.error("Something went wrong", config);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const addToCartHandler = (cartItem) => {
    addToCartHelper(cartItem, user, cartProducts, dispatch);
  };

  const addToWishlistHandler = (product) => {
    addToWishlistHelper(wishListProducts, product, dispatch);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <Carousel />
          </header>
          {/* Cards */}
          <HomepageCards />
          {/* Logo slider */}
          <LogoSliders />
          {/* Featured Products */}
          <div className="w-full my-10 mx-auto grid gap-2 grid-rows-1 grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 ">
            {products.map((item) => (
              <div key={item._id} className="card-primary">
                <Link to={`/singleProduct/${item._id}`} className="h-full">
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
            ))}
          </div>

          {/* PRODUCT PREVIEWS */}
          <main className="border-t-2 border-p-primary">
            <h2 className="text-4xl mx-3">Preview Products:</h2>
            <ProductPreview />
          </main>
        </>
      )}
    </>
  );
};

export default Homepage;
