
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, } from "./Routes.js";
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


function App() {

  useEffect(() => {

    Store.dispatch(loadUser());

    // axios.get(`${server}/user/get-user`,{ withCredentials: true }).then((res) => {
    //   console.log(res.data)
    // }).catch((err)=>{
    //   toast.error(err.response.data.message)
    // })

  })

  return (
    <>

      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/sign-up' element={<SignupPage />} />
          <Route exact path='/products' element={<ProductsPage />} />
          <Route exact path='/best-selling' element={<BestSellingPage />} />
          <Route exact path='/events' element={<EventsPage />} />
          <Route exact path='/FAQ' element={<FAQPage />} />
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
