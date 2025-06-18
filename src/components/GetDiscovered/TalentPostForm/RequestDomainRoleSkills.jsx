import React, { useState } from "react";
import { X, Plus } from "lucide-react";

// Simple React Select-like component for adding skills
const SkillsSelect = ({ skills, onChange, error }) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (!skills.includes(newSkill)) {
        onChange([...skills, newSkill]);
      }
      setInputValue("");
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      // Remove last skill when backspace is pressed on empty input
      onChange(skills.slice(0, -1));
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="w-full">
      <div className={`min-h-[48px] w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
        error ? "border-red-500" : "border-gray-300"
      } ${isInputFocused ? "ring-2 ring-purple-500 border-purple-500" : ""}`}>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Skill Tags */}
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm font-medium"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-purple-600 hover:text-purple-800 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          
          {/* Input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add another skill..."}
            className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
          />
        </div>
      </div>
      
      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-1">
        Type a skill and press Enter to add it. Press Backspace to remove the last skill.
      </p>
    </div>
  );
};

function RequestDomainRoleSkills({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    domain: "",
    role: "",
    skills: [], // Initialize with empty array for React Select
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "", // Clear submission error on input change
    }));
  };

  const handleSkillsChange = (newSkills) => {
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
    setErrors((prev) => ({
      ...prev,
      skills: "",
      submit: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.domain.trim()) newErrors.domain = "Domain is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (formData.skills.length === 0) newErrors.skills = "At least one skill is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const cleanedData = {
  domainName: formData.domain.trim(),
  roleName: formData.role.trim(),
  skills: formData.skills.filter((skill) => skill.trim()),
};
      console.log(cleanedData);
      
      const response = await fetch("http://localhost:3333/api/drs/add-domain-role-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        onSubmit(cleanedData);
        setFormData({ domain: "", role: "", skills: [] });
        onClose();
      } else {
        setErrors({ submit: "Failed to submit request. Please try again." });
      }
    } catch (err) {
      console.error("API error:", err);
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-black/50  flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl p-6 w-full sm:max-w-md relative shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold text-[#7900BF] mb-4">
          Request Domain, Role, or Skill
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {/* Domain Input */}
          <div>
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Domain <span className="text-red-500">*</span>
            </label>
            <input
              id="domain"
              name="domain"
              type="text"
              value={formData.domain}
              onChange={handleChange}
              placeholder="Enter domain (e.g., Software Development)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.domain ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.domain && (
              <p className="text-red-500 text-sm mt-1">{errors.domain}</p>
            )}
          </div>

          {/* Role Input */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role <span className="text-red-500">*</span>
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter role (e.g., Frontend Developer)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Skills Input with React Select-like functionality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills <span className="text-red-500">*</span>
            </label>
            <SkillsSelect
              skills={formData.skills}
              onChange={handleSkillsChange}
              error={errors.skills}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
          </div>

          {/* Submission Error */}
          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}

          {/* Form Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDomainRoleSkills;