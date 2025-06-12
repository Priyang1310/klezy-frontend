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
    if (formData.country) {
      const stateData = State.getStatesOfCountry(formData.country).map((s) => ({
        value: s.isoCode,
        label: s.name,
      }));
      setAvailableStates(stateData);
      // Only reset state and city if they are no longer valid
      const isValidState = stateData.some((s) => s.value === formData.state);
      setFormData((prev) => ({
        ...prev,
        state: isValidState ? prev.state : "",
        city: isValidState ? prev.city : "",
      }));
      if (!isValidState) {
        setAvailableCities([]);
      }
    } else {
      setAvailableStates([]);
      setAvailableCities([]);
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
    }
  }, [formData.country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.country && formData.state) {
      const cityData = City.getCitiesOfState(formData.country, formData.state).map((d) => ({
        value: d.name,
        label: d.name,
      }));
      setAvailableCities(cityData);
      // Only reset city if it is no longer valid
      const isValidCity = cityData.some((c) => c.value === formData.city);
      setFormData((prev) => ({
        ...prev,
        city: isValidCity ? prev.city : "",
      }));
    } else {
      setAvailableCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.country, formData.state]);

  // Cleanup on modal close
  useEffect(() => {
    return () => {
      setAvailableStates([]);
      setAvailableCities([]);
    };
  }, [onClose]);

  // Fetch user data from API to pre-fill form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3333/api/edit-profile/get-profile-data", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const d = await response.json();
        const data = d.data;
        console.log("Backend Data:", data);

        const countryObj = Country.getAllCountries().find(
          (c) => c.name.toLowerCase().trim() === data.country?.toLowerCase().trim()
        );
        const country = countryObj?.isoCode || "";

        let state = "";
        let city = "";

        // Populate states if country is valid
        if (country) {
          const stateData = State.getStatesOfCountry(country).map((s) => ({
            value: s.isoCode,
            label: s.name,
          }));
          setAvailableStates(stateData);

          const stateObj = stateData.find(
            (s) => s.label.toLowerCase().trim() === data.state?.toLowerCase().trim()
          );
          state = stateObj?.value || "";

          // Populate cities if state is valid
          if (state) {
            const cityData = City.getCitiesOfState(country, state).map((c) => ({
              value: c.name,
              label: c.name,
            }));
            setAvailableCities(cityData);

            const cityObj = cityData.find(
              (c) => c.label.toLowerCase().trim() === data.city?.toLowerCase().trim()
            );
            city = cityObj?.value || "";
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

  // Handle feed submission
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
    return (
      <div className="flex items-center justify-center p-8 md:p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A100FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#A100FF] poppins-medium">
          Account Settings
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 md:mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                First Name <span className="text-[#A100FF]">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF] text-sm md:text-base`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.middleName ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF] text-sm md:text-base`}
                placeholder="Enter your middle name"
              />
              {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>}
            </div>

            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name <span className="text-[#A100FF]">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF] text-sm md:text-base`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-blue-50 rounded-2xl p-4 md:p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 md:mb-6">Email Settings</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-[#A100FF]">*</span>
              </label>
              <div className="flex flex-col lg:flex-row gap-3 lg:items-start">
                <div className="flex-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF] text-sm md:text-base`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                {formData.email !== originalEmail && formData.email && (
                  <button
                    type="button"
                    onClick={handleSendEmailOTP}
                    disabled={emailTimer > 0 || isSendingOTP}
                    className="bg-[#A100FF] text-white px-4 py-3 text-sm rounded-xl shadow-md hover:bg-[#8E00E6] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap min-w-fit"
                  >
                    {isSendingOTP ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : emailTimer > 0 ? (
                      `Resend (${emailTimer}s)`
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                )}
              </div>
            </div>

            {showEmailOTPInput && (
              <div className="space-y-3 bg-white rounded-xl p-4 border border-blue-200">
                <label className="block text-sm font-medium text-gray-700">
                  Email Verification Code
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={emailOTP}
                      onChange={handleEmailOTPChange}
                      className={`w-full px-4 py-3 border ${
                        errors.emailOTP ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF] text-sm md:text-base`}
                      placeholder="Enter the 6-digit code"
                    />
                    {errors.emailOTP && <p className="text-red-500 text-xs mt-1">{errors.emailOTP}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyEmailOTP}
                    className="bg-green-600 text-white px-6 py-3 text-sm rounded-xl shadow-md hover:bg-green-700 transition-all duration-300 whitespace-nowrap"
                  >
                    Verify Code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-green-50 rounded-2xl p-4 md:p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 md:mb-6">Location Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Country <span className="text-[#A100FF]">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                className={`w-full px-4 py-3 border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF] text-sm md:text-base bg-white`}
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                State <span className="text-[#A100FF]">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleStateChange}
                className={`w-full px-4 py-3 border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF] text-sm md:text-base bg-white disabled:bg-gray-100 disabled:cursor-not-allowed`}
                disabled={!formData.country}
              >
                <option value="">Select your state</option>
                {availableStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>

            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                City <span className="text-[#A100FF]">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleCityChange}
                className={`w-full px-4 py-3 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-[#A100FF] focus:border-[#A100FF] transition-all hover:border-[#A100FF] text-sm md:text-base bg-white disabled:bg-gray-100 disabled:cursor-not-allowed`}
                disabled={!formData.state}
              >
                <option value="">Select your city</option>
                {availableCities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium text-sm md:text-base order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#A100FF] text-white rounded-xl hover:bg-[#8E00E6] transition-all duration-200 font-medium text-sm md:text-base shadow-lg hover:shadow-xl order-1 sm:order-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;