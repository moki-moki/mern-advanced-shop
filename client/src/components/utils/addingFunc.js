import { toast } from "react-toastify";
import { addProduct } from "../../redux/cart/cartSlice";
import { addWishList } from "../../redux/wishList/wishListSlice";
import { config } from "./toastConfig";

export const addToWishlistHelper = (wishListProducts, product, dispatch) => {
  if (wishListProducts.filter((i) => i._id === product._id).length > 0) {
    toast.error("Item is already in the wish list 😑", config);
  } else {
    toast.success("Item added to the wish list 😀", config);
    dispatch(addWishList({ ...product }));
  }
};

export const addToCartHelper = (cartItem, user, cartProducts, dispatch) => {
  if (user) {
    if (cartProducts.filter((i) => i._id === cartItem._id).length > 0) {
      toast.error("Item is already in the cart 😑", config);
    } else {
      toast.success("Item added to the cart 😀", config);
      dispatch(addProduct({ ...cartItem, qty: 1 }));
    }
  } else {
    toast.warning("Please login... 🤔", config);
  }
};
