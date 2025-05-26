import React, { useState, useEffect } from 'react';

function DiscoverMeForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    pronouns: '',
    headline: '',
    email: '',
    mobile: '',
    contactMethods: {
      WhatsApp: { selected: false, value: '' },
      LinkedIn: { selected: false, value: '' },
      Twitter: { selected: false, value: '' },
      Discord: { selected: false, value: '' },
      Instagram: { selected: false, value: '' },
    },
    category: '',
    skills: [],
    resumeLink: '',
    experiences: [],
    projects: [],
    portfolioLink: '',
    customLinks: [],
    achievementsAndAbout: '',
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://62.72.13.232:3333/api/category/get-all-categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        const sortedCategories = (data.categories || []).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch skills when category changes and reset skills
  useEffect(() => {
    setFormData((prev) => ({ ...prev, skills: [] }));
    setSearchText('');
    setShowSuggestions(false);

    const fetchSkills = async () => {
      if (formData.category) {
        try {
          const response = await fetch(
            `http://62.72.13.232:3333/api/skills/?categoryId=${formData.category}`
          );
          if (!response.ok) throw new Error('Failed to fetch skills');
          const data = await response.json();
          const skillsArray = Array.isArray(data.skills)
            ? data.skills
            : data.skills
            ? [data.skills]
            : [];
          setSkills(skillsArray);
          setFilteredSkills(skillsArray);
        } catch (error) {
          console.error('Error fetching skills:', error);
          setSkills([]);
          setFilteredSkills([]);
        }
      } else {
        setSkills([]);
        setFilteredSkills([]);
      }
    };
    fetchSkills();
  }, [formData.category]);

  // Filter skills based on search input
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(
        skills.filter((skill) =>
          skill.name?.toLowerCase().startsWith(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, skills]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleContactMethodChange = (method) => {
    setFormData((prev) => ({
      ...prev,
      contactMethods: {
        ...prev.contactMethods,
        [method]: {
          ...prev.contactMethods[method],
          selected: !prev.contactMethods[method].selected,
          value: prev.contactMethods[method].selected ? '' : prev.contactMethods[method].value,
        },
      },
    }));
    setErrors((prev) => ({ ...prev, contactMethods: '' }));
  };

  const handleContactValueChange = (method, value) => {
    setFormData((prev) => ({
      ...prev,
      contactMethods: {
        ...prev.contactMethods,
        [method]: {
          ...prev.contactMethods[method],
          value,
        },
      },
    }));
    setErrors((prev) => ({ ...prev, [`${method}Value`]: '' }));
  };

  const handleSkillInput = (e) => {
    setSearchText(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSkillSelect = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.some((s) => s._id === skill._id)
        ? prev.skills
        : [...prev.skills, skill],
    }));
    setSearchText('');
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, skills: '' }));
  };

  const handleSkillRemove = (skillId) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s._id !== skillId),
    }));
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { companyName: '', description: '' }],
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedExperiences = [...prev.experiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
      return { ...prev, experiences: updatedExperiences };
    });
  };

  const handleRemoveExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { description: '', link: '' }],
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      return { ...prev, projects: updatedProjects };
    });
  };

  const handleRemoveProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleAddCustomLink = () => {
    setFormData((prev) => ({
      ...prev,
      customLinks: [...prev.customLinks, { websiteName: '', link: '' }],
    }));
  };

  const handleCustomLinkChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedLinks = [...prev.customLinks];
      updatedLinks[index] = { ...updatedLinks[index], [field]: value };
      return { ...prev, customLinks: updatedLinks };
    });
  };

  const handleRemoveCustomLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      customLinks: prev.customLinks.filter((_, i) => i !== index),
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.pronouns) newErrors.pronouns = 'Pronouns are required';
    if (!formData.headline.trim()) newErrors.headline = 'Headline is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    const anyContactSelected = Object.values(formData.contactMethods).some(
      (method) => method.selected
    );
    if (!anyContactSelected) {
      newErrors.contactMethods = 'Please select at least one contact method';
    }

    Object.entries(formData.contactMethods).forEach(([method, { selected, value }]) => {
      if (selected && !value.trim()) {
        newErrors[`${method}Value`] = `Please provide your ${method} ${method === 'WhatsApp' ? 'number' : 'URL'}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!formData.resumeLink.trim()) newErrors.resumeLink = 'Resume link is required';
    else if (!/^https:\/\/drive\.google\.com/.test(formData.resumeLink))
      newErrors.resumeLink = 'Please provide a valid Google Drive link';

    formData.experiences.forEach((exp, index) => {
      if (!exp.companyName.trim()) {
        newErrors[`experienceCompanyName${index}`] = 'Company Name is required';
      }
      if (!exp.description.trim()) {
        newErrors[`experienceDescription${index}`] = 'Description is required';
      }
    });

    formData.projects.forEach((proj, index) => {
      if (!proj.description.trim()) {
        newErrors[`projectDescription${index}`] = 'Project Description is required';
      }
      if (!proj.link.trim()) {
        newErrors[`projectLink${index}`] = 'Project Link is required';
      } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(proj.link)) {
        newErrors[`projectLink${index}`] = 'Please provide a valid URL';
      }
    });

    formData.customLinks.forEach((link, index) => {
      if (!link.websiteName.trim()) {
        newErrors[`customLinkWebsite${index}`] = 'Website Name is required';
      }
      if (!link.link.trim()) {
        newErrors[`customLinkUrl${index}`] = 'Link is required';
      } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(link.link)) {
        newErrors[`customLinkUrl${index}`] = 'Please provide a valid URL';
      }
    });

    if (formData.portfolioLink.trim() && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioLink)) {
      newErrors.portfolioLink = 'Please provide a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      try {
        const response = await fetch(`http://62.72.13.232:3333/api/discover-me`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: 'include',
        });
        if (response.ok) {
          console.log('Form submitted:', formData);
          onClose();
        } else {
          console.error('Submission failed');
          setErrors({ submit: 'Failed to submit the form. Please try again.' });
        }
      } catch (err) {
        console.error('Submission error:', err);
        setErrors({ submit: 'An error occurred. Please try again.' });
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      pronouns: '',
      headline: '',
      email: '',
      mobile: '',
      contactMethods: {
        WhatsApp: { selected: false, value: '' },
        LinkedIn: { selected: false, value: '' },
        Twitter: { selected: false, value: '' },
        Discord: { selected: false, value: '' },
        Instagram: { selected: false, value: '' },
      },
      category: '',
      skills: [],
      resumeLink: '',
      experiences: [],
      projects: [],
      portfolioLink: '',
      customLinks: [],
      achievementsAndAbout: '',
    });
    setStep(1);
    setErrors({});
    onClose();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-6 text-center">
        Get Discovered
      </h2>

      {/* Step 1 */}
      {step === 1 && (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your first name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div className="relative">
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your middle name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your last name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div className="relative">
            <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 mb-1">
              Pronouns <span className="text-red-500">*</span>
            </label>
            <select
              id="pronouns"
              name="pronouns"
              value={formData.pronouns}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.pronouns ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Pronouns</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
              <option value="Other">Other</option>
            </select>
            {errors.pronouns && <p className="text-red-500 text-sm mt-1">{errors.pronouns}</p>}
          </div>

          <div className="relative col-span-2">
            <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
              Headline (max 80 characters) <span className="text-red-500">*</span>
            </label>
            <input
              id="headline"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              maxLength={80}
              placeholder="Enter a catchy headline"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.headline ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.headline && <p className="text-red-500 text-sm mt-1">{errors.headline}</p>}
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
            />
          </div>

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How do you want to get connected? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['WhatsApp', 'LinkedIn', 'Twitter', 'Discord', 'Instagram'].map((method) => (
                <div key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    id={method}
                    checked={formData.contactMethods[method].selected}
                    onChange={() => handleContactMethodChange(method)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={method} className="ml-2 text-gray-700">{method}</label>
                </div>
              ))}
            </div>
            {errors.contactMethods && (
              <p className="text-red-500 text-sm mt-1">{errors.contactMethods}</p>
            )}

            <div className="mt-4 space-y-4">
              {Object.entries(formData.contactMethods).map(([method, { selected, value }]) => (
                selected && (
                  <div key={method} className="relative">
                    <label
                      htmlFor={`${method}Value`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {method} {method === 'WhatsApp' ? 'Number' : 'URL'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${method}Value`}
                      type={method === 'WhatsApp' ? 'tel' : 'url'}
                      value={value}
                      onChange={(e) => handleContactValueChange(method, e.target.value)}
                      placeholder={`Enter your ${method} ${method === 'WhatsApp' ? 'number' : 'URL'}`}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                        errors[`${method}Value`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`${method}Value`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`${method}Value`]}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="col-span-2 flex justify-between space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Next Step
            </button>
          </div>
        </form>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category of Skills */}
          <div className="relative col-span-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category of Skills <span className="text-red-500">*</span>
            </label>
            {loadingCategories ? (
              <p className="text-gray-500">Loading categories...</p>
            ) : (
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Skills */}
          {formData.category && (
            <div className="relative col-span-2">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Skills <span className="text-red-500">*</span>
              </label>
              <input
                id="skills"
                name="skillsInput"
                value={searchText}
                onChange={handleSkillInput}
                placeholder="Type to search skills"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
              />
              {showSuggestions && filteredSkills.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-auto shadow-lg">
                  {filteredSkills
                    .filter((skill) => !formData.skills.some((s) => s._id === skill._id))
                    .map((skill) => (
                      <li
                        key={skill._id}
                        onClick={() => handleSkillSelect(skill)}
                        className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition-all duration-200"
                      >
                        {skill.name}
                      </li>
                    ))}
                </ul>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill._id}
                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {skill.name}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill._id)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>
          )}

          {/* Resume Link */}
          <div className="relative col-span-2">
            <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-1">
              Resume Link (Google Drive) <span className="text-red-500">*</span>
            </label>
            <input
              id="resumeLink"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              type="url"
              placeholder="Enter your resume Google Drive link"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.resumeLink ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.resumeLink && <p className="text-red-500 text-sm mt-1">{errors.resumeLink}</p>}
          </div>
          {/* Portfolio Link */}
          <div className="relative col-span-2">
            <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio Link (Optional)
            </label>
            <input
              id="portfolioLink"
              name="portfolioLink"
              value={formData.portfolioLink}
              onChange={handleChange}
              type="url"
              placeholder="Enter your portfolio link"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.portfolioLink ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.portfolioLink && <p className="text-red-500 text-sm mt-1">{errors.portfolioLink}</p>}
          </div>

          {/* Experience */}
          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (Optional)
            </label>
            <button
              type="button"
              onClick={handleAddExperience}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
            >
              Add Experience
            </button>
            <div className="mt-4 space-y-4">
              {formData.experiences.map((exp, index) => (
                <div key={index} className="border p-4 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="absolute top-2 right-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`experienceCompanyName${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`experienceCompanyName${index}`}
                        value={exp.companyName}
                        onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                        type="text"
                        placeholder="Enter company name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                          errors[`experienceCompanyName${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[`experienceCompanyName${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`experienceCompanyName${index}`]}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`experienceDescription${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id={`experienceDescription${index}`}
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        placeholder="Describe your role and responsibilities"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                          errors[`experienceDescription${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[`experienceDescription${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`experienceDescription${index}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Projects (Optional)
            </label>
            <button
              type="button"
              onClick={handleAddProject}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
            >
              Add Project
            </button>
            <div className="mt-4 space-y-4">
              {formData.projects.map((proj, index) => (
                <div key={index} className="border p-4 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="absolute top-2 right-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`projectDescription${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Project Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id={`projectDescription${index}`}
                        value={proj.description}
                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                        placeholder="Describe your project"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                          errors[`projectDescription${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[`projectDescription${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`projectDescription${index}`]}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`projectLink${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Project Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`projectLink${index}`}
                        value={proj.link}
                        onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                        type="url"
                        placeholder="Enter project link"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                          errors[`projectLink${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[`projectLink${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`projectLink${index}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          

          {/* Add More Links */}
          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add More Links (Optional)
            </label>
            <button
              type="button"
              onClick={handleAddCustomLink}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
            >
              Add Link
            </button>
            <div className="mt-4 space-y-4">
              {formData.customLinks.map((link, index) => (
                <div key={index} className="border p-4 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomLink(index)}
                    className="absolute top-2 right-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`customLinkWebsite${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Website Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`customLinkWebsite${index}`}
                        value={link.websiteName}
                        onChange={(e) => handleCustomLinkChange(index, 'websiteName', e.target.value)}
                        type="text"
                        placeholder="Enter website name (e.g., GitHub)"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                          errors[`customLinkWebsite${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[`customLinkWebsite${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`customLinkWebsite${index}`]}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`customLinkUrl${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`customLinkUrl${index}`}
                        value={link.link}
                        onChange={(e) => handleCustomLinkChange(index, 'link', e.target.value)}
                        type="url"
                        placeholder="Enter link"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                          errors[`customLinkUrl${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[`customLinkUrl${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`customLinkUrl${index}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements and About Yourself */}
          <div className="relative col-span-2">
            <label
              htmlFor="achievementsAndAbout"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Achievements and About Yourself (Optional, max 500 characters)
            </label>
            <textarea
              id="achievementsAndAbout"
              name="achievementsAndAbout"
              value={formData.achievementsAndAbout}
              onChange={handleChange}
              maxLength={500}
              placeholder="Share your achievements and a bit more about yourself"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px]"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="col-span-2 flex justify-between space-x-4 mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Back
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
      {errors.submit && (
        <p className="text-red-500 text-sm mt-4 text-center">{errors.submit}</p>
      )}
    </div>
  );
}

export default DiscoverMeForm;