import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./components/Auth/SignUp/SignUp";
import Login from "./components/Auth/LogIn/Login";
import DashboardFounder from "./components/Founder/Dashboard/Dashboard";
import DashboardTalent from "./components/GetDiscovered/Dashboard/Dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/dashboard-founder"
                element={
                    <PrivateRoute>
                        <DashboardFounder />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboad-getDiscovered"
                element={
                    <PrivateRoute>
                        <DashboardTalent />
                    </PrivateRoute>
                }
            />
            
        </Routes>
    );
};

export default App;