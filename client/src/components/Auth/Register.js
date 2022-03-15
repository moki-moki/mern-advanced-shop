import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../helpers/authService";
import { toast } from "react-toastify";
import { config } from "../utils/toastConfig";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userStatus, setUserStatus] = useState(false);

  const navigate = useNavigate();

  const validEmail = () => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  const changeHandler = (e) => {
    if (e.target.value === "true") {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validEmail(email)) {
      toast.error("Not a valid email..💩", config);
    } else {
      const data = {
        username,
        email,
        password,
        isAdmin: userStatus,
      };

      authService.register(data);
      toast.success("Successfully registered! Now login please", config);
      navigate("/login");
    }
  };

  return (
    <div
      style={{ height: "90vh" }}
      className="w-4/5 flex justify-center items-center m-auto"
    >
      <div className="p-5 w-3/5 h-3/5 flex justify-center items-center flex-col bg-card-color border-2 border-p-primary rounded-xl">
        <h1 className="text-2xl">Register and Shop</h1>
        <form
          className="flex flex-col justify-around items-center w-full"
          onSubmit={onSubmit}
        >
          <input
            required
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username here..."
            className="w-full border-2 border-p-primary rounded-xl p-2 m-2 bg-transparent text-p-primary outline-none"
            maxLength="20"
            value={username}
          />
          <input
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email here..."
            className="w-full border-2 border-p-primary rounded-xl p-2 m-2 bg-transparent text-p-primary outline-none"
            maxLength="50"
            value={email}
          />
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-p-primary rounded-xl p-2 m-2 bg-transparent text-p-primary outline-none"
            placeholder="Passowrd here..."
            value={password}
          />
          <select
            className="border-2 border-p-primary rounded-xl my-2 p-3"
            onChange={changeHandler}
          >
            <option value={false}>Normal User</option>
            <option value={true}>Admin</option>
          </select>
          <button
            type="submit"
            className="border-2 border-p-primary rounded-xl my-2 py-2 px-5 text-xl transition-color duration-300 hover:text-link-color"
          >
            Register
          </button>
        </form>
        <div>
          <p className="text-2xl text-p-primary">
            Already have an account?
            <Link
              to="/login"
              className="transition-color duration-300 text-sub-heading hover:text-link-hover"
            >
              Back to login.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
