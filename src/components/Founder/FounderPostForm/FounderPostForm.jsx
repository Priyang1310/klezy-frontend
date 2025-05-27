import React, { useState, useEffect } from 'react';

function FounderPostForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    pronounce: '',
    userType: '',
    otherUserType: '',
    requirementType: '',
    otherRequirementType: '',
    startUpName: '',
    aboutEntity: '',
    websiteOfStartupLink: '',
    linkedin: '',
    instagram: '',
    city: '',
    state: '',
    country: '',
    email: '',
    whatsapp: '',
    contact_methods: {
      email: { selected: false, value: '' },
      whatsapp: { selected: false, value: '' },
      call: { selected: false, value: '' },
      instagram: { selected: false, value: '' },
    },
    headline: '',
    domainName: '',
    roleUnderDomain: '',
    skills: [],
    workBasis: {
      Partnership: false,
      Collaboration: false,
      Internship: false,
      Job: false,
      Freelance: false,
      ProjectBasis: false,
      PercentageBasis: false,
      Other: false,
    },
    otherWorkBasis: '',
    compensationDetails: '',
    workMode: '',
    experienceLevel: '',
    startDate: '',
    projectDuration: '',
    timeCommitment: '',
    aboutOpportunity: '',
    responsibilities: '',
    whyShouldJoin: '',
    anyOtherInfo: '',
    profile_pic: '',
  });

  const [errors, setErrors] = useState({});
  const [domains, setDomains] = useState([]);
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loadingDomains, setLoadingDomains] = useState(true);

  // Fetch domains on component mount
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch('http://62.72.13.232:3333/api/category/get-all-categories');
        if (!response.ok) throw new Error('Failed to fetch domains');
        const data = await response.json();
        const sortedDomains = (data.categories || []).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDomains(sortedDomains);
      } catch (error) {
        console.error('Error fetching domains:', error);
        setDomains([]);
      } finally {
        setLoadingDomains(false);
      }
    };
    fetchDomains();
  }, []);

  // Fetch roles and skills when domainName changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, skills: [], roleUnderDomain: '' }));
    setSearchText('');
    setShowSuggestions(false);

    const fetchRolesAndSkills = async () => {
      if (formData.domainName) {
        try {
          const [rolesResponse, skillsResponse] = await Promise.all([
            fetch(`http://62.72.13.232:3333/api/roles/?categoryId=${formData.domainName}`),
            fetch(`http://62.72.13.232:3333/api/skills/?categoryId=${formData.domainName}`),
          ]);
          if (!rolesResponse.ok) throw new Error('Failed to fetch roles');
          if (!skillsResponse.ok) throw new Error('Failed to fetch skills');

          const rolesData = await rolesResponse.json();
          const skillsData = await skillsResponse.json();

          setRoles(Array.isArray(rolesData.roles) ? rolesData.roles : []);
          setSkills(Array.isArray(skillsData.skills) ? skillsData.skills : []);
          setFilteredSkills(Array.isArray(skillsData.skills) ? skillsData.skills : []);
        } catch (error) {
          console.error('Error fetching roles or skills:', error);
          setRoles([]);
          setSkills([]);
          setFilteredSkills([]);
        }
      } else {
        setRoles([]);
        setSkills([]);
        setFilteredSkills([]);
      }
    };
    fetchRolesAndSkills();
  }, [formData.domainName]);

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
      contact_methods: {
        ...prev.contact_methods,
        [method]: {
          ...prev.contact_methods[method],
          selected: !prev.contact_methods[method].selected,
          value: prev.contact_methods[method].selected ? '' : prev.contact_methods[method].value,
        },
      },
      // Update direct fields for backend compatibility
      ...(method === 'email' && { email: !prev.contact_methods[method].selected ? prev.contact_methods[method].value : '' }),
      ...(method === 'whatsapp' && { whatsapp: !prev.contact_methods[method].selected ? prev.contact_methods[method].value : '' }),
      ...(method === 'instagram' && { instagram: !prev.contact_methods[method].selected ? prev.contact_methods[method].value : '' }),
    }));
    setErrors((prev) => ({ ...prev, contact_methods: '', [`${method}Value`]: '' }));
  };

  const handleContactValueChange = (method, value) => {
    setFormData((prev) => ({
      ...prev,
      contact_methods: {
        ...prev.contact_methods,
        [method]: {
          ...prev.contact_methods[method],
          value,
        },
      },
      // Update direct fields for backend compatibility
      ...(method === 'email' && { email: value }),
      ...(method === 'whatsapp' && { whatsapp: value }),
      ...(method === 'instagram' && { instagram: value }),
    }));
    setErrors((prev) => ({ ...prev, [`${method}Value`]: '' }));
  };

  const handleWorkBasisChange = (basis) => {
    setFormData((prev) => ({
      ...prev,
      workBasis: {
        ...prev.workBasis,
        [basis]: !prev.workBasis[basis],
      },
    }));
    setErrors((prev) => ({ ...prev, workBasis: '' }));
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
    if (!formData.first_name.trim()) newErrors.first_name = 'First Name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last Name is required';
    if (!formData.pronounce) newErrors.pronounce = 'Pronouns are required';
    if (!formData.userType) newErrors.userType = 'User type is required';
    if (formData.userType === 'Other' && !formData.otherUserType.trim())
      newErrors.otherUserType = 'Please specify user type';
    if (!formData.requirementType) newErrors.requirementType = 'Requirement type is required';
    if (formData.requirementType === 'Other' && !formData.otherRequirementType.trim())
      newErrors.otherRequirementType = 'Please specify requirement type';
    if (['Startup', 'Business'].includes(formData.requirementType) && !formData.startUpName.trim())
      newErrors.startUpName = 'Business/Startup Name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.profile_pic.trim()) newErrors.profile_pic = 'Profile picture URL is required';

    const anyContactSelected = Object.values(formData.contact_methods).some(
      (method) => method.selected
    );
    if (!anyContactSelected) {
      newErrors.contact_methods = 'Please select at least one contact method';
    }

    Object.entries(formData.contact_methods).forEach(([method, { selected, value }]) => {
      if (selected && !value.trim()) {
        newErrors[`${method}Value`] = `Please provide your ${method} ${method === 'whatsapp' || method === 'call' ? 'number' : 'details'}`;
      }
    });

    if (formData.contact_methods.email.selected && !/\S+@\S+\.\S+/.test(formData.contact_methods.email.value))
      newErrors.emailValue = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.headline.trim()) newErrors.headline = 'Headline is required';
    if (!formData.domainName) newErrors.domainName = 'Domain is required';
    if (!formData.roleUnderDomain) newErrors.roleUnderDomain = 'Role is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!Object.values(formData.workBasis).some((selected) => selected))
      newErrors.workBasis = 'At least one work basis is required';
    if (formData.workBasis.Other && !formData.otherWorkBasis.trim())
      newErrors.otherWorkBasis = 'Please specify work basis';
    if (!formData.workMode) newErrors.workMode = 'Work mode is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.projectDuration.trim()) newErrors.projectDuration = 'Duration is required';
    if (!formData.timeCommitment.trim()) newErrors.timeCommitment = 'Time commitment is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.aboutOpportunity.trim()) newErrors.aboutOpportunity = 'About the opportunity is required';
    if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Responsibilities are required';
    if (!formData.whyShouldJoin.trim()) newErrors.whyShouldJoin = 'Value proposition is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep3()) {
      try {
        // Prepare data for backend, mapping skills to array of names
        const submitData = {
          ...formData,
          skills: formData.skills.map((skill) => skill.name),
          workBasis: Object.keys(formData.workBasis).find((key) => formData.workBasis[key]) || '',
        };
        const response = await fetch('http://62.72.13.232:3333/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData),
          credentials: 'include',
        });
        if (response.ok) {
          console.log('Form submitted:', submitData);
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
      first_name: '',
      middle_name: '',
      last_name: '',
      pronounce: '',
      userType: '',
      otherUserType: '',
      requirementType: '',
      otherRequirementType: '',
      startUpName: '',
      aboutEntity: '',
      websiteOfStartupLink: '',
      linkedin: '',
      instagram: '',
      city: '',
      state: '',
      country: '',
      email: '',
      whatsapp: '',
      contact_methods: {
        email: { selected: false, value: '' },
        whatsapp: { selected: false, value: '' },
        call: { selected: false, value: '' },
        instagram: { selected: false, value: '' },
      },
      headline: '',
      domainName: '',
      roleUnderDomain: '',
      skills: [],
      workBasis: {
        Partnership: false,
        Collaboration: false,
        Internship: false,
        Job: false,
        Freelance: false,
        ProjectBasis: false,
        PercentageBasis: false,
        Other: false,
      },
      otherWorkBasis: '',
      compensationDetails: '',
      workMode: '',
      experienceLevel: '',
      startDate: '',
      projectDuration: '',
      timeCommitment: '',
      aboutOpportunity: '',
      responsibilities: '',
      whyShouldJoin: '',
      anyOtherInfo: '',
      profile_pic: '',
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

      {/* Step 1: Who's Reaching Out */}
      {step === 1 && (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h3 className="col-span-2 text-xl font-semibold text-gray-800 mb-4">
            Let’s introduce you to the world.
          </h3>

          <div className="relative">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your first name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
          </div>

          <div className="relative">
            <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              id="middle_name"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your middle name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your last name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
          </div>

          <div className="relative">
            <label htmlFor="pronounce" className="block text-sm font-medium text-gray-700 mb-1">
              Pronouns <span className="text-red-500">*</span>
            </label>
            <select
              id="pronounce"
              name="pronounce"
              value={formData.pronounce}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.pronounce ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Pronouns</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
            </select>
            {errors.pronounce && <p className="text-red-500 text-sm mt-1">{errors.pronounce}</p>}
          </div>

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              You are a <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Business Owner', 'Student', 'Working Professional', 'Startup Founder', 'Freelancer', 'Other'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={formData.userType === type}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">{type}</span>
                </label>
              ))}
            </div>
            {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
            {formData.userType === 'Other' && (
              <div className="mt-4">
                <label htmlFor="otherUserType" className="block text-sm font-medium text-gray-700 mb-1">
                  Specify User Type <span className="text-red-500">*</span>
                </label>
                <input
                  id="otherUserType"
                  name="otherUserType"
                  value={formData.otherUserType}
                  onChange={handleChange}
                  type="text"
                  placeholder="Specify your user type"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.otherUserType ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.otherUserType && <p className="text-red-500 text-sm mt-1">{errors.otherUserType}</p>}
              </div>
            )}
          </div>

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              This requirement is for a <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Business', 'Side Project', 'NGO', 'Startup', 'Personal Need', 'Other'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="requirementType"
                    value={type}
                    checked={formData.requirementType === type}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">{type}</span>
                </label>
              ))}
            </div>
            {errors.requirementType && <p className="text-red-500 text-sm mt-1">{errors.requirementType}</p>}
            {formData.requirementType === 'Other' && (
              <div className="mt-4">
                <label htmlFor="otherRequirementType" className="block text-sm font-medium text-gray-700 mb-1">
                  Specify Requirement Type <span className="text-red-500">*</span>
                </label>
                <input
                  id="otherRequirementType"
                  name="otherRequirementType"
                  value={formData.otherRequirementType}
                  onChange={handleChange}
                  type="text"
                  placeholder="Specify requirement type"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.otherRequirementType ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.otherRequirementType && <p className="text-red-500 text-sm mt-1">{errors.otherRequirementType}</p>}
              </div>
            )}
          </div>

          {['Startup', 'Business'].includes(formData.requirementType) && (
            <div className="relative col-span-2">
              <label htmlFor="startUpName" className="block text-sm font-medium text-gray-700 mb-1">
                Business/Startup Name <span className="text-red-500">*</span>
              </label>
              <input
                id="startUpName"
                name="startUpName"
                value={formData.startUpName}
                onChange={handleChange}
                type="text"
                placeholder="Enter business/startup name"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                  errors.startUpName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startUpName && <p className="text-red-500 text-sm mt-1">{errors.startUpName}</p>}
            </div>
          )}

          <div className="relative col-span-2">
            <label htmlFor="aboutEntity" className="block text-sm font-medium text-gray-700 mb-1">
              About the Business/Project/Startup
            </label>
            <textarea
              id="aboutEntity"
              name="aboutEntity"
              value={formData.aboutEntity}
              onChange={handleChange}
              maxLength={300}
              placeholder="Briefly describe your business/project/startup"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px]"
            />
          </div>

          <div className="relative">
            <label htmlFor="websiteOfStartupLink" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              id="websiteOfStartupLink"
              name="websiteOfStartupLink"
              value={formData.websiteOfStartupLink}
              onChange={handleChange}
              type="url"
              placeholder="Enter website URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              type="url"
              placeholder="Enter LinkedIn URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              type="text"
              placeholder="Enter Instagram handle"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text"
              placeholder="Enter city"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div className="relative">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              type="text"
              placeholder="Enter state"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              type="text"
              placeholder="Enter country"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          <div className="relative">
            <label htmlFor="profile_pic" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture URL <span className="text-red-500">*</span>
            </label>
            <input
              id="profile_pic"
              name="profile_pic"
              value={formData.profile_pic}
              onChange={handleChange}
              type="url"
              placeholder="Enter profile picture URL"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.profile_pic ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.profile_pic && <p className="text-red-500 text-sm mt-1">{errors.profile_pic}</p>}
          </div>

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How people can reach out to you <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['email', 'whatsapp', 'call', 'instagram'].map((method) => (
                <div key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    id={method}
                    checked={formData.contact_methods[method].selected}
                    onChange={() => handleContactMethodChange(method)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={method} className="ml-2 text-gray-700">{method}</label>
                </div>
              ))}
            </div>
            {errors.contact_methods && (
              <p className="text-red-500 text-sm mt-1">{errors.contact_methods}</p>
            )}

            <div className="mt-4 space-y-4">
              {Object.entries(formData.contact_methods).map(([method, { selected, value }]) => (
                selected && (
                  <div key={method} className="relative">
                    <label
                      htmlFor={`${method}Value`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {method} {method === 'whatsapp' || method === 'call' ? 'Number' : 'Details'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${method}Value`}
                      type={method === 'whatsapp' || method === 'call' ? 'tel' : method === 'email' ? 'email' : 'text'}
                      value={value}
                      onChange={(e) => handleContactValueChange(method, e.target.value)}
                      placeholder={`Enter your ${method} ${method === 'whatsapp' || method === 'call' ? 'number' : 'details'}`}
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

      {/* Step 2: Who are you looking for? */}
      {step === 2 && (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h3 className="col-span-2 text-xl font-semibold text-gray-800 mb-4">
            Your dream teammate, freelancer, or hire — describe them here.
          </h3>

          <div className="relative col-span-2">
            <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
              Headline (e.g., I am looking for...) <span className="text-red-500">*</span>
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
            <label htmlFor="domainName" className="block text-sm font-medium text-gray-700 mb-1">
              Domain of the Person Needed <span className="text-red-500">*</span>
            </label>
            {loadingDomains ? (
              <p className="text-gray-500">Loading domains...</p>
            ) : (
              <select
                id="domainName"
                name="domainName"
                value={formData.domainName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                  errors.domainName ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a domain</option>
                {domains.map((domain) => (
                  <option key={domain._id} value={domain._id}>
                    {domain.name}
                  </option>
                ))}
              </select>
            )}
            {errors.domainName && <p className="text-red-500 text-sm mt-1">{errors.domainName}</p>}
          </div>

          <div className="relative">
            <label htmlFor="roleUnderDomain" className="block text-sm font-medium text-gray-700 mb-1">
              Role of the Person <span className="text-red-500">*</span>
            </label>
            <select
              id="roleUnderDomain"
              name="roleUnderDomain"
              value={formData.roleUnderDomain}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.roleUnderDomain ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleUnderDomain && <p className="text-red-500 text-sm mt-1">{errors.roleUnderDomain}</p>}
          </div>

          {formData.domainName && (
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

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Basis <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Partnership', 'Collaboration', 'Internship', 'Job', 'Freelance', 'ProjectBasis', 'PercentageBasis', 'Other'].map((basis) => (
                <div key={basis} className="flex items-center">
                  <input
                    type="checkbox"
                    id={basis}
                    checked={formData.workBasis[basis]}
                    onChange={() => handleWorkBasisChange(basis)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={basis} className="ml-2 text-gray-700">{basis.replace(/([A-Z])/g, ' $1').trim()}</label>
                </div>
              ))}
            </div>
            {errors.workBasis && <p className="text-red-500 text-sm mt-1">{errors.workBasis}</p>}
            {formData.workBasis.Other && (
              <div className="mt-4">
                <label htmlFor="otherWorkBasis" className="block text-sm font-medium text-gray-700 mb-1">
                  Specify Work Basis <span className="text-red-500">*</span>
                </label>
                <input
                  id="otherWorkBasis"
                  name="otherWorkBasis"
                  value={formData.otherWorkBasis}
                  onChange={handleChange}
                  type="text"
                  placeholder="Specify work basis"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.otherWorkBasis ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.otherWorkBasis && <p className="text-red-500 text-sm mt-1">{errors.otherWorkBasis}</p>}
              </div>
            )}
          </div>

          <div className="relative col-span-2">
            <label htmlFor="compensationDetails" className="block text-sm font-medium text-gray-700 mb-1">
              Compensation / Stipend / Percentage
            </label>
            <input
              id="compensationDetails"
              name="compensationDetails"
              value={formData.compensationDetails}
              onChange={handleChange}
              type="text"
              placeholder="Enter compensation details (e.g., ₹5000-10000 or 5% equity)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
            />
          </div>

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Mode <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
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
            {(formData.workMode === 'Hybrid' || formData.workMode === 'Onsite') && (
              <div className="mt-4">
                <label htmlFor="workLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Location
                </label>
                <input
                  id="workLocation"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter work location (e.g., city, state)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                />
              </div>
            )}
          </div>

          <div className="relative">
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level <span className="text-red-500">*</span>
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select experience level</option>
              {['Beginner', 'Intermediate', 'Experienced', 'Expert'].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>}
          </div>

          <div className="relative">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>

          <div className="relative">
            <label htmlFor="projectDuration" className="block text-sm font-medium text-gray-700 mb-1">
              Project/Work Duration <span className="text-red-500">*</span>
            </label>
            <input
              id="projectDuration"
              name="projectDuration"
              value={formData.projectDuration}
              onChange={handleChange}
              type="text"
              placeholder="e.g., 3 months"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.projectDuration ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.projectDuration && <p className="text-red-500 text-sm mt-1">{errors.projectDuration}</p>}
          </div>

          <div className="relative">
            <label htmlFor="timeCommitment" className="block text-sm font-medium text-gray-700 mb-1">
              Time Commitment <span className="text-red-500">*</span>
            </label>
            <input
              id="timeCommitment"
              name="timeCommitment"
              value={formData.timeCommitment}
              onChange={handleChange}
              type="text"
              placeholder="e.g., 10-15 hr/week"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.timeCommitment ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.timeCommitment && <p className="text-red-500 text-sm mt-1">{errors.timeCommitment}</p>}
          </div>

          <div className="col-span-2 flex justify-between space-x-4 mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Back
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

      {/* Step 3: About the Opportunity */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h3 className="col-span-2 text-xl font-semibold text-gray-800 mb-4">
            About the Opportunity
          </h3>

          <div className="relative col-span-2">
            <label htmlFor="aboutOpportunity" className="block text-sm font-medium text-gray-700 mb-1">
              About the Project/Work/Business <span className="text-red-500">*</span>
            </label>
            <textarea
              id="aboutOpportunity"
              name="aboutOpportunity"
              value={formData.aboutOpportunity}
              onChange={handleChange}
              maxLength={1800}
              placeholder="Describe the project/work/business"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px] ${
                errors.aboutOpportunity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.aboutOpportunity && <p className="text-red-500 text-sm mt-1">{errors.aboutOpportunity}</p>}
          </div>

          <div className="relative col-span-2">
            <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-1">
              What will this person do? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              maxLength={1800}
              placeholder="Describe the responsibilities"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px] ${
                errors.responsibilities ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.responsibilities && <p className="text-red-500 text-sm mt-1">{errors.responsibilities}</p>}
          </div>

          <div className="relative col-span-2">
            <label htmlFor="whyShouldJoin" className="block text-sm font-medium text-gray-700 mb-1">
              Why should someone join you? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="whyShouldJoin"
              name="whyShouldJoin"
              value={formData.whyShouldJoin}
              onChange={handleChange}
              maxLength={1800}
              placeholder="Explain the value proposition"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px] ${
                errors.whyShouldJoin ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.whyShouldJoin && <p className="text-red-500 text-sm mt-1">{errors.whyShouldJoin}</p>}
          </div>

          <div className="relative col-span-2">
            <label htmlFor="anyOtherInfo" className="block text-sm font-medium text-gray-700 mb-1">
              Any Other Information
            </label>
            <textarea
              id="anyOtherInfo"
              name="anyOtherInfo"
              value={formData.anyOtherInfo}
              onChange={handleChange}
              maxLength={1800}
              placeholder="Any additional info"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px]"
            />
          </div>

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