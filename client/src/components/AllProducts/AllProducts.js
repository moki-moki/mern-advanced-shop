import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Ratings from "../Ratings";
import Filters from "./Filters";
import "react-toastify/dist/ReactToastify.css";
import { Link, useSearchParams } from "react-router-dom";
import { deleteProduct } from "../adminComponents/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  showcaseProducts,
} from "../../redux/products/productShowcaseSlice";
import Loader from "../Loader";
import { addToCartHelper, addToWishlistHelper } from "../utils/addingFunc";
import { RiDeleteBinLine } from "react-icons/ri";

const AllProducts = () => {
  const [toggleCat, setToggleCat] = useState(false);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const currParams = searchParams.has("category");

  /* SELECTORS */
  const { showcaseProd, loading, error, message } = useSelector(
    (state) => state.showcaseProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { products: cartProducts } = useSelector((state) => state.cart);
  const { products: wishListProducts } = useSelector((state) => state.wishList);

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState();

  /* TODO: Make sort params concat with category params! */
  useEffect(() => {
    setSearchParams({
      ["category"]: Object.values(filter),
    });
  }, [filter, searchParams]);

  useEffect(() => {
    // Check if there is current params
    if (currParams) {
      setSearchParams({
        ["sort"]: sort,
        ["category"]: Object.values(filter),
      });
    } else {
      setSearchParams({ ["sort"]: sort });
    }
  }, [sort, searchParams]);

  /* Main Function */
  useEffect(() => {
    if (error) {
      console.log(message);
    }

    // Set params on current filter state
    dispatch(showcaseProducts(searchParams));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, searchParams, setSearchParams]);

  /* Sets query filters then search params sets them */
  const filterParams = (e) => {
    if (e.target.checked) {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    } else {
      // Delete unchecks
      delete filter[e.target.name];
      setFilter({ ...filter });
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    console.log(sort);
  };

  /* Cart functionality only below */
  const addToCartHandler = (cartItem) => {
    addToCartHelper(cartItem, user, cartProducts, dispatch);
  };

  const addToWishlistHandler = (product) => {
    addToWishlistHelper(wishListProducts, product, dispatch);
  };

  const deleteProductHandler = (id, token) => {
    deleteProduct(id, token);
  };

  return (
    <>
      <button
        className="hidden h-fit md:block sm:block xsm:block my-1 mx-3 p-2 border-2 border-p-primary "
        onClick={() => setToggleCat(!toggleCat)}
      >
        Filters
      </button>

      <div className="flex">
        <Filters
          filterParams={filterParams}
          toggleCat={toggleCat}
          setSearchParams={setSearchParams}
          handleSort={handleSort}
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-5/6   grid grid-cols-3 grid-rows-1 md:w-full md:grid-cols-2 sm:grid-cols-2 sm:w-full xsm:grid-cols-1 xsm:w-full ">
            {showcaseProd.map((item) => (
              <div className="card-primary" key={item._id}>
                {/* ICON FOR DELETING IF USER IS ADMIN */}
                {user && user.isAdmin ? (
                  <span
                    className="p-3 bg-p-primary border-2 border-link-color rounded-full text-link-color block absolute right-0.5 top-0.5 hover:border-link-hover hover:text-link-hover transition-colors duration-300"
                    onClick={() =>
                      deleteProductHandler(item._id, user.accessToken)
                    }
                  >
                    <RiDeleteBinLine />
                  </span>
                ) : null}
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
                    <img
                      src={
                        item.image.includes("-addedProd")
                          ? `http://localhost:5000/images/${item.image}`
                          : item.image
                      }
                      className="card-img"
                    />
                  </div>
                  <div className="card-text-container">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.text.slice(0, 200)}...</p>
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
        )}
      </div>
    </>
  );
};

export default AllProducts;
