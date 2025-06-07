import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import "react-phone-input-2/lib/style.css";

const AccountSettings = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [emailOTP, setEmailOTP] = useState("");
  const [showEmailOTPInput, setShowEmailOTPInput] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [nameRegex] = useState(/^[A-Za-z\s\-]*$/);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [originalEmail, setOriginalEmail] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fetch countries
  useEffect(() => {
    const countryData = Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }));
    setCountries(countryData);
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (formData.country && !isInitialLoad) {
      const stateData = State.getStatesOfCountry(formData.country).map((s) => ({
        value: s.isoCode,
        label: s.name,
      }));
      setAvailableStates(stateData);
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
      setAvailableCities([]);
    }
  }, [formData.country, isInitialLoad]);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.state && formData.country && !isInitialLoad) {
      const cityData = City.getCitiesOfState(formData.country, formData.state).map((d) => ({
        value: d.name,
        label: d.name,
      }));
      setAvailableCities(cityData);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.state, formData.country, isInitialLoad]);
  // This ensures states and cities are restored on modal reopen
  useEffect(() => {
    if (!loading && !isInitialLoad) {
      if (formData.country) {
        const stateData = State.getStatesOfCountry(formData.country).map((s) => ({
          value: s.isoCode,
          label: s.name,
        }));
        setAvailableStates(stateData);
      }
      if (formData.country && formData.state) {
        const cityData = City.getCitiesOfState(formData.country, formData.state).map((d) => ({
          value: d.name,
          label: d.name,
        }));
        setAvailableCities(cityData);
      }
    }
  }, [loading, isInitialLoad, formData.country, formData.state]);
  useEffect(() => {
    return () => {
      setAvailableStates([]);
      setAvailableCities([]);
      setIsInitialLoad(true); // Set back to true if you want a clean open
    };
  }, [onClose]);


  // Fetch user data from API to pre-fill form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/edit-profile/get-profile-data", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const d = await response.json();
        const data = d.data;
        console.log("Backend Data:", data);

        // Find country ISO code
        const country = data.country
          ? Country.getAllCountries().find((c) => c.name.toLowerCase() === data.country.toLowerCase().trim())?.isoCode || ""
          : "";

        let state = "";
        let city = "";
        let stateData = [];
        let cityData = [];

        if (country) {
          stateData = State.getStatesOfCountry(country).map((s) => ({
            value: s.isoCode,
            label: s.name,
          }));
          setAvailableStates(stateData);
          state = data.state
            ? stateData.find((s) => s.label.toLowerCase() === data.state.toLowerCase().trim())?.value || ""
            : "";

          if (state && country) {
            cityData = City.getCitiesOfState(country, state).map((d) => ({
              value: d.name,
              label: d.name,
            }));
            setAvailableCities(cityData);
            city = data.city
              ? cityData.find((c) => c.label.toLowerCase() === data.city.toLowerCase().trim())?.value || ""
              : "";
          }
        }

        setFormData({
          firstName: data.firstName || "",
          middleName: data.middleName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          country,
          state,
          city,
        });
        setOriginalEmail(data.email || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };
    fetchUserData();
  }, []);

  // Timer for OTP resend
  useEffect(() => {
    if (emailTimer > 0) {
      const timer = setInterval(() => {
        setEmailTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [emailTimer]);

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email" && value !== originalEmail) {
      setIsEmailVerified(false);
    }
    if (name !== "email") {
      setErrors((prev) => ({ ...prev, [name]: validateName(value, name) }));
    }
  };

  // Handle country change
  const handleCountryChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, country: value }));
    setErrors((prev) => ({ ...prev, country: "" }));
  };

  // Handle state change
  const handleStateChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, state: value }));
    setErrors((prev) => ({ ...prev, state: "" }));
  };

  // Handle city change
  const handleCityChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, city: value }));
    setErrors((prev) => ({ ...prev, city: "" }));
  };

  // Send OTP for email verification
  const handleSendEmailOTP = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    setIsSendingOTP(true);
    try {
      const response = await fetch("http://localhost:3333/api/otp/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("OTP sent successfully!");
        setShowEmailOTPInput(true);
        setEmailTimer(60);
        setIsEmailVerified(false);
      } else {
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSendingOTP(false);
    }
  };

  // Verify OTP
  const handleVerifyEmailOTP = async (e) => {
    e.preventDefault();
    if (!emailOTP) {
      setErrors((prev) => ({ ...prev, emailOTP: "OTP is required" }));
      return;
    }
    try {
      const response = await fetch("http://localhost:3333/api/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: emailOTP }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Email verified successfully!");
        setIsEmailVerified(true);
        setShowEmailOTPInput(false);
      } else {
        setErrors((prev) => ({ ...prev, emailOTP: "Invalid OTP" }));
        toast.error("Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleEmailOTPChange = (e) => {
    setEmailOTP(e.target.value);
    setErrors((prev) => ({ ...prev, emailOTP: "" }));
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {
      firstName: validateName(formData.firstName, "firstName"),
      middleName: validateName(formData.middleName, "middleName"),
      lastName: validateName(formData.lastName, "lastName"),
      email: !formData.email ? "Email is required" : "",
      country: !formData.country ? "Country is required" : "",
      state: !formData.state ? "State is required" : "",
      city: !formData.city ? "City is required" : "",
    };

    if (formData.email !== originalEmail && !isEmailVerified) {
      newErrors.email = "Please verify your email";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const countryName = countries.find((c) => c.value === formData.country)?.label || formData.country;
      const stateName = availableStates.find((s) => s.value === formData.state)?.label || formData.state;
      const cityName = formData.city;
      const response = await fetch("http://localhost:3333/api/edit-profile/", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          email: formData.email,
          country: countryName,
          state: stateName,
          city: cityName,
        }),
      });
      if (!response.ok) throw new Error("Failed to update settings");
      localStorage.setItem("firstName", formData.firstName);
      localStorage.setItem("lastName", formData.lastName);
      localStorage.setItem("middleName", formData.middleName);
      toast.success("Settings updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="relative p-4 sm:p-6 poppins-medium rounded-4xl">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        <FaTimes className="w-5 h-5" />
      </button>
      <h2 className="text-xl sm:text-2xl font-semibold text-[#A100FF] mb-4">
        Account Settings
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-4xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-[#A100FF]">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF]`}
            placeholder="First name"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.middleName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF]`}
            placeholder="Middle name"
          />
          {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-[#A100FF]">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full text-sm px-4 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF]`}
            placeholder="Last name"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-[#A100FF]">*</span>
          </label>
          <div className="flex gap-4 items-end">
            <div className="w-[70%]">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF]`}
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            {formData.email !== originalEmail && formData.email && (
              <button
                type="button"
                onClick={handleSendEmailOTP}
                disabled={emailTimer > 0 || isSendingOTP}
                className="bg-[#A100FF] text-white w-24 h-10 px-2 py-1 text-xs rounded-lg shadow-md hover:bg-[#8E00E6] transition-all duration-300 disabled:opacity-85 flex items-center justify-center"
              >
                {isSendingOTP ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : emailTimer > 0 ? (
                  `Resending OTP (${emailTimer}s)`
                ) : (
                  "Send OTP"
                )}
              </button>
            )}
          </div>
          {showEmailOTPInput && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Verification Code
              </label>
              <div className="flex gap-4 items-end">
                <div className="w-[70%]">
                  <input
                    type="text"
                    value={emailOTP}
                    onChange={handleEmailOTPChange}
                    className={`w-full px-4 py-2 border ${
                      errors.emailOTP ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF]`}
                    placeholder="Enter OTP"
                  />
                  {errors.emailOTP && (
                    <p className="text-red-500 text-xs mt-1">{errors.emailOTP}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleVerifyEmailOTP}
                  className="bg-[#A100FF] text-white w-24 h-10 px-2 py-1 text-xs rounded-lg shadow-md hover:bg-[#8E00E6] transition-all duration-300"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country <span className="text-[#A100FF]">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className={`w-full px-4 py-2 border ${errors.country ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF]`}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State <span className="text-[#A100FF]">*</span>
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            className={`w-full px-4 py-2 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF]`}
            disabled={!formData.country}
          >
            <option value="">Select state</option>
            {availableStates.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City <span className="text-[#A100FF]">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleCityChange}
            className={`w-full px-4 py-2 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF]`}
            disabled={!formData.state}
          >
            <option value="">Select city</option>
            {availableCities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
        <div className="col-span-2 flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#A100FF] text-white rounded-lg hover:bg-[#8E00E6] transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;