// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import {FaEyeSlash, FaEye} from "react-icons/fa"

// const Login = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const [loginMethod, setLoginMethod] = useState("phone");
//   const [showPassword, setShowPassword] = useState(false);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const cleanedPhone = phone.replace(/[^\d+]/g, '');
//     const phoneRegex = /^\+?\d{10,15}$/;
//     return phoneRegex.test(cleanedPhone);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       emailOrPhone: !emailOrPhone,
//       password: !password,
//       role: !role,
//     };

//     setErrors(newErrors);
//     if (Object.values(newErrors).some((error) => error)) {
//       toast.error("All fields are required!");
//       return;
//     }

//     if (loginMethod === "email" && !validateEmail(emailOrPhone)) {
//       toast.error("Please enter a valid email address!");
//       return;
//     }

//     if (loginMethod === "phone" && !validatePhone(emailOrPhone)) {
//       toast.error("Please enter a valid phone number!");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3333/api/auth/signin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           emailOrPhone,
//           password,
//           role,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success("Login successful!");
//         localStorage.setItem("role", JSON.stringify(data.role));
//         localStorage.setItem("firstName", data.firstName);
//         localStorage.setItem("middleName", data.middleName);
//         localStorage.setItem("lastName", data.lastName);
//         localStorage.setItem("email", data.email);

//         console.log("User role:", data.role);
//         if (data.role === "GetDiscovered") {
//           navigate("/dashboad-getDiscovered");
//         } else if (data.role === "Founder") {
//           navigate("/dashboard-founder");
//         } else {
//           toast.error("Unknown role. Access denied.");
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       toast.error(error.message);
//     }
//   };

//   const handleSignUp = () => {
//     navigate("/signup");
//   };

//   const pageVariants = {
//     initial: { opacity: 0, x: 50 },
//     animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
//     exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
//   };

