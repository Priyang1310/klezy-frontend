// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const ForgotPassword = () => {
//     const [step, setStep] = useState(1); // 1: Enter email/phone and OTP, 2: Reset Password
//     const [method, setMethod] = useState("phone"); // 'phone' or 'email'
//     const [emailOrPhone, setEmailOrPhone] = useState("");
//     const [otp, setOtp] = useState("");
//     const [showOtpInput, setShowOtpInput] = useState(false); // Control OTP input visibility
//     const [resendDisabled, setResendDisabled] = useState(false); // Control resend button
//     const [resendCountdown, setResendCountdown] = useState(60); // Countdown timer for resend
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     // Email validation
//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     // Phone validation
//     const validatePhone = (phone) => {
//         const cleanedPhone = phone.replace(/[^\d+]/g, "");
//         const phoneRegex = /^\+?\d{10,15}$/;
//         return phoneRegex.test(cleanedPhone);
//     };

//     // Password validation
//     const validatePassword = (pwd) => {
//         return pwd.length >= 8; // Minimum 8 characters
//     };

//     // Handle countdown for resend button
//     useEffect(() => {
//         let timer;
//         if (resendDisabled && resendCountdown > 0) {
//             timer = setInterval(() => {
//                 setResendCountdown((prev) => {
//                     if (prev <= 1) {
//                         setResendDisabled(false);
//                         return 60;
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//         }
//         return () => clearInterval(timer);
//     }, [resendDisabled, resendCountdown]);

//     // Handle sending OTP
//     const handleSendOtp = async (e, isResend = false) => {
//         e.preventDefault();
//         const newErrors = { emailOrPhone: !emailOrPhone };

//         if (method === "email" && !validateEmail(emailOrPhone)) {
//             newErrors.emailOrPhone = true;
//             toast.error("Please enter a valid email address!");
//         } else if (method === "phone" && !validatePhone(emailOrPhone)) {
//             newErrors.emailOrPhone = true;
//             toast.error("Please enter a valid phone number!");
//         }

//         setErrors(newErrors);
//         if (newErrors.emailOrPhone) return;

//         try {
//             if (method === "email") {
//                 const response = await fetch(`http://localhost:3333/api/otp/change-password/send-otp`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ email: emailOrPhone }),
//                 });

//                 const data = await response.json();
//                 // console.log("data in sending OTP: ",data);
//                 if (data.success) {
//                     toast.success(isResend ? "OTP resent successfully!" : "OTP sent successfully!");
//                     setShowOtpInput(true); // Show OTP input field
//                     setResendDisabled(true); // Disable resend button
//                     setResendCountdown(60); // Reset countdown
//                 } else {
//                     toast.error(data.message || "Failed to send OTP.");
//                 }
//             }
//             else {
//                 toast.error("Phone OTP service is unawailable");
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             toast.error("An error occurred. Please try again.");
//         }
//     };

//     // Handle OTP verification
//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();
//         const newErrors = { otp: !otp };
//         setErrors(newErrors);
//         if (newErrors.otp) {
//             toast.error("Please enter the OTP!");
//             return;
//         }

//         try {
//             if (method === "email") {
//                 const response = await fetch(`http://localhost:3333/api/otp/verify-otp`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ email: emailOrPhone, otp }),
//                 });

//                 const data = await response.json();
//                 if (data.success) {
//                     toast.success("OTP verified successfully!");
//                     setStep(2);
//                 } else {
//                     toast.error("Invalid OTP.");
//                 }
//             }
//             else {
//                 toast.error("Phone OTP service is unawailable");
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             toast.error("An error occurred. Please try again.");
//         }
//     };

//     // Handle password reset
//     const handleResetPassword = async (e) => {
//         e.preventDefault();
//         const newErrors = {
//             password: !password || !validatePassword(password),
//             confirmPassword: password !== confirmPassword,
//         };

