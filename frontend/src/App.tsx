import React from "react";
import "./styles/general.scss";
import { Route, Routes } from "react-router-dom";

//Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//Pages
import SignIn from "./components/Pages/SignIn/SignIn";
import SignUp from "./components/Pages/SignUp/SignUp";
import HotelsPage from "./components/Pages/Hotels/Hotels";
import UsersPage from "./components/Pages/Users/Users";
import HotelDetails from "./components/Pages/HotelDetails/HotelDetails";
import HotelAdd from "./components/Pages/HotelAdd/HotelAdd";

//Parts
import Template from "./components/General/Template/Template";

function App() {
  return (
    <Template>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/" element={<HotelsPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/hotels/add" element={<HotelAdd />} />
      </Routes>
    </Template>
  );
}

export default App;