//   return (
//     <>
//       <ToastContainer
//         autoClose={3000}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         progressStyle={{ background: "#155DFC" }}
//         theme="light"
//         style={{
//           fontSize: "16px",
//           fontWeight: "bold",
//           color: "#ff4d4f",
//           borderRadius: "8px",
//           padding: "10px",
//         }}
//       />
//       <AnimatePresence mode="wait">
//         <motion.div
//           key="step1"
//           className="flex w-screen justify-center items-center h-screen bg-[#ffffff] overflow-hidden"
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           variants={pageVariants}
//         >
//           <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//             <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//             <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//           </div>
//           <div className="flex gap-10 w-fit h-[75%] z-10 bg-white p-8 rounded-4xl shadow-md shadow-[#5C058E] text-center text-sm items-center justify-evenly">
//             <div className="h-full w-fit flex justify-center items-center">
//               <img src="./image1.svg" alt="" className="h-full" />
//             </div>
//             <div className="flex flex-col h-full gap-1 w-[50%] p-4 rounded-lg justify-center">
//               <div className="flex flex-col mb-2 items-start gap-0.5">
//                 <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
//                   Start your journey
//                 </p>
//                 <h2 className="text-[48px] font-bold text-[#5E0194]">
//                   Sign In to Klezy.
//                 </h2>
//                 <p className="text-[#786D7F] opacity-[86%] text-sm">
//                   Don’t have an account?{" "}
//                   <a
//                     href="#"
//                     className="text-[#A100FF] font-medium underline"
//                     onClick={handleSignUp}
//                   >
//                     Sign up
//                   </a>
//                 </p>
//               </div>
//               <div>
//                 <div className="mb-4 text-left">
//                   <label className="block font-medium mb-1 text-black opacity-[73%]">
//                     Who you are
//                   </label>
//                   <div className="flex gap-4">
//                     <label
//                       className={`flex items-center gap-2 ${errors.role ? "text-red-500" : ""}`}
//                     >
//                       <input
//                         type="radio"
//                         name="role"
//                         value="Founder"
//                         checked={role === "Founder"}
//                         onChange={(e) => {
//                           setRole(e.target.value);
//                           setErrors((prev) => ({ ...prev, role: false }));
//                         }}
//                         className="h-4 w-4 border-gray-300"
//                       />
//                       <span className="text-sm text-gray-600">Discover Talent</span>
//                     </label>
//                     <label
//                       className={`flex items-center gap-2 ${errors.role ? "text-red-500" : ""}`}
//                     >
//                       <input
//                         type="radio"
//                         name="role"
//                         value="GetDiscovered"
//                         checked={role === "GetDiscovered"}
//                         onChange={(e) => {
//                           setRole(e.target.value);
//                           setErrors((prev) => ({ ...prev, role: false }));
//                         }}
//                         className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
//                       />
//                       <span className="text-sm text-gray-600">Getting Discovered</span>
//                     </label>
//                   </div>
//                 </div>
//                 <div className="mb-4 text-left">
//                   <label className="block font-medium mb-1 text-black opacity-[73%]">
//                     Login using
//                   </label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-1">
//                       <input
//                         type="radio"
//                         value="phone"
//                         checked={loginMethod === "phone"}
//                         onChange={() => {
//                           setLoginMethod("phone");
//                           setEmailOrPhone("");
//                         }}
//                         className="h-4 w-4 border-gray-300"
//                       />
//                       Phone
//                     </label>
//                     <label className="flex items-center gap-1">
//                       <input
//                         type="radio"
//                         value="email"
//                         checked={loginMethod === "email"}
//                         onChange={() => {
//                           setLoginMethod("email");
//                           setEmailOrPhone("");
//                         }}
//                         className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
//                       />
//                       Email
//                     </label>
//                   </div>
//                 </div>
//                 {loginMethod === "phone" ? (
//                   <div className="text-left mb-1">
//                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                       Phone number
//                     </label>
//                     <PhoneInput
//                       country={"in"}
//                       value={emailOrPhone}
//                       onChange={(value) => setEmailOrPhone(value)}
//                       containerClass="w-full"
//                       inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
//                         } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                       buttonClass="border-gray-300 h-14 w-16"
//                       dropdownClass="h-28"
//                       containerStyle={{
//                         height: "56px",
//                         width: "100%",
//                       }}
//                       inputStyle={{
//                         height: "43px",
//                         width: "100%",
//                       }}
//                       buttonStyle={{
//                         position: "absolute",
//                         left: "5px",
//                         top: "1px",
//                         height: "40px",
//                         width: "40px",
//                         backgroundColor: "transparent",
//                         border: "none",
//                         outline: "none",
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   <div className="text-left mb-2">
//                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                       Email address
//                     </label>
//                     <input
//                       type="email"
//                       value={emailOrPhone}
//                       onChange={(e) => setEmailOrPhone(e.target.value)}
//                       className={`w-full h-10 px-3 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
//                         } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                       placeholder="Enter your email"
//                     />
//                   </div>
//                 )}
//                 <div className="text-left relative mb-4">
//                   <label className="block font-medium mb-1 text-black opacity-[73%]">
//                     Password
//                   </label>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className={`w-full h-10 px-2 border ${errors.password ? "border-red-500" : "border-gray-300"
//                       } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                     placeholder="Enter Password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-2 top-[35px] text-gray-500"
//                   >
//                     {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//                   </button>
//                 </div>
//                 <div className="w-full flex items-center justify-start mb-4">
//                   <a
//                     href="#"
//                     className="text-[#A100FF] font-medium underline"
//                     onClick={() => navigate("/forgot-password")}
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>
//                 <button
//                   onClick={handleSubmit}
//                   className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
//                 >
//                   Get Started
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
// };
// export default Login;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { FaEyeSlash, FaEye } from "react-icons/fa";

// const Login = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("Founder");
//   const [errors, setErrors] = useState({});
//   const [formError, setFormError] = useState(""); // For top-level errors
//   const navigate = useNavigate();
//   const [loginMethod, setLoginMethod] = useState("phone");
//   const [showPassword, setShowPassword] = useState(false);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const cleanedPhone = phone.replace(/[^\d+]/g, '');
//     const phoneRegex = /^\+?\d{10,15}$/;
//     return phoneRegex.test(cleanedPhone);
//   };

//   useEffect(() => {
//     if (role) {
//       setErrors((prev) => ({ ...prev, role: "" }));
//     }
//   }, [role]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     const newErrors = {
//       emailOrPhone: !emailOrPhone,
//       password: !password,
//       role: !role,
//     };

//     if (Object.values(newErrors).some((error) => error)) {
//       setErrors({
//         ...newErrors,
//         emailOrPhone: !emailOrPhone ? "This field is required" : "",
//         password: !password ? "This field is required" : "",
//         role: !role ? "Please select a role" : "",
//       });
//       setFormError("All fields are required!");
//       return;
//     }

