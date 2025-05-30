import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';

function FounderPostForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    userType: '',
    otherUserType: '',
    requirementType: '',
    otherRequirementType: '',
    startUpName: '',
    // ngoName: '',
    aboutEntity: '',
    email: '',
    country: '',
    state: '',
    district: '',
    // profile_pic: '',
    personal_website:'',
    contact_methods: {
      call: { selected: false, value: '' },
      whatsapp: { selected: false, value: '' },
      instagram: { selected: false, value: '' },
      linkedin: { selected: false, value: '' },
      facebook: { selected: false, value: '' },
      other: { selected: false, value: '' },
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
      EquityBasis: false,
      Other: false,
    },
    partnershipCriteria: '',
    internshipType: null, // null, 'Paid', 'Unpaid', 'PerformanceBased'
    internshipTimeType: null, // null, 'FullTime', 'PartTime'
    internshipDuration: { value: '', unit: '' },
    internshipStipendRange: { min: '', max: '' },
    internshipPerformanceCriteria: '',
    collaborationDescription: '',
    jobAmountRange: { min: '', max: '' },
    freelancePaymentRange: { min: '', max: '' },
    projectDescription: '',
    percentageBasisValue: '',
    timeCommitment: '',
    equityBasisValue: '',
    otherWorkBasis: '',
    workMode: { Remote: false, Hybrid: false, Onsite: false },
    workLocation: { country: '', state: '', district: '' },
    experienceRange: { min: '', max: '' },
    aboutOpportunity: '',
    responsibilities: '',
    whyShouldJoin: '',
    anyOtherInfo: '',
  });

  const [errors, setErrors] = useState({});
  const [domains, setDomains] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showDomainSuggestions, setShowDomainSuggestions] = useState(false);
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [domainSearchText, setDomainSearchText] = useState('');
  const [roleSearchText, setRoleSearchText] = useState('');
  const [skillSearchText, setSkillSearchText] = useState('');
  const [loadingDomains, setLoadingDomains] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Fetch countries on mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Update states when country changes
  useEffect(() => {
    if (formData.country) {
      setStates(State.getStatesOfCountry(formData.country));
      setFormData((prev) => ({ ...prev, state: '', district: '' }));
      setDistricts([]);
    }
  }, [formData.country]);

  // Update districts when state changes
  useEffect(() => {
    if (formData.state) {
      setDistricts(City.getCitiesOfState(formData.country, formData.state));
    }
  }, [formData.state]);

  // Fetch domains and roles
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/domain/get-all-domains');
        if (!response.ok) throw new Error('Failed to fetch domains');
        const data = await response.json();
        const sortedDomains = (data.domains || []).sort((a, b) => a.name.localeCompare(b.name));
        setDomains(sortedDomains);
        setFilteredDomains(sortedDomains);

        const rolesFromAllDomains = sortedDomains.reduce((acc, domain) => {
          if (Array.isArray(domain.roles)) {
            return [...acc, ...domain.roles.map((role) => ({ ...role, domainId: domain._id }))];
          }
          return acc;
        }, []);
        const uniqueRoles = Array.from(
          new Map(rolesFromAllDomains.map((role) => [role._id, role])).values()
        );
        setAllRoles(uniqueRoles);
        setFilteredRoles(uniqueRoles);
      } catch (error) {
        console.error('Error fetching domains:', error);
        setDomains([]);
        setAllRoles([]);
        setFilteredDomains([]);
        setFilteredRoles([]);
      } finally {
        setLoadingDomains(false);
      }
    };
    fetchDomains();
  }, []);

  // Fetch skills when domainName changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      roleUnderDomain: '',
      skills: [],
    }));
    setRoleSearchText('');
    setSkills([]);
    setFilteredSkills([]);
    setSkillSearchText('');
    setShowSkillSuggestions(false);

    const fetchSkills = async () => {
      if (formData.domainName) {
        try {
          const skillsResponse = await fetch(`http://localhost:3333/api/skills/${formData.domainName}`);
          if (!skillsResponse.ok) throw new Error('Failed to fetch skills');
          const skillsData = await skillsResponse.json();
          setSkills(Array.isArray(skillsData.skills) ? skillsData.skills : []);
          setFilteredSkills(Array.isArray(skillsData.skills) ? skillsData.skills : []);
        } catch (error) {
          console.error('Error fetching skills:', error);
          setSkills([]);
          setFilteredSkills([]);
        }
      }
    };
    fetchSkills();
  }, [formData.domainName]);

  // Filter domains, roles, and skills
  useEffect(() => {
    if (!domainSearchText.trim()) {
      setFilteredDomains(domains);
    } else {
      setFilteredDomains(
        domains.filter((domain) => domain.name?.toLowerCase().startsWith(domainSearchText.toLowerCase()))
      );
    }
  }, [domainSearchText, domains]);

  useEffect(() => {
    if (!roleSearchText.trim()) {
      setFilteredRoles(allRoles);
    } else {
      setFilteredRoles(
        allRoles.filter((role) => role.name?.toLowerCase().startsWith(roleSearchText.toLowerCase()))
      );
    }
  }, [roleSearchText, allRoles]);

  useEffect(() => {
    if (!skillSearchText.trim()) {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(
        skills.filter((skill) => skill.name?.toLowerCase().startsWith(skillSearchText.toLowerCase()))
      );
    }
  }, [skillSearchText, skills]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleNestedChange = (field, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value },
    }));
    setErrors((prev) => ({ ...prev, [field]: { ...prev[field], [subField]: '' } }));
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
    }));
    setErrors((prev) => ({ ...prev, contact_methods: '', [`${method}Value`]: '' }));
  };

  const handleContactValueChange = (method, value) => {
    setFormData((prev) => ({
      ...prev,
      contact_methods: { ...prev.contact_methods, [method]: { ...prev.contact_methods[method], value } },
    }));
    setErrors((prev) => ({ ...prev, [`${method}Value`]: '' }));
  };

  const handleWorkBasisChange = (basis) => {
    setFormData((prev) => ({
      ...prev,
      workBasis: { ...prev.workBasis, [basis]: !prev.workBasis[basis] },
    }));
    setErrors((prev) => ({ ...prev, workBasis: '' }));
  };

  const handleWorkModeChange = (mode) => {
    setFormData((prev) => ({
      ...prev,
      workMode: { ...prev.workMode, [mode]: !prev.workMode[mode] },
      workLocation: prev.workMode[mode] ? { country: '', state: '', district: '' } : prev.workLocation,
    }));
    setErrors((prev) => ({ ...prev, workMode: '', workLocation: { country: '', state: '', district: '' } }));
  };

  const handleInternshipTypeChange = (value) => {
    setFormData((prev) => ({
  ...prev,
  internshipType: value,
  internshipTimeType: null,
  internshipDuration: value ? prev.internshipDuration : { value: '', unit: '' },
  internshipStipendRange: value === 'Paid' ? prev.internshipStipendRange : { min: '', max: '' },
  internshipPerformanceCriteria: value === 'PerformanceBased' ? prev.internshipPerformanceCriteria : '',
}));
    setErrors((prev) => ({
      ...prev,
      internshipType: '',
      internshipTimeType: '',
      internshipStipendRange: { min: '', max: '' },
      internshipPerformanceCriteria: '',
    }));
  };
  const handleInternshipTimeTypeChange = (value) => {
  setFormData((prev) => ({
    ...prev,
    internshipTimeType: value,
  }));
  setErrors((prev) => ({
    ...prev,
    internshipTimeType: '',
  }));
};

  const handleDomainInput = (e) => {
    setDomainSearchText(e.target.value);
    setShowDomainSuggestions(true);
  };

  const handleDomainFocus = () => setShowDomainSuggestions(true);
  const handleDomainBlur = () => setTimeout(() => setShowDomainSuggestions(false), 200);
  const handleDomainSelect = (domain) => {
    setFormData((prev) => ({ ...prev, domainName: domain._id }));
    setDomainSearchText(domain.name);
    setShowDomainSuggestions(false);
    setErrors((prev) => ({ ...prev, domainName: '' }));
  };

  const handleRoleInput = (e) => {
    setRoleSearchText(e.target.value);
    setShowRoleSuggestions(true);
  };

  const handleRoleFocus = () => setShowRoleSuggestions(true);
  const handleRoleBlur = () => setTimeout(() => setShowRoleSuggestions(false), 200);
  const handleRoleSelect = (role) => {
    const associatedDomain = domains.find((domain) => domain._id === role.domainId);
    if (associatedDomain) {
      setFormData((prev) => ({
        ...prev,
        roleUnderDomain: role._id,
        domainName: associatedDomain._id,
      }));
      setDomainSearchText(associatedDomain.name);
    } else {
      setFormData((prev) => ({ ...prev, roleUnderDomain: role._id }));
    }
    setRoleSearchText(role.name);
    setShowRoleSuggestions(false);
    setErrors((prev) => ({ ...prev, roleUnderDomain: '', domainName: '' }));
  };

  const handleSkillInput = (e) => {
    setSkillSearchText(e.target.value);
    setShowSkillSuggestions(e.target.value.length > 0);
  };

  const handleSkillSelect = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.some((s) => s._id === skill._id) ? prev.skills : [...prev.skills, skill],
    }));
    setSkillSearchText('');
    setShowSkillSuggestions(false);
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
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.userType) newErrors.userType = 'User type is required';
    if (formData.userType === 'Other' && !formData.otherUserType.trim())
      newErrors.otherUserType = 'Please specify user type';
    if (!formData.requirementType) newErrors.requirementType = 'Requirement type is required';
    if (formData.requirementType === 'Other' && !formData.otherRequirementType.trim())
      newErrors.otherRequirementType = 'Please specify requirement type';
    if (['Startup', 'Business'].includes(formData.requirementType) && !formData.startUpName.trim())
      newErrors.startUpName = 'Business/Startup Name is required';
    // if (formData.requirementType === 'NGO' && !formData.ngoName.trim())
    //   newErrors.ngoName = 'NGO Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.district) newErrors.district = 'District is required';
    // if (!formData.profile_pic.trim()) newErrors.profile_pic = 'Profile picture URL is required';

    const anyContactSelected = Object.values(formData.contact_methods).some((method) => method.selected);
    if (!anyContactSelected) newErrors.contact_methods = 'Please select at least one contact method';

    Object.entries(formData.contact_methods).forEach(([method, { selected, value }]) => {
      if (selected && !value.trim()) {
        newErrors[`${method}Value`] = `Please provide your ${method} ${(method === 'whatsapp' || method == 'call') ? 'number' : 'URL'}`;
      }
    });

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

    if (formData.workBasis.Partnership && !formData.partnershipCriteria.trim())
      newErrors.partnershipCriteria = 'Partnership criteria is required';
    if (formData.workBasis.Internship) {
      if (!formData.internshipTimeType) newErrors.internshipTimeType = 'Please specify internship time type';
      if (!formData.internshipType) newErrors.internshipType = 'Please specify internship type';
      if (!formData.internshipDuration.value.trim() || isNaN(formData.internshipDuration.value) || Number(formData.internshipDuration.value) <= 0) {
  newErrors.internshipDuration = { ...newErrors.internshipDuration, value: 'Valid duration is required' };
}
if (!formData.internshipDuration.unit) {
  newErrors.internshipDuration = { ...newErrors.internshipDuration, unit: 'Duration unit is required' };
}
      if (formData.internshipType === 'Paid') {
  if (!formData.internshipStipendRange.min.trim() || isNaN(formData.internshipStipendRange.min) || Number(formData.internshipStipendRange.min) < 0)
    newErrors.internshipStipendRange = { ...newErrors.internshipStipendRange, min: 'Valid minimum stipend is required' };
  if (!formData.internshipStipendRange.max.trim() || isNaN(formData.internshipStipendRange.max) || Number(formData.internshipStipendRange.max) < Number(formData.internshipStipendRange.min))
    newErrors.internshipStipendRange = { ...newErrors.internshipStipendRange, max: 'Valid maximum stipend is required' };
}
      if (formData.internshipType === 'PerformanceBased' && !formData.internshipPerformanceCriteria.trim())
        newErrors.internshipPerformanceCriteria = 'Performance criteria is required';
    }
    if (formData.workBasis.Collaboration && !formData.collaborationDescription.trim())
      newErrors.collaborationDescription = 'Collaboration description is required';
    if (formData.workBasis.Job) {
      if (!formData.jobAmountRange.min.trim())
        newErrors.jobAmountRange = { ...newErrors.jobAmountRange, min: 'Minimum amount is required' };
      if (!formData.jobAmountRange.max.trim())
        newErrors.jobAmountRange = { ...newErrors.jobAmountRange, max: 'Maximum amount is required' };
    }
    if (formData.workBasis.Freelance) {
      if (!formData.freelancePaymentRange.min.trim())
        newErrors.freelancePaymentRange = { ...newErrors.freelancePaymentRange, min: 'Minimum payment is required' };
      if (!formData.freelancePaymentRange.max.trim())
        newErrors.freelancePaymentRange = { ...newErrors.freelancePaymentRange, max: 'Maximum payment is required' };
    }
    if (formData.workBasis.ProjectBasis && !formData.projectDescription.trim())
      newErrors.projectDescription = 'Project description is required';
    if (formData.workBasis.PercentageBasis && !formData.percentageBasisValue.trim())
      newErrors.percentageBasisValue = 'Percentage value is required';
    if (formData.workBasis.EquityBasis && !formData.equityBasisValue.trim())
      newErrors.equityBasisValue = 'Equity value is required';
    if (formData.workBasis.Other && !formData.otherWorkBasis.trim())
      newErrors.otherWorkBasis = 'Please specify work basis';
    if (!Object.values(formData.workMode).some((selected) => selected))
      newErrors.workMode = 'At least one work mode is required';
    if ((formData.workMode.Hybrid || formData.workMode.Onsite)) {
      if (!formData.workLocation.country) newErrors.workLocation = { ...newErrors.workLocation, country: 'Country is required' };
      if (!formData.workLocation.state) newErrors.workLocation = { ...newErrors.workLocation, state: 'State is required' };
      if (!formData.workLocation.district) newErrors.workLocation = { ...newErrors.workLocation, district: 'District is required' };
    }
    if (!formData.experienceRange.min.trim() || isNaN(formData.experienceRange.min) || Number(formData.experienceRange.min) < 0)
  newErrors.experienceRange = { ...newErrors.experienceRange, min: 'Valid minimum experience is required' };
