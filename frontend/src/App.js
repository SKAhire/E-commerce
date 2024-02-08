
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, OrderSuccessPage, ProductDetailsPage, ProfilePage, CheckoutPage, PaymentPage, OrderDetailsPage, TrackOrderPage, UserInboxPage, } from "./Routes/Routes.js";
import { ShopCreatePage, ShopActivationPage, ShopLoginPage, ShopHomePage, ShopDashboardPage, ShopCreateProductPage, ShopAllPRoducts, ShopCreateEvent, ShopAllEvents, ShopAllCoupons, ShopPreviewPage, ShopAllOrders, ShopOrderDetails, ShopAllRefunds, ShopSettingsPage, ShopWithDrawMoneyPage, ShopInboxPage, } from './Routes/ShopRoutes.js'
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
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import axios from "axios";
import { server } from "./server.js";

function App() {

  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {


    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey()

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
          <Route exact path='/product/:id' element={<ProductDetailsPage />} />
          <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
          <Route exact path='/order/success' element={<OrderSuccessPage />} />
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
          <Route exact path='/inbox' element={
            <ProtectedRoute>
              <UserInboxPage />
            </ProtectedRoute>
          } />
          <Route exact path='/activation/:activation_token' element={<ActivationPage />} />

          {/* shop routes */}
          <Route exact path='/shop/activation/:activation_token' element={<ShopActivationPage />} />
          <Route exact path='/shop-create' element={<ShopCreatePage />} />
          <Route exact path='/shop-login' element={<ShopLoginPage />} />
          <Route exact path='/shop/preview/:id' element={<ShopPreviewPage />} />
          <Route
          path="/settings"
          element={
            <ShopProtectedRoute>
              <ShopSettingsPage />
            </ShopProtectedRoute>
          }
        />
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
          <Route exact path='/dashboard-coupons' element={
            <ShopProtectedRoute>
              <ShopAllCoupons />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard-orders' element={
            <ShopProtectedRoute>
              <ShopAllOrders />
            </ShopProtectedRoute>
          } />
          <Route exact path='/order/:id' element={
            <ShopProtectedRoute>
              <ShopOrderDetails />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard-refunds' element={
            <ShopProtectedRoute>
              <ShopAllRefunds />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard-withdraw-money' element={
            <ShopProtectedRoute>
              <ShopWithDrawMoneyPage />
            </ShopProtectedRoute>
          } />
          <Route exact path='/dashboard-messages' element={
            <ShopProtectedRoute>
              <ShopInboxPage />
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
