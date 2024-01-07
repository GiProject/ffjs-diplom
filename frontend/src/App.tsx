import React from 'react';
import './App.css';
import Header from "./components/page.blocks/header";
import Sidebar from "./components/page.blocks/sidebar";
import Content from "./components/page.blocks/content";
import Logo from "./components/page.blocks/logo";
import Navigation from "./components/page.blocks/navigation";
import HeaderNav from "./components/page.blocks/header.nav";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HotelSearch from "./components/page.blocks/hotel/hotel.search";
import {Route, Routes} from "react-router-dom";
import Test from "./components/page.blocks/test";
import LoginPage from "./components/page.blocks/login.page";
import RegistrationPage from "./components/page.blocks/registration.page";
import UsersPage from "./components/page.blocks/UsersPage";


function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <Header>
                        <Logo></Logo>
                        <HeaderNav></HeaderNav>
                    </Header>
                    <div className="content-container">
                        <Sidebar>
                            <Navigation></Navigation>
                        </Sidebar>
                        <Content>
                            <Routes>
                                <Route path="/" element={<HotelSearch/>}/>
                                <Route path="/test" element={<Test/>}/>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/registration" element={<RegistrationPage/>}/>
                                <Route path="/users" element={<UsersPage/>}/>
                            </Routes>
                        </Content>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
