import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom";
import Homepage from "./HomepageComponents/Homepage";

const useAuth = () => {
const {user} = useSelector(state => state.auth);
return user && user.isAdmin
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Homepage />
}

export default ProtectedRoutes