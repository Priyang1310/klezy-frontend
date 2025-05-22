import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import vector1 from "../../../assets/Home/Vector11.svg";
import vector2 from "../../../assets/Home/Vector12.svg";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
    parsePhoneNumberFromString,
    isValidPhoneNumber,
} from "libphonenumber-js";

const SignUpRequest = () => {
    const navigate = useNavigate(); // Use navigate hook to navigate between routes

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [resendTimer, setResendTimer] = useState(60);
    const [emailCode, setEmailCode] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [password, setPassword] = useState("");
    const [emailOTP, setEmailOTP] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const role = "Founder";
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState(null);

    const pageVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
    };

    const emailValidation = () => {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast("Invalid email format!");
            return false;
        }
        return true;
    };

    const phoneValidation = () => {
        if (phoneNumber.length != 12) {
            toast("Invalid phone number!");
            return false;
        }
        return true;
    };

    const passwordValidation = (password) => {
        if (password.length < 8) {
            toast("Password must be at least 8 characters long!");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            toast("Password must contain at least one uppercase letter!");
            return false;
        }
        if (!/[a-z]/.test(password)) {
            toast("Password must contain at least one lowercase letter!");
            return false;
        }
        if (!/[0-9]/.test(password)) {
            toast("Password must contain at least one number!");
            return false;
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            toast("Password must contain at least one special character!");
            return false;
        }
        return true;
    };

    const handleOnClickNextForFirstSection = () => {
        if (!emailValidation()) {
            return;
        }
        if (!phoneValidation()) {
            return;
        }
        if (!firstName || !lastName || !email || !phoneNumber) {
            toast("All fields are required except middle name!");
        } else {
            setStep(2);
            sendOTP(email, phoneNumber);
        }
    };

    const handleOnClickNextForSecondSection = () => {
        if (!emailCode || !phoneCode) {
            toast("All fields are required!");
            return;
        }
        if (!validateOTP()) {
            return;
        } else {
            setStep(3);
        }
    };

    const handleOnClickPreviousForSecondSection = () => {
        setStep(1);
    };

    const checkPasswordStrength = (pass) => {
        if (passwordValidation(pass)) {
            setPasswordStrength("Strong Password");
        } else {
            setPasswordStrength("Weak Password");
        }
    };

    const handleGetStarted = () => {
        if (!passwordValidation(password)) {
            toast(
                "Please follow the password requirements to create a strong password!"
            );
            return;
        }
        if (password !== confirmPassword) {
            toast("Passwords do not match!");
            return;
        }
        // Proceed with registration if password is strong
        registerUser();
    };

    const handleLogin = () => {
        navigate("/login");
    };

    //functions to be completed
    const sendOTP = async (email, phoneNumber) => {
        // API call to send OTP
        return await fetch("http://localhost:3333/api/otp/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setEmailOTP(data.otp);
                } else {
                    toast.error(data.message);
                }
            });
    };

    const validateOTP = () => {
        // API call to validate OTP
        let isValid = true;
        //for temporary checking
        if (emailCode === emailOTP) {
            isValid = true;
        } else if (emailCode !== "1234") {
            toast("Invalid Email OTP!");
            return false;
        }

        if (phoneNumber) {
            if (phoneCode === "1234") {
                isValid = true;
            } else {
                toast("Invalid Phone OTP!");
                return false;
            }
        }

        return isValid;
    };

    const registerUser = async () => {
        return await fetch("http://localhost:3333/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                middleName,
                lastName,
                email,
                phoneNumber,
                password,
                role,
                emailCode,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setUserData(data.result);
                    toast.success("Registration successful!");
                    navigate("/login");
                } else {
                    toast.error(data.message);
                }
            });
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
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        className="relative flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        <div className="absolute flex justify-between items-center w-full">
                            <img
                                src={vector1}
                                alt="Vector1"
                                className="w-1/2 h-auto mb-[15vw]"
                            />
                            <img
                                src={vector2}
                                alt="Vector2"
                                className="w-1/2 h-auto mb-[15vw]"
                            />
                        </div>
                        <div className="z-10 bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
                            <h2 className="text-2xl font-bold text-blue-600">
                                Sign Up
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Submit your details to proceed further
                            </p>

                            <div className="text-left mb-4">
                                <label className="block font-medium mb-1 text-gray-600">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="text-left mb-4">
                                <label className="block font-medium mb-1 text-gray-600">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Middle Name"
                                    value={middleName}
                                    onChange={(e) =>
                                        setMiddleName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="text-left mb-4">
                                <label className="block font-medium mb-1 text-gray-600">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="text-left mb-4">
                                <label className="block font-medium mb-1 text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="text-left mb-4">
                                <label className="block font-medium mb-2 text-gray-700">
                                    Phone number
                                </label>
                                <PhoneInput
                                    country={"in"}
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    containerClass="w-full"
                                    inputClass="w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    buttonClass="border-gray-300 h-14 w-16"
                                    dropdownClass="h-28"
                                    containerStyle={{
                                        height: "56px",
                                        width: "100%",
                                    }}
                                    inputStyle={{
                                        height: "48px",
                                        width: "100%",
                                    }}
                                    buttonStyle={{
                                        position: "absolute",
                                        left: "5px",
                                        top: "3px",
                                        height: "40px",
                                        width: "40px",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        outline: "none",
                                    }}
                                />
                            </div>

                            <button
                                onClick={handleOnClickNextForFirstSection}
                                className="bg-blue-600 text-white w-full p-3 rounded-lg mt-4 shadow-md hover:bg-blue-700"
                            >
                                Next
                            </button>
                            <p className="mt-4 text-gray-500 text-sm">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    className="text-blue-600 font-medium"
                                    onClick={handleLogin}
                                >
                                    Log in
                                </a>
                            </p>
                        </div>
                        {/* Login Link */}
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        className="relative flex justify-center items-center min-h-screen bg-gray-100"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        {/* below code is for background image */}
                        <div className="absolute flex justify-between items-center  w-full top-[-10%]">
                            <img
                                src={vector1}
                                alt="Vector1 is not loading"
                                className="w-1/2 h-auto "
                                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                                draggable="false" // Disable dragging
                            />
                            <img
                                src={vector2}
                                alt="Vector2 is not loading"
                                className="w-1/2 h-auto "
                                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                                draggable="false" // Disable dragging
                            />
                        </div>
                        <div className="z-10 bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
                            <h2 className="text-2xl font-bold text-blue-600">
                                Verification
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Enter the code sent to proceed further
                            </p>

                            {/* Email Verification Input */}
                            <div className="text-left mb-4">
                                <label className="block font-medium mb-1 text-gray-600">
                                    Email Verification
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Code"
                                    value={emailCode}
                                    onChange={(e) =>
                                        setEmailCode(e.target.value)
                                    }
                                />
                            </div>

                            {/* Phone Verification Input */}
                            <div className="text-left mb-4">
                                <label className="block font-medium mb-1 text-gray-600">
                                    Phone number Verification
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Code"
                                    value={phoneCode}
                                    onChange={(e) =>
                                        setPhoneCode(e.target.value)
                                    }
                                />
                            </div>

                            {/* Resend Code Timer */}
                            <p className="text-gray-500 text-sm">
                                Haven't received your code?{" "}
                                <button
                                    className="text-blue-600 font-medium disabled:text-gray-400"
                                    disabled={resendTimer > 0}
                                >
                                    Send the code again (
                                    {resendTimer > 0
                                        ? `00:${resendTimer}`
                                        : "Resend"}
                                    )
                                </button>
                            </p>

                            {/* Submit Button */}
                            {/* <button
                            onClick={handleOnClickNextForSecondSection}
                            className="bg-blue-600 text-white w-full p-3 rounded-lg mt-4 shadow-md hover:bg-blue-700"
                        >
                            Next
                        </button> */}
                            <div className="flex justify-between gap-4 mt-4">
                                <button
                                    onClick={
                                        handleOnClickPreviousForSecondSection
                                    } // Function to go back to step 1
                                    className="bg-gray-400 text-white w-1/2 p-3 rounded-lg shadow-md hover:bg-gray-500"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={handleOnClickNextForSecondSection} // Function to go to next step
                                    className="bg-blue-600 text-white w-1/2 p-3 rounded-lg shadow-md hover:bg-blue-700"
                                >
                                    Next
                                </button>
                            </div>
                            {/* Login Link */}
                            <p className="mt-4 text-gray-500 text-sm">
                                Already have an account?{" "}
                                <a
                                    onClick={handleLogin}
                                    href="#"
                                    className="text-blue-600 font-medium"
                                >
                                    Log in
                                </a>
                            </p>
                        </div>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        className="relative flex justify-center items-center min-h-screen bg-gray-100"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        {/* Background Images */}
                        <div className="absolute top-[15%] flex justify-between items-center w-full">
                            <img
                                src={vector1}
                                alt="Vector1 is not loading"
                                className="w-1/2 h-auto translate-y-[-30%]"
                                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                                draggable="false" // Disable dragging
                            />
                            <img
                                src={vector2}
                                alt="Vector2 is not loading"
                                className="w-1/2 h-auto translate-y-[-30%]"
                                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                                draggable="false" // Disable dragging
                            />
                        </div>

                        {/* Form Container */}
                        <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center relative z-10">
                            <h2 className="text-2xl font-bold text-blue-600">
                                Set Password
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Create a strong password to proceed further
                            </p>

                            {/* Password Input */}
                            <div className="text-left mb-4">
                                <label className="block font-medium text-gray-500 ">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        // checkPasswordStrength(e.target.value);
                                    }}
                                />
                                {passwordStrength === "Strong Password" && (
                                    <p className="text-green-600 flex items-center mt-1">
                                        <CheckCircle
                                            size={16}
                                            className="mr-1"
                                        />{" "}
                                        {passwordStrength}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div className="text-left mb-4">
                                <label className="block font-medium text-gray-600">
                                    Re-Enter Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Re-Enter Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                className="bg-blue-600 text-white w-full p-3 rounded-lg mt-4 hover:bg-blue-700 transition"
                                onClick={handleGetStarted}
                            >
                                Get Started
                            </button>

                            {/* Login Link */}
                            <p className="mt-4 text-gray-500 text-sm">
                                Already have an account?{" "}
                                <a
                                    onClick={handleLogin}
                                    href="#"
                                    className="text-blue-600 font-medium"
                                >
                                    Log in
                                </a>
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SignUpRequest;