//     if (loginMethod === "email" && !validateEmail(emailOrPhone)) {
//       setErrors((prev) => ({
//         ...prev,
//         emailOrPhone: "Please enter a valid email address!",
//       }));
//       setFormError("Please enter a valid email address!");
//       return;
//     }

//     if (loginMethod === "phone" && !validatePhone(emailOrPhone)) {
//       setErrors((prev) => ({
//         ...prev,
//         emailOrPhone: "Please enter a valid phone number!",
//       }));
//       setFormError("Please enter a valid phone number!");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3333/api/auth/signin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           emailOrPhone,
//           password,
//           role,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         localStorage.setItem("role", JSON.stringify(data.role));
//         localStorage.setItem("firstName", data.firstName);
//         localStorage.setItem("middleName", data.middleName);
//         localStorage.setItem("lastName", data.lastName);
//         localStorage.setItem("email", data.email);

//         if (data.role === "GetDiscovered") {
//           navigate("/dashboad-getDiscovered");
//         } else if (data.role === "Founder") {
//           navigate("/dashboard-founder");
//         } else {
//           setFormError("Unknown role. Access denied.");
//         }
//       } else {
//         setFormError(data.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       setFormError(error.message || "An error occurred. Please try again.");
//     }
//   };

//   const handleSignUp = () => {
//     navigate("/signup");
//   };

//   const pageVariants = {
//     initial: { opacity: 0, x: 50 },
//     animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
//     exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
//   };


