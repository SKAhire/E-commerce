
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, OrderSuccessPage, ProductDetailsPage, ProfilePage, CheckoutPage, PaymentPage, } from "./Routes/Routes.js";
import { ShopCreatePage, ShopActivationPage, ShopLoginPage, ShopHomePage, ShopDashboardPage, ShopCreateProductPage, ShopAllPRoducts, ShopCreateEvent, ShopAllEvents, } from './Routes/ShopRoutes.js'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { loadShop, loadUser } from "./redux/actions/user.js";
import Store from "./redux/store.js";
import ProtectedRoute from "./Routes/ProtectedRoute.js";
import ShopProtectedRoute from "./Routes/ShopPreotectedRoute.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


function App() {

  const [stripeApikey, setStripeApiKey] = useState("");



  useEffect(() => {

    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
    setStripeApiKey("somerandomtext")

    // axios.get(`${server}/user/get-user`,{ withCredentials: true }).then((res) => {
    //   console.log(res.data)
    // }).catch((err)=>{
    //   toast.error(err.response.data.message)
    // })

  }, [])

  return (
    <>
      <Router>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/sign-up' element={<SignupPage />} />
          <Route exact path='/best-selling' element={<BestSellingPage />} />
          <Route exact path='/products' element={<ProductsPage />} />
          <Route exact path='/product/:name' element={<ProductDetailsPage />} />
          <Route exact path='/order/success/:name' element={<OrderSuccessPage />} />
          <Route exact path='/events' element={<EventsPage />} />
          <Route exact path='/FAQ' element={<FAQPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route exact path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route exact path='/activation/:activation_token' element={<ActivationPage />} />

          {/* shop routes */}
          <Route exact path='/shop/activation/:activation_token' element={<ShopActivationPage />} />
          <Route exact path='/shop-create' element={<ShopCreatePage />} />
          <Route exact path='/shop-login' element={<ShopLoginPage />} />
          <Route exact path='/shop/:id' element={
            <ShopProtectedRoute>
              <ShopHomePage />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard' element={
            <ShopProtectedRoute>
              <ShopDashboardPage />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard-create-product' element={
            <ShopProtectedRoute>
              <ShopCreateProductPage />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard-products' element={
            <ShopProtectedRoute>
              <ShopAllPRoducts />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard-create-event' element={
            <ShopProtectedRoute>
              <ShopCreateEvent />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard-events' element={
            <ShopProtectedRoute>
              <ShopAllEvents />
            </ShopProtectedRoute>
          } />


        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>

    </>
  );
}

export default App;
