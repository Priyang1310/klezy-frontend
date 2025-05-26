// components/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        
        const verifyToken = async () => {
            try {
                const res = await fetch(`http://po004oocgkg4gsg8s8w4o8cc.62.72.13.232.sslip.io/api/auth/protected`, {
                    method: "GET",
                    credentials: "include", // include cookies
                });

                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;