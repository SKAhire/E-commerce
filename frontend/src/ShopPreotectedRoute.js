import { Navigate } from "react-router-dom"

const ShopProtectedRoute = ({isShopAuthenticated, children}) => {
    if(!isShopAuthenticated){
        return <Navigate to="/shop-login" replace />
    }
    return children
}

export default ShopProtectedRoute;