import React, { useState, useEffect } from 'react';

function FounderPostForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    pronouns: '',
    headline: '',
    occupation: '',
    aboutYourself: '',
    companyName: '',
    aboutCompany: '',
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
    experienceType: 'Fresher',
    experienceYears: '',
    experienceMonths: '',
    experienceDays: '',
    workMode: '',
    workLocation: '',
    workType: '',
    equityPercentage: '', // For Partnership
    // Contract Basis
    contractDuration: { years: '', months: '', days: '' },
    scopeOfWork: '',
    // Project Basis
    projectDescription: '',
    projectTimeline: { years: '', months: '', days: '' },
    projectPaymentAmount: '',
    // Internship
    internshipType: '',
    internshipMonths: '',
    internshipPayment: 'Paid',
    internshipPaymentAmount: '',
    // Job
    jobType: '',
    jobPayment: 'Paid',
    jobPaymentAmount: '',
    // Freelance
    freelancePaymentRange: '',
    aboutWork: '',
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
        const response = await fetch(`${process.env.API_URL}/category/get-all-categories`);
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
            `${process.env.API_URL}/skills/?categoryId=${formData.category}`
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

  const handleNestedChange = (field, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
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

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.pronouns) newErrors.pronouns = 'Pronouns are required';
    if (!formData.headline.trim()) newErrors.headline = 'Headline is required';
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation / Position is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
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
    if (!formData.experienceType) newErrors.experienceType = 'Experience type is required';
    if (
      formData.experienceType === 'Experienced' &&
      !formData.experienceYears &&
      !formData.experienceMonths &&
      !formData.experienceDays
    )
      newErrors.experienceDuration = 'At least one duration field is required';
    if (!formData.workMode) newErrors.workMode = 'Work mode is required';
    if (
      (formData.workMode === 'Hybrid' || formData.workMode === 'On-site') &&
      !formData.workLocation.trim()
    )
      newErrors.workLocation = 'Work location is required';
    if (!formData.workType) newErrors.workType = 'Work type is required';

    // Validate based on workType
    if (formData.workType === 'Partnership') {
      if (!formData.equityPercentage.trim())
        newErrors.equityPercentage = 'Equity percentage is required';
    }

    if (formData.workType === 'Contract Basis') {
      if (
        !formData.contractDuration.years &&
        !formData.contractDuration.months &&
        !formData.contractDuration.days
      )
        newErrors.contractDuration = 'At least one duration field is required';
      if (!formData.scopeOfWork.trim())
        newErrors.scopeOfWork = 'Scope of work is required';
    }

    if (formData.workType === 'Project Basis') {
      if (!formData.projectDescription.trim())
        newErrors.projectDescription = 'Project description is required';
      if (
        !formData.projectTimeline.years &&
        !formData.projectTimeline.months &&
        !formData.projectTimeline.days
      )
        newErrors.projectTimeline = 'At least one timeline field is required';
    }

    if (formData.workType === 'Internship') {
      if (!formData.internshipType) newErrors.internshipType = 'Please select internship type';
      if (!formData.internshipMonths)
        newErrors.internshipMonths = 'Number of months is required';
      if (!formData.internshipPayment)
        newErrors.internshipPayment = 'Payment selection is required';
      if (formData.internshipPayment === 'Paid' && !formData.internshipPaymentAmount.trim())
        newErrors.internshipPaymentAmount = 'Payment amount is required';
    }

    if (formData.workType === 'Job') {
      if (!formData.jobType) newErrors.jobType = 'Please select job type';
      if (!formData.jobPayment) newErrors.jobPayment = 'Payment selection is required';
      if (formData.jobPayment === 'Paid' && !formData.jobPaymentAmount.trim())
        newErrors.jobPaymentAmount = 'Payment amount is required';
    }

    if (formData.workType === 'Freelance') {
      if (!formData.freelancePaymentRange.trim())
        newErrors.freelancePaymentRange = 'Payment range is required';
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
        const response = await fetch(`${process.env.API_URL}/posts`, {
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
      occupation: '',
      aboutYourself: '',
      companyName: '',
      aboutCompany: '',
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
      experienceType: 'Fresher',
      experienceYears: '',
      experienceMonths: '',
      experienceDays: '',
      workMode: '',
      workLocation: '',
      workType: '',
      equityPercentage: '',
      contractDuration: { years: '', months: '', days: '' },
      scopeOfWork: '',
      projectDescription: '',
      projectTimeline: { years: '', months: '', days: '' },
      projectPaymentAmount: '',
      internshipType: '',
      internshipMonths: '',
      internshipPayment: 'Paid',
      internshipPaymentAmount: '',
      jobType: '',
      jobPayment: 'Paid',
      jobPaymentAmount: '',
      freelancePaymentRange: '',
      aboutWork: '',
    });
    setStep(1);
    setErrors({});
    onClose();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-6 text-center">
        Create Post
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

          <div className="relative col-span-2">
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
              Occupation / Position <span className="text-red-500">*</span>
            </label>
            <input
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Enter your occupation or position"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.occupation ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
          </div>

          <div className="relative col-span-2">
            <label htmlFor="aboutYourself" className="block text-sm font-medium text-gray-700 mb-1">
              About Yourself (max 300 characters)
            </label>
            <textarea
              id="aboutYourself"
              name="aboutYourself"
              value={formData.aboutYourself}
              onChange={handleChange}
              maxLength={300}
              placeholder="Briefly describe yourself"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px]"
            />
          </div>

          <div className="relative col-span-2">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company / Institution / Startup Name <span className="text-red-500">*</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>

          <div className="relative col-span-2">
            <label htmlFor="aboutCompany" className="block text-sm font-medium text-gray-700 mb-1">
              About Company (Optional)
            </label>
            <textarea
              id="aboutCompany"
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
              placeholder="Briefly describe your company"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px]"
            />
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
                className="witiv-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
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

          {/* Experience */}
          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="experienceType"
                  value="Fresher"
                  checked={formData.experienceType === 'Fresher'}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Fresher</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="experienceType"
                  value="Experienced"
                  checked={formData.experienceType === 'Experienced'}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Experienced</span>
              </label>
            </div>
            {errors.experienceType && (
              <p className="text-red-500 text-sm mt-1">{errors.experienceType}</p>
            )}
            {formData.experienceType === 'Experienced' && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="experienceYears"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Years
                  </label>
                  <input
                    id="experienceYears"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    placeholder="Years"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="experienceMonths"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Months
                  </label>
                  <input
                    id="experienceMonths"
                    name="experienceMonths"
                    value={formData.experienceMonths}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="11"
                    placeholder="Months"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="experienceDays"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Days
                  </label>
                  <input
                    id="experienceDays"
                    name="experienceDays"
                    value={formData.experienceDays}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="30"
                    placeholder="Days"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                  />
                </div>
              </div>
            )}
            {errors.experienceDuration && (
              <p className="text-red-500 text-sm mt-1">{errors.experienceDuration}</p>
            )}
          </div>

          {/* Work Mode */}
          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Mode <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Remote', 'Hybrid', 'On-site'].map((mode) => (
                <label key={mode} className="flex items-center">
                  <input
                    type="radio"
                    name="workMode"
                    value={mode}
                    checked={formData.workMode === mode}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">{mode}</span>
                </label>
              ))}
            </div>
            {errors.workMode && <p className="text-red-500 text-sm mt-1">{errors.workMode}</p>}
            {(formData.workMode === 'Hybrid' || formData.workMode === 'On-site') && (
              <div className="mt-4">
                <label
                  htmlFor="workLocation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Work Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="workLocation"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleChange}
                  placeholder="Enter work location (e.g., city, state)"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.workLocation ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.workLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.workLocation}</p>
                )}
              </div>
            )}
          </div>

          {/* Work Type */}
          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Type <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Partnership', 'Contract Basis', 'Project Basis', 'Internship', 'Job', 'Freelance'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="workType"
                    value={type}
                    checked={formData.workType === type}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">{type}</span>
                </label>
              ))}
            </div>
            {errors.workType && <p className="text-red-500 text-sm mt-1">{errors.workType}</p>}

            {/* Partnership: Equity Percentage */}
            {formData.workType === 'Partnership' && (
              <div className="mt-4">
                <label
                  htmlFor="equityPercentage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Percentage of Equity Offering <span className="text-red-500">*</span>
                </label>
                <input
                  id="equityPercentage"
                  name="equityPercentage"
                  value={formData.equityPercentage}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter equity percentage"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.equityPercentage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.equityPercentage && (
                  <p className="text-red-500 text-sm mt-1">{errors.equityPercentage}</p>
                )}
              </div>
            )}

            {/* Contract Basis: Duration and Scope of Work */}
            {formData.workType === 'Contract Basis' && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contract Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="contractDurationYears"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Years
                      </label>
                      <input
                        id="contractDurationYears"
                        name="contractDurationYears"
                        value={formData.contractDuration.years}
                        onChange={(e) =>
                          handleNestedChange('contractDuration', 'years', e.target.value)
                        }
                        type="number"
                        min="0"
                        placeholder="Years"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contractDurationMonths"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Months
                      </label>
                      <input
                        id="contractDurationMonths"
                        name="contractDurationMonths"
                        value={formData.contractDuration.months}
                        onChange={(e) =>
                          handleNestedChange('contractDuration', 'months', e.target.value)
                        }
                        type="number"
                        min="0"
                        max="11"
                        placeholder="Months"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contractDurationDays"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Days
                      </label>
                      <input
                        id="contractDurationDays"
                        name="contractDurationDays"
                        value={formData.contractDuration.days}
                        onChange={(e) =>
                          handleNestedChange('contractDuration', 'days', e.target.value)
                        }
                        type="number"
                        min="0"
                        max="30"
                        placeholder="Days"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                      />
                    </div>
                  </div>
                  {errors.contractDuration && (
                    <p className="text-red-500 text-sm mt-1">{errors.contractDuration}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="scopeOfWork"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Scope of Work <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="scopeOfWork"
                    name="scopeOfWork"
                    value={formData.scopeOfWork}
                    onChange={handleChange}
                    placeholder="Briefly describe what the person will be working on during the contract."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px] ${
                      errors.scopeOfWork ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.scopeOfWork && (
                    <p className="text-red-500 text-sm mt-1">{errors.scopeOfWork}</p>
                  )}
                </div>
              </div>
            )}

            {/* Project Basis: Description, Timeline, Payment */}
            {formData.workType === 'Project Basis' && (
              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="projectDescription"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Describe the project"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px] ${
                      errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.projectDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeline <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="projectTimelineYears"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Years
                      </label>
                      <input
                        id="projectTimelineYears"
                        name="projectTimelineYears"
                        value={formData.projectTimeline.years}
                        onChange={(e) =>
                          handleNestedChange('projectTimeline', 'years', e.target.value)
                        }
                        type="number"
                        min="0"
                        placeholder="Years"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="projectTimelineMonths"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Months
                      </label>
                      <input
                        id="projectTimelineMonths"
                        name="projectTimelineMonths"
                        value={formData.projectTimeline.months}
                        onChange={(e) =>
                          handleNestedChange('projectTimeline', 'months', e.target.value)
                        }
                        type="number"
                        min="0"
                        max="11"
                        placeholder="Months"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="projectTimelineDays"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Days
                      </label>
                      <input
                        id="projectTimelineDays"
                        name="projectTimelineDays"
                        value={formData.projectTimeline.days}
                        onChange={(e) =>
                          handleNestedChange('projectTimeline', 'days', e.target.value)
                        }
                        type="number"
                        min="0"
                        max="30"
                        placeholder="Days"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                      />
                    </div>
                  </div>
                  {errors.projectTimeline && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectTimeline}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="projectPaymentAmount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Payment (Optional, in ₹)
                  </label>
                  <input
                    id="projectPaymentAmount"
                    name="projectPaymentAmount"
                    value={formData.projectPaymentAmount}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter payment amount (e.g., 5000)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                  />
                </div>
              </div>
            )}

            {/* Internship: Full-time/Part-time, Months, Payment */}
            {formData.workType === 'Internship' && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Internship Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="internshipType"
                        value="Full-time"
                        checked={formData.internshipType === 'Full-time'}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="internshipType"
                        value="Part-time"
                        checked={formData.internshipType === 'Part-time'}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Part-time</span>
                    </label>
                  </div>
                  {errors.internshipType && (
                    <p className="text-red-500 text-sm mt-1">{errors.internshipType}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="internshipMonths"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time Period (Months) <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="internshipMonths"
                    name="internshipMonths"
                    value={formData.internshipMonths}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                      errors.internshipMonths ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select months</option>
                    {[...Array(12).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? 'month' : 'months'}
                      </option>
                    ))}
                  </select>
                  {errors.internshipMonths && (
                    <p className="text-red-500 text-sm mt-1">{errors.internshipMonths}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="internshipPayment"
                        value="Paid"
                        checked={formData.internshipPayment === 'Paid'}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Paid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="internshipPayment"
                        value="Unpaid"
                        checked={formData.internshipPayment === 'Unpaid'}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Unpaid</span>
                    </label>
                  </div>
                  {errors.internshipPayment && (
                    <p className="text-red-500 text-sm mt-1">{errors.internshipPayment}</p>
                  )}
                  {formData.internshipPayment === 'Paid' && (
                    <div className="mt-4">
                      <label
                        htmlFor="internshipPaymentAmount"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Amount (in ₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="internshipPaymentAmount"
                        name="internshipPaymentAmount"
                        value={formData.internshipPaymentAmount}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter amount or range (e.g., 5000-10000)"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                          errors.internshipPaymentAmount ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.internshipPaymentAmount && (
                        <p className="text-red-500 text-sm mt-1">{errors.internshipPaymentAmount}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Job: Full-time/Part-time, Payment */}
            {formData.workType === 'Job' && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="Full-time"
                        checked={formData.jobType === 'Full-time'}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="Part-time"
                        checked={formData.jobType === 'Part-time'}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Part-time</span>
                    </label>
                  </div>
                  {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobPayment"
                        value="Paid"
                        checked={formData.jobPayment === 'Paid'}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Paid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobPayment"
                        value="Unpaid"
                        checked={formData.jobPayment === 'Unpaid'}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Unpaid</span>
                    </label>
                  </div>
                  {errors.jobPayment && (
                    <p className="text-red-500 text-sm mt-1">{errors.jobPayment}</p>
                  )}
                  {formData.jobPayment === 'Paid' && (
                    <div className="mt-4">
                      <label
                        htmlFor="jobPaymentAmount"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Amount (in ₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="jobPaymentAmount"
                        name="jobPaymentAmount"
                        value={formData.jobPaymentAmount}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter amount or range (e.g., 50000-70000)"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                          errors.jobPaymentAmount ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.jobPaymentAmount && (
                        <p className="text-red-500 text-sm mt-1">{errors.jobPaymentAmount}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Freelance: Payment Range */}
            {formData.workType === 'Freelance' && (
              <div className="mt-4">
                <label
                  htmlFor="freelancePaymentRange"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Payment Range (in ₹) <span className="text-red-500">*</span>
                </label>
                <input
                  id="freelancePaymentRange"
                  name="freelancePaymentRange"
                  value={formData.freelancePaymentRange}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter payment range (e.g., 10000-15000)"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.freelancePaymentRange ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.freelancePaymentRange && (
                  <p className="text-red-500 text-sm mt-1">{errors.freelancePaymentRange}</p>
                )}
              </div>
            )}
          </div>

          {/* About the Work */}
          <div className="relative col-span-2">
            <label htmlFor="aboutWork" className="block text-sm font-medium text-gray-700 mb-1">
              About the Work (Optional, max 300 words)
            </label>
            <textarea
              id="aboutWork"
              name="aboutWork"
              value={formData.aboutWork}
              onChange={handleChange}
              maxLength={1800}
              placeholder="Describe the work or opportunity"
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

export default FounderPostForm;