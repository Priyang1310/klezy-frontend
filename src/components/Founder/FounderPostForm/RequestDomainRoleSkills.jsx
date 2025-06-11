import React, { useState } from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import createPortal from "react-dom"
function RequestDomainRoleSkills({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    domain: "",
    role: "",
    skills: [""], // Initialize with one empty skill input
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

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
    setErrors((prev) => ({
      ...prev,
      skills: "",
      submit: "",
    }));
  };

  const handleAddSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const handleRemoveSkill = (index) => {
    if (formData.skills.length > 1) {
      const updatedSkills = formData.skills.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        skills: updatedSkills,
      }));
      setErrors((prev) => ({
        ...prev,
        skills: "",
        submit: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.domain.trim()) newErrors.domain = "Domain is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    // Check if there is at least one non-empty skill
    const nonEmptySkills = formData.skills.filter((skill) => skill.trim());
    if (nonEmptySkills.length === 0) newErrors.skills = "At least one skill is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const cleanedData = {
        domain: formData.domain.trim(),
        role: formData.role.trim(),
        skills: formData.skills.map((skill) => skill.trim()).filter((skill) => skill),
      };
      console.log(cleanedData)
      const response = await fetch("http://localhost:3333/api/request/domain-role-skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Equivalent to withCredentials: true in axios
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) { // Checks for status codes 200-299
        onSubmit(cleanedData); // Notify parent component with cleaned data
        setFormData({ domain: "", role: "", skills: [""] }); // Reset form
        onClose(); // Close modal on successful submission
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
    
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl p-6 w-full sm:max-w-md relative shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          title="Close"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold text-[#7900BF] mb-4">
          Request Domain, Role, or Skill
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Skills Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills <span className="text-red-500">*</span>
            </label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder={`Enter skill ${index + 1} (e.g., React.js)`}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.skills ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove Skill"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
            <button
              type="button"
              onClick={handleAddSkill}
              className="flex items-center text-purple-600 hover:text-purple-800 mt-2 text-sm font-medium"
            >
              <FaPlus className="w-4 h-4 mr-1" /> Add Skill
            </button>
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
              type="submit"
              disabled={isSubmitting}
              className={`bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestDomainRoleSkills;