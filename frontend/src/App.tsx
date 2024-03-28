import React from "react";
import "./styles/general.scss";
import { Route, Routes } from "react-router-dom";

//Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//Pages
import HotelsPage from "./components/Pages/Hotels/Hotels";
import UsersPage from "./components/Pages/Users/Users";
import HotelDetails from "./components/Pages/HotelDetails/HotelDetails";
import HotelAdd from "./components/Pages/HotelAdd/HotelAdd";

//Parts
import Template from "./components/General/Template/Template";
import ReduxProvider from "./providers/ReduxProvider";

function App() {
  return (
    <ReduxProvider>
      <Template>
        <Routes>
          <Route path="/" element={<HotelsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/hotels/add" element={<HotelAdd />} />
        </Routes>
      </Template>
    </ReduxProvider>
  );
}

export default App;
