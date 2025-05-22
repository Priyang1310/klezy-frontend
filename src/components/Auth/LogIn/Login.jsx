import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import vector2 from "../../../assets/Home/Vector11.svg";
import vector1 from "../../../assets/Home/Vector12.svg";

const Login = () => {
    const [inputEmailorMobileNumber, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputEmailorMobileNumber || !password) {
            toast("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3333/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // ✅ Include cookies
                body: JSON.stringify({
                    inputEmailorMobileNumber,
                    password,
                }),
            });

            const data = await response.json();

            

            if (data.success) {
                toast.success("Login successful!");

                localStorage.setItem("role", JSON.stringify(data.role));
                localStorage.setItem("firstName", data.firstName);
                localStorage.setItem("middleName", data.middleName);
                localStorage.setItem("lastName", data.lastName);
                localStorage.setItem("email", data.email);

                // ✅ Do NOT store token in localStorage anymore
                // ✅ Cookie is automatically stored by browser
                
                // Redirect based on role
                console.log("User role:", data.role);
                if (data.role === "GetDiscovered") {
                    navigate("/dashboad-getDiscovered");
                } else if (data.role === "Founder") {
                    navigate("/dashboard-founder");
                } else {
                    toast.error("Unknown role. Access denied.");
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error(error.message);
        }
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <>
            <ToastContainer
                autoClose={3000}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                progressStyle={{ background: "#155DFC" }}
                theme="light"
                style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#ff4d4f",
                    borderRadius: "8px",
                    padding: "10px",
                }}
            />

            <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
                <div className="absolute top-[15%] flex justify-between items-center w-full">
                    <img src={vector1} alt="Vector1" className="w-1/2 h-auto translate-y-[-30%]" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                    <img src={vector2} alt="Vector2" className="w-1/2 h-auto translate-y-[-30%]" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center relative z-10">
                    <h2 className="text-2xl font-bold text-blue-600">Log In</h2>
                    <p className="text-gray-500 mb-6">Enter your log in details to proceed further</p>

                    <form onSubmit={handleSubmit}>
                        <div className="text-left mb-4">
                            <label className="block font-medium text-gray-600">Email / Phone number</label>
                            <input
                                type="text"
                                value={inputEmailorMobileNumber}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Email / Phone number"
                            />
                        </div>

                        <div className="text-left mb-4">
                            <label className="block font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Password"
                            />
                        </div>

                        <button type="submit" className="bg-blue-600 text-white w-full p-3 rounded-lg mt-4 hover:bg-blue-700 transition">
                            Get Started
                        </button>
                    </form>

                    <p className="mt-4 text-gray-500 text-sm">
                        Don’t have an account?{" "}
                        <span className="text-blue-600 font-medium cursor-pointer" onClick={handleSignUp}>
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;