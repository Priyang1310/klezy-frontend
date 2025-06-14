import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { FaMagic } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function UpdateFounderPostForm({ listingId,onClose }) {
    const animatedComponents = makeAnimated();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        
        userType: "",
        otherUserType: "",
        requirementType: "",
        otherRequirementType: "",
        startUpName: "",
        aboutEntity: "",
       
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
        profile_pic:"",
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
    // const [loadingProfile, setLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState("");
    const [enhanceLoading, setEnhanceLoading] = useState({}); // Track loading state for each field

    // Fetch profile data
    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const response = await fetch(
    //                 "http://localhost:3333/api/founder/get-pre-filled-details",
    //                 {
    //                     method: "GET",
    //                     credentials: "include",
    //                 }
    //             );
    //             if (!response.ok) throw new Error("Failed to fetch profile");
    //             const data = await response.json();

    //             console.log(data);
    //             setFormData((prev) => ({
    //                 ...prev,
    //                 first_name: data.user.firstName || "",
    //                 middle_name: data.user.middleName || "",
    //                 last_name: data.user.lastName || "",
    //                 gender: data.user.gender || "",
    //                 email: data.user.email || "",
    //                 country: data.user.country || "",
    //                 state: data.user.state || "",
    //                 district: data.user.city || "",
    //             }));
    //         } catch (error) {
    //             setProfileError("Failed to load profile data");
    //             console.error("Error fetching profile:", error);
    //         } finally {
    //             setLoadingProfile(false);
    //         }
    //     };
    //     fetchProfile();
    // }, []);
//    useEffect(() => {
//     const fetchListing = async () => {
//         try {
//             // setLoadingListing(true);
//             const response = await fetch(
//                 `http://localhost:3333/api/founder/get-pre-filled-details-for-update-form/${listingId}`,
//                 {
//                     method: "GET",
//                     credentials: "include",
//                 }
//             );
//             if (!response.ok) throw new Error("Failed to fetch listing data");
//             const  {postData}  = await response.json();
//             const data = postData
//             console.log(data)
//             // Map work location codes
//             let countryCode = "";
//             let stateCode = "";
//             let cityName = "";

//             if (data.workMode.includes("Hybrid") || data.workMode.includes("Onsite")) {
//                 const countryObj = Country.getAllCountries().find(
//                     (c) => c.name === data.workCountry
//                 );
//                 countryCode = countryObj?.isoCode || "";
//                 if (countryCode) {
//                     const stateObj = State.getStatesOfCountry(countryCode).find(
//                         (s) => s.name === data.workState
//                     );
//                     stateCode = stateObj?.isoCode || "";
//                     if (stateCode) {
//                         const cityObj = City.getCitiesOfState(countryCode, stateCode).find(
//                             (c) => c.name === data.workCity
//                         );
//                         cityName = cityObj?.name || data.workCity;
//                     }
//                 }
//                 setStates(State.getStatesOfCountry(countryCode));
//                 setDistricts(City.getCitiesOfState(countryCode, stateCode));
//             }

//             // Helper to parse range strings (e.g., "1000-2000 rupees" or "1-5 years")
//             const parseRange = (str) => {
//     if (!str) return { min: "", max: "" };
//     const match = str.match(/^(\d+)-(\d+)\s*(?:rupees|years)?$/);
//     return match ? { min: match[1], max: match[2] } : { min: "", max: "" };
// };

//             // Helper to parse duration (e.g., "2 Months")
//             const parseDuration = (str) => {
//     if (!str) return { value: "", unit: "" };
//     // Handle formats like "2 hours/month" or "2 Months"
//     const hoursMatch = str.match(/^(\d+)\s*hours\/(\w+)$/);
//     const standardMatch = str.match(/^(\d+)\s*(Weeks|Months|Years)$/);
//     if (hoursMatch) {
//         return { value: hoursMatch[1], unit: `hours/${hoursMatch[2]}` };
//     } else if (standardMatch) {
//         return { value: standardMatch[1], unit: standardMatch[2] };
//     }
//     return { value: "", unit: "" };
// };

//             // Map pre-filled data to formData
//             const newFormData = {
//                 userType: data.userType || "",
//                 otherUserType: data.otherUserType || "",
//                 requirementType: data.requirementType || "",
//                 otherRequirementType: data.otherRequirementType || "",
//                 startUpName: data.startUpName || "",
//                 aboutEntity: data.aboutEntity || "",
//                 websiteOfStartupLink: data.websiteOfStartupLink || "",
//                 contact_methods: {
//                     call: {
//                         selected: !!data.call,
//                         value: data.call || "",
//                     },
//                     whatsapp: {
//                         selected: !!data.whatsapp,
//                         value: data.whatsapp || "",
//                     },
//                     instagram: {
//                         selected: !!data.instagram,
//                         value: data.instagram || "",
//                     },
//                     linkedin: {
//                         selected: !!data.linkedin || "",
//                         value: data.linkedin || "",
//                     },
//                     facebook: {
//                         selected: !!data.facebook,
//                         value: data.facebook || "",
//                     },
//                     other: {
//                         selected: !!data.other,
//                         value: data.email || "",
//                     },
//                 },
//                 headline: data.headline || "",
//                 domainName: "", // To be set after fetching domains
//                 roleUnderDomain: "", // To be set after fetching roles
//                 skills: data.skills?.map((skill, idx) => ({
//                     _id: `temp-${idx}`,
//                     name: skill,
//                 })) || [],
//                 workBasis: {
//                     Partnership: data.workBasis?.includes("Partnership") || false,
//                     Collaboration: data.workBasis?.includes("Collaboration") || false,
//                     Internship: data.workBasis?.includes("Internship") || false,
//                     Job: data.workBasis?.includes("Job") || false,
//                     Freelance: data.workBasis?.includes("Freelance") || false,
//                     ProjectBasis: data.workBasis?.includes("ProjectBasis") || false,
//                     PercentageBasis: data.workBasis?.includes("PercentageBasis") || false,
//                     EquityBasis: data.workBasis?.includes("EquityBasis") || false,
//                     Other: data.workBasis?.includes("Other") || false,
//                 },
//                 partnershipCriteria: data.partnershipCriteria || "",
//                 internshipType: data.internshipType || null,
//                 internshipTimeType: data.internshipTimeType || null,
//                 internshipDuration: parseDuration(data.internshipDuration),
//                 internshipStipendRange: parseRange(data.internshipStipendRange),
//                 internshipPerformanceCriteria: data.internshipPerformanceCriteria || "",
//                 collaborationDescription: data.collaborationDescription || "",
//                 jobTimeType: data.jobTimeType || null,
//                 jobAmountRange: parseRange(data.jobAmountRange),
//                 freelancePaymentRange: parseRange(data.freelancePaymentRange),
//                 projectDescription: data.projectDescription || "",
//                 percentageBasisValue: data.percentageBasisValue || "",
//                 timeCommitment: parseDuration(data.timeCommitment),
//                 equityBasisValue: data.equityBasisValue || "",
//                 otherWorkBasis: data.otherWorkBasis || "",
//                 workMode: {
//                     Remote: data.workMode?.includes("Remote") || false,
//                     Hybrid: data.workMode?.includes("Hybrid") || false,
//                     Onsite: data.workMode?.includes("Onsite") || false,
//                 },
//                 workLocation: {
//                     country: countryCode,
//                     state: stateCode,
//                     district: cityName,
//                 },
//                 experienceRange: parseRange(data.experienceRange),
//                 aboutOpportunity: data.aboutOpportunity || "",
//                 responsibilities: data.responsibilities || "",
//                 whyShouldJoin: data.whyShouldJoin || "",
//                 anyOtherInfo: data.anyOtherInfo || "",
//             };
//             console.log(formData.experienceRange)
//             setFormData(newFormData);

//             // Fetch domains to set domainName and roleUnderDomain
//             const domainResponse = await fetch(
//                 "http://localhost:3333/api/domain/get-all-domains",
//                 { method: "GET", credentials: "include" }
//             );
//             if (!domainResponse.ok) throw new Error("Failed to fetch domains");
//             const domainData = await domainResponse.json();
//             if (!domainData.success) throw new Error("Failed to fetch domains");
//             const sortedDomains = domainData.domains
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 .map((domain) => ({
//                     value: domain._id,
//                     label: domain.name,
//                     roles: domain.roles,
//                 }));
//             setDomains(sortedDomains);
//             setFilteredDomains(sortedDomains);

//             const domain = sortedDomains.find((d) => d.label === data.domainName);
//             if (domain) {
//                 setDomainSearchText(domain.label);
//                 setFormData((prev) => ({
//                     ...prev,
//                     domainName: domain.value,
//                 }));
//                 const role = domain.roles.find((r) => r.name === data.roleUnderDomain);
//                 if (role) {
//                     setRoleSearchText(role.name);
//                     setFormData((prev) => ({
//                         ...prev,
//                         roleUnderDomain: role._id,
//                     }));
//                 }
//             }

//             // Set roles
//             const rolesFromAllDomains = sortedDomains.reduce((acc, domain) => {
//                 if (Array.isArray(domain.roles)) {
//                     return [
//                         ...acc,
//                         ...domain.roles.map((role) => ({
//                             value: role._id,
//                             label: role.name,
//                             domainId: domain.value,
//                         })),
//                     ];
//                 }
//                 return acc;
//             }, []);
//             setAllRoles(rolesFromAllDomains);
//             setFilteredRoles(rolesFromAllDomains);
//         } catch (error) {
//             // setListingError("Failed to load listing data");
//             console.error("Error fetching listing:", error);
//         } finally {
//             // setLoadingListing(false);
//             setLoadingDomains(false);
//         }
//     };
//     fetchListing();
// }, [listingId]);
useEffect(() => {
    const fetchListing = async () => {
        try {
            const response = await fetch(
                `http://localhost:3333/api/founder/get-pre-filled-details-for-update-form/${listingId}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error("Failed to fetch listing data");
            const { postData } = await response.json();
            const data = postData;
            console.log("Backend data:", data);

            // Map work location codes
            let countryCode = "";
            let stateCode = "";
            let cityName = "";
            if (data.workMode.includes("Hybrid") || data.workMode.includes("Onsite")) {
                const countryObj = Country.getAllCountries().find(
                    (c) => c.name === data.workCountry
                );
                countryCode = countryObj?.isoCode || "";
                if (countryCode) {
                    const stateObj = State.getStatesOfCountry(countryCode).find(
                        (s) => s.name === data.workState
                    );
                    stateCode = stateObj?.isoCode || "";
                    if (stateCode) {
                        const cityObj = City.getCitiesOfState(countryCode, stateCode).find(
                            (c) => c.name === data.workCity
                        );
                        cityName = cityObj?.name || data.workCity;
                    }
                }
                setStates(State.getStatesOfCountry(countryCode));
                setDistricts(City.getCitiesOfState(countryCode, stateCode));
            }

            // Helper to parse range strings
            const parseRange = (str) => {
                if (!str) return { min: "", max: "" };
                const match = str.match(/^(\d+)-(\d+)\s*(?:rupees|ruppes|years)?$/);
                return match ? { min: match[1], max: match[2] } : { min: "", max: "" };
            };

            // Helper to parse duration
            const parseDuration = (str) => {
                if (!str) return { value: "", unit: "" };
                const hoursMatch = str.match(/^(\d+)\s*hours\/(\w+)$/);
                const standardMatch = str.match(/^(\d+)\s*(Weeks|Months|Years)$/);
                if (hoursMatch) {
                    return { value: hoursMatch[1], unit: `hours/${hoursMatch[2]}` };
                } else if (standardMatch) {
                    return { value: standardMatch[1], unit: standardMatch[2] };
                }
                return { value: "", unit: "" };
            };

            // Fetch domains to set domainName and roleUnderDomain
            // const domainResponse = await fetch(
            //     "http://localhost:3333/api/domain/get-all-domains",
            //     { method: "GET", credentials: "include" }
            // );
            // if (!domainResponse.ok) throw new Error("Failed to fetch domains");
            // const domainData = await domainResponse.json();
            // if (!domainData.success) throw new Error("Failed to fetch domains");
            // const sortedDomains = domainData.domains
            //     .sort((a, b) => a.name.localeCompare(b.name))
            //     .map((domain) => ({
            //         value: domain._id,
            //         label: domain.name,
            //         roles: domain.roles,
            //     }));
            // setDomains(sortedDomains);
            // setFilteredDomains(sortedDomains);

            // // Set roles
            // const rolesFromAllDomains = sortedDomains.reduce((acc, domain) => {
            //     if (Array.isArray(domain.roles)) {
            //         return [
            //             ...acc,
            //             ...domain.roles.map((role) => ({
            //                 value: role._id,
            //                 label: role.name,
            //                 domainId: domain.value,
            //             })),
            //         ];
            //     }
            //     return acc;
            // }, []);
            // setAllRoles(rolesFromAllDomains);

            // Find the domain and role
            // const domain = sortedDomains.find((d) => d.label === data.domainName);
            // let roleId = "";
            // let roleLabel = "";
            // if (domain) {
            //     const role = domain.roles.find((r) => r.name === data.roleUnderDomain);
            //     if (role) {
            //         roleId = role._id;
            //         roleLabel = role.name;
            //     }
            //     setFilteredRoles(
            //         rolesFromAllDomains.filter((r) => r.domainId === domain.value)
            //     );
            // } else {
            //     setFilteredRoles(rolesFromAllDomains);
            // }

            // Parse experienceRange and log to verify
            const parsedExperienceRange = parseRange(data.experienceRange);
            console.log("Parsed experienceRange:", parsedExperienceRange);

            // Map pre-filled data to formData
            const newFormData = {
                userType: data.userType || "",
                otherUserType: data.otherUserType || "",
                requirementType: data.requirementType || "",
                otherRequirementType: data.otherRequirementType || "",
                startUpName: data.startUpName || "",
                aboutEntity: data.aboutEntity || "",
                websiteOfStartupLink: data.websiteOfStartupLink || "",
                contact_methods: {
                    call: { selected: !!data.call, value: data.call || "" },
                    whatsapp: { selected: !!data.whatsapp, value: data.whatsapp || "" },
                    instagram: { selected: !!data.instagram, value: data.instagram || "" },
                    linkedin: { selected: !!data.linkedin, value: data.linkedin || "" },
                    facebook: { selected: !!data.facebook, value: data.facebook || "" },
                    other: { selected: !!data.other, value: data.email || "" },
                },
                headline: data.headline || "",
                domainName: "",
                roleUnderDomain: "",
                skills: data.skills?.map((skill, idx) => ({
                    _id: `temp-${idx}`,
                    name: skill,
                })) || [],
                workBasis: {
                    Partnership: data.workBasis?.includes("Partnership") || false,
                    Collaboration: data.workBasis?.includes("Collaboration") || false,
                    Internship: data.workBasis?.includes("Internship") || false,
                    Job: data.workBasis?.includes("Job") || false,
                    Freelance: data.workBasis?.includes("Freelance") || false,
                    ProjectBasis: data.workBasis?.includes("ProjectBasis") || false,
                    PercentageBasis: data.workBasis?.includes("PercentageBasis") || false,
                    EquityBasis: data.workBasis?.includes("EquityBasis") || false,
                    Other: data.workBasis?.includes("Other") || false,
                },
                partnershipCriteria: data.partnershipCriteria || "",
                internshipType: data.internshipType || null,
                internshipTimeType: data.internshipTimeType || null,
                internshipDuration: parseDuration(data.internshipDuration),
                internshipStipendRange: parseRange(data.internshipStipendRange),
                internshipPerformanceCriteria: data.internshipPerformanceCriteria || "",
                collaborationDescription: data.collaborationDescription || "",
                jobTimeType: data.jobTimeType || "",
                jobAmountRange: parseRange(data.jobAmountRange),
                freelancePaymentRange: parseRange(data.freelancePaymentRange),
                projectDescription: data.projectDescription || "",
                percentageBasisValue: data.percentageBasisValue || "",
                timeCommitment: parseDuration(data.timeCommitment),
                equityBasisValue: data.equityBasisValue || "",
                otherWorkBasis: data.otherWorkBasis || "",
                workMode: {
                    Remote: data.workMode?.includes("Remote") || false,
                    Hybrid: data.workMode?.includes("Hybrid") || false,
                    Onsite: data.workMode?.includes("Onsite") || false,
                },
                workLocation: {
                    country: countryCode,
                    state: stateCode,
                    district: cityName,
                },
                experienceRange: parsedExperienceRange, // Ensure parsed values are set
                aboutOpportunity: data.aboutOpportunity || "",
                responsibilities: data.responsibilities || "",
                whyShouldJoin: data.whyShouldJoin || "",
                anyOtherInfo: data.anyOtherInfo || "",
            };
            console.log("newFormData.experienceRange:", newFormData.experienceRange);
            setFormData(newFormData);

            const domainResponse = await fetch(
                    `http://localhost:3333/api/domain/get-all-domains`
                );
                const domainData = await domainResponse.json();
                const domain = domainData.domains.find(
                    (d) => d.name === data.domainName
                );
                if (domain) {
                    setDomainSearchText(domain.name);
                    setFormData((prev) => ({
                        ...prev,
                        domainName: domain._id,
                    }));
                    
                    // Set all roles for this domain
                    const domainRoles = domain.roles.map(role => ({
                        value: role._id,
                        label: role.name,
                        domainId: domain._id
                    }));
                    setFilteredRoles(domainRoles);
                    
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

                    // Fetch skills for this domain
                    try {
                        const skillsResponse = await fetch(
                            `http://localhost:3333/api/skills/${domain._id}`
                        );
                        if (!skillsResponse.ok) throw new Error("Failed to fetch skills");
                        const skillsData = await skillsResponse.json();
                        const skills = Array.isArray(skillsData.skills) ? skillsData.skills : [];
                        setSkills(skills);
                        setFilteredSkills(skills);
                        
                        // Map the skills from the backend data to match the format
                        const mappedSkills = data.skills.map((skillName, idx) => {
                            const skill = skills.find(s => s.name === skillName);
                            return {
                                _id: skill ? skill._id : `temp-${idx}`,
                                name: skillName
                            };
                        });
                        
                        setFormData(prev => ({
                            ...prev,
                            skills: mappedSkills
                        }));
                    } catch (error) {
                        console.error("Error fetching skills:", error);
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
                // If we have a selected role, make sure it's included in the filtered list
                if (formData.roleUnderDomain) {
                    const selectedRole = allRoles.find(
                        (role) => role.value === formData.roleUnderDomain
                    );
                    if (selectedRole && !filtered.some(role => role.value === selectedRole.value)) {
                        filtered = [...filtered, selectedRole];
                    }
                }
            }
            if (roleSearchText.trim()) {
                filtered = filtered.filter((role) =>
                    role.label
                        ?.toLowerCase()
                        .startsWith(roleSearchText.toLowerCase())
                );
            }
            setFilteredRoles(filtered);
        }, [roleSearchText, allRoles, formData.domainName, formData.roleUnderDomain]);
    
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
        // if (formData.skills.length === 0)
        //     newErrors.skills = "At least one skill is required";
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

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateStep3()) {
//         try {
//             const domain = domains.find((d) => d.value === formData.domainName);
//             const role = allRoles.find((r) => r.value === formData.roleUnderDomain);

//             // Map country ISO code to full name
//             const countryObj = countries.find((c) => c.isoCode === formData.workLocation.country);
//             const countryName = countryObj ? countryObj.name : formData.workLocation.country;

//             // Map state ISO code to full name
//             const stateObj = states.find((s) => s.isoCode === formData.workLocation.state);
//             const stateName = stateObj ? stateObj.name : formData.workLocation.state;

//             const submitData = {
//                 ...formData,
//                 domainName: domain ? domain.label : formData.domainName,
//                 roleUnderDomain: role ? role.label : formData.roleUnderDomain,
//                 skills: formData.skills.map((skill) => skill.name),
//                 workBasis: Object.keys(formData.workBasis).filter(
//                     (key) => formData.workBasis[key]
//                 ),
//                 workMode: Object.keys(formData.workMode).filter((key) => formData.workMode[key]),
//                 call: formData.contact_methods.call.selected
//                     ? formData.contact_methods.call.value
//                     : "",
//                 whatsapp: formData.contact_methods.whatsapp.selected
//                     ? formData.contact_methods.whatsapp.value
//                     : "",
//                 instagram: formData.contact_methods.instagram.selected
//                     ? formData.contact_methods.instagram.value
//                     : "",
//                 linkedin: formData.contact_methods.linkedin.selected
//                     ? formData.contact_methods.linkedin.value
//                     : "",
//                 facebook: formData.contact_methods.facebook.selected
//                     ? formData.contact_methods.facebook.value
//                     : "",
//                 otherContact: formData.contact_methods.other.selected
//                     ? formData.contact_methods.other.value
//                     : "",
//                 workCountry: countryName, // Use full country name
//                 workState: stateName, // Use full state name
//                 workCity: formData.workLocation.district,
//                 internshipTimeType: formData.internshipTimeType || "",
//                 jobTimeType: formData.jobTimeType || "",
//                 internshipDuration:
//                     formData.workBasis.Internship &&
//                     formData.internshipDuration.value &&
//                     formData.internshipDuration.unit
//                         ? `${formData.internshipDuration.value} ${formData.internshipDuration.unit}`
//                         : "",
//                 freelancePaymentRange:
//                     formData.workBasis.Freelance &&
//                     formData.freelancePaymentRange.min &&
//                     formData.freelancePaymentRange.max
//                         ? `${formData.freelancePaymentRange.min}-${formData.freelancePaymentRange.max} rupees`
//                         : "",
//                 internshipStipendRange:
//                     formData.internshipType === "Paid" &&
//                     formData.internshipStipendRange.min &&
//                     formData.internshipStipendRange.max
//                         ? `${formData.internshipStipendRange.min}-${formData.internshipStipendRange.max} rupees`
//                         : "",
//                 experienceRange:
//                     formData.experienceRange.min &&
//                     formData.experienceRange.max
//                         ? `${formData.experienceRange.min}-${formData.experienceRange.max} years`
//                         : "",
//                 jobAmountRange:
//                     formData.workBasis.Job &&
//                     formData.jobAmountRange.min &&
//                     formData.jobAmountRange.max
//                         ? `${formData.jobAmountRange.min}-${formData.jobAmountRange.max} ruppes`
//                         : "",
//                        timeCommitment:
//     formData.timeCommitment.value && formData.timeCommitment.unit
//         ? `${formData.timeCommitment.value} ${formData.timeCommitment.unit}`
//         : "",
//             };
//             console.log(submitData)
//             delete submitData.contact_methods;
//             const response = await fetch(
//                 "http://localhost:3333/api/founder/add-listing/",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(submitData),
//                     credentials: "include",
//                 }
//             );
//             if (response.ok) {
//                 console.log("Form submitted:", submitData);
//                 onClose();
//             } else {
//                 setErrors({
//                     submit: "Failed to submit the form. Please try again.",
//                 });
//             }
//         } catch (err) {
//             setErrors({ submit: "An error occurred. Please try again." });
//         }
//     }
// };
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
                domainName: domain ? domain.label : "",
                roleUnderDomain: role ? role.label : "",
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
                other: formData.contact_methods.other.selected
                    ? formData.contact_methods.other.value
                    : "",
                workCountry: countryName,
                workState: stateName,
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
                        ? `${formData.jobAmountRange.min}-${formData.jobAmountRange.max} rupees` // Fixed typo: 'ruppes' to 'rupees'
                        : "",
                timeCommitment:
                    formData.timeCommitment.value && formData.timeCommitment.unit
                        ? `${formData.timeCommitment.value} ${formData.timeCommitment.unit}`
                        : "",
            };
            console.log("Submitting data:", submitData);
            delete submitData.contact_methods;

            const response = await fetch(
                `http://localhost:3333/api/founder/update-post/${listingId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(submitData),
                    credentials: "include",
                }
            );
            if (response.ok) {
                console.log("Form submitted:", submitData);
                onClose();
            } else {
                const errorData = await response.json();
                setErrors({
                    submit: errorData.message || "Failed to submit the form. Please try again.",
                });
            }
        } catch (err) {
            setErrors({ submit: "An error occurred. Please try again." });
        }
    }
};
    const handleCancel = () => {
        setFormData({
           
            userType: "",
            otherUserType: "",
            requirementType: "",
            otherRequirementType: "",
            startUpName: "",
            aboutEntity: "",
            
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

    if (profileError) {
        return <div className="text-red-500">{profileError}</div>;
    }

     return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl w-full">
          
<div className=" sm:mb-4">
  {/* Progress Bar Container */}
  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
    <div 
      className="bg-[#7900BF] h-2 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${(step / 3) * 100}%` }}
    ></div>
  </div>
  
  {/* Step Title */}
  <h3 className="text-lg sm:text-xl font-semibold text-[#7900BF] mb-2 sm:mb-4">
    {step === 1 ? "Let's introduce you to the world." : 
     step === 2 ? "Tell us about your preferences." : 
     "Almost done! Final details."}
  </h3>
  
  {/* Step indicator */}
  <p className="text-sm text-gray-500">
    Step {step} of 3
  </p>
</div>

{/*           
{step === 2 && (
  <div className="flex flex-col sm:flex-row items-center justify-between w-full bg-violet-100 px-4 sm:px-6 py-4 sm:py-6 rounded-2xl mb-5 gap-4">
    <div className="flex flex-col max-w-full sm:max-w-[60%]">
      <p className="text-violet-700 text-lg sm:text-xl font-semibold">
        You're almost there!
      </p>
      <p className="text-violet-400 text-sm sm:text-base">
        This fun little form helps you describe your vibe and your need — quick, casual, and human. No resumes, no HR jargon. Just say it like it is.
      </p>
    </div>
    <img
      src="./FormImage2.svg"
      alt="Step 2 illustration"
      className="w-32 sm:w-40 md:w-48 object-contain"
    />
  </div>
)}

{step === 3 && (
  <div className="flex flex-col sm:flex-row items-center justify-between w-full bg-violet-100 px-4 sm:px-6 py-4 sm:py-6 rounded-2xl mb-5 gap-4">
    <div className="flex flex-col max-w-full sm:max-w-[60%]">
      <p className="text-violet-700 text-lg sm:text-xl font-semibold">
        You've made it to the final step!
      </p>
      <p className="text-violet-400 text-sm sm:text-base">
        This short form captures who you are, what you need, and how your team works — no fluff, no lengthy job descriptions. Just clear, honest details. Done in minutes.
      </p>
    </div>
    <img
      src="./FormImage3.svg"
      alt="Step 3 illustration"
      className="w-32 sm:w-40 md:w-48 object-contain"
    />
  </div>
)} */}

            {step === 1 && (
  <form className="grid grid-cols-1 gap-6">
  

    {/* Personal Website */}
    <div className="relative">
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
          className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2  focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.websiteOfStartupLink ? "border-red-500" : "border-gray-300"
          }`}
        />  
      </div>
      {errors.websiteOfStartupLink && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.websiteOfStartupLink}
        </p>
      )}
    </div>

    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        You are a <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 gap-3">
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
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
            />
            <span className="text-gray-700 text-sm sm:text-base">{type}</span>
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
            Specify User Type <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="otherUserType"
              name="otherUserType"
              value={formData.otherUserType}
              onChange={handleChange}
              type="text"
              placeholder="Specify your user type"
              className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                errors.otherUserType ? "border-red-500" : "border-gray-300"
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

    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        This requirement is for a <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1   sm:grid-cols-3 gap-2 ">
        {["Business", "Startup", "Side Project", "Personal Need", "Other"].map(
          (type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="requirementType"
                value={type}
                checked={formData.requirementType === type}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
              />
              <span className="text-gray-700 text-sm sm:text-base">{type}</span>
            </label>
          )
        )}
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
            Specify Requirement Type <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="otherRequirementType"
              name="otherRequirementType"
              value={formData.otherRequirementType}
              onChange={handleChange}
              type="text"
              placeholder="Specify requirement type"
              className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                errors.otherRequirementType ? "border-red-500" : "border-gray-300"
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
      {["Startup", "Business"].includes(formData.requirementType) && (
        <div className="mt-4">
          <label
            htmlFor="startUpName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Business/Startup Name <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="startUpName"
              name="startUpName"
              value={formData.startUpName}
              onChange={handleChange}
              type="text"
              placeholder="Enter business/startup name"
              className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                errors.startUpName ? "border-red-500" : "border-gray-300"
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

    {formData.requirementType && (
      <div className="relative">
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
            className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
              errors.aboutEntity ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => enhanceField("aboutEntity", formData.aboutEntity)}
            disabled={enhanceLoading.aboutEntity}
            className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
              enhanceLoading.aboutEntity ? "animate-pulse" : ""
            }`}
            title={enhanceLoading.aboutEntity ? "Enhancing..." : "Enhance"}
          >
            <FaMagic className="w-5 h-5" />
          </button>
        </div>
        {errors.aboutEntity && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.aboutEntity}
          </p>
        )}
      </div>
    )}

    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        How people can reach out to you (select at least two){" "}
        <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {["call", "whatsapp", "instagram", "linkedin", "facebook", "other"].map(
          (method) => (
            <div key={method} className="flex items-center">
              <input
                type="checkbox"
                id={method}
                checked={formData.contact_methods[method].selected}
                onChange={() => handleContactMethodChange(method)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
              />
              <label
                htmlFor={method}
                className="text-gray-700 text-sm sm:text-base"
              >
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </label>
            </div>
          )
        )}
      </div>
      {errors.contact_methods && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">
          {errors.contact_methods}
        </p>
      )}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(formData.contact_methods).map(
          ([method, { selected, value }]) =>
            selected && (
              <div key={method} className="relative">
                <label
                  htmlFor={`${method}Value`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)}{" "}
                  {method === "whatsapp" || method === "call" ? "Number" : "URL"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="gap-2">
                  {method === "call" || method === "whatsapp" ? (
                    <div className="text-left">
                      <PhoneInput
                        country="in"
                        value={value}
                        onChange={(phone) =>
                          handleContactValueChange(method, phone)
                        }
                        containerClass="w-full"
                        inputClass={`w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-900 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                          errors[`${method}Value`] ? "border-red-500" : "border-gray-300"
                        }`}
                        buttonClass="border-gray-300 h-12 w-12"
                        dropdownClass="h-28"
                        containerStyle={{
                          height: "auto",
                          width: "100%",
                        }}
                        inputStyle={{
                          height: "100%",
                          width: "100%",
                        }}
                        buttonStyle={{
                          position: "absolute",
                          left: "5px",
                          top: "1px",
                          height: "100%",
                          width: "40px",
                          backgroundColor: "transparent",
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
                        handleContactValueChange(method, e.target.value)
                      }
                      placeholder={`Enter your ${method} URL (https://)`}
                      className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                        errors[`${method}Value`] ? "border-red-500" : "border-gray-300"
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

    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={handleCancel}
        className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base order-2 sm:order-1"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base order-1 sm:order-2"
      >
        Next
      </button>
    </div>
  </form>
)}

            {step === 2 && (
  <form className="grid grid-cols-1 gap-6">
   

    <div className="relative">
      <label
        htmlFor="headline"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Headline (e.g., I am looking for...) <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id="headline"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          maxLength={80}
          placeholder="Enter a catchy headline"
          className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
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
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.headline}</p>
      )}
    </div>

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
        value={filteredRoles.find((role) => role.value === formData.roleUnderDomain)}
        onChange={handleRoleSelect}
        placeholder="Select a role"
        isClearable
        classNamePrefix="react-select"
        className="text-sm sm:text-base"
      />
      {errors.roleUnderDomain && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.roleUnderDomain}</p>
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
        <p className="text-gray-500 text-sm sm:text-base">Loading domains...</p>
      ) : (
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={domains}
          value={domains.find((domain) => domain.value === formData.domainName)}
          onChange={handleDomainSelect}
          placeholder="Select a domain"
          isClearable
          classNamePrefix="react-select"
          className="text-sm sm:text-base"
        />
      )}
      {errors.domainName && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.domainName}</p>
      )}
    </div>

    <div className="relative">
      <label
        htmlFor="skills"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Skills
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={filteredSkills.map((skill) => ({
          value: skill._id,
          label: skill.name,
        }))}
        value={formData.skills.map((skill) => ({
          value: skill._id,
          label: skill.name,
        }))}
        onChange={(selectedOptions) => {
          const selectedSkills = selectedOptions
            ? selectedOptions.map((option) => ({
                _id: option.value,
                name: option.label,
              }))
            : [];
          setFormData((prev) => ({
            ...prev,
            skills: selectedSkills,
          }));
          setErrors((prev) => ({ ...prev, skills: "" }));
        }}
        onInputChange={(inputValue) => setSkillSearchText(inputValue)}
        inputValue={skillSearchText}
        placeholder="Select skills"
        classNamePrefix="react-select"
        className="text-sm sm:text-base"
      />
      {errors.skills && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.skills}</p>
      )}
    </div>

    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Work Basis <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
            />
            <label htmlFor={basis} className="text-gray-700 text-sm sm:text-base">
              {basis.replace(/([A-Z])/g, " $1").trim()}
            </label>
          </div>
        ))}
      </div>
      {errors.workBasis && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.workBasis}</p>
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
                className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
                  errors.partnershipCriteria ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => enhanceField("partnershipCriteria", formData.partnershipCriteria)}
                disabled={enhanceLoading.partnershipCriteria}
                className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                  enhanceLoading.partnershipCriteria ? "animate-pulse" : ""
                }`}
                title={enhanceLoading.partnershipCriteria ? "Enhancing..." : "Enhance"}
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
              <div className="grid grid-cols-2 gap-3">
                {["FullTime", "PartTime"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="internshipTimeType"
                      value={type}
                      checked={formData.internshipTimeType === type}
                      onChange={() => handleInternshipTypeChange(type)}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.internshipType}</p>
              )}
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="internshipDuration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Internship Duration <span className="text-red-500">*</span>
                </label>
                <input
                  id="internshipDuration"
                  name="internshipDuration.value"
                  value={formData.internshipDuration.value}
                  onChange={(e) =>
                    handleNestedChange("internshipDuration", "value", e.target.value)
                  }
                  type="number"
                  min="1"
                  placeholder="Duration"
                  className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                    errors.internshipDuration?.value ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.internshipDuration?.value && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.internshipDuration.value}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="internshipDurationUnit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Unit <span className="text-red-500">*</span>
                </label>
                <select
                  id="internshipDurationUnit"
                  name="internshipDuration.unit"
                  value={formData.internshipDuration.unit}
                  onChange={(e) =>
                    handleNestedChange("internshipDuration", "unit", e.target.value)
                  }
                  className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                    errors.internshipDuration?.unit ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Unit</option>
                  <option value="Weeks">Weeks</option>
                  <option value="Months">Months</option>
                  <option value="Years">Years</option>
                </select>
                {errors.internshipDuration?.unit && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.internshipDuration.unit}
                  </p>
                )}
              </div>
            </div>

            {formData.internshipType === "Paid" && (
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="internshipStipendRangeMin"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Min Stipend (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="internshipStipendRangeMin"
                    name="internshipStipendRange.min"
                    value={formData.internshipStipendRange.min}
                    onChange={(e) =>
                      handleNestedChange("internshipStipendRange", "min", e.target.value)
                    }
                    type="number"
                    min="0"
                    placeholder="Min stipend"
                    className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                      errors.internshipStipendRange?.min ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.internshipStipendRange?.min && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.internshipStipendRange.min}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="internshipStipendRangeMax"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Max Stipend (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="internshipStipendRangeMax"
                    name="internshipStipendRange.max"
                    value={formData.internshipStipendRange.max}
                    onChange={(e) =>
                      handleNestedChange("internshipStipendRange", "max", e.target.value)
                    }
                    type="number"
                    min="0"
                    placeholder="Max stipend"
                    className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                      errors.internshipStipendRange?.max ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.internshipStipendRange?.max && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.internshipStipendRange.max}
                    </p>
                  )}
                </div>
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
                    className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
                      errors.internshipPerformanceCriteria ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      enhanceField("internshipPerformanceCriteria", formData.internshipPerformanceCriteria)
                    }
                    disabled={enhanceLoading.internshipPerformanceCriteria}
                    className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                      enhanceLoading.internshipPerformanceCriteria ? "animate-pulse" : ""
                    }`}
                    title={
                      enhanceLoading.internshipPerformanceCriteria ? "Enhancing..." : "Enhance"
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
                className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
                  errors.collaborationDescription ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  enhanceField("collaborationDescription", formData.collaborationDescription)
                }
                disabled={enhanceLoading.collaborationDescription}
                className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                  enhanceLoading.collaborationDescription ? "animate-pulse" : ""
                }`}
                title={enhanceLoading.collaborationDescription ? "Enhancing..." : "Enhance"}
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
              <div className="grid grid-cols-2 gap-3">
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
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.jobTimeType}</p>
              )}
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="jobAmountRangeMin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Min Amount (₹) <span className="text-red-500">*</span>
                </label>
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
                  className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                    errors.jobAmountRange?.min ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.jobAmountRange?.min && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.jobAmountRange.min}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="jobAmountRangeMax"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Max Amount (₹) <span className="text-red-500">*</span>
                </label>
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
                  className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                    errors.jobAmountRange?.max ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.jobAmountRange?.max && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.jobAmountRange.max}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {formData.workBasis.Freelance && (
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="freelancePaymentRangeMin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Payment (₹) <span className="text-red-500">*</span>
              </label>
              <input
                id="freelancePaymentRangeMin"
                name="freelancePaymentRange.min"
                value={formData.freelancePaymentRange.min}
                onChange={(e) =>
                  handleNestedChange("freelancePaymentRange", "min", e.target.value)
                }
                type="number"
                min="0"
                placeholder="Min payment"
                className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                  errors.freelancePaymentRange?.min ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.freelancePaymentRange?.min && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.freelancePaymentRange.min}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="freelancePaymentRangeMax"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Payment (₹) <span className="text-red-500">*</span>
              </label>
              <input
                id="freelancePaymentRangeMax"
                name="freelancePaymentRange.max"
                value={formData.freelancePaymentRange.max}
                onChange={(e) =>
                  handleNestedChange("freelancePaymentRange", "max", e.target.value)
                }
                type="number"
                min="0"
                placeholder="Max payment"
                className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                  errors.freelancePaymentRange?.max ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.freelancePaymentRange?.max && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.freelancePaymentRange.max}
                </p>
              )}
            </div>
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
                className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
                  errors.projectDescription ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => enhanceField("projectDescription", formData.projectDescription)}
                disabled={enhanceLoading.projectDescription}
                className={`absolute right-3 top-3 text-purple-600 hover:text-purple-800 disabled:text-purple-300 ${
                  enhanceLoading.projectDescription ? "animate-pulse" : ""
                }`}
                title={enhanceLoading.projectDescription ? "Enhancing..." : "Enhance"}
              >
                <FaMagic className="w-5 h-5" />
              </button>
            </div>
            {errors.projectDescription && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.projectDescription}</p>
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
              className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
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
              className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
                errors.equityBasisValue ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.equityBasisValue && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.equityBasisValue}</p>
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
              className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
                errors.otherWorkBasis ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.otherWorkBasis && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.otherWorkBasis}</p>
            )}
          </div>
        )}
      </div>
    </div>

    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="timeCommitmentValue"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Time Commitment
        </label>
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
          className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.timeCommitment?.value ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.timeCommitment?.value && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.timeCommitment.value}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="timeCommitmentUnit"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Unit
        </label>
        <select
          id="timeCommitmentUnit"
          name="timeCommitment.unit"
          value={formData.timeCommitment.unit}
          onChange={(e) =>
            handleNestedChange("timeCommitment", "unit", e.target.value)
          }
          className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.timeCommitment?.unit ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Unit</option>
          <option value="hours/day">Hours/Day</option>
          <option value="hours/week">Hours/Week</option>
          <option value="hours/month">Hours/Month</option>
        </select>
        {errors.timeCommitment?.unit && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.timeCommitment.unit}</p>
        )}
      </div>
    </div>

    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Work Mode <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {["Remote", "Hybrid", "Onsite"].map((mode) => (
          <div key={mode} className="flex items-center">
            <input
              type="checkbox"
              id={mode}
              checked={formData.workMode[mode]}
              onChange={() => handleWorkModeChange(mode)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
            />
            <label htmlFor={mode} className="text-gray-700 text-sm sm:text-base">
              {mode}
            </label>
          </div>
        ))}
      </div>
      {errors.workMode && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.workMode}</p>
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
            className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
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
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.workLocation.country}</p>
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
            className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
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
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.workLocation.state}</p>
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
            className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
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
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.workLocation.district}</p>
          )}
        </div>
      </div>
    )}

    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="experienceRangeMin"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Min Experience (Years) <span className="text-red-500">*</span>
        </label>
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
          className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.experienceRange?.min ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.experienceRange?.min && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.experienceRange.min}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="experienceRangeMax"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Max Experience (Years) <span className="text-red-500">*</span>
        </label>
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
          className={`w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 text-sm sm:text-base ${
            errors.experienceRange?.max ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.experienceRange?.max && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.experienceRange.max}</p>
        )}
      </div>
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
          Next
        </button>
      </div>
    </div>
  </form>
)}

            {step === 3 && (
  <form onSubmit={handleSubmit} className="space-y-6">
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
          className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
            errors.responsibilities ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => enhanceField("responsibilities", formData.responsibilities)}
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
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.responsibilities}</p>
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
          className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
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
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.whyShouldJoin}</p>
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
          className={`w-full h-10 pr-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] text-sm sm:text-base ${
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
        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.anyOtherInfo}</p>
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
        </div>
    );
}

export default UpdateFounderPostForm;
