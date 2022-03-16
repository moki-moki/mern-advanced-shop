import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProduct } from "../../redux/products/singleProductSlice";
import Loader from "../Loader";
import Ratings from "../Ratings";
import { addToCartHelper } from "../utils/addingFunc";

const SingleProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.singleProduct);
  const { user } = useSelector((state) => state.auth);
  const { products: cartProducts } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(singleProduct(id));
  }, [dispatch]);

  const addToCartHandler = (cartItem) => {
    addToCartHelper(cartItem, user, cartProducts, dispatch);
  };

  return (
    <>
      {product.product === undefined ? (
        <Loader />
      ) : (
        <div className="flex  sm:flex-col xsm:flex-col ">
          <div className="w-1/2 sm:w-auto xsm:w-auto m-5">
            <div className="">
              <img
                src={
                  product.product.image.includes("-addedProd")
                    ? `http://localhost:5000/images/${product.product.image}`
                    : product.product.image
                }
              />
            </div>
          </div>
          <div className="w-1/2 sm:w-auto xsm:w-auto h-fit border-2 border-p-primary m-5 p-3 flex flex-col ">
            <div>
              <h2 className="border-b-2 border-p-primary text-4xl">
                {product.product.title}
              </h2>
              <p>{product.product.text}</p>
            </div>
            <div className="flex flex-col justify-between item-start my-5">
              <div>
                {product.product.sale ? (
                  <div className="flex flex-col justify-around ">
                    <span className="line-through text-sale-primary">
                      ${product.product.price}
                    </span>
                    <span className="text-xl text-price-primary">
                      <span className="text-2xl text-p-primary font-bold">
                        Price:
                      </span>
                      ${product.product.sale}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl text-price-primary">
                    <span className="text-2xl text-p-primary font-bold">
                      Price:
                    </span>
                    ${product.product.price}
                  </span>
                )}
              </div>
              <div>
                <h5 className="card-cat">
                  Category:
                  <span className="text-p-primary font-normal">
                    {product.product.category}
                  </span>
                </h5>
              </div>
              <div className="w-fit flex">
                <Ratings value={product.product.rating} />
              </div>
              <div>
                <button
                  onClick={() => addToCartHandler(product.product)}
                  className="btn-primary my-5"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