//         setErrors(newErrors);
//         if (Object.values(newErrors).some((error) => error)) {
//             if (newErrors.password) toast.error("Password must be at least 8 characters!");
//             if (newErrors.confirmPassword) toast.error("Passwords do not match!");
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:3333/api/auth/change-password`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ phoneOrEmail: emailOrPhone, passwordFromBody: password }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 toast.success("Password reset successfully!");
//                 navigate("/login");
//             } else {
//                 toast.error(data.message || "Failed to reset password.");
//             }
//         } catch (error) {
//             console.error("Error resetting password:", error);
//             toast.error("An error occurred. Please try again.");
//         }
//         // navigate("/login")
//     };

//     const pageVariants = {
//         initial: { opacity: 0, x: 50 },
//         animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
//         exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
//     };

//     return (
//         <>
//             <ToastContainer
//                 autoClose={3000}
//                 newestOnTop
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 progressStyle={{ background: "#155DFC" }}
//                 theme="light"
//                 style={{
//                     fontSize: "16px",
//                     fontWeight: "bold",
//                     color: "#ff4d4f",
//                     borderRadius: "8px",
//                     padding: "10px",
//                 }}
//             />
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={`step${step}`}
//                     className="flex w-screen justify-center items-center h-screen bg-[#ffffff] overflow-hidden"
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     variants={pageVariants}
//                 >
//                     <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                         <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                         <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                         <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                     </div>
//                     <div className="flex flex-col gap-1 w-[400px] h-fit z-10 bg-white p-8 rounded-4xl shadow-md shadow-[#c598de] text-center text-sm justify-center">
//                         {/* <div className="h-full w-fit flex justify-center items-center">
//                             <img src="./image1.svg" alt="" className="h-full" />
//                         </div> */}
//                         <div className="flex flex-col mb-2 items-center gap-3">
//                             <h2 className="text-4xl mb-3 font-bold text-[#5E0194]">
//                                 Forgot Password
//                             </h2>
//                             {step === 1 && (<p className="w-full text-left text-[#786D7F] opacity-[86%] text-sm">
//                                 Back to{" "}
//                                 <a
//                                     href="#"
//                                     className="text-[#A100FF] font-medium underline"
//                                     onClick={() => navigate("/login")}
//                                 >
//                                     Sign in
//                                 </a>
//                             </p>)}
//                         </div>
//                         {step === 1 && (
//                             <div>
//                                 <div className="mb-4 text-left">
//                                     <label className="block font-medium mb-1 text-black opacity-[73%]"> Reset using </label>
//                                     <div className="flex gap-4">
//                                         <label className="flex items-center gap-1">
//                                             <input
//                                                 type="radio"
//                                                 value="phone"
//                                                 checked={method === "phone"}
//                                                 onChange={() => {
//                                                     setMethod("phone");
//                                                     setEmailOrPhone("");
//                                                     setShowOtpInput(false);
//                                                     setOtp("");
//                                                 }}
//                                                 className="h-4 w-4 border-gray-300"
//                                             />
//                                             Phone
//                                         </label>
//                                         <label className="flex items-center gap-1">
//                                             <input
//                                                 type="radio"
//                                                 value="email"
//                                                 checked={method === "email"}
//                                                 onChange={() => {
//                                                     setMethod("email");
//                                                     setEmailOrPhone("");
//                                                     setShowOtpInput(false);
//                                                     setOtp("");
//                                                 }}
//                                                 className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
//                                             />
//                                             Email
//                                         </label>
//                                     </div>
//                                 </div>
//                                 {method === "phone" ? (
//                                     <div className="text-left mb-4">
//                                         <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                             Phone number
//                                         </label>
//                                         <PhoneInput
//                                             country={"in"}
//                                             value={emailOrPhone}
//                                             onChange={(value) => setEmailOrPhone(value)}
//                                             containerClass="w-full"
//                                             inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
//                                                 } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             buttonClass="border-gray-300 h-14 w-16"
//                                             dropdownClass="h-28"
//                                             containerStyle={{
//                                                 width: "100%",
//                                                 borderRadius: "50px",
//                                             }}
//                                             inputStyle={{
//                                                 height: "44px",
//                                                 width: "100%",
//                                                 borderRadius: "8px",
//                                             }}
//                                             buttonStyle={{
//                                                 position: "absolute",
//                                                 left: "5px",
//                                                 top: "1px",
//                                                 height: "40px",
//                                                 width: "40px",
//                                                 backgroundColor: "transparent",
//                                                 border: "none",
//                                                 outline: "none",
//                                             }}
//                                         />
//                                     </div>
//                                 ) : (
//                                     <div className="text-left mb-4">
//                                         <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                             Email address
//                                         </label>
//                                         <input
//                                             type="email"
//                                             value={emailOrPhone}
//                                             onChange={(e) => setEmailOrPhone(e.target.value)}
//                                             className={`w-full h-11 px-3 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
//                                                 } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             placeholder="Enter your email"
//                                         />
//                                     </div>
//                                 )}
//                                 {showOtpInput && (
//                                     <div className="text-left mb-2">
//                                         <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                             Enter OTP
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={otp}
//                                             onChange={(e) => setOtp(e.target.value)}
//                                             className={`w-full h-10 px-3 border ${errors.otp ? "border-red-500" : "border-gray-300"
//                                                 } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             placeholder="Enter OTP"
//                                         />
//                                     </div>
//                                 )}
//                                 <div className="w-full text-end text-xs mb-2">
//                                     {!showOtpInput ? (
//                                         <button
//                                             onClick={handleSendOtp}
//                                             className="text-[#5E0194] w-fit border-b border-[#5E0194] hover:text-violet-800 transition-all duration-300"
//                                         >
//                                             Send OTP
//                                         </button>
//                                     ) : (
//                                         <button
//                                             onClick={(e) => handleSendOtp(e, true)}
//                                             disabled={resendDisabled}
//                                             className={`w-fit border-b border-[#5E0194] transition-all duration-300 ${resendDisabled
//                                                 ? "text-gray-400 cursor-not-allowed"
//                                                 : "text-[#5E0194] hover:text-violet-800"
//                                                 }`}
//                                         >
//                                             Resend OTP {resendDisabled ? `(${resendCountdown}s)` : ""}
//                                         </button>
//                                     )}
//                                 </div>
//                                 {showOtpInput && (
//                                     <button
//                                         onClick={handleVerifyOtp}
//                                         className="bg-[#5E0194] text-white w-[40%] p-3 rounded-lg shadow-md hover:bg-violet-800 mt-4 transition-all duration-300 "
//                                     >
//                                         Verify OTP
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                         {step === 2 && (
//                             <div>
//                                 <div className="text-left relative mb-4">
//                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                         New Password
//                                     </label>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         className={`w-full h-10 px-2 pr-10 border ${errors.password ? "border-red-500" : "border-gray-300"
//                                             } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                         placeholder="Enter new password"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-2 top-[35px] text-gray-500"
//                                     >
//                                         {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//                                     </button>
//                                 </div>
//                                 <div className="text-left relative mb-4">
//                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                         Confirm Password
//                                     </label>
//                                     <input
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         value={confirmPassword}
//                                         onChange={(e) => setConfirmPassword(e.target.value)}
//                                         className={`w-full h-10 px-2 pr-10 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                                             } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                         placeholder="Confirm new password"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                         className="absolute right-2 top-[35px] text-gray-500"
//                                     >
//                                         {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//                                     </button>
//                                 </div>
//                                 <button
//                                     onClick={handleResetPassword}
//                                     className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
//                                 >
//                                     Reset Password
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </motion.div>
//             </AnimatePresence>
//         </>
//     );
// };

// export default ForgotPassword;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import OtpInput from "react-otp-input";
import "../Auth.css";
import PasswordValidator from "password-validator";

const schema = new PasswordValidator();
schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState("phone");
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(60);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();
    const [isOTPLoading, setIsOTPLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const cleanedPhone = phone.replace(/[^\d+]/g, "");
        const phoneRegex = /^\+?\d{10,15}$/;
        return phoneRegex.test(cleanedPhone);
    };

    // const validatePassword = (pwd) => {
    //     return pwd.length >= 8;
    // };

    const validatePassword = (password) => {
        const validationErrors = schema.validate(password, { details: true });
        if (validationErrors.length > 0) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, % with no space",
            }));
            return false;
        }
        return true;
    };

    useEffect(() => {
        let timer;
        if (resendDisabled && resendCountdown > 0) {
            timer = setInterval(() => {
                setResendCountdown((prev) => {
                    if (prev <= 1) {
                        setResendDisabled(false);
                        return 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendDisabled, resendCountdown]);

    const handleSendOtp = async (e, isResend = false) => {
        setResendDisabled(true);
        e.preventDefault();
        setFormError("");
        setIsOTPLoading(true);
        const newErrors = { emailOrPhone: !emailOrPhone };

        if (method === "email" && !validateEmail(emailOrPhone)) {
            newErrors.emailOrPhone = "Please enter a valid email address!";
            setFormError("Please enter a valid email address!");
        } else if (method === "phone" && !validatePhone(emailOrPhone)) {
            newErrors.emailOrPhone = "Please enter a valid phone number!";
            setFormError("Please enter a valid phone number!");
        } else if (!emailOrPhone) {
            newErrors.emailOrPhone = "This field is required";
            setFormError("This field is required");
        }

        setErrors(newErrors);
        console.log(errors);
        if (Object.values(newErrors).some((error) => error)) return;

        try {
            if (method === "email") {
                const response = await fetch(`http://localhost:3333/api/otp/change-password/send-otp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: emailOrPhone }),
                });

                const data = await response.json();
                if (data.success) {
                    setShowOtpInput(true);
                    setResendDisabled(true);
                    setResendCountdown(60);
                    setFormError("");
                    setErrors({});
                } else {
                    setResendDisabled(false);
                    setResendCountdown(0);
                    setFormError(data.message || "Failed to send OTP.");
                }
            } else {
                setFormError("Phone OTP service is unavailable");
            }
        } catch (error) {
            setFormError("An error occurred. Please try again.");
        }
        finally {
            setIsOTPLoading(false); // Stop loading
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setFormError("");
        const newErrors = { otp: !otp };

        if (!otp) {
            newErrors.otp = "Please enter the OTP!";
            setFormError("Please enter the OTP!");
        }

        setErrors(newErrors);
        if (Object.values(newErrors).some((error) => error)) return;

        try {
            if (method === "email") {
                const response = await fetch(`http://localhost:3333/api/otp/verify-otp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: emailOrPhone, otp }),
                });

                const data = await response.json();
                if (data.success) {
                    setStep(2);
                    setFormError("");
                    setErrors({});
                } else {
                    setFormError("Invalid OTP.");
                }
            } else {
                setFormError("Phone OTP service is unavailable");
            }
        } catch (error) {
            setFormError("An error occurred. Please try again.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setFormError("");
        const newErrors = {
            password: !validatePassword(password),
            confirmPassword: password !== confirmPassword,
        };

        if (newErrors.password) {
            newErrors.password = "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, % with no space";
            // setFormError("Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, % with no space");
        }
        if (newErrors.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match!";
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match!",
            }));
            // setFormError("Passwords do not match!");
        }

        setErrors(newErrors);
        if (Object.values(newErrors).some((error) => error)) return;

        try {
            const response = await fetch(`http://localhost:3333/api/auth/change-password`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneOrEmail: emailOrPhone, passwordFromBody: password }),
            });

            const data = await response.json();
            if (data.success) {
                navigate("/login");
            } else {
                setFormError(data.message || "Failed to reset password.");
            }
        } catch (error) {
            setFormError("An error occurred. Please try again.");
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
    };

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={`step${step}`}
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
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md z-10">
                        <div className="flex flex-col mb-2 items-center gap-3">
                            <h2 className="text-xl font-semibold text-gray-800 text-center">
                                Forgot Password
                            </h2>
                            <p className="text-sm text-gray-500 mb-6 text-center font-sans">
                                Enter your credentials to set new password
                            </p>
                        </div>
                        <div className="text-sm text-left text-red-500 font-medium">
                            <p>{formError}</p>
                        </div>
                        {step === 1 && (
                            <div>
                                <div className="mb-4 text-left">
                                    <label className="block font-medium mb-1 text-black opacity-[73%]">
                                        Reset using
                                    </label>
                                    {/* <div className="flex gap-4"> */}
                                    <div className="flex justify-center  w-full border border-gray-200 rounded-lg p-0.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMethod("phone");
                                                setEmailOrPhone("");
                                                setShowOtpInput(false);
                                                setOtp("");
                                                setErrors({});
                                                setFormError("");
                                                setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
                                            }}
                                            className={`w-full flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold ${method === "phone"
                                                ? "bg-purple-600 text-white rounded-lg"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            <span className="text-lg"><LuPhone /> </span> Phone
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMethod("email");
                                                setEmailOrPhone("");
                                                setShowOtpInput(false);
                                                setOtp("");
                                                setErrors({});
                                                setFormError("");
                                                setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
                                            }}
                                            className={`w-full flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold ${method === "email"
                                                ? "bg-purple-600 text-white rounded-lg"
                                                : "text-gray-500"
                                                } transition-all duration-200`}
                                        >
                                            <span className="text-lg"><MdOutlineMail /> </span> Email
                                        </button>
                                    </div>
                                    {/* <label className="flex items-center gap-1">
                                            <input
                                                type="radio"
                                                value="phone"
                                                checked={method === "phone"}
                                                onChange={() => {
                                                    setMethod("phone");
                                                    setEmailOrPhone("");
                                                    setShowOtpInput(false);
                                                    setOtp("");
                                                    setErrors({});
                                                    setFormError("");
                                                }}
                                                className="h-4 w-4 border-gray-300"
                                            />
                                            Phone
                                        </label> */}
                                    {/* <label className="flex items-center gap-1">
                                            <input
                                                type="radio"
                                                value="email"
                                                checked={method === "email"}
                                                onChange={() => {
                                                    setMethod("email");
                                                    setEmailOrPhone("");
                                                    setShowOtpInput(false);
                                                    setOtp("");
                                                    setErrors({});
                                                    setFormError("");
                                                }}
                                                className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
                                            />
                                            Email
                                        </label> */}


                                    {/* </div> */}
                                </div>
                                {method === "phone" ? (
                                    <div className="text-left mb-4">
                                        <label className="flex items-center gap-1 font-medium mb-2 text-black opacity-[73%]">
                                            Phone number
                                            {errors.emailOrPhone && (
                                                <p className="text-red-500 text-sm">{errors.emailOrPhone ? "*" : ""}</p>
                                            )}
                                        </label>
                                        {/* <PhoneInput
                                            country={"in"}
                                            value={emailOrPhone}
                                            onChange={(value) => {
                                                setEmailOrPhone(value);
                                                setFormError("");
                                                setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
                                            }}
                                            containerClass="w-full"
                                            inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            buttonClass="border-gray-300 h-14 w-16"
                                            dropdownClass="h-28"
                                            containerStyle={{
                                                width: "100%",
                                                borderRadius: "50px",
                                            }}
                                            inputStyle={{
                                                height: "44px",
                                                width: "100%",
                                                borderRadius: "8px",
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
                                        /> */}
                                        <PhoneInput
                                            country={"in"}
                                            value={emailOrPhone}
                                            onChange={(value) => {
                                                setEmailOrPhone(value);
                                                setFormError("");
                                                setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
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
                                    <div className="text-left mb-4">
                                        <label className="flex items-center gap-1 font-medium mb-2 text-black opacity-[73%]">
                                            Email address
                                            {errors.emailOrPhone && (
                                                <p className="text-red-500 text-sm">{errors.emailOrPhone ? "*" : ""}</p>
                                            )}
                                        </label>
                                        <input
                                            type="email"
                                            value={emailOrPhone}
                                            onChange={(e) => {
                                                setEmailOrPhone(e.target.value);
                                                setFormError("");
                                                setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
                                            }}
                                            className={`w-full h-12 px-4 border ${errors.emailOrPhone ? "border-red-500" : "border-gray-200"
                                                } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                )}
                                {showOtpInput && (
                                    <div className="text-left mb-1">
                                        <label className="flex items-center gap-1 font-medium mb-2 text-black opacity-[73%]">
                                            Enter OTP
                                            {errors.otp && (
                                                <p className="text-red-500 text-sm">{errors.otp ? "*" : ""}</p>
                                            )}
                                        </label>
                                        {/* <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => {
                                                setOtp(e.target.value);
                                                setFormError("");
                                                setErrors((prev) => ({ ...prev, otp: "" }));
                                            }}
                                            className={`w-full h-10 px-3 border ${errors.otp ? "border-red-500" : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            placeholder="Enter OTP"
                                        /> */}
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    style={{
                                                        width: "48px",
                                                        height: "48px",
                                                        fontSize: "20px",
                                                        textAlign: "center",
                                                        border: "1px solid #ccc",
                                                        borderRadius: "8px",
                                                        margin: "auto",
                                                        transition: "border 0.2s ease",
                                                        ":focus": {
                                                            outline: "none",
                                                            border: "2px solid #7c3aed",
                                                        },
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                )}
                                {/* <div className="w-full text-end text-xs mb-2">
                                    {!showOtpInput ? (
                                        <button
                                            onClick={handleSendOtp}
                                            className="text-[#5E0194] w-fit border-b border-[#5E0194] hover:text-violet-800 transition-all duration-300"
                                        >
                                            Send OTP
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => handleSendOtp(e, true)}
                                            disabled={resendDisabled}
                                            className={`w-fit border-b border-[#5E0194] transition-all duration-300 ${resendDisabled
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-[#5E0194] hover:text-violet-800"
                                                }`}
                                        >
                                            Resend OTP {resendDisabled ? `(${resendCountdown}s)` : ""}
                                        </button>
                                    )}
                                </div> */}
                                <div className="w-full text-start text-xs mb-4">
                                    {!showOtpInput ? (
                                        <></>
                                    ) : (
                                        <button
                                            onClick={(e) => handleSendOtp(e, true)}
                                            disabled={resendDisabled}
                                            className={`w-fit border-b border-[#5E0194] transition-all duration-300 ${resendDisabled
                                                ? "text-gray-400 cursor-not-allowed border-gray-300"
                                                : "text-[#5E0194] hover:text-violet-800"
                                                }`}
                                        >
                                            Resend OTP {resendDisabled ? `(${resendCountdown}s)` : ""}
                                        </button>
                                    )}
                                </div>
                                {/* {showOtpInput && (
                                    <button
                                        onClick={handleVerifyOtp}
                                        className="bg-[#5E0194] text-white w-[40%] p-3 rounded-lg shadow-md hover:bg-violet-800 mt-4 transition-all duration-300"
                                    >
                                        Verify OTP
                                    </button>
                                )} */}
                                <div className="w-full text-end text-xs mb-4">
                                    {!showOtpInput ? (
                                        <button
                                            onClick={handleSendOtp}
                                            className="bg-[#A100FF] text-white w-full p-3 rounded-lg shadow-md hover:shadow-purple-400 hover:bg-purple-600 mx-auto transition-all duration-300 text-lg font-semibold flex items-center justify-center"
                                            // className="bg-[#A011FF] text-white text-lg font-semibold w-full p-2.5 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300 flex items-center justify-center"
                                            disabled={isOTPLoading}
                                        >
                                            {isOTPLoading ? (
                                                <>
                                                    <span className="loader mr-2"></span>
                                                    Sending...
                                                </>
                                            ) : (
                                                "Send OTP"
                                            )}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleVerifyOtp}
                                            className={` w-full p-3 rounded-lg shadow-md mx-auto text-lg font-semibold flex items-center justify-center ${otp.length === 6 ? "bg-[#A100FF] text-white hover:shadow-purple-400 hover:bg-purple-600" : "bg-gray-300 text-gray-700"} transition-all duration-300`}
                                            disabled={otp.length !== 6}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <div className="flex flex-col gap-1 mb-4">
                                    <div className="text-left relative">
                                        <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
                                            New Password *
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setFormError("");
                                                setErrors((prev) => ({ ...prev, password: "" }));
                                            }}
                                            className={`w-full h-12 px-4 border ${errors.password ? "border-red-500" : "border-gray-200"
                                                } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 bottom-3.5 text-gray-500"
                                        >
                                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-xs">{errors.password ? `${errors.password}` : ""}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 mb-4">
                                    <div className="text-left relative">
                                        <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
                                            Confirm Password *
                                        </label>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setFormError("");
                                                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                                            }}
                                            className={`w-full h-12 px-4 border ${errors.confirmPassword ? "border-red-500" : "border-gray-200"
                                                } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-2 bottom-3.5 text-gray-500"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs">{errors.confirmPassword ? `${errors.confirmPassword}` : ""}</p>
                                    )}
                                </div>
                                <button
                                    onClick={handleResetPassword}
                                    className="bg-[#A100FF] text-white w-full p-3 rounded-lg shadow-md hover:shadow-purple-400 hover:bg-purple-600 mx-auto transition-all duration-300 text-lg font-semibold"
                                >
                                    Reset Password
                                </button>
                            </div>

                        )}
                        {step === 1 && (
                            <p className="text-gray-500 opacity-[99%] text-sm text-center ">
                                Already have an account?{" "}
                                <a href="../login" className="text-[#A100FF] font-medium hover:underline" >
                                    Sign in
                                </a>
                            </p>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default ForgotPassword;