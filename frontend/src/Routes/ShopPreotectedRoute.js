import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";

const ShopProtectedRoute = ({ children }) => {
    const { isLoading, isShopAuthenticated } = useSelector((state) => state.shop)

    if (isLoading === true) {
        return (
            <Loader />
        )
    } else {
        if (!isShopAuthenticated) {
            return <Navigate to="/shop-login" replace />
        }
        return children
    }

}

export default ShopProtectedRoute;