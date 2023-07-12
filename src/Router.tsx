import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppFrame} from "./frame/AppFrame";
import {SplashScreen} from "./splash-screen/SplashScreen";

export const LemniscataRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/home" element={<AppFrame />} />
            </Routes>
        </BrowserRouter>
    );
}