if (!formData.experienceRange.max.trim() || isNaN(formData.experienceRange.max) || Number(formData.experienceRange.max) < Number(formData.experienceRange.min))
  newErrors.experienceRange = { ...newErrors.experienceRange, max: 'Valid maximum experience is required' };
    // if (!formData.experienceRange.min.trim()) newErrors.experienceRange = { ...newErrors.experienceRange, min: 'Minimum experience is required' };
    // if (!formData.experienceRange.max.trim()) newErrors.experienceRange = { ...newErrors.experienceRange, max: 'Maximum experience is required' };
    // if (!formData.startDate) newErrors.startDate = 'Start date is required';

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
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep3()) {
      try {
        const submitData = {
          ...formData,
          skills: formData.skills.map((skill) => skill.name),
          workBasis: Object.keys(formData.workBasis).filter((key) => formData.workBasis[key]),
          workMode: Object.keys(formData.workMode).filter((key) => formData.workMode[key]),
           call: formData.contact_methods.call.selected ? formData.contact_methods.call.value : '',
          whatsapp: formData.contact_methods.whatsapp.selected ? formData.contact_methods.whatsapp.value : '',
          instagram: formData.contact_methods.instagram.selected ? formData.contact_methods.instagram.value : '',
          linkedin: formData.contact_methods.linkedin.selected ? formData.contact_methods.linkedin.value : '',
          facebook: formData.contact_methods.facebook.selected ? formData.contact_methods.facebook.value : '',
          otherContact: formData.contact_methods.other.selected ? formData.contact_methods.other.value : '',
          internshipTimeType: formData.internshipTimeType || '',
          internshipDuration: formData.workBasis.Internship && formData.internshipDuration.value && formData.internshipDuration.unit
  ? `${formData.internshipDuration.value} ${formData.internshipDuration.unit}`
  : '',
          internshipStipendRange: formData.internshipType === 'Paid' && formData.internshipStipendRange.min && formData.internshipStipendRange.max
  ? `${formData.internshipStipendRange.min}-${formData.internshipStipendRange.max} rupees`
  : '',
          experienceRange: formData.experienceRange.min && formData.experienceRange.max
    ? `${formData.experienceRange.min}-${formData.experienceRange.max} years`
    : '',
        };
        delete submitData.contact_methods;
        const response = await fetch('http://localhost:3333/api/founder/add-listing/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData),
          credentials: 'include',
        });
        if (response.ok) {
          console.log('Form submitted:', submitData);
          onClose();
        } else {
          setErrors({ submit: 'Failed to submit the form. Please try again.' });
        }
      } catch (err) {
        setErrors({ submit: 'An error occurred. Please try again.' });
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      userType: '',
      otherUserType: '',
      requirementType: '',
      otherRequirementType: '',
      startUpName: '',
      // ngoName: '',
      aboutEntity: '',
      email: '',
      country: '',
      state: '',
      district: '',
      timeCommitment: '',
      // profile_pic: '',
      personal_website:'',
      contact_methods: {
        call: { selected: false, value: '' },
        whatsapp: { selected: false, value: '' },
        instagram: { selected: false, value: '' },
        linkedin: { selected: false, value: '' },
        facebook: { selected: false, value: '' },
        other: { selected: false, value: '' },
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
        EquityBasis: false,
        Other: false,
      },
      partnershipCriteria: '',
      internshipType: null,
      internshipTimeType: null, // Add this
      internshipDuration: { value: '', unit: '' },
      internshipStipendRange: { min: '', max: '' },
      internshipPerformanceCriteria: '',
      collaborationDescription: '',
      jobAmountRange: { min: '', max: '' },
      freelancePaymentRange: { min: '', max: '' },
      projectDescription: '',
      percentageBasisValue: '',
      equityBasisValue: '',
      otherWorkBasis: '',
      workMode: { Remote: false, Hybrid: false, Onsite: false },
      workLocation: { country: '', state: '', district: '' },
      experienceRange: { min: '', max: '' },
      aboutOpportunity: '',
      responsibilities: '',
      whyShouldJoin: '',
      anyOtherInfo: '',
    });
    setDomainSearchText('');
    setRoleSearchText('');
    setSkillSearchText('');
    setShowDomainSuggestions(false);
    setShowRoleSuggestions(false);
    setShowSkillSuggestions(false);
    setStep(1);
    setErrors({});
    onClose();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl w-full">
      <div className='h-20 flex items-center justify-center gap-5 rounded-t-2xl mb-6 border-b border-gray-200 w-[50%] mx-auto text-xl'>
        <div className='flex flex-col'>
          <p className='flex items-center gap-2'>01 <span className={`text-sm text-violet-600`}>About Founder</span></p>
          <div className='flex items-center gap-1'>
            <div className={`flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 bg-violet-600`}>✓</div>
            <div className={`w-[150px] h-1 ${(step > 1) ? "bg-violet-600" : "bg-gray-200"}`}></div>
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='flex items-center gap-2'>02 <span className={`text-sm ${(step > 1 ? "text-violet-600" : "text-black")}`}>Skills and Strength</span></p>
          <div className='flex items-center gap-1'>
            <div className={`flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 ${(step > 1) ? "bg-violet-600" : "bg-white"}`}>✓</div>
            <div className={`w-[150px] h-1 ${(step > 2) ? "bg-violet-600" : "bg-gray-200"}`}></div>
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='flex items-center gap-2 w-[150px]'>03 <span className={`text-sm ${(step > 2 ? "text-violet- magni-600" : "text-black")}`}>Looking for</span></p>
          <div className='flex items-center gap-1'>
            <div className={`flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 ${(step > 2) ? "bg-violet-600" : "bg-white"}`}>✓</div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className='flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5'>
          <div className='flex flex-col'>
            <p className='text-violet-700 text-xl'>Stay It Your Way</p>
            <p className='text-violet-400'>This isn't your typical hiring form. In a few short questions, you'll paint a picture of your world and who you're looking for — no corporate lingo required.</p>
          </div>
          <img src="./FormImage1.svg" alt="" className='scale-150' />
        </div>
      )}

      {step === 2 && (
        <div className='flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5'>
          <div className='flex flex-col'>
            <p className='text-violet-700 text-xl'>You're almost there!</p>
            <p className='text-violet-400'>This fun little form helps you describe your vibe and your need — quick, casual, and human. No resumes, no HR jargon. Just say it like it is.</p>
          </div>
          <img src="./FormImage2.svg" alt="" className='' />
        </div>
      )}

      {step === 3 && (
        <div className='flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5'>
          <div className='flex flex-col'>
            <p className='text-violet-700 text-xl'>You’ve made it to the final step!</p>
            <p className='text-violet-400'>This short form captures who you are, what you need, and how your team works — no fluff, no lengthy job descriptions. Just clear, honest details. Done in minutes.</p>
          </div>
          <img src="./FormImage3.svg" alt="" className='' />
        </div>
      )}

      {step === 1 && (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h3 className="col-span-2 text-xl font-semibold text-[#7900BF] mb-4">
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
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to specify">Prefer not to specify</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              You are a <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Business Owner', 'Startup Founder','Working Professional', 'Freelancer', 'Student','Other'].map((type) => (
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
              {['Business', 'Startup', 'Side Project', 'Personal Need', 'Other'].map((type) => (
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
            {['Startup', 'Business'].includes(formData.requirementType) && (
              <div className="mt-4">
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
            {/* {formData.requirementType === 'NGO' && (
              <div className="mt-4">
                <label htmlFor="ngoName" className="block text-sm font-medium text-gray-700 mb-1">
                  NGO Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="ngoName"
                  name="ngoName"
                  value={formData.ngoName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter NGO name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.ngoName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.ngoName && <p className="text-red-500 text-sm mt-1">{errors.ngoName}</p>}
              </div>
            )} */}
          </div>

          <div className="relative col-span-2">
            <label htmlFor="aboutEntity" className="block text-sm font-medium text-gray-700 mb-1">
              About the {formData.requirementType}
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="text"
              placeholder="Enter email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          <div className="relative">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div className="relative">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
              District <span className="text-red-500">*</span>
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.district ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={!formData.state}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
          </div>

          <div className="relative">
            <label htmlFor="personal_website" className="block text-sm font-medium text-gray-700 mb-1">
              Personal website <span className="text-red-500">*</span>
            </label>
            <input
              id="personal_website"
              name="personal_website"
              value={formData.personal_website}
              onChange={handleChange}
              type="url"
              placeholder="Enter website URL"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 
                `}
            />
            
          </div>

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How people can reach out to you <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['call','whatsapp', 'instagram', 'linkedin', 'facebook', 'other'].map((method) => (
                <div key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    id={method}
                    checked={formData.contact_methods[method].selected}
                    onChange={() => handleContactMethodChange(method)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={method} className="ml-2 text-gray-700">
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            {errors.contact_methods && <p className="text-red-500 text-sm mt-1">{errors.contact_methods}</p>}
            <div className="mt-4 space-y-4">
              {Object.entries(formData.contact_methods).map(([method, { selected, value }]) => (
                selected && (
                  <div key={method} className="relative">
                    <label htmlFor={`${method}Value`} className="block text-sm font-medium text-gray-700 mb-1">
                      {method.charAt(0).toUpperCase() + method.slice(1)} {(method === 'whatsapp' || method === 'call') ? 'Number' : 'URL'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`${method}Value`}
                      type={(method === 'whatsapp' || method === 'call') ? 'tel' : 'url'}
                      value={value}
                      onChange={(e) => handleContactValueChange(method, e.target.value)}
                      placeholder={`Enter your ${method} ${(method === 'whatsapp' || method === 'call') ? 'number' : 'URL'}`}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                        errors[`${method}Value`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`${method}Value`] && <p className="text-red-500 text-sm mt-1">{errors[`${method}Value`]}</p>}
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

      {step === 2 && (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h3 className="col-span-2 text-xl font-semibold text-[#7900BF] mb-4">
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
              <>
                <input
                  id="domainName"
                  name="domainNameInput"
                  value={domainSearchText}
                  onChange={handleDomainInput}
                  onFocus={handleDomainFocus}
                  onBlur={handleDomainBlur}
                  placeholder="Type to search domains"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                    errors.domainName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {showDomainSuggestions && filteredDomains.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-auto shadow-lg">
                    {filteredDomains.map((domain) => (
                      <li
                        key={domain._id}
                        onMouseDown={() => handleDomainSelect(domain)}
                        className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition-all duration-200"
                      >
                        {domain.name}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
            {errors.domainName && <p className="text-red-500 text-sm mt-1">{errors.domainName}</p>}
          </div>

          <div className="relative">
            <label htmlFor="roleUnderDomain" className="block text-sm font-medium text-gray-700 mb-1">
              Role of the Person <span className="text-red-500">*</span>
            </label>
            <input
              id="roleUnderDomain"
              name="roleUnderDomainInput"
              value={roleSearchText}
              onChange={handleRoleInput}
              onFocus={handleRoleFocus}
              onBlur={handleRoleBlur}
              placeholder="Type to search roles"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.roleUnderDomain ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {showRoleSuggestions && filteredRoles.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-auto shadow-lg">
                {filteredRoles.map((role) => (
                  <li
                    key={role._id}
                    onMouseDown={() => handleRoleSelect(role)}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition-all duration-200"
                  >
                    {role.name}
                  </li>
                ))}
              </ul>
            )}
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
                value={skillSearchText}
                onChange={handleSkillInput}
                placeholder="Type to search skills"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
              />
              {showSkillSuggestions && filteredSkills.length > 0 && (
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
              {['Partnership', 'Collaboration','EquityBasis', 'ProjectBasis','PercentageBasis', 'Job','Internship', 'Freelance','Other'].map((basis) => (
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

            <div className="mt-4 space-y-4">
              {formData.workBasis.Partnership && (
                <div className="relative">
                  <label htmlFor="partnershipCriteria" className="block text-sm font-medium text-gray-700 mb-1">
                    Partnership Criteria <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="partnershipCriteria"
                    name="partnershipCriteria"
                    value={formData.partnershipCriteria}
                    onChange={handleChange}
                    placeholder="Describe the partnership criteria"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                      errors.partnershipCriteria ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.partnershipCriteria && <p className="text-red-500 text-sm mt-1">{errors.partnershipCriteria}</p>}
                </div>
              )}

              {formData.workBasis.Internship && (
                <div className="space-y-4">
                  <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Internship Time Type <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4">
        {['FullTime', 'PartTime'].map((type) => (
          <label key={type} className="flex items-center">
            <input
              type="radio"
              name="internshipTimeType"
              value={type}
              checked={formData.internshipTimeType === type}
              onChange={() => handleInternshipTimeTypeChange(type)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-gray-700">{type === 'FullTime' ? 'Full-time' : 'Part-time'}</span>
          </label>
        ))}
      </div>
      {errors.internshipTimeType && <p className="text-red-500 text-sm mt-1">{errors.internshipTimeType}</p>}
    </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Internship Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {['Paid', 'Unpaid', 'PerformanceBased'].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="internshipType"
                            value={type}
                            checked={formData.internshipType === type}
                            onChange={() => handleInternshipTypeChange(type)}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="ml-2 text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.internshipType && <p className="text-red-500 text-sm mt-1">{errors.internshipType}</p>}
                  </div>

                 <div className="relative">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Internship Duration <span className="text-red-500">*</span>
  </label>
  <div className="flex gap-4">
    <input
      id="internshipDurationValue"
      name="value"
      value={formData.internshipDuration.value}
      onChange={(e) => handleNestedChange('internshipDuration', 'value', e.target.value)}
      type="number"
      min="0"
      placeholder="Enter duration"
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
        errors.internshipDuration?.value ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    <select
      id="internshipDurationUnit"
      name="unit"
      value={formData.internshipDuration.unit}
      onChange={(e) => handleNestedChange('internshipDuration', 'unit', e.target.value)}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
        errors.internshipDuration?.unit ? 'border-red-500' : 'border-gray-300'
      }`}
    >
      <option value="">Select unit</option>
      <option value="years">Years</option>
      <option value="months">Months</option>
      <option value="days">Days</option>
    </select>
  </div>
  {errors.internshipDuration?.value && <p className="text-red-500 text-sm mt-1">{errors.internshipDuration.value}</p>}
  {errors.internshipDuration?.unit && <p className="text-red-500 text-sm mt-1">{errors.internshipDuration.unit}</p>}
</div>

                  {formData.internshipType === 'Paid' && (
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stipend Range (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        <input
                          id="internshipStipendMin"
                          name="min"
                          value={formData.internshipStipendRange.min}
                          onChange={(e) => handleNestedChange('internshipStipendRange', 'min', e.target.value)}
                          type="number"
                          min="0"
                          placeholder="Min"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                            errors.internshipStipendRange?.min ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <input
                          id="internshipStipendMax"
                          name="max"
                          value={formData.internshipStipendRange.max}
                          onChange={(e) => handleNestedChange('internshipStipendRange', 'max', e.target.value)}
                          type="number"
                          min="0"
                          placeholder="Max"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                            errors.internshipStipendRange?.max ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.internshipStipendRange?.min && <p className="text-red-500 text-sm mt-1">{errors.internshipStipendRange.min}</p>}
                      {errors.internshipStipendRange?.max && <p className="text-red-500 text-sm mt-1">{errors.internshipStipendRange.max}</p>}
                    </div>
                  )}

                  {formData.internshipType === 'PerformanceBased' && (
                    <div className="relative">
                      <label htmlFor="internshipPerformanceCriteria" className="block text-sm font-medium text-gray-700 mb-1">
                        Performance Criteria <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="internshipPerformanceCriteria"
                        name="internshipPerformanceCriteria"
                        value={formData.internshipPerformanceCriteria}
                        onChange={handleChange}
                        placeholder="Describe the performance criteria"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                          errors.internshipPerformanceCriteria ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.internshipPerformanceCriteria && (
                        <p className="text-red-500 text-sm mt-1">{errors.internshipPerformanceCriteria}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {formData.workBasis.Collaboration && (
                <div className="relative">
                  <label htmlFor="collaborationDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe the Collaboration <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="collaborationDescription"
                    name="collaborationDescription"
                    value={formData.collaborationDescription}
                    onChange={handleChange}
                    placeholder="Describe the collaboration"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                      errors.collaborationDescription ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.collaborationDescription && <p className="text-red-500 text-sm mt-1">{errors.collaborationDescription}</p>}
                </div>
              )}

              {formData.workBasis.Job && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Amount Range (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <input
                      id="jobAmountMin"
                      name="min"
                      value={formData.jobAmountRange.min}
                      onChange={(e) => handleNestedChange('jobAmountRange', 'min', e.target.value)}
                      type="number"
                      min="0"
                      placeholder="Min"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                        errors.jobAmountRange?.min ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <input
                      id="jobAmountMax"
                      name="max"
                      value={formData.jobAmountRange.max}
                      onChange={(e) => handleNestedChange('jobAmountRange', 'max', e.target.value)}
                      type="number"
                      min="0"
                      placeholder="Max"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                        errors.jobAmountRange?.max ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.jobAmountRange?.min && <p className="text-red-500 text-sm mt-1">{errors.jobAmountRange.min}</p>}
                  {errors.jobAmountRange?.max && <p className="text-red-500 text-sm mt-1">{errors.jobAmountRange.max}</p>}
                </div>
              )}

              {formData.workBasis.Freelance && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Range (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <input
                      id="freelancePaymentMin"
                      name="min"
                      value={formData.freelancePaymentRange.min}
                      onChange={(e) => handleNestedChange('freelancePaymentRange', 'min', e.target.value)}
                      type="number"
                      min="0"
                      placeholder="Min"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                        errors.freelancePaymentRange?.min ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <input
                      id="freelancePaymentMax"
                      name="max"
                      value={formData.freelancePaymentRange.max}
                      onChange={(e) => handleNestedChange('freelancePaymentRange', 'max', e.target.value)}
                      type="number"
                      min="0"
                      placeholder="Max"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                        errors.freelancePaymentRange?.max ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.freelancePaymentRange?.min && <p className="text-red-500 text-sm mt-1">{errors.freelancePaymentRange.min}</p>}
                  {errors.freelancePaymentRange?.max && <p className="text-red-500 text-sm mt-1">{errors.freelancePaymentRange.max}</p>}
                </div>
              )}

              {formData.workBasis.ProjectBasis && (
                <div className="relative">
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe the Project <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Describe the project"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                      errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
                </div>
              )}

              {formData.workBasis.PercentageBasis && (
                <div className="relative">
                  <label htmlFor="percentageBasisValue" className="block text-sm font-medium text-gray-700 mb-1">
                    Approximate Percentage (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="percentageBasisValue"
                    name="percentageBasisValue"
                    value={formData.percentageBasisValue}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    placeholder="Enter percentage (e.g., 5)"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                      errors.percentageBasisValue ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.percentageBasisValue && <p className="text-red-500 text-sm mt-1">{errors.percentageBasisValue}</p>}
                </div>
              )}

              {formData.workBasis.EquityBasis && (
                <div className="relative">
                  <label htmlFor="equityBasisValue" className="block text-sm font-medium text-gray-700 mb-1">
                    Equity Percentage (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="equityBasisValue"
                    name="equityBasisValue"
                    value={formData.equityBasisValue}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    placeholder="Enter equity percentage (e.g., 2)"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                      errors.equityBasisValue ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.equityBasisValue && <p className="text-red-500 text-sm mt-1">{errors.equityBasisValue}</p>}
                </div>
              )}

              {formData.workBasis.Other && (
                <div className="relative">
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
          </div>

          <div className="relative col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Mode <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                <div key={mode} className="flex items-center">
                  <input
                    type="checkbox"
                    id={mode}
                    checked={formData.workMode[mode]}
                    onChange={() => handleWorkModeChange(mode)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={mode} className="ml-2 text-gray-700">{mode}</label>
                </div>
              ))}
            </div>
            {errors.workMode && <p className="text-red-500 text-sm mt-1">{errors.workMode}</p>}
            {(formData.workMode.Hybrid || formData.workMode.Onsite) && (
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <label htmlFor="workLocationCountry" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Location Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="workLocationCountry"
                    name="country"
                    value={formData.workLocation.country}
                    onChange={(e) => handleNestedChange('workLocation', 'country', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                      errors.workLocation?.country ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.workLocation?.country && <p className="text-red-500 text-sm mt-1">{errors.workLocation.country}</p>}
                </div>

                <div className="relative">
                  <label htmlFor="workLocationState" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Location State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="workLocationState"
                    name="state"
                    value={formData.workLocation.state}
                    onChange={(e) => handleNestedChange('workLocation', 'state', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                      errors.workLocation?.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={!formData.workLocation.country}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.workLocation?.state && <p className="text-red-500 text-sm mt-1">{errors.workLocation.state}</p>}
                </div>

                <div className="relative">
                  <label htmlFor="workLocationDistrict" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Location District <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="workLocationDistrict"
                    name="district"
                    value={formData.workLocation.district}
                    onChange={(e) => handleNestedChange('workLocation', 'district', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                      errors.workLocation?.district ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={!formData.workLocation.state}
                  >
                    <option value="">Select District</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors.workLocation?.district && <p className="text-red-500 text-sm mt-1">{errors.workLocation.district}</p>}
                </div>
              </div>
            )}
          </div>
<div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Range (Years) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <input
                id="experienceMin"
                name="min"
                value={formData.experienceRange.min}
                onChange={(e) => handleNestedChange('experienceRange', 'min', e.target.value)}
                type="number"
                min="0"
                placeholder="Min"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple              focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 hover:border-purple-400 ${
                errors.experienceRange?.min ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <input
              id="experienceMax"
              name="max"
              value={formData.experienceRange.max}
              onChange={(e) => handleNestedChange('experienceRange', 'max', e.target.value)}
              type="number"
              min="0"
              placeholder="Max"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 hover:border-purple-400 ${
                errors.experienceRange?.max ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.experienceRange?.min && <p className="text-red-500 text-sm mt-1">{errors.experienceRange.min}</p>}
          {errors.experienceRange?.max && <p className="text-red-500 text-sm mt-1">{errors.experienceRange.max}</p>}
        </div>
        <div className="relative col-span-2">
  <label htmlFor="timeCommitment" className="block text-sm font-medium text-gray-700 mb-1">
    Time Commitment (Optional)
  </label>
  <input
    id="timeCommitment"
    name="timeCommitment"
    value={formData.timeCommitment}
    onChange={handleChange}
    type="text"
    placeholder="e.g., 20 hours/week"
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 hover:border-purple-400"
  />
</div>

        {/* <div className="relative">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 hover:border-purple-400 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div> */}

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

    {step === 3 && (
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <h3 className="col-span-2 text-xl font-semibold text-[#7900BF] mb-4">
          Tell us about the opportunity.
        </h3>

        <div className="relative col-span-2">
          <label htmlFor="aboutOpportunity" className="block text-sm font-medium text-gray-700 mb-1">
            About This Opportunity <span className="text-red-500">*</span>
          </label>
          <textarea
            id="aboutOpportunity"
            name="aboutOpportunity"
            value={formData.aboutOpportunity}
            onChange={handleChange}
            maxLength={500}
            placeholder="Describe the opportunity in detail"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px] ${
              errors.aboutOpportunity ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.aboutOpportunity && <p className="text-red-500 text-sm mt-1">{errors.aboutOpportunity}</p>}
        </div>

        <div className="relative col-span-2">
          <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-1">
            Key Responsibilities <span className="text-red-500">*</span>
          </label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            maxLength={500}
            placeholder="List the key responsibilities"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 hover:border-purple-400 resize-y min-h-[150px] ${
              errors.responsibilities ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.responsibilities && <p className="text-red-500 text-sm mt-1">{errors.responsibilities}</p>}
        </div>

        <div className="relative col-span-2">
          <label htmlFor="whyShouldJoin" className="block text-sm font-medium text-gray-700 mb-1">
            Why Should Someone Join? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="whyShouldJoin"
            name="whyShouldJoin"
            value={formData.whyShouldJoin}
            onChange={handleChange}
            maxLength={300}
            placeholder="What makes this opportunity exciting?"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
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
            maxLength={300}
            placeholder="Anything else you want to add?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px]"
          />
        </div>

        {errors.submit && (
          <div className="col-span-2">
            <p className="text-red-500 text-sm">{errors.submit}</p>
          </div>
        )}

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
  </div>
);
}

export default FounderPostForm;
          