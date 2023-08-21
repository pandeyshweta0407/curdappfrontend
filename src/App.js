import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import { Route, Routes  } from "react-router-dom";
import Edit from './components/Edit';
import Details from './components/Details';

function App() {
  return (
    <div>
     <Navbar/>     
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route  path="/register" Component={Register} />
      <Route  path="/edit/:id" Component={Edit} />
      <Route  path="/view/:id" Component={Details} />
    </Routes>
    </div>
  );
}

export default App;