//   return (
//     <>
//       <AnimatePresence mode="wait">
//         <motion.div
//           key="step1"
//           className="min-h-screen bg-gradient-to-br from-brand-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden"
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           variants={pageVariants}
//         >
//           <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//             <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//             <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//           </div>
//           <div className="flex w-[50%] h-[70%] z-10 bg-white rounded-4xl shadow-md shadow-[#5C058E] text-center text-sm items-center justify-evenly">
//             {/* <div className="rounded-l-4xl h-full w-[50%] flex flex-col justify-center items-start bg-[#F1DAFF] pl-[3rem]">
//               <h2 className="text-4xl font-semibold text-[#5E0194] mb-2">
//                 Sign In.
//               </h2>
//               <p className="text-[#786D7F] opacity-[86%] text-sm">
//                 Don’t have an account?{" "}
//                 <a
//                   href="#"
//                   className="text-[#5E0194] font-medium underline"
//                   onClick={handleSignUp}
//                 >
//                   Sign up
//                 </a>
//               </p>
//               <img src="./image1.svg" alt="" className="h-[54%] mt-10" />
//             </div> */}
//             <form
//               className="flex flex-col px-[1rem] rounded-r-4xl justify-center gap-2 "
//               onSubmit={handleSubmit}
//               noValidate
//             >
//               {/* <div className="flex flex-col items-start gap-0.5">
//                 <p className="text-xs uppercase text-[#2B0242] opacity-[66%] font-medium mb-2">
//                   Start your journey
//                 </p>
//                 <h2 className="text-[48px]  font-bold text-[#5E0194]">
//                   Sign In to Klezy.
//                 </h2>
//                 <p className="text-[#786D7F] opacity-[86%] text-sm">
//                   Don’t have an account?{" "}
//                   <a
//                     href="#"
//                     className="text-[#A100FF] font-medium underline"
//                     onClick={handleSignUp}
//                   >
//                     Sign up
//                   </a>
//                 </p>
//                 <div className="text-sm text-center text-red-500 font-semibold h-4 mb-2">
//                   <p className="">{formError !== ("Invalid Password!") ? `${formError}` : ""}</p>
//                 </div>
//               </div> */}
//               <div className="text-sm text-left text-red-500 font-medium h-4">
//                 <p className="">{formError !== ("Invalid Password!") ? `${formError}` : ""}</p>
//               </div>
//               <div className="mb-4 text-left">
//                 {/* <label className="block font-medium mb-1 text-black opacity-[73%]">
//                   What do you want to do
//                 </label> */}
//                 {/* <div className="flex gap-4">
//                   <label
//                     className={`flex items-center gap-2 ${errors.role ? "text-red-500" : ""}`}
//                   >
//                     <input
//                       type="radio"
//                       name="role"
//                       value="Founder"
//                       checked={role === "Founder"}
//                       onChange={(e) => {
//                         setRole(e.target.value);
//                         setErrors((prev) => ({ ...prev, role: "" }));
//                       }}
//                       className="h-4 w-4 border-gray-300"
//                     />
//                     <span className="text-sm text-gray-600">Discover Talent</span>
//                   </label>
//                   <label
//                     className={`flex items-center gap-2 ${errors.role ? "text-red-500" : ""}`}
//                   >
//                     <input
//                       type="radio"
//                       name="role"
//                       value="GetDiscovered"
//                       checked={role === "GetDiscovered"}
//                       onChange={(e) => {
//                         setRole(e.target.value);
//                         setErrors((prev) => ({ ...prev, role: "" }));
//                       }}
//                       className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
//                     />
//                     <span className="text-sm text-gray-600">Getting Discovered</span>
//                   </label>
//                 </div> */}
//                 <div className="flex gap-4 w-fit">
//                   {["Founder", "GetDiscovered"].map((option) => (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => {
//                         setRole(option);
//                         setErrors((prev) => ({ ...prev, role: "" }));
//                         setFormError("");
//                       }}
//                       className={`px-4 py-2 text-sm ${role === option
//                         ? "  border-b-2 border-gray-500 text-gray-800 font-bold"
//                         : " text-gray-600"
//                         } ${errors.role ? "border-red-500" : ""}`}
//                     >
//                       {option === "Founder" ? "Discover Talent" : "Get Discovered"}
//                     </button>
//                   ))}
//                 </div>
//                 {/* <div className="h-1">
//                   {errors.role && (<p className="text-red-500 text-xs mt-1">({errors.role ? `${errors.role}` : ""})</p>)}
//                 </div> */}
//               </div>
//               <div className="mb-4 text-left">
//                 <label className="block font-medium mb-2 text-black opacity-[73%]">
//                   Login using
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-1">
//                     <input
//                       type="radio"
//                       value="phone"
//                       checked={loginMethod === "phone"}
//                       onChange={() => {
//                         setLoginMethod("phone");
//                         setEmailOrPhone("");
//                         setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
//                         setFormError("");
//                       }}
//                       className="h-4 w-4 border-gray-300"
//                     />
//                     Phone
//                   </label>
//                   <label className="flex items-center gap-1">
//                     <input
//                       type="radio"
//                       value="email"
//                       checked={loginMethod === "email"}
//                       onChange={() => {
//                         setLoginMethod("email");
//                         setEmailOrPhone("");
//                         setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
//                         setFormError("");
//                       }}
//                       className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
//                     />
//                     Email
//                   </label>
//                 </div>
//               </div>
//               {loginMethod === "phone" ? (
//                 <div className="text-left mb-1">
//                   <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                     Phone number {errors.emailOrPhone && (
//                       <p className="text-red-500 text-sm">{errors.emailOrPhone ? `*` : ""}</p>
//                     )}
//                   </label>
//                   <PhoneInput
//                     country={"in"}
//                     className= {`${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
//                       }`}
//                     value={emailOrPhone}
//                     onChange={(value) => {setEmailOrPhone(value); setFormError("");}}
//                     containerClass="w-full"
//                     inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
//                       } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                     buttonClass="border-gray-300 h-14 w-16"
//                     dropdownClass="h-28"
//                     containerStyle={{
//                       height: "56px",
//                       width: "100%",
//                     }}
//                     inputStyle={{
//                       height: "44px",
//                       width: "100%",
//                     }}
//                     buttonStyle={{
//                       position: "absolute",
//                       left: "5px",
//                       top: "1px",
//                       height: "40px",
//                       width: "40px",
//                       backgroundColor: "transparent",
//                       border: "none",
//                       outline: "none",
//                     }}
//                   />
//                   {/* {errors.emailOrPhone && (
//                     <p className="text-red-500 text-xs mt-1">{errors.emailOrPhone}</p>
//                   )} */}
//                 </div>
//               ) : (
//                 <div className="text-left mb-4">
//                   <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                     Email address {errors.emailOrPhone && (
//                       <p className="text-red-500 text-sm">{errors.emailOrPhone ? `*` : ""}</p>
//                     )}
//                   </label>
//                   <input
//                     type="email"
//                     value={emailOrPhone}
//                     onChange={(e) => {setEmailOrPhone(e.target.value); setFormError("");}}
//                     className={`w-full h-11 px-3 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
//                       } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                     placeholder="Enter your email"
//                   />
//                   {/* {errors.emailOrPhone && (
//                     <p className="text-red-500 text-xs mt-1">{errors.emailOrPhone}</p>
//                   )} */}
//                 </div>
//               )}
//               <div className="text-left relative">
//                 <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                   Password {errors.password && (
//                     <p className="text-red-500 text-sm mr-1">{errors.password ? `*` : ""}</p>
//                   )}
//                   <div className="text-sm text-start text-red-500 font-medium">
//                     <p className="">{formError === ("Invalid Password!") ? `Wrong Password` : ""}</p>
//                   </div>
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => {setPassword(e.target.value); setFormError("");}}
//                   className={`w-full h-10 px-2 border ${errors.password ? "border-red-500" : "border-gray-300"
//                     } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                   placeholder="Enter Password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-2 top-[35px] text-gray-500"
//                 >
//                   {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//                 </button>
//                 {/* {errors.password && (
//                   <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//                 )} */}
//                 {/* <div className="text-sm text-start text-red-500 font-semibold h-4">
//                   <p className="">{formError === ("Invalid Password!") ? `Wrong Password` : ""}</p>
//                 </div> */}
//               </div>
//               <div className="w-full flex items-center justify-start mb-4">
//                 <a
//                   href="#"
//                   className="text-[#A100FF] font-medium underline"
//                   onClick={() => navigate("/forgot-password")}
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
//               >
//                 Get Started
//               </button>
//             </form>
//           </div>
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
// };

