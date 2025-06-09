import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignUpNew from "./components/Auth/SignUp/SignUpNew";
import Login from "./components/Auth/LogIn/Login";
import DashboardFounder from "./components/Founder/Dashboard/Dashboard";
import DashboardTalent from "./components/GetDiscovered/Dashboard/Dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ForgotPass from "./components/Auth/ForgotPass/ForgotPass";

const App = () => {
    const checkBackend = async () => {
        try {
            await fetch("http://localhost:3333/api/health");
        } catch (err) {
            console.log("Backend is not ready yet");
            setTimeout(checkBackend, 1000);
        }
    };

    // const navigate = useNavigate();
    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const res = await fetch(
    //                 "http://localhost:3333/api/auth/protected",
    //                 {
    //                     credentials: "include", // sends cookies!
    //                 }
    //             );
    //             if (res.ok) {
    //                 // Token is valid, redirect to dashboard
    //                 navigate("/dashboard-founder");
    //             } else {
    //                 // stay on login page
    //             }
    //         } catch (error) {
    //             console.error("Auth check failed:", error);
    //         }
    //     };

    //     checkAuth();
    // }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signupnew" element={<SignUpNew />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
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
