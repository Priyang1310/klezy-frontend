import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const SignUpRequest = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [resendTimer, setResendTimer] = useState(60);
    const [phoneCode, setPhoneCode] = useState("");
    const [password, setPassword] = useState("");
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

    const phoneValidation = () => {
        if (phoneNumber.length !== 12) {
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
        if (!phoneValidation()) {
            return;
        }
        if (!firstName || !lastName || !phoneNumber) {
            toast("All fields are required except middle name!");
        } else {
            setStep(2);
            // sendOTP(phoneNumber); // Uncomment and implement when ready
        }
    };

    const handleOnClickNextForSecondSection = () => {
        if (!phoneCode) {
            toast("Phone verification code is required!");
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
        registerUser();
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const validateOTP = () => {
        // Temporary check for phone OTP
        if (phoneCode === "1234") {
            return true;
        } else {
            toast("Invalid Phone OTP!");
            return false;
        }
    };

    const registerUser = async () => {
        // console.log(import.meta.env.VITE_API_URL);
        return await fetch("http://62.72.13.232:3333/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                middleName,
                lastName,
                phoneNumber,
                password,
                role,
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
                        className="flex w-screen justify-center items-center h-screen bg-[#F6E7FF] overflow-hidden"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        <div className="flex gap-10 w-fit h-[75%] z-10 bg-white p-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-evenly">
                            <div className="flex flex-col h-full gap-1 w-[50%] p-4 rounded-lg justify-center">
                                <div className="flex flex-col mb-2 items-start gap-0.5">
                                    <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
                                        Register now
                                    </p>
                                    <h2 className="text-[48px] font-bold text-[#5E0194]">
                                        {" "}
                                        Sign Up for Free.
                                    </h2>
                                    <p className="text-[#786D7F] opacity-[86%] text-sm">
                                        Already have an account?{" "}
                                        <a
                                            href="#"
                                            className="text-[#A100FF] font-medium underline"
                                            onClick={handleLogin}
                                        >
                                            Sign in
                                        </a>
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            placeholder="Enter First Name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Middle Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            placeholder="Enter Middle Name"
                                            value={middleName}
                                            onChange={(e) =>
                                                setMiddleName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            placeholder="Enter Last Name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Phone number
                                        </label>
                                        <PhoneInput
                                            country={"in"}
                                            value={phoneNumber}
                                            onChange={setPhoneNumber}
                                            containerClass="w-full"
                                            inputClass="w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            buttonClass="border-gray-300 h-14 w-16"
                                            dropdownClass="h-28"
                                            containerStyle={{
                                                height: "56px",
                                                width: "100%",
                                            }}
                                            inputStyle={{
                                                height: "43px",
                                                width: "100%",
                                            }}
                                            buttonStyle={{
                                                position: "absolute",
                                                left: "5px",
                                                top: "1px",
                                                height: "40px",
                                                width: "40px",
                                                backgroundColor: "transparent",
                                                border: "none",
                                                outline: "none",
                                            }}
                                        />
                                    </div>
                                    <button
                                        onClick={
                                            handleOnClickNextForFirstSection
                                        }
                                        className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            <div className="h-full w-fit flex justify-center items-center">
                                <img
                                    src="./image1.svg"
                                    alt=""
                                    className="h-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        className="flex w-screen justify-center items-center h-screen bg-[#F6E7FF] overflow-hidden"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        <div className="flex gap-10 w-fit h-[55%] z-10 bg-white p-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-evenly">
                            <div className="flex flex-col h-full gap-1 w-[100%] p-4 rounded-lg justify-center">
                                <div className="flex flex-col mb-2 items-start gap-0.5">
                                    <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
                                        Verification
                                    </p>
                                    <h2 className="text-[48px] font-bold text-[#5E0194]">
                                        Verify Your Phone
                                    </h2>
                                    <p className="text-[#786D7F] opacity-[86%] text-sm">
                                        Enter the code sent to your phone to
                                        proceed.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Phone Verification Code
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            placeholder="Enter Code"
                                            value={phoneCode}
                                            onChange={(e) =>
                                                setPhoneCode(e.target.value)
                                            }
                                        />
                                    </div>
                                    <p className="text-[#786D7F] opacity-[86%] text-sm">
                                        Haven't received your code?{" "}
                                        <button
                                            className="text-[#A100FF] font-medium underline disabled:text-gray-400"
                                            disabled={resendTimer > 0}
                                        >
                                            Send the code again (
                                            {resendTimer > 0
                                                ? `00:${resendTimer}`
                                                : "Resend"}
                                            )
                                        </button>
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={
                                                handleOnClickPreviousForSecondSection
                                            }
                                            className="bg-gray-400 text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={
                                                handleOnClickNextForSecondSection
                                            }
                                            className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="h-full w-fit flex justify-center items-center">
                                <img src={image1} alt="" className="h-full" />
                            </div> */}
                        </div>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        className="flex w-screen justify-center items-center h-screen bg-[#F6E7FF] overflow-hidden"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        <div className="flex gap-10 w-fit h-[75%] z-10 bg-white p-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-evenly">
                            <div className="flex flex-col h-full gap-1 w-[50%] p-4 rounded-lg justify-center">
                                <div className="flex flex-col mb-2 items-start gap-0.5">
                                    <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
                                        Set Password
                                    </p>
                                    <h2 className="text-[48px] font-bold text-[#5E0194]">
                                        Create Your Password
                                    </h2>
                                    <p className="text-[#786D7F] opacity-[86%] text-sm">
                                        Set a strong password to secure your
                                        account.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                // checkPasswordStrength(e.target.value);
                                            }}
                                        />
                                        {passwordStrength ===
                                            "Strong Password" && (
                                            <p className="text-green-600 text-sm mt-1">
                                                Strong Password
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Re-Enter Password
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            placeholder="Re-Enter Password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <button
                                        className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
                                        onClick={handleGetStarted}
                                    >
                                        Get Started
                                    </button>
                                    <p className="text-[#786D7F] opacity-[86%] text-sm">
                                        Already have an account?{" "}
                                        <a
                                            onClick={handleLogin}
                                            href="#"
                                            className="text-[#A100FF] font-medium underline"
                                        >
                                            Log in
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="h-full w-fit flex justify-center items-center">
                                <img
                                    src="./image2.svg"
                                    alt=""
                                    className="h-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SignUpRequest;
