
import {LoginPage} from "./Routes.js";
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
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
