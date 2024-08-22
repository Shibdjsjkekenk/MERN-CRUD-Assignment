import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import Edit from "./pages/Edit/Edit"
import Profile from "./pages/Profile/Profile"


function App() {
  return (
    <>

   
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/userprofile/:id" element={<Profile />} />
     
      </Routes>


    </>
  );
}

export default App;
