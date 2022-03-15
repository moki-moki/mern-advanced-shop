import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login, reset } from "../../redux/authSlice";
import { config } from "../utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, success, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error("Wrong credentials...💩", config);
    }

    if (success || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, error, success, message, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(login(data));
  };

  return (
    <div
      style={{ height: "90vh" }}
      className="w-4/5 flex justify-center items-center m-auto"
    >
      <ToastContainer />
      <div className="p-5 w-3/5 h-3/5 flex justify-center items-center flex-col bg-card-color border-2 border-p-primary rounded-xl">
        <h1 className="text-2xl">Login and Shop</h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-around items-center w-full"
        >
          <input
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email here..."
            className="w-full border-2 border-p-primary rounded-xl p-2 m-2 bg-transparent text-p-primary outline-none"
          />
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-p-primary rounded-xl p-2 m-2 bg-transparent text-p-primary outline-none"
            placeholder="Passowrd here..."
          />
          <button
            type="submit"
            className="border-2 border-p-primary rounded-xl my-2 py-2 px-5 text-xl transition-color duration-300 hover:text-link-color"
          >
            Login
          </button>
        </form>
        <h2 className="text-2xl">
          Don't have an account?
          <Link
            to="/register"
            className="text-sub-heading hover:text-link-color transition-color duration-300"
          >
            Register now!
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
