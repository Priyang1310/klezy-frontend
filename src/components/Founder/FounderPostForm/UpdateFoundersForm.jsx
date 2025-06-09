import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";

function UpdateFounderPostForm({ listingId, onClose }) {
    const [formData, setFormData] = useState({
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
        jobTimeType: null,
        freelancePaymentRange: { min: "", max: "" },
        projectDescription: "",
        percentageBasisValue: "",
        timeCommitment: { value: "", unit: "" },
        equityBasisValue: "",
        otherWorkBasis: "",
        workMode: { Remote: false, Hybrid: false, Onsite: false },
        workLocation: { country: "", state: "", district: "" },
        experienceRange: { min: "", max: "" },
        responsibilities: "",
        whyShouldJoin: "",
        anyOtherInfo: "",
    });

    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [dataError, setDataError] = useState("");
    const [enhanceLoading, setEnhanceLoading] = useState({});

    // Fetch existing post data
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3333/api/founder/get-pre-filled-details-for-update-form/${listingId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                console.log(response);
                if (!response.ok) throw new Error("Failed to fetch post data");
                const data = await response.json();
                setFormData((prev) => ({
                    ...prev,
                    jobTimeType: data.postData.jobTimeType || null,
                    workBasis: {
                        Partnership:
                            data.postData.workBasis?.includes("Partnership") ||
                            false,
                        Collaboration:
                            data.postData.workBasis?.includes(
                                "Collaboration"
                            ) || false,
                        Internship:
                            data.postData.workBasis?.includes("Internship") ||
                            false,
                        Job: data.postData.workBasis?.includes("Job") || false,
                        Freelance:
                            data.postData.workBasis?.includes("Freelance") ||
                            false,
                        ProjectBasis:
                            data.postData.workBasis?.includes("ProjectBasis") ||
                            false,
                        PercentageBasis:
                            data.postData.workBasis?.includes(
                                "PercentageBasis"
                            ) || false,
                        EquityBasis:
                            data.postData.workBasis?.includes("EquityBasis") ||
                            false,
                        Other:
                            data.postData.workBasis?.includes("Other") || false,
                    },
                    partnershipCriteria:
                        data.postData.partnershipCriteria || "",
                    internshipType: data.postData.internshipType || null,
                    internshipTimeType:
                        data.postData.internshipTimeType || null,
                    internshipDuration: {
                        value:
                            data.postData.internshipDuration?.split(" ")[0] ||
                            "",
                        unit:
                            data.postData.internshipDuration?.split(" ")[1] ||
                            "",
                    },
                    internshipStipendRange: {
                        min:
                            data.postData.internshipStipendRange?.split(
                                "-"
                            )[0] || "",
                        max:
                            data.postData.internshipStipendRange
                                ?.split("-")[1]
                                ?.replace(" rupees", "") || "",
                    },
                    internshipPerformanceCriteria:
                        data.postData.internshipPerformanceCriteria || "",
                    collaborationDescription:
                        data.postData.collaborationDescription || "",
                    jobAmountRange: {
                        min: data.postData.jobAmountRange?.split("-")[0] || "",
                        max:
                            data.postData.jobAmountRange
                                ?.split("-")[1]
                                ?.replace(" ruppes", "") || "",
                    },
                    freelancePaymentRange: {
                        min:
                            data.postData.freelancePaymentRange?.split(
                                "-"
                            )[0] || "",
                        max:
                            data.postData.freelancePaymentRange
                                ?.split("-")[1]
                                ?.replace(" rupees", "") || "",
                    },
                    projectDescription: data.postData.projectDescription || "",
                    percentageBasisValue:
                        data.postData.percentageBasisValue || "",
                    timeCommitment: {
    value: data.postData.timeCommitment?.split(" ")[0] || "",
    unit: data.postData.timeCommitment?.split(" ")[1] || "",
},
                    equityBasisValue: data.postData.equityBasisValue || "",
                    otherWorkBasis: data.postData.otherWorkBasis || "",
                    workMode: {
                        Remote:
                            data.postData.workMode?.includes("Remote") || false,
                        Hybrid:
                            data.postData.workMode?.includes("Hybrid") || false,
                        Onsite:
                            data.postData.workMode?.includes("Onsite") || false,
                    },
                    workLocation: {
                        country: data.postData.workCountry || "",
                        state: data.postData.workState || "",
                        district: data.postData.workCity || "",
                    },
                    experienceRange: {
                        min: data.postData.experienceRange?.split("-")[0] || "",
                        max:
                            data.postData.experienceRange
                                ?.split("-")[1]
                                ?.replace(" years", "") || "",
                    },

                    responsibilities: data.postData.responsibilities || "",
                    whyShouldJoin: data.postData.whyShouldJoin || "",
                    anyOtherInfo: data.postData.anyOtherInfo || "",
                }));
            } catch (error) {
                setDataError("Failed to load post data");
                console.error("Error fetching post:", error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchPostData();
    }, [listingId]);

    // Fetch countries
    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);
    const handleJobTimeTypeChange = (value) => {
  setFormData((prev) => ({ ...prev, jobTimeType: value }));
  setErrors((prev) => ({ ...prev, jobTimeType: "" }));
};

    // Update states when country changes
    useEffect(() => {
        if (formData.workLocation.country) {
            setStates(State.getStatesOfCountry(formData.workLocation.country));
        } else {
            setStates([]);
            setDistricts([]);
            setFormData((prev) => ({
                ...prev,
                workLocation: { ...prev.workLocation, state: "", district: "" },
            }));
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
        } else {
            setDistricts([]);
            setFormData((prev) => ({
                ...prev,
                workLocation: { ...prev.workLocation, district: "" },
            }));
        }
    }, [formData.workLocation.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
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
        setFormData((prev) => {
            const isDeselecting = prev.workMode[mode]; // Check if the mode is being deselected
            return {
                ...prev,
                workMode: {
                    ...prev.workMode,
                    [mode]: !prev.workMode[mode], // Toggle the selected mode
                },
                // Reset workLocation only when deselecting Hybrid or Onsite
                workLocation:
                    isDeselecting &&
                    (mode === "Hybrid" || mode === "Onsite") &&
                    !prev.workMode[mode]
                        ? { country: "", state: "", district: "" }
                        : prev.workLocation,
            };
        });
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
    internshipStipendRange:
      value === "Paid" ? prev.internshipStipendRange : { min: "", max: "" },
    internshipPerformanceCriteria:
      value === "PerformanceBased" ? prev.internshipPerformanceCriteria : "",
  }));
  setErrors((prev) => ({
    ...prev,
    internshipType: "",
    internshipStipendRange: { min: "", max: "" },
    internshipPerformanceCriteria: "",
  }));
};

    const handleInternshipTimeTypeChange = (value) => {
        setFormData((prev) => ({ ...prev, internshipTimeType: value }));
        setErrors((prev) => ({ ...prev, internshipTimeType: "" }));
    };

    const enhanceField = async (fieldName, value) => {
        setEnhanceLoading((prev) => ({ ...prev, [fieldName]: true }));
        try {
            const response = await axios.post(
                "http://localhost:3333/api/enhance/process-field",
                {
                    field: fieldName,
                    content: value,
                    enhance: true,
                }
            );
            setFormData((prev) => ({
                ...prev,
                [fieldName]: response.data[fieldName] || value,
            }));
        } catch (error) {
            alert(`Enhancement failed for ${fieldName}`);
            console.error("Enhance error:", error);
        }
        setEnhanceLoading((prev) => ({ ...prev, [fieldName]: false }));
    };

    const validateForm = () => {
        const newErrors = {};
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
        if (formData.workBasis.Job && !formData.jobTimeType)
    newErrors.jobTimeType = "Please specify job time type";
        if (
            formData.workBasis.Collaboration &&
            !formData.collaborationDescription.trim()
        )
            newErrors.collaborationDescription =
                "Collaboration description is required";
        if (formData.workBasis.Job) {
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
        if (!formData.responsibilities.trim())
            newErrors.responsibilities = "Responsibilities are required";
        if (!formData.whyShouldJoin.trim())
            newErrors.whyShouldJoin = "Value proposition is required";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const submitData = {
                ...formData,
                timeCommitment:
                formData.timeCommitment.value && formData.timeCommitment.unit
                    ? `${formData.timeCommitment.value} ${formData.timeCommitment.unit}`
                    : "",
                jobTimeType: formData.jobTimeType || "",
                workBasis: Object.keys(formData.workBasis).filter(
                    (key) => formData.workBasis[key]
                ),
                workMode: Object.keys(formData.workMode).filter(
                    (key) => formData.workMode[key]
                ), // Changed to array
                workCountry: formData.workLocation.country,
                workState: formData.workLocation.state,
                workCity: formData.workLocation.district,
                internshipTimeType: formData.internshipTimeType || "",
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
                    formData.experienceRange.min && formData.experienceRange.max
                        ? `${formData.experienceRange.min}-${formData.experienceRange.max} years`
                        : "",
                jobAmountRange:
                    formData.workBasis.Job &&
                    formData.jobAmountRange.min &&
                    formData.jobAmountRange.max
                        ? `${formData.jobAmountRange.min}-${formData.jobAmountRange.max} ruppes`
                        : "",
            };
            delete submitData.workLocation;
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
                console.log("Form updated:", submitData);
                onClose();
            } else {
                setErrors({
                    submit: "Failed to update the form. Please try again.",
                });
            }
        } catch (err) {
            setErrors({ submit: "An error occurred. Please try again." });
        }
    };

    const handleCancel = () => {
        setFormData({
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
            experienceRange: { min: "", max: "" },

            responsibilities: "",
            whyShouldJoin: "",
            anyOtherInfo: "",
        });
        setErrors({});
        onClose();
    };

    if (loadingData) {
        return <div>Loading post data...</div>;
    }

    if (dataError) {
        return <div className="text-red-500">{dataError}</div>;
    }

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl w-full">
            <h3 className="text-xl font-semibold text-[#7900BF] mb-6">
                Update Opportunity Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Work Basis <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {[
                                "Partnership",
                                "Collaboration",
                                "Internship",
                                "Job",
                                "Freelance",
                                "ProjectBasis",
                                "PercentageBasis",
                                "EquityBasis",
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
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <label
                                        htmlFor={basis}
                                        className="ml-2 text-gray-700"
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
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Partnership Criteria{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-start gap-2">
                                        <textarea
                                            id="partnershipCriteria"
                                            name="partnershipCriteria"
                                            value={formData.partnershipCriteria}
                                            onChange={handleChange}
                                            placeholder="Describe the partnership criteria"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
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
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                                        >
                                            {enhanceLoading.partnershipCriteria
                                                ? "Enhancing..."
                                                : "Enhance"}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Internship Time Type{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex gap-4">
                                            {["FullTime", "PartTime"].map(
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
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            {type === "FullTime"
                                                                ? "Full-time"
                                                                : "Part-time"}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Internship Type{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex gap-4">
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
                                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                                    />
                                                    <span className="ml-2 text-gray-700">
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

                                    <div className="relative flex gap-4">
                                        <div className="w-1/2">
                                            <label
                                                htmlFor="internshipDuration"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Internship Duration{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                id="internshipDuration"
                                                name="internshipDuration.value"
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
                                                min="1"
                                                placeholder="Duration"
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                                    errors.internshipDuration
                                                        ?.value
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                            />
                                            {errors.internshipDuration
                                                ?.value && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {
                                                        errors
                                                            .internshipDuration
                                                            .value
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-1/2">
                                            <label
                                                htmlFor="internshipDurationUnit"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Unit{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                id="internshipDurationUnit"
                                                name="internshipDuration.unit"
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
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
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
                                            </select>
                                            {errors.internshipDuration
                                                ?.unit && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {
                                                        errors
                                                            .internshipDuration
                                                            .unit
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {formData.internshipType === "Paid" && (
                                        <div className="relative flex gap-4">
                                            <div className="w-1/2">
                                                <label
                                                    htmlFor="internshipStipendRangeMin"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Min Stipend (₹){" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    id="internshipStipendRangeMin"
                                                    name="internshipStipendRange.min"
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
                                                    placeholder="Min stipend"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                                        errors
                                                            .internshipStipendRange
                                                            ?.min
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                />
                                                {errors.internshipStipendRange
                                                    ?.min && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors
                                                                .internshipStipendRange
                                                                .min
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="w-1/2">
                                                <label
                                                    htmlFor="internshipStipendRangeMax"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Max Stipend (₹){" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    id="internshipStipendRangeMax"
                                                    name="internshipStipendRange.max"
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
                                                    placeholder="Max stipend"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                                        errors
                                                            .internshipStipendRange
                                                            ?.max
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    }`}
                                                />
                                                {errors.internshipStipendRange
                                                    ?.max && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors
                                                                .internshipStipendRange
                                                                .max
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {formData.internshipType ===
                                        "PerformanceBased" && (
                                        <div className="relative">
                                            <label
                                                htmlFor="internshipPerformanceCriteria"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Performance Criteria{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="flex items-start gap-2">
                                                <textarea
                                                    id="internshipPerformanceCriteria"
                                                    name="internshipPerformanceCriteria"
                                                    value={
                                                        formData.internshipPerformanceCriteria
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Describe performance criteria"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
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
                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                                                >
                                                    {enhanceLoading.internshipPerformanceCriteria
                                                        ? "Enhancing..."
                                                        : "Enhance"}
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
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Collaboration Description{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-start gap-2">
                                        <textarea
                                            id="collaborationDescription"
                                            name="collaborationDescription"
                                            value={
                                                formData.collaborationDescription
                                            }
                                            onChange={handleChange}
                                            placeholder="Describe the collaboration"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y ${
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
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                                        >
                                            {enhanceLoading.collaborationDescription
                                                ? "Enhancing..."
                                                : "Enhance"}
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
                                                onChange={() => handleJobTimeTypeChange(type)}
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
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
                                    )}
                            {formData.workBasis.Job && (
                                <div className="relative flex gap-4">
                                    <div className="w-1/2">
                                        <label
                                            htmlFor="jobAmountRangeMin"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Min Amount (₹){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="jobAmountRangeMin"
                                            name="jobAmountRange.min"
                                            value={formData.jobAmountRange.min}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    "jobAmountRange",
                                                    "min",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                            min="0"
                                            placeholder="Min amount"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                                errors.jobAmountRange?.min
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        {errors.jobAmountRange?.min && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.jobAmountRange.min}
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            htmlFor="jobAmountRangeMax"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Max Amount (₹){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="jobAmountRangeMax"
                                            name="jobAmountRange.max"
                                            value={formData.jobAmountRange.max}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    "jobAmountRange",
                                                    "max",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                            min="0"
                                            placeholder="Max amount"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                                errors.jobAmountRange?.max
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        {errors.jobAmountRange?.max && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.jobAmountRange.max}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {formData.workBasis.Freelance && (
                                <div className="relative flex gap-4">
                                    <div className="w-1/2">
                                        <label
                                            htmlFor="freelancePaymentRangeMin"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Min Payment (₹){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="freelancePaymentRangeMin"
                                            name="freelancePaymentRange.min"
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
                                            placeholder="Min payment"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                                errors.freelancePaymentRange
                                                    ?.min
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        {errors.freelancePaymentRange?.min && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.freelancePaymentRange
                                                        .min
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            htmlFor="freelancePaymentRangeMax"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Max Payment (₹){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="freelancePaymentRangeMax"
                                            name="freelancePaymentRange.max"
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
                                            placeholder="Max payment"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                                errors.freelancePaymentRange
                                                    ?.max
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        {errors.freelancePaymentRange?.max && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.freelancePaymentRange
                                                        .max
                                                }
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
                                        Project Criteria{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-start gap-2">
                                        <textarea
                                            id="projectDescription"
                                            name="projectDescription"
                                            value={formData.projectDescription}
                                            onChange={handleChange}
                                            placeholder="Describe the project"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
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
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                                        >
                                            {enhanceLoading.projectDescription
                                                ? "Enhancing..."
                                                : "Enhance"}
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
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Percentage Value (%){" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="percentageBasisValue"
                                        name="percentageBasisValue"
                                        value={formData.percentageBasisValue}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter percentage value"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
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
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Equity Value (%){" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="equityBasisValue"
                                        name="equityBasisValue"
                                        value={formData.equityBasisValue}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter equity value"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
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
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Other Work Basis{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-start gap-2">
                                        <textarea
                                            id="otherWorkBasis"
                                            name="otherWorkBasis"
                                            value={formData.otherWorkBasis}
                                            onChange={handleChange}
                                            placeholder="Describe other work basis"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                                                errors.otherWorkBasis
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                enhanceField(
                                                    "otherWorkBasis",
                                                    formData.otherWorkBasis
                                                )
                                            }
                                            disabled={
                                                enhanceLoading.otherWorkBasis
                                            }
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                                        >
                                            {enhanceLoading.otherWorkBasis
                                                ? "Enhancing..."
                                                : "Enhance"}
                                        </button>
                                    </div>
                                    {errors.otherWorkBasis && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.otherWorkBasis}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative col-span-2 flex gap-4">
    <div className="w-1/2">
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.timeCommitment?.value ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.timeCommitment?.value && (
            <p className="text-red-500 text-sm mt-1">{errors.timeCommitment.value}</p>
        )}
    </div>
    <div className="w-1/2">
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                errors.timeCommitment?.unit ? "border-red-500" : "border-gray-300"
            }`}
        >
            <option value="">Select Unit</option>
            <option value="hours/day">Hours/Day</option>
            <option value="hours/week">Hours/Week</option>
            <option value="hours/month">Hours/Month</option>
        </select>
        {errors.timeCommitment?.unit && (
            <p className="text-red-500 text-sm mt-1">{errors.timeCommitment.unit}</p>
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
                                        onChange={() =>
                                            handleWorkModeChange(mode)
                                        }
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <label
                                        htmlFor={mode}
                                        className="ml-2 text-gray-700"
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
                    </div>

                    {(formData.workMode.Hybrid || formData.workMode.Onsite) && (
                        <div className="relative col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label
                                    htmlFor="workLocationCountry"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Country{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="workLocationCountry"
                                    name="workLocation.country"
                                    value={formData.workLocation.country}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "workLocation",
                                            "country",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
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
                            <div>
                                <label
                                    htmlFor="workLocationState"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    State{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="workLocationState"
                                    name="workLocation.state"
                                    value={formData.workLocation.state}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "workLocation",
                                            "state",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
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
                            <div>
                                <label
                                    htmlFor="workLocationDistrict"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    District{" "}
                                    <span className="text-red-500">*</span>
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
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.workLocation.district}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="relative col-span-2 flex gap-4">
                        <div className="w-1/2">
                            <label
                                htmlFor="experienceRangeMin"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Min Experience (Years){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="experienceRangeMin"
                                name="experienceRange.min"
                                value={formData.experienceRange.min}
                                onChange={(e) =>
                                    handleNestedChange(
                                        "experienceRange",
                                        "min",
                                        e.target.value
                                    )
                                }
                                type="number"
                                min="0"
                                placeholder="Min experience"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                    errors.experienceRange?.min
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.experienceRange?.min && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.experienceRange.min}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="experienceRangeMax"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Max Experience (Years){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="experienceRangeMax"
                                name="experienceRange.max"
                                value={formData.experienceRange.max}
                                onChange={(e) =>
                                    handleNestedChange(
                                        "experienceRange",
                                        "max",
                                        e.target.value
                                    )
                                }
                                type="number"
                                min="0"
                                placeholder="Max experience"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 ${
                                    errors.experienceRange?.max
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.experienceRange?.max && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.experienceRange.max}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="relative col-span-2">
                        <label
                            htmlFor="responsibilities"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Responsibilities{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-start gap-2">
                            <textarea
                                id="responsibilities"
                                name="responsibilities"
                                value={formData.responsibilities}
                                onChange={handleChange}
                                maxLength={400}
                                placeholder="List key responsibilities"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                                    errors.responsibilities
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    enhanceField(
                                        "responsibilities",
                                        formData.responsibilities
                                    )
                                }
                                disabled={enhanceLoading.responsibilities}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {enhanceLoading.responsibilities
                                    ? "Enhancing..."
                                    : "Enhance"}
                            </button>
                        </div>
                        {errors.responsibilities && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.responsibilities}
                            </p>
                        )}
                    </div>

                    <div className="relative col-span-2">
                        <label
                            htmlFor="whyShouldJoin"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Why Should They Join?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-start gap-2">
                            <textarea
                                id="whyShouldJoin"
                                name="whyShouldJoin"
                                value={formData.whyShouldJoin}
                                onChange={handleChange}
                                maxLength={300}
                                placeholder="What makes this opportunity exciting?"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px] ${
                                    errors.whyShouldJoin
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    enhanceField(
                                        "whyShouldJoin",
                                        formData.whyShouldJoin
                                    )
                                }
                                disabled={enhanceLoading.whyShouldJoin}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {enhanceLoading.whyShouldJoin
                                    ? "Enhancing..."
                                    : "Enhance"}
                            </button>
                        </div>
                        {errors.whyShouldJoin && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.whyShouldJoin}
                            </p>
                        )}
                    </div>

                    <div className="relative col-span-2">
                        <label
                            htmlFor="anyOtherInfo"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Any Other Information
                        </label>
                        <div className="flex items-start gap-2">
                            <textarea
                                id="anyOtherInfo"
                                name="anyOtherInfo"
                                value={formData.anyOtherInfo}
                                onChange={handleChange}
                                maxLength={200}
                                placeholder="Additional details (optional)"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 resize-y min-h-[100px]"
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
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {enhanceLoading.anyOtherInfo
                                    ? "Enhancing..."
                                    : "Enhance"}
                            </button>
                        </div>
                    </div>
                </div>

                {errors.submit && (
                    <p className="text-red-500 text-sm mt-4">{errors.submit}</p>
                )}

                <div className="flex justify-between items-center mt-6">
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
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateFounderPostForm;
