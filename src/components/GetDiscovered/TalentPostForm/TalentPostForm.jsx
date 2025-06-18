import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { FaMagic, FaPlus, FaTimes } from "react-icons/fa";
import Select from "react-select";
import chroma from "chroma-js";
import makeAnimated from "react-select/animated";
import RequestDomainRoleSkills from "./RequestDomainRoleSkills";
import PhoneInput from "react-phone-input-2";
import { UploadCloud, Plus } from "lucide-react";
import "react-phone-input-2/lib/style.css";

function GetDiscoveredForm({ onClose }) {
    const animatedComponents = makeAnimated();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        userType: "",
        otherUserType: "",
        email: "",
        country: "",
        state: "",
        district: "",
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
        jobTimeType: "",
        internshipDuration: { value: "", unit: "" },
        internshipStipendRange: { min: "", max: "" },
        internshipPerformanceCriteria: "",
        collaborationDescription: "",
        jobAmountRange: { min: "", max: "" },
        freelancePaymentRange: { min: "", max: "" },
        projectDescription: "",
        percentageBasisValue: "",
        timeCommitment: { value: "", unit: "" },
        equityBasisValue: "",
        otherWorkBasis: "",
        workMode: { Remote: false, Hybrid: false, Onsite: false },
        workLocation: { country: "", state: "", district: "" },
        experience: { min: "", max: "", unit: "" },
        portfolioLink: "",
        resumeLink: "",
        projects: [],
        workExperience: [],
        otherLinks: [],
        expectations: "",
        anyOtherInfo: "",
        profile_pic: "",
    });
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
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
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState("");
    const [enhanceLoading, setEnhanceLoading] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3333/api/get-discovered/get-pre-filled-details",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!response.ok) throw new Error("Failed to fetch profile");
                const data = await response.json();
                console.log(data);
                setFormData((prev) => ({
                    ...prev,
                    first_name: data.user.firstName || "",
                    middle_name: data.user.middleName || "",
                    last_name: data.user.lastName || "",
                    gender: data.user.gender || "",
                    email: data.user.email || "",
                    country: data.user.country || "",
                    state: data.user.state || "",
                    district: data.user.city || "",
                    profile_pic: data.profile_pic || "",
                }));
            } catch (error) {
                setProfileError("Failed to load profile data");
                console.error("Error fetching profile:", error);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchProfile();
    }, []);

    // Fetch countries
    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    // Update states when country changes
    useEffect(() => {
        if (formData.workLocation.country) {
            setStates(State.getStatesOfCountry(formData.workLocation.country));
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
        }
    }, [formData.workLocation.state]);

    // Fetch domains and roles
    useEffect(() => {
        const fetchDomains = async () => {
            console.log("Hi!");
            try {
                console.log("Response");
                const response = await fetch(
                    "http://localhost:3333/api/domain/get-all-domains"
                );
                const data = await response.json();
                if (!data.success) throw new Error("Failed to fetch domains");
                // Transform domains into react-select format
                const sortedDomains = (data.domains || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((domain) => ({
                        value: domain._id,
                        label: domain.name,
                        roles: domain.roles,
                    }));

                // Set domains for react-select
                setDomains(sortedDomains);
                setFilteredDomains(sortedDomains);
                console.log(sortedDomains);
                // Transform roles into react-select format
                const rolesFromAllDomains = sortedDomains.reduce(
                    (acc, domain) => {
                        if (Array.isArray(domain.roles)) {
                            return [
                                ...acc,
                                ...domain.roles.map((role) => ({
                                    value: role._id,
                                    label: role.name || role.title, // Adjust based on your role's name field
                                    domainId: domain.value, // Reference domain by its _id
                                    // Optional: Add color or other properties if needed
                                    // color: '#someColor',
                                    // isFixed: false,
                                    // isDisabled: false,
                                })),
                            ];
                        }
                        return acc;
                    },
                    []
                );

                console.log(rolesFromAllDomains);

                // Remove duplicates by role._id
                // const uniqueRoles = Array.from(
                //     new Map(
                //         rolesFromAllDomains.map((role) => [role.value, role])
                //     ).values()
                // );

                // Set roles for react-select
                setAllRoles(rolesFromAllDomains);
                setFilteredRoles(rolesFromAllDomains);
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

    let skillOptions = filteredSkills.map((skill) => ({
        value: skill._id,
        label: skill.name,
        color: "#a855f7", // Optional: Assign custom color, here purple for example
    }));

    // Selected values in the same format
    let selectedSkills = formData.skills.map((skill) => ({
        value: skill._id,
        label: skill.name,
        color: "#a855f7",
    }));

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color || "#a855f7");
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? data.color
                    : isFocused
                    ? color.alpha(0.1).css()
                    : undefined,
                color: isDisabled
                    ? "#ccc"
                    : isSelected
                    ? chroma.contrast(color, "white") > 2
                        ? "white"
                        : "black"
                    : data.color,
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        multiValue: (styles, { data }) => {
            const color = chroma(data.color || "#a855f7");
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ":hover": {
                backgroundColor: data.color,
                color: "white",
            },
        }),
    };

    // Fetch skills when domainName changes
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            // roleUnderDomain: "",
            skills: [],
        }));
        setRoleSearchText("");
        setSkills([]);
        setFilteredSkills([]);
        setSkillSearchText("");
        setShowSkillSuggestions(false);

        const fetchSkills = async () => {
            if (formData.domainName) {
                try {
                    const skillsResponse = await fetch(
                        `http://localhost:3333/api/skills/${formData.domainName}`
                    );
                    if (!skillsResponse.ok)
                        throw new Error("Failed to fetch skills");
                    const skillsData = await skillsResponse.json();
                    setSkills(
                        Array.isArray(skillsData.skills)
                            ? skillsData.skills
                            : []
                    );
                    setFilteredSkills(
                        Array.isArray(skillsData.skills)
                            ? skillsData.skills
                            : []
                    );

                    skillOptions = filteredSkills.map((skill) => ({
                        value: skill._id,
                        label: skill.name,
                        color: "#a855f7", // Optional: Assign custom color, here purple for example
                    }));

                    selectedSkills = formData.skills.map((skill) => ({
                        value: skill._id,
                        label: skill.name,
                        color: "#a855f7",
                    }));
                } catch (error) {
                    console.error("Error fetching skills:", error);
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
                domains.filter((domain) =>
                    domain.name
                        ?.toLowerCase()
                        .startsWith(domainSearchText.toLowerCase())
                )
            );
        }
    }, [domainSearchText, domains]);

    useEffect(() => {
        let filtered = allRoles;
        if (formData.domainName) {
            filtered = allRoles.filter(
                (role) => role.domainId === formData.domainName
            );
        }
        if (roleSearchText.trim()) {
            filtered = filtered.filter((role) =>
                role.name
                    ?.toLowerCase()
                    .startsWith(roleSearchText.toLowerCase())
            );
        }
        setFilteredRoles(filtered);
    }, [roleSearchText, allRoles, formData.domainName]);

    useEffect(() => {
        if (!skillSearchText.trim()) {
            setFilteredSkills(skills);
        } else {
            setFilteredSkills(
                skills.filter((skill) =>
                    skill.name
                        ?.toLowerCase()
                        .startsWith(skillSearchText.toLowerCase())
                )
            );
        }
    }, [skillSearchText, skills]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "userType" && value !== "Other"
                ? { otherUserType: "" }
                : {}),
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
            ...(name === "userType" && value !== "Other"
                ? { otherUserType: "" }
                : {}),
        }));
    };

    const handleNestedChange = (field, subField, value) => {
        if (subField === null) {
            // Handle top-level fields like jobTimeType
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            // Handle nested fields
            setFormData((prev) => ({
                ...prev,
                [field]: { ...prev[field], [subField]: value },
            }));
        }
        setErrors((prev) => ({
            ...prev,
            [field]: subField ? { ...prev[field], [subField]: "" } : "",
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
                    value: prev.contact_methods[method].selected
                        ? ""
                        : prev.contact_methods[method].value,
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
                workBasis: {
                    ...prev.workBasis,
                    [basis]: !prev.workBasis[basis],
                },
            };
            if (isDeselecting) {
                if (basis === "Internship") {
                    updatedFormData.internshipType = null;
                    updatedFormData.internshipTimeType = null;
                    updatedFormData.internshipDuration = {
                        value: "",
                        unit: "",
                    };
                    updatedFormData.internshipStipendRange = {
                        min: "",
                        max: "",
                    };
                    updatedFormData.internshipPerformanceCriteria = "";
                } else if (basis === "Partnership") {
                    updatedFormData.partnershipCriteria = "";
                } else if (basis === "Collaboration") {
                    updatedFormData.collaborationDescription = "";
                } else if (basis === "Job") {
                    updatedFormData.jobTimeType = null;
                    updatedFormData.jobAmountRange = { min: "", max: "" };
                } else if (basis === "Freelance") {
                    updatedFormData.freelancePaymentRange = {
                        min: "",
                        max: "",
                    };
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
            internshipDuration: value
                ? prev.internshipDuration
                : { value: "", unit: "" },
            internshipStipendRange:
                value === "Paid"
                    ? prev.internshipStipendRange
                    : { min: "", max: "" },
            internshipPerformanceCriteria:
                value === "PerformanceBased"
                    ? prev.internshipPerformanceCriteria
                    : "",
        }));
        setErrors((prev) => ({
            ...prev,
            internshipType: "",
            internshipStipendRange: { min: "", max: "" },
            internshipPerformanceCriteria: "",
        }));
    };

    const handleInternshipTimeTypeChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            internshipTimeType: value,
        }));
        setErrors((prev) => ({ ...prev, internshipTimeType: "" }));
    };

    const handleDomainInput = (e) => {
        setDomainSearchText(e.target.value);
        setShowDomainSuggestions(true);
    };

    const handleDomainFocus = () => setShowDomainSuggestions(true);
    const handleDomainBlur = () =>
        setTimeout(() => setShowDomainSuggestions(false), 200);

    const handleDomainSelect = (selectedDomain) => {
        if (selectedDomain === null) {
            setFormData((prev) => ({
                ...prev,
                domainName: "", // Reset domainName
                roleUnderDomain: "", // Reset roleUnderDomain to clear role Select
                skills: [], // Reset skills
            }));
            allRoles.sort((a, b) => a.label.localeCompare(b.label));

            const labelArr = allRoles.map((role) => role.label);
            console.log("Helllpppppppp", labelArr);
            setFilteredRoles(allRoles); // Reset to all roles
            setDomainSearchText(""); // Clear domain search text
            setRoleSearchText(""); // Clear role search text
            setShowDomainSuggestions(false);
            setErrors((prev) => ({
                ...prev,
                domainName: "",
                roleUnderDomain: "",
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                domainName: selectedDomain.value,
                roleUnderDomain: "", // Reset roleUnderDomain when domain changes
                skills: [], // Reset skills
            }));
            setDomainSearchText(selectedDomain.label);
            setRoleSearchText("");
            setFilteredRoles(
                allRoles.filter(
                    (role) => role.domainId === selectedDomain.value
                )
            );
            setShowDomainSuggestions(false);
            setErrors((prev) => ({
                ...prev,
                domainName: "",
                roleUnderDomain: "",
            }));
        }
    };

    const handleRoleInput = (e) => {
        setRoleSearchText(e.target.value);
        setShowRoleSuggestions(true);
    };

    const handleRoleFocus = () => setShowRoleSuggestions(true);
    const handleRoleBlur = () =>
        setTimeout(() => setShowRoleSuggestions(false), 200);

    const handleRoleSelect = (selectedRole) => {
        if (selectedRole === null) {
            setFormData((prev) => ({
                ...prev,
                roleUnderDomain: "", // Reset roleUnderDomain
                skills: [], // Reset skills
            }));
            setRoleSearchText(""); // Reset search text
            setFilteredRoles(
                allRoles.filter((role) => role.domainId === formData.domainName)
            ); // Show all roles for the domain
            setShowRoleSuggestions(false);
            setErrors((prev) => ({ ...prev, roleUnderDomain: "" }));
        } else {
            const associatedDomain = domains.find(
                (domain) => domain.value === selectedRole.domainId
            );
            setFormData((prev) => ({
                ...prev,
                roleUnderDomain: selectedRole.value,
                domainName: associatedDomain
                    ? associatedDomain.value
                    : prev.domainName, // Preserve domainName
                skills: [], // Reset skills
            }));
            setDomainSearchText(associatedDomain ? associatedDomain.label : "");
            setRoleSearchText(""); // Reset search text
            setFilteredRoles(
                allRoles.filter(
                    (role) =>
                        role.domainId ===
                        (associatedDomain
                            ? associatedDomain.value
                            : formData.domainName)
                )
            ); // Show all roles for the domain
            setShowRoleSuggestions(false);
            setErrors((prev) => ({
                ...prev,
                roleUnderDomain: "",
                domainName: "",
            }));
        }
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
            updatedProjects[index] = {
                ...updatedProjects[index],
                [field]: value,
            };
            return { ...prev, projects: updatedProjects };
        });
    };

    const handleAddProject = () => {
        setFormData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                { title: "", description: "", link: "" },
            ],
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
            updatedWorkExperience[index] = {
                ...updatedWorkExperience[index],
                [field]: value,
            };
            return { ...prev, workExperience: updatedWorkExperience };
        });
    };

    const handleAddWorkExperience = () => {
        setFormData((prev) => ({
            ...prev,
            workExperience: [
                ...prev.workExperience,
                {
                    startDate: "",
                    endDate: "",
                    role: "",
                    companyName: "",
                    description: "",
                },
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
            otherLinks: [...prev.otherLinks, { title: "", url: "" }],
        }));
    };

    const handleOtherLinkChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedLinks = [...prev.otherLinks];
            updatedLinks[index] = { ...updatedLinks[index], [field]: value };
            return { ...prev, otherLinks: updatedLinks };
        });
        setErrors((prev) => ({
            ...prev,
            [`${field}Link${index}`]: "",
        }));
    };

    const handleRemoveOtherLink = (index) => {
        setFormData((prev) => ({
            ...prev,
            otherLinks: prev.otherLinks.filter((_, i) => i !== index),
        }));
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[`titleLink${index}`];
            delete newErrors[`link${index}`];
            return newErrors;
        });
    };

    const enhanceField = async (
        fieldName,
        value,
        index = null,
        nestedField = null
    ) => {
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
                        [nestedField]:
                            response.data[fieldName]?.[nestedField] || value,
                    };
                    return { ...prev, [fieldName]: updatedArray };
                } else if (index !== null) {
                    const updatedArray = [...prev[fieldName]];
                    updatedArray[index] = response.data[fieldName] || value;
                    return { ...prev, [fieldName]: updatedArray };
                }
                return {
                    ...prev,
                    [fieldName]: response.data[fieldName] || value,
                };
            });
        } catch (error) {
            alert(`Enhancement failed for ${fieldName}`);
            console.error("Enhance error:", error);
        }
        setEnhanceLoading((prev) => ({
            ...prev,
            [`${fieldName}${index !== null ? index : ""}`]: false,
        }));
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.first_name.trim())
            newErrors.first_name = "First Name is required";
        if (!formData.last_name.trim())
            newErrors.last_name = "Last Name is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        )
            newErrors.email = "Invalid email format";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.district) newErrors.district = "District is required";
        if (!formData.userType) newErrors.userType = "User type is required";
        if (formData.userType === "Other" && !formData.otherUserType.trim())
            newErrors.otherUserType = "Please specify user type";
        if (!formData.aboutSelf)
            newErrors.aboutSelf = "About yourself is required";

        const selectedContacts = Object.values(formData.contact_methods).filter(
            (method) => method.selected
        ).length;
        if (selectedContacts < 2)
            newErrors.contact_methods =
                "Please select at least two contact methods";

        Object.entries(formData.contact_methods).forEach(
            ([method, { selected, value }]) => {
                if (selected && !value.trim()) {
                    newErrors[
                        `${method}Value`
                    ] = `Please provide your ${method} ${
                        method === "whatsapp" || method === "call"
                            ? "number"
                            : "URL"
                    }`;
                } else if (
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
                    !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
                        value
                    )
                ) {
                    newErrors[
                        `${method}Value`
                    ] = `Please provide a valid ${method} URL (must start with https://)`;
                }
            }
        );

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.headline.trim())
            newErrors.headline = "Headline is required";
        if (!formData.domainName) newErrors.domainName = "Domain is required";
        if (!formData.roleUnderDomain)
            newErrors.roleUnderDomain = "Role is required";
        if (formData.skills.length === 0)
            newErrors.skills = "At least one skill is required";
        if (!Object.values(formData.workBasis).some((selected) => selected))
            newErrors.workBasis = "At least one work basis is required";

        if (
            formData.workBasis.Partnership &&
            !formData.partnershipCriteria.trim()
        )
            newErrors.partnershipCriteria = "Partnership criteria is required";
        if (formData.workBasis.Internship) {
            if (!formData.internshipTimeType)
                newErrors.internshipTimeType =
                    "Please specify internship time type";
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
                    Number(formData.internshipStipendRange.max) <
                        Number(formData.internshipStipendRange.min)
                )
                    newErrors.internshipStipendRange = {
                        ...newErrors.internshipStipendRange,
                        max: "Valid maximum stipend is required",
                    };
            }
            if (
                formData.internshipType === "PerformanceBased" &&
                !formData.internshipPerformanceCriteria.trim()
            )
                newErrors.internshipPerformanceCriteria =
                    "Performance criteria is required";
        }
        if (
            formData.workBasis.Collaboration &&
            !formData.collaborationDescription.trim()
        )
            newErrors.collaborationDescription =
                "Collaboration Criteria  is required";
        if (formData.workBasis.Job) {
            if (!formData.jobTimeType)
                newErrors.jobTimeType = "Please specify job time type";
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
                Number(formData.freelancePaymentRange.max) <
                    Number(formData.freelancePaymentRange.min)
            )
                newErrors.freelancePaymentRange = {
                    ...newErrors.freelancePaymentRange,
                    max: "Valid maximum payment is required",
                };
        }
        if (
            formData.workBasis.ProjectBasis &&
            !formData.projectDescription.trim()
        )
            newErrors.projectDescription = "Project description is required";
        if (
            formData.workBasis.PercentageBasis &&
            !formData.percentageBasisValue.trim()
        )
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
            !formData.experience.min.trim() ||
            !formData.experience.max.trim() ||
            !formData.experience.unit
        ) {
            newErrors.experience = {
                min: !formData.experience.min.trim()
                    ? "Minimum experience is required"
                    : "",
                max: !formData.experience.max.trim()
                    ? "Maximum experience is required"
                    : "",
                unit: !formData.experience.unit ? "Unit is required" : "",
            };
        } else {
            const min = Number(formData.experience.min);
            const max = Number(formData.experience.max);
            if (isNaN(min) || min < 0) {
                newErrors.experience = {
                    ...newErrors.experience,
                    min: "Valid minimum experience is required",
                };
            }
            if (isNaN(max) || max < min) {
                newErrors.experience = {
                    ...newErrors.experience,
                    max: "Maximum must be greater than or equal to minimum",
                };
            }
        }
        // Validate timeCommitment only if at least one field is filled
        if (formData.timeCommitment.value || formData.timeCommitment.unit) {
            if (
                !formData.timeCommitment.value.trim() ||
                isNaN(formData.timeCommitment.value) ||
                Number(formData.timeCommitment.value) <= 0
            ) {
                newErrors.timeCommitment = {
                    ...newErrors.timeCommitment,
                    value: "Valid time commitment value is required",
                };
            }
            if (!formData.timeCommitment.unit) {
                newErrors.timeCommitment = {
                    ...newErrors.timeCommitment,
                    unit: "Time commitment unit is required",
                };
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};

        // Validate Resume (Compulsory)
        if (!formData.resumeLink) {
            newErrors.resumeFile = "Resume upload is required";
        }

        // Validate Portfolio Link (if provided)
        if (
            formData.portfolioLink &&
            !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
                formData.portfolioLink
            )
        ) {
            newErrors.portfolioLink = "Invalid URL (must start with https://)";
        }

        // Validate Projects (if added)
        if (formData.projects.length > 0) {
            formData.projects.forEach((project, index) => {
                if (!project.title.trim()) {
                    newErrors[`projectTitle${index}`] =
                        "Project title is required";
                }
                if (!project.description.trim()) {
                    newErrors[`projectDescription${index}`] =
                        "Project description is required";
                }
                if (
                    !project.link ||
                    !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
                        project.link
                    )
                ) {
                    newErrors[`projectLink${index}`] =
                        "A valid project URL is required (must start with https://)";
                }
            });
        }

        // Validate Work Experience (if added)
        if (formData.workExperience.length > 0) {
            formData.workExperience.forEach((exp, index) => {
                if (!exp.startDate) {
                    newErrors[`workExperience${index}StartDate`] =
                        "Start date is required";
                }
                if (!exp.endDate) {
                    newErrors[`workExperience${index}EndDate`] =
                        "End date is required";
                }
                if (exp.startDate && exp.endDate) {
                    const start = new Date(exp.startDate);
                    const end = new Date(exp.endDate);
                    if (end < start) {
                        newErrors[`workExperience${index}EndDate`] =
                            "End date must be after start date";
                    }
                }
                if (!exp.role.trim()) {
                    newErrors[`workExperience${index}Role`] =
                        "Role is required";
                }
                if (!exp.company.trim()) {
                    newErrors[`workExperience${index}Company`] =
                        "Company is required";
                }
                if (!exp.description.trim()) {
                    newErrors[`workExperience${index}Description`] =
                        "Description is required";
                }
            });
        }

        // Validate Other Links (if added)
        if (formData.otherLinks.length > 0) {
            formData.otherLinks.forEach((linkObj, index) => {
                if (!linkObj.title.trim()) {
                    newErrors[`titleLink${index}`] = "Link title is required";
                }
                if (
                    !linkObj.url ||
                    !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
                        linkObj.url
                    )
                ) {
                    newErrors[`link${index}`] =
                        "A valid URL is required (must start with https://)";
                }
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async () => {
        let isValid = false;
        if (step === 1) isValid = validateStep1();
        else if (step === 2) isValid = validateStep2();

        if (!isValid) return;

        if (step === 1) setStep(2);
        else if (step === 2) setStep(3);
    };

    const handleBack = () => setStep(step - 1);

    const uploadResume = async (file) => {
        //Add commentMore actions
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        const ALLOWED_TYPES = [
            "application/pdf",
            "application/msword", // .doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
        ];

        // Validate file
        if (!file) {
            setErrors((prev) => ({
                ...prev,
                resumeFile: "Please select a file.",
            }));
            setResumeFile(null);
            return;
        }

        // Size check
        if (file.size > MAX_SIZE) {
            setErrors((prev) => ({
                ...prev,
                resumeFile: "File is too large. Max allowed size is 10MB.",
            }));
            setResumeFile(null);
            return;
        }

        // Type check
        if (!ALLOWED_TYPES.includes(file.type)) {
            setErrors((prev) => ({
                ...prev,
                resumeFile: "Only PDF, DOC, and DOCX files are allowed.",
            }));
            setResumeFile(null);
            return;
        }

        // Prepare FormData for upload
        const formDataToSend = new FormData();
        formDataToSend.append("media", file);

        try {
            const res = await fetch("http://localhost:3333/api/media/upload", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Store the returned URL in formData.resumeLink
                setFormData((prev) => ({
                    ...prev,
                    resumeLink: data.url,
                }));
                setErrors((prev) => ({ ...prev, resumeFile: "" }));
                setResumeFile(null); // Clear the temporary file state
            } else {
                setErrors((prev) => ({
                    ...prev,
                    resumeFile:
                        data.error || "Upload failed. Please try again.",
                }));
                setResumeFile(null);
            }
        } catch (err) {
            console.error("Upload error:", err);
            setErrors((prev) => ({
                ...prev,
                resumeFile: "Something went wrong while uploading.",
            }));
            setResumeFile(null);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (validateStep3()) {
            try {
                const domain = domains.find(
                    (d) => d.value === formData.domainName
                );
                const role = allRoles.find(
                    (r) => r.value === formData.roleUnderDomain
                );

                // Map ISO codes to full names for country and state
                const countryISO = formData.workLocation.country;
                const stateISO = formData.workLocation.state;

                const countryData = Country.getCountryByCode(countryISO);
                const countryName = countryData
                    ? countryData.name
                    : formData.workLocation.country || "";

                const stateData = State.getStateByCodeAndCountry(
                    stateISO,
                    countryISO
                );
                const stateName = stateData
                    ? stateData.name
                    : formData.workLocation.state || "";

                // Calculate duration for each work experience
                const updatedWorkExperience = formData.workExperience.map(
                    (exp) => {
                        let duration = "";
                        if (exp.startDate && exp.endDate) {
                            // Format duration as "startDate - endDate"
                            duration = `${exp.startDate} - ${exp.endDate}`; // e.g., "2025-06-03 - 2025-07-09"
                        }
                        return {
                            ...exp,
                            duration, // Add duration to each work experience
                        };
                    }
                );

                const submitData = {
                    ...formData,
                    domainName: domain ? domain.label : formData.domainName,
                    roleUnderDomain: role
                        ? role.label
                        : formData.roleUnderDomain,
                    skills: formData.skills.map((skill) => skill.name),
                    workBasis: formData.workBasis,
                    workMode: formData.workMode,
                    contact_methods: {
                        call: formData.contact_methods.call,
                        whatsapp: formData.contact_methods.whatsapp,
                        instagram: formData.contact_methods.instagram,
                        linkedin: formData.contact_methods.linkedin,
                        facebook: formData.contact_methods.facebook,
                        other: formData.contact_methods.other,
                    },
                    timeCommitment:
                        formData.timeCommitment.value &&
                        formData.timeCommitment.unit
                            ? `${formData.timeCommitment.value} ${formData.timeCommitment.unit}`
                            : "",
                    workLocation: {
                        country: countryName,
                        state: stateName,
                        district: formData.workLocation.district || "",
                    },
                    internshipDuration:
                        formData.internshipDuration.value &&
                        formData.internshipDuration.unit
                            ? {
                                  value: formData.internshipDuration.value,
                                  unit: formData.internshipDuration.unit,
                              }
                            : { value: "", unit: "" },
                    freelancePaymentRange:
                        formData.freelancePaymentRange.min &&
                        formData.freelancePaymentRange.max
                            ? {
                                  min: formData.freelancePaymentRange.min,
                                  max: formData.freelancePaymentRange.max,
                              }
                            : { min: "", max: "" },
                    internshipStipendRange:
                        formData.internshipType === "Paid" &&
                        formData.internshipStipendRange.min &&
                        formData.internshipStipendRange.max
                            ? {
                                  min: formData.internshipStipendRange.min,
                                  max: formData.internshipStipendRange.max,
                              }
                            : { min: "", max: "" },
                    jobAmountRange:
                        formData.jobAmountRange.min &&
                        formData.jobAmountRange.max
                            ? {
                                  min: formData.jobAmountRange.min,
                                  max: formData.jobAmountRange.max,
                              }
                            : { min: "", max: "" },
                    experience: {
                        years:
                            formData.experience.unit === "Years"
                                ? `${formData.experience.min}-${formData.experience.max} Years`
                                : "",
                        months:
                            formData.experience.unit === "Months"
                                ? `${formData.experience.min}-${formData.experience.max} Months`
                                : "",
                        days:
                            formData.experience.unit === "Days"
                                ? `${formData.experience.min}-${formData.experience.max} Days`
                                : "",
                    },
                    workExperience: updatedWorkExperience, // Use updated workExperience with duration
                    otherLinks: formData.otherLinks.map((linkObj, index) => ({
                        url: linkObj.url,
                        title: linkObj.title || `Link ${index + 1}`,
                    })),
                    jobTimeType: formData.jobTimeType || "",
                };

                // Remove individual contact method fields
                delete submitData.call;
                delete submitData.whatsapp;
                delete submitData.instagram;
                delete submitData.linkedin;
                delete submitData.facebook;
                delete submitData.otherContact;

                const response = await fetch(
                    "http://localhost:3333/api/get-discovered/add-listing",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(submitData),
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    console.log("Form submitted:", submitData);
                    setStep(4);
                } else {
                    const errorData = await response.json();
                    setErrors({
                        submit:
                            errorData.message ||
                            "Failed to submit the form. Please try again.",
                    });
                }
            } catch (err) {
                console.error("Submission error:", err);
                setErrors({ submit: "An error occurred. Please try again." });
            }
        }
    };


    const handleCancel = () => {
        setFormData({
            first_name: formData.first_name,
            middle_name: formData.middle_name,
            last_name: formData.last_name,
            gender: formData.gender,
            userType: "",
            otherUserType: "",
            email: formData.email,
            country: formData.country,
            state: formData.state,
            district: formData.district,
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
            internshipDuration: { value: "", unit: "" },
            internshipStipendRange: { min: "", max: "" },
            internshipPerformanceCriteria: "",
            collaborationDescription: "",
            jobAmountRange: { min: "", max: "" },
            freelancePaymentRange: { min: "", max: "" },
            projectDescription: "",
            percentageBasisValue: "",
            timeCommitment: { value: "", unit: "" },
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
        setResumeFile(null);
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

    if (loadingProfile) {
        return <div>Loading profile data...</div>;
    }

    if (profileError) {
        return <div className="text-red-500">{profileError}</div>;
    }
    const handleProfilePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataToUpload = new FormData();
        formDataToUpload.append("media", file);

        try {
            const response = await fetch(
                "http://localhost:3333/api/media/upload",
                {
                    method: "POST",
                    body: formDataToUpload,
                    credentials: "include", // if you use cookies/session
                }
            );

            if (!response.ok) throw new Error("Failed to upload image");

            const result = await response.json();
            console.log(result);

            // Set the returned URL as profilePhoto
            setFormData((prev) => ({ ...prev, profile_pic: result.url }));
        } catch (error) {
            console.error("Error uploading profile photo:", error);
            alert("Failed to upload profile photo. Please try again.");
        }
    };
    return (
        <div className="bg-white p-5  sm:pt-10 rounded-2xl w-full flex flex-col h-[90vh] relative">
            <button
    onClick={handleCancel}
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
>
    <svg
        className="w-6 h-6 bg-gray-50 rounded-4xl"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
        ></path>
    </svg>
</button>

            <div className="flex-1 overflow-y-auto sm:m-4">
                {/* Progress Bar Container */}
                {step > 0 && step < 4 && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                            className="bg-[#A100FF] h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                        ></div>
                    </div>
                )}

                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#a100ff] mb-2 sm:mb-4">
                    <span className="mr-2">✦</span>
                    {step === 0
                        ? "Important Instructions Before You Begin"
                        : step === 1
                        ? "Let's introduce you to the world."
                        : step === 2
                        ? "Tell us about your preferences."
                        : step === 3
                        ? "Almost done! Final details."
                        : "🎉 Submission Successful!"}
                </h3>

                {/* Step Indicator */}
                <p className="text-sm text-gray-500">
                    {step === 0
                        ? "Instructions"
                        : step === 4
                        ? "You're all set!"
                        : `Step ${step} of 4`}
                </p>
            
    {step === 0 && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 p-6 sm:p-10 bg-gradient-to-br from-white via-purple-50 to-purple-100 border border-purple-300 rounded-2xl shadow-xl transition-all duration-500 animate-fade-in">
                    {/* Heading */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#a100ff] tracking-tight">
                        ⚠️ Read This Before You Begin
                    </h2>

                    {/* Primary Instruction */}
                    <p className="text-gray-800 text-base sm:text-lg max-w-2xl leading-relaxed">
                        <strong className="text-red-500">
                            Do not enter personal details
                        </strong>
                        . Doing so may result in
                        <span className="font-semibold text-red-600">
                            {" "}
                            disqualification or rejection
                        </span>{" "}
                        of your submission.
                    </p>

                    {/* Secondary Instruction */}
                    <p className="text-gray-700 text-sm sm:text-base max-w-xl">
                        Use fictional or placeholder data (e.g., initials,
                        sample cities). This form is meant for demo or internal
                        evaluation purposes only.
                    </p>

                    {/* Action Button */}
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="bg-[#a100ff] hover:bg-purple-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105 text-sm sm:text-base"
                    >
                        I Understand, Proceed →
                    </button>
                </div>
            )}


            {step === 1 && (
                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="col-span-full flex flex-col items-center gap-3 sm:gap-4">
                        <div className="relative">
                            <img
                                src={
                                    formData.profile_pic ||
                                    `https://api.dicebear.com/8.x/initials/svg?seed=${
                                        formData.first_name || "User"
                                    }`
                                }
                                alt="Profile"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-purple-300 shadow-md"
                            />
                            {/* Optional overlay edit icon */}
                            <label
                                htmlFor="profilePhotoUpload"
                                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:border-purple-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-[#a100ff]"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M17.414 2.586a2 2 0 010 2.828l-9.95 9.95a2 2 0 01-.878.516l-3.535 1.01a1 1 0 01-1.213-1.213l1.01-3.535a2 2 0 01.516-.878l9.95-9.95a2 2 0 012.828 0z" />
                                </svg>
                                <input
                                    type="file"
                                    id="profilePhotoUpload"
                                    accept="image/*"
                                    onChange={handleProfilePhotoChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("profilePhotoUpload")
                                    ?.click()
                            }
                            className="text-sm font-medium text-[#a100ff] hover:underline"
                        >
                            Update Photo
                        </button>
                    </div>

                    {/* Name Fields */}
                    <div className="relative">
                        <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            disabled
                            type="text"
                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg border-purple-300 cursor-not-allowed text-sm sm:text-base"
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.first_name}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="middle_name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Middle Name
                        </label>
                        <input
                            id="middle_name"
                            name="middle_name"
                            value={formData.middle_name}
                            disabled
                            type="text"
                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg border-purple-300 cursor-not-allowed text-sm sm:text-base"
                        />
                    </div>

                    <div className="relative pr-2 md:col-span-2 lg:col-span-1">
                        <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            disabled
                            type="text"
                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg border-purple-300 cursor-not-allowed text-sm sm:text-base"
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.last_name}
                            </p>
                        )}
                    </div>

                    {/* Location Fields */}
                    <div className="relative">
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Country <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="country"
                            name="country"
                            value={formData.country}
                            disabled
                            type="text"
                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg border-purple-300 cursor-not-allowed text-sm sm:text-base"
                        />
                        {errors.country && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.country}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            State <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="state"
                            name="state"
                            value={formData.state}
                            disabled
                            type="text"
                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg border-purple-300 cursor-not-allowed text-sm sm:text-base"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.state}
                            </p>
                        )}
                    </div>

                    <div className="relative pr-2 md:col-span-2 lg:col-span-1">
                        <label
                            htmlFor="district"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="district"
                            name="district"
                            value={formData.district}
                            disabled
                            type="text"
                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg border-purple-300 cursor-not-allowed text-sm sm:text-base"
                        />
                        {errors.district && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.district}
                            </p>
                        )}
                    </div>

                    {/* Gender and Email */}
                    <div className="relative">
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            disabled
                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg border-purple-300 cursor-not-allowed text-sm sm:text-base"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to specify">
                                Prefer not to specify
                            </option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.gender}
                            </p>
                        )}
                    </div>

                    <div className="relative pr-2 md:col-span-1 lg:col-span-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
                            type="text"
                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg border-purple-300 cursor-not-allowed text-sm sm:text-base"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* User Type */}
                    <div className="relative col-span-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-1">
                            You are a <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                            {[
                                "Working Professional",
                                "Freelancer",
                                "Student",
                                "Other",
                            ].map((type) => (
                                <label key={type} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value={type}
                                        checked={formData.userType === type}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="ml-2 text-sm sm:text-base text-gray-700">
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {errors.userType && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.userType}
                            </p>
                        )}
                        {formData.userType === "Other" && (
                            <div className="mt-4">
                                <label
                                    htmlFor="otherUserType"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Specify User Type{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="otherUserType"
                                        name="otherUserType"
                                        value={formData.otherUserType}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Specify your user type"
                                        className={`w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                                            errors.otherUserType
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                </div>
                                {errors.otherUserType && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                                        {errors.otherUserType}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* About Yourself */}
                    <div className="relative p-2 col-span-full lg:col-span-3">
                        <label
                            htmlFor="aboutSelf"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            About Yourself
                            <span className="text-red-500"> *</span>
                        </label>
                        <div className="relative">
                            <textarea
                                id="aboutSelf"
                                name="aboutSelf"
                                value={formData.aboutSelf}
                                onChange={handleChange}
                                maxLength={300}
                                placeholder="Briefly describe yourself"
                                rows={4}
                                className={`w-full h-20 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base resize-none ${
                                    errors.aboutSelf
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    enhanceField(
                                        "aboutSelf",
                                        formData.aboutSelf
                                    )
                                }
                                disabled={enhanceLoading.aboutSelf}
                                className={`absolute right-2 sm:right-3 top-2 sm:top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                                    enhanceLoading.aboutSelf
                                        ? "animate-pulse"
                                        : ""
                                }`}
                                title={
                                    enhanceLoading.aboutSelf
                                        ? "Enhancing..."
                                        : "Enhance"
                                }
                            >
                                <FaMagic className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                        {errors.aboutSelf && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.aboutSelf}
                            </p>
                        )}
                    </div>

                    {/* Contact Methods */}
                    <div className="relative col-span-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-1">
                            How people can reach out to you (select at least
                            two) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                            {[
                                "call",
                                "whatsapp",
                                "instagram",
                                "linkedin",
                                "facebook",
                                "other",
                            ].map((method) => (
                                <div key={method} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={method}
                                        checked={
                                            formData.contact_methods[method]
                                                .selected
                                        }
                                        onChange={() =>
                                            handleContactMethodChange(method)
                                        }
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <label
                                        htmlFor={method}
                                        className="ml-2 text-sm sm:text-base text-gray-700"
                                    >
                                        {method.charAt(0).toUpperCase() +
                                            method.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.contact_methods && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.contact_methods}
                            </p>
                        )}

                        {/* Contact Method Values */}
                        <div className="mt-4 pr-2 space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 lg:gap-2">
                            {Object.entries(formData.contact_methods).map(
                                ([method, { selected, value }]) =>
                                    selected && (
                                        <div key={method} className="relative">
                                            <label
                                                htmlFor={`${method}Value`}
                                                className="block font-medium mb-1 text-black opacity-[73%] text-sm"
                                            >
                                                {method
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    method.slice(1)}{" "}
                                                {method === "whatsapp" ||
                                                method === "call"
                                                    ? "Number"
                                                    : "URL"}{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="gap-2">
                                                {method === "call" ||
                                                method === "whatsapp" ? (
                                                    <div className="text-left">
                                                        <PhoneInput
                                                            country="in"
                                                            value={value}
                                                            onChange={(phone) =>
                                                                handleContactValueChange(
                                                                    method,
                                                                    phone
                                                                )
                                                            }
                                                            containerClass="w-full"
                                                            inputClass={`w-full h-11 sm:h-12 px-3 sm:px-4 text-gray-900 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-200 text-sm sm:text-base ${
                                                                errors[
                                                                    `${method}Value`
                                                                ]
                                                                    ? "border-red-500"
                                                                    : ""
                                                            } `}
                                                            buttonClass="h-10 sm:h-14 w-12 sm:w-16"
                                                            dropdownClass="h-28"
                                                            containerStyle={{
                                                                height:
                                                                    window.innerWidth <
                                                                    640
                                                                        ? "40px"
                                                                        : "56px",
                                                                width: "100%",
                                                            }}
                                                            inputStyle={{
                                                                height:
                                                                    window.innerWidth <
                                                                    640
                                                                        ? "38px"
                                                                        : "43px",
                                                                width: "100%",
                                                            }}
                                                            buttonStyle={{
                                                                position:
                                                                    "absolute",
                                                                left: "5px",
                                                                top: "1px",
                                                                height:
                                                                    window.innerWidth <
                                                                    640
                                                                        ? "36px"
                                                                        : "40px",
                                                                width:
                                                                    window.innerWidth <
                                                                    640
                                                                        ? "32px"
                                                                        : "40px",
                                                                backgroundColor:
                                                                    "transparent",
                                                                border: "none",
                                                                outline: "none",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <input
                                                        id={`${method}Value`}
                                                        type="url"
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleContactValueChange(
                                                                method,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={` ${method} URL (https://)`}
                                                        className={`w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                                                            errors[
                                                                `${method}Value`
                                                            ]
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                            {errors[`${method}Value`] && (
                                                <p className="text-red-500 text-xs sm:text-sm mt-1">
                                                    {errors[`${method}Value`]}
                                                </p>
                                            )}
                                        </div>
                                    )
                            )}
                        </div>
                    </div>

                    
                </form>
            )}

            {step === 2 && (
                <form className="grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsRequestModalOpen(true)}
                            className="mb-2 text-sm lg:text-base text-purple-600 hover:text-purple-800 underline"
                        >
                            Request Domain, Role, Skill
                        </button>
                        <label
                            htmlFor="headline"
                            className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                        >
                            Headline (e.g., I am a...){" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="headline"
                                name="headline"
                                value={formData.headline}
                                onChange={handleChange}
                                maxLength={80}
                                placeholder="Enter a catchy headline"
                                className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100  transition-all duration-200 hover:border-purple-400 ${
                                    errors.headline
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } text-sm lg:text-base`}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    enhanceField("headline", formData.headline)
                                }
                                disabled={enhanceLoading.headline}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                                    enhanceLoading.headline
                                        ? "animate-pulse"
                                        : ""
                                }`}
                                title={
                                    enhanceLoading.headline
                                        ? "Enhancing..."
                                        : "Enhance"
                                }
                            >
                                <FaMagic className="w-5 h-5" />
                            </button>
                        </div>
                        {errors.headline && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.headline}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                        <div className="relative">
                            <label
                                htmlFor="roleUnderDomain"
                                className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                            >
                                Your Role{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <Select
                                key={formData.domainName}
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                options={filteredRoles}
                                value={filteredRoles.find(
                                    (role) =>
                                        role.value === formData.roleUnderDomain
                                )}
                                onChange={handleRoleSelect}
                                isClearable
                                placeholder="Select a role"
                                classNamePrefix="react-select"
                            />
                            {errors.roleUnderDomain && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.roleUnderDomain}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="domainName"
                                className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                            >
                                Your Domain{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            {loadingDomains ? (
                                <p className="text-gray-500">
                                    Loading domains...
                                </p>
                            ) : (
                                <Select
                                    key={formData.domainName}
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    options={domains}
                                    value={domains.find(
                                        (domain) =>
                                            domain.value === formData.domainName
                                    )}
                                    isClearable
                                    onChange={handleDomainSelect}
                                    placeholder="Select a domain"
                                    classNamePrefix="react-select"
                                />
                            )}
                            {errors.domainName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.domainName}
                                </p>
                            )}
                        </div>
                    </div>

                    {formData.domainName && (
                        <div className="relative">
                            <label
                                htmlFor="skills"
                                className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                            >
                                Skills <span className="text-red-500">*</span>
                            </label>
                            <Select
                                id="skills"
                                isMulti
                                name="skills"
                                value={selectedSkills}
                                options={skillOptions.filter(
                                    (skill) =>
                                        !formData.skills.some(
                                            (s) => s._id === skill.value
                                        )
                                )}
                                onChange={(selectedOptions) => {
                                    const updatedSkills = selectedOptions.map(
                                        (opt) => ({
                                            _id: opt.value,
                                            name: opt.label,
                                        })
                                    );
                                    setFormData({
                                        ...formData,
                                        skills: updatedSkills,
                                    });
                                }}
                                styles={colourStyles}
                                placeholder="Type to search skills"
                                closeMenuOnSelect={false}
                            />
                            {errors.skills && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.skills}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="relative">
                        <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1">
                            Work Basis <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4">
                            {[
                                "Partnership",
                                "Collaboration",
                                "EquityBasis",
                                "ProjectBasis",
                                "PercentageBasis",
                                "Freelance",
                                "Job",
                                "Internship",
                                "Other",
                            ].map((basis) => (
                                <div key={basis} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={basis}
                                        checked={formData.workBasis[basis]}
                                        onChange={() =>
                                            handleWorkBasisChange(basis)
                                        }
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2 flex-shrink-0"
                                    />
                                    <label
                                        htmlFor={basis}
                                        className="text-gray-700 text-sm lg:text-base"
                                    >
                                        {basis
                                            .replace(/([A-Z])/g, " $1")
                                            .trim()}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.workBasis && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.workBasis}
                            </p>
                        )}

                        <div className="mt-4 space-y-4">
                            {formData.workBasis.Partnership && (
                                <div className="relative">
                                    <label
                                        htmlFor="partnershipCriteria"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        Partnership Criteria{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="partnershipCriteria"
                                            name="partnershipCriteria"
                                            value={formData.partnershipCriteria}
                                            onChange={handleChange}
                                            placeholder="Describe the partnership criteria"
                                            className={`w-full h-11 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm lg:text-base ${
                                                errors.partnershipCriteria
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                enhanceField(
                                                    "partnershipCriteria",
                                                    formData.partnershipCriteria
                                                )
                                            }
                                            disabled={
                                                enhanceLoading.partnershipCriteria
                                            }
                                            className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                                                enhanceLoading.partnershipCriteria
                                                    ? "animate-pulse"
                                                    : ""
                                            }`}
                                            title={
                                                enhanceLoading.partnershipCriteria
                                                    ? "Enhancing..."
                                                    : "Enhance"
                                            }
                                        >
                                            <FaMagic className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {errors.partnershipCriteria && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.partnershipCriteria}
                                        </p>
                                    )}
                                </div>
                            )}

                            {formData.workBasis.Internship && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1">
                                            Internship Time Type{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                                            {["Full-time", "Part-time"].map(
                                                (type) => (
                                                    <label
                                                        key={type}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="internshipTimeType"
                                                            value={type}
                                                            checked={
                                                                formData.internshipTimeType ===
                                                                type
                                                            }
                                                            onChange={() =>
                                                                handleInternshipTimeTypeChange(
                                                                    type
                                                                )
                                                            }
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                        />
                                                        <span className="text-gray-700 text-sm lg:text-base">
                                                            {type}
                                                        </span>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                        {errors.internshipTimeType && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.internshipTimeType}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1">
                                            Internship Type{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                                            {[
                                                "Paid",
                                                "Unpaid",
                                                "PerformanceBased",
                                            ].map((type) => (
                                                <label
                                                    key={type}
                                                    className="flex items-center"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="internshipType"
                                                        value={type}
                                                        checked={
                                                            formData.internshipType ===
                                                            type
                                                        }
                                                        onChange={() =>
                                                            handleInternshipTypeChange(
                                                                type
                                                            )
                                                        }
                                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                    />
                                                    <span className="text-gray-700 text-sm lg:text-base">
                                                        {type
                                                            .replace(
                                                                /([A-Z])/g,
                                                                " $1"
                                                            )
                                                            .trim()}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.internshipType && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.internshipType}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <label
                                            htmlFor="internshipDuration"
                                            className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                        >
                                            Internship Duration{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                            <input
                                                id="internshipDurationValue"
                                                name="internshipDurationValue"
                                                value={
                                                    formData.internshipDuration
                                                        .value
                                                }
                                                onChange={(e) =>
                                                    handleNestedChange(
                                                        "internshipDuration",
                                                        "value",
                                                        e.target.value
                                                    )
                                                }
                                                type="number"
                                                min="0"
                                                placeholder="Duration"
                                                className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                                    errors.internshipDuration
                                                        ?.value
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                            />
                                            <select
                                                id="internshipDurationUnit"
                                                name="internshipDurationUnit"
                                                value={
                                                    formData.internshipDuration
                                                        .unit
                                                }
                                                onChange={(e) =>
                                                    handleNestedChange(
                                                        "internshipDuration",
                                                        "unit",
                                                        e.target.value
                                                    )
                                                }
                                                className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                                    errors.internshipDuration
                                                        ?.unit
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                            >
                                                <option value="">
                                                    Select Unit
                                                </option>
                                                <option value="Weeks">
                                                    Weeks
                                                </option>
                                                <option value="Months">
                                                    Months
                                                </option>
                                                <option value="Years">
                                                    Years
                                                </option>
                                            </select>
                                        </div>
                                        {errors.internshipDuration && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.internshipDuration
                                                    .value && (
                                                    <p>
                                                        {
                                                            errors
                                                                .internshipDuration
                                                                .value
                                                        }
                                                    </p>
                                                )}
                                                {errors.internshipDuration
                                                    .unit && (
                                                    <p>
                                                        {
                                                            errors
                                                                .internshipDuration
                                                                .unit
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {formData.internshipType === "Paid" && (
                                        <div className="relative">
                                            <label
                                                htmlFor="internshipStipendRangeMin"
                                                className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                            >
                                                Stipend Range (₹){" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                                <input
                                                    id="internshipStipendRangeMin"
                                                    name="internshipStipendRangeMin"
                                                    value={
                                                        formData
                                                            .internshipStipendRange
                                                            .min
                                                    }
                                                    onChange={(e) =>
                                                        handleNestedChange(
                                                            "internshipStipendRange",
                                                            "min",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="number"
                                                    min="0"
                                                    placeholder="Min"
                                                    className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                                        errors
                                                            .internshipStipendRange
                                                            ?.min
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                />
                                                <input
                                                    id="internshipStipendRangeMax"
                                                    name="internshipStipendRangeMax"
                                                    value={
                                                        formData
                                                            .internshipStipendRange
                                                            .max
                                                    }
                                                    onChange={(e) =>
                                                        handleNestedChange(
                                                            "internshipStipendRange",
                                                            "max",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="number"
                                                    min="0"
                                                    placeholder="Max"
                                                    className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                                        errors
                                                            .internshipStipendRange
                                                            ?.max
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                />
                                            </div>
                                            {errors.internshipStipendRange && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors
                                                        .internshipStipendRange
                                                        .min && (
                                                        <p>
                                                            {
                                                                errors
                                                                    .internshipStipendRange
                                                                    .min
                                                            }
                                                        </p>
                                                    )}
                                                    {errors
                                                        .internshipStipendRange
                                                        .max && (
                                                        <p>
                                                            {
                                                                errors
                                                                    .internshipStipendRange
                                                                    .max
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {formData.internshipType ===
                                        "PerformanceBased" && (
                                        <div className="relative">
                                            <label
                                                htmlFor="internshipPerformanceCriteria"
                                                className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                            >
                                                Performance Criteria{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    id="internshipPerformanceCriteria"
                                                    name="internshipPerformanceCriteria"
                                                    value={
                                                        formData.internshipPerformanceCriteria
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Describe performance-based criteria"
                                                    className={`w-full h-11 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm lg:text-base ${
                                                        errors.internshipPerformanceCriteria
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        enhanceField(
                                                            "internshipPerformanceCriteria",
                                                            formData.internshipPerformanceCriteria
                                                        )
                                                    }
                                                    disabled={
                                                        enhanceLoading.internshipPerformanceCriteria
                                                    }
                                                    className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-gray-300 ${
                                                        enhanceLoading.internshipPerformanceCriteria
                                                            ? "animate-pulse"
                                                            : ""
                                                    }`}
                                                    title={
                                                        enhanceLoading.internshipPerformanceCriteria
                                                            ? "Enhancing..."
                                                            : "Enhance"
                                                    }
                                                >
                                                    <FaMagic className="w-5 h-5" />
                                                </button>
                                            </div>
                                            {errors.internshipPerformanceCriteria && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {
                                                        errors.internshipPerformanceCriteria
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {formData.workBasis.Collaboration && (
                                <div className="relative">
                                    <label
                                        htmlFor="collaborationDescription"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        Collaboration Criteria{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="collaborationDescription"
                                            name="collaborationDescription"
                                            value={
                                                formData.collaborationDescription
                                            }
                                            onChange={handleChange}
                                            placeholder="Describe the collaboration"
                                            className={`w-full h-11 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-100  transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm lg:text-base ${
                                                errors.collaborationDescription
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                enhanceField(
                                                    "collaborationDescription",
                                                    formData.collaborationDescription
                                                )
                                            }
                                            disabled={
                                                enhanceLoading.collaborationDescription
                                            }
                                            className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-gray-300 ${
                                                enhanceLoading.collaborationDescription
                                                    ? "animate-pulse"
                                                    : ""
                                            }`}
                                            title={
                                                enhanceLoading.collaborationDescription
                                                    ? "Enhancing..."
                                                    : "Enhance"
                                            }
                                        >
                                            <FaMagic className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {errors.collaborationDescription && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.collaborationDescription}
                                        </p>
                                    )}
                                </div>
                            )}

                            {formData.workBasis.Job && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1">
                                            Job Time Type{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                                            {["Full-time", "Part-time"].map(
                                                (type) => (
                                                    <label
                                                        key={type}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="jobTimeType"
                                                            value={type}
                                                            checked={
                                                                formData.jobTimeType ===
                                                                type
                                                            }
                                                            onChange={(e) =>
                                                                handleNestedChange(
                                                                    "jobTimeType",
                                                                    null,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                        />
                                                        <span className="text-gray-700 text-sm lg:text-base">
                                                            {type}
                                                        </span>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                        {errors.jobTimeType && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.jobTimeType}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <label
                                            htmlFor="jobAmountRangeMin"
                                            className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                        >
                                            Job Amount Range (₹){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                            <input
                                                id="jobAmountRangeMin"
                                                name="jobAmountRangeMin"
                                                value={
                                                    formData.jobAmountRange.min
                                                }
                                                onChange={(e) =>
                                                    handleNestedChange(
                                                        "jobAmountRange",
                                                        "min",
                                                        e.target.value
                                                    )
                                                }
                                                type="number"
                                                min="0"
                                                placeholder="Min"
                                                className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                                    errors.jobAmountRange?.min
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                            />
                                            <input
                                                id="jobAmountRangeMax"
                                                name="jobAmountRangeMax"
                                                value={
                                                    formData.jobAmountRange.max
                                                }
                                                onChange={(e) =>
                                                    handleNestedChange(
                                                        "jobAmountRange",
                                                        "max",
                                                        e.target.value
                                                    )
                                                }
                                                type="number"
                                                min="0"
                                                placeholder="Max"
                                                className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                                    errors.jobAmountRange?.max
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                            />
                                        </div>
                                        {errors.jobAmountRange && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.jobAmountRange.min && (
                                                    <p>
                                                        {
                                                            errors
                                                                .jobAmountRange
                                                                .min
                                                        }
                                                    </p>
                                                )}
                                                {errors.jobAmountRange.max && (
                                                    <p>
                                                        {
                                                            errors
                                                                .jobAmountRange
                                                                .max
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {formData.workBasis.Freelance && (
                                <div className="relative">
                                    <label
                                        htmlFor="freelancePaymentRangeMin"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        Freelance Payment Range (₹){" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <input
                                            id="freelancePaymentRangeMin"
                                            name="freelancePaymentRangeMin"
                                            value={
                                                formData.freelancePaymentRange
                                                    .min
                                            }
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    "freelancePaymentRange",
                                                    "min",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                            min="0"
                                            placeholder="Min"
                                            className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                                errors.freelancePaymentRange
                                                    ?.min
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        <input
                                            id="freelancePaymentRangeMax"
                                            name="freelancePaymentRangeMax"
                                            value={
                                                formData.freelancePaymentRange
                                                    .max
                                            }
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    "freelancePaymentRange",
                                                    "max",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                            min="0"
                                            placeholder="Max"
                                            className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                                errors.freelancePaymentRange
                                                    ?.max
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                    </div>
                                    {errors.freelancePaymentRange && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.freelancePaymentRange
                                                .min && (
                                                <p>
                                                    {
                                                        errors
                                                            .freelancePaymentRange
                                                            .min
                                                    }
                                                </p>
                                            )}
                                            {errors.freelancePaymentRange
                                                .max && (
                                                <p>
                                                    {
                                                        errors
                                                            .freelancePaymentRange
                                                            .max
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {formData.workBasis.ProjectBasis && (
                                <div className="relative">
                                    <label
                                        htmlFor="projectDescription"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        Project Description{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="projectDescription"
                                            name="projectDescription"
                                            value={formData.projectDescription}
                                            onChange={handleChange}
                                            placeholder="Describe the project"
                                            className={`w-full h-11 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-100  transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm lg:text-base ${
                                                errors.projectDescription
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                enhanceField(
                                                    "projectDescription",
                                                    formData.projectDescription
                                                )
                                            }
                                            disabled={
                                                enhanceLoading.projectDescription
                                            }
                                            className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-gray-300 ${
                                                enhanceLoading.projectDescription
                                                    ? "animate-pulse"
                                                    : ""
                                            }`}
                                            title={
                                                enhanceLoading.projectDescription
                                                    ? "Enhancing..."
                                                    : "Enhance"
                                            }
                                        >
                                            <FaMagic className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {errors.projectDescription && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.projectDescription}
                                        </p>
                                    )}
                                </div>
                            )}
                            {formData.workBasis.PercentageBasis && (
                                <div className="relative">
                                    <label
                                        htmlFor="percentageBasisValue"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        Percentage Basis Value (%){" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="percentageBasisValue"
                                        name="percentageBasisValue"
                                        value={formData.percentageBasisValue}
                                        onChange={handleChange}
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="Enter percentage"
                                        className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                            errors.percentageBasisValue
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.percentageBasisValue && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.percentageBasisValue}
                                        </p>
                                    )}
                                </div>
                            )}
                            {formData.workBasis.EquityBasis && (
                                <div className="relative">
                                    <label
                                        htmlFor="equityBasisValue"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        Equity Basis Value (%){" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="equityBasisValue"
                                        name="equityBasisValue"
                                        value={formData.equityBasisValue}
                                        onChange={handleChange}
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="Enter equity percentage"
                                        className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100  transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                            errors.equityBasisValue
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.equityBasisValue && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.equityBasisValue}
                                        </p>
                                    )}
                                </div>
                            )}
                            {formData.workBasis.Other && (
                                <div className="relative">
                                    <label
                                        htmlFor="otherWorkBasis"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        Other Work Basis{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="otherWorkBasis"
                                        name="otherWorkBasis"
                                        value={formData.otherWorkBasis}
                                        onChange={handleChange}
                                        placeholder="Specify other work basis"
                                        className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                            errors.otherWorkBasis
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.otherWorkBasis && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.otherWorkBasis}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1">
                            Work Mode <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 lg:gap-6">
                            {["Remote", "Hybrid", "Onsite"].map((mode) => (
                                <div key={mode} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={mode}
                                        checked={formData.workMode[mode]}
                                        onChange={() =>
                                            handleWorkModeChange(mode)
                                        }
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                    />
                                    <label
                                        htmlFor={mode}
                                        className="text-gray-700 text-sm lg:text-base"
                                    >
                                        {mode}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.workMode && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.workMode}
                            </p>
                        )}
                        {(formData.workMode.Hybrid ||
                            formData.workMode.Onsite) && (
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                <div className="relative">
                                    <label
                                        htmlFor="workLocationCountry"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        Country{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="workLocationCountry"
                                        name="workLocationCountry"
                                        value={formData.workLocation.country}
                                        onChange={(e) =>
                                            handleNestedChange(
                                                "workLocation",
                                                "country",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full h-12 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                            errors.workLocation?.country
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option
                                                key={country.isoCode}
                                                value={country.isoCode}
                                            >
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.workLocation?.country && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.workLocation.country}
                                        </p>
                                    )}
                                </div>
                                <div className="relative">
                                    <label
                                        htmlFor="workLocationState"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        State{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="workLocationState"
                                        name="workLocationState"
                                        value={formData.workLocation.state}
                                        onChange={(e) =>
                                            handleNestedChange(
                                                "workLocation",
                                                "state",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full h-12 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                            errors.workLocation?.state
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option
                                                key={state.isoCode}
                                                value={state.isoCode}
                                            >
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.workLocation?.state && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.workLocation.state}
                                        </p>
                                    )}
                                </div>
                                <div className="relative">
                                    <label
                                        htmlFor="workLocationDistrict"
                                        className="block text-sm lg:text-base font-medium text-gray-700 mb-1"
                                    >
                                        City{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="workLocationDistrict"
                                        name="workLocationDistrict"
                                        value={formData.workLocation.district}
                                        onChange={(e) =>
                                            handleNestedChange(
                                                "workLocation",
                                                "district",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full h-12 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                            errors.workLocation?.district
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">Select City</option>
                                        {districts.map((city) => (
                                            <option
                                                key={city.name}
                                                value={city.name}
                                            >
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.workLocation?.district && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.workLocation.district}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1">
                            Time Commitment
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            <div className="flex-1">
                                <input
                                    id="timeCommitmentValue"
                                    name="timeCommitment.value"
                                    value={formData.timeCommitment.value}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "timeCommitment",
                                            "value",
                                            e.target.value
                                        )
                                    }
                                    type="number"
                                    min="1"
                                    placeholder="Enter value"
                                    className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100  transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                        errors.timeCommitment?.value
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.timeCommitment?.value && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.timeCommitment.value}
                                    </p>
                                )}
                            </div>
                            <div className="flex-1">
                                <select
                                    id="timeCommitmentUnit"
                                    name="timeCommitment.unit"
                                    value={formData.timeCommitment.unit}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "timeCommitment",
                                            "unit",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                        errors.timeCommitment?.unit
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="hours/day">Hours/Day</option>
                                    <option value="hours/week">
                                        Hours/Week
                                    </option>
                                    <option value="hours/month">
                                        Hours/Month
                                    </option>
                                </select>
                                {errors.timeCommitment?.unit && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.timeCommitment.unit}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1">
                            Experience <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                            <div className="flex-1">
                                <input
                                    id="experienceMin"
                                    name="experienceMin"
                                    value={formData.experience.min}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "experience",
                                            "min",
                                            e.target.value
                                        )
                                    }
                                    type="number"
                                    min="0"
                                    placeholder="Min"
                                    className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                        errors.experience?.min
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    id="experienceMax"
                                    name="experienceMax"
                                    value={formData.experience.max}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "experience",
                                            "max",
                                            e.target.value
                                        )
                                    }
                                    type="number"
                                    min="0"
                                    placeholder="Max"
                                    className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                        errors.experience?.max
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                            </div>
                            <div className="flex-1">
                                <select
                                    id="experienceUnit"
                                    name="experienceUnit"
                                    value={formData.experience.unit}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "experience",
                                            "unit",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full h-11 px-4 py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 text-sm lg:text-base ${
                                        errors.experience?.unit
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="Years">Years</option>
                                    <option value="Months">Months</option>
                                    <option value="Days">Days</option>
                                </select>
                            </div>
                        </div>
                        {errors.experience && (
                            <div className="text-red-500 text-sm mt-1 space-y-1">
                                {errors.experience.min && (
                                    <p>{errors.experience.min}</p>
                                )}
                                {errors.experience.max && (
                                    <p>{errors.experience.max}</p>
                                )}
                                {errors.experience.unit && (
                                    <p>{errors.experience.unit}</p>
                                )}
                            </div>
                        )}
                    </div>
                    
                </form>
            )}

            {step === 3 && (
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
                >
                    {/* Portfolio Link */}
                    <div className="relative col-span-1 lg:col-span-2">
                        <label
                            htmlFor="portfolioLink"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Portfolio Link
                        </label>
                        <input
                            id="portfolioLink"
                            name="portfolioLink"
                            value={formData.portfolioLink}
                            onChange={handleChange}
                            type="url"
                            placeholder="Enter portfolio URL (https://)"
                            className={`w-full h-11 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-100 transition-all duration-200 hover:border-purple-400 ${
                                errors.portfolioLink
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.portfolioLink && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.portfolioLink}
                            </p>
                        )}
                    </div>

                    {/* Resume Upload */}
                    <div className="relative col-span-1 lg:col-span-2 cursor-pointer">
                        <label
                            htmlFor="resumeFile"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Upload Resume{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                                errors.resumeFile
                                    ? "border-red-400"
                                    : "border-gray-300 hover:border-purple-500"
                            }`}
                        >
                            <UploadCloud
                                size={32}
                                className="mx-auto text-gray-400 mb-2"
                            />

                            <label className="relative inline-block cursor-pointer text-purple-600 font-semibold hover:underline">
                                Choose File
                                <input
                                    id="resumeFile"
                                    name="resumeFile"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setResumeFile(file);
                                        if (file) uploadResume(file);
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </label>

                            <p className="mt-2 text-sm text-gray-600">
                                {resumeFile
                                    ? resumeFile.name
                                    : "No file chosen"}
                            </p>
                        </div>

                        {/* Feedback messages */}
                        {formData.resumeLink && (
                            <p className="text-green-600 text-xs sm:text-sm mt-1">
                                Resume Uploaded!
                            </p>
                        )}
                        {errors.resumeFile && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.resumeFile}
                            </p>
                        )}
                    </div>

                    {/* Projects Section */}
                    <div className="relative col-span-1 lg:col-span-2 mb-[-15px]">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-800">
                                Projects
                            </label>
                            <button
                                type="button"
                                onClick={handleAddProject}
                                className="flex items-center px-3 py-1.5 border border-purple-600 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-50 transition"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Project
                            </button>
                        </div>

                        {/* Existing Projects */}
                        {formData.projects.map((project, index) => (
                            <div
                                key={index}
                                className="mb-4 p-3 border border-purple-400 rounded-lg bg-white"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        Project {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveProject(index)
                                        }
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <Plus className="rotate-45 w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={project.title}
                                        onChange={(e) =>
                                            handleProjectChange(
                                                index,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Project Title"
                                        className={`w-full bg-white h-10 px-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 ${
                                            errors[`projectTitle${index}`]
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    <textarea
                                        value={project.description}
                                        onChange={(e) =>
                                            handleProjectChange(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Project Description"
                                        className={`w-full bg-white px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 resize-y min-h-[80px] ${
                                            errors[`projectDescription${index}`]
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    <input
                                        type="url"
                                        value={project.link}
                                        onChange={(e) =>
                                            handleProjectChange(
                                                index,
                                                "link",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Project Link (https://)"
                                        className={`w-full bg-white h-10 px-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 ${
                                            errors[`projectLink${index}`]
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        }`}
                                    />

                                    {/* Errors */}
                                    {errors[`projectTitle${index}`] && (
                                        <p className="text-red-500 text-xs">
                                            {errors[`projectTitle${index}`]}
                                        </p>
                                    )}
                                    {errors[`projectDescription${index}`] && (
                                        <p className="text-red-500 text-xs">
                                            {
                                                errors[
                                                    `projectDescription${index}`
                                                ]
                                            }
                                        </p>
                                    )}
                                    {errors[`projectLink${index}`] && (
                                        <p className="text-red-500 text-xs">
                                            {errors[`projectLink${index}`]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Work Experience Section */}
                    <div className="relative col-span-1 lg:col-span-2 mb-[-15px]">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-800">
                                Work Experience
                            </label>
                            <button
                                type="button"
                                onClick={handleAddWorkExperience}
                                className="flex items-center px-3 py-1.5 border border-purple-600 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-50 transition"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Work
                            </button>
                        </div>

                        {/* Existing Work Experience */}
                        {formData.workExperience.map((experience, index) => (
                            <div
                                key={index}
                                className="mb-4 p-3 border border-purple-400 rounded-lg bg-gray-50"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        Experience {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveWorkExperience(index)
                                        }
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <Plus className="rotate-45 w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={experience.role}
                                            onChange={(e) =>
                                                handleWorkExperienceChange(
                                                    index,
                                                    "role",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Role"
                                            className={`w-full bg-white h-10 px-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 ${
                                                errors[
                                                    `workExperience${index}Role`
                                                ]
                                                    ? "border-red-400"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        <input
                                            type="text"
                                            value={experience.company}
                                            onChange={(e) =>
                                                handleWorkExperienceChange(
                                                    index,
                                                    "company",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Company Name"
                                            className={`w-full bg-white h-10 px-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 ${
                                                errors[
                                                    `workExperience${index}Company`
                                                ]
                                                    ? "border-red-400"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <input
                                            type="date"
                                            value={experience.startDate}
                                            onChange={(e) =>
                                                handleWorkExperienceChange(
                                                    index,
                                                    "startDate",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full bg-white h-10 px-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 ${
                                                errors[
                                                    `workExperience${index}StartDate`
                                                ]
                                                    ? "border-red-400"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        <input
                                            type="date"
                                            value={experience.endDate}
                                            onChange={(e) =>
                                                handleWorkExperienceChange(
                                                    index,
                                                    "endDate",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full bg-white h-10 px-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 ${
                                                errors[
                                                    `workExperience${index}EndDate`
                                                ]
                                                    ? "border-red-400"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            value={experience.description}
                                            onChange={(e) =>
                                                handleWorkExperienceChange(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Description"
                                            className={`w-full bg-white px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 resize-y min-h-[80px] ${
                                                errors[
                                                    `workExperience${index}Description`
                                                ]
                                                    ? "border-red-400"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                enhanceField(
                                                    "workExperience",
                                                    experience.description,
                                                    index,
                                                    "description"
                                                )
                                            }
                                            disabled={
                                                enhanceLoading[
                                                    `workExperience${index}`
                                                ]
                                            }
                                            className={`absolute bg-white right-2 top-2 text-purple-600 hover:text-purple-800 disabled:text-gray-400 ${
                                                enhanceLoading[
                                                    `workExperience${index}`
                                                ]
                                                    ? "animate-pulse"
                                                    : ""
                                            }`}
                                            title={
                                                enhanceLoading[
                                                    `workExperience${index}`
                                                ]
                                                    ? "Enhancing..."
                                                    : "Enhance"
                                            }
                                        >
                                            ✨
                                        </button>
                                    </div>

                                    {/* Validation Errors */}
                                    {errors[`workExperience${index}Role`] && (
                                        <p className="text-red-500 text-xs">
                                            {
                                                errors[
                                                    `workExperience${index}Role`
                                                ]
                                            }
                                        </p>
                                    )}
                                    {errors[
                                        `workExperience${index}Company`
                                    ] && (
                                        <p className="text-red-500 text-xs">
                                            {
                                                errors[
                                                    `workExperience${index}Company`
                                                ]
                                            }
                                        </p>
                                    )}
                                    {errors[
                                        `workExperience${index}StartDate`
                                    ] && (
                                        <p className="text-red-500 text-xs">
                                            {
                                                errors[
                                                    `workExperience${index}StartDate`
                                                ]
                                            }
                                        </p>
                                    )}
                                    {errors[
                                        `workExperience${index}EndDate`
                                    ] && (
                                        <p className="text-red-500 text-xs">
                                            {
                                                errors[
                                                    `workExperience${index}EndDate`
                                                ]
                                            }
                                        </p>
                                    )}
                                    {errors[
                                        `workExperience${index}Description`
                                    ] && (
                                        <p className="text-red-500 text-xs">
                                            {
                                                errors[
                                                    `workExperience${index}Description`
                                                ]
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Other Links Section */}
                    <div className="relative col-span-1 lg:col-span-2 mb-[-15px]">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-800">
                                Other Links
                            </label>
                            <button
                                type="button"
                                onClick={handleAddOtherLink}
                                className="flex items-center px-3 py-1.5 border border-purple-600 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-50 transition"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Link
                            </button>
                        </div>

                        {/* Existing Links */}
                        {formData.otherLinks.map((linkObj, index) => (
                            <div
                                key={index}
                                className="mb-4 p-3 border border-purple-400 rounded-lg bg-gray-50"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-medium text-gray-800">
                                        Link {index + 1}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveOtherLink(index)
                                        }
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <Plus className="rotate-45 w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                    <input
                                        type="text"
                                        value={linkObj.title}
                                        onChange={(e) =>
                                            handleOtherLinkChange(
                                                index,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter link title"
                                        className={`w-full bg-white h-10 px-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 ${
                                            errors[`titleLink${index}`]
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    <input
                                        type="url"
                                        value={linkObj.url}
                                        onChange={(e) =>
                                            handleOtherLinkChange(
                                                index,
                                                "url",
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://example.com"
                                        className={`w-full bg-white h-10 px-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-200 ${
                                            errors[`link${index}`]
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        }`}
                                    />
                                </div>

                                {/* Error Messages */}
                                <div className="mt-1 space-y-1">
                                    {errors[`titleLink${index}`] && (
                                        <p className="text-red-500 text-xs">
                                            {errors[`titleLink${index}`]}
                                        </p>
                                    )}
                                    {errors[`link${index}`] && (
                                        <p className="text-red-500 text-xs">
                                            {errors[`link${index}`]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Expectations */}
                    <div className="relative col-span-1 lg:col-span-2">
                        <label
                            htmlFor="expectations"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            What Talent seekers can expect from you
                        </label>
                        <div className="relative">
                            <textarea
                                id="expectations"
                                name="expectations"
                                value={formData.expectations}
                                onChange={handleChange}
                                placeholder="Describe what Talent seekers can expect from you"
                                className="w-full h-11 pr-10 sm:pr-12 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:border-purple-400 resize-y min-h-[80px] sm:min-h-[100px]"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    enhanceField(
                                        "expectations",
                                        formData.expectations
                                    )
                                }
                                disabled={enhanceLoading.expectations}
                                className={`absolute right-2 sm:right-3 top-2 sm:top-3 text-purple-600 hover:text-purple-800 disabled:text-gray-300 p-1 ${
                                    enhanceLoading.expectations
                                        ? "animate-pulse"
                                        : ""
                                }`}
                                title={
                                    enhanceLoading.expectations
                                        ? "Enhancing..."
                                        : "Enhance"
                                }
                            >
                                <FaMagic className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Any Other Info */}
                    <div className="relative col-span-1 lg:col-span-2">
                        <label
                            htmlFor="anyOtherInfo"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Any Other Information
                        </label>
                        <div className="relative">
                            <textarea
                                id="anyOtherInfo"
                                name="anyOtherInfo"
                                value={formData.anyOtherInfo}
                                onChange={handleChange}
                                placeholder="Additional information"
                                className="w-full h-11 pr-10 sm:pr-12 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:border-purple-400 resize-y min-h-[80px] sm:min-h-[100px]"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    enhanceField(
                                        "anyOtherInfo",
                                        formData.anyOtherInfo
                                    )
                                }
                                disabled={enhanceLoading.anyOtherInfo}
                                className={`absolute right-2 sm:right-3 top-2 sm:top-3 text-purple-600 hover:text-purple-800 disabled:text-gray-300 p-1 ${
                                    enhanceLoading.anyOtherInfo
                                        ? "animate-pulse"
                                        : ""
                                }`}
                                title={
                                    enhanceLoading.anyOtherInfo
                                        ? "Enhancing..."
                                        : "Enhance"
                                }
                            >
                                <FaMagic className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                        <p className="col-span-1 lg:col-span-2 text-red-500 text-xs sm:text-sm mt-1">
                            {errors.submit}
                        </p>
                    )}

                    {/* Action Buttons */}
                   




                </form>
            )}
            {step === 4 && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 p-6 sm:p-10 bg-white border border-purple-300 rounded-xl shadow-md animate-fade-in">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#a100ff]">
                        🎉 Submission Successful!
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base max-w-xl leading-relaxed">
                        Your listing has been submitted successfully. It will
                        take up to <strong>72 hours</strong> to verify your
                        post. Once approved, you will be notified via email.
                    </p>
                    <p className="text-green-600 font-medium text-sm sm:text-base">
                        Thank you for being part of our community 💜
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            onClose() // change this to your actual dashboard route
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg shadow transition duration-200 transform hover:scale-105 text-sm sm:text-base"
                    >
                        Go to Dashboard →
                    </button>
                </div>
            )}
    </div>
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between gap-4">
    {step === 1 && (
        <div className="flex justify-between w-full">
            <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto bg-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto bg-[#A100FF] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
                Next
            </button>
        </div>
    )}

    {step === 2 && (
        <div className="flex justify-between w-full">
            <button
                type="button"
                onClick={handleBack}
                className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-2.5 lg:py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm lg:text-base"
            >
                Back
            </button>
            <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto bg-[#A100FF] text-white px-6 py-2.5 lg:py-3 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm lg:text-base"
            >
                Next
            </button>
        </div>
    )}

    {step === 3 && (
        <div className="flex justify-between w-full">
            <button
                type="button"
                onClick={handleBack}
                className="w-full sm:w-auto bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base order-2 sm:order-1"
            >
                Back
            </button>
            <button
                type="button"
              onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full sm:w-auto bg-[#A100FF] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium 
                ${
                    isSubmitting
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-purple-700"
                } 
                focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base order-1 sm:order-2`}
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        Submitting...
                    </div>
                ) : (
                    "Submit"
                )}
            </button>
        </div>
    )}

    {step === 4 && (
        <button
            type="button"
            onClick={() => {
                onClose();
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg shadow transition duration-200 transform hover:scale-105 text-sm sm:text-base"
        >
            Go to Dashboard →
        </button>
    )}
</div>
            {isRequestModalOpen && (
                <RequestDomainRoleSkills
                    onClose={() => setIsRequestModalOpen(false)}
                    onSubmit={(data) => {
                        console.log("Submitted request:", data);
                        setIsRequestModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

export default GetDiscoveredForm;
