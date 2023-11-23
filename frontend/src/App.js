
import { LoginPage, SignupPage, ActivationPage } from "./Routes.js";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/sign-up' element={<SignupPage />} />
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
