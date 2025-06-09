// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { motion, AnimatePresence } from "framer-motion";
// import Select from "react-select";
// import { Country, State, City } from "country-state-city";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";

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
//     const [role, setRole] = useState("");
//     const [step, setStep] = useState(1);
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
//     const [phoneTimer, setPhoneTimer] = useState(0);
//     const [emailTimer, setEmailTimer] = useState(0);
//     const [agreed, setAgreed] = useState(false);

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
//             return "Dob is required";
//         }
//         const today = new Date();
//         const selectedDate = new Date(dob);
//         if (new Date(dob) > new Date()) {
//             return "Please, enter valid DOB";
//         }
//         return "";
//     }

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
//         setDob(e.target.value);
//         setErrors((prev) => ({ ...prev, dob: "" }));
//     };
//     const getTenYearsAgoDate = () => {
//         const today = new Date();
//         today.setFullYear(today.getFullYear() - 10);
//         return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
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
//         if (phoneTimer > 0) {
//             const timer = setInterval(() => {
//                 setPhoneTimer((prev) => prev - 1);
//             }, 1000);
//             return () => clearInterval(timer);
//         }
//     }, [phoneTimer]);

//     useEffect(() => {
//         if (emailTimer > 0) {
//             const timer = setInterval(() => {
//                 setEmailTimer((prev) => prev - 1);
//             }, 1000);
//             return () => clearInterval(timer);
//         }
//     }, [emailTimer]);

//     const handleSendEmailOTP = async (e) => {
//         setShowOTPInput(true);
//         setPhoneTimer(60);
//         setShowEmailCodeInput(true);
//         e.preventDefault();

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
//             if (data.success) {
//                 // toast.success(
//                 //     isResend
//                 //         ? "OTP resent successfully!"
//                 //         : "OTP sent successfully!"
//                 // );
//                 // setBackendOtp(data.otp); // Store the OTP from backend
//                 // setShowOtpInput(true); // Show OTP input field
//                 setResendDisabled(true); // Disable resend button
//                 setResendCountdown(60); // Reset countdown
//             } else {
//                 toast.error(data.message || "Failed to send OTP.");
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             toast.error("An error occurred. Please try again.");
//         }

//         setEmailTimer(60);
//     };

//     const handleSendPhoneOTP = () => {
//         setShowOTPInput(true)
//         setPhoneTimer(60)
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
//         setRole(e.target.value);
//         setErrors((prev) => ({ ...prev, role: "" }));
//     };

//     const phoneValidation = () => {
//         if (phoneNumber.length !== 12) {
//             setErrors((prev) => ({
//                 ...prev,
//                 phoneNumber: "Invalid phone number",
//             }));
//             return false;
//         }
//         return true;
//     };

//     // const handleSendOtp = async (e, isResend = false) => {
//     //     e.preventDefault();

//     //     try {
//     //         const response = await fetch(
//     //             "http://localhost:3333/api/otp/send-otp",
//     //             {
//     //                 method: "POST",
//     //                 headers: { "Content-Type": "application/json" },
//     //                 body: JSON.stringify({ email }),
//     //             }
//     //         );

//     //         const data = await response.json();
//     //         if (data.success) {
//     //             toast.success(
//     //                 isResend
//     //                     ? "OTP resent successfully!"
//     //                     : "OTP sent successfully!"
//     //             );
//     //         } else {
//     //             toast.error(data.message || "Failed to send OTP.");
//     //         }
//     //     } catch (error) {
//     //         console.error("Error sending OTP:", error);
//     //         toast.error("An error occurred. Please try again.");
//     //     }
//     // };

//     const passwordValidation = (password) => {
//         if (password.length < 8) {
//             setErrors((prev) => ({
//                 ...prev,
//                 password: "Password must be at least 8 characters long",
//             }));
//             return false;
//         }
//         if (!/[A-Z]/.test(password)) {
//             setErrors((prev) => ({
//                 ...prev,
//                 password: "Password must contain at least one uppercase letter",
//             }));
//             return false;
//         }
//         if (!/[a-z]/.test(password)) {
//             setErrors((prev) => ({
//                 ...prev,
//                 password: "Password must contain at least one lowercase letter",
//             }));
//             return false;
//         }
//         if (!/[0-9]/.test(password)) {
//             setErrors((prev) => ({
//                 ...prev,
//                 password: "Password must contain at least one number",
//             }));
//             return false;
//         }
//         if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//             setErrors((prev) => ({
//                 ...prev,
//                 password:
//                     "Password must contain at least one special character",
//             }));
//             return false;
//         }
//         return true;
//     };

