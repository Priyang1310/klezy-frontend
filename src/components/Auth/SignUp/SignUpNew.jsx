import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Reusable Input Component with Inline Messages
const InputWithMessage = ({
    type,
    name,
    placeholder,
    value,
    onChange,
    required,
    validate,
    errorMessage,
    successMessage,
    showToggle,
    showState,
    setShowState,
}) => {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
        if (validate) {
            const result = validate(newValue);
            setMessage(result.message);
            setMessageType(result.type);
        } else {
            setMessage("");
            setMessageType("");
        }
    };

    return (
        <div className="text-left w-full relative">
            <label className="block font-medium mb-1 text-black opacity-[73%]">
                {placeholder}
            </label>
            <div className="relative">
                <input
                    type={showState && type === "password" ? "text" : type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={`Enter ${placeholder}`}
                    required={required}
                    className={`w-full h-10 px-2 border ${messageType === "error" || errorMessage
                        ? "border-red-500"
                        : "border-gray-300"
                        } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                />
                {showToggle && (
                    <button
                        type="button"
                        onClick={() => setShowState(!showState)}
                        className="absolute right-2 top-2.5 text-gray-500"
                    >
                        {showState ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                )}
            </div>
            {(message || errorMessage) && (
                <span
                    className={`text-sm mt-1 block ${messageType === "success" && !errorMessage
                        ? "text-green-500"
                        : "text-red-500"
                        }`}
                >
                    {errorMessage || message}
                </span>
            )}
        </div>
    );
};

// Reusable Select Component with Inline Messages
const SelectWithMessage = ({
    options,
    value,
    onChange,
    placeholder,
    isDisabled,
    isSearchable,
    errorMessage,
    styles,
}) => {
    return (
        <div className="text-left w-full">
            {/* <label className="block font-medium mb-1 text-black opacity-[73%]">
                {placeholder}
            </label> */}
            <Select
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isSearchable={isSearchable}
                styles={styles}
            />
            {errorMessage && (
                <span className="text-sm mt-1 block text-red-500">{errorMessage}</span>
            )}
        </div>
    );
};

// Reusable PhoneInput Component with Inline Messages
const PhoneInputWithMessage = ({
    value,
    onChange,
    errorMessage,
    validate,
}) => {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (phone) => {
        onChange(phone);
        if (validate) {
            const result = validate(phone);
            setMessage(result.message);
            setMessageType(result.type);
        } else {
            setMessage("");
            setMessageType("");
        }
    };

    // Trigger validation on mount to catch empty state
    useEffect(() => {
        if (validate) {
            const result = validate(value);
            setMessage(result.message);
            setMessageType(result.type);
        }
    }, [value, validate]);

    return (
        <div className="text-left w-full">
            <label className="block font-medium mb-1 text-black opacity-[73%]">
                {/* Phone <span className="text-red-500">(compulsory)</span> */}
            </label>
            <PhoneInput
                country={"in"}
                value={value}
                onChange={handleChange}
                containerClass="w-full"
                inputClass={`w-full h-10 px-4 text-gray-900 border ${messageType === "error" || errorMessage
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
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                }}
            />
            {(message || errorMessage) && (
                <span
                    className={`text-sm mt-1 block ${messageType === "success" && !errorMessage
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                >
                    {errorMessage || message}
                </span>
            )}
        </div>
    );
};

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

    useEffect(() => {
        const countryData = Country.getAllCountries().map((c) => ({
            value: c.isoCode,
            label: c.name,
        }));
        setCountries(countryData);
    }, []);

    useEffect(() => {
        if (country) {
            const stateData = State.getStatesOfCountry(country.value).map((s) => ({
                value: s.isoCode,
                label: s.name,
            }));
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

    useEffect(() => {
        if (state && country) {
            const districtData = City.getCitiesOfState(country.value, state.value).map(
                (d) => ({
                    value: d.name,
                    label: d.name,
                })
            );
            setAvailableDistricts(districtData);
            setDistrict(null);
        } else {
            setAvailableDistricts([]);
            setDistrict(null);
        }
    }, [state, country]);

    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
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

    const handleSendPhoneOTP = () => {
        setShowOTPInput(true);
        setPhoneTimer(60);
    };

    const handleSendEmailOtp = async (e, isResend = false) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3333/api/otp/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailOrPhone }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success(isResend ? "OTP resent successfully!" : "OTP sent successfully!");
                setBackendOtp(data.otp); // Store the OTP from backend
                setShowOTPInput(true); // Show OTP input field
                setResendDisabled(true); // Disable resend button
                setResendCountdown(60); // Reset countdown
            } else {
                toast.error(data.message || "Failed to send OTP.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleSendEmailOTP = () => {
        setShowEmailCodeInput(true);
        setEmailTimer(60);
    };

    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption);
        setErrors((prev) => ({ ...prev, gender: false }));
    };

    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption);
        setErrors((prev) => ({ ...prev, country: false }));
    };

    const handleStateChange = (selectedOption) => {
        setState(selectedOption);
        setErrors((prev) => ({ ...prev, state: false }));
    };

    const handleDistrictChange = (selectedOption) => {
        setDistrict(selectedOption);
        setErrors((prev) => ({ ...prev, district: false }));
    };

    // const validatePhone = (phone) => {
    //     if (phone.length !== 12) {
    //         return { type: "error", message: "Invalid phone number!" };
    //     }
    //     return { type: "success", message: "Phone number is valid!" };
    // };
    const validatePhone = (phone) => {
        // Check if phone is empty or only contains the country code
        if (!phone || phone.length <= 3) { // Adjust length based on your country code (e.g., +91 is 3 chars)
            return { type: "error", message: "Phone number is required!" };
        }
        if (phone.length !== 12) { // Assuming 10-digit number + country code (e.g., +91XXXXXXXXXX)
            return { type: "error", message: "Invalid phone number! Must be 10 digits." };
        }
        return { type: "success", message: "Phone number is valid!" };
    };

    const validateEmail = (email) => {
        if (!email) {
            return { type: "error", message: "Email is required!" };
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return { type: "error", message: "Invalid email format!" };
        }
        return { type: "success", message: "Email is valid!" };
    };

    const validatePassword = (password) => {
        if (!password) {
            return { type: "error", message: "Password is required!" };
        }
        if (password.length < 8) {
            return { type: "error", message: "Password must be at least 8 characters!" };
        }
        if (!/[A-Z]/.test(password)) {
            return { type: "error", message: "Password must contain at least one uppercase letter!" };
        }
        if (!/[a-z]/.test(password)) {
            return { type: "error", message: "Password must contain at least one lowercase letter!" };
        }
        if (!/[0-9]/.test(password)) {
            return { type: "error", message: "Password must contain at least one number!" };
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return { type: "error", message: "Password must contain at least one special character!" };
        }
        return { type: "success", message: "Strong password!" };
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) {
            return { type: "error", message: "Please confirm your password!" };
        }
        if (confirmPassword !== password) {
            return { type: "error", message: "Passwords do not match!" };
        }
        return { type: "success", message: "Passwords match!" };
    };

    const validateOTP = () => {
        if (PhoneOTP === "1234" && EmailOTP === "1234") {
            return true;
        }
        setErrors((prev) => ({
            ...prev,
            PhoneOTP: "Invalid Phone OTP!",
            EmailOTP: "Invalid Email OTP!",
        }));
        return false;
    };

    const handleStep1Submit = (e) => {
        e.preventDefault();
        const newErrors = {
            firstName: !firstName ? "First Name is required!" : false,
            lastName: !lastName ? "Last Name is required!" : false,
            gender: !gender || gender.value === "" ? "Gender is required!" : false,
            country: !country ? "Country is required!" : false,
            state: !state ? "State is required!" : false,
            district: !district ? "District is required!" : false,
            role: !role ? "Please select a role!" : false,
            dob: !dob ? "Date of Birth is required!" : false,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        setStep(2);
    };

    // const handleStep2Submit = (e) => {
    //     e.preventDefault();
    //     const newErrors = {
    //         phoneNumber: !phoneNumber ? "Phone number is required!" : false,
    //         email: !email ? "Email is required!" : false,
    //         PhoneOTP: !PhoneOTP && showOTPInput ? "Phone verification code is required!" : false,
    //         EmailOTP: !EmailOTP && showEmailCodeInput ? "Email verification code is required!" : false,
    //     };

    //     setErrors(newErrors);

    //     if (Object.values(newErrors).some((error) => error)) {
    //         return;
    //     }

    //     if (!validatePhone(phoneNumber).type === "success") {
    //         setErrors((prev) => ({
    //             ...prev,
    //             phoneNumber: "Invalid phone number!",
    //         }));
    //         return;
    //     }

    //     if (!validateEmail(email).type === "success") {
    //         setErrors((prev) => ({
    //             ...prev,
    //             email: "Invalid email format!",
    //         }));
    //         return;
    //     }

    //     if (!validateOTP()) {
    //         return;
    //     }

    //     setStep(3);
    // };


    const handleStep2Submit = (e) => {
        e.preventDefault();
        const newErrors = {
            phoneNumber: !phoneNumber || phoneNumber.length <= 3 ? "Phone number is required!" : false,
            email: !email ? "Email is required!" : false,
            PhoneOTP: !PhoneOTP && showOTPInput ? "Phone verification code is required!" : false,
            EmailOTP: !EmailOTP && showEmailCodeInput ? "Email verification code is required!" : false,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        const phoneValidation = validatePhone(phoneNumber);
        if (phoneValidation.type !== "success") {
            setErrors((prev) => ({
                ...prev,
                phoneNumber: phoneValidation.message,
            }));
            return;
        }

        if (validateEmail(email).type !== "success") {
            setErrors((prev) => ({
                ...prev,
                email: "Invalid email format!",
            }));
            return;
        }

        if (!validateOTP()) {
            return;
        }

        setStep(3);
    };



    const handleStep3Submit = async (e) => {
        e.preventDefault();
        const newErrors = {
            password: !validatePassword(password).type === "success" ? validatePassword(password).message : false,
            confirmPassword: !validateConfirmPassword(confirmPassword).type === "success" ? validateConfirmPassword(confirmPassword).message : false,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        try {
            const response = await fetch("http://localhost:3333/api/auth/signup", {
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
                    country: country?.value,
                    state: state?.value,
                    city: district?.value,
                }),
            });
            const data = await response.json();
            if (data.success) {
                setErrors((prev) => ({
                    ...prev,
                    form: { type: "success", message: "Registration successful!" },
                }));
                navigate("/login");
            } else {
                setErrors((prev) => ({
                    ...prev,
                    form: { type: "error", message: data.message },
                }));
            }
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                form: { type: "error", message: "An error occurred. Please try again." },
            }));
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
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
                    {/* Background Divs */}
                    <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
                        <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                    </div>
                    <form
                        onSubmit={handleStep1Submit}
                        className="flex gap-0 h-[80%] w-[65%] z-10 bg-white px-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-center"
                    >
                        {/* Left side Input fields */}
                        <div className="flex flex-col h-full gap-2 w-[55%] px-5 py-5 rounded-lg justify-center">
                            {/* Text */}
                            <div className="flex flex-col items-start">
                                <p className="uppercase text-[#2B0242] opacity-[66%] font-medium"> Register now </p>
                                <h2 className="text-[48px] font-bold text-[#5E0194]">Sign Up for Free. </h2>
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
                            {/* Input fields */}
                            <div className="flex flex-col w-full gap-2 mb-4">
                                {/* Type of User */}
                                <div className="text-left mb-2">
                                    <label className="block font-medium mb-1 text-black opacity-[73%]"> Who you are </label>
                                    <div className="flex gap-4">
                                        <label className={`flex items-center gap-2 ${errors.role ? "text-red-500" : ""}`}>
                                            <input
                                                type="radio"
                                                name="role"
                                                value="Founder"
                                                checked={role === "Founder"}
                                                onChange={(e) => {
                                                    setRole(e.target.value);
                                                    setErrors((prev) => ({ ...prev, role: false }));
                                                }}
                                                className="h-4 w-4 border-gray-300"
                                                required
                                            />
                                            <span className="text-sm text-gray-600"> Discover Talent </span>
                                        </label>
                                        <label className={`flex items-center gap-2 ${errors.role ? "text-red-500" : ""}`}>
                                            <input
                                                type="radio"
                                                name="role"
                                                value="GetDiscovered"
                                                checked={role === "GetDiscovered"}
                                                onChange={(e) => {
                                                    setRole(e.target.value);
                                                    setErrors((prev) => ({ ...prev, role: false }));
                                                }}
                                                className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
                                                required
                                            />
                                            <span className="text-sm text-gray-600"> Getting Discovered </span>
                                        </label>
                                    </div>
                                    {errors.role && (
                                        <span className="text-sm mt-1 block text-red-500"> {errors.role} </span>
                                    )}
                                </div>
                                {/* Full Name input */}
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {/* First Name */}
                                    <InputWithMessage
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(value) => {
                                            setFirstName(value);
                                            setErrors((prev) => ({ ...prev, firstName: false }));
                                        }}
                                        required
                                        errorMessage={errors.firstName}
                                    />
                                    {/* Mid Name */}
                                    <InputWithMessage
                                        type="text"
                                        name="middleName"
                                        placeholder="Middle Name"
                                        value={middleName}
                                        onChange={setMiddleName}
                                    />
                                    {/* Last Name */}
                                    <InputWithMessage
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(value) => {
                                            setLastName(value);
                                            setErrors((prev) => ({ ...prev, lastName: false }));
                                        }}
                                        required
                                        errorMessage={errors.lastName}
                                    />
                                </div>
                                {/* Date of Birth and Gender */}
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {/* DOB */}
                                    <div className="">
                                        <InputWithMessage
                                            type="date"
                                            name="dob"
                                            placeholder="Date of Birth"
                                            value={dob}
                                            onChange={(value) => {
                                                setDob(value);
                                                setErrors((prev) => ({ ...prev, dob: false }));
                                            }}
                                            required
                                            errorMessage={errors.dob}
                                        />
                                    </div>
                                    {/* Gender */}
                                    <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]"> Gender </label>
                                        <SelectWithMessage
                                            options={genderOptions}
                                            value={gender}
                                            onChange={handleGenderChange}
                                            placeholder="Gender"
                                            isSearchable={false}
                                            errorMessage={errors.gender}
                                            styles={{
                                                ...customStyles,
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderColor: errors.gender ? "#EF4444" : "#D1D5DB",
                                                    borderRadius: "0.5rem",
                                                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                                                    "&:hover": { borderColor: "none" },
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* Location */}
                                <div className="text-left w-full">
                                    <label className="block font-medium mb-1 text-black opacity-[73%]"> Location </label>
                                    <div className="flex gap-3">
                                        {/* Country */}
                                        <SelectWithMessage
                                            className="w-1/3"
                                            options={countries}
                                            value={country}
                                            onChange={handleCountryChange}
                                            placeholder="Country"
                                            isSearchable
                                            errorMessage={errors.country}
                                            styles={{
                                                ...customStyles,
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderColor: errors.country ? "#EF4444" : "#D1D5DB",
                                                    borderRadius: "0.5rem",
                                                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                                                    "&:hover": { borderColor: "none" },
                                                }),
                                            }}
                                        />
                                        {/* State */}
                                        <SelectWithMessage
                                            className="w-1/3"
                                            options={availableStates}
                                            value={state}
                                            onChange={handleStateChange}
                                            placeholder="State"
                                            isDisabled={!country}
                                            isSearchable
                                            errorMessage={errors.state}
                                            styles={{
                                                ...customStyles,
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderColor: errors.state ? "#EF4444" : "#D1D5DB",
                                                    borderRadius: "0.5rem",
                                                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                                                    "&:hover": { borderColor: "none" },
                                                }),
                                            }}
                                        />
                                        {/* District */}
                                        <SelectWithMessage
                                            className="w-1/3"
                                            options={availableDistricts}
                                            value={district}
                                            onChange={handleDistrictChange}
                                            placeholder="District"
                                            isDisabled={!country || !state}
                                            isSearchable
                                            errorMessage={errors.district}
                                            styles={{
                                                ...customStyles,
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderColor: errors.district ? "#EF4444" : "#D1D5DB",
                                                    borderRadius: "0.5rem",
                                                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                                                    "&:hover": { borderColor: "none" },
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Next button */}
                            <button
                                type="submit"
                                className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
                            >
                                Next
                            </button>
                        </div>
                        {/* Right side Phone Image */}
                        <div className="h-full w-[40%] flex justify-center items-center">
                            <img src="./image1.svg" alt="" className="h-full" />
                        </div>
                    </form>
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
                    {/* Background Divs */}
                    <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
                        <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                    </div>
                    <form
                        onSubmit={handleStep2Submit}
                        className="flex gap-10 h-[75%] w-[60%] z-10 bg-white px-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-center"
                    >
                        {/* Right side Phone Image */}
                        <div className="h-full w-[40%] flex justify-center items-center">
                            <img src="./image1.svg" alt="" className="h-full" />
                        </div>
                        {/* Left side Imput fields */}
                        <div className="flex flex-col h-full gap-4 w-[60%] py-10 rounded-lg">
                            {/* Texts */}
                            <div className="flex flex-col items-start gap-0.5">
                                <p className="uppercase text-[#2B0242] opacity-[66%] font-medium"> Verification </p>
                                <h2 className="text-5xl font-bold text-[#5E0194] mb-2"> Verify Phone & Email </h2>
                                <p className="text-[#786D7F] opacity-[86%] text-sm"> Enter the code sent to your phone to proceed. </p>
                            </div>
                            {/* Input fields */}
                            <div className="flex flex-col">
                                {/* Phone Input */}
                                <div className="flex gap-4 w-full mb-2 items-end h-fit">
                                    <div className="flex items-end gap-2 w-full">
                                        {/* Pnone Input */}
                                        <div className="text-left w-[60%] h-fit">
                                            <PhoneInputWithMessage
                                                value={phoneNumber}
                                                onChange={(phone) => {
                                                    setPhoneNumber(phone);
                                                    setErrors((prev) => ({
                                                        ...prev,
                                                        phoneNumber: false,
                                                    }));
                                                }}
                                                errorMessage={errors.phoneNumber}
                                                validate={validatePhone}
                                            />
                                        </div>
                                        <div className="h-fit flex items-center justify-center my-auto">
                                            <button
                                                type="button"
                                                className="bg-[#5E0194] text-white w-24 h-10 px-2 py-1 text-xs rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300 disabled:opacity-85"
                                                onClick={handleSendPhoneOTP}
                                                disabled={phoneTimer > 0}
                                            >
                                                {phoneTimer > 0 ? `Resend OTP (${phoneTimer}s)` : "Send OTP"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {showOTPInput && (
                                    <div className="text-left w-[60%] mb-2">
                                        <InputWithMessage
                                            type="text"
                                            name="PhoneOTP"
                                            placeholder="Enter Phone Verification Code"
                                            value={PhoneOTP}
                                            onChange={setPhoneOTP}
                                            required
                                            errorMessage={errors.PhoneOTP}
                                        />
                                    </div>
                                )}
                                {/* Email Input */}
                                <div className="flex gap-4 w-full mb-2 items-end">
                                    <div className="flex items-end gap-2 w-full">
                                        {/* Email Input */}
                                        <div className="text-left w-[60%]">
                                            <InputWithMessage
                                                type="email"
                                                name="email"
                                                placeholder="Enter Email Address"
                                                value={email}
                                                onChange={(value) => {
                                                    setEmail(value);
                                                    setErrors((prev) => ({ ...prev, email: false }));
                                                }}
                                                required
                                                validate={validateEmail}
                                                errorMessage={errors.email}
                                            />
                                        </div>
                                        <div className="h-fit flex items-center justify-center my-auto">
                                            <button
                                                type="button"
                                                className="bg-[#5E0194] text-white w-24 h-10 px-2 py-1 text-xs rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300 disabled:opacity-85"
                                                onClick={handleSendEmailOTP}
                                                disabled={emailTimer > 0}
                                            >
                                                {emailTimer > 0 ? `Resend OTP (${emailTimer}s)` : "Send OTP"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {showEmailCodeInput && (
                                    <div className="text-left w-[60%] mb-2">
                                        <InputWithMessage
                                            type="text"
                                            name="EmailOTP"
                                            placeholder="Enter Email Verification Code"
                                            value={EmailOTP}
                                            onChange={setEmailOTP}
                                            required
                                            errorMessage={errors.EmailOTP}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 w-[85%]">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="bg-gray-400 text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 transition-all duration-300"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </form>
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
                    <form
                        onSubmit={handleStep3Submit}
                        className="flex gap-10 w-fit h-[75%] z-10 bg-white p-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-evenly"
                    >
                        <div className="flex flex-col h-full gap-1 w-[50%] p-4 rounded-lg justify-center">
                            <div className="flex flex-col mb-2 items-start gap-0.5">
                                <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
                                    Set Password
                                </p>
                                <h2 className="text-[48px] font-bold text-[#5E0194]">
                                    Create Your Password
                                </h2>
                                <p className="text-[#786D7F] opacity-[86%] text-sm">
                                    Set a strong password to secure your account.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <InputWithMessage
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(value) => {
                                        setPassword(value);
                                        setErrors((prev) => ({ ...prev, password: false }));
                                    }}
                                    required
                                    validate={validatePassword}
                                    errorMessage={errors.password}
                                    showToggle
                                    showState={showPassword}
                                    setShowState={setShowPassword}
                                />
                                <InputWithMessage
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Re-Enter Password"
                                    value={confirmPassword}
                                    onChange={(value) => {
                                        setConfirmPassword(value);
                                        setErrors((prev) => ({ ...prev, confirmPassword: false }));
                                    }}
                                    required
                                    validate={validateConfirmPassword}
                                    errorMessage={errors.confirmPassword}
                                    showToggle
                                    showState={showConfirmPassword}
                                    setShowState={setShowConfirmPassword}
                                />
                                {errors.form && (
                                    <span
                                        className={`text-sm mt-1 block ${errors.form.type === "success"
                                            ? "text-green-500"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {errors.form.message}
                                    </span>
                                )}
                                <button
                                    type="submit"
                                    className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
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
                            <img src="./image2.svg" alt="" className="h-full" />
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SignUpNew;