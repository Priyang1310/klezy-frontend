
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { motion, AnimatePresence } from "framer-motion";
// import Select from "react-select";
// import { Country, State, City } from "country-state-city";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import PasswordValidator from "password-validator";
// import Modal from "react-modal";
// import TermsAndConditions from "../Policies/TermsAndConditions";
// import PrivecyPolicies from "../Policies/PrivecyPolicies";
// import { MdOutlinePerson } from "react-icons/md";
// import { MdPeopleOutline } from "react-icons/md";
// import { IoLocationOutline } from "react-icons/io5";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { GoLock } from "react-icons/go";
// import { MdOutlineEmail } from "react-icons/md";
// import OtpInput from "react-otp-input";
// import { MdOutlinePhoneIphone } from "react-icons/md";
// import "../Auth.css";
// import { Globe } from "lucide-react";


// // Ensure Modal is bound to your app element for accessibility
// Modal.setAppElement("#root");

// // Initialize password validator schema
// const schema = new PasswordValidator();
// schema
//     .is().min(8)
//     .has().uppercase()
//     .has().lowercase()
//     .has().digits()
//     .has().symbols()
//     .has().not().spaces();

// const SignUpNew = () => {
//     const navigate = useNavigate();

//     const [firstName, setFirstName] = useState("");
//     const [middleName, setMiddleName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [email, setEmail] = useState("");
//     const [PhoneOTP, setPhoneOTP] = useState("");
//     const [EmailOTP, setEmailOTP] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [role, setRole] = useState("Founder");
//     const [step, setStep] = useState(2);
//     const [userData, setUserData] = useState(null);
//     const [errors, setErrors] = useState({});
//     const [dob, setDob] = useState("");
//     const [showOTPInput, setShowOTPInput] = useState(false);
//     const [showEmailCodeInput, setShowEmailCodeInput] = useState(false);
//     const [country, setCountry] = useState(null);
//     const [state, setState] = useState(null);
//     const [district, setDistrict] = useState(null);
//     const [countries, setCountries] = useState([]);
//     const [availableStates, setAvailableStates] = useState([]);
//     const [availableDistricts, setAvailableDistricts] = useState([]);
//     const [gender, setGender] = useState(null);
//     const [timer, setTimer] = useState(0);
//     const [resendDisabled, setResendDisabled] = useState(false);
//     const [agreed, setAgreed] = useState(true);
//     const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
//     const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
//     // const [otp, setOtp] = useState("");

//     // const handleChange = (otp) => {
//     //     setOtp(otp);
//     // };

//     // Functions to control Terms modal
//     const openTermsModal = () => {
//         console.log("Opening Terms Modal");
//         setIsTermsModalOpen(true);
//     };
//     const closeTermsModal = () => setIsTermsModalOpen(false);

//     // Functions to control Privacy modal
//     const openPrivacyModal = () => {
//         console.log("Opening Privacy Modal");
//         setIsPrivacyModalOpen(true);
//     };
//     const closePrivacyModal = () => setIsPrivacyModalOpen(false);

//     const modalStyles = {
//         content: {
//             top: "50%",
//             left: "50%",
//             right: "auto",
//             bottom: "auto",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//             width: "100%",
//             maxWidth: "800px",
//             maxHeight: "90vh",
//             overflowY: "auto",
//             padding: "4px",
//             borderRadius: "12px",
//             backgroundColor: "#ffffff",
//             border: "none",
//         },
//         overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             zIndex: 1000,
//         },
//     };

//     // Regex for name validation
//     const nameRegex = /^[A-Za-z\s\-]*$/;

//     // Validate name fields
//     const validateName = (value, field) => {
//         if (!value && field !== "middleName") {
//             return "This field is required";
//         }
//         if (value && !nameRegex.test(value)) {
//             return "Only letters, spaces, and hyphens are allowed";
//         }
//         return "";
//     };

//     const validateDOB = (dob) => {
//         if (!dob) {
//             return "DOB is required";
//         }
//         const today = new Date();
//         const selectedDate = new Date(dob);
//         const fourteenYearsAgo = new Date();
//         fourteenYearsAgo.setFullYear(today.getFullYear() - 14);

//         if (selectedDate > today) {
//             return "Please Insert Valid Date";
//         }
//         if (selectedDate > fourteenYearsAgo) {
//             return "You must be at least 14 years old";
//         }
//         return "";
//     };

//     // Validate email
//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     // Validate phone
//     const validatePhone = (phone) => {
//         const cleanedPhone = phone.replace(/[^\d+]/g, "");
//         const phoneRegex = /^\+?\d{10,15}$/;
//         return phoneRegex.test(cleanedPhone);
//     };

//     // Handle input changes
//     const handleFirstNameChange = (e) => {
//         const value = e.target.value;
//         setFirstName(value);
//         setErrors((prev) => ({
//             ...prev,
//             firstName: "",
//         }));
//     };

//     const handleMiddleNameChange = (e) => {
//         const value = e.target.value;
//         setMiddleName(value);
//         setErrors((prev) => ({
//             ...prev,
//             middleName: "",
//         }));
//     };

//     const handleLastNameChange = (e) => {
//         const value = e.target.value;
//         setLastName(value);
//         setErrors((prev) => ({
//             ...prev,
//             lastName: "",
//         }));
//     };

//     const handleDobChange = (e) => {
//         const value = e.target.value;
//         setDob(value);
//         setErrors((prev) => ({ ...prev, dob: validateDOB(value) }));
//     };

//     const getFourteenYearsAgoDate = () => {
//         const today = new Date();
//         today.setFullYear(today.getFullYear() - 14);
//         return today.toISOString().split("T")[0];
//     };

//     const handlePhoneChange = (phone) => {
//         setPhoneNumber(phone);
//         setErrors((prev) => ({ ...prev, phoneNumber: "" }));
//     };

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//         setErrors((prev) => ({ ...prev, email: "" }));
//     };

//     const handlePhoneOTPChange = (e) => {
//         setPhoneOTP(e.target.value);
//         setErrors((prev) => ({ ...prev, PhoneOTP: "" }));
//     };

//     const handleEmailOTPChange = (e) => {
//         setEmailOTP(e.target.value);
//         setErrors((prev) => ({ ...prev, EmailOTP: "" }));
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//         setErrors((prev) => ({ ...prev, password: "" }));
//     };

//     const handleConfirmPasswordChange = (e) => {
//         setConfirmPassword(e.target.value);
//         setErrors((prev) => ({ ...prev, confirmPassword: "" }));
//     };

//     const handleAgreedChange = (e) => {
//         setAgreed(e.target.checked);
//         setErrors((prev) => ({ ...prev, agreed: "" }));
//     };

//     // Timer for OTP resend
//     useEffect(() => {
//         let interval;
//         if (resendDisabled && timer > 0) {
//             interval = setInterval(() => {
//                 setTimer((prev) => {
//                     if (prev <= 1) {
//                         setResendDisabled(false);
//                         return 60;
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [resendDisabled, timer]);

//     const handleSendEmailOTP = async (e, isResend = false) => {
//         e.preventDefault();
//         if (!email) {
//             setErrors((prev) => ({ ...prev, email: "Email is required" }));
//             toast.error("Email is required");
//             return;
//         }
//         if (!validateEmail(email)) {
//             setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
//             toast.error("Invalid email address");
//             return;
//         }

//         try {
//             const response = await fetch(
//                 "http://localhost:3333/api/otp/send-otp",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ email }),
//                 }
//             );

//             const data = await response.json();
//             console.log("data is: ",data);
//             if (data.success) {
//                 setShowEmailCodeInput(true);
//                 setResendDisabled(true);
//                 setTimer(60);
//                 toast.success(isResend ? "OTP resent successfully!" : "OTP sent successfully!");
//             } else {
//                 setErrors((prev) => ({ ...prev, email: data.message }));
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             toast.error("An error occurred. Please try again.");
//         }
//     };

//     const handleSendPhoneOTP = (e, isResend = false) => {
//         e.preventDefault();
//         if (!phoneNumber) {
//             setErrors((prev) => ({ ...prev, phoneNumber: "Phone number is required" }));
//             toast.error("Phone number is required");
//             return;
//         }
//         if (!validatePhone(phoneNumber)) {
//             setErrors((prev) => ({ ...prev, phoneNumber: "Invalid phone number" }));
//             toast.error("Invalid phone number");
//             return;
//         }

//         setShowOTPInput(true);
//         setResendDisabled(true);
//         setTimer(60);
//         toast.success(isResend ? "OTP resent successfully!" : "OTP sent successfully!");
//     };

//     // Fetch countries
//     useEffect(() => {
//         const countryData = Country.getAllCountries().map((c) => ({
//             value: c.isoCode,
//             label: c.name,
//         }));
//         setCountries(countryData);
//     }, []);

//     // Fetch states
//     useEffect(() => {
//         if (country) {
//             const stateData = State.getStatesOfCountry(country.value).map(
//                 (s) => ({
//                     value: s.isoCode,
//                     label: s.name,
//                 })
//             );
//             setAvailableStates(stateData);
//             setState(null);
//             setDistrict(null);
//             setAvailableDistricts([]);
//         } else {
//             setAvailableStates([]);
//             setState(null);
//             setDistrict(null);
//             setAvailableDistricts([]);
//         }
//     }, [country]);

//     // Fetch districts
//     useEffect(() => {
//         if (state && country) {
//             const districtData = City.getCitiesOfState(
//                 country.value,
//                 state.value
//             ).map((d) => ({
//                 value: d.name,
//                 label: d.name,
//             }));
//             setAvailableDistricts(districtData);
//             setDistrict(null);
//         } else {
//             setAvailableDistricts([]);
//             setDistrict(null);
//         }
//     }, [state, country]);

//     const genderOptions = [
//         { value: "Male", label: "Male" },
//         { value: "Female", label: "Female" },
//         { value: "Prefer not to say", label: "Prefer not to say" },
//     ];

//     const customStyles = {
//         option: (provided, state) => ({
//             ...provided,
//             backgroundColor: state.isFocused ? "#DDD6FE" : "white",
//             color: "black",
//         }),
//         control: (provided) => ({
//             ...provided,
//             borderColor: "#D1D5DB",
//             borderRadius: "0.5rem",
//             boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
//             "&:hover": {
//                 borderColor: "none",
//             },
//         }),
//     };

//     const pageVariants = {
//         initial: { opacity: 0, x: 50 },
//         animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
//         exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
//     };

//     const handleGenderChange = (selectedOption) => {
//         setGender(selectedOption);
//         setErrors((prev) => ({ ...prev, gender: "" }));
//     };

//     const handleCountryChange = (selectedOption) => {
//         setCountry(selectedOption);
//         setErrors((prev) => ({ ...prev, country: "" }));
//     };

//     const handleStateChange = (selectedOption) => {
//         setState(selectedOption);
//         setErrors((prev) => ({ ...prev, state: "" }));
//     };

//     const handleDistrictChange = (selectedOption) => {
//         setDistrict(selectedOption);
//         setErrors((prev) => ({ ...prev, district: "" }));
//     };

//     const handleRoleChange = (e) => {
//         setRole(e.currentTarget.value); // use currentTarget for buttons
//         console.log("role:", e.currentTarget.value);
//         setErrors((prev) => ({ ...prev, role: "" }));
//     };

