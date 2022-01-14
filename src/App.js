import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/home.component';
import Nav from "./components/nav.component";
import Login from './Login';
import Register from "./Register";
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="App">
        {/* <div class="auth-wrapper"> */}
        {/* <div class="auth-inner"> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
        {/* </div> */}
        {/* </div> */}
        {/* <Register /> */}
      </main>
    </BrowserRouter>
  );
}

export default App;
