import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("phone"); // 'phone' or 'email'

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const validatePhone = (phone) => {
    // Remove any non-digit characters except the leading +
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    // Check for valid phone number (allowing + and 10-15 digits)
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(cleanedPhone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!emailOrPhone || !password) {
      toast.error("All fields are required!");
      return;
    }

    // Validate based on login method
    if (loginMethod === "email" && !validateEmail(emailOrPhone)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (loginMethod === "phone" && !validatePhone(emailOrPhone)) {
      toast.error("Please enter a valid phone number!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          emailOrPhone,
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

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
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
        <motion.div
          key="step1"
          className="flex w-screen justify-center items-center h-screen bg-[#ffffff] overflow-hidden"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
            <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
            <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
          </div>
          <div className="flex gap-10 w-fit h-[75%] z-10 bg-white p-8 rounded-4xl shadow-md shadow-[#5C058E] text-center text-sm items-center justify-evenly">
            <div className="h-full w-fit flex justify-center items-center">
              <img src="./image1.svg" alt="" className="h-full" />
            </div>
            <div className="flex flex-col h-full gap-1 w-[50%] p-4 rounded-lg justify-center">
              <div className="flex flex-col mb-2 items-start gap-0.5">
                <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
                  Start your journey
                </p>
                <h2 className="text-[48px] font-bold text-[#5E0194]">
                  Sign In to Klezy.
                </h2>
                <p className="text-[#786D7F] opacity-[86%] text-sm">
                  Don’t have an account?{" "}
                  <a
                    href="#"
                    className="text-[#A100FF] font-medium underline"
                    onClick={handleSignUp}
                  >
                    Sign up
                  </a>
                </p>
              </div>
              <div>
                <div className="mb-4 text-left">
                  <label className="block font-medium mb-1 text-black opacity-[73%]">
                    Login using
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="phone"
                        checked={loginMethod === "phone"}
                        onChange={() => {
                          setLoginMethod("phone");
                          setEmailOrPhone("");
                        }}
                      />
                      Phone
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="email"
                        checked={loginMethod === "email"}
                        onChange={() => {
                          setLoginMethod("email");
                          setEmailOrPhone("");
                        }}
                      />
                      Email
                    </label>
                  </div>
                </div>

                {loginMethod === "phone" ? (
                  <div className="text-left">
                    <label className="block font-medium mb-1 text-black opacity-[73%]">
                      Phone number
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={emailOrPhone}
                      onChange={(value) => setEmailOrPhone(value)}
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
                ) : (
                  <div className="text-left mb-4">
                    <label className="block font-medium mb-1 text-black opacity-[73%]">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                      placeholder="Enter your email"
                    />
                  </div>
                )}

                <div className="text-left mb-4">
                  <label className="block font-medium mb-1 text-black opacity-[73%]">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="Enter Password"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Login;