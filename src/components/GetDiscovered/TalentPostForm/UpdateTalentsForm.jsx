import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { FaMagic, FaPlus, FaTimes } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { useParams } from "react-router-dom";

function UpdateGetDiscoveredForm({listingId, onClose }) {
    // const { id } = useParams();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        gender: "",
        userType: "",
        otherUserType: "",
        contact_methods: {
            call: { selected: false, value: "" },
            whatsapp: { selected: false, value: "" },
            instagram: { selected: false, value: "" },
            linkedin: { selected: false, value: "" },
            facebook: { selected: false, value: "" },
            other: { selected: false, value: "" },
        },
        aboutSelf: "",
        headline: "",
        domainName: "",
        roleUnderDomain: "",
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
        partnershipCriteria: "",
        internshipType: null,
        internshipTimeType: null,
        jobTimeType: null,
        internshipDuration: { value: "", unit: "" },
        internshipStipendRange: { min: "", max: "" },
        internshipPerformanceCriteria: "",
        collaborationDescription: "",
        jobAmountRange: { min: "", max: "" },
        freelancePaymentRange: { min: "", max: "" },
        projectDescription: "",
        percentageBasisValue: "",
        timeCommitment: "",
        equityBasisValue: "",
        otherWorkBasis: "",
        workMode: { Remote: false, Hybrid: false, Onsite: false },
        workLocation: { country: "", state: "", district: "" },
        experience: { years: "", months: "", days: "" },
        portfolioLink: "",
        resumeLink: "",
        projects: [],
        workExperience: [],
        otherLinks: [],
        expectations: "",
        anyOtherInfo: "",
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
    const [domainSearchText, setDomainSearchText] = useState("");
    const [roleSearchText, setRoleSearchText] = useState("");
    const [skillSearchText, setSkillSearchText] = useState("");
    const [loadingDomains, setLoadingDomains] = useState(true);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loadingListing, setLoadingListing] = useState(true);
    const [listingError, setListingError] = useState("");
    const [enhanceLoading, setEnhanceLoading] = useState({});

    // Fetch listing data
   useEffect(() => {
    const fetchListing = async () => {
        try {
            const response = await fetch(
                `http://localhost:3333/api/get-discovered/get-pre-filled-details-for-update-form/${listingId}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error("Failed to fetch listing");
            const d = await response.json();
            const data = d.postData;
            console.log("Fetched workLocation:", data.workLocation.district); // Already present

            // Map prefilled data to formData
            const newFormData = {
                gender: data.gender || "",
                userType: data.userType || "",
                otherUserType: data.otherUserType || "",
                contact_methods: {
                    call: data.contact_methods.call || { selected: false, value: "" },
                    whatsapp: data.contact_methods.whatsapp || { selected: false, value: "" },
                    instagram: data.contact_methods.instagram || { selected: false, value: "" },
                    linkedin: data.contact_methods.linkedin || { selected: false, value: "" },
                    facebook: data.contact_methods.facebook || { selected: false, value: "" },
                    other: data.contact_methods.other || { selected: false, value: "" },
                },
                aboutSelf: data.aboutSelf || "",
                headline: data.headline || "",
                domainName: "", // Will be set after fetching domains
                roleUnderDomain: "", // Will be set after fetching roles
                skills: data.skills.map((skill, idx) => ({
                    _id: `temp-${idx}`,
                    name: skill,
                })) || [],
                workBasis: {
                    Partnership: data.workBasis.Partnership || false,
                    Collaboration: data.workBasis.Collaboration || false,
                    Internship: data.workBasis.Internship || false,
                    Job: data.workBasis.Job || false,
                    Freelance: data.workBasis.Freelance || false,
                    ProjectBasis: data.workBasis.ProjectBasis || false,
                    PercentageBasis: data.workBasis.PercentageBasis || false,
                    EquityBasis: data.workBasis.EquityBasis || false,
                    Other: data.workBasis.Other || false,
                },
                partnershipCriteria: data.partnershipCriteria || "",
                internshipType: data.internshipType || null,
                internshipTimeType: data.internshipTimeType || null,
                jobTimeType: data.jobTimeType || null,
                internshipDuration: data.internshipDuration || { value: "", unit: "" },
                internshipStipendRange: data.internshipStipendRange || { min: "", max: "" },
                internshipPerformanceCriteria: data.internshipPerformanceCriteria || "",
                collaborationDescription: data.collaborationDescription || "",
                jobAmountRange: data.jobAmountRange || { min: "", max: "" },
                freelancePaymentRange: data.freelancePaymentRange || { min: "", max: "" },
                projectDescription: data.projectDescription || "",
                percentageBasisValue: data.percentageBasisValue || "",
                timeCommitment: data.timeCommitment || "",
                equityBasisValue: data.equityBasisValue || "",
                otherWorkBasis: data.otherWorkBasis || "",
                workMode: {
                    Remote: data.workMode.Remote || false,
                    Hybrid: data.workMode.Hybrid || false,
                    Onsite: data.workMode.Onsite || false,
                },
                workLocation:{
                    country:data.workLocation.country || "",
                    state:data.workLocation.state || "",
                    district:data.workLocation.district || "ewdwed",
                    
                },
                
                experience: data.experience || { years: "", months: "", days: "" },
                portfolioLink: data.portfolioLink || "",
                resumeLink: data.resumeLink || "",
                projects: data.projects.map((proj) => ({
                    title: proj.title,
                    description: proj.description,
                    link: proj.link,
                })) || [],
                workExperience: data.workExperience.map((exp) => ({
                    companyName: exp.company,
                    role: exp.role,
                    startDate: exp.duration.split(" - ")[0] || "",
                    endDate: exp.duration.split(" - ")[1] || "",
                    description: exp.description,
                })) || [],
                otherLinks: data.otherLinks.map((link) => ({
                    url: link.url || "",
                    title: link.title || "",
                })) || [],
                expectations: data.expectations || "",
                anyOtherInfo: data.anyOtherInfo || "",
            };

            console.log("Setting workLocation in formData:", newFormData.workLocation); // Add this
            setFormData(newFormData);

            // Fetch domains to set domainName and roleUnderDomain
            const domainResponse = await fetch(
                `http://localhost:3333/api/domain/get-all-domains`
            );
            const domainData = await domainResponse.json();
            const domain = domainData.domains.find(
                (d) => d.name === data.domainName
            );
            if (domain) {
                setDomainSearchText(domain.name);
                setFormData((prev) => ({ ...prev, domainName: domain._id }));
                const role = domain.roles.find(
                    (r) => r.name === data.roleUnderDomain
                );
                if (role) {
                    setRoleSearchText(role.name);
                    setFormData((prev) => ({
                        ...prev,
                        roleUnderDomain: role._id,
                    }));
                }
            }
        } catch (error) {
            setListingError("Failed to load listing data");
            console.error("Error fetching listing:", error);
        } finally {
            setLoadingListing(false);
        }
    };
    fetchListing();
}, [listingId]);

    // Fetch countries
    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    // Update states when country changes
    useEffect(() => {
        if (formData.workLocation.country) {
            setStates(State.getStatesOfCountry(formData.workLocation.country));
            setFormData((prev) => ({
                ...prev,
                workLocation: { ...prev.workLocation, state: "", district: "" },
            }));
            setDistricts([]);
        } else {
            setStates([]);
            setDistricts([]);
        }
    }, [formData.workLocation.country]);

    // Update districts when state changes
    useEffect(() => {
        if (formData.workLocation.state) {
            setDistricts(
                City.getCitiesOfState(
                    formData.workLocation.country,
                    formData.workLocation.state
                )
            );
            setFormData((prev) => ({
                ...prev,
                workLocation: { ...prev.workLocation, district: "" },
            }));
        } else {
            setDistricts([]);
        }
    }, [formData.workLocation.state]);

    // Fetch domains and roles
    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3333/api/domain/get-all-domains"
                );
                if (!response.ok) throw new Error("Failed to fetch domains");
                const data = await response.json();
                const sortedDomains = (data.domains || []).sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setDomains(sortedDomains);
                setFilteredDomains(sortedDomains);

                const rolesFromAllDomains = sortedDomains.reduce((acc, domain) => {
                    if (Array.isArray(domain.roles)) {
                        return [
                            ...acc,
                            ...domain.roles.map((role) => ({
                                ...role,
                                domainId: domain._id,
                            })),
                        ];
                    }
                    return acc;
                }, []);
                const uniqueRoles = Array.from(
                    new Map(rolesFromAllDomains.map((role) => [role._id, role])).values()
                );
                setAllRoles(uniqueRoles);
                setFilteredRoles(uniqueRoles);
            } catch (error) {
                console.error("Error fetching domains:", error);
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
        const fetchSkills = async () => {
            if (formData.domainName) {
                try {
                    const skillsResponse = await fetch(
                        `http://localhost:3333/api/skills/${formData.domainName}`
                    );
                    if (!skillsResponse.ok) throw new Error("Failed to fetch skills");
                    const skillsData = await skillsResponse.json();
                    setSkills(Array.isArray(skillsData.skills) ? skillsData.skills : []);
                    setFilteredSkills(Array.isArray(skillsData.skills) ? skillsData.skills : []);
                } catch (error) {
                    console.error("Error fetching skills:", error);
                    setSkills([]);
                    setFilteredSkills([]);
                }
            } else {
                setSkills([]);
                setFilteredSkills([]);
                setFormData((prev) => ({
                    ...prev,
                    roleUnderDomain: "",
                    skills: [],
                }));
                setRoleSearchText("");
                setSkillSearchText("");
                setShowSkillSuggestions(false);
            }
        };
        fetchSkills();
    }, [formData.domainName]);

    // Filter domains, roles, and skills
    useEffect(() => {
        setFilteredDomains(
            domainSearchText.trim()
                ? domains.filter((domain) =>
                      domain.name?.toLowerCase().startsWith(domainSearchText.toLowerCase())
                  )
                : domains
        );
    }, [domainSearchText, domains]);

    useEffect(() => {
        let filtered = formData.domainName
            ? allRoles.filter((role) => role.domainId === formData.domainName)
            : allRoles;
        if (roleSearchText.trim()) {
            filtered = filtered.filter((role) =>
                role.name?.toLowerCase().startsWith(roleSearchText.toLowerCase())
            );
        }
        setFilteredRoles(filtered);
    }, [roleSearchText, allRoles, formData.domainName]);

    useEffect(() => {
        setFilteredSkills(
            skillSearchText.trim()
                ? skills.filter((skill) =>
                      skill.name?.toLowerCase().startsWith(skillSearchText.toLowerCase())
                  )
                : skills
        );
    }, [skillSearchText, skills]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "userType" && value !== "Other" ? { otherUserType: "" } : {}),
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
            ...(name === "userType" && value !== "Other" ? { otherUserType: "" } : {}),
        }));
    };

    const handleNestedChange = (field, subField, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: { ...prev[field], [subField]: value },
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: { ...prev[field], [subField]: "" },
        }));
    };

    const handleContactMethodChange = (method) => {
        setFormData((prev) => ({
            ...prev,
            contact_methods: {
                ...prev.contact_methods,
                [method]: {
                    ...prev.contact_methods[method],
                    selected: !prev.contact_methods[method].selected,
                    value: prev.contact_methods[method].selected ? "" : prev.contact_methods[method].value,
                },
            },
        }));
        setErrors((prev) => ({
            ...prev,
            contact_methods: "",
            [`${method}Value`]: "",
        }));
    };

    const handleContactValueChange = (method, value) => {
        setFormData((prev) => ({
            ...prev,
            contact_methods: {
                ...prev.contact_methods,
                [method]: { ...prev.contact_methods[method], value },
            },
        }));
        setErrors((prev) => ({ ...prev, [`${method}Value`]: "" }));
    };

    const handleWorkBasisChange = (basis) => {
        setFormData((prev) => {
            const isDeselecting = prev.workBasis[basis];
            const updatedFormData = {
                ...prev,
                workBasis: { ...prev.workBasis, [basis]: !prev.workBasis[basis] },
            };
            if (isDeselecting) {
                if (basis === "Internship") {
                    updatedFormData.internshipType = null;
                    updatedFormData.internshipTimeType = null;
                    updatedFormData.internshipDuration = { value: "", unit: "" };
                    updatedFormData.internshipStipendRange = { min: "", max: "" };
                    updatedFormData.internshipPerformanceCriteria = "";
                } else if (basis === "Partnership") {
                    updatedFormData.partnershipCriteria = "";
                } else if (basis === "Collaboration") {
                    updatedFormData.collaborationDescription = "";
                } else if (basis === "Job") {
                    updatedFormData.jobTimeType = null;
                    updatedFormData.jobAmountRange = { min: "", max: "" };
                } else if (basis === "Freelance") {
                    updatedFormData.freelancePaymentRange = { min: "", max: "" };
                } else if (basis === "ProjectBasis") {
                    updatedFormData.projectDescription = "";
                } else if (basis === "PercentageBasis") {
                    updatedFormData.percentageBasisValue = "";
                } else if (basis === "EquityBasis") {
                    updatedFormData.equityBasisValue = "";
                } else if (basis === "Other") {
                    updatedFormData.otherWorkBasis = "";
                }
            }
            return updatedFormData;
        });
        setErrors((prev) => ({
            ...prev,
            workBasis: "",
            partnershipCriteria: "",
            internshipType: "",
            internshipTimeType: "",
            jobTimeType: "",
            internshipDuration: { value: "", unit: "" },
            internshipStipendRange: { min: "", max: "" },
            internshipPerformanceCriteria: "",
            collaborationDescription: "",
            jobAmountRange: { min: "", max: "" },
            freelancePaymentRange: { min: "", max: "" },
            projectDescription: "",
            percentageBasisValue: "",
            equityBasisValue: "",
            otherWorkBasis: "",
        }));
    };

    const handleWorkModeChange = (mode) => {
        setFormData((prev) => ({
            ...prev,
            workMode: { ...prev.workMode, [mode]: !prev.workMode[mode] },
            workLocation: prev.workMode[mode]
                ? { country: "", state: "", district: "" }
                : prev.workLocation,
        }));
        setErrors((prev) => ({
            ...prev,
            workMode: "",
            workLocation: { country: "", state: "", district: "" },
        }));
    };

    const handleInternshipTypeChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            internshipType: value,
            internshipTimeType: null,
            internshipDuration: value ? prev.internshipDuration : { value: "", unit: "" },
            internshipStipendRange: value === "Paid" ? prev.internshipStipendRange : { min: "", max: "" },
            internshipPerformanceCriteria: value === "PerformanceBased" ? prev.internshipPerformanceCriteria : "",
        }));
        setErrors((prev) => ({
            ...prev,
            internshipType: "",
            internshipTimeType: "",
            internshipStipendRange: { min: "", max: "" },
            internshipPerformanceCriteria: "",
        }));
    };

    const handleInternshipTimeTypeChange = (value) => {
        setFormData((prev) => ({ ...prev, internshipTimeType: value }));
        setErrors((prev) => ({ ...prev, internshipTimeType: "" }));
    };

    const handleDomainInput = (e) => {
        setDomainSearchText(e.target.value);
        setShowDomainSuggestions(true);
    };

    const handleDomainFocus = () => setShowDomainSuggestions(true);
    const handleDomainBlur = () => setTimeout(() => setShowDomainSuggestions(false), 200);

    const handleDomainSelect = (domain) => {
        setFormData((prev) => ({
            ...prev,
            domainName: domain._id,
            roleUnderDomain: "",
            skills: [],
        }));
        setDomainSearchText(domain.name);
        setRoleSearchText("");
        setFilteredRoles(allRoles.filter((role) => role.domainId === domain._id));
        setShowDomainSuggestions(false);
        setErrors((prev) => ({ ...prev, domainName: "" }));
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
        setErrors((prev) => ({ ...prev, roleUnderDomain: "", domainName: "" }));
    };

    const handleSkillInput = (e) => {
        setSkillSearchText(e.target.value);
        setShowSkillSuggestions(e.target.value.length > 0);
    };

    const handleSkillSelect = (skill) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.some((s) => s._id === skill._id)
                ? prev.skills
                : [...prev.skills, skill],
        }));
        setSkillSearchText("");
        setShowSkillSuggestions(false);
        setErrors((prev) => ({ ...prev, skills: "" }));
    };

    const handleSkillRemove = (skillId) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s._id !== skillId),
        }));
    };

    const handleProjectChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedProjects = [...prev.projects];
            updatedProjects[index] = { ...updatedProjects[index], [field]: value };
            return { ...prev, projects: updatedProjects };
        });
    };

    const handleAddProject = () => {
        setFormData((prev) => ({
            ...prev,
            projects: [...prev.projects, { title: "", description: "", link: "" }],
        }));
    };

    const handleRemoveProject = (index) => {
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
        }));
    };

    const handleWorkExperienceChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedWorkExperience = [...prev.workExperience];
            updatedWorkExperience[index] = { ...updatedWorkExperience[index], [field]: value };
            return { ...prev, workExperience: updatedWorkExperience };
        });
    };

    const handleAddWorkExperience = () => {
        setFormData((prev) => ({
            ...prev,
            workExperience: [
                ...prev.workExperience,
                { startDate: "", endDate: "", role: "", companyName: "", description: "" },
            ],
        }));
    };

    const handleRemoveWorkExperience = (index) => {
        setFormData((prev) => ({
            ...prev,
            workExperience: prev.workExperience.filter((_, i) => i !== index),
        }));
    };

  const handleAddOtherLink = () => {
    setFormData((prev) => ({
        ...prev,
        otherLinks: [...prev.otherLinks, { url: "", title: "" }],
    }));
};

    const handleOtherLinkChange = (index, field, value) => {
    setFormData((prev) => {
        const updatedLinks = [...prev.otherLinks];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value };
        return { ...prev, otherLinks: updatedLinks };
    });
};
const handleRemoveOtherLink = (index) => {
    setFormData((prev) => ({
        ...prev,
        otherLinks: prev.otherLinks.filter((_, i) => i !== index),
    }));
};

    const enhanceField = async (fieldName, value, index = null, nestedField = null) => {
        setEnhanceLoading((prev) => ({
            ...prev,
            [`${fieldName}${index !== null ? index : ""}`]: true,
        }));
        try {
            const response = await axios.post(
                "http://localhost:3333/api/enhance/process-field",
                {
                    field: nestedField
                        ? `${fieldName}[${index}].${nestedField}`
                        : index !== null
                        ? `${fieldName}[${index}]`
                        : fieldName,
                    content: value,
                    enhance: true,
                }
            );
            setFormData((prev) => {
                if (index !== null && nestedField) {
                    const updatedArray = [...prev[fieldName]];
                    updatedArray[index] = {
                        ...updatedArray[index],
                        [nestedField]: response.data[fieldName]?.[nestedField] || value,
                    };
                    return { ...prev, [fieldName]: updatedArray };
                } else if (index !== null) {
                    const updatedArray = [...prev[fieldName]];
                    updatedArray[index] = response.data[fieldName] || value;
                    return { ...prev, [fieldName]: updatedArray };
                }
                return { ...prev, [fieldName]: response.data[fieldName] || value };
            });
        } catch (error) {
            alert(`Enhancement failed for ${fieldName}`);
            console.error("Enhance error:", error);
        } finally {
            setEnhanceLoading((prev) => ({
                ...prev,
                [`${fieldName}${index !== null ? index : ""}`]: false,
            }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.userType) newErrors.userType = "User type is required";
        if (formData.userType === "Other" && !formData.otherUserType.trim())
            newErrors.otherUserType = "Please specify user type";

        const selectedContacts = Object.values(formData.contact_methods).filter(
            (method) => method.selected
        ).length;
        if (selectedContacts < 2)
            newErrors.contact_methods = "Please select at least two contact methods";

        Object.entries(formData.contact_methods).forEach(([method, { selected, value }]) => {
            if (selected && !value.trim()) {
                newErrors[`${method}Value`] = `Please provide your ${method} ${
                    method === "whatsapp" || method === "call" ? "number" : "URL"
                }`;
            }  else if (
                    selected &&
                    (method === "whatsapp" || method === "call") &&
                    !/^\d{12}$/.test(value)
                ) {
                    newErrors[
                        `${method}Value`
                    ] = `Please provide a valid 10-digit ${method} number`;
                } else if (
                selected &&
                !["whatsapp", "call"].includes(method) &&
                !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(value)
            ) {
                newErrors[`${method}Value`] = `Please provide a valid ${method} URL (must start with https://)`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.headline.trim()) newErrors.headline = "Headline is required";
        if (!formData.domainName) newErrors.domainName = "Domain is required";
        if (!formData.roleUnderDomain) newErrors.roleUnderDomain = "Role is required";
        if (formData.skills.length === 0) newErrors.skills = "At least one skill is required";
        if (!Object.values(formData.workBasis).some((selected) => selected))
            newErrors.workBasis = "At least one work basis is required";

        if (formData.workBasis.Partnership && !formData.partnershipCriteria.trim())
            newErrors.partnershipCriteria = "Partnership criteria is required";
        if (formData.workBasis.Internship) {
            if (!formData.internshipTimeType)
                newErrors.internshipTimeType = "Please specify internship time type";
            if (!formData.internshipType)
                newErrors.internshipType = "Please specify internship type";
            if (
                !formData.internshipDuration.value.trim() ||
                isNaN(formData.internshipDuration.value) ||
                Number(formData.internshipDuration.value) <= 0
            )
                newErrors.internshipDuration = {
                    ...newErrors.internshipDuration,
                    value: "Valid duration is required",
                };
            if (!formData.internshipDuration.unit)
                newErrors.internshipDuration = {
                    ...newErrors.internshipDuration,
                    unit: "Duration unit is required",
                };
            if (formData.internshipType === "Paid") {
                if (
                    !formData.internshipStipendRange.min.trim() ||
                    isNaN(formData.internshipStipendRange.min) ||
                    Number(formData.internshipStipendRange.min) < 0
                )
                    newErrors.internshipStipendRange = {
                        ...newErrors.internshipStipendRange,
                        min: "Valid minimum stipend is required",
                    };
                if (
                    !formData.internshipStipendRange.max.trim() ||
                    isNaN(formData.internshipStipendRange.max) ||
                    Number(formData.internshipStipendRange.max) < Number(formData.internshipStipendRange.min)
                )
                    newErrors.internshipStipendRange = {
                        ...newErrors.internshipStipendRange,
                        max: "Valid maximum stipend is required",
                    };
            }
            if (formData.internshipType === "PerformanceBased" && !formData.internshipPerformanceCriteria.trim())
                newErrors.internshipPerformanceCriteria = "Performance criteria is required";
        }
        if (formData.workBasis.Collaboration && !formData.collaborationDescription.trim())
            newErrors.collaborationDescription = "Collaboration description is required";
        if (formData.workBasis.Job) {
            if (!formData.jobTimeType) newErrors.jobTimeType = "Please specify job time type";
            const min = Number(formData.jobAmountRange.min);
            const max = Number(formData.jobAmountRange.max);
            if (
                !formData.jobAmountRange.min.trim() ||
                isNaN(min) ||
                min < 0 ||
                !Number.isInteger(min)
            )
                newErrors.jobAmountRange = {
                    ...newErrors.jobAmountRange,
                    min: "Valid whole number minimum amount is required",
                };
            if (
                !formData.jobAmountRange.max.trim() ||
                isNaN(max) ||
                max < min ||
                !Number.isInteger(max)
            )
                newErrors.jobAmountRange = {
                    ...newErrors.jobAmountRange,
                    max: "Valid whole number maximum amount must be at least the minimum",
                };
        }
        if (formData.workBasis.Freelance) {
            if (
                !formData.freelancePaymentRange.min.trim() ||
                isNaN(formData.freelancePaymentRange.min) ||
                Number(formData.freelancePaymentRange.min) < 0
            )
                newErrors.freelancePaymentRange = {
                    ...newErrors.freelancePaymentRange,
                    min: "Valid minimum payment is required",
                };
            if (
                !formData.freelancePaymentRange.max.trim() ||
                isNaN(formData.freelancePaymentRange.max) ||
                Number(formData.freelancePaymentRange.max) < Number(formData.freelancePaymentRange.min)
            )
                newErrors.freelancePaymentRange = {
                    ...newErrors.freelancePaymentRange,
                    max: "Valid maximum payment is required",
                };
        }
        if (formData.workBasis.ProjectBasis && !formData.projectDescription.trim())
            newErrors.projectDescription = "Project description is required";
        if (formData.workBasis.PercentageBasis && !formData.percentageBasisValue.trim())
            newErrors.percentageBasisValue = "Percentage value is required";
        if (formData.workBasis.EquityBasis && !formData.equityBasisValue.trim())
            newErrors.equityBasisValue = "Equity value is required";
        if (formData.workBasis.Other && !formData.otherWorkBasis.trim())
            newErrors.otherWorkBasis = "Please specify work basis";
        if (!Object.values(formData.workMode).some((selected) => selected))
            newErrors.workMode = "At least one work mode is required";
        if (formData.workMode.Hybrid || formData.workMode.Onsite) {
            if (!formData.workLocation.country)
                newErrors.workLocation = {
                    ...newErrors.workLocation,
                    country: "Country is required",
                };
            if (!formData.workLocation.state)
                newErrors.workLocation = {
                    ...newErrors.workLocation,
                    state: "State is required",
                };
            if (!formData.workLocation.district)
                newErrors.workLocation = {
                    ...newErrors.workLocation,
                    district: "District is required",
                };
        }
        if (
            !formData.experience.years.trim() &&
            !formData.experience.months.trim() &&
            !formData.experience.days.trim()
        ) {
            newErrors.experience = { years: "At least one experience field is required" };
        } else {
            if (
                formData.experience.years &&
                (isNaN(formData.experience.years) || Number(formData.experience.years) < 0)
            )
                newErrors.experience = {
                    ...newErrors.experience,
                    years: "Valid years are required",
                };
            if (
                formData.experience.months &&
                (isNaN(formData.experience.months) ||
                    Number(formData.experience.months) < 0 ||
                    Number(formData.experience.months) > 11)
            )
                newErrors.experience = {
                    ...newErrors.experience,
                    months: "Valid months (0-11) are required",
                };
            if (
                formData.experience.days &&
                (isNaN(formData.experience.days) ||
                    Number(formData.experience.days) < 0 ||
                    Number(formData.experience.days) > 30)
            )
                newErrors.experience = {
                    ...newErrors.experience,
                    days: "Valid days (0-30) are required",
                };
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};
        if (
            formData.portfolioLink &&
            !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(formData.portfolioLink)
        )
            newErrors.portfolioLink = "Invalid URL (must start with https://)";
        if (
            formData.resumeLink &&
            !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(formData.resumeLink)
        )
            newErrors.resumeLink = "Invalid URL (must start with https://)";
        formData.projects.forEach((project, index) => {
            if (
                project.link &&
                !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(project.link)
            ) {
                newErrors[`projectLink${index}`] = "Invalid URL (must start with https://)";
            }
        });
        formData.otherLinks.forEach((link, index) => {
            if (
                link &&
                !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(link)
            ) {
                newErrors[`otherLink${index}`] = "Invalid URL (must start with https://)";
            }
            // Optional: Add validation for title if you want it to be required
        if (!link.title.trim()) {
            newErrors[`otherLinkTitle${index}`] = "Title is required";
        }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async () => {
        let isValid = false;
        if (step === 1) isValid = validateStep1();
        else if (step === 2) isValid = validateStep2();
        if (isValid) setStep(step + 1);
    };

    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep3()) {
            try {
                const domain = domains.find((d) => d._id === formData.domainName);
                const role = allRoles.find((r) => r._id === formData.roleUnderDomain);
                const submitData = {
                    ...formData,
                    domainName: domain ? domain.name : "",
                    roleUnderDomain: role ? role.name : "",
                    skills: formData.skills.map((skill) => skill.name),
                    workBasis: Object.keys(formData.workBasis).filter(
                        (key) => formData.workBasis[key]
                    ),
                    workMode: Object.keys(formData.workMode)
                        .filter((key) => formData.workMode[key])
                        .join(", "),
                    call: formData.contact_methods.call.selected ? formData.contact_methods.call.value : "",
                    whatsapp: formData.contact_methods.whatsapp.selected ? formData.contact_methods.whatsapp.value : "",
                    instagram: formData.contact_methods.instagram.selected ? formData.contact_methods.instagram.value : "",
                    linkedin: formData.contact_methods.linkedin.selected ? formData.contact_methods.linkedin.value : "",
                    facebook: formData.contact_methods.facebook.selected ? formData.contact_methods.facebook.value : "",
                    otherContact: formData.contact_methods.other.selected ? formData.contact_methods.other.value : "",
                    workCountry: formData.workLocation.country,
                    workState: formData.workLocation.state,
                    workCity: formData.workLocation.district,
                    internshipTimeType: formData.internshipTimeType || "",
                    jobTimeType: formData.jobTimeType || "",
                    internshipDuration:
                        formData.workBasis.Internship &&
                        formData.internshipDuration.value &&
                        formData.internshipDuration.unit
                            ? `${formData.internshipDuration.value} ${formData.internshipDuration.unit}`
                            : "",
                    freelancePaymentRange:
                        formData.workBasis.Freelance &&
                        formData.freelancePaymentRange.min &&
                        formData.freelancePaymentRange.max
                            ? `${formData.freelancePaymentRange.min}-${formData.freelancePaymentRange.max} rupees`
                            : "",
                    internshipStipendRange:
                        formData.internshipType === "Paid" &&
                        formData.internshipStipendRange.min &&
                        formData.internshipStipendRange.max
                            ? `${formData.internshipStipendRange.min}-${formData.internshipStipendRange.max} rupees`
                            : "",
                    experience:
                        formData.experience.years || formData.experience.months || formData.experience.days
                            ? `${formData.experience.years || 0} years, ${formData.experience.months || 0} months, ${formData.experience.days || 0} days`
                            : "",
                    jobAmountRange:
                        formData.workBasis.Job &&
                        formData.jobAmountRange.min &&
                        formData.jobAmountRange.max
                            ? `${formData.jobAmountRange.min}-${formData.jobAmountRange.max} rupees`
                            : "",
                    workExperience: formData.workExperience.map((exp) => ({
                        company: exp.companyName,
                        role: exp.role,
                        duration:
                            exp.startDate && exp.endDate
                                ? `${exp.startDate} - ${exp.endDate}`
                                : exp.startDate || "",
                        description: exp.description,
                    })),
                    // otherLinks: formData.otherLinks,
                    otherLinks: formData.otherLinks.map((url, index) => ({
                        url,
                        title: `Link ${index + 1}`,
                    })),
                };
                delete submitData.contact_methods;
                delete submitData.workLocation;
                const response = await fetch(
                    `http://localhost:3333/api/get-discovered/update-post/${listingId}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(submitData),
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    console.log("Form updated:", submitData);
                    onClose();
                } else {
                    setErrors({ submit: "Failed to update the form. Please try again." });
                }
            } catch (err) {
                setErrors({ submit: "An error occurred. Please try again." });
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            gender: "",
            userType: "",
            otherUserType: "",
            contact_methods: {
                call: { selected: false, value: "" },
                whatsapp: { selected: false, value: "" },
                instagram: { selected: false, value: "" },
                linkedin: { selected: false, value: "" },
                facebook: { selected: false, value: "" },
                other: { selected: false, value: "" },
            },
            aboutSelf: "",
            headline: "",
            domainName: "",
            roleUnderDomain: "",
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
            partnershipCriteria: "",
            internshipType: null,
            internshipTimeType: null,
            jobTimeType: null,
            internshipDuration: { value: "", unit: "" },
            internshipStipendRange: { min: "", max: "" },
            internshipPerformanceCriteria: "",
            collaborationDescription: "",
            jobAmountRange: { min: "", max: "" },
            freelancePaymentRange: { min: "", max: "" },
            projectDescription: "",
            percentageBasisValue: "",
            timeCommitment: "",
            equityBasisValue: "",
            otherWorkBasis: "",
            workMode: { Remote: false, Hybrid: false, Onsite: false },
            workLocation: { country: "", state: "", district: "" },
            experience: { years: "", months: "", days: "" },
            portfolioLink: "",
            resumeLink: "",
            projects: [],
            workExperience: [],
            otherLinks: [],
            expectations: "",
            anyOtherInfo: "",
        });
        setDomainSearchText("");
        setRoleSearchText("");
        setSkillSearchText("");
        setShowDomainSuggestions(false);
        setShowRoleSuggestions(false);
        setShowSkillSuggestions(false);
        setStep(1);
        setErrors({});
        onClose();
    };

    if (loadingListing) return <div>Loading listing data...</div>;
    if (listingError) return <div className="text-red-500">{listingError}</div>;

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl w-full">
            <div className="h-20 flex items-center justify-center gap-5 rounded-t-2xl mb-6 border-b border-gray-200 w-[50%] mx-auto text-xl">
                <div className="flex flex-col">
                    <p className="flex items-center gap-2">
                        01 <span className="text-sm text-violet-600">About You</span>
                    </p>
                    <div className="flex items-center gap-1">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 bg-violet-600">
                            ✓
                        </div>
                        <div className={`w-[150px] h-1 ${step > 1 ? "bg-violet-600" : "bg-gray-200"}`}></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="flex items-center gap-2">
                        02 <span className={`text-sm ${step > 1 ? "text-violet-600" : "text-black"}`}>Skills and Strength</span>
                    </p>
                    <div className="flex items-center gap-1">
                        <div className={`flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 ${step > 1 ? "bg-violet-600" : "bg-white"}`}>
                            ✓
                        </div>
                        <div className={`w-[150px] h-1 ${step > 2 ? "bg-violet-600" : "bg-gray-200"}`}></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="flex items-center gap-2 w-[150px]">
                        03 <span className={`text-sm ${step > 2 ? "text-violet-600" : "text-black"}`}>Portfolio</span>
                    </p>
                    <div className="flex items-center gap-1">
                        <div className={`flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 ${step > 2 ? "bg-violet-600" : "bg-white"}`}>
                            ✓
                        </div>
                    </div>
                </div>
            </div>

            {step === 1 && (
                <div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5">
                    <div className="flex flex-col">
                        <p className="text-violet-700 text-xl">Update Your Story</p>
                        <p className="text-violet-400">Revise how you present yourself and how to be reached — keep it authentic.</p>
                    </div>
                    <img src="./FormImage1.svg" alt="" className="scale-150" />
                </div>
            )}

            {step === 2 && (
                <div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5">
                    <div className="flex flex-col">
                        <p className="text-violet-700 text-xl">Update Your Strengths</p>
                        <p className="text-violet-400">Refine your skills and work preferences — show what you’re capable of.</p>
                    </div>
                    <img src="./FormImage2.svg" alt="" className="" />
                </div>
            )}

            {step === 3 && (
                <div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5">
                    <div className="flex flex-col">
                        <p className="text-violet-700 text-xl">Update Your Portfolio</p>
                        <p className="text-violet-400">Refresh your work and experience — make your profile stand out.</p>
                    </div>
                    <img src="./FormImage3.svg" alt="" className="" />
                </div>
            )}

            {step === 1 && (
                <form className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <h3 className="col-span-3 text-xl font-semibold text-[#7900BF] mb-4">Update your introduction.</h3>
                    <div className="relative">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 border-gray-300"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to specify">Prefer not to specify</option>
                        </select>
                    </div>
                    <div className="relative col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            You are a <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {["Working Professional", "Freelancer", "Student", "Other"].map((type) => (
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
                        {formData.userType === "Other" && (
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
                                        errors.otherUserType ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.otherUserType && <p className="text-red-500 text-sm mt-1">{errors.otherUserType}</p>}
                            </div>
                        )}
                    </div>
                    <div className="relative col-span-2">
                        <label htmlFor="aboutSelf" className="block text-sm font-medium text-gray-700 mb-1">About Yourself</label>
                        <div className="relative">
                            <textarea
                                id="aboutSelf"
                                name="aboutSelf"
                                value={formData.aboutSelf}
                                onChange={handleChange}
                                maxLength={300}
                                placeholder="Briefly describe yourself"
                                className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px]"
                            />
                            <button
                                type="button"
                                onClick={() => enhanceField("aboutSelf", formData.aboutSelf)}
                                disabled={enhanceLoading.aboutSelf}
                                className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                                    enhanceLoading.aboutSelf ? "animate-pulse" : ""
                                }`}
                                title={enhanceLoading.aboutSelf ? "Enhancing..." : "Enhance"}
                            >
                                <FaMagic className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="relative col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            How people can reach out to you (select at least two) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {["call", "whatsapp", "instagram", "linkedin", "facebook", "other"].map((method) => (
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
                        <div className="mt-4 space-y-4 grid grid-cols-3 gap-10">
                            {Object.entries(formData.contact_methods).map(([method, { selected, value }]) =>
                                selected && (
                                    <div key={method} className="relative">
                                        <label htmlFor={`${method}Value`} className="block font-medium mb-1 text-black opacity-[73%]">
                                            {method.charAt(0).toUpperCase() + method.slice(1)}{" "}
                                            {method === "whatsapp" || method === "call" ? "Number" : "URL"} <span className="text-red-500">*</span>
                                        </label>
                                        {method === "call" || method === "whatsapp" ? (
                                            <PhoneInput
                                                country="us"
                                                value={value}
                                                onChange={(phone) => handleContactValueChange(method, phone)}
                                                containerClass="w-full"
                                                inputClass={`w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                                                    errors[`${method}Value`] ? "border-red-500" : ""
                                                }`}
                                                buttonClass="border-gray-300 h-14 w-16"
                                                dropdownClass="h-28"
                                                containerStyle={{ height: "56px", width: "100%" }}
                                                inputStyle={{ height: "43px", width: "100%" }}
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
                                        ) : (
                                            <input
                                                id={`${method}Value`}
                                                type="url"
                                                value={value}
                                                onChange={(e) => handleContactValueChange(method, e.target.value)}
                                                placeholder={`Enter your ${method} URL (https://)`}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                                    errors[`${method}Value`] ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                        )}
                                        {errors[`${method}Value`] && <p className="text-red-500 text-sm mt-1">{errors[`${method}Value`]}</p>}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="col-span-3 flex justify-between space-x-4 mt-6">
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
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        >
                            Next Step
                        </button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <h3 className="col-span-2 text-xl font-semibold text-blue-600 mb-4">Update your skills and preferences.</h3>
                    <div className="relative col-span-2">
                        <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
                            Headline (e.g., I am a...) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="headline"
                                name="headline"
                                value={formData.headline}
                                onChange={handleChange}
                                maxLength={80}
                                placeholder="Enter a catchy headline"
                                className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                    errors.headline ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => enhanceField("headline", formData.headline)}
                                disabled={enhanceLoading.headline}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 disabled:text-blue-300 ${
                                    enhanceLoading.headline ? "animate-pulse" : ""
                                }`}
                                title={enhanceLoading.headline ? "Enhancing..." : "Enhance"}
                            >
                                <FaMagic className="w-5 h-5" />
                            </button>
                        </div>
                        {errors.headline && <p className="text-red-500 text-sm mt-1">{errors.headline}</p>}
                    </div>
                    <div className="relative">
                        <label htmlFor="roleUnderDomain" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Role <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="roleUnderDomain"
                            value={roleSearchText}
                            onChange={handleRoleInput}
                            onFocus={handleRoleFocus}
                            onBlur={handleRoleBlur}
                            placeholder="Type to search roles"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-600 hover:border-blue-400 ${
                                errors.roleUnderDomain ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {showRoleSuggestions && filteredRoles.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                                {filteredRoles.map((role) => (
                                    <li
                                        key={role._id}
                                        onMouseDown={() => handleRoleSelect(role)}
                                        className="px-4 py-1 hover:bg-blue-100 cursor-pointer"
                                    >
                                        {role.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {errors.roleUnderDomain && <p className="text-red-500 text-sm mt-1">{errors.roleUnderDomain}</p>}
                    </div>
                    <div className="relative">
                        <label htmlFor="domainName" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Domain <span className="text-red-500">*</span>
                        </label>
                        {loadingDomains ? (
                            <p className="text-gray-500">Loading domains...</p>
                        ) : (
                            <>
                                <input
                                    id="domainName"
                                    value={domainSearchText}
                                    onChange={handleDomainInput}
                                    onFocus={handleDomainFocus}
                                    onBlur={handleDomainBlur}
                                    placeholder="Type to search domains"
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-600 hover:border-blue-400 ${
                                        errors.domainName ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {showDomainSuggestions && filteredDomains.length > 0 && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                                        {filteredDomains.map((domain) => (
                                            <li
                                                key={domain._id}
                                                onMouseDown={() => handleDomainSelect(domain)}
                                                className="px-4 py-1 hover:bg-blue-100 cursor-pointer"
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
                    {formData.domainName && (
                        <div className="relative col-span-2">
                            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                                Skills <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="skills"
                                value={skillSearchText}
                                onChange={handleSkillInput}
                                placeholder="Type to search skills"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                    errors.skills ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {showSkillSuggestions && filteredSkills.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                                    {filteredSkills
                                        .filter((skill) => !formData.skills.some((s) => s._id === skill._id))
                                        .map((skill) => (
                                            <li
                                                key={skill._id}
                                                onClick={() => handleSkillSelect(skill)}
                                                className="px-4 py-1 hover:bg-blue-100 cursor-pointer"
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
                                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                    >
                                        {skill.name}
                                        <button
                                            type="button"
                                            onClick={() => handleSkillRemove(skill._id)}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
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
                            {[
                                "Partnership",
                                "Collaboration",
                                "EquityBasis",
                                "ProjectBasis",
                                "PercentageBasis",
                                "Job",
                                "Internship",
                                "Freelance",
                                "Other",
                            ].map((basis) => (
                                <div key={basis} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={basis}
                                        checked={formData.workBasis[basis]}
                                        onChange={() => handleWorkBasisChange(basis)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor={basis} className="ml-2 text-gray-700">
                                        {basis.replace(/([A-Z])/g, " $1").trim()}
                                    </label>
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
                                    <div className="relative">
                                        <textarea
                                            id="partnershipCriteria"
                                            name="partnershipCriteria"
                                            value={formData.partnershipCriteria}
                                            onChange={handleChange}
                                            placeholder="Describe the partnership criteria"
                                            className={`w-full pr-10 px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-y min-h-[100px] ${
                                                errors.partnershipCriteria ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => enhanceField("partnershipCriteria", formData.partnershipCriteria)}
                                            disabled={enhanceLoading.partnershipCriteria}
                                            className={`absolute right-3 top-3 text-blue-600 hover:text-blue-800 disabled:text-gray-300 ${
                                                enhanceLoading.partnershipCriteria ? "animate-pulse" : ""
                                            }`}
                                            title={enhanceLoading.partnershipCriteria ? "Enhancing..." : "Enhance"}
                                        >
                                            <FaMagic className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {errors.partnershipCriteria && (
                                        <p className="text-red-500 text-sm mt-1">{errors.partnershipCriteria}</p>
                                    )}
                                </div>
                            )}
                            {formData.workBasis.Internship && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Internship Time Type <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-4">
                                            {["FullTime", "PartTime"].map((type) => (
                                                <label key={type} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="internshipTimeType"
                                                        value={type}
                                                        checked={formData.internshipTimeType === type}
                                                        onChange={() => handleInternshipTimeTypeChange(type)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        {type === "FullTime" ? "Full-time" : "Part-time"}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.internshipTimeType && (
                                            <p className="text-red-500 text-sm mt-1">{errors.internshipTimeType}</p>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Internship Type <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-4">
                                            {["Paid", "Unpaid", "PerformanceBased"].map((type) => (
                                                <label key={type} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="internshipType"
                                                        value={type}
                                                        checked={formData.internshipType === type}
                                                        onChange={() => handleInternshipTypeChange(type)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        {type.replace(/([A-Z])/g, " $1").trim()}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.internshipType && (
                                            <p className="text-red-500 text-sm mt-1">{errors.internshipType}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="relative flex-1">
                                            <label htmlFor="internshipDurationValue" className="block text-sm font-medium text-gray-700 mb-1">
                                                Internship Duration <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="internshipDurationValue"
                                                type="number"
                                                value={formData.internshipDuration.value}
                                                onChange={(e) => handleNestedChange("internshipDuration", "value", e.target.value)}
                                                placeholder="Duration"
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                    errors.internshipDuration?.value ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                            {errors.internshipDuration?.value && (
                                                <p className="text-red-500 text-sm mt-1">{errors.internshipDuration.value}</p>
                                            )}
                                        </div>
                                        <div className="relative flex-1">
                                            <label htmlFor="internshipDurationUnit" className="block text-sm font-medium text-gray-700 mb-1">
                                                Unit <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="internshipDurationUnit"
                                                value={formData.internshipDuration.unit}
                                                onChange={(e) => handleNestedChange("internshipDuration", "unit", e.target.value)}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                    errors.internshipDuration?.unit ? "border-red-500" : "border-gray-300"
                                                }`}
                                            >
                                                <option value="">Select Unit</option>
                                                <option value="Days">Days</option>
                                                <option value="Weeks">Weeks</option>
                                                <option value="Months">Months</option>
                                            </select>
                                            {errors.internshipDuration?.unit && (
                                                <p className="text-red-500 text-sm mt-1">{errors.internshipDuration.unit}</p>
                                            )}
                                        </div>
                                    </div>
                                    {formData.internshipType === "Paid" && (
                                        <div className="flex gap-4">
                                            <div className="relative flex-1">
                                                <label htmlFor="internshipStipendRangeMin" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Minimum Stipend (₹) <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="internshipStipendRangeMin"
                                                    type="number"
                                                    value={formData.internshipStipendRange.min}
                                                    onChange={(e) => handleNestedChange("internshipStipendRange", "min", e.target.value)}
                                                    placeholder="Min Stipend"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                        errors.internshipStipendRange?.min ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                />
                                                {errors.internshipStipendRange?.min && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.internshipStipendRange.min}</p>
                                                )}
                                            </div>
                                            <div className="relative flex-1">
                                                <label htmlFor="internshipStipendRangeMax" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Maximum Stipend (₹) <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="internshipStipendRangeMax"
                                                    type="number"
                                                    value={formData.internshipStipendRange.max}
                                                    onChange={(e) => handleNestedChange("internshipStipendRange", "max", e.target.value)}
                                                    placeholder="Max Stipend"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                        errors.internshipStipendRange?.max ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                />
                                                {errors.internshipStipendRange?.max && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.internshipStipendRange.max}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {formData.internshipType === "PerformanceBased" && (
                                        <div className="relative">
                                            <label htmlFor="internshipPerformanceCriteria" className="block text-sm font-medium text-gray-700 mb-1">
                                                Performance Criteria <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    id="internshipPerformanceCriteria"
                                                    name="internshipPerformanceCriteria"
                                                    value={formData.internshipPerformanceCriteria}
                                                    onChange={handleChange}
                                                    placeholder="Describe performance criteria"
                                                    className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-y min-h-[100px] ${
                                                        errors.internshipPerformanceCriteria ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        enhanceField("internshipPerformanceCriteria", formData.internshipPerformanceCriteria)
                                                    }
                                                    disabled={enhanceLoading.internshipPerformanceCriteria}
                                                    className={`absolute right-3 top-3 text-blue-600 hover:text-blue-800 disabled:text-blue-300 ${
                                                        enhanceLoading.internshipPerformanceCriteria ? "animate-pulse" : ""
                                                    }`}
                                                    title={enhanceLoading.internshipPerformanceCriteria ? "Enhancing..." : "Enhance"}
                                                >
                                                    <FaMagic className="w-5 h-5" />
                                                </button>
                                            </div>
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
                                        Collaboration Description <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="collaborationDescription"
                                            name="collaborationDescription"
                                            value={formData.collaborationDescription}
                                            onChange={handleChange}
                                            placeholder="Describe the collaboration"
                                            className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-y min-h-[100px] ${
                                                        errors.collaborationDescription ? "border-red-500" : "border-gray-300"
                                                    }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => enhanceField("collaborationDescription", formData.collaborationDescription)}
                                            disabled={enhanceLoading.collaborationDescription}
                                            className={`absolute right-3 top-3 text-blue-600 hover:text-blue-800 disabled:text-blue-300 ${
                                                enhanceLoading.collaborationDescription ? "animate-pulse" : ""
                                            }`}
                                            title={enhanceLoading.collaborationDescription ? "Enhancing..." : "Enhance"}
                                        >
                                            <FaMagic className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {errors.collaborationDescription && (
                                        <p className="text-red-500 text-sm mt-1">{errors.collaborationDescription}</p>
                                    )}
                                </div>
                            )}
                            {formData.workBasis.Job && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Job Time Type <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-4">
                                            {["FullTime", "PartTime"].map((type) => (
                                                <label key={type} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="jobTimeType"
                                                        value={type}
                                                        checked={formData.jobTimeType === type}
                                                        onChange={(e) => handleNestedChange("jobTimeType", "", e.target.value)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        {type === "FullTime" ? "Full-time" : "Part-time"}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.jobTimeType && (
                                            <p className="text-red-500 text-sm mt-1">{errors.jobTimeType}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="relative flex-1">
                                            <label htmlFor="jobAmountRangeMin" className="block text-sm font-medium text-gray-700 mb-1">
                                                Minimum Amount (₹) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="jobAmountRangeMin"
                                                type="number"
                                                value={formData.jobAmountRange.min}
                                                onChange={(e) => handleNestedChange("jobAmountRange", "min", e.target.value)}
                                                placeholder="Min Amount"
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                    errors.jobAmountRange?.min ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                            {errors.jobAmountRange?.min && (
                                                <p className="text-red-500 text-sm mt-1">{errors.jobAmountRange.min}</p>
                                            )}
                                        </div>
                                        <div className="relative flex-1">
                                            <label htmlFor="jobAmountRangeMax" className="block text-sm font-medium text-gray-700 mb-1">
                                                Maximum Amount (₹) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="jobAmountRangeMax"
                                                type="number"
                                                value={formData.jobAmountRange.max}
                                                onChange={(e) => handleNestedChange("jobAmountRange", "max", e.target.value)}
                                                placeholder="Max Amount"
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                    errors.jobAmountRange?.max ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                            {errors.jobAmountRange?.max && (
                                                <p className="text-red-500 text-sm mt-1">{errors.jobAmountRange.max}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {formData.workBasis.Freelance && (
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <label htmlFor="freelancePaymentRangeMin" className="block text-sm font-medium text-gray-700 mb-1">
                                            Minimum Payment (₹) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="freelancePaymentRangeMin"
                                            type="number"
                                            value={formData.freelancePaymentRange.min}
                                            onChange={(e) => handleNestedChange("freelancePaymentRange", "min", e.target.value)}
                                            placeholder="Min Payment"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                errors.freelancePaymentRange?.min ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {errors.freelancePaymentRange?.min && (
                                            <p className="text-red-500 text-sm mt-1">{errors.freelancePaymentRange.min}</p>
                                        )}
                                    </div>
                                    <div className="relative flex-1">
                                        <label htmlFor="freelancePaymentRangeMax" className="block text-sm font-medium text-gray-700 mb-1">
                                            Maximum Payment (₹) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="freelancePaymentRangeMax"
                                            type="number"
                                            value={formData.freelancePaymentRange.max}
                                            onChange={(e) => handleNestedChange("freelancePaymentRange", "max", e.target.value)}
                                            placeholder="Max Payment"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                errors.freelancePaymentRange?.max ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {errors.freelancePaymentRange?.max && (
                                            <p className="text-red-500 text-sm mt-1">{errors.freelancePaymentRange.max}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            {formData.workBasis.ProjectBasis && (
                                <div className="relative">
                                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                        Project Description <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="projectDescription"
                                            name="projectDescription"
                                            value={formData.projectDescription}
                                            onChange={handleChange}
                                            placeholder="Describe the project"
                                            className={`w-full pr-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-y min-h-[100px] ${
                                                errors.projectDescription ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => enhanceField("projectDescription", formData.projectDescription)}
                                            disabled={enhanceLoading.projectDescription}
                                            className={`absolute right-3 top-3 text-blue-600 hover:text-blue-800 disabled:text-blue-300 ${
                                                enhanceLoading.projectDescription ? "animate-pulse" : ""
                                            }`}
                                            title={enhanceLoading.projectDescription ? "Enhancing..." : "Enhance"}
                                        >
                                            <FaMagic className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {errors.projectDescription && (
                                        <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>
                                    )}
                                </div>
                            )}
                            {formData.workBasis.PercentageBasis && (
                                <div className="relative">
                                    <label htmlFor="percentageBasisValue" className="block text-sm font-medium text-gray-700 mb-1">
                                        Percentage Basis Value <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="percentageBasisValue"
                                        name="percentageBasisValue"
                                        value={formData.percentageBasisValue}
                                        onChange={handleChange}
                                        placeholder="Specify percentage value"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                            errors.percentageBasisValue ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.percentageBasisValue && (
                                        <p className="text-red-500 text-sm mt-1">{errors.percentageBasisValue}</p>
                                    )}
                                </div>
                            )}
                            {formData.workBasis.EquityBasis && (
                                <div className="relative">
                                    <label htmlFor="equityBasisValue" className="block text-sm font-medium text-gray-700 mb-1">
                                        Equity Basis Value <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="equityBasisValue"
                                        name="equityBasisValue"
                                        value={formData.equityBasisValue}
                                        onChange={handleChange}
                                        placeholder="Specify equity value"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                            errors.equityBasisValue ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.equityBasisValue && (
                                        <p className="text-red-500 text-sm mt-1">{errors.equityBasisValue}</p>
                                    )}
                                </div>
                            )}
                            {formData.workBasis.Other && (
                                <div className="relative">
                                    <label htmlFor="otherWorkBasis" className="block text-sm font-medium text-gray-700 mb-1">
                                        Other Work Basis <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="otherWorkBasis"
                                        name="otherWorkBasis"
                                        value={formData.otherWorkBasis}
                                        onChange={handleChange}
                                        placeholder="Specify other work basis"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                            errors.otherWorkBasis ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.otherWorkBasis && (
                                        <p className="text-red-500 text-sm mt-1">{errors.otherWorkBasis}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Work Mode <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {["Remote", "Hybrid", "Onsite"].map((mode) => (
                                <div key={mode} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={mode}
                                        checked={formData.workMode[mode]}
                                        onChange={() => handleWorkModeChange(mode)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor={mode} className="ml-2 text-gray-700">{mode}</label>
                                </div>
                            ))}
                        </div>
                        {errors.workMode && <p className="text-red-500 text-sm mt-1">{errors.workMode}</p>}
                        {(formData.workMode.Hybrid || formData.workMode.Onsite) && (
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="relative">
                                    <label htmlFor="workLocationCountry" className="block text-sm font-medium text-gray-700 mb-1">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="workLocationCountry"
                                        value={formData.workLocation.country}
                                        onChange={(e) => handleNestedChange("workLocation", "country", e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                            errors.workLocation?.country ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option key={country.isoCode} value={country.isoCode}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.workLocation?.country && (
                                        <p className="text-red-500 text-sm mt-1">{errors.workLocation.country}</p>
                                    )}
                                </div>
                                <div className="relative">
                                    <label htmlFor="workLocationState" className="block text-sm font-medium text-gray-700 mb-1">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="workLocationState"
                                        value={formData.workLocation.state}
                                        onChange={(e) => handleNestedChange("workLocation", "state", e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                            errors.workLocation?.state ? "border-red-500" : "border-gray-300"
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
                                    {errors.workLocation?.state && (
                                        <p className="text-red-500 text-sm mt-1">{errors.workLocation.state}</p>
                                    )}
                                </div>
                                <div className="relative">
                                    <label htmlFor="workLocationDistrict" className="block text-sm font-medium text-gray-700 mb-1">
                                        District <span className="text-red-500">*</span>
                                    </label>
                                  <select
                                    id="workLocationDistrict"
                                    name="workLocation.district"
                                    value={formData.workLocation.district}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "workLocation",
                                            "district",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                        errors.workLocation?.district
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district, index) => (
                                        <option
                                            key={index}
                                            value={district.name}
                                        >
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                                    {errors.workLocation?.district && (
                                        <p className="text-red-500 text-sm mt-1">{errors.workLocation.district}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experience <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="relative">
                                <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-1">
                                    Years
                                </label>
                                <input
                                    id="experienceYears"
                                    type="number"
                                    value={formData.experience.years}
                                    onChange={(e) => handleNestedChange("experience", "years", e.target.value)}
                                    placeholder="Years"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                        errors.experience?.years ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.experience?.years && (
                                    <p className="text-red-500 text-sm mt-1">{errors.experience.years}</p>
                                )}
                            </div>
                            <div className="relative">
                                <label htmlFor="experienceMonths" className="block text-sm font-medium text-gray-700 mb-1">
                                    Months
                                </label>
                                <input
                                    id="experienceMonths"
                                    type="number"
                                    value={formData.experience.months}
                                    onChange={(e) => handleNestedChange("experience", "months", e.target.value)}
                                    placeholder="Months"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                        errors.experience?.months ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.experience?.months && (
                                    <p className="text-red-500 text-sm mt-1">{errors.experience.months}</p>
                                )}
                            </div>
                            <div className="relative">
                                <label htmlFor="experienceDays" className="block text-sm font-medium text-gray-700 mb-1">
                                    Days
                                </label>
                                <input
                                    id="experienceDays"
                                    type="number"
                                    value={formData.experience.days}
                                    onChange={(e) => handleNestedChange("experience", "days", e.target.value)}
                                    placeholder="Days"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                        errors.experience?.days ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.experience?.days && (
                                    <p className="text-red-500 text-sm mt-1">{errors.experience.days}</p>
                                )}
                            </div>
                        </div>
                        {errors.experience?.years && !errors.experience.months && !errors.experience.days && (
                            <p className="text-red-500 text-sm mt-1">{errors.experience.years}</p>
                        )}
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
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        >
                            Next Step
                        </button>
                    </div>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <h3 className="col-span-2 text-xl font-semibold text-blue-600 mb-4">Update your portfolio and experience.</h3>
                    <div className="relative">
                        <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700 mb-1">
                            Portfolio Link
                        </label>
                        <input
                            id="portfolioLink"
                            name="portfolioLink"
                            value={formData.portfolioLink}
                            onChange={handleChange}
                            type="url"
                            placeholder="https://yourportfolio.com"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                errors.portfolioLink ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.portfolioLink && <p className="text-red-500 text-sm mt-1">{errors.portfolioLink}</p>}
                    </div>
                    <div className="relative">
                        <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-1">
                            Resume Link
                        </label>
                        <input
                            id="resumeLink"
                            name="resumeLink"
                            value={formData.resumeLink}
                            onChange={handleChange}
                            type="url"
                            placeholder="https://yourresume.com"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                errors.resumeLink ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.resumeLink && <p className="text-red-500 text-sm mt-1">{errors.resumeLink}</p>}
                    </div>
                    <div className="relative col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
                        {formData.projects.map((project, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-medium text-gray-700">Project {index + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProject(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label htmlFor={`projectTitle${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            id={`projectTitle${index}`}
                                            value={project.title}
                                            onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                                            placeholder="Project Title"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor={`projectLink${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Link
                                        </label>
                                        <input
                                            id={`projectLink${index}`}
                                            value={project.link}
                                            onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                                            type="url"
                                            placeholder="https://projectlink.com"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                                                errors[`projectLink${index}`] ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {errors[`projectLink${index}`] && (
                                            <p className="text-red-500 text-sm mt-1">{errors[`projectLink${index}`]}</p>
                                        )}
                                    </div>
                                    <div className="relative col-span-2">
                                        <label htmlFor={`projectDescription${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id={`projectDescription${index}`}
                                                value={project.description}
                                                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                                                placeholder="Describe the project"
                                                className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-y min-h-[100px]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    enhanceField("projects", project.description, index, "description")
                                                }
                                                disabled={enhanceLoading[`projects${index}`]}
                                                className={`absolute right-3 top-3 text-blue-600 hover:text-blue-800 disabled:text-blue-300 ${
                                                    enhanceLoading[`projects${index}`] ? "animate-pulse" : ""
                                                }`}
                                                title={enhanceLoading[`projects${index}`] ? "Enhancing..." : "Enhance"}
                                            >
                                                <FaMagic className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddProject}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <FaPlus className="mr-2" /> Add Project
                        </button>
                    </div>
                    <div className="relative col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Work Experience</label>
                        {formData.workExperience.map((exp, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-medium text-gray-700">Experience {index + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveWorkExperience(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label htmlFor={`workExperienceCompany${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Company Name
                                        </label>
                                        <input
                                            id={`workExperienceCompany${index}`}
                                            value={exp.companyName}
                                            onChange={(e) => handleWorkExperienceChange(index, "companyName", e.target.value)}
                                            placeholder="Company Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor={`workExperienceRole${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Role
                                        </label>
                                        <input
                                            id={`workExperienceRole${index}`}
                                            value={exp.role}
                                            onChange={(e) => handleWorkExperienceChange(index, "role", e.target.value)}
                                            placeholder="Role"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor={`workExperienceStartDate${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            id={`workExperienceStartDate${index}`}
                                            type="date"
                                            value={exp.startDate}
                                            onChange={(e) => handleWorkExperienceChange(index, "startDate", e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor={`workExperienceEndDate${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            id={`workExperienceEndDate${index}`}
                                            type="date"
                                            value={exp.endDate}
                                            onChange={(e) => handleWorkExperienceChange(index, "endDate", e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                                        />
                                    </div>
                                    <div className="relative col-span-2">
                                        <label htmlFor={`workExperienceDescription${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id={`workExperienceDescription${index}`}
                                                value={exp.description}
                                                onChange={(e) => handleWorkExperienceChange(index, "description", e.target.value)}
                                                placeholder="Describe your role and responsibilities"
                                                className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-y min-h-[100px]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    enhanceField("workExperience", exp.description, index, "description")
                                                }
                                                disabled={enhanceLoading[`workExperience${index}`]}
                                                className={`absolute right-3 top-3 text-blue-600 hover:text-blue-800 disabled:text-blue-300 ${
                                                    enhanceLoading[`workExperience${index}`] ? "animate-pulse" : ""
                                                }`}
                                                title={enhanceLoading[`workExperience${index}`] ? "Enhancing..." : "Enhance"}
                                            >
                                                <FaMagic className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddWorkExperience}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <FaPlus className="mr-2" /> Add Work Experience
                        </button>
                    </div>
                    <div className="relative col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">Other Links</label>
    {formData.otherLinks.map((link, index) => (
        <div key={index} className="flex items-center mb-4 gap-4">
            <div className="flex-1">
                <label htmlFor={`otherLinkUrl${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                </label>
                <input
                    id={`otherLinkUrl${index}`}
                    value={link.url}
                    onChange={(e) => handleOtherLinkChange(index, "url", e.target.value)}
                    type="url"
                    placeholder="https://otherlink.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                        errors[`otherLink${index}`] ? "border-red-500" : "border-gray-300"
                    }`}
                />
            </div>
            <div className="flex-1">
                <label htmlFor={`otherLinkTitle${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    id={`otherLinkTitle${index}`}
                    value={link.title}
                    onChange={(e) => handleOtherLinkChange(index, "title", e.target.value)}
                    type="text"
                    placeholder="Link Title"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 border-gray-300"
                />
            </div>
            <button
                type="button"
                onClick={() => handleRemoveOtherLink(index)}
                className="ml-2 text-red-600 hover:text-red-800 self-end mb-3"
            >
                <FaTimes />
            </button>
            {errors[`otherLink${index}`] && (
                <p className="text-red-500 text-sm mt-1 col-span-2">{errors[`otherLink${index}`]}</p>
            )}
        </div>
    ))}
    <button
        type="button"
        onClick={handleAddOtherLink}
        className="flex items-center text-blue-600 hover:text-blue-800"
    >
        <FaPlus className="mr-2" /> Add Link
    </button>
</div>
                    <div className="relative col-span-2">
                        <label htmlFor="expectations" className="block text-sm font-medium text-gray-700 mb-1">
                            Expectations
                        </label>
                        <div className="relative">
                            <textarea
                                id="expectations"
                                name="expectations"
                                value={formData.expectations}
                                onChange={handleChange}
                                placeholder="Describe your expectations"
                                className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-y min-h-[100px]"
                            />
                            <button
                                type="button"
                                onClick={() => enhanceField("expectations", formData.expectations)}
                                disabled={enhanceLoading.expectations}
                                className={`absolute right-3 top-3 text-blue-600 hover:text-blue-800 disabled:text-blue-300 ${
                                    enhanceLoading.expectations ? "animate-pulse" : ""
                                }`}
                                title={enhanceLoading.expectations ? "Enhancing..." : "Enhance"}
                            >
                                <FaMagic className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="relative col-span-2">
                        <label htmlFor="anyOtherInfo" className="block text-sm font-medium text-gray-700 mb-1">
                            Any Other Information
                        </label>
                        <div className="relative">
                            <textarea
                                id="anyOtherInfo"
                                name="anyOtherInfo"
                                value={formData.anyOtherInfo}
                                onChange={handleChange}
                                placeholder="Additional information"
                                className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-y min-h-[100px]"
                            />
                            <button
                                type="button"
                                onClick={() => enhanceField("anyOtherInfo", formData.anyOtherInfo)}
                                disabled={enhanceLoading.anyOtherInfo}
                                className={`absolute right-3 top-3 text-blue-600 hover:text-blue-800 disabled:text-blue-300 ${
                                    enhanceLoading.anyOtherInfo ? "animate-pulse" : ""
                                }`}
                                title={enhanceLoading.anyOtherInfo ? "Enhancing..." : "Enhance"}
                            >
                                <FaMagic className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {errors.submit && <p className="col-span-2 text-red-500 text-sm mt-1">{errors.submit}</p>}
                    <div className="col-span-2 flex justify-between space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default UpdateGetDiscoveredForm;