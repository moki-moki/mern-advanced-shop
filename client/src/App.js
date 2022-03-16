import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddProduct from "./components/adminComponents/AddProduct";
import AllProducts from "./components/AllProducts/AllProducts";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Cart from "./components/Cart/Cart";
import Homepage from "./components/HomepageComponents/Homepage";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import WishList from "./components/WishList/WishList";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/addProduct" element={<AddProduct />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
