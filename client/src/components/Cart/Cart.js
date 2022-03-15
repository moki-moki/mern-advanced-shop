import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateQty } from "../../redux/cart/cartSlice";
const Cart = () => {
  const { products, qty } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItemHandler = (id) => {
    dispatch(removeProduct(id));
  };

  const handleUpdateQty = (item, qty) => {
    dispatch(updateQty({ ...item, qty }));
  };

  // calculate total price
  const getTotalPrice = () =>
    products.reduce((price, item) => {
      if (item.sale) {
        return item.sale * item.qty + price;
      } else {
        return item.price * item.qty + price;
      }
    }, 0);

  return (
    <>
      {qty === 0 ? (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-5xl">Your cart is empty. :(</h1>
        </div>
      ) : (
        <>
          <div className="bg-card-color rounded-xl border-2 border-p-primary flex justify-around items-center p-5 m-3">
            <span className="text-xl">Total: {getTotalPrice()}</span>
            <span className="text-xl">Number of Items: {qty}</span>
          </div>
          <div className="flex flex-col justify-around items-center">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-card-color rounded-xl border-2 border-p-primary flex justify-between items-center p-5 m-3 w-11/12"
              >
                <div className="flex justify-around items-center">
                  <div className="w-52 h-52 mx-2">
                    <img
                      className="h-full w-full"
                      src={
                        item.image.includes("-addedProd")
                          ? `http://localhost:5000/images/${item.image}`
                          : item.image
                      }
                    />
                  </div>
                  <div className="flex justify-around items-center flex-col">
                    <h2 className="text-2xl underline">{item.title}</h2>
                    <div className="w-full flex flex-col items-start justify-between">
                      {item.sale ? (
                        <>
                          <h3>Price</h3>

                          <span className="text-xl text-price-primary">
                            $ {item.sale}
                          </span>
                          <span className="text-sale-primary line-through">
                            $ {item.price}
                          </span>
                        </>
                      ) : (
                        <>
                          <h3>Price:</h3>
                          <span className="text-xl text-price-primary">
                            $ {item.price}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <select
                  className="p-2 rounded-xl border-2 border-p-primary"
                  onChange={(e) => handleUpdateQty(item, e.target.value)}
                >
                  {[...Array(item.inStock).keys()].map((i, idx) => (
                    <option value={i + 1} key={idx}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="btn-primary before:content-['Remove']"
                  onClick={() => removeItemHandler(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
