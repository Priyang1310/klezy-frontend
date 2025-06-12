import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { FaMagic } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import chroma from "chroma-js";
import makeAnimated from "react-select/animated";

function FounderPostForm({ onClose }) {
    const animatedComponents = makeAnimated();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        userType: "",
        otherUserType: "",
        requirementType: "",
        otherRequirementType: "",
        startUpName: "",
        aboutEntity: "",
        email: "",
        country: "",
        state: "",
        district: "",
        websiteOfStartupLink: "",
        contact_methods: {
            call: { selected: false, value: "" },
            whatsapp: { selected: false, value: "" },
            instagram: { selected: false, value: "" },
            linkedin: { selected: false, value: "" },
            facebook: { selected: false, value: "" },
            other: { selected: false, value: "" },
        },
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
        jobTimeType: null,
        jobAmountRange: { min: "", max: "" },
        freelancePaymentRange: { min: "", max: "" },
        projectDescription: "",
        percentageBasisValue: "",
        timeCommitment: { value: "", unit: "" },
        equityBasisValue: "",
        otherWorkBasis: "",
        workMode: { Remote: false, Hybrid: false, Onsite: false },
        workLocation: { country: "", state: "", district: "" },
        experienceRange: { min: "", max: "" },
        aboutOpportunity: "",
        responsibilities: "",
        whyShouldJoin: "",
        anyOtherInfo: "",
    });
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
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
    const [enhanceLoading, setEnhanceLoading] = useState({}); // Track loading state for each field

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3333/api/founder/get-pre-filled-details",
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

        setFormData((prev) => {
            const updatedFormData = { ...prev, [name]: value };

            // Handle userType changes
            if (name === "userType" && value !== "Other") {
                updatedFormData.otherUserType = "";
            }

            // Handle requirementType changes
            if (name === "requirementType") {
                if (value !== "Other") {
                    updatedFormData.otherRequirementType = "";
                }
                if (value !== "Business" && value !== "Startup") {
                    updatedFormData.startUpName = "";
                }
            }

            return updatedFormData;
        });

        setErrors((prev) => ({
            ...prev,
            [name]: "",
            ...(name === "userType" && value !== "Other"
                ? { otherUserType: "" }
                : {}),
            ...(name === "requirementType" && value !== "Other"
                ? { otherRequirementType: "" }
                : {}),
            ...(name === "requirementType" &&
                value !== "Business" &&
                value !== "Startup"
                ? { startUpName: "" }
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
            internshipDuration: { value: "", unit: "" },
            internshipStipendRange: { min: "", max: "" },
            internshipPerformanceCriteria: "",
            collaborationDescription: "",
            jobTimeType: "",
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
            allRoles.sort();
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

    // Enhance individual field
    const enhanceField = async (fieldName, value, nestedField = null) => {
        setEnhanceLoading((prev) => ({ ...prev, [fieldName]: true }));
        try {
            const response = await axios.post(
                "http://localhost:3333/api/enhance/process-field",
                {
                    field: nestedField
                        ? `${fieldName}.${nestedField}`
                        : fieldName,
                    content: value,
                    enhance: true,
                }
            );
            setFormData((prev) => {
                if (nestedField) {
                    return {
                        ...prev,
                        [fieldName]: {
                            ...prev[fieldName],
                            [nestedField]:
                                response.data[fieldName]?.[nestedField] ||
                                value,
                        },
                    };
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
        setEnhanceLoading((prev) => ({ ...prev, [fieldName]: false }));
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
        if (!formData.requirementType)
            newErrors.requirementType = "Requirement type is required";
        if (
            formData.requirementType === "Other" &&
            !formData.otherRequirementType.trim()
        )
            newErrors.otherRequirementType = "Please specify requirement type";
        if (
            ["Startup", "Business"].includes(formData.requirementType) &&
            !formData.startUpName.trim()
        )
            newErrors.startUpName = "Business/Startup Name is required";
        if (
            formData.websiteOfStartupLink &&
            !/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
                formData.websiteOfStartupLink
            )
        )
            newErrors.websiteOfStartupLink =
                "Invalid URL (must start with https://)";

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
                    ] = `Please provide your ${method} ${method === "whatsapp" || method === "call"
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
                "Collaboration description is required";
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
            newErrors.projectDescription = "Project Criteria is required";
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
            !formData.experienceRange.min.trim() ||
            isNaN(formData.experienceRange.min) ||
            Number(formData.experienceRange.min) < 0
        )
            newErrors.experienceRange = {
                ...newErrors.experienceRange,
                min: "Valid minimum experience is required",
            };
        if (
            !formData.experienceRange.max.trim() ||
            isNaN(formData.experienceRange.max) ||
            Number(formData.experienceRange.max) <
            Number(formData.experienceRange.min)
        )
            newErrors.experienceRange = {
                ...newErrors.experienceRange,
                max: "Valid maximum experience is required",
            };
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

        if (!formData.responsibilities.trim())
            newErrors.responsibilities = "Responsibilities are required";
        if (!formData.whyShouldJoin.trim())
            newErrors.whyShouldJoin = "Value proposition is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async () => {
        let isValid = false;
        if (step === 1) isValid = validateStep1();
        else if (step === 2) isValid = validateStep2();

        if (!isValid) return;

        // Sanitize all text fields before proceeding
        let textFields = [];
        if (step === 1) {
            textFields = [
                { field: "otherUserType", value: formData.otherUserType },
                {
                    field: "otherRequirementType",
                    value: formData.otherRequirementType,
                },
                { field: "startUpName", value: formData.startUpName },
                { field: "aboutEntity", value: formData.aboutEntity },
                {
                    field: "websiteOfStartupLink",
                    value: formData.websiteOfStartupLink,
                },
            ];
            Object.entries(formData.contact_methods).forEach(
                ([method, { selected, value }]) => {
                    if (selected) {
                        textFields.push({
                            field: `contact_methods.${method}.value`,
                            value,
                        });
                    }
                }
            );
        } else if (step === 2) {
            textFields = [
                { field: "headline", value: formData.headline },
                {
                    field: "partnershipCriteria",
                    value: formData.partnershipCriteria,
                },
                {
                    field: "internshipDuration.value",
                    value: formData.internshipDuration.value,
                },
                {
                    field: "internshipStipendRange.min",
                    value: formData.internshipStipendRange.min,
                },
                {
                    field: "internshipStipendRange.max",
                    value: formData.internshipStipendRange.max,
                },
                {
                    field: "internshipPerformanceCriteria",
                    value: formData.internshipPerformanceCriteria,
                },
                {
                    field: "collaborationDescription",
                    value: formData.collaborationDescription,
                },
                {
                    field: "jobAmountRange.min",
                    value: formData.jobAmountRange.min,
                },
                {
                    field: "jobAmountRange.max",
                    value: formData.jobAmountRange.max,
                },
                {
                    field: "freelancePaymentRange.min",
                    value: formData.freelancePaymentRange.min,
                },
                {
                    field: "freelancePaymentRange.max",
                    value: formData.freelancePaymentRange.max,
                },
                {
                    field: "projectDescription",
                    value: formData.projectDescription,
                },
                {
                    field: "percentageBasisValue",
                    value: formData.percentageBasisValue,
                },
                { field: "timeCommitment.value", value: formData.timeCommitment.value },
                { field: "timeCommitment.unit", value: formData.timeCommitment.unit },
                { field: "equityBasisValue", value: formData.equityBasisValue },
                { field: "otherWorkBasis", value: formData.otherWorkBasis },
                {
                    field: "experienceRange.min",
                    value: formData.experienceRange.min,
                },
                {
                    field: "experienceRange.max",
                    value: formData.experienceRange.max,
                },
            ];
        }

        if (step === 1) setStep(2);
        else if (step === 2) setStep(3);
    };

    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep3()) {
            try {
                const domain = domains.find((d) => d.value === formData.domainName);
                const role = allRoles.find((r) => r.value === formData.roleUnderDomain);

                // Map country ISO code to full name
                const countryObj = countries.find((c) => c.isoCode === formData.workLocation.country);
                const countryName = countryObj ? countryObj.name : formData.workLocation.country;

                // Map state ISO code to full name
                const stateObj = states.find((s) => s.isoCode === formData.workLocation.state);
                const stateName = stateObj ? stateObj.name : formData.workLocation.state;

                const submitData = {
                    ...formData,
                    domainName: domain ? domain.label : formData.domainName,
                    roleUnderDomain: role ? role.label : formData.roleUnderDomain,
                    skills: formData.skills.map((skill) => skill.name),
                    workBasis: Object.keys(formData.workBasis).filter(
                        (key) => formData.workBasis[key]
                    ),
                    workMode: Object.keys(formData.workMode).filter((key) => formData.workMode[key]),
                    call: formData.contact_methods.call.selected
                        ? formData.contact_methods.call.value
                        : "",
                    whatsapp: formData.contact_methods.whatsapp.selected
                        ? formData.contact_methods.whatsapp.value
                        : "",
                    instagram: formData.contact_methods.instagram.selected
                        ? formData.contact_methods.instagram.value
                        : "",
                    linkedin: formData.contact_methods.linkedin.selected
                        ? formData.contact_methods.linkedin.value
                        : "",
                    facebook: formData.contact_methods.facebook.selected
                        ? formData.contact_methods.facebook.value
                        : "",
                    otherContact: formData.contact_methods.other.selected
                        ? formData.contact_methods.other.value
                        : "",
                    workCountry: countryName, // Use full country name
                    workState: stateName, // Use full state name
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
                    experienceRange:
                        formData.experienceRange.min &&
                            formData.experienceRange.max
                            ? `${formData.experienceRange.min}-${formData.experienceRange.max} years`
                            : "",
                    jobAmountRange:
                        formData.workBasis.Job &&
                            formData.jobAmountRange.min &&
                            formData.jobAmountRange.max
                            ? `${formData.jobAmountRange.min}-${formData.jobAmountRange.max} ruppes`
                            : "",
                    timeCommitment:
                        formData.timeCommitment.value && formData.timeCommitment.unit
                            ? `${formData.timeCommitment.value} ${formData.timeCommitment.unit}`
                            : "",
                };
                console.log(submitData)
                delete submitData.contact_methods;
                const response = await fetch(
                    "http://localhost:3333/api/founder/add-listing/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(submitData),
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    console.log("Form submitted:", submitData);
                    onClose();
                } else {
                    setErrors({
                        submit: "Failed to submit the form. Please try again.",
                    });
                }
            } catch (err) {
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
            requirementType: "",
            otherRequirementType: "",
            startUpName: "",
            aboutEntity: "",
            email: formData.email,
            country: formData.country,
            state: formData.state,
            district: formData.district,
            timeCommitment: { value: "", unit: "" },
            websiteOfStartupLink: "",
            contact_methods: {
                call: { selected: false, value: "" },
                whatsapp: { selected: false, value: "" },
                instagram: { selected: false, value: "" },
                linkedin: { selected: false, value: "" },
                facebook: { selected: false, value: "" },
                other: { selected: false, value: "" },
            },
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
            equityBasisValue: "",
            otherWorkBasis: "",
            workMode: { Remote: false, Hybrid: false, Onsite: false },
            workLocation: { country: "", state: "", district: "" },
            experienceRange: { min: "", max: "" },
            aboutOpportunity: "",
            responsibilities: "",
            whyShouldJoin: "",
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

    if (loadingProfile) {
        return <div>Loading profile data...</div>;
    }

    if (profileError) {
        return <div className="text-red-500">{profileError}</div>;
    }

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl w-full">
            <div className="hidden md:flex h-20 items-center justify-center gap-5 rounded-t-2xl mb-6 border-b border-gray-200 w-full max-w-4xl mx-auto text-xl">
    <div className="flex flex-col">
        <p className="flex items-center gap-2">
            01{" "}
            <span className="text-sm text-violet-600">
                About Founder
            </span>
        </p>
        <div className="flex items-center gap-1">
            <div className="flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 bg-violet-600">
                ✓
            </div>
            <div className={`w-[100px] lg:w-[150px] h-1 ${step > 1 ? "bg-violet-600" : "bg-gray-200"}`}></div>
        </div>
    </div>
    <div className="flex flex-col">
        <p className="flex items-center gap-2">
            02{" "}
            <span className={`text-sm ${step > 1 ? "text-violet-600" : "text-black"}`}>
                Skills and Strength
            </span>
        </p>
        <div className="flex items-center gap-1">
            <div className={`flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 ${step > 1 ? "bg-violet-600" : "bg-white"}`}>
                ✓
            </div>
            <div className={`w-[100px] lg:w-[150px] h-1 ${step > 2 ? "bg-violet-600" : "bg-gray-200"}`}></div>
        </div>
    </div>
    <div className="flex flex-col">
        <p className="flex items-center gap-2 w-[100px] lg:w-[150px]">
            03{" "}
            <span className={`text-sm ${step > 2 ? "text-violet-600" : "text-black"}`}>
                Looking for
            </span>
        </p>
        <div className="flex items-center gap-1">
            <div className={`flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 ${step > 2 ? "bg-violet-600" : "bg-white"}`}>
                ✓
            </div>
        </div>
    </div>
</div>

{/* Mobile Layout */}
<div className="md:hidden rounded-t-2xl mb-6 border-b border-gray-200 w-full mx-auto py-4">
    {/* Progress Bar */}
    <div className="flex items-center justify-center mb-4 px-4">
        <div className="flex items-center w-full max-w-sm">
            <div className="flex items-center justify-center h-6 w-6 rounded-full text-white text-xs font-semibold border border-violet-600 bg-violet-600">
                ✓
            </div>
            <div className={`flex-1 h-1 mx-2 ${step > 1 ? "bg-violet-600" : "bg-gray-200"}`}></div>
            <div className={`flex items-center justify-center h-6 w-6 rounded-full text-white text-xs font-semibold border border-violet-600 ${step > 1 ? "bg-violet-600" : "bg-white"}`}>
                ✓
            </div>
            <div className={`flex-1 h-1 mx-2 ${step > 2 ? "bg-violet-600" : "bg-gray-200"}`}></div>
            <div className={`flex items-center justify-center h-6 w-6 rounded-full text-white text-xs font-semibold border border-violet-600 ${step > 2 ? "bg-violet-600" : "bg-white"}`}>
                ✓
            </div>
        </div>
    </div>

    {/* Step Labels */}
    <div className="flex justify-between items-center px-4 text-sm">
        <div className="flex flex-col items-center">
            <span className="text-xs font-medium mb-1">01</span>
            <span className="text-violet-600 text-center leading-tight">About Founder</span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-xs font-medium mb-1">02</span>
            <span className={`text-center leading-tight ${step > 1 ? "text-violet-600" : "text-black"}`}>
                Skills & Strength
            </span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-xs font-medium mb-1">03</span>
            <span className={`text-center leading-tight ${step > 2 ? "text-violet-600" : "text-black"}`}>
                Looking for
            </span>
        </div>
    </div>
</div>

{step === 1 && (
    <div className="flex flex-col sm:flex-row items-center w-full bg-violet-100 px-3 sm:px-5 py-4 sm:py-0 rounded-2xl mb-5 gap-3 sm:gap-0">
        <div className="flex flex-col text-center sm:text-left">
            <p className="text-violet-700 text-lg sm:text-xl font-semibold">
                Stay It Your Way
            </p>
            <p className="text-violet-400 text-sm sm:text-base">
                This isn't your typical hiring form. In a few short
                questions, you'll paint a picture of your world and
                who you're looking for — no corporate lingo
                required.
            </p>
        </div>
        <img 
            src="./FormImage1.svg" 
            alt="Stay It Your Way" 
            className="scale-125 sm:scale-150 w-16 h-16 sm:w-auto sm:h-auto flex-shrink-0" 
        />
    </div>
)}

{step === 2 && (
    <div className="flex flex-col sm:flex-row items-center w-full bg-violet-100 px-3 sm:px-5 py-4 sm:py-0 rounded-2xl mb-5 gap-3 sm:gap-0">
        <div className="flex flex-col text-center sm:text-left">
            <p className="text-violet-700 text-lg sm:text-xl font-semibold">
                You're almost there!
            </p>
            <p className="text-violet-400 text-sm sm:text-base">
                This fun little form helps you describe your vibe
                and your need — quick, casual, and human. No
                resumes, no HR jargon. Just say it like it is.
            </p>
        </div>
        <img 
            src="./FormImage2.svg" 
            alt="You're almost there!" 
            className="w-16 h-16 sm:w-auto sm:h-auto flex-shrink-0" 
        />
    </div>
)}

{step === 3 && (
    <div className="flex flex-col sm:flex-row items-center w-full bg-violet-100 px-3 sm:px-5 py-4 sm:py-0 rounded-2xl mb-5 gap-3 sm:gap-0">
        <div className="flex flex-col text-center sm:text-left">
            <p className="text-violet-700 text-lg sm:text-xl font-semibold">
                You've made it to the final step!
            </p>
            <p className="text-violet-400 text-sm sm:text-base">
                This short form captures who you are, what you need,
                and how your team works — no fluff, no lengthy job
                descriptions. Just clear, honest details. Done in
                minutes.
            </p>
        </div>
        <img 
            src="./FormImage3.svg" 
            alt="You've made it to the final step!" 
            className="w-16 h-16 sm:w-auto sm:h-auto flex-shrink-0" 
        />
    </div>
)}

            {step === 1 && (
                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <h3 className="col-span-full text-lg sm:text-xl font-semibold text-[#7900BF] mb-2 sm:mb-4">
                        Let's introduce you to the world.
                    </h3>
                    
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
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 text-sm sm:text-base"
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
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 text-sm sm:text-base"
                        />
                    </div>

                    <div className="relative md:col-span-2 lg:col-span-1">
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
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 text-sm sm:text-base"
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
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 text-sm sm:text-base"
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
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 text-sm sm:text-base"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.state}
                            </p>
                        )}
                    </div>

                    <div className="relative md:col-span-2 lg:col-span-1">
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
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 text-sm sm:text-base"
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
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 text-sm sm:text-base"
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

                    <div className="relative md:col-span-1 lg:col-span-2">
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
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 text-sm sm:text-base"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Personal Website */}
                    <div className="relative col-span-full">
                        <label
                            htmlFor="websiteOfStartupLink"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Personal website
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                id="websiteOfStartupLink"
                                name="websiteOfStartupLink"
                                value={formData.websiteOfStartupLink}
                                onChange={handleChange}
                                type="url"
                                placeholder="Enter website URL (https://)"
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                                    errors.websiteOfStartupLink
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                        </div>
                        {errors.websiteOfStartupLink && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.websiteOfStartupLink}
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
                                "Business Owner",
                                "Startup Founder",
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
                                <div className="flex flex-col sm:flex-row items-center gap-2">
                                    <input
                                        id="otherUserType"
                                        name="otherUserType"
                                        value={formData.otherUserType}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Specify your user type"
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
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

                    {/* Requirement Type */}
                    <div className="relative col-span-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-1">
                            This requirement is for a{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                            {[
                                "Business",
                                "Startup",
                                "Side Project",
                                "Personal Need",
                                "Other",
                            ].map((type) => (
                                <label key={type} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="requirementType"
                                        value={type}
                                        checked={
                                            formData.requirementType === type
                                        }
                                        onChange={handleChange}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="ml-2 text-sm sm:text-base text-gray-700">
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {errors.requirementType && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.requirementType}
                            </p>
                        )}
                        {formData.requirementType === "Other" && (
                            <div className="mt-4">
                                <label
                                    htmlFor="otherRequirementType"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Specify Requirement Type{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-col sm:flex-row items-center gap-2">
                                    <input
                                        id="otherRequirementType"
                                        name="otherRequirementType"
                                        value={formData.otherRequirementType}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Specify requirement type"
                                        className={`w-full sm:w-[50%] px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                                            errors.otherRequirementType
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                </div>
                                {errors.otherRequirementType && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                                        {errors.otherRequirementType}
                                    </p>
                                )}
                            </div>
                        )}
                        {["Startup", "Business"].includes(
                            formData.requirementType
                        ) && (
                                <div className="mt-4">
                                    <label
                                        htmlFor="startUpName"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Business/Startup Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-col sm:flex-row items-center gap-2">
                                        <input
                                            id="startUpName"
                                            name="startUpName"
                                            value={formData.startUpName}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter business/startup name"
                                            className={`w-full sm:w-[50%] px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                                                errors.startUpName
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                    </div>
                                    {errors.startUpName && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                                            {errors.startUpName}
                                        </p>
                                    )}
                                </div>
                            )}
                    </div>

                    {/* About Entity */}
                    {formData.requirementType && (
                        <div className="relative col-span-full lg:col-span-2">
                            <label
                                htmlFor="aboutEntity"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                About your requirement
                            </label>
                            <div className="relative">
                                <textarea
                                    id="aboutEntity"
                                    name="aboutEntity"
                                    value={formData.aboutEntity}
                                    onChange={handleChange}
                                    maxLength={300}
                                    placeholder="Briefly describe your business/project/startup"
                                    rows={4}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base resize-none"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        enhanceField(
                                            "aboutEntity",
                                            formData.aboutEntity
                                        )
                                    }
                                    disabled={enhanceLoading.aboutEntity}
                                    className={`absolute right-2 sm:right-3 top-2 sm:top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                                        enhanceLoading.aboutEntity
                                            ? "animate-pulse"
                                            : ""
                                    }`}
                                    title={
                                        enhanceLoading.aboutEntity
                                            ? "Enhancing..."
                                            : "Enhance"
                                    }
                                >
                                    <FaMagic className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    )}

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
                        <div className="mt-4 space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
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
                                                            inputClass={`w-full h-10 sm:h-12 px-3 sm:px-4 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 text-sm sm:text-base ${
                                                                errors[
                                                                    `${method}Value`
                                                                ]
                                                                    ? "border-red-500"
                                                                    : ""
                                                            } `}
                                                            buttonClass="border-gray-300 h-10 sm:h-14 w-12 sm:w-16"
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
                                                        placeholder={`Enter your ${method} URL (https://)`}
                                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
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

                    {/* Action Buttons */}
                    <div className="col-span-full flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
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
                            className="w-full sm:w-auto bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                        >
                            Next Step
                        </button>
                    </div>
                </form>
            )}

            {step === 2 && (
  <form className="grid grid-cols-1 gap-6">
    <h3 className="text-xl font-semibold text-[#7900BF] mb-4">
      Your dream teammate, freelancer, or hire — describe them here.
    </h3>

    <div className="relative">
      <button
        type="button"
        onClick={() => setIsRequestModalOpen(true)}
        className="mb-2 text-sm text-purple-600 hover:text-purple-800 underline"
      >
        Request Domain, Role, Skill
      </button>
      <label
        htmlFor="headline"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Headline (e.g., I am looking for...){" "}
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
          className={`w-full pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.headline ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => enhanceField("headline", formData.headline)}
          disabled={enhanceLoading.headline}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
            enhanceLoading.headline ? "animate-pulse" : ""
          }`}
          title={enhanceLoading.headline ? "Enhancing..." : "Enhance"}
        >
          <FaMagic className="w-5 h-5" />
        </button>
      </div>
      {errors.headline && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.headline}
        </p>
      )}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="relative">
        <label
          htmlFor="roleUnderDomain"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Role of person needed <span className="text-red-500">*</span>
        </label>
        <Select
          key={formData.domainName}
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={filteredRoles}
          value={filteredRoles.find(
            (role) => role.value === formData.roleUnderDomain
          )}
          onChange={handleRoleSelect}
          placeholder="Select a role"
          isClearable
          classNamePrefix="react-select"
        />
        {errors.roleUnderDomain && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.roleUnderDomain}
          </p>
        )}
      </div>
      <div className="relative">
        <label
          htmlFor="domainName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Domain of person needed <span className="text-red-500">*</span>
        </label>
        {loadingDomains ? (
          <p className="text-gray-500">Loading domains...</p>
        ) : (
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={domains}
            value={domains.find(
              (domain) => domain.value === formData.domainName
            )}
            onChange={handleDomainSelect}
            placeholder="Select a domain"
            isClearable
            classNamePrefix="react-select"
          />
        )}
        {errors.domainName && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.domainName}
          </p>
        )}
      </div>
    </div>

    {formData.domainName && (
      <div className="relative">
        <label
          htmlFor="skills"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Skills <span className="text-red-500">*</span>
        </label>
        <Select
          id="skills"
          isMulti
          name="skills"
          value={selectedSkills}
          options={skillOptions.filter(
            (skill) => !formData.skills.some((s) => s._id === skill.value)
          )}
          onChange={(selectedOptions) => {
            const updatedSkills = selectedOptions.map((opt) => ({
              _id: opt.value,
              name: opt.label,
            }));
            setFormData({ ...formData, skills: updatedSkills });
          }}
          styles={colourStyles}
          placeholder="Type to search skills"
          closeMenuOnSelect={false}
        />
        {errors.skills && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.skills}
          </p>
        )}
      </div>
    )}

    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Work Basis <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2 flex-shrink-0"
            />
            <label
              htmlFor={basis}
              className="text-gray-700 text-sm leading-tight"
            >
              {basis.replace(/([A-Z])/g, " $1").trim()}
            </label>
          </div>
        ))}
      </div>
      {errors.workBasis && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.workBasis}
        </p>
      )}

      <div className="mt-4 space-y-4">
        {formData.workBasis.Partnership && (
          <div className="relative">
            <label
              htmlFor="partnershipCriteria"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Partnership Criteria <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="partnershipCriteria"
                name="partnershipCriteria"
                value={formData.partnershipCriteria}
                onChange={handleChange}
                placeholder="Describe the partnership criteria"
                className={`w-full pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
                  errors.partnershipCriteria ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  enhanceField("partnershipCriteria", formData.partnershipCriteria)
                }
                disabled={enhanceLoading.partnershipCriteria}
                className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                  enhanceLoading.partnershipCriteria ? "animate-pulse" : ""
                }`}
                title={
                  enhanceLoading.partnershipCriteria ? "Enhancing..." : "Enhance"
                }
              >
                <FaMagic className="w-5 h-5" />
              </button>
            </div>
            {errors.partnershipCriteria && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.partnershipCriteria}
              </p>
            )}
          </div>
        )}

        {formData.workBasis.Internship && (
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internship Time Type <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {["FullTime", "PartTime"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="internshipTimeType"
                      value={type}
                      checked={formData.internshipTimeType === type}
                      onChange={() => handleInternshipTimeTypeChange(type)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                    />
                    <span className="text-gray-700 text-sm sm:text-base">
                      {type === "FullTime" ? "Full-time" : "Part-time"}
                    </span>
                  </label>
                ))}
              </div>
              {errors.internshipTimeType && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.internshipTimeType}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internship Type <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {["Paid", "Unpaid", "PerformanceBased"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="internshipType"
                      value={type}
                      checked={formData.internshipType === type}
                      onChange={() => handleInternshipTypeChange(type)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                    />
                    <span className="text-gray-700 text-sm sm:text-base">
                      {type.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </label>
                ))}
              </div>
              {errors.internshipType && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.internshipType}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="internshipDuration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Internship Duration <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="internshipDuration"
                  name="internshipDuration.value"
                  value={formData.internshipDuration.value}
                  onChange={(e) =>
                    handleNestedChange(
                      "internshipDuration",
                      "value",
                      e.target.value
                    )
                  }
                  type="number"
                  min="1"
                  placeholder="Duration"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                    errors.internshipDuration?.value
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <select
                  id="internshipDurationUnit"
                  name="internshipDuration.unit"
                  value={formData.internshipDuration.unit}
                  onChange={(e) =>
                    handleNestedChange(
                      "internshipDuration",
                      "unit",
                      e.target.value
                    )
                  }
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                    errors.internshipDuration?.unit
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Unit</option>
                  <option value="Weeks">Weeks</option>
                  <option value="Months">Months</option>
                  <option value="Years">Years</option>
                </select>
              </div>
              {errors.internshipDuration && (
                <div className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.internshipDuration.value && (
                    <p>{errors.internshipDuration.value}</p>
                  )}
                  {errors.internshipDuration.unit && (
                    <p>{errors.internshipDuration.unit}</p>
                  )}
                </div>
              )}
            </div>

            {formData.internshipType === "Paid" && (
              <div className="relative">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stipend Range (₹) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="internshipStipendRangeMin"
                    name="internshipStipendRange.min"
                    value={formData.internshipStipendRange.min}
                    onChange={(e) =>
                      handleNestedChange(
                        "internshipStipendRange",
                        "min",
                        e.target.value
                      )
                    }
                    type="number"
                    min="0"
                    placeholder="Min stipend"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                      errors.internshipStipendRange?.min
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <input
                    id="internshipStipendRangeMax"
                    name="internshipStipendRange.max"
                    value={formData.internshipStipendRange.max}
                    onChange={(e) =>
                      handleNestedChange(
                        "internshipStipendRange",
                        "max",
                        e.target.value
                      )
                    }
                    type="number"
                    min="0"
                    placeholder="Max stipend"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                      errors.internshipStipendRange?.max
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.internshipStipendRange && (
                  <div className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.internshipStipendRange.min && (
                      <p>{errors.internshipStipendRange.min}</p>
                    )}
                    {errors.internshipStipendRange.max && (
                      <p>{errors.internshipStipendRange.max}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {formData.internshipType === "PerformanceBased" && (
              <div className="relative">
                <label
                  htmlFor="internshipPerformanceCriteria"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Performance Criteria <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="internshipPerformanceCriteria"
                    name="internshipPerformanceCriteria"
                    value={formData.internshipPerformanceCriteria}
                    onChange={handleChange}
                    placeholder="Describe performance criteria"
                    className={`w-full pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
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
                    disabled={enhanceLoading.internshipPerformanceCriteria}
                    className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
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
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.internshipPerformanceCriteria}
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Collaboration Description <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="collaborationDescription"
                name="collaborationDescription"
                value={formData.collaborationDescription}
                onChange={handleChange}
                placeholder="Describe the collaboration"
                className={`w-full pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
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
                disabled={enhanceLoading.collaborationDescription}
                className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                  enhanceLoading.collaborationDescription ? "animate-pulse" : ""
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
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.collaborationDescription}
              </p>
            )}
          </div>
        )}

        {formData.workBasis.Job && (
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Time Type <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {["FullTime", "PartTime"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="jobTimeType"
                      value={type}
                      checked={formData.jobTimeType === type}
                      onChange={(e) =>
                        handleNestedChange("jobTimeType", null, e.target.value)
                      }
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                    />
                    <span className="text-gray-700 text-sm sm:text-base">
                      {type === "FullTime" ? "Full-time" : "Part-time"}
                    </span>
                  </label>
                ))}
              </div>
              {errors.jobTimeType && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.jobTimeType}
                </p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="jobAmountRangeMin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Amount Range (₹) <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="jobAmountRangeMin"
                  name="jobAmountRange.min"
                  value={formData.jobAmountRange.min}
                  onChange={(e) =>
                    handleNestedChange("jobAmountRange", "min", e.target.value)
                  }
                  type="number"
                  min="0"
                  placeholder="Min amount"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                    errors.jobAmountRange?.min ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <input
                  id="jobAmountRangeMax"
                  name="jobAmountRange.max"
                  value={formData.jobAmountRange.max}
                  onChange={(e) =>
                    handleNestedChange("jobAmountRange", "max", e.target.value)
                  }
                  type="number"
                  min="0"
                  placeholder="Max amount"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                    errors.jobAmountRange?.max ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.jobAmountRange && (
                <div className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.jobAmountRange.min && (
                    <p>{errors.jobAmountRange.min}</p>
                  )}
                  {errors.jobAmountRange.max && (
                    <p>{errors.jobAmountRange.max}</p>
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Freelance Payment Range (₹) <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="freelancePaymentRangeMin"
                name="freelancePaymentRange.min"
                value={formData.freelancePaymentRange.min}
                onChange={(e) =>
                  handleNestedChange(
                    "freelancePaymentRange",
                    "min",
                    e.target.value
                  )
                }
                type="number"
                min="0"
                placeholder="Min payment"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                  errors.freelancePaymentRange?.min
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <input
                id="freelancePaymentRangeMax"
                name="freelancePaymentRange.max"
                value={formData.freelancePaymentRange.max}
                onChange={(e) =>
                  handleNestedChange(
                    "freelancePaymentRange",
                    "max",
                    e.target.value
                  )
                }
                type="number"
                min="0"
                placeholder="Max payment"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                  errors.freelancePaymentRange?.max
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            {errors.freelancePaymentRange && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.freelancePaymentRange.min && (
                  <p>{errors.freelancePaymentRange.min}</p>
                )}
                {errors.freelancePaymentRange.max && (
                  <p>{errors.freelancePaymentRange.max}</p>
                )}
              </div>
            )}
          </div>
        )}

        {formData.workBasis.ProjectBasis && (
          <div className="relative">
            <label
              htmlFor="projectDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Criteria <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Describe the project"
                className={`w-full pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
                  errors.projectDescription ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  enhanceField("projectDescription", formData.projectDescription)
                }
                disabled={enhanceLoading.projectDescription}
                className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                  enhanceLoading.projectDescription ? "animate-pulse" : ""
                }`}
                title={
                  enhanceLoading.projectDescription ? "Enhancing..." : "Enhance"
                }
              >
                <FaMagic className="w-5 h-5" />
              </button>
            </div>
            {errors.projectDescription && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.projectDescription}
              </p>
            )}
          </div>
        )}

        {formData.workBasis.PercentageBasis && (
          <div className="relative">
            <label
              htmlFor="percentageBasisValue"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Percentage Value (%) <span className="text-red-500">*</span>
            </label>
            <input
              id="percentageBasisValue"
              name="percentageBasisValue"
              value={formData.percentageBasisValue}
              onChange={handleChange}
              type="text"
              placeholder="Enter percentage value"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                errors.percentageBasisValue ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.percentageBasisValue && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.percentageBasisValue}
              </p>
            )}
          </div>
        )}

        {formData.workBasis.EquityBasis && (
          <div className="relative">
            <label
              htmlFor="equityBasisValue"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Equity Value (%) <span className="text-red-500">*</span>
            </label>
            <input
              id="equityBasisValue"
              name="equityBasisValue"
              value={formData.equityBasisValue}
              onChange={handleChange}
              type="text"
              placeholder="Enter equity value"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                errors.equityBasisValue ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.equityBasisValue && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.equityBasisValue}
              </p>
            )}
          </div>
        )}

        {formData.workBasis.Other && (
          <div className="relative">
            <label
              htmlFor="otherWorkBasis"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Other Work Basis <span className="text-red-500">*</span>
            </label>
            <textarea
              id="otherWorkBasis"
              name="otherWorkBasis"
              value={formData.otherWorkBasis}
              onChange={handleChange}
              placeholder="Describe other work basis"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
                errors.otherWorkBasis ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.otherWorkBasis && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.otherWorkBasis}
              </p>
            )}
          </div>
        )}
      </div>
    </div>

    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Time Commitment
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="timeCommitmentValue"
          name="timeCommitment.value"
          value={formData.timeCommitment.value}
          onChange={(e) =>
            handleNestedChange("timeCommitment", "value", e.target.value)
          }
          type="number"
          min="1"
          placeholder="Enter value"
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.timeCommitment?.value ? "border-red-500" : "border-gray-300"
          }`}
        />
        <select
          id="timeCommitmentUnit"
          name="timeCommitment.unit"
          value={formData.timeCommitment.unit}
          onChange={(e) =>
            handleNestedChange("timeCommitment", "unit", e.target.value)
          }
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.timeCommitment?.unit ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Unit</option>
          <option value="hours/day">Hours/Day</option>
          <option value="hours/week">Hours/Week</option>
          <option value="hours/month">Hours/Month</option>
        </select>
      </div>
      {errors.timeCommitment && (
        <div className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.timeCommitment.value && (
            <p>{errors.timeCommitment.value}</p>
          )}
          {errors.timeCommitment.unit && <p>{errors.timeCommitment.unit}</p>}
        </div>
      )}
    </div>

    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Work Mode <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {["Remote", "Hybrid", "Onsite"].map((mode) => (
          <div key={mode} className="flex items-center">
            <input
              type="checkbox"
              id={mode}
              checked={formData.workMode[mode]}
              onChange={() => handleWorkModeChange(mode)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
            />
            <label
              htmlFor={mode}
              className="text-gray-700 text-sm sm:text-base"
            >
              {mode}
            </label>
          </div>
        ))}
      </div>
      {errors.workMode && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.workMode}
        </p>
      )}
    </div>

    {(formData.workMode.Hybrid || formData.workMode.Onsite) && (
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="workLocationCountry"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="workLocationCountry"
            name="workLocation.country"
            value={formData.workLocation.country}
            onChange={(e) =>
              handleNestedChange("workLocation", "country", e.target.value)
            }
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
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
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.workLocation.country}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="workLocationState"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="workLocationState"
            name="workLocation.state"
            value={formData.workLocation.state}
            onChange={(e) =>
              handleNestedChange("workLocation", "state", e.target.value)
            }
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
              errors.workLocation?.state ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.workLocation?.state && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.workLocation.state}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="workLocationDistrict"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            District <span className="text-red-500">*</span>
          </label>
          <select
            id="workLocationDistrict"
            name="workLocation.district"
            value={formData.workLocation.district}
            onChange={(e) =>
              handleNestedChange("workLocation", "district", e.target.value)
            }
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
              errors.workLocation?.district ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.workLocation?.district && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.workLocation.district}
            </p>
          )}
        </div>
      </div>
    )}

    <div className="relative">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Experience (Years) <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="experienceRangeMin"
          name="experienceRange.min"
          value={formData.experienceRange.min}
          onChange={(e) =>
            handleNestedChange("experienceRange", "min", e.target.value)
          }
          type="number"
          min="0"
          placeholder="Min experience"
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.experienceRange?.min ? "border-red-500" : "border-gray-300"
          }`}
        />
        <input
          id="experienceRangeMax"
          name="experienceRange.max"
          value={formData.experienceRange.max}
          onChange={(e) =>
            handleNestedChange("experienceRange", "max", e.target.value)
          }
          type="number"
          min="0"
          placeholder="Max experience"
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.experienceRange?.max ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {errors.experienceRange && (
        <div className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.experienceRange.min && <p>{errors.experienceRange.min}</p>}
          {errors.experienceRange.max && <p>{errors.experienceRange.max}</p>}
        </div>
      )}
    </div>

    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={handleBack}
        className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base order-2 sm:order-1"
      >
        Back
      </button>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 order-1 sm:order-2">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
        >
          Next Step
        </button>
      </div>
    </div>
  </form>
)}

            {step === 3 && (
  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
    <div className="relative">
      <label
        htmlFor="responsibilities"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Responsibilities <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <textarea
          id="responsibilities"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          maxLength={400}
          placeholder="List key responsibilities"
          className={`w-full pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
            errors.responsibilities ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() =>
            enhanceField("responsibilities", formData.responsibilities)
          }
          disabled={enhanceLoading.responsibilities}
          className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
            enhanceLoading.responsibilities ? "animate-pulse" : ""
          }`}
          title={enhanceLoading.responsibilities ? "Enhancing..." : "Enhance"}
        >
          <FaMagic className="w-5 h-5" />
        </button>
      </div>
      {errors.responsibilities && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.responsibilities}
        </p>
      )}
    </div>

    <div className="relative">
      <label
        htmlFor="whyShouldJoin"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Why Should They Join? <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <textarea
          id="whyShouldJoin"
          name="whyShouldJoin"
          value={formData.whyShouldJoin}
          onChange={handleChange}
          maxLength={300}
          placeholder="What makes this opportunity exciting?"
          className={`w-full pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
            errors.whyShouldJoin ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => enhanceField("whyShouldJoin", formData.whyShouldJoin)}
          disabled={enhanceLoading.whyShouldJoin}
          className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
            enhanceLoading.whyShouldJoin ? "animate-pulse" : ""
          }`}
          title={enhanceLoading.whyShouldJoin ? "Enhancing..." : "Enhance"}
        >
          <FaMagic className="w-5 h-5" />
        </button>
      </div>
      {errors.whyShouldJoin && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.whyShouldJoin}
        </p>
      )}
    </div>

    <div className="relative">
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
          maxLength={200}
          placeholder="Additional details (optional)"
          className={`w-full pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
            errors.anyOtherInfo ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => enhanceField("anyOtherInfo", formData.anyOtherInfo)}
          disabled={enhanceLoading.anyOtherInfo}
          className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
            enhanceLoading.anyOtherInfo ? "animate-pulse" : ""
          }`}
          title={enhanceLoading.anyOtherInfo ? "Enhancing..." : "Enhance"}
        >
          <FaMagic className="w-5 h-5" />
        </button>
      </div>
      {errors.anyOtherInfo && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.anyOtherInfo}
        </p>
      )}
    </div>

    {errors.submit && (
      <p className="text-red-500 text-xs sm:text-sm mt-4">{errors.submit}</p>
    )}

    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={handleBack}
        className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base order-2 sm:order-1"
      >
        Back
      </button>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 order-1 sm:order-2">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
)}
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

export default FounderPostForm;