//     const passwordValidation = (password) => {
//         const validationErrors = schema.validate(password, { details: true });
//         if (validationErrors.length > 0) {
//             setErrors((prev) => ({
//                 ...prev,
//                 password: "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, % with no space",
//             }));
//             return false;
//         }
//         return true;
//     };

//     const validateEmailOTP = async () => {
//         if (!EmailOTP) {
//             setErrors((prev) => ({ ...prev, EmailOTP: "Email OTP is required" }));
//             return false;
//         }

//         try {
//             const response = await fetch(
//                 "http://localhost:3333/api/otp/verify-otp",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ email, otp: EmailOTP }),
//                 }
//             );

//             const data = await response.json();
//             if (data.success) {
//                 return true;
//             } else {
//                 setErrors((prev) => ({ ...prev, EmailOTP: "Invalid OTP" }));
//                 toast.error("Invalid OTP");
//                 return false;
//             }
//         } catch (error) {
//             console.error("Error verifying OTP:", error);
//             setErrors((prev) => ({ ...prev, EmailOTP: "An error occurred" }));
//             toast.error("An error occurred. Please try again.");
//             return false;
//         }
//     };

//     const validatePhoneOTP = async () => {
//         if (!PhoneOTP) {
//             setErrors((prev) => ({ ...prev, PhoneOTP: "Phone OTP is required" }));
//             return false;
//         }
//         if (PhoneOTP !== "1234") {
//             setErrors((prev) => ({ ...prev, PhoneOTP: "Invalid Phone OTP" }));
//             toast.error("Invalid Phone OTP");
//             return false;
//         }
//         return true;
//     };

//     const handleOnClickNextForFirstSection = () => {
//         const newErrors = {
//             firstName: validateName(firstName, "firstName"),
//             middleName: validateName(middleName, "middleName"),
//             lastName: validateName(lastName, "lastName"),
//             gender: !gender || gender.value === "" ? "Gender is required" : "",
//             country: !country ? "Country is required" : "",
//             state: !state ? "State is required" : "",
//             district: !district ? "District is required" : "",
//             role: !role ? "Role is required" : "",
//             dob: validateDOB(dob),
//         };

//         setErrors(newErrors);

//         const hasErrors = Object.values(newErrors).some((error) => error);

//         if (hasErrors) {
//             toast.error("Please correct the errors");
//             return;
//         }

//         setStep(2);
//     };

//     const handleOnClickNextForSecondSection = async () => {
//         const newErrors = {
//             email: !email ? "Email is required" : "",
//             EmailOTP: !EmailOTP ? "Email verification code is required" : "",
//         };

//         if (email && !validateEmail(email)) {
//             newErrors.email = "Invalid email address";
//         }

//         setErrors(newErrors);

//         const hasErrors = Object.values(newErrors).some((error) => error);
//         if (hasErrors) {
//             toast.error("Please correct the errors");
//             return;
//         }

//         const isValidOTP = await validateEmailOTP();
//         if (!isValidOTP) {
//             return;
//         }

//         setTimer(0);
//         setStep(3);
//     };

//     const handleOnClickNextForThirdSection = async () => {
//         const newErrors = {
//             phoneNumber: !phoneNumber ? "Phone number is required" : "",
//             PhoneOTP: !PhoneOTP ? "Phone verification code is required" : "",
//         };

//         if (phoneNumber && !validatePhone(phoneNumber)) {
//             newErrors.phoneNumber = "Invalid phone number";
//         }

//         setErrors(newErrors);

//         const hasErrors = Object.values(newErrors).some((error) => error);
//         if (hasErrors) {
//             toast.error("Please correct the errors");
//             return;
//         }

//         const isValidOTP = await validatePhoneOTP();
//         if (!isValidOTP) {
//             return;
//         }

//         setTimer(0);
//         setStep(4);
//     };

//     const handleOnClickPreviousForSecondSection = () => {
//         setStep(1);
//     };

//     const handleOnClickPreviousForThirdSection = () => {
//         setStep(2);
//     };

//     const handleGetStarted = () => {
//         const newErrors = {
//             password: !password ? "Password is required" : "",
//             confirmPassword: !confirmPassword ? "Confirm password is required" : "",
//             agreed: !agreed ? "You must agree to the terms and conditions" : "",
//         };

//         if (password && !passwordValidation(password)) {
//             newErrors.password = "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, % with no space";
//         }

//         if (confirmPassword && !passwordValidation(confirmPassword)) {
//             newErrors.confirmPassword = "Fill the password first";
//         }

//         if (password && confirmPassword && password !== confirmPassword) {
//             newErrors.confirmPassword = "Passwords do not match";
//         }

//         setErrors((prev) => ({ ...prev, ...newErrors }));

//         const hasErrors = Object.values(newErrors).some((error) => error);
//         if (hasErrors) {
//             toast.error("Please correct the errors");
//             return;
//         }

//         registerUser();
//     };

//     const handleLogin = () => {
//         navigate("/login");
//     };

//     const registerUser = async () => {
//         try {
//             const response = await fetch(
//                 "http://localhost:3333/api/auth/signup",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         firstName,
//                         middleName,
//                         lastName,
//                         phoneNumber,
//                         password,
//                         role,
//                         gender: gender?.value,
//                         dob,
//                         email,
//                         country: country?.label,
//                         state: state?.label,
//                         city: district?.label,
//                         agreed,
//                     }),
//                 }
//             );
//             const data = await response.json();
//             if (data.success) {
//                 setUserData(data.result);
//                 navigate("/login");
//                 toast.success("Registration successful!");
//             } else {
//                 setErrors((prev) => ({ ...prev, form: data.message }));
//                 toast.error(data.message || "Registration failed");
//             }
//         } catch (error) {
//             setErrors((prev) => ({ ...prev, form: "Registration failed" }));
//             toast.error("An error occurred during registration");
//         }
//     };



//     return (
//         <>
//             <AnimatePresence mode="wait">
//                 {step === 1 && (
//                     <motion.div
//                         key="step1"
//                         className="flex flex-col w-screen py-10 items-center h-screen overflow-y-auto bg-violet-50"
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={pageVariants}
//                     >
//                         <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                             {/* <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
//                             {/* <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
//                             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         </div>
//                         {/* Header */}
//                         <div className="text-center mb-10">
//                             <div className="inline-flex items-center gap-3 mb-3">
//                                 <img src="./FullLogo.svg" alt="" className="h-12" />
//                             </div>
//                             <h2 className="text-5xl font-bold text-[#A100FF] mb-3">
//                                 Sign up <span className="text-gray-900">to get started</span>
//                             </h2>
//                             <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
//                                 Connect with amazing opportunities and people in just a few steps
//                             </p>
//                             <p className="text-gray-500 opacity-[99%] text-xl">
//                                 Already have an account?{" "}
//                                 <a href="#" className="text-[#A100FF] font-medium underline" onClick={handleLogin}>
//                                     Sign in
//                                 </a>
//                             </p>
//                         </div>
//                         <div className="flex gap-0 h-fit w-[75%] z-10 bg-white shadow-xl rounded-4xl text-center text-sm items-center justify-center">
//                             <div className="flex flex-col h-full gap-2 w-full p-10 rounded-lg justify-center">
//                                 <div className="flex flex-col w-full gap-2 mb-4">
//                                     <div className="text-left mb-8">
//                                         <label className="flex items-center gap-3 text-xl mb-6 text-gray-700 font-semibold"><MdPeopleOutline className="h-8 w-8 p-1 rounded-lg bg-purple-100 text-[#8d00ec]" /> I want to:</label>
//                                         {/* Type of user */}
//                                         <div className="flex w-full gap-5 h-44">
//                                             <button
//                                                 className={`flex flex-col hover:scale-102 text-left w-1/2 border-2 ${role === "Founder" ? "bg-[#FAF4FF] border-[#be6df5] shadow shadow-[#be6df5]" : "bg-gray-50 border-gray-300 hover:border-[#A011FF] hover:shadow-md hover:shadow-gray-300"} transition-all duration-200 rounded-xl px-4 py-6`}
//                                                 onClick={(e) => handleRoleChange(e)}
//                                                 value={"Founder"}
//                                             >
//                                                 <div className="w-full flex items-center justify-end h-1">
//                                                     {role === "Founder" && (
//                                                         <p className="bg-[#9830FF] text-white w-fit px-2 py-0.5 rounded-full text-xs font-semibold">✓ Selected</p>
//                                                     )}
//                                                 </div>
//                                                 <div className="flex gap-5 px-5">
//                                                     <div className={` h-14 w-14 text-3xl rounded-xl flex items-center justify-center ${role === "Founder" ? "bg-[#A011FF] text-white shadow-xl shadow-violet-300" : "bg-gray-300"}`}><MdOutlinePerson /></div>
//                                                     <div className="flex-1">
//                                                         <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                                             Discover Talent
//                                                         </h3>
//                                                         <p className="text-gray-600 leading-relaxed mb-2 text-base">
//                                                             Find and connect with amazing professionals
//                                                             for your next big project.
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </button>
//                                             <button
//                                                 className={`flex flex-col hover:scale-102 text-left w-1/2 border-2 ${role === "GetDiscovered" ? "bg-[#FAF4FF] border-[#be6df5] shadow shadow-[#be6df5]" : "bg-gray-50 border-gray-300 hover:border-[#A011FF] hover:shadow-md hover:shadow-gray-300"} transition-all duration-200 rounded-xl px-4 py-6`}
//                                                 onClick={(e) => handleRoleChange(e)}
//                                                 value={"GetDiscovered"}
//                                             >
//                                                 <div className="w-full flex items-center justify-end h-1">
//                                                     {role === "GetDiscovered" && (
//                                                         <p className="bg-[#9830FF] text-white w-fit px-2 py-0.5 rounded-full text-xs font-semibold">✓ Selected</p>
//                                                     )}
//                                                 </div>
//                                                 <div className="flex gap-5 px-5">
//                                                     <div className={`shadow h-14 w-14 text-3xl rounded-xl flex items-center justify-center ${role === "GetDiscovered" ? "bg-[#A011FF] text-white shadow-xl shadow-violet-300" : "bg-gray-300"}`}><MdPeopleOutline /></div>
//                                                     <div className="flex-1">
//                                                         <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                                             Get Discovered
//                                                         </h3>
//                                                         <p className="text-gray-600 leading-relaxed mb-2 text-md text-base">
//                                                             Showcase your talent and connect with people who are looking for someone exactly like
//                                                             you.
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </button>
//                                         </div>
//                                         {/* Below is actual role: */}
//                                         {/* <div className="flex gap-4">
//                                             <label
//                                                 className={`flex items-center gap-2 ${errors.role
//                                                     ? "text-red-500"
//                                                     : ""
//                                                     }`}
//                                             >
//                                                 <input
//                                                     type="radio"
//                                                     name="role"
//                                                     value="Founder"
//                                                     checked={role === "Founder"}
//                                                     onChange={handleRoleChange}
//                                                     className="h-4 w-4 border-gray-300"
//                                                 />
//                                                 <span className="text-sm text-gray-600"> Discover Talent </span>
//                                             </label>
//                                             <label
//                                                 className={`flex items-center gap-2 ${errors.role
//                                                     ? "text-red-500"
//                                                     : ""
//                                                     }`}
//                                             >
//                                                 <input
//                                                     type="radio"
//                                                     name="role"
//                                                     value="GetDiscovered"
//                                                     checked={
//                                                         role === "GetDiscovered"
//                                                     }
//                                                     onChange={handleRoleChange}
//                                                     className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
//                                                 />
//                                                 <span className="text-sm text-gray-600"> Get Discovered </span>
//                                             </label>
//                                         </div> */}
//                                         {errors.role && (
//                                             <p className="text-red-500 text-xs mt-1"> {errors.role} </p>
//                                         )}
//                                     </div>
//                                     <div className="grid grid-cols-2 gap-10">
//                                         <div className="flex flex-col">
//                                             <label className="border-b border-gray-300 pb-3 flex items-center gap-3 text-xl mb-6 text-gray-700 font-semibold"><MdOutlinePerson className="h-8 w-8 p-1 rounded-lg bg-purple-100 text-[#8d00ec]" /> Personal Details</label>
//                                             {/* First Name, Mid name and Last name */}
//                                             <div className="grid grid-cols-2 gap-4 w-full">
//                                                 <div className="text-left w-full py-1">
//                                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                         First Name *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         className={`w-full h-12 px-2 border ${errors.firstName
//                                                             ? "border-red-500"
//                                                             : "border-gray-300"
//                                                             } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                         placeholder="Enter First Name"
//                                                         value={firstName}
//                                                         onChange={handleFirstNameChange}
//                                                     />
//                                                     {errors.firstName && (
//                                                         <p className="text-red-500 text-xs mt-1"> {errors.firstName}</p>
//                                                     )}
//                                                 </div>
//                                                 <div className="text-left w-full py-1">
//                                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                         Last Name *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         className={`w-full h-12 px-2 border ${errors.lastName
//                                                             ? "border-red-500"
//                                                             : "border-gray-300"
//                                                             } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                         placeholder="Enter Last Name"
//                                                         value={lastName}
//                                                         onChange={handleLastNameChange}
//                                                     />
//                                                     {errors.lastName && (
//                                                         <p className="text-red-500 text-xs mt-1"> {errors.lastName} </p>
//                                                     )}
//                                                 </div>
//                                                 <div className="col-span-2 text-left w-full py-1">
//                                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                         Middle Name
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         className={`w-full h-12 px-2 border ${errors.middleName
//                                                             ? "border-red-500"
//                                                             : "border-gray-300"
//                                                             } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                         placeholder="Enter Middle Name"
//                                                         value={middleName}
//                                                         onChange={
//                                                             handleMiddleNameChange
//                                                         }
//                                                     />
//                                                     {errors.middleName && (
//                                                         <p className="text-red-500 text-xs mt-1"> {errors.middleName} </p>
//                                                     )}
//                                                 </div>
//                                                 <div className="text-left w-full py-1">
//                                                     <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                                                         <FaRegCalendarAlt className="text-violet-800" /> Date of Birth *
//                                                     </label>
//                                                     <input
//                                                         type="date"
//                                                         value={dob}
//                                                         max={getFourteenYearsAgoDate()}
//                                                         onChange={handleDobChange}
//                                                         required
//                                                         className={`w-full h-12 px-2 border ${errors.dob
//                                                             ? "border-red-500"
//                                                             : "border-gray-300"
//                                                             } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                     />
//                                                     {errors.dob && (
//                                                         <p className="text-red-500 text-xs mt-1"> {errors.dob} </p>
//                                                     )}
//                                                 </div>
//                                                 <div className="text-left w-full py-1">
//                                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                         Gender *
//                                                     </label>
//                                                     <Select
//                                                         options={genderOptions}
//                                                         value={gender}
//                                                         onChange={handleGenderChange}
//                                                         placeholder="Gender"
//                                                         styles={{
//                                                             ...customStyles,
//                                                             control: (provided) => ({
//                                                                 ...provided,
//                                                                 borderColor:
//                                                                     errors.gender
//                                                                         ? "#EF4444"
//                                                                         : "#D1D5DB",
//                                                                 borderRadius: "0.5rem",
//                                                                 height: "3rem",
//                                                                 boxShadow:
//                                                                     "1px 1px 3px rgba(0, 0, 0, 0.2)",
//                                                                 "&:hover": {
//                                                                     borderColor: "none",
//                                                                 },
//                                                             }),
//                                                         }}
//                                                     />
//                                                     {errors.gender && (
//                                                         <p className="text-red-500 text-xs mt-1"> {errors.gender} </p>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="text-left w-full">
//                                             <label className="border-b border-gray-300 pb-3 flex items-center gap-3 text-xl mb-6 text-gray-700 font-semibold"><IoLocationOutline className="h-8 w-8 p-1 rounded-lg bg-purple-100 text-[#8d00ec]" /> Location</label>
//                                             <div className="flex flex-col gap-4">
//                                                 <div className="w-full py-1">
//                                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                         Country *
//                                                     </label>
//                                                     <Select
//                                                         options={countries}
//                                                         value={country}
//                                                         onChange={
//                                                             handleCountryChange
//                                                         }
//                                                         placeholder="Country"
//                                                         styles={{
//                                                             ...customStyles,
//                                                             control: (
//                                                                 provided
//                                                             ) => ({
//                                                                 ...provided,
//                                                                 borderColor:
//                                                                     errors.country
//                                                                         ? "#EF4444"
//                                                                         : "#D1D5DB",
//                                                                 borderRadius:
//                                                                     "0.5rem",
//                                                                 height: "3rem",
//                                                                 boxShadow:
//                                                                     "1px 1px 3px rgba(0, 0, 0, 0.2)",
//                                                                 "&:hover": {
//                                                                     borderColor:
//                                                                         "none",
//                                                                 },
//                                                             }),
//                                                         }}
//                                                         isSearchable
//                                                         aria-label="Select country"
//                                                     />
//                                                     {errors.country && (
//                                                         <p className="text-red-500 text-xs mt-1"> {errors.country} </p>
//                                                     )}
//                                                 </div>
//                                                 <div className="w-full py-1">
//                                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                         State *
//                                                     </label>
//                                                     <Select
//                                                         options={availableStates}
//                                                         value={state}
//                                                         onChange={handleStateChange}
//                                                         placeholder="State"
//                                                         styles={{
//                                                             ...customStyles,
//                                                             control: (
//                                                                 provided
//                                                             ) => ({
//                                                                 ...provided,
//                                                                 borderColor:
//                                                                     errors.state
//                                                                         ? "#EF4444"
//                                                                         : "#D1D5DB",
//                                                                 borderRadius:
//                                                                     "0.5rem",
//                                                                 height: "3rem",
//                                                                 boxShadow:
//                                                                     "1px 1px 3px rgba(0, 0, 0, 0.2)",
//                                                                 "&:hover": {
//                                                                     borderColor:
//                                                                         "none",
//                                                                 },
//                                                             }),
//                                                         }}
//                                                         isDisabled={!country}
//                                                         isSearchable
//                                                         aria-label="Select state"
//                                                     />
//                                                     {errors.state && (
//                                                         <p className="text-red-500 text-xs mt-1">
//                                                             {errors.state}
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                                 <div className="w-full py-1">
//                                                     <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                         City *
//                                                     </label>
//                                                     <Select
//                                                         options={availableDistricts}
//                                                         value={district}
//                                                         onChange={
//                                                             handleDistrictChange
//                                                         }
//                                                         placeholder="District"
//                                                         styles={{
//                                                             ...customStyles,
//                                                             control: (
//                                                                 provided
//                                                             ) => ({
//                                                                 ...provided,
//                                                                 borderColor:
//                                                                     errors.district
//                                                                         ? "#EF4444"
//                                                                         : "#D1D5DB",
//                                                                 borderRadius:
//                                                                     "0.5rem",
//                                                                 height: "3rem",
//                                                                 boxShadow:
//                                                                     "1px 1px 3px rgba(0, 0, 0, 0.2)",
//                                                                 "&:hover": {
//                                                                     borderColor:
//                                                                         "none",
//                                                                 },
//                                                             }),
//                                                         }}
//                                                         isDisabled={
//                                                             !country || !state
//                                                         }
//                                                         isSearchable
//                                                         aria-label="Select district"
//                                                     />
//                                                     {errors.district && (
//                                                         <p className="text-red-500 text-sm mt-0"> {errors.district} </p>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={handleOnClickNextForFirstSection}
//                                     className="bg-[#A100FF] text-white w-[50%] p-3 rounded-lg shadow-md hover:shadow-purple-400 hover:bg-purple-600 mx-auto transition-all duration-300 text-lg font-semibold"
//                                 >
//                                     Next →
//                                 </button>
//                             </div>
//                         </div>
//                         <p className="text-lg text-gray-500 my-6 text-center z-10">
//                             By signing up, you agree to our{" "}
//                             <span
//                                 className="text-[#A100FF] underline cursor-pointer"
//                                 onClick={openTermsModal}
//                             >
//                                 terms & conditions
//                             </span>
//                             {" & "}
//                             <span
//                                 className="text-[#A100FF] underline cursor-pointer"
//                                 onClick={openPrivacyModal}
//                             >
//                                 Privacy Policy
//                             </span>
//                         </p>
//                     </motion.div>
//                 )}
//                 {step === 2 && (
//                     <motion.div
//                         key="step2"
//                         className="flex flex-col w-screen justify-center items-center h-screen overflow-hidden bg-violet-50"
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={pageVariants}
//                     >
//                         <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                             {/* <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
//                             {/* <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
//                             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         </div>
//                         {/* <div>aa baki chhe</div> */}
//                         <div className="flex flex-col items-center justify-center w-[400px] h-fit z-10 bg-white px-4 py-4 rounded-xl shadow-lg shadow-purple-200 text-center text-sm">
//                             <div className="w-full text-start mb-2">
//                                 <button
//                                     onClick={handleOnClickPreviousForSecondSection}
//                                     className="text-gray-600 w-fit border-b border-gray-600 hover:text-violet-800 transition-all duration-300"
//                                 >
//                                     Back
//                                 </button>
//                             </div>
//                             <div className="flex flex-col h-full gap-4 w-full rounded-lg">
//                                 <div className="flex flex-col items-center gap-0.5">
//                                     <div className="mx-auto mb-4 w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
//                                         <MdOutlineEmail className="w-8 h-8 text-white" />
//                                     </div>
//                                     <h2 className="text-2xl font-bold text-[#A011FF]">
//                                         Verify Email Address
//                                     </h2>
//                                     <p className="text-gray-600">
//                                         Check your email for the verification code
//                                     </p>
//                                 </div>
//                                 <div className="flex flex-col w-full">
//                                     <div className="text-left mb-4">
//                                         <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                                             Email Address
//                                             {errors.email && (
//                                                 <p className="text-red-500 text-sm">{errors.email ? "*" : ""}</p>
//                                             )}
//                                         </label>
//                                         <input
//                                             type="email"
//                                             className={`w-full h-11 px-3 border ${errors.email
//                                                 ? "border-red-500"
//                                                 : "border-gray-300"
//                                                 } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             placeholder="Enter Email Address"
//                                             value={email}
//                                             onChange={handleEmailChange}
//                                         />
//                                         {errors.email && (
//                                             <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//                                         )}
//                                     </div>
//                                     {showEmailCodeInput && (
//                                         <div className="text-left mb-2">
//                                             <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                                                 Email Verification Code
//                                                 {errors.EmailOTP && (
//                                                     <p className="text-red-500 text-sm">{errors.EmailOTP ? "*" : ""}</p>
//                                                 )}
//                                             </label>
//                                             {/* <input
//                                                 type="text"
//                                                 className={`w-full h-10 px-3 border ${errors.EmailOTP
//                                                     ? "border-red-500"
//                                                     : "border-gray-300"
//                                                     } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                 placeholder="Enter Code"
//                                                 value={EmailOTP}
//                                                 onChange={handleEmailOTPChange}
//                                             /> */}
//                                             <OtpInput
//                                                 value={EmailOTP}
//                                                 onChange={setEmailOTP}
//                                                 numInputs={6}
//                                                 renderInput={(props) => (
//                                                     <input
//                                                         {...props}
//                                                         style={{
//                                                             width: "48px",
//                                                             height: "48px",
//                                                             fontSize: "20px",
//                                                             textAlign: "center",
//                                                             border: "1px solid #ccc",
//                                                             borderRadius: "8px",
//                                                             margin: "auto",
//                                                             transition: "border 0.2s ease",
//                                                             ":focus": {
//                                                                 outline: "none",
//                                                                 border: "2px solid #7c3aed",
//                                                             },
//                                                         }}
//                                                     />
//                                                 )}
//                                             />

//                                             {errors.EmailOTP && (
//                                                 <p className="text-red-500 text-xs mt-1">{errors.EmailOTP}</p>
//                                             )}
//                                         </div>

//                                     )}
//                                     <div className="w-full text-start text-xs">
//                                         {!showEmailCodeInput ? (
//                                             <></>
//                                         ) : (
//                                             <button
//                                                 onClick={(e) => handleSendEmailOTP(e, true)}
//                                                 disabled={resendDisabled}
//                                                 className={`w-fit border-b border-[#5E0194] transition-all duration-300 ${resendDisabled
//                                                     ? "text-gray-400 cursor-not-allowed border-gray-300"
//                                                     : "text-[#5E0194] hover:text-violet-800"
//                                                     }`}
//                                             >
//                                                 Resend OTP {resendDisabled ? `(${timer}s)` : ""}
//                                             </button>
//                                         )}
//                                     </div>
//                                     {/* {showEmailCodeInput && (
//                                         <button
//                                             onClick={handleOnClickNextForSecondSection}
//                                             className="bg-[#5E0194] text-white w-[40%] p-3 rounded-lg shadow-md hover:bg-violet-800 mt-4 transition-all duration-300"
//                                         >
//                                             Verify OTP
//                                         </button>
//                                     )} */}
//                                 </div>
//                                 <div className="w-full text-end text-xs mb-2">
//                                     {!showEmailCodeInput ? (
//                                         <button
//                                             onClick={handleSendEmailOTP}
//                                             className="bg-[#A011FF] text-white text-lg font-semibold w-full p-2.5 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
//                                         >
//                                             Send OTP
//                                         </button>
//                                     ) : (
//                                         <button
//                                             onClick={handleOnClickNextForSecondSection}
//                                             className="bg-[#A011FF] text-white text-lg font-semibold w-full p-2.5 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
//                                         >
//                                             Next
//                                         </button>
//                                     )}
//                                 </div>
//                                 {/* <div className="flex gap-3 w-full items-center justify-center">
//                                     <button
//                                         onClick={handleOnClickPreviousForSecondSection}
//                                         className="bg-gray-400 text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300"
//                                     >
//                                         Back
//                                     </button>
//                                     {showEmailCodeInput && (
//                                         <button
//                                             onClick={handleOnClickNextForSecondSection}
//                                             className="bg-[#A011FF] text-white text-lg font-semibold w-full p-2.5 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
//                                         >
//                                             Next
//                                         </button>
//                                     )}
//                                 </div> */}
//                             </div>
//                         </div>
//                         <p className="text-[#786D7F] opacity-[86%] text-md mt-8 z-10">
//                             Already have an account?{" "}
//                             <span className="cursor-pointer" onClick={handleLogin}>
//                                 <span className="text-violet-600 font-medium underline">Log in</span>
//                             </span>
//                         </p>
//                         <p className="text-lg text-gray-500 my-6 text-center z-10">
//                             By signing up, you agree to our{" "}
//                             <span
//                                 className="text-[#A100FF] underline cursor-pointer"
//                                 onClick={openTermsModal}
//                             >
//                                 terms & conditions
//                             </span>
//                             {" & "}
//                             <span
//                                 className="text-[#A100FF] underline cursor-pointer"
//                                 onClick={openPrivacyModal}
//                             >
//                                 Privacy Policy
//                             </span>
//                         </p>
//                     </motion.div>
//                 )}
//                 {step === 3 && (
//                     // <motion.div
//                     //     key="step3"
//                     //     className="flex w-screen justify-center items-center h-screen overflow-hidden"
//                     //     initial="initial"
//                     //     animate="animate"
//                     //     exit="exit"
//                     //     variants={pageVariants}
//                     // >
//                     //     <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                     //         <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                     //         <div className="absolute -left-[5%] -top-[0%] w-[60%] h-[60%] rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                     //         <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                     //         <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                     //     </div>
//                     //     <div className="flex items-center justify-center gap-10 w-[400px] h-fit z-10 bg-white px-8 py-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm">
//                     //         <div className="flex flex-col h-full gap-4 w-full rounded-lg">
//                     //             <div className="flex flex-col items-start gap-0.5">
//                     //                 <h2 className="text-4xl font-bold text-[#5E0194] mb-2">
//                     //                     Verify Phone
//                     //                 </h2>
//                     //                 <p className="text-[#786D7F] opacity-[86%] text-sm">
//                     //                     Enter the code sent to your phone to proceed.
//                     //                 </p>
//                     //             </div>
//                     //             <div className="flex flex-col w-full">
//                     //                 <div className="text-left mb-4">
//                     //                     <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                     //                         Phone
//                     //                         {errors.phoneNumber && (
//                     //                             <p className="text-red-500 text-sm">{errors.phoneNumber ? "*" : ""}</p>
//                     //                         )}
//                     //                     </label>
//                     //                     <PhoneInput
//                     //                         country={"in"}
//                     //                         value={phoneNumber}
//                     //                         onChange={handlePhoneChange}
//                     //                         containerClass="w-full"
//                     //                         inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.phoneNumber
//                     //                             ? "border-red-500"
//                     //                             : "border-gray-300"
//                     //                             } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                     //                         buttonClass="border-gray-300 h-14 w-16"
//                     //                         dropdownClass="h-28"
//                     //                         inputStyle={{
//                     //                             height: "44px",
//                     //                             width: "100%",
//                     //                             borderRadius: "8px",
//                     //                         }}
//                     //                         buttonStyle={{
//                     //                             position: "absolute",
//                     //                             left: "5px",
//                     //                             top: "1px",
//                     //                             height: "40px",
//                     //                             width: "40px",
//                     //                             backgroundColor: "transparent",
//                     //                             border: "none",
//                     //                             outline: "none",
//                     //                         }}
//                     //                     />
//                     //                     {errors.phoneNumber && (
//                     //                         <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
//                     //                     )}
//                     //                 </div>
//                     //                 {showOTPInput && (
//                     //                     <div className="text-left mb-2">
//                     //                         <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                     //                             Phone Verification Code
//                     //                             {errors.PhoneOTP && (
//                     //                                 <p className="text-red-500 text-sm">{errors.PhoneOTP ? "*" : ""}</p>
//                     //                             )}
//                     //                         </label>
//                     //                         <input
//                     //                             type="text"
//                     //                             className={`w-full h-10 px-3 border ${errors.PhoneOTP
//                     //                                 ? "border-red-500"
//                     //                                 : "border-gray-300"
//                     //                                 } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                     //                             placeholder="Enter Code"
//                     //                             value={PhoneOTP}
//                     //                             onChange={handlePhoneOTPChange}
//                     //                         />
//                     //                         {errors.PhoneOTP && (
//                     //                             <p className="text-red-500 text-xs mt-1">{errors.PhoneOTP}</p>
//                     //                         )}
//                     //                     </div>
//                     //                 )}
//                     //                 <div className="w-full text-end text-xs mb-2">
//                     //                     {!showOTPInput ? (
//                     //                         <button
//                     //                             onClick={handleSendPhoneOTP}
//                     //                             className="text-[#5E0194] w-fit border-b border-[#5E0194] hover:text-violet-800 transition-all duration-300"
//                     //                         >
//                     //                             Send OTP
//                     //                         </button>
//                     //                     ) : (
//                     //                         <button
//                     //                             onClick={(e) => handleSendPhoneOTP(e, true)}
//                     //                             disabled={resendDisabled}
//                     //                             className={`w-fit border-b border-[#5E0194] transition-all duration-300 ${resendDisabled
//                     //                                 ? "text-gray-400 cursor-not-allowed"
//                     //                                 : "text-[#5E0194] hover:text-violet-800"
//                     //                                 }`}
//                     //                         >
//                     //                             Resend OTP {resendDisabled ? `(${timer}s)` : ""}
//                     //                         </button>
//                     //                     )}
//                     //                 </div>
//                     //                 {/* {showOTPInput && (
//                     //                     <button
//                     //                         onClick={handleOnClickNextForThirdSection}
//                     //                         className="bg-[#5E0194] text-white w-[40%] p-3 rounded-lg shadow-md hover:bg-violet-800 mt-4 transition-all duration-300"
//                     //                     >
//                     //                         Verify OTP
//                     //                     </button>
//                     //                 )} */}
//                     //             </div>
//                     //             <div className="flex gap-3 w-full items-center justify-center">
//                     //                 <button
//                     //                     onClick={handleOnClickPreviousForThirdSection}
//                     //                     className="bg-gray-400 text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300"
//                     //                 >
//                     //                     Back
//                     //                 </button>
//                     //                 {showOTPInput && (
//                     //                     <button
//                     //                         onClick={handleOnClickNextForThirdSection}
//                     //                         className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
//                     //                     >
//                     //                         Next
//                     //                     </button>
//                     //                 )}
//                     //             </div>
//                     //         </div>
//                     //     </div>
//                     // </motion.div>
//                     <motion.div
//                         key="step3"
//                         className="flex flex-col w-screen justify-center items-center h-screen overflow-hidden bg-violet-50"
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={pageVariants}
//                     >
//                         <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         </div>
//                         <div className="flex flex-col items-center justify-center w-[400px] h-fit z-10 bg-white px-4 py-4 rounded-xl shadow-lg shadow-purple-200 text-center text-sm">
//                             <div className="w-full text-start mb-2">
//                                 <button
//                                     onClick={handleOnClickPreviousForThirdSection}
//                                     className="text-gray-600 w-fit border-b border-gray-600 hover:text-violet-800 transition-all duration-300"
//                                 >
//                                     Back
//                                 </button>
//                             </div>
//                             <div className="flex flex-col h-full gap-4 w-full rounded-lg">
//                                 <div className="flex flex-col items-center gap-0.5">
//                                     <div className="mx-auto mb-4 w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
//                                         <MdOutlinePhoneIphone className="w-8 h-8 text-white" />
//                                     </div>
//                                     <h2 className="text-2xl font-bold text-[#A011FF]">
//                                         Verify Phone
//                                     </h2>
//                                     <p className="text-gray-600">
//                                         Enter the code sent to your phone to proceed.
//                                     </p>
//                                 </div>
//                                 <div className="flex flex-col w-full">
//                                     <div className="text-left mb-4">
//                                         <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                                             Phone
//                                             {errors.phoneNumber && (
//                                                 <p className="text-red-500 text-sm">{errors.phoneNumber ? "*" : ""}</p>
//                                             )}
//                                         </label>
//                                         <PhoneInput
//                                             country={"in"}
//                                             value={phoneNumber}
//                                             onChange={handlePhoneChange}
//                                             containerClass="w-full"
//                                             inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.phoneNumber
//                                                 ? "border-red-500"
//                                                 : "border-gray-300"
//                                                 } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             buttonClass="border-gray-300 h-14 w-16"
//                                             dropdownClass="h-28"
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
//                                         {errors.phoneNumber && (
//                                             <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
//                                         )}
//                                     </div>
//                                     {showOTPInput && (
//                                         <div className="text-left mb-2">
//                                             <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                                                 Phone Verification Code
//                                                 {errors.PhoneOTP && (
//                                                     <p className="text-red-500 text-sm">{errors.PhoneOTP ? "*" : ""}</p>
//                                                 )}
//                                             </label>
//                                             <OtpInput
//                                                 value={PhoneOTP}
//                                                 onChange={setPhoneOTP}
//                                                 numInputs={6}
//                                                 renderInput={(props) => (
//                                                     <input
//                                                         {...props}
//                                                         style={{
//                                                             width: "48px",
//                                                             height: "48px",
//                                                             fontSize: "20px",
//                                                             textAlign: "center",
//                                                             border: "1px solid #ccc",
//                                                             borderRadius: "8px",
//                                                             margin: "auto",
//                                                             transition: "border 0.2s ease",
//                                                             ":focus": {
//                                                                 outline: "none",
//                                                                 border: "2px solid #7c3aed",
//                                                             },
//                                                         }}
//                                                     />
//                                                 )}
//                                             />
//                                             {errors.PhoneOTP && (
//                                                 <p className="text-red-500 text-xs mt-1">{errors.PhoneOTP}</p>
//                                             )}
//                                         </div>
//                                     )}
//                                     <div className="w-full text-start text-xs">
//                                         {!showOTPInput ? (
//                                             <></>
//                                         ) : (
//                                             <button
//                                                 onClick={(e) => handleSendEmailOTP(e, true)}
//                                                 disabled={resendDisabled}
//                                                 className={`w-fit border-b border-[#5E0194] transition-all duration-300 ${resendDisabled
//                                                     ? "text-gray-400 cursor-not-allowed border-gray-300"
//                                                     : "text-[#5E0194] hover:text-violet-800"
//                                                     }`}
//                                             >
//                                                 Resend OTP {resendDisabled ? `(${timer}s)` : ""}
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="w-full text-end text-xs mb-2">
//                                     {!showOTPInput ? (
//                                         <button
//                                             onClick={handleSendPhoneOTP}
//                                             className="bg-[#A011FF] text-white text-lg font-semibold w-full p-2.5 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
//                                         >
//                                             Send OTP
//                                         </button>
//                                     ) : (
//                                         <button
//                                             onClick={handleOnClickNextForThirdSection}
//                                             className="bg-[#A011FF] text-white text-lg font-semibold w-full p-2.5 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
//                                         >
//                                             Next
//                                         </button>
//                                     )}
//                                 </div>
//                                 {/* <div className="w-full text-end text-xs mb-2">
//                                     {showOTPInput && (
//                                         <button
//                                             onClick={handleOnClickNextForThirdSection}
//                                             className="bg-[#A011FF] text-white text-lg font-semibold w-full p-2.5 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
//                                         >
//                                             Next
//                                         </button>
//                                     )}
//                                 </div> */}
//                             </div>
//                         </div>
//                         <p className="text-[#786D7F] opacity-[86%] text-md mt-8 z-10">
//                             Already have an account?{" "}
//                             <span className="cursor-pointer" onClick={handleLogin}>
//                                 <span className="text-violet-600 font-medium underline">Log in</span>
//                             </span>
//                         </p>
//                         <p className="text-lg text-gray-500 my-6 text-center z-10">
//                             By signing up, you agree to our{" "}
//                             <span
//                                 className="text-[#A100FF] underline cursor-pointer"
//                                 onClick={openTermsModal}
//                             >
//                                 terms & conditions
//                             </span>
//                             {" & "}
//                             <span
//                                 className="text-[#A100FF] underline cursor-pointer"
//                                 onClick={openPrivacyModal}
//                             >
//                                 Privacy Policy
//                             </span>
//                         </p>
//                     </motion.div>
//                 )}
//                 {step === 4 && (
//                     <motion.div
//                         key="step4"
//                         className="flex flex-col w-screen justify-center items-center h-screen overflow-hidden bg-violet-50"
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={pageVariants}
//                     >
//                         <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                             {/* <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
//                             {/* <div className="absolute -left-[5%] -top-[0%] w-[60%] h-[60%] rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
//                             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         </div>
//                         {/* <div>aa baki chhe</div> */}
//                         <div className="flex flex-col items-center justify-center w-[400px] h-fit z-10 bg-white px-4 py-4 rounded-xl shadow-lg shadow-purple-200 text-center text-sm">
//                             <div className="w-full text-start mb-2">
//                                 <button
//                                     onClick={handleOnClickPreviousForSecondSection}
//                                     className="text-gray-600 w-fit border-b border-gray-600 hover:text-violet-800 transition-all duration-300"
//                                 >
//                                     Back
//                                 </button>
//                             </div>
//                             <div className="flex flex-col h-full gap-4 w-full rounded-lg">
//                                 <div className="flex flex-col items-center gap-0.5">
//                                     <div className="mx-auto mb-4 w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
//                                         <GoLock className="w-8 h-8 text-white" />
//                                     </div>
//                                     <h2 className="text-2xl font-bold text-[#A011FF]">
//                                         Create Password
//                                     </h2>
//                                     <p className="text-gray-600">
//                                         Create a secure password for your account
//                                     </p>
//                                 </div>
//                                 <div className="flex flex-col gap-3">
//                                     <div className="text-left relative">
//                                         <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                             Password
//                                         </label>
//                                         <input
//                                             type={
//                                                 showPassword
//                                                     ? "text"
//                                                     : "password"
//                                             }
//                                             className={`w-full h-12 px-2 pr-10 border ${errors.password
//                                                 ? "border-red-500"
//                                                 : "border-gray-300"
//                                                 } rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             placeholder="Enter Password"
//                                             value={password}
//                                             onChange={handlePasswordChange}
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 setShowPassword(!showPassword)
//                                             }
//                                             className="absolute right-2 top-[40px] text-gray-500"
//                                         >
//                                             {showPassword ? (
//                                                 <FaEyeSlash size={18} />
//                                             ) : (
//                                                 <FaEye size={18} />
//                                             )}
//                                         </button>
//                                         {errors.password && (
//                                             <p className="text-red-500 text-xs mt-1">
//                                                 {errors.password}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="text-left mb-1 relative">
//                                         <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
//                                             Re-Enter Password {errors.confirmPassword && (
//                                                 <p className="text-red-500 text-sm">
//                                                     {errors.confirmPassword === "Confirm password is required" ? "*" : ""}
//                                                 </p>)}
//                                         </label>
//                                         <input
//                                             type={
//                                                 showConfirmPassword
//                                                     ? "text"
//                                                     : "password"
//                                             }
//                                             className={`w-full h-12 px-2 pr-10 border ${errors.confirmPassword
//                                                 ? "border-red-500"
//                                                 : "border-gray-300"
//                                                 } rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             placeholder="Re-Enter Password"
//                                             value={confirmPassword}
//                                             onChange={
//                                                 handleConfirmPasswordChange
//                                             }
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 setShowConfirmPassword(
//                                                     !showConfirmPassword
//                                                 )
//                                             }
//                                             className="absolute right-2 top-[40px] text-gray-500"
//                                         >
//                                             {showConfirmPassword ? (
//                                                 <FaEyeSlash size={18} />
//                                             ) : (
//                                                 <FaEye size={18} />
//                                             )}
//                                         </button>
//                                         {errors.confirmPassword && (
//                                             <p className="text-red-500 text-xs mt-1">
//                                                 {errors.confirmPassword === "Confirm password is required" ? "" : errors.confirmPassword}
//                                             </p>
//                                         )}
//                                     </div>
//                                     {/* <div className="text-left">
//                                         <label className="flex items-center gap-2">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={agreed}
//                                                 onChange={handleAgreedChange}
//                                                 className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300 rounded"
//                                             />
//                                             <span className="text-sm text-gray-600">
//                                                 I agree to the{" "}
//                                                 <a
//                                                     href="/"
//                                                     className="text-[#A100FF] underline"
//                                                     target="_blank"
//                                                 >
//                                                     terms and conditions
//                                                 </a>
//                                                 {" & "}
//                                                 <a
//                                                     href="/"
//                                                     className="text-[#A100FF] underline"
//                                                     target="_blank"
//                                                 >
//                                                     Privecy Policy
//                                                 </a>
//                                             </span>
//                                         </label>
//                                         {errors.agreed && (
//                                             <p className="text-red-500 text-xs mt-1">
//                                                 {errors.agreed}
//                                             </p>
//                                         )}
//                                     </div> */}
//                                     {/* <div className="text-left">
//                                         <label className="flex items-start gap-2">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={agreed}
//                                                 onChange={handleAgreedChange}
//                                                 className="h-4 w-4 accent-violet-500 border-gray-300 rounded"
//                                             />
//                                             <span className="text-sm text-gray-600">
//                                                 I agree to the{" "}
//                                                 <span
//                                                     className="text-[#A100FF] underline cursor-pointer"
//                                                     onClick={openTermsModal}
//                                                 >
//                                                     terms & conditions
//                                                 </span>
//                                                 {" & "}
//                                                 <span
//                                                     className="text-[#A100FF] underline cursor-pointer"
//                                                     onClick={openPrivacyModal}
//                                                 >
//                                                     Privacy Policy
//                                                 </span>
//                                             </span>
//                                         </label>
//                                     </div> */}
//                                     {errors.form && (
//                                         <p className="text-red-500 text-xs mt-1 text-center">
//                                             {errors.form}
//                                         </p>
//                                     )}
//                                     <button
//                                         className={`bg-[#A100FF] text-white w-full p-3 rounded-lg shadow-md hover:shadow-purple-400 hover:bg-purple-600 mx-auto transition-all duration-300 text-lg font-semibold`}
//                                         onClick={handleGetStarted}
//                                         disabled={!agreed}
//                                     >
//                                         Get Started
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         <p className="text-[#786D7F] opacity-[86%] text-md mt-8 z-10">
//                             Already have an account?{" "}
//                             <span className="cursor-pointer" onClick={handleLogin}>
//                                 <span className="text-violet-600 font-medium underline">Log in</span>
//                             </span>
//                         </p>
//                         <p className="text-lg text-gray-500 my-6 text-center z-10">
//                             By signing up, you agree to our{" "}
//                             <span
//                                 className="text-[#A100FF] underline cursor-pointer"
//                                 onClick={openTermsModal}
//                             >
//                                 terms & conditions
//                             </span>
//                             {" & "}
//                             <span
//                                 className="text-[#A100FF] underline cursor-pointer"
//                                 onClick={openPrivacyModal}
//                             >
//                                 Privacy Policy
//                             </span>
//                         </p>
//                     </motion.div>
//                 )}
//                 <Modal
//                     isOpen={isTermsModalOpen}
//                     onRequestClose={closeTermsModal}
//                     style={modalStyles}
//                 >
//                     <div className="p-6">
//                         <TermsAndConditions onClose={closeTermsModal} />
//                     </div>
//                 </Modal>
//                 <Modal
//                     isOpen={isPrivacyModalOpen}
//                     onRequestClose={closePrivacyModal}
//                     style={modalStyles}
//                 >
//                     <div className="p-6 h-full w-full">
//                         <PrivecyPolicies onClose={closePrivacyModal} />
//                     </div>
//                 </Modal>
//             </AnimatePresence>
//         </>
//     );
// };

// export default SignUpNew;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import PasswordValidator from "password-validator";
import Modal from "react-modal";
import TermsAndConditions from "../Policies/TermsAndConditions";
import PrivacyPolicies from "../Policies/PrivacyPolicies"; // Fixed typo from PrivecyPolicies
import { MdOutlinePerson } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoLock } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import OtpInput from "react-otp-input";
import { MdOutlinePhoneIphone } from "react-icons/md";
import "../Auth.css";
import { Globe } from "lucide-react";
import * as EmailValidator from "email-validator";

// Ensure Modal is bound to your app element for accessibility
Modal.setAppElement("#root");

// Initialize password validator schema
const schema = new PasswordValidator();
schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

const SignUpNew = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [PhoneOTP, setPhoneOTP] = useState("");
    const [EmailOTP, setEmailOTP] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState("Founder");
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState({});
    const [dob, setDob] = useState("");
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [showEmailCodeInput, setShowEmailCodeInput] = useState(false);
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [district, setDistrict] = useState(null);
    const [countries, setCountries] = useState([]);
    const [availableStates, setAvailableStates] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [gender, setGender] = useState(null);
    const [timer, setTimer] = useState(0);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [agreed, setAgreed] = useState(true);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [isEmailOTPLoading, setIsEmailOTPLoading] = useState(false); // New state for email OTP loading
    const [isPhoneOTPLoading, setIsPhoneOTPLoading] = useState(false); // New state for phone OTP loading

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

    // Regex for name validation
    const nameRegex = /^[A-Za-z\s\-]*$/;

    // Validate name fields
    const validateName = (value, field) => {
        if (!value && field !== "middleName") {
            return "This field is required";
        }
        if (value && !nameRegex.test(value)) {
            return "Only letters, spaces, and hyphens are allowed";
        }
        return "";
    };

    const validateDOB = (dob) => {
        if (!dob) {
            return "DOB is required";
        }
        const today = new Date();
        const selectedDate = new Date(dob);
        const fourteenYearsAgo = new Date();
        fourteenYearsAgo.setFullYear(today.getFullYear() - 14);

        if (selectedDate > today) {
            return "Please Insert Valid Date";
        }
        if (selectedDate > fourteenYearsAgo) {
            return "You must be at least 14 years old";
        }
        return "";
    };

    // Validate email
    // const validateEmail = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };
    const validateEmail = (email) => {
        return EmailValidator.validate(email);
    };

    // Validate phone
    const validatePhone = (phone) => {
        const cleanedPhone = phone.replace(/[^\d+]/g, "");
        const phoneRegex = /^\+?\d{10,15}$/;
        return phoneRegex.test(cleanedPhone);
    };

    // Handle input changes
    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setErrors((prev) => ({
            ...prev,
            firstName: "",
        }));
    };

    const handleMiddleNameChange = (e) => {
        const value = e.target.value;
        setMiddleName(value);
        setErrors((prev) => ({
            ...prev,
            middleName: "",
        }));
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        setErrors((prev) => ({
            ...prev,
            lastName: "",
        }));
    };

    const handleDobChange = (e) => {
        const value = e.target.value;
        setDob(value);
        setErrors((prev) => ({ ...prev, dob: validateDOB(value) }));
    };

    const getFourteenYearsAgoDate = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 14);
        return today.toISOString().split("T")[0];
    };

    const handlePhoneChange = (phone) => {
        setPhoneNumber(phone);
        setErrors((prev) => ({ ...prev, phoneNumber: "" }));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors((prev) => ({ ...prev, email: "" }));
    };

    const handlePhoneOTPChange = (e) => {
        setPhoneOTP(e.target.value);
        setErrors((prev) => ({ ...prev, PhoneOTP: "" }));
    };

    const handleEmailOTPChange = (e) => {
        setEmailOTP(e.target.value);
        setErrors((prev) => ({ ...prev, EmailOTP: "" }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors((prev) => ({ ...prev, password: "" }));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    };

    const handleAgreedChange = (e) => {
        setAgreed(e.target.checked);
        setErrors((prev) => ({ ...prev, agreed: "" }));
    };

    // Timer for OTP resend
    useEffect(() => {
        let interval;
        if (resendDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setResendDisabled(false);
                        return 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendDisabled, timer]);

    const handleSendEmailOTP = async (e, isResend = false) => {
        setResendDisabled(true);
        e.preventDefault();
        if (!email) {
            setErrors((prev) => ({ ...prev, email: "Email is required" }));
            toast.error("Email is required");
            return;
        }
        if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
            toast.error("Invalid email address");
            return;
        }

        setIsEmailOTPLoading(true); // Start loading
        try {
            const response = await fetch(
                "http://localhost:3333/api/otp/send-otp",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();
            if (data.success) {
                setShowEmailCodeInput(true);
                setResendDisabled(true);
                setTimer(60);
            } else {
                setResendDisabled(false);
                setTimer(0);
                setErrors((prev) => ({ ...prev, email: data.message }));
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        } finally {
            setIsEmailOTPLoading(false); // Stop loading
        }
    };

    const handleSendPhoneOTP = async (e, isResend = false) => {
        e.preventDefault();
        if (!phoneNumber) {
            setErrors((prev) => ({ ...prev, phoneNumber: "Phone number is required" }));
            return;
        }
        if (!validatePhone(phoneNumber)) {
            setErrors((prev) => ({ ...prev, phoneNumber: "Invalid phone number" }));
            return;
        }

        setIsPhoneOTPLoading(true); // Start loading
        try {
            // Simulate API call for phone OTP (since it's mocked in your code)
            setShowOTPInput(true);
            setResendDisabled(true);
            setTimer(60);
        } catch (error) {
            console.error("Error sending phone OTP:", error);
        } finally {
            setIsPhoneOTPLoading(false); // Stop loading
        }
    };

    // Fetch countries
    useEffect(() => {
        const countryData = Country.getAllCountries().map((c) => ({
            value: c.isoCode,
            label: c.name,
        }));
        setCountries(countryData);
    }, []);

    // Fetch states
    useEffect(() => {
        if (country) {
            const stateData = State.getStatesOfCountry(country.value).map(
                (s) => ({
                    value: s.isoCode,
                    label: s.name,
                })
            );
            setAvailableStates(stateData);
            setState(null);
            setDistrict(null);
            setAvailableDistricts([]);
        } else {
            setAvailableStates([]);
            setState(null);
            setDistrict(null);
            setAvailableDistricts([]);
        }
    }, [country]);

    // Fetch districts
    useEffect(() => {
        if (state && country) {
            const districtData = City.getCitiesOfState(
                country.value,
                state.value
            ).map((d) => ({
                value: d.name,
                label: d.name,
            }));
            setAvailableDistricts(districtData);
            setDistrict(null);
        } else {
            setAvailableDistricts([]);
            setDistrict(null);
        }
    }, [state, country]);

    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Prefer not to say", label: "Prefer not to say" },
    ];

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#DDD6FE" : "white",
            color: "black",
        }),
        control: (provided) => ({
            ...provided,
            borderColor: "#D1D5DB",
            borderRadius: "0.5rem",
            boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
            "&:hover": {
                borderColor: "none",
            },
        }),
    };

    const pageVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
    };

    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption);
        setErrors((prev) => ({ ...prev, gender: "" }));
    };

    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption);
        setErrors((prev) => ({ ...prev, country: "" }));
    };

    const handleStateChange = (selectedOption) => {
        setState(selectedOption);
        setErrors((prev) => ({ ...prev, state: "" }));
    };

    const handleDistrictChange = (selectedOption) => {
        setDistrict(selectedOption);
        setErrors((prev) => ({ ...prev, district: "" }));
    };

    const handleRoleChange = (e) => {
        setRole(e.currentTarget.value);
        console.log("role:", e.currentTarget.value);
        setErrors((prev) => ({ ...prev, role: "" }));
    };

    const passwordValidation = (password) => {
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

    const validateEmailOTP = async () => {
        if (!EmailOTP) {
            setErrors((prev) => ({ ...prev, EmailOTP: "Email OTP is required" }));
            return false;
        }

        try {
            const response = await fetch(
                "http://localhost:3333/api/otp/verify-otp",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp: EmailOTP }),
                }
            );

            const data = await response.json();
            if (data.success) {
                return true;
            } else {
                setErrors((prev) => ({ ...prev, EmailOTP: "Invalid OTP" }));
                toast.error("Invalid OTP");
                return false;
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setErrors((prev) => ({ ...prev, EmailOTP: "An error occurred" }));
            toast.error("An error occurred. Please try again.");
            return false;
        }
    };

    const validatePhoneOTP = async () => {
        if (!PhoneOTP) {
            setErrors((prev) => ({ ...prev, PhoneOTP: "Phone OTP is required" }));
            return false;
        }
        if (PhoneOTP !== "123456") {
            setErrors((prev) => ({ ...prev, PhoneOTP: "Invalid Phone OTP" }));
            toast.error("Invalid Phone OTP");
            return false;
        }
        return true;
    };

    const handleOnClickNextForFirstSection = () => {
        const newErrors = {
            firstName: validateName(firstName, "firstName"),
            middleName: validateName(middleName, "middleName"),
            lastName: validateName(lastName, "lastName"),
            gender: !gender || gender.value === "" ? "Gender is required" : "",
            country: !country ? "Country is required" : "",
            state: !state ? "State is required" : "",
            district: !district ? "District is required" : "",
            role: !role ? "Role is required" : "",
            dob: validateDOB(dob),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);

        if (hasErrors) {
            toast.error("Please correct the errors");
            return;
        }

        setStep(2);
    };

    const handleOnClickNextForSecondSection = async () => {
        const newErrors = {
            email: !email ? "Email is required" : "",
            EmailOTP: !EmailOTP ? "Email verification code is required" : "",
        };

        if (email && !validateEmail(email)) {
            newErrors.email = "Invalid email address";
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (hasErrors) {
            toast.error("Please correct the errors");
            return;
        }

        const isValidOTP = await validateEmailOTP();
        if (!isValidOTP) {
            return;
        }

        setTimer(0);
        setStep(3);
    };

    const handleOnClickNextForThirdSection = async () => {
        const newErrors = {
            phoneNumber: !phoneNumber ? "Phone number is required" : "",
            PhoneOTP: !PhoneOTP ? "Phone verification code is required" : "",
        };

        if (phoneNumber && !validatePhone(phoneNumber)) {
            newErrors.phoneNumber = "Invalid phone number";
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (hasErrors) {
            toast.error("Please correct the errors");
            return;
        }

        const isValidOTP = await validatePhoneOTP();
        if (!isValidOTP) {
            return;
        }

        setTimer(0);
        setStep(4);
    };

    const handleOnClickPreviousForSecondSection = () => {
        setStep(1);
    };

    const handleOnClickPreviousForThirdSection = () => {
        setStep(2);
    };

    const handleOnClickPreviousForFourthSection = () => {
        setStep(3);
    };

    const handleGetStarted = () => {
        const newErrors = {
            password: !password ? "Password is required" : "",
            confirmPassword: !confirmPassword ? "Confirm password is required" : "",
            agreed: !agreed ? "You must agree to the terms and conditions" : "",
        };

        if (password && !passwordValidation(password)) {
            newErrors.password = "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, % with no space";
        }

        if (confirmPassword && !passwordValidation(confirmPassword)) {
            newErrors.confirmPassword = "Fill the password first";
        }

        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors((prev) => ({ ...prev, ...newErrors }));

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (hasErrors) {
            toast.error("Please correct the errors");
            return;
        }

        registerUser();
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const registerUser = async () => {
        try {
            const response = await fetch(
                "http://localhost:3333/api/auth/signup",
                {
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
                        gender: gender?.value,
                        dob,
                        email,
                        country: country?.label,
                        state: state?.label,
                        city: district?.label,
                        agreed,
                    }),
                }
            );
            const data = await response.json();
            if (data.success) {
                setUserData(data.result);
                navigate("/login");
                toast.success("Registration successful!");
            } else {
                setErrors((prev) => ({ ...prev, form: data.message }));
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            setErrors((prev) => ({ ...prev, form: "Registration failed" }));
            toast.error("An error occurred during registration");
        }
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        className="flex flex-col w-screen py-10 items-center h-screen overflow-y-auto bg-violet-50"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
                            <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                            <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        </div>
                        {/* Header */}
                        <div className="z-10 flex flex-col items-center justify-center">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-3 mb-3">
                                    <img src="./FullLogo.svg" alt="" className="h-12" />
                                </div>
                                <h2 className="text-5xl font-bold text-[#A100FF] mb-3">
                                    Sign up <span className="text-gray-900">to get started</span>
                                </h2>
                                <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
                                    Connect with amazing opportunities and people in just a few steps
                                </p>
                                <p className="text-gray-500 opacity-[99%] text-xl">
                                    Already have an account?{" "}
                                    <a href="#" className="text-[#A100FF] font-medium underline" onClick={handleLogin}>
                                        Sign in
                                    </a>
                                </p>
                            </div>
                            <div className="flex gap-0 h-fit w-[75%] z-10 bg-white shadow-xl rounded-4xl text-center text-sm items-center justify-center">
                                <div className="flex flex-col h-full gap-2 w-full p-10 rounded-lg justify-center">
                                    <div className="flex flex-col w-full gap-2 mb-4">
                                        <div className="text-left mb-8">
                                            <label className="flex items-center gap-3 text-xl mb-6 text-gray-700 font-semibold"><MdPeopleOutline className="h-8 w-8 p-1 rounded-lg bg-purple-100 text-[#8d00ec]" /> I want to:</label>
                                            {/* Type of user */}
                                            <div className="flex w-full gap-5 h-44">
                                                <button
                                                    className={`flex flex-col hover:scale-102 text-left w-1/2 border-2 ${role === "Founder" ? "bg-[#FAF4FF] border-[#be6df5] shadow shadow-[#be6df5]" : "bg-gray-50 border-gray-300 hover:border-[#A011FF] hover:shadow-md hover:shadow-gray-300"} transition-all duration-200 rounded-xl px-4 py-6`}
                                                    onClick={(e) => handleRoleChange(e)}
                                                    value={"Founder"}
                                                >
                                                    <div className="w-full flex items-center justify-end h-1">
                                                        {role === "Founder" && (
                                                            <p className="bg-[#9830FF] text-white w-fit px-2 py-0.5 rounded-full text-xs font-semibold">✓ Selected</p>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-5 px-5">
                                                        <div className={` h-14 w-14 text-3xl rounded-xl flex items-center justify-center ${role === "Founder" ? "bg-[#A011FF] text-white shadow-xl shadow-violet-300" : "bg-gray-300"}`}><MdOutlinePerson /></div>
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                                Discover Talent
                                                            </h3>
                                                            <p className="text-gray-600 leading-relaxed mb-2 text-base">
                                                                Find and connect with amazing professionals
                                                                for your next big project.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                                <button
                                                    className={`flex flex-col hover:scale-102 text-left w-1/2 border-2 ${role === "GetDiscovered" ? "bg-[#FAF4FF] border-[#be6df5] shadow shadow-[#be6df5]" : "bg-gray-50 border-gray-300 hover:border-[#A011FF] hover:shadow-md hover:shadow-gray-300"} transition-all duration-200 rounded-xl px-4 py-6`}
                                                    onClick={(e) => handleRoleChange(e)}
                                                    value={"GetDiscovered"}
                                                >
                                                    <div className="w-full flex items-center justify-end h-1">
                                                        {role === "GetDiscovered" && (
                                                            <p className="bg-[#9830FF] text-white w-fit px-2 py-0.5 rounded-full text-xs font-semibold">✓ Selected</p>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-5 px-5">
                                                        <div className={`shadow h-14 w-14 text-3xl rounded-xl flex items-center justify-center ${role === "GetDiscovered" ? "bg-[#A011FF] text-white shadow-xl shadow-violet-300" : "bg-gray-300"}`}><MdPeopleOutline /></div>
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                                Get Discovered
                                                            </h3>
                                                            <p className="text-gray-600 leading-relaxed mb-2 text-md text-base">
                                                                Showcase your talent and connect with people who are looking for someone exactly like
                                                                you.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            {errors.role && (
                                                <p className="text-red-500 text-xs mt-1"> {errors.role} </p>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-10">
                                            <div className="flex flex-col">
                                                <label className="border-b border-gray-300 pb-3 flex items-center gap-3 text-xl mb-6 text-gray-700 font-semibold"><MdOutlinePerson className="h-8 w-8 p-1 rounded-lg bg-purple-100 text-[#8d00ec]" /> Personal Details</label>
                                                {/* First Name, Mid name and Last name */}
                                                <div className="grid grid-cols-2 gap-4 w-full">
                                                    <div className="text-left w-full py-1">
                                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                            First Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`w-full h-12 px-2 border ${errors.firstName
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                            placeholder="Enter First Name"
                                                            value={firstName}
                                                            onChange={handleFirstNameChange}
                                                        />
                                                        {errors.firstName && (
                                                            <p className="text-red-500 text-xs mt-1"> {errors.firstName}</p>
                                                        )}
                                                    </div>
                                                    <div className="text-left w-full py-1">
                                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                            Last Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`w-full h-12 px-2 border ${errors.lastName
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                            placeholder="Enter Last Name"
                                                            value={lastName}
                                                            onChange={handleLastNameChange}
                                                        />
                                                        {errors.lastName && (
                                                            <p className="text-red-500 text-xs mt-1"> {errors.lastName} </p>
                                                        )}
                                                    </div>
                                                    <div className="col-span-2 text-left w-full py-1">
                                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                            Middle Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`w-full h-12 px-2 border ${errors.middleName
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                            placeholder="Enter Middle Name"
                                                            value={middleName}
                                                            onChange={
                                                                handleMiddleNameChange
                                                            }
                                                        />
                                                        {errors.middleName && (
                                                            <p className="text-red-500 text-xs mt-1"> {errors.middleName} </p>
                                                        )}
                                                    </div>
                                                    <div className="text-left w-full py-1">
                                                        <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
                                                            <FaRegCalendarAlt className="text-violet-800" /> Date of Birth *
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={dob}
                                                            max={getFourteenYearsAgoDate()}
                                                            onChange={handleDobChange}
                                                            required
                                                            className={`w-full h-12 px-2 border ${errors.dob
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                        />
                                                        {errors.dob && (
                                                            <p className="text-red-500 text-xs mt-1"> {errors.dob} </p>
                                                        )}
                                                    </div>
                                                    <div className="text-left w-full py-1">
                                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                            Gender *
                                                        </label>
                                                        <Select
                                                            options={genderOptions}
                                                            value={gender}
                                                            onChange={handleGenderChange}
                                                            placeholder="Gender"
                                                            styles={{
                                                                ...customStyles,
                                                                control: (provided) => ({
                                                                    ...provided,
                                                                    borderColor:
                                                                        errors.gender
                                                                            ? "#EF4444"
                                                                            : "#D1D5DB",
                                                                    borderRadius: "0.5rem",
                                                                    height: "3rem",
                                                                    boxShadow:
                                                                        "1px 1px 3px rgba(0, 0, 0, 0.2)",
                                                                    "&:hover": {
                                                                        borderColor: "none",
                                                                    },
                                                                }),
                                                            }}
                                                        />
                                                        {errors.gender && (
                                                            <p className="text-red-500 text-xs mt-1"> {errors.gender} </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-left w-full">
                                                <label className="border-b border-gray-300 pb-3 flex items-center gap-3 text-xl mb-6 text-gray-700 font-semibold"><IoLocationOutline className="h-8 w-8 p-1 rounded-lg bg-purple-100 text-[#8d00ec]" /> Location</label>
                                                <div className="flex flex-col gap-4">
                                                    <div className="w-full py-1">
                                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                            Country *
                                                        </label>
                                                        <Select
                                                            options={countries}
                                                            value={country}
                                                            onChange={
                                                                handleCountryChange
                                                            }
                                                            placeholder="Country"
                                                            styles={{
                                                                ...customStyles,
                                                                control: (
                                                                    provided
                                                                ) => ({
                                                                    ...provided,
                                                                    borderColor:
                                                                        errors.country
                                                                            ? "#EF4444"
                                                                            : "#D1D5DB",
                                                                    borderRadius:
                                                                        "0.5rem",
                                                                    height: "3rem",
                                                                    boxShadow:
                                                                        "1px 1px 3px rgba(0, 0, 0, 0.2)",
                                                                    "&:hover": {
                                                                        borderColor:
                                                                            "none",
                                                                    },
                                                                }),
                                                            }}
                                                            isSearchable
                                                            aria-label="Select country"
                                                        />
                                                        {errors.country && (
                                                            <p className="text-red-500 text-xs mt-1"> {errors.country} </p>
                                                        )}
                                                    </div>
                                                    <div className="w-full py-1">
                                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                            State *
                                                        </label>
                                                        <Select
                                                            options={availableStates}
                                                            value={state}
                                                            onChange={handleStateChange}
                                                            placeholder="State"
                                                            styles={{
                                                                ...customStyles,
                                                                control: (
                                                                    provided
                                                                ) => ({
                                                                    ...provided,
                                                                    borderColor:
                                                                        errors.state
                                                                            ? "#EF4444"
                                                                            : "#D1D5DB",
                                                                    borderRadius:
                                                                        "0.5rem",
                                                                    height: "3rem",
                                                                    boxShadow:
                                                                        "1px 1px 3px rgba(0, 0, 0, 0.2)",
                                                                    "&:hover": {
                                                                        borderColor:
                                                                            "none",
                                                                    },
                                                                }),
                                                            }}
                                                            isDisabled={!country}
                                                            isSearchable
                                                            aria-label="Select state"
                                                        />
                                                        {errors.state && (
                                                            <p className="text-red-500 text-xs mt-1">
                                                                {errors.state}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="w-full py-1">
                                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                            City *
                                                        </label>
                                                        <Select
                                                            options={availableDistricts}
                                                            value={district}
                                                            onChange={
                                                                handleDistrictChange
                                                            }
                                                            placeholder="District"
                                                            styles={{
                                                                ...customStyles,
                                                                control: (
                                                                    provided
                                                                ) => ({
                                                                    ...provided,
                                                                    borderColor:
                                                                        errors.district
                                                                            ? "#EF4444"
                                                                            : "#D1D5DB",
                                                                    borderRadius:
                                                                        "0.5rem",
                                                                    height: "3rem",
                                                                    boxShadow:
                                                                        "1px 1px 3px rgba(0, 0, 0, 0.2)",
                                                                    "&:hover": {
                                                                        borderColor:
                                                                            "none",
                                                                    },
                                                                }),
                                                            }}
                                                            isDisabled={
                                                                !country || !state
                                                            }
                                                            isSearchable
                                                            aria-label="Select district"
                                                        />
                                                        {errors.district && (
                                                            <p className="text-red-500 text-sm mt-0"> {errors.district} </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleOnClickNextForFirstSection}
                                        className="bg-[#A100FF] text-white w-[50%] p-3 rounded-lg shadow-md hover:shadow-purple-400 hover:bg-purple-600 mx-auto transition-all duration-300 text-lg font-semibold"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
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
                        </div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        className="flex flex-col w-screen justify-center items-center h-screen overflow-hidden bg-violet-50"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
                            <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                            <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-[400px] h-fit z-10 bg-white px-4 py-4 rounded-xl shadow-lg shadow-purple-200 text-center text-sm">
                            <div className="w-full text-start mb-2">
                                <button
                                    onClick={handleOnClickPreviousForSecondSection}
                                    className="text-gray-600 w-fit px-2.5 py-0.5 rounded-full hover:text-violet-800 hover:bg-gray-200 transition-all duration-300"
                                >
                                    Back
                                </button>
                            </div>
                            <div className="flex flex-col h-full gap-4 w-full rounded-lg">
                                <div className="flex flex-col items-center gap-0.5">
                                    <div className="mx-auto mb-4 w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                        <MdOutlineEmail className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#A011FF]">
                                        Verify Email Address
                                    </h2>
                                    <p className="text-gray-600">
                                        Check your email for the verification code
                                    </p>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="text-left mb-4">
                                        <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
                                            Email Address
                                            {errors.email && (
                                                <p className="text-red-500 text-sm">{errors.email ? "*" : ""}</p>
                                            )}
                                        </label>
                                        <input
                                            type="email"
                                            className={`w-full h-11 px-3 border ${errors.email
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            placeholder="Enter Email Address"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                    {showEmailCodeInput && (
                                        <div className="text-left mb-2">
                                            <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
                                                Email Verification Code
                                                {errors.EmailOTP && (
                                                    <p className="text-red-500 text-sm">{errors.EmailOTP ? "*" : ""}</p>
                                                )}
                                            </label>
                                            <OtpInput
                                                value={EmailOTP}
                                                onChange={setEmailOTP}
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
                                            {errors.EmailOTP && (
                                                <p className="text-red-500 text-xs mt-1">{errors.EmailOTP}</p>
                                            )}
                                        </div>
                                    )}
                                    <div className="w-full text-start text-xs">
                                        {!showEmailCodeInput ? (
                                            <></>
                                        ) : (
                                            <button
                                                onClick={(e) => handleSendEmailOTP(e, true)}
                                                disabled={resendDisabled}
                                                className={`w-fit border-b border-[#5E0194] transition-all duration-300 ${resendDisabled
                                                    ? "text-gray-400 cursor-not-allowed border-gray-300"
                                                    : "text-[#5E0194] hover:text-violet-800"
                                                    }`}
                                            >
                                                Resend OTP {resendDisabled ? `(${timer}s)` : ""}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full text-end text-xs mb-2">
                                    {!showEmailCodeInput ? (
                                        <button
                                            onClick={handleSendEmailOTP}
                                            className="bg-[#A100FF] text-white w-full p-3 rounded-lg shadow-md hover:shadow-purple-400 hover:bg-purple-600 mx-auto transition-all duration-300 text-lg font-semibold flex items-center justify-center"
                                            // className="bg-[#A011FF] text-white text-lg font-semibold w-full p-2.5 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300 flex items-center justify-center"
                                            disabled={isEmailOTPLoading}
                                        >
                                            {isEmailOTPLoading ? (
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
                                            onClick={handleOnClickNextForSecondSection}
                                            className={` w-full p-3 rounded-lg shadow-md mx-auto text-lg font-semibold flex items-center justify-center ${EmailOTP.length === 6 ? "bg-[#A100FF] text-white hover:shadow-purple-400 hover:bg-purple-600" : "bg-gray-300 text-gray-700"} transition-all duration-300`}
                                            disabled={EmailOTP.length !== 6}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="text-[#786D7F] opacity-[86%] text-md mt-8 z-10">
                            Already have an account?{" "}
                            <span className="cursor-pointer" onClick={handleLogin}>
                                <span className="text-violet-600 font-medium underline">Log in</span>
                            </span>
                        </p>
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
                )}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        className="flex flex-col w-screen justify-center items-center h-screen overflow-hidden bg-violet-50"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
                            <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                            <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-[400px] h-fit z-10 bg-white px-4 py-4 rounded-xl shadow-lg shadow-purple-200 text-center text-sm">
                            <div className="w-full text-start mb-2">
                                <button
                                    onClick={handleOnClickPreviousForThirdSection}
                                    className="text-gray-600 w-fit px-2.5 py-0.5 rounded-full hover:text-violet-800 hover:bg-gray-200 transition-all duration-300"
                                >
                                    Back
                                </button>
                            </div>
                            <div className="flex flex-col h-full gap-4 w-full rounded-lg">
                                <div className="flex flex-col items-center gap-0.5">
                                    <div className="mx-auto mb-4 w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                        <MdOutlinePhoneIphone className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#A011FF]">
                                        Verify Phone
                                    </h2>
                                    <p className="text-gray-600">
                                        Enter the code sent to your phone to proceed.
                                    </p>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="text-left mb-4">
                                        <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
                                            Phone
                                            {errors.phoneNumber && (
                                                <p className="text-red-500 text-sm">{errors.phoneNumber ? "*" : ""}</p>
                                            )}
                                        </label>
                                        <PhoneInput
                                            country={"in"}
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}
                                            containerClass="w-full"
                                            inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.phoneNumber
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            buttonClass="border-gray-300 h-14 w-16"
                                            dropdownClass="h-28"
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
                                        />
                                        {errors.phoneNumber && (
                                            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                                        )}
                                    </div>
                                    {showOTPInput && (
                                        <div className="text-left mb-2">
                                            <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
                                                Phone Verification Code
                                                {errors.PhoneOTP && (
                                                    <p className="text-red-500 text-sm">{errors.PhoneOTP ? "*" : ""}</p>
                                                )}
                                            </label>
                                            <OtpInput
                                                value={PhoneOTP}
                                                onChange={setPhoneOTP}
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
                                            {errors.PhoneOTP && (
                                                <p className="text-red-500 text-xs mt-1">{errors.PhoneOTP}</p>
                                            )}
                                        </div>
                                    )}
                                    <div className="w-full text-start text-xs">
                                        {!showOTPInput ? (
                                            <></>
                                        ) : (
                                            <button
                                                onClick={(e) => handleSendPhoneOTP(e, true)}
                                                disabled={resendDisabled}
                                                className={`w-fit border-b border-[#5E0194] transition-all duration-300 ${resendDisabled
                                                    ? "text-gray-400 cursor-not-allowed border-gray-300"
                                                    : "text-[#5E0194] hover:text-violet-800"
                                                    }`}
                                            >
                                                Resend OTP {resendDisabled ? `(${timer}s)` : ""}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full text-end text-xs mb-2">
                                    {!showOTPInput ? (
                                        <button
                                            onClick={handleSendPhoneOTP}
                                            className="bg-[#A100FF] text-white w-full p-3 rounded-lg shadow-md hover:shadow-purple-400 hover:bg-purple-600 mx-auto transition-all duration-300 text-lg font-semibold flex items-center justify-center"
                                            disabled={isPhoneOTPLoading}
                                        >
                                            {isPhoneOTPLoading ? (
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
                                            onClick={handleOnClickNextForThirdSection}
                                            className={` w-full p-3 rounded-lg shadow-md mx-auto text-lg font-semibold flex items-center justify-center ${PhoneOTP.length === 6 ? "bg-[#A100FF] text-white hover:shadow-purple-400 hover:bg-purple-600" : "bg-gray-300 text-gray-700"} transition-all duration-300`}
                                            disabled={PhoneOTP.length !== 6}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="text-[#786D7F] opacity-[86%] text-md mt-8 z-10">
                            Already have an account?{" "}
                            <span className="cursor-pointer" onClick={handleLogin}>
                                <span className="text-violet-600 font-medium underline">Log in</span>
                            </span>
                        </p>
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
                )}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        className="flex flex-col w-screen justify-center items-center h-screen overflow-hidden bg-violet-50"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                    >
                        <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
                            <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                            <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-[400px] h-fit z-10 bg-white px-4 py-4 rounded-xl shadow-lg shadow-purple-200 text-center text-sm">
                            <div className="w-full text-start mb-2">
                                <button
                                    onClick={handleOnClickPreviousForFourthSection}
                                    className="text-gray-600 w-fit px-2.5 py-0.5 rounded-full hover:text-violet-800 hover:bg-gray-200 transition-all duration-300"
                                >
                                    Back
                                </button>
                            </div>
                            <div className="flex flex-col h-full gap-4 w-full rounded-lg">
                                <div className="flex flex-col items-center gap-0.5">
                                    <div className="mx-auto mb-4 w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                        <GoLock className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#A011FF]">
                                        Create Password
                                    </h2>
                                    <p className="text-gray-600">
                                        Create a secure password for your account
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="text-left relative">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Password
                                        </label>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className={`w-full h-12 px-2 pr-10 border ${errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                } rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-2 top-[40px] text-gray-500"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash size={18} />
                                            ) : (
                                                <FaEye size={18} />
                                            )}
                                        </button>
                                        {errors.password && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-left mb-1 relative">
                                        <label className="flex items-center gap-1 font-medium mb-1 text-black opacity-[73%]">
                                            Re-Enter Password {errors.confirmPassword && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.confirmPassword === "Confirm password is required" ? "*" : ""}
                                                </p>)}
                                        </label>
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className={`w-full h-12 px-2 pr-10 border ${errors.confirmPassword
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                } rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            placeholder="Re-Enter Password"
                                            value={confirmPassword}
                                            onChange={
                                                handleConfirmPasswordChange
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-2 top-[40px] text-gray-500"
                                        >
                                            {showConfirmPassword ? (
                                                <FaEyeSlash size={18} />
                                            ) : (
                                                <FaEye size={18} />
                                            )}
                                        </button>
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.confirmPassword === "Confirm password is required" ? "" : errors.confirmPassword}
                                            </p>
                                        )}
                                    </div>
                                    {errors.form && (
                                        <p className="text-red-500 text-xs mt-1 text-center">
                                            {errors.form}
                                        </p>
                                    )}
                                    <button
                                        className={`bg-[#A100FF] text-white w-full p-3 rounded-lg shadow-md hover:shadow-purple-400 hover:bg-purple-600 mx-auto transition-all duration-300 text-lg font-semibold`}
                                        onClick={handleGetStarted}
                                        disabled={!agreed}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-[#786D7F] opacity-[86%] text-md mt-8 z-10">
                            Already have an account?{" "}
                            <span className="cursor-pointer" onClick={handleLogin}>
                                <span className="text-violet-600 font-medium underline">Log in</span>
                            </span>
                        </p>
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
                )}
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

export default SignUpNew;