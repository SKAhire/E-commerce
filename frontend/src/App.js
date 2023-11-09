
import {LoginPage, SignupPage} from "./Routes.js";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/sign-up' element={<SignupPage />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
