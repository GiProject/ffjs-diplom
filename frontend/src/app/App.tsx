import React from "react";
import "@/shared/styles/general.scss";
import { Route, Routes } from "react-router-dom";

//Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//Pages
import HotelsPage from "../pages/Hotels/Hotels";
import UsersPage from "../pages/Users/Users";
import HotelDetails from "../pages/HotelDetails/HotelDetails";
import HotelAdd from "../pages/HotelAdd/HotelAdd";

//Parts
import Template from "../widgets/Template/Template";
import ReduxProvider from "../shared/providers/ReduxProvider";
import HotelUpdate from "@/pages/HotelUpdate/HotelUpdate";

function App() {
  return (
    <ReduxProvider>
      <Template>
        <Routes>
          <Route path="/" element={<HotelsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/hotels/:id/update" element={<HotelUpdate />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/hotels/add" element={<HotelAdd />} />
        </Routes>
      </Template>
    </ReduxProvider>
  );
}

export default App;