// export default Login;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdPeopleOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import TermsAndConditions from "../Policies/TermsAndConditions";
import PrivacyPolicies from "../Policies/PrivacyPolicies";
import Modal from "react-modal";
Modal.setAppElement("#root");


const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Founder");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(cleanedPhone);
  };

  useEffect(() => {
    if (role) {
      setErrors((prev) => ({ ...prev, role: "" }));
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const newErrors = {
      emailOrPhone: !emailOrPhone,
      password: !password,
      role: !role,
    };
    // console.log(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      setErrors({
        ...newErrors,
        emailOrPhone: !emailOrPhone ? "This field is required" : "",
        password: !password ? "This field is required" : "",
        role: !role ? "Please select a role" : "",
      });
      setFormError("All fields are required!");
      return;
    }

    if (loginMethod === "email" && !validateEmail(emailOrPhone)) {
      setErrors((prev) => ({
        ...prev,
        emailOrPhone: "Please enter a valid email address!",
      }));
      setFormError("Please enter a valid email address!");
      return;
    }

    if (loginMethod === "phone" && !validatePhone(emailOrPhone)) {
      setErrors((prev) => ({
        ...prev,
        emailOrPhone: "Please enter a valid phone number!",
      }));
      setFormError("Please enter a valid phone number!");
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
          role,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("role", JSON.stringify(data.role));
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("middleName", data.middleName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("email", data.email);

        if (data.role === "GetDiscovered") {
          navigate("/dashboad-getDiscovered");
        } else if (data.role === "Founder") {
          navigate("/dashboard-founder");
        } else {
          setFormError("Unknown role. Access denied.");
        }
      } else {
        if (data.message === "Invalid Password!") {
          setErrors((prev) => ({
            ...prev,
            password: data.message,
          }));
        }
        setFormError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setFormError(error.message || "An error occurred. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigate("/signupnew");
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  };


  // Functions to control Terms modal
  const openTermsModal = () => {
    console.log("Opening Terms Modal");
    setIsTermsModalOpen(true);
  };
  const closeTermsModal = () => setIsTermsModalOpen(false);

  // Functions to control Privacy modal
  const openPrivacyModal = () => {
    console.log("Opening Privacy Modal");
    setIsPrivacyModalOpen(true);
  };
  const closePrivacyModal = () => setIsPrivacyModalOpen(false);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: "800px",
      maxHeight: "90vh",
      overflowY: "auto",
      padding: "4px",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1000,
    },
  };


  // console.log(errors);
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="step1"
          className="font-sans min-h-screen bg-violet-100 flex flex-col gap-5 items-center justify-center p-4 bg-cover bg-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
            <div className="absolute -right-[50%] top-[120%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
            <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
          </div>
          <form
            className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md z-10"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="text-sm text-start text-red-500 ">
              <p className="">{formError !== ("Invalid Password!") ? `${formError}` : ""}</p>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Sign In
            </h2>
            <p className="text-sm text-gray-500 mb-6 text-center font-sans">
              Enter your credentials to access your account
            </p>

            <div className="mb-6 text-start">
              <p className="text-sm mb-3 text-gray-600 font-semibold">I want to</p>
              <div className="flex items-center justify-center gap-3 w-full">
                {["Founder", "GetDiscovered"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setRole(option);
                      setErrors((prev) => ({ ...prev, role: "" }));
                      setFormError("");
                    }}
                    className={`flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border-2 rounded-xl hover:border-purple-500 transition-all duration-300 ${role === option
                      ? "border-purple-600 text-white bg-purple-600"
                      : "border-gray-200 text-gray-600"
                      } ${errors.role ? "border-red-500" : ""}`}
                  >
                    {option === "Founder" ? (
                      <>
                        <span className="text-sm font-medium"><FiSearch className="w-4 h-4" /></span> Discover Talent
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium"><MdPeopleOutline className="w-4 h-4" /></span> Get Discovered
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 text-start">
              <p className="text-sm mb-2 text-gray-600 font-semibold">Login using</p>
              <div className="flex justify-center  w-full border border-gray-200 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("email");
                    setEmailOrPhone("");
                    setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
                    setFormError("");
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold ${loginMethod === "email"
                    ? "bg-purple-600 text-white rounded-lg"
                    : "text-gray-500"
                    } transition-all duration-200`}
                >
                  <span className="text-lg"><MdOutlineEmail /></span> Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("phone");
                    setEmailOrPhone("");
                    setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
                    setFormError("");
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold ${loginMethod === "phone"
                    ? "bg-purple-600 text-white rounded-lg"
                    : "text-gray-500"
                    }`}
                >
                  <span className="text-lg"><LuPhone /></span> Phone
                </button>
              </div>
            </div>

            {loginMethod === "phone" ? (
              <div className="mb-4">
                <PhoneInput
                  country={"in"}
                  value={emailOrPhone}
                  onChange={(value) => {
                    setEmailOrPhone(value);
                    setFormError("");
                  }}
                  containerClass="w-full"
                  inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
                  buttonClass="border-gray-300 h-12"
                  dropdownClass="h-28"
                  containerStyle={{ height: "48px", width: "100%" }}
                  inputStyle={{ height: "48px", width: "100%", border: "1px #e5e7eb solid" }}
                  buttonStyle={{
                    position: "absolute",
                    left: "5px",
                    top: "5px",
                    height: "40px",
                    width: "40px",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                />
              </div>
            ) : (
              <div className="mb-4">
                <input
                  type="email"
                  value={emailOrPhone}
                  onChange={(e) => {
                    setEmailOrPhone(e.target.value);
                    setFormError("");
                  }}
                  className={`w-full h-12 px-4 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
                  placeholder="Enter your email address"
                />
              </div>
            )}

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormError("");
                }}
                className={`w-full h-12 px-4 border ${errors.password ? "border-red-500" : "border-gray-200"
                  } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-4 w-full">
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 w-full text-start">{errors.password === "Invalid Password!" ? `${errors.password}` : ""}</p>
              )}
              <a
                href="#"
                className="text-purple-600 text-sm hover:underline w-full text-end"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-all duration-300"
            >
              Sign In →
            </button>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-purple-600 hover:underline"
                onClick={handleSignUp}
              >
                Sign up for free
              </a>
            </p>

          </form>
          <p className="text-lg text-gray-500 my-6 text-center z-10">
            By signing up, you agree to our{" "}
            <span
              className="text-[#A100FF] underline cursor-pointer"
              onClick={openTermsModal}
            >
              terms & conditions
            </span>
            {" & "}
            <span
              className="text-[#A100FF] underline cursor-pointer"
              onClick={openPrivacyModal}
            >
              Privacy Policy
            </span>
          </p>
        </motion.div>
        <Modal
          isOpen={isTermsModalOpen}
          onRequestClose={closeTermsModal}
          style={modalStyles}
        >
          <div className="p-6">
            <TermsAndConditions onClose={closeTermsModal} />
          </div>
        </Modal>
        <Modal
          isOpen={isPrivacyModalOpen}
          onRequestClose={closePrivacyModal}
          style={modalStyles}
        >
          <div className="p-6 h-full w-full">
            <PrivacyPolicies onClose={closePrivacyModal} /> {/* Fixed typo */}
          </div>
        </Modal>
      </AnimatePresence>
    </>
  );
};

export default Login;