//     const validateOTP = async () => {
//         if (PhoneOTP !== "1234") {
//             setErrors((prev) => ({
//                 ...prev,
//                 PhoneOTP: PhoneOTP !== "1234" ? "Invalid Phone OTP" : "",
//             }));
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
//                 toast.success("OTP verified successfully!");
//                 return true;
//             } else {
//                 toast.error("Invalid OTP.");
//                 return false;
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             toast.error("An error occurred. Please try again.");
//             return false;
//         }
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
//             // dob: !dob ? "Date of birth is required" : "",
//             dob: validateDOB(dob),
//         };

//         setErrors(newErrors);

//         const hasErrors = Object.values(newErrors).some((error) => error);

//         if (hasErrors) {
//             return;
//         }

//         setStep(2);
//     };

//     const handleOnClickNextForSecondSection = () => {
//         const newErrors = {
//             phoneNumber: !phoneNumber ? "Phone number is required" : "",
//             email: !email ? "Email is required" : "",
//             PhoneOTP: !PhoneOTP ? "Phone verification code is required" : "",
//             EmailOTP: !EmailOTP ? "Email verification code is required" : "",
//         };

//         if (phoneNumber && !phoneValidation()) {
//             newErrors.phoneNumber = "Invalid phone number";
//         }

//         if (PhoneOTP && EmailOTP) {
//             if (!validateOTP()) {
//                 newErrors.PhoneOTP =
//                     PhoneOTP !== "1234" ? "Invalid Phone OTP" : "";
//                 newErrors.EmailOTP =
//                     EmailOTP !== "1234" ? "Invalid Email OTP" : "";
//             }
//         }

//         setErrors(newErrors);

//         const hasErrors = Object.values(newErrors).some((error) => error);
//         console.log("handleOnClickNextForSecondSection() function ni andar hasErrors: ", hasErrors);
//         if (hasErrors) {
//             toast.error(hasErrors);
//             return;
//         }

//         setStep(3);
//     };

//     const handleOnClickPreviousForSecondSection = () => {
//         setStep(1);
//     };

//     const handleGetStarted = () => {
//         console.log("errors: ", errors);
//         const newErrors = {
//             password: "",
//             confirmPassword: "",
//         };

//         if (!passwordValidation(password)) {
//             return
//             // Error is set in passwordValidation
//         } else if (password !== confirmPassword) {
//             newErrors.confirmPassword = "Passwords do not match";
//         }

//         setErrors((prev) => ({ ...prev, ...newErrors }));

//         const hasErrors =
//             Object.values(newErrors).some((error) => error) || errors.password;

//         if (hasErrors) {
//             return;
//         }

//         registerUser();
//     };

//     const handleLogin = () => {
//         navigate("/login");
//     };

//     const registerUser = async () => {
//         console.log({
//             firstName,
//             middleName,
//             lastName,
//             phoneNumber,
//             password,
//             role,
//             gender: gender?.value,
//             dob,
//             email,
//             country: country?.label,
//             state: state?.label,
//             city: district?.label,
//             agreed,
//         })
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
//             console.log("data: ", data);
//             if (data.success) {
//                 setUserData(data.result);
//                 navigate("/login");
//             } else {
//                 console.log("register user ma chhu hu");
//                 setErrors((prev) => ({ ...prev, form: data.message }));
//             }
//         } catch (error) {
//             setErrors((prev) => ({ ...prev, form: "Registration failed" }));
//         }
//     };

