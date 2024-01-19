
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, OrderSuccessPage, ProductDetailsPage, ProfilePage, } from "./Routes.js";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user.js";
import Store from "./redux/store.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { useSelector } from "react-redux";



function App() {
  const { isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {

    Store.dispatch(loadUser());

    // axios.get(`${server}/user/get-user`,{ withCredentials: true }).then((res) => {
    //   console.log(res.data)
    // }).catch((err)=>{
    //   toast.error(err.response.data.message)
    // })

  }, [])

  return (
    <>

      <Router>
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
          <Route exact path='/profile' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route exact path='/activation/:activation_token' element={<ActivationPage />} />
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
