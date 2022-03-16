import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillFileAdd,
} from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";

const Navbar = () => {
  const links = [
    {
      name: "Home",
      link: "/",
      id: 1,
    },
    {
      name: "All Products",
      link: "/allProducts",
      id: 2,
    },

    {
      name: <AiOutlineShoppingCart />,
      link: "/cart",
      id: 3,
      shop: true,
    },

    {
      icon: <AiOutlineHeart />,
      name: "Wish list",
      link: "/wishList",
      id: 4,
      wish: true,
    },
  ];

  const adminLinks = [
    {
      name: "Home",
      link: "/",
      id: 1,
    },
    {
      name: "All Products",
      link: "/allProducts",
      id: 2,
    },

    {
      name: <AiOutlineShoppingCart />,
      link: "/cart",
      id: 3,
      shop: true,
    },

    {
      icon: <AiOutlineHeart />,
      name: "Wish list",
      link: "/wishList",
      id: 4,
      wish: true,
    },
    {
      name: "Add Product",
      icon: <AiFillFileAdd />,
      link: "/addProduct",
      id: 5,
    },
    {
      name: "Manage Users",
      icon: <RiUserSettingsLine />,
      link: "/listUsers",
      id: 6,
    },
  ];

  const [toggleNav, setToggleNav] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { qty } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.wishList);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="w-full relative z-10 bg-primary h-16 border-b-2 border-p-primary">
      <div className="w-full h-full flex justify-between items-center">
        {user ? (
          <div className="w-1/2 sm:w-1/2 md:w-2/5 lg:w-1/3 text-center">
            <button
              onClick={handleSignOut}
              className="text-xl text-p-primary  text-center hover:text-link-color transition-color duration-300"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="w-1/2 sm:w-1/2 md:w-2/5 lg:w-1/3 text-center">
            <Link
              to="/login"
              className="text-xl hover:text-link-color duration-300   text-p-primary  text-center"
            >
              Login / Register
            </Link>
          </div>
        )}
        {/* hamburger for ADMIN! */}
        {user && user.isAdmin ? (
          <div className=" sm:w-1/2 xsm:w-1/2 w-1/3 flex justify-center ">
            <div
              className={`flex flex-col w-8  justify-around h-6  ${
                !toggleNav ? "rotate-90" : "rotate-0"
              } transition-all duration-200 ease-linear`}
              onClick={() => setToggleNav(!toggleNav)}
            >
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
            </div>
          </div>
        ) : (
          <div className="w-1/2  hidden sm:flex sm:justify-center xsm:flex xsm:justify-center z-10 cursor-pointer">
            {" "}
            <div
              className={`flex flex-col w-8 justify-around h-6   ${
                !toggleNav ? "rotate-90" : "rotate-0"
              } transition-all duration-200 ease-linear`}
              onClick={() => setToggleNav(!toggleNav)}
            >
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
            </div>
          </div>
        )}
        {/* Links */}
        {user && user.isAdmin ? (
          <ul
            className={`w-1/2 h-screen fixed text-xl flex flex-col justify-around items-center top-0 right-0 bg-card-color transition-transform duration-300 ${
              toggleNav ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <div
              className={`flex flex-col w-8 z-20 justify-around h-6 absolute top-4 left-4  ${
                !toggleNav ? "rotate-90" : "rotate-0"
              } transition-all duration-200 ease-linear`}
              onClick={() => setToggleNav(!toggleNav)}
            >
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
              <span className={`block w-full h-0.5 bg-p-primary`}></span>
            </div>
            {adminLinks.map((link) => (
              <Link
                to={link.link}
                key={link.id}
                className="hover:text-link-color duration-300 transition-colors"
                onClick={() => setToggleNav(!toggleNav)}
              >
                <li className="flex items-center">
                  {link.name}
                  <span className="ml-1">{link.icon}</span>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <ul className=" sm:w-0 xsm:w-0 md:w-3/5 lg:w-2/3 w-2/3 flex justify-evenly ">
            <li
              className={` bg-primary sm:border-l-2 sm:border-p-primary flex justify-around items-center w-full sm:flex-col sm:fixed sm:top-0 sm:right-0 sm:h-full sm:w-1/2 sm:justify-evenly xsm:flex-col xsm:fixed xsm:top-0 xsm:right-0 xsm:h-full xsm:justify-evenly xsm:w-4/5 xsm:border-p-primary xsm:border-l-2 transition-translate duration-200 ease-linear ${
                toggleNav ? "sm:translate-x-full" : "sm:translate-x-0"
              }
            ${toggleNav ? "xsm:translate-x-full" : "xsm:translate-x-0"}
            `}
            >
              {/* NORMAL USER LINKS */}
              {links.map((link) => {
                return (
                  <div key={link.id} className="relative">
                    <Link
                      className="text-p-primary text-xl hover:text-link-color transition-colors duration-200 ease-in flex items-center"
                      to={link.link}
                    >
                      {link.name}
                      {link.wish ? (
                        <>
                          <div className="w-5 h-5 text-lg rounded-full bg-sub-heading flex justify-center items-center absolute -top-1 -right-2 ">
                            {products.length}
                          </div>
                          <span className="inline-block">{link.icon}</span>
                        </>
                      ) : null}
                      {link.shop ? (
                        <div className="w-5 text-lg h-5 rounded-full bg-sub-heading flex justify-center items-center absolute -top-3 -right-2">
                          {qty}
                        </div>
                      ) : null}
                    </Link>
                  </div>
                );
              })}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
