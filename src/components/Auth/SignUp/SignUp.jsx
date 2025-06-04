import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpRequest = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [resendTimer, setResendTimer] = useState(60);
    const [PhoneOTP, setPhoneOTP] = useState("");
    const [EmailOTP, setEmailOTP] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [role, setRole] = useState("");
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState({}); // New state for validation errors
    const [dob, setDob] = useState("");

    //this is for Mobile and Email OTP
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [showEmailCodeInput, setShowEmailCodeInput] = useState(false);

    //this is for date of birth
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [days, setDays] = useState([]);

    // this is for Location country, state, and district
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [district, setDistrict] = useState(null);
    const [countries, setCountries] = useState([]);
    const [availableStates, setAvailableStates] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [gender, setGender] = useState(null); // New state for gender

    // timer for OTP resend
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

    const handleSendPhoneOTP = () => {
        setShowOTPInput(true);
        setPhoneTimer(60);
        // You can call your actual OTP sending logic here
    };

    const handleSendEmailOTP = () => {
        setShowEmailCodeInput(true);
        setEmailTimer(60);
        // You can call your actual OTP sending logic here
    };

    // Fetch countries on mount
    useEffect(() => {
        const countryData = Country.getAllCountries().map((c) => ({
            value: c.isoCode,
            label: c.name,
        }));
        setCountries(countryData);
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        if (country) {
            const stateData = State.getStatesOfCountry(country.value).map(
                (s) => ({
                    value: s.isoCode,
                    label: s.name,
                })
            );
            setAvailableStates(stateData);
            setState(null); // Reset state
            setDistrict(null); // Reset district
            setAvailableDistricts([]);
        } else {
            setAvailableStates([]);
            setState(null);
            setDistrict(null);
            setAvailableDistricts([]);
        }
    }, [country]);

    // Fetch districts (cities) when state changes
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
            setDistrict(null); // Reset district
        } else {
            setAvailableDistricts([]);
            setDistrict(null);
        }
    }, [state, country]);

    let fullDateOfBirth;

    const months = [
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },
        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },
        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    const years = Array.from({ length: 100 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { value: year, label: year };
    });

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

    // Function to calculate the number of days in the selected month and year
    const getDaysInMonth = (month, year) => {
        if (!month || !year) {
            return Array.from({ length: 31 }, (_, i) => ({
                value: (i + 1).toString().padStart(2, "0"),
                label: (i + 1).toString().padStart(2, "0"),
            }));
        }

        const monthIndex = months.findIndex((m) => m.value === month);
        const yearNum = parseInt(year);

        // For February, check if it's a leap year
        if (month === "02") {
            const isLeapYear =
                (yearNum % 4 === 0 && yearNum % 100 !== 0) ||
                yearNum % 400 === 0;
            return Array.from({ length: isLeapYear ? 29 : 28 }, (_, i) => ({
                value: (i + 1).toString().padStart(2, "0"),
                label: (i + 1).toString().padStart(2, "0"),
            }));
        }

        // Months with 30 days
        const thirtyDayMonths = ["04", "06", "09", "11"];
        if (thirtyDayMonths.includes(month)) {
            return Array.from({ length: 30 }, (_, i) => ({
                value: (i + 1).toString().padStart(2, "0"),
                label: (i + 1).toString().padStart(2, "0"),
            }));
        }

        // Months with 31 days
        return Array.from({ length: 31 }, (_, i) => ({
            value: (i + 1).toString().padStart(2, "0"),
            label: (i + 1).toString().padStart(2, "0"),
        }));
    };

    // Update days when month or year changes
    useEffect(() => {
        const newDays = getDaysInMonth(month?.value, year?.value);
        setDays(newDays);

        // Reset day if it's no longer valid
        if (day && parseInt(day.value) > newDays.length) {
            setDay(null);
        }
    }, [month, year, day]);

    // Handle changes
    const handleYearChange = (selectedOption) => {
        setYear(selectedOption);
        setMonth(null); // Reset month when year changes
        setDay(null); // Reset day when year changes
        setErrors((prev) => ({ ...prev, year: false }));
    };

    const handleMonthChange = (selectedOption) => {
        setMonth(selectedOption);
        setDay(null); // Reset day when month changes
        setErrors((prev) => ({ ...prev, month: false }));
    };

    const handleDayChange = (selectedOption) => {
        setDay(selectedOption);
        setErrors((prev) => ({ ...prev, day: false }));
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

    const phoneValidation = () => {
        if (phoneNumber.length !== 12) {
            toast("Invalid phone number!");
            setErrors((prev) => ({ ...prev, phoneNumber: true }));
            return false;
        }
        setErrors((prev) => ({ ...prev, phoneNumber: false }));
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
        console.log("Daye of birth:", dob);
        // console.log("Selected Year:", year.value);
        // fullDateOfBirth = `${year?.value}-${month?.value}-${day?.value}`;
        // console.log("Full Date of Birth:", fullDateOfBirth);
        const newErrors = {
            firstName: !firstName,
            lastName: !lastName,
            gender: !gender || gender.value === "",
            country: !country,
            state: !state,
            district: !district,
            role: !role,
            // phoneNumber: !phoneNumber,
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);

        if (hasErrors) {
            toast("Please fill all required fields!");
            return;
        }

        setStep(2);
    };

    const handleOnClickNextForSecondSection = () => {
        console.log(email);
        if (!phoneNumber || !email) {
            toast("Please Enter Phone Number and Email!");
            return;
        }
        if (!phoneValidation()) {
            return;
        }
        if (!PhoneOTP) {
            toast("Phone verification code is required!");
            return;
        }
        if (!EmailOTP) {
            toast("Email verification code is required!");
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

    // const checkPasswordStrength = (pass) => {
    //     if (passwordValidation(pass)) {
    //         setPasswordStrength("Strong Password");
    //     } else {
    //         setPasswordStrength("Weak Password");
    //     }
    // };

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
        if (PhoneOTP === "1234" && EmailOTP === "1234") {
            return true;
        } else {
            toast("Invalid Phone OTP!");
            return false;
        }
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
                phoneNumber,
                password,
                role,
                gender,
                dob,
                email,
                country,
                state,
                city: district,
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
                        <div className="flex gap-0 h-[80%] w-[65%] z-10 bg-white px-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-center">
                            <div className="flex flex-col h-full gap-2 w-[55%] px-5 py-5 rounded-lg justify-center">
                                {/* Texts */}
                                <div className="flex flex-col items-start">
                                    <p className="uppercase text-[#2B0242] opacity-[66%] font-medium">
                                        Register now
                                    </p>
                                    <h2 className="text-[48px] font-bold text-[#5E0194]">
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
                                <div className="flex flex-col w-full gap-2 mb-4">
                                    {/* Type of User */}
                                    <div className="text-left mb-2">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Who you are
                                        </label>
                                        <div className="flex gap-4">
                                            <label
                                                className={`flex items-center gap-2 ${
                                                    errors.role
                                                        ? "text-red-500"
                                                        : ""
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="Founder"
                                                    checked={role === "Founder"}
                                                    onChange={(e) => {
                                                        setRole(e.target.value);
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            role: false,
                                                        }));
                                                    }}
                                                    className="h-4 w-4 border-gray-300"
                                                />
                                                <span className="text-sm text-gray-600">
                                                    Discover Talent
                                                </span>
                                            </label>
                                            <label
                                                className={`flex items-center gap-2 ${
                                                    errors.role
                                                        ? "text-red-500"
                                                        : ""
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="GetDiscovered"
                                                    checked={role === "GetDiscovered"}
                                                    onChange={(e) => {
                                                        setRole(e.target.value);
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            role: false,
                                                        }));
                                                    }}
                                                    className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-300"
                                                />
                                                <span className="text-sm text-gray-600">
                                                    Getting Discovered
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        {/* First Name */}
                                        <div className="text-left w-full">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full h-10 px-2 border ${
                                                    errors.firstName
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                placeholder="Enter First Name"
                                                required
                                                value={firstName}
                                                onChange={(e) => {
                                                    setFirstName(
                                                        e.target.value
                                                    );
                                                    setErrors((prev) => ({
                                                        ...prev,
                                                        firstName: false,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        {/* Middle Name */}
                                        <div className="text-left w-full">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                placeholder="Enter Middle Name"
                                                value={middleName}
                                                onChange={(e) =>
                                                    setMiddleName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* Last Name */}
                                        <div className="text-left w-full">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full h-10 px-2 border ${
                                                    errors.lastName
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                                placeholder="Enter Last Name"
                                                value={lastName}
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                    setErrors((prev) => ({
                                                        ...prev,
                                                        lastName: false,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        {/* Date of Birth */}
                                        <div className="text-left">
                                            <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                value={dob}
                                                onChange={(e) => {
                                                    setDob(e.target.value);
                                                }}
                                                className={`w-full h-10 px-2 border ${
                                                    errors.firstName
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
                                            />
                                            {/* <div className="flex gap-3">
                                                <Select
                                                    className="w-1/4"
                                                    options={years}
                                                    value={year}
                                                    onChange={handleYearChange}
                                                    placeholder="Year"
                                                    styles={{
                                                        ...customStyles,
                                                        control: (provided) => ({
                                                            ...provided,
                                                            borderColor: errors.year ? '#EF4444' : '#D1D5DB',
                                                            borderRadius: '0.5rem',
                                                            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
                                                            '&:hover': {
                                                                borderColor: 'none',
                                                            },
                                                        }),
                                                    }}
                                                    isSearchable
                                                    aria-label="Select birth year"
                                                />
                                                <Select
                                                    className="w-1/3"
                                                    options={months}
                                                    value={month}
                                                    onChange={handleMonthChange}
                                                    placeholder="Month"
                                                    styles={{
                                                        ...customStyles,
                                                        control: (provided) => ({
                                                            ...provided,
                                                            borderColor: errors.month ? '#EF4444' : '#D1D5DB',
                                                            borderRadius: '0.5rem',
                                                            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
                                                            '&:hover': {
                                                                borderColor: 'none',
                                                            },
                                                        }),
                                                    }}
                                                    isDisabled={!year}
                                                    isSearchable
                                                    aria-label="Select birth month"
                                                />
                                                <Select
                                                    className="w-1/4"
                                                    options={days}
                                                    value={day}
                                                    onChange={handleDayChange}
                                                    placeholder="Day"
                                                    styles={{
                                                        ...customStyles,
                                                        control: (provided) => ({
                                                            ...provided,
                                                            borderColor: errors.day ? '#EF4444' : '#D1D5DB',
                                                            borderRadius: '0.5rem',
                                                            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
                                                            '&:hover': {
                                                                borderColor: 'none',
                                                            },
                                                        }),
                                                    }}
                                                    isDisabled={!year || !month}
                                                    isSearchable
                                                    aria-label="Select birth day"
                                                />
                                            </div> */}
                                        </div>
                                        {/* Gender */}
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
                                        </div>
                                    </div>
                                    {/* Location */}
                                    <div className="text-left w-full">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Location
                                        </label>
                                        <div className="flex gap-3">
                                            <Select
                                                className="w-1/3"
                                                options={countries}
                                                value={country}
                                                onChange={handleCountryChange}
                                                placeholder="Country"
                                                styles={{
                                                    ...customStyles,
                                                    control: (provided) => ({
                                                        ...provided,
                                                        borderColor:
                                                            errors.country
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
                                                isSearchable
                                                aria-label="Select country"
                                            />
                                            <Select
                                                className="w-1/3"
                                                options={availableStates}
                                                value={state}
                                                onChange={handleStateChange}
                                                placeholder="State"
                                                styles={{
                                                    ...customStyles,
                                                    control: (provided) => ({
                                                        ...provided,
                                                        borderColor:
                                                            errors.state
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
                                                isDisabled={!country}
                                                isSearchable
                                                aria-label="Select state"
                                            />
                                            <Select
                                                className="w-1/3"
                                                options={availableDistricts}
                                                value={district}
                                                onChange={handleDistrictChange}
                                                placeholder="District"
                                                styles={{
                                                    ...customStyles,
                                                    control: (provided) => ({
                                                        ...provided,
                                                        borderColor:
                                                            errors.district
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
                                                isDisabled={!country || !state}
                                                isSearchable
                                                aria-label="Select district"
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="text-left">
                                        <label className="block font-medium mb-1 text-black opacity-[73%]">
                                            Phone number
                                        </label>
                                        <PhoneInput
                                            country={"in"}
                                            value={phoneNumber}
                                            onChange={(phone) => {
                                                setPhoneNumber(phone);
                                                setErrors((prev) => ({ ...prev, phoneNumber: false }));
                                            }}
                                            containerClass="w-full"
                                            inputClass={`w-full h-12 px-4 text-gray-900 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
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
                                    </div> */}
                                </div>
                                <button
                                    onClick={handleOnClickNextForFirstSection}
                                    className="bg-[#5E0194] text-white w-[50%] p-3 rounded-lg shadow-md hover:bg-violet-800 mx-auto transition-all duration-300"
                                >
                                    Next
                                </button>
                            </div>
                            {/* Image Section */}
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
                        {/* Background Divs */}
                        <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
                            <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate Ame-y-1/2 z-0"></div>
                            <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        </div>
                        <div className="flex gap-10 h-[75%] w-[60%] z-10 bg-white px-8 rounded-4xl shadow-lg shadow-[#5C058E] text-center text-sm items-center justify-center">
                            {/* Image */}
                            <div className="h-full w-[40%] flex justify-center items-center">
                                <img
                                    src="./image1.svg"
                                    alt=""
                                    className="h-full"
                                />
                            </div>
                            <div className="flex flex-col h-full gap-4 w-[60%] py-10 rounded-lg">
                                {/* Texts */}
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
                                <div className="flex flex-col">
                                    {/* phone number */}
                                    <div className="flex gap-4 w-full mb-2 items-end">
                                        <div className="flex items-end gap-2 w-full">
                                            <div className="text-left w-[60%]">
                                                <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                    Phone
                                                </label>
                                                <PhoneInput
                                                    country={"in"}
                                                    value={phoneNumber}
                                                    onChange={setPhoneNumber}
                                                    containerClass="w-full"
                                                    inputClass="w-full h-10 px-4 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
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
                                                className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                placeholder="Enter Code"
                                                value={PhoneOTP}
                                                onChange={(e) =>
                                                    setPhoneOTP(e.target.value)
                                                }
                                            />
                                        </div>
                                    )}
                                    {/* Email */}
                                    <div className="flex gap-4 w-full mb-2 items-end">
                                        <div className="flex items-end gap-2 w-full">
                                            <div className="text-left w-[60%]">
                                                <label className="block font-medium mb-1 text-black opacity-[73%]">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                    placeholder="Enter Email Address"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
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
                                                className="w-full h-10 px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                placeholder="Enter Code"
                                                value={EmailOTP}
                                                onChange={(e) =>
                                                    setEmailOTP(e.target.value)
                                                }
                                            />
                                        </div>
                                    )}
                                    {/* <p className="text-[#786D7F] opacity-[86%] text-sm">
                                        Haven't received your code?{" "}
                                        <button
                                            className="text-[#A100FF] font-medium underline disabled:text-gray-400"
                                            disabled={resendTimer > 0}
                                        >
                                            Send the code again (
                                            {resendTimer > 0 ? `00:${resendTimer}` : "Resend"}
                                            )
                                        </button>
                                    </p> */}
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
                        {/* Background Divs */}
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
                                    {/* Password Section */}
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
                                            className="w-full h-10 px-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
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
                                    </div>
                                    {/* Re-enter password section */}
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
                                            className="w-full h-10 px-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                                            placeholder="Re-Enter Password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
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