//     return (
//         <>
//             <AnimatePresence mode="wait">
//                 {step === 1 && (
//                     <motion.div
//                         key="step1"
//                         className="flex w-screen justify-center items-center h-screen overflow-hidden"
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={pageVariants}
//                     >
//                         <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                             <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                             <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         </div>
//                         <div className="flex gap-0 h-[80%] w-[65%] z-10 bg-white px-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-center">
//                             <div className="flex flex-col h-full gap-2 w-[55%] px-5 py-5 rounded-lg justify-center">
//                                 <div className="flex flex-col items-start">
//                                     <p className="uppercase text-[#2B0242] opacity-[66%] font-medium"> Register now </p>
//                                     <h2 className="text-[48px] font-bold text-[#5E0194]"> Sign Up for Free. </h2>
//                                     <p className="text-[#786D7F] opacity-[86%] text-sm">
//                                         Already have an account?{" "}
//                                         <a href="#" className="text-[#A100FF] font-medium underline" onClick={handleLogin}>
//                                             Sign in
//                                         </a>
//                                     </p>
//                                 </div>
//                                 <div className="flex flex-col w-full gap-2 mb-4">
//                                     <div className="text-left mb-2">
//                                         <label className="block font-medium mb-1 text-black opacity-[73%]"> Who you are </label>
//                                         <div className="flex gap-4">
//                                             <label
//                                                 className={`flex items-center gap-2 ${errors.role
//                                                         ? "text-red-500"
//                                                         : ""
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
//                                                         ? "text-red-500"
//                                                         : ""
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
//                                                 <span className="text-sm text-gray-600"> Getting Discovered </span>
//                                             </label>
//                                         </div>
//                                         {errors.role && (
//                                             <p className="text-red-500 text-xs mt-1"> {errors.role} </p>
//                                         )}
//                                     </div>
//                                     <div className="flex gap-4 w-full">
//                                         <div className="text-left w-full">
//                                             <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                 First Name
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 className={`w-full h-10 px-2 border ${errors.firstName
//                                                         ? "border-red-500"
//                                                         : "border-gray-300"
//                                                     } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                 placeholder="Enter First Name"
//                                                 value={firstName}
//                                                 onChange={handleFirstNameChange}
//                                             />
//                                             {errors.firstName && (
//                                                 <p className="text-red-500 text-xs mt-1"> {errors.firstName}</p>
//                                             )}
//                                         </div>
//                                         <div className="text-left w-full">
//                                             <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                 Middle Name
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 className={`w-full h-10 px-2 border ${errors.middleName
//                                                         ? "border-red-500"
//                                                         : "border-gray-300"
//                                                     } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                 placeholder="Enter Middle Name"
//                                                 value={middleName}
//                                                 onChange={
//                                                     handleMiddleNameChange
//                                                 }
//                                             />
//                                             {errors.middleName && (
//                                                 <p className="text-red-500 text-xs mt-1"> {errors.middleName} </p>
//                                             )}
//                                         </div>
//                                         <div className="text-left w-full">
//                                             <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                 Last Name
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 className={`w-full h-10 px-2 border ${errors.lastName
//                                                         ? "border-red-500"
//                                                         : "border-gray-300"
//                                                     } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                 placeholder="Enter Last Name"
//                                                 value={lastName}
//                                                 onChange={handleLastNameChange}
//                                             />
//                                             {errors.lastName && (
//                                                 <p className="text-red-500 text-xs mt-1"> {errors.lastName} </p>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div className="flex gap-4 w-full">
//                                         <div className="text-left">
//                                             <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                 Date of Birth
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 value={dob}
//                                                 max={getTenYearsAgoDate()}
//                                                 onChange={handleDobChange}
//                                                 required
//                                                 className={`w-full h-10 px-2 border ${errors.dob
//                                                         ? "border-red-500"
//                                                         : "border-gray-300"
//                                                     } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             />
//                                             {errors.dob && (
//                                                 <p className="text-red-500 text-xs mt-1"> {errors.dob} </p>
//                                             )}
//                                         </div>
//                                         <div className="text-left w-[40%]">
//                                             <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                 Gender
//                                             </label>
//                                             <Select
//                                                 options={genderOptions}
//                                                 value={gender}
//                                                 onChange={handleGenderChange}
//                                                 placeholder="Gender"
//                                                 styles={{
//                                                     ...customStyles,
//                                                     control: (provided) => ({
//                                                         ...provided,
//                                                         borderColor:
//                                                             errors.gender
//                                                                 ? "#EF4444"
//                                                                 : "#D1D5DB",
//                                                         borderRadius: "0.5rem",
//                                                         boxShadow:
//                                                             "1px 1px 3px rgba(0, 0, 0, 0.2)",
//                                                         "&:hover": {
//                                                             borderColor: "none",
//                                                         },
//                                                     }),
//                                                 }}
//                                             />
//                                             {errors.gender && (
//                                                 <p className="text-red-500 text-xs mt-1"> {errors.gender} </p>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div className="text-left w-full">
//                                         <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                             Location
//                                         </label>
//                                         <div className="flex gap-3">
//                                             <div className="w-1/3">
//                                                 <Select
//                                                     options={countries}
//                                                     value={country}
//                                                     onChange={
//                                                         handleCountryChange
//                                                     }
//                                                     placeholder="Country"
//                                                     styles={{
//                                                         ...customStyles,
//                                                         control: (
//                                                             provided
//                                                         ) => ({
//                                                             ...provided,
//                                                             borderColor:
//                                                                 errors.country
//                                                                     ? "#EF4444"
//                                                                     : "#D1D5DB",
//                                                             borderRadius:
//                                                                 "0.5rem",
//                                                             boxShadow:
//                                                                 "1px 1px 3px rgba(0, 0, 0, 0.2)",
//                                                             "&:hover": {
//                                                                 borderColor:
//                                                                     "none",
//                                                             },
//                                                         }),
//                                                     }}
//                                                     isSearchable
//                                                     aria-label="Select country"
//                                                 />
//                                                 {errors.country && (
//                                                     <p className="text-red-500 text-xs mt-1"> {errors.country} </p>
//                                                 )}
//                                             </div>
//                                             <div className="w-1/3">
//                                                 <Select
//                                                     options={availableStates}
//                                                     value={state}
//                                                     onChange={handleStateChange}
//                                                     placeholder="State"
//                                                     styles={{
//                                                         ...customStyles,
//                                                         control: (
//                                                             provided
//                                                         ) => ({
//                                                             ...provided,
//                                                             borderColor:
//                                                                 errors.state
//                                                                     ? "#EF4444"
//                                                                     : "#D1D5DB",
//                                                             borderRadius:
//                                                                 "0.5rem",
//                                                             boxShadow:
//                                                                 "1px 1px 3px rgba(0, 0, 0, 0.2)",
//                                                             "&:hover": {
//                                                                 borderColor:
//                                                                     "none",
//                                                             },
//                                                         }),
//                                                     }}
//                                                     isDisabled={!country}
//                                                     isSearchable
//                                                     aria-label="Select state"
//                                                 />
//                                                 {errors.state && (
//                                                     <p className="text-red-500 text-xs mt-1">
//                                                         {errors.state}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                             <div className="w-1/3">
//                                                 <Select
//                                                     options={availableDistricts}
//                                                     value={district}
//                                                     onChange={
//                                                         handleDistrictChange
//                                                     }
//                                                     placeholder="District"
//                                                     styles={{
//                                                         ...customStyles,
//                                                         control: (
//                                                             provided
//                                                         ) => ({
//                                                             ...provided,
//                                                             borderColor:
//                                                                 errors.district
//                                                                     ? "#EF4444"
//                                                                     : "#D1D5DB",
//                                                             borderRadius:
//                                                                 "0.5rem",
//                                                             boxShadow:
//                                                                 "1px 1px 3px rgba(0, 0, 0, 0.2)",
//                                                             "&:hover": {
//                                                                 borderColor:
//                                                                     "none",
//                                                             },
//                                                         }),
//                                                     }}
//                                                     isDisabled={
//                                                         !country || !state
//                                                     }
//                                                     isSearchable
//                                                     aria-label="Select district"
//                                                 />
//                                                 {errors.district && (
//                                                     <p className="text-red-500 text-xs mt-1"> {errors.district} </p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={handleOnClickNextForFirstSection}
//                                     className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                             <div className="h-full w-[40%] flex justify-center items-center">
//                                 <img
//                                     src="./image1.svg"
//                                     alt=""
//                                     className="h-full"
//                                 />
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//                 {step === 2 && (
//                     <motion.div
//                         key="step2"
//                         className="flex w-screen justify-center items-center h-screen overflow-hidden"
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={pageVariants}
//                     >
//                         <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                             <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                             <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         </div>
//                         <div className="flex gap-10 h-[75%] w-[60%] z-10 bg-white px-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-center">
//                             <div className="h-full w-[40%] flex justify-center items-center">
//                                 <img
//                                     src="./image1.svg"
//                                     alt=""
//                                     className="h-full"
//                                 />
//                             </div>
//                             <div className="flex flex-col h-full gap-4 w-[60%] py-10 rounded-lg">
//                                 <div className="flex flex-col items-start gap-0.5">
//                                     <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
//                                         Verification
//                                     </p>
//                                     <h2 className="text-5xl font-bold text-[#5E0194] mb-2">
//                                         Verify Phone & Email
//                                     </h2>
//                                     <p className="text-[#786D7F] opacity-[86%] text-sm">
//                                         Enter the code sent to your phone to
//                                         proceed.
//                                     </p>
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <div className="flex gap-4 w-full mb-2 items-end">
//                                         <div className="flex items-end gap-2 w-full">
//                                             <div className="text-left w-[60%]">
//                                                 <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                     Phone
//                                                 </label>
//                                                 <PhoneInput
//                                                     country={"in"}
//                                                     value={phoneNumber}
//                                                     onChange={handlePhoneChange}
//                                                     containerClass="w-full"
//                                                     inputClass={`w-full h-10 px-4 text-gray-900 border ${errors.phoneNumber
//                                                             ? "border-red-500"
//                                                             : "border-gray-300"
//                                                         } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                     buttonClass="border-gray-300 h-14 w-16"
//                                                     dropdownClass="h-28"
//                                                     inputStyle={{
//                                                         height: "40px",
//                                                         width: "100%",
//                                                         borderRadius: "0.5rem",
//                                                     }}
//                                                     buttonStyle={{
//                                                         position: "absolute",
//                                                         left: "5px",
//                                                         top: "1px",
//                                                         height: "40px",
//                                                         width: "40px",
//                                                         backgroundColor:
//                                                             "transparent",
//                                                         border: "none",
//                                                         outline: "none",
//                                                     }}
//                                                 />
//                                                 {errors.phoneNumber && (
//                                                     <p className="text-red-500 text-xs mt-1">
//                                                         {errors.phoneNumber}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                             <button
//                                                 className="bg-[#5E0194] text-white w-24 h-10 px-2 py-1 text-xs rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300 disabled:opacity-85"
//                                                 onClick={handleSendPhoneOTP}
//                                                 disabled={phoneTimer > 0}
//                                             >
//                                                 {phoneTimer > 0
//                                                     ? `Resend OTP (${phoneTimer}s)`
//                                                     : "Send OTP"}
//                                             </button>
//                                         </div>
//                                     </div>
//                                     {showOTPInput && (
//                                         <div className="text-left w-[60%] mb-2">
//                                             <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                 Phone Verification Code
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 className={`w-full h-10 px-2 border ${errors.PhoneOTP
//                                                         ? "border-red-500"
//                                                         : "border-gray-300"
//                                                     } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                 placeholder="Enter Code"
//                                                 value={PhoneOTP}
//                                                 onChange={handlePhoneOTPChange}
//                                             />
//                                             {errors.PhoneOTP && (
//                                                 <p className="text-red-500 text-xs mt-1">
//                                                     {errors.PhoneOTP}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     )}
//                                     <div className="flex gap-4 w-full mb-2 items-end">
//                                         <div className="flex items-end gap-2 w-full">
//                                             <div className="text-left w-[60%]">
//                                                 <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                     Email
//                                                 </label>
//                                                 <input
//                                                     type="email"
//                                                     className={`w-full h-10 px-2 border ${errors.email
//                                                             ? "border-red-500"
//                                                             : "border-gray-300"
//                                                         } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                     placeholder="Enter Email Address"
//                                                     value={email}
//                                                     onChange={handleEmailChange}
//                                                 />
//                                                 {errors.email && (
//                                                     <p className="text-red-500 text-xs mt-1">
//                                                         {errors.email}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                             <button
//                                                 className="bg-[#5E0194] text-white w-24 h-10 px-2 py-1 text-xs rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300 disabled:opacity-85"
//                                                 onClick={handleSendEmailOTP}
//                                                 disabled={emailTimer > 0}
//                                             >
//                                                 {emailTimer > 0
//                                                     ? `Resend OTP (${emailTimer}s)`
//                                                     : "Send OTP"}
//                                             </button>
//                                         </div>
//                                     </div>
//                                     {showEmailCodeInput && (
//                                         <div className="text-left w-[60%] mb-2">
//                                             <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                                 Email Verification Code
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 className={`w-full h-10 px-2 border ${errors.EmailOTP
//                                                         ? "border-red-500"
//                                                         : "border-gray-300"
//                                                     } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                                 placeholder="Enter Code"
//                                                 value={EmailOTP}
//                                                 onChange={handleEmailOTPChange}
//                                             />
//                                             {errors.EmailOTP && (
//                                                 <p className="text-red-500 text-xs mt-1">
//                                                     {errors.EmailOTP}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="flex gap-3 w-[85%]">
//                                     <button
//                                         onClick={
//                                             handleOnClickPreviousForSecondSection
//                                         }
//                                         className="bg-gray-400 text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300"
//                                     >
//                                         Back
//                                     </button>
//                                     <button
//                                         onClick={
//                                             handleOnClickNextForSecondSection
//                                         }
//                                         className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
//                                     >
//                                         Next
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//                 {step === 3 && (
//                     <motion.div
//                         key="step3"
//                         className="flex w-screen justify-center items-center h-screen overflow-hidden"
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={pageVariants}
//                     >
//                         <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                             <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                             <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                             <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                             <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         </div>
//                         <div className="flex gap-10 w-fit h-[75%] z-10 bg-white p-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-evenly">
//                             <div className="flex flex-col h-full gap-1 w-[50%] p-4 rounded-lg justify-center">
//                                 <div className="flex flex-col mb-2 items-start gap-0.5">
//                                     <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
//                                         Set Password
//                                     </p>
//                                     <h2 className="text-[48px] font-bold text-[#5E0194]">
//                                         Create Your Password
//                                     </h2>
//                                     <p className="text-[#786D7F] opacity-[86%] text-sm">
//                                         Set a strong password to secure your
//                                         account.
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
//                                             className={`w-full h-10 px-2 pr-10 border ${errors.password
//                                                     ? "border-red-500"
//                                                     : "border-gray-300"
//                                                 } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
//                                             placeholder="Enter Password"
//                                             value={password}
//                                             onChange={handlePasswordChange}
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 setShowPassword(!showPassword)
//                                             }
//                                             className="absolute right-2 top-[35px] text-gray-500"
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
//                                     <div className="text-left mb-4 relative">
//                                         <label className="block font-medium mb-1 text-black opacity-[73%]">
//                                             Re-Enter Password
//                                         </label>
//                                         <input
//                                             type={
//                                                 showConfirmPassword
//                                                     ? "text"
//                                                     : "password"
//                                             }
//                                             className={`w-full h-10 px-2 pr-10 border ${errors.confirmPassword
//                                                     ? "border-red-500"
//                                                     : "border-gray-300"
//                                                 } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
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
//                                             className="absolute right-2 top-[35px] text-gray-500"
//                                         >
//                                             {showConfirmPassword ? (
//                                                 <FaEyeSlash size={18} />
//                                             ) : (
//                                                 <FaEye size={18} />
//                                             )}
//                                         </button>
//                                         {errors.confirmPassword && (
//                                             <p className="text-red-500 text-xs mt-1">
//                                                 {errors.confirmPassword}
//                                             </p>
//                                         )}
//                                     </div>
//                                     {/* Chackbox of Agreed to Terms and Conditons */}
//                                     <div className="text-left">
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
//                                             </span>
//                                         </label>
//                                         {errors.agreed && (
//                                             <p className="text-red-500 text-xs mt-1">
//                                                 {errors.agreed}
//                                             </p>
//                                         )}
//                                     </div>
//                                     {errors.form && (
//                                         <p className="text-red-500 text-xs mt-1 text-center">
//                                             {errors.form}
//                                         </p>
//                                     )}
//                                     <button
//                                         className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
//                                         onClick={handleGetStarted}
//                                     >
//                                         Get Started
//                                     </button>
//                                     <p className="text-[#786D7F] opacity-[86%] text-sm">
//                                         Already have an account?{" "}
//                                         <a
//                                             onClick={handleLogin}
//                                             href="#"
//                                             className="text-[#A100FF] font-medium underline"
//                                         >
//                                             Log in
//                                         </a>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="h-full w-fit flex justify-center items-center">
//                                 <img
//                                     src="./image2.svg"
//                                     alt=""
//                                     className="h-full"
//                                 />
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };

// export default SignUpNew;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import PasswordValidator from "password-validator";

// Initialize password validator schema
const schema = new PasswordValidator();
schema
    .is().min(8) // Minimum length 8
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits() // Must have digits
    .has().symbols() // Must have symbols
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
    const [role, setRole] = useState("");
    const [step, setStep] = useState(2);
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
    const [phoneTimer, setPhoneTimer] = useState(0);
    const [emailTimer, setEmailTimer] = useState(0);
    const [agreed, setAgreed] = useState(false);

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
        const tenYearsAgo = new Date();
        tenYearsAgo.setFullYear(today.getFullYear() - 10);

        if (selectedDate > today) {
            return "Please Insert Valid Date";
        }
        if (selectedDate > tenYearsAgo) {
            return "You must be at least 10 years old";
        }
        return "";
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

    const getTenYearsAgoDate = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 10);
        return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
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
        if (phoneTimer > 0) {
            const timer = setInterval(() => {
                setPhoneTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [phoneTimer]);

    useEffect(() => {
        if (emailTimer > 0) {
            const timer = setInterval(() => {
                setEmailTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [emailTimer]);

    const handleSendEmailOTP = async (e) => {
        e.preventDefault();
        setShowEmailCodeInput(true);
        setEmailTimer(60);

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
            if (!data.success) {
                toast.error(data.message || "Failed to send OTP.");
                setEmailTimer(0); // Reset timer on failure
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("An error occurred. Please try again.");
            setEmailTimer(0); // Reset timer on failure
        }
    };

    const handleSendPhoneOTP = () => {
        setShowOTPInput(true);
        setPhoneTimer(60);
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
        setRole(e.target.value);
        setErrors((prev) => ({ ...prev, role: "" }));
    };

    const phoneValidation = () => {
        if (phoneNumber.length !== 12) {
            setErrors((prev) => ({
                ...prev,
                phoneNumber: "Invalid phone number",
            }));
            return false;
        }
        return true;
    };

    const passwordValidation = (password) => {
        const validationErrors = schema.validate(password, { details: true });
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => {
                switch (err.validation) {
                    case "min":
                        return "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, %.";
                    case "uppercase":
                        return "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, %.";
                    case "lowercase":
                        return "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, %.";
                    case "digits":
                        return "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, %.";
                    case "symbols":
                        return "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, %.";
                    default:
                        return "Password must be at least 8 characters and include: A-Z, a-z, 0-9, and symbols like @, #, $, %.";
                }
            });
            setErrors((prev) => ({
                ...prev,
                password: errorMessages[0], // Display the first error
            }));
            return false;
        }
        return true;
    };

    const validateOTP = async () => {
        if (PhoneOTP !== "1234") {
            setErrors((prev) => ({
                ...prev,
                PhoneOTP: PhoneOTP !== "1234" ? "Invalid Phone OTP" : "",
            }));
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
                toast.success("OTP verified successfully!");
                return true;
            } else {
                toast.error("Invalid OTP.");
                return false;
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("An error occurred. Please try again.");
            return false;
        }
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
            return;
        }

        setStep(2);
    };

    const handleOnClickNextForSecondSection = () => {
        const newErrors = {
            phoneNumber: !phoneNumber ? "Phone number is required" : "",
            email: !email ? "Email is required" : "",
            PhoneOTP: !PhoneOTP ? "Phone verification code is required" : "",
            EmailOTP: !EmailOTP ? "Email verification code is required" : "",
        };

        if (phoneNumber && !phoneValidation()) {
            newErrors.phoneNumber = "Invalid phone number";
        }

        if (PhoneOTP && EmailOTP) {
            if (!validateOTP()) {
                newErrors.PhoneOTP =
                    PhoneOTP !== "1234" ? "Invalid Phone OTP" : "";
                newErrors.EmailOTP =
                    EmailOTP !== "1234" ? "Invalid Email OTP" : "";
            }
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (hasErrors) {
            toast.error("Please correct the errors");
            return;
        }

        setStep(3);
    };

    const handleOnClickPreviousForSecondSection = () => {
        setStep(1);
    };

    const handleGetStarted = () => {
        const newErrors = {
            password: "",
            confirmPassword: "",
        };

        if (!passwordValidation(password)) {
            setErrors((prev) => ({ ...prev, ...newErrors }));
            return;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors((prev) => ({ ...prev, ...newErrors }));

        const hasErrors =
            Object.values(newErrors).some((error) => error) || errors.password;

        if (hasErrors) {
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
            } else {
                setErrors((prev) => ({ ...prev, form: data.message }));
            }
        } catch (error) {
            setErrors((prev) => ({ ...prev, form: "Registration failed" }));
        }
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        className="flex w-screen justify-center items-center h-screen overflow-hidden"
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
                        <div className="flex gap-0 h-[80%] w-[65%] z-10 bg-white px-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-center">
                            <div className="flex flex-col h-full gap-2 w-[55%] px-5 py-5 rounded-lg justify-center">
                                <div className="flex flex-col items-start">
                                    <p className="uppercase text-[#2B0242] opacity-[66%] font-medium"> Register now </p>
                                    <h2 className="text-[48px] font-bold text-[#5E0194]"> Sign Up for Free. </h2>
                                    <p className="text-[#786D7F] opacity-[86%] text-sm">
                                        Already have an account?{" "}
                                        <a href="#" className="text-[#A100FF] font-medium underline" onClick={handleLogin}>
                                            Sign in
                                        </a>
                                    </p>
                                </div>
                                <div className="flex flex-col w-full gap-2 mb-4">
                                    <div className="text-left mb-2">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]"> What do you want to do ?</label>
                                        <div className="flex gap-4">
                                            <label
                                                className={`flex items-center gap-2 ${errors.role
                                                    ? "text-red-500"
                                                    : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="Founder"
                                                    checked={role === "Founder"}
                                                    onChange={handleRoleChange}
                                                    className="h-4 w-4 border-gray-300"
                                                />
                                                <span className="text-sm text-gray-600"> Discover Talent </span>
                                            </label>
                                            <label
                                                className={`flex items-center gap-2 ${errors.role
                                                    ? "text-red-500"
                                                    : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="GetDiscovered"
                                                    checked={
                                                        role === "GetDiscovered"
                                                    }
                                                    onChange={handleRoleChange}
                                                    className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
                                                />
                                                <span className="text-sm text-gray-600"> Get Discovered </span>
                                            </label>
                                        </div>
                                        {errors.role && (
                                            <p className="text-red-500 text-xs mt-1"> {errors.role} </p>
                                        )}
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <div className="text-left w-full">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full h-10 px-2 border ${errors.firstName
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
                                        <div className="text-left w-full">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full h-10 px-2 border ${errors.middleName
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
                                        <div className="text-left w-full">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full h-10 px-2 border ${errors.lastName
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
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <div className="text-left">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                value={dob}
                                                max={getTenYearsAgoDate()}
                                                onChange={handleDobChange}
                                                required
                                                className={`w-full h-10 px-2 border ${errors.dob
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                                    } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            />
                                            {errors.dob && (
                                                <p className="text-red-500 text-xs mt-1"> {errors.dob} </p>
                                            )}
                                        </div>
                                        <div className="text-left w-[40%]">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                Gender
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
                                    <div className="text-left w-full">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Location
                                        </label>
                                        <div className="flex gap-3">
                                            <div className="w-1/3">
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
                                            <div className="w-1/3">
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
                                            <div className="w-1/3">
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
                                                    <p className="text-red-500 text-xs mt-1"> {errors.district} </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleOnClickNextForFirstSection}
                                    className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="h-full w-[40%] flex justify-center items-center">
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
                        className="flex w-screen justify-center items-center h-screen overflow-hidden"
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
                        <div className="flex items-center justify-center gap-10 h-[75%] w-[60%] z-10 bg-white px-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm">
                            <div className=" flex flex-col h-full gap-4 w-full py-10 rounded-lg">
                                <div className="flex flex-col items-start gap-0.5">
                                    <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
                                        Verification
                                    </p>
                                    <h2 className="text-5xl font-bold text-[#5E0194] mb-2">
                                        Verify Phone & Email
                                    </h2>
                                    <p className="text-[#786D7F] opacity-[86%] text-sm">
                                        Enter the code sent to your phone to
                                        proceed.
                                    </p>
                                </div>
                                <div className="flex ">
                                    <div className=" w-full">
                                        <div className="flex gap-4 w-full mb-2 items-end">
                                            <div className="flex items-end gap-2 w-full">
                                                <div className="text-left w-[60%]">
                                                    <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                        Phone
                                                    </label>
                                                    <PhoneInput
                                                        country={"in"}
                                                        value={phoneNumber}
                                                        onChange={handlePhoneChange}
                                                        containerClass="w-full"
                                                        inputClass={`w-full h-10 px-4 text-gray-900 border ${errors.phoneNumber
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                            } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                        buttonClass="border-gray-300 h-14 w-16"
                                                        dropdownClass="h-28"
                                                        inputStyle={{
                                                            height: "40px",
                                                            width: "100%",
                                                            borderRadius: "0.5rem",
                                                        }}
                                                        buttonStyle={{
                                                            position: "absolute",
                                                            left: "5px",
                                                            top: "1px",
                                                            height: "40px",
                                                            width: "40px",
                                                            backgroundColor:
                                                                "transparent",
                                                            border: "none",
                                                            outline: "none",
                                                        }}
                                                    />
                                                    {errors.phoneNumber && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.phoneNumber}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    className="bg-[#5E0194] text-white w-24 h-10 px-2 py-1 text-xs rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300 disabled:opacity-85"
                                                    onClick={handleSendPhoneOTP}
                                                    disabled={phoneTimer > 0}
                                                >
                                                    {phoneTimer > 0
                                                        ? `Resend OTP (${phoneTimer}s)`
                                                        : "Send OTP"}
                                                </button>
                                            </div>
                                        </div>
                                        {showOTPInput && (
                                            <div className="text-left w-[60%] mb-2">
                                                <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                    Phone Verification Code
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`w-full h-10 px-2 border ${errors.PhoneOTP
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                        } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                    placeholder="Enter Code"
                                                    value={PhoneOTP}
                                                    onChange={handlePhoneOTPChange}
                                                />
                                                {errors.PhoneOTP && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.PhoneOTP}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className=" w-full">
                                        <div className="flex gap-4 w-full mb-2 items-end">
                                            <div className="flex items-end gap-2 w-full">
                                                <div className="text-left w-[60%]">
                                                    <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className={`w-full h-10 px-2 border ${errors.email
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                            } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                        placeholder="Enter Email Address"
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                    />
                                                    {errors.email && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    className="bg-[#5E0194] text-white w-24 h-10 px-2 py-1 text-xs rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300 disabled:opacity-85"
                                                    onClick={handleSendEmailOTP}
                                                    disabled={emailTimer > 0}
                                                >
                                                    {emailTimer > 0
                                                        ? `Resend OTP (${emailTimer}s)`
                                                        : "Send OTP"}
                                                </button>
                                            </div>
                                        </div>
                                        {showEmailCodeInput && (
                                            <div className="text-left w-[60%] mb-2">
                                                <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                    Email Verification Code
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`w-full h-10 px-2 border ${errors.EmailOTP
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                        } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                    placeholder="Enter Code"
                                                    value={EmailOTP}
                                                    onChange={handleEmailOTPChange}
                                                />
                                                {errors.EmailOTP && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.EmailOTP}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3 w-[85%]">
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
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        className="flex w-screen justify-center items-center h-screen overflow-hidden"
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
                                            className={`w-full h-10 px-2 pr-10 border ${errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-2 top-[35px] text-gray-500"
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
                                    <div className="text-left mb-4 relative">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Re-Enter Password
                                        </label>
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className={`w-full h-10 px-2 pr-10 border ${errors.confirmPassword
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
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
                                            className="absolute right-2 top-[35px] text-gray-500"
                                        >
                                            {showConfirmPassword ? (
                                                <FaEyeSlash size={18} />
                                            ) : (
                                                <FaEye size={18} />
                                            )}
                                        </button>
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.confirmPassword}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={agreed}
                                                onChange={handleAgreedChange}
                                                className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300 rounded"
                                            />
                                            <span className="text-sm text-gray-600">
                                                I agree to the{" "}
                                                <a
                                                    href="/"
                                                    className="text-[#A100FF] underline"
                                                    target="_blank"
                                                >
                                                    terms and conditions
                                                </a>
                                            </span>
                                        </label>
                                        {errors.agreed && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.agreed}
                                            </p>
                                        )}
                                    </div>
                                    {errors.form && (
                                        <p className="text-red-500 text-xs mt-1 text-center">
                                            {errors.form}
                                        </p>
                                    )}
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

export default SignUpNew;