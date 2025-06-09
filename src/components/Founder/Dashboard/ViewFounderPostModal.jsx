import React from "react";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ViewFounderPostModal = ({ post, onClose, onUpdate }) => {
  // Helper to get country, state, city names from codes
  const getCountryName = (code) =>
    Country.getAllCountries().find((c) => c.isoCode === code)?.name || code;
  const getStateName = (countryCode, stateCode) =>
    State.getStatesOfCountry(countryCode).find((s) => s.isoCode === stateCode)
      ?.name || stateCode;
  const getCityName = (countryCode, stateCode, cityName) =>
    City.getCitiesOfState(countryCode, stateCode).find(
      (c) => c.name === cityName
    )?.name || cityName;

  // Extract data from post
  const {
    headline,
    domainName,
    roleUnderDomain,
    skills = [],
    startUpName,
    aboutEntity,
    workMode,
    workCity,
    workState,
    workCountry,
    workBasis,
    timeCommitment,
    userType,
    requirementType,
    otherUserType,
    otherRequirementType,
    experienceRange,
    responsibilities,
    facebook,
    instagram,
    linkedin,
    whatsapp,
    email,
    websiteOfStartupLink,
    internshipType,
    internshipTimeType,
    internshipDuration,
    internshipStipendRange,
    internshipPerformanceCriteria,
    collaborationDescription,
    jobAmountRange,
    freelancePaymentRange,
    projectDescription,
    percentageBasisValue,
    equityBasisValue,
    otherWorkBasis,
    partnershipCriteria,
    whyShouldJoin,
    anyOtherInfo,
    userId: userDetails,
  } = post;

  const { firstName, middleName, lastName, country,state,city,gender, email: userEmail } =
    userDetails || {};
  console.log(userDetails)
  // Format work location
  const workLocation = {
    country: workCountry,
    state: workState,
    district: workCity,
  };

  // Format contact methods
  const contact_methods = {
    call: { selected: !!post.call, value: post.call || "" },
    whatsapp: { selected: !!whatsapp, value: whatsapp || "" },
    instagram: { selected: !!instagram, value: instagram || "" },
    linkedin: { selected: !!linkedin, value: linkedin || "" },
    facebook: { selected: !!facebook, value: facebook || "" },
    other: { selected: !!post.otherContact, value: post.otherContact || "" },
  };

  // Format work basis
  const workBasisObj = {
    Partnership: workBasis?.includes("Partnership"),
    Collaboration: workBasis?.includes("Collaboration"),
    Internship: workBasis?.includes("Internship"),
    Job: workBasis?.includes("Job"),
    Freelance: workBasis?.includes("Freelance"),
    ProjectBasis: workBasis?.includes("ProjectBasis"),
    PercentageBasis: workBasis?.includes("PercentageBasis"),
    EquityBasis: workBasis?.includes("EquityBasis"),
    Other: workBasis?.includes("Other"),
  };

  const normalizedWorkMode = Array.isArray(workMode) ? workMode : workMode ? [workMode] : [];

const workModeObj = {
  Remote: normalizedWorkMode.includes("Remote"),
  Hybrid: normalizedWorkMode.includes("Hybrid"),
  Onsite: normalizedWorkMode.includes("Onsite"),
};

  // Parse ranges and durations
  const experienceRangeObj = experienceRange
    ? {
        min: experienceRange.split("-")[0]?.trim() || "",
        max: experienceRange.split("-")[1]?.trim()?.replace("years", "") || "",
      }
    : { min: "", max: "" };

  const internshipStipendRangeObj = internshipStipendRange
    ? {
        min: internshipStipendRange.split("-")[0]?.trim() || "",
        max: internshipStipendRange
          .split("-")[1]
          ?.trim()
          ?.replace("rupees", "") || "",
      }
    : { min: "", max: "" };

const jobAmountRangeObj = jobAmountRange
  ? {
      min: jobAmountRange.split("-")[0]?.trim() || "",
      max: jobAmountRange.split("-")[1]?.trim()?.replace(" ruppes", "") || "", // Change "rupees" to "ruppes"
    }
  : { min: "", max: "" };
  const freelancePaymentRangeObj = freelancePaymentRange
    ? {
        min: freelancePaymentRange.split("-")[0]?.trim() || "",
        max: freelancePaymentRange
          .split("-")[1]
          ?.trim()
          ?.replace("rupees", "") || "",
      }
    : { min: "", max: "" };

  const internshipDurationObj = internshipDuration
    ? {
        value: internshipDuration.split(" ")[0] || "",
        unit: internshipDuration.split(" ")[1] || "",
      }
    : { value: "", unit: "" };

  return (
    <div className="fixed inset-0 bg-violet-300/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-[800px] max-h-[95vh] overflow-y-auto border border-violet-200 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-violet-900 tracking-tight">
            View Post Details
          </h2>
          <div className="flex gap-4">
            <button
              className="bg-purple-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              onClick={onUpdate}
            >
              Update
            </button>
            <button
              className="text-red-600 text-sm font-medium px-6 py-3 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl w-full">
          {/* Step Indicator (Static for View Mode) */}
          {/* <div className="h-20 flex items-center justify-center gap-5 rounded-t-2xl mb-6 border-b border-gray-200 w-[50%] mx-auto text-xl">
            <div className="flex flex-col">
              <p className="flex items-center gap-2">
                01 <span className="text-sm text-violet-600">About Founder</span>
              </p>
              <div className="flex items-center gap-1">
                <div className="flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 bg-violet-600">
                  ✓
                </div>
                <div className="w-[150px] h-1 bg-violet-600"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="flex items-center gap-2">
                02{" "}
                <span className="text-sm text-violet-600">
                  Skills and Strength
                </span>
              </p>
              <div className="flex items-center gap-1">
                <div className="flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 bg-violet-600">
                  ✓
                </div>
                <div className="w-[150px] h-1 bg-violet-600"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="flex items-center gap-2 w-[150px]">
                03 <span className="text-sm text-violet-600">Looking for</span>
              </p>
              <div className="flex items-center gap-1">
                <div className="flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-semibold border border-violet-600 bg-violet-600">
                  ✓
                </div>
              </div>
            </div>
          </div> */}

          {/* Step 1: About Founder */}
          <div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5">
            <div className="flex flex-col">
              <p className="text-violet-700 text-xl">Say It Your Way</p>
              <p className="text-violet-400">
                This isn't your typical hiring form. In a few short questions,
                you'll paint a picture of your world and who you're looking for —
                no corporate lingo required.
              </p>
            </div>
            <img src="./FormImage1.svg" alt="" className="scale-150" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* <h3 className="col-span-2 text-xl font-semibold text-[#7900BF] mb-4">
              Let’s introduce you to the world.
            </h3> */}

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                value={firstName || ""}
                disabled
                type="text"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                value={middleName || ""}
                disabled
                type="text"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                value={lastName || ""}
                disabled
                type="text"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                You are a
              </label>
              <div className="flex flex-wrap gap-4">
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
                      checked={userType === type}
                      disabled
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              {userType === "Other" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specify User Type
                  </label>
                  <input
                    value={otherUserType || ""}
                    disabled
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                  />
                </div>
              )}
            </div>

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                This requirement is for a
              </label>
              <div className="flex flex-wrap gap-4">
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
                      checked={requirementType === type}
                      disabled
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              {requirementType === "Other" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specify Requirement Type
                  </label>
                  <input
                    value={otherRequirementType || ""}
                    disabled
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                  />
                </div>
              )}
              {["Startup", "Business"].includes(requirementType) && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business/Startup Name
                  </label>
                  <input
                    value={startUpName || ""}
                    disabled
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                  />
                </div>
              )}
            </div>

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About the {requirementType}
              </label>
              <textarea
                value={aboutEntity || ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed resize-y min-h-[100px]"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={userEmail || email || ""}
                disabled
                type="text"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                value={country || ""}
                disabled
                type="text"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                value={state || ""}
                disabled
                type="text"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                value={city || ""}
                disabled
                type="text"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal website
              </label>
              <input
                value={websiteOfStartupLink || ""}
                disabled
                type="url"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How people can reach out to you
              </label>
              <div className="flex flex-wrap gap-4">
                {["call", "whatsapp", "instagram", "linkedin", "facebook", "other"].map(
                  (method) => (
                    <div key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={contact_methods[method].selected}
                        disabled
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <label className="ml-2 text-gray-700">
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </label>
                    </div>
                  )
                )}
              </div>
              <div className="mt-4 space-y-4">
                {Object.entries(contact_methods).map(([method, { selected, value }]) => (
                  selected && (
                    <div key={method} className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                        {method === "whatsapp" || method === "call" ? " Number" : " URL"}
                      </label>
                      {method === "call" || method === "whatsapp" ? (
                        <PhoneInput
                          country="in"
                          value={value}
                          disabled
                          containerClass="w-full"
                          inputClass="w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                          buttonClass="border-gray-300 h-14 w-16 bg-gray-100 cursor-not-allowed"
                          dropdownClass="border-y-300"
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
                          type="url"
                          value={value}
                          disabled
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                        />
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Skills and Strength
          <div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5 mt-8">
            <div className="flex flex-col">
              <p className="text-violet-700 text-xl">You're almost there!</p>
              <p className="text-violet-400">
                This fun little form helps you describe your vibe and your need —
                quick, casual, and human. No resumes, no HR jargon. Just say it
                like it is.
              </p>
            </div>
            <img src="./FormImage2.svg" alt="" className="" />
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* <h3 className="col-span-2 text-xl font-semibold text-[#7900BF] mb-4">
              Your dream teammate, freelancer, or hire — describe them here.
            </h3> */}

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Headline (e.g., I am looking for...)
              </label>
              <input
                value={headline || ""}
                disabled
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role of the Person
              </label>
              <input
                value={roleUnderDomain || ""}
                disabled
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domain of the Person Needed
              </label>
              <input
                value={domainName || ""}
                disabled
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Basis
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
                      checked={workBasisObj[basis]}
                      disabled
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label className="ml-2 text-gray-700">
                      {basis.replace(/([A-Z])/g, " $1 ").trim()}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-4">
                {workBasisObj.Partnership && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Partnership Criteria
                    </label>
                    <textarea
                      value={partnershipCriteria || ""}
                      disabled
                      className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
                    />
                  </div>
                )}
                {workBasisObj.Internship && (
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Internship Time Type
                      </label>
                      <div className="flex gap-4">
                        {["FullTime", "PartTime"].map((type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="radio"
                              value={type}
                              checked={internshipTimeType === type}
                              disabled
                              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">
                              {type === "FullTime" ? "Full-time" : "Part-time"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Internship Type
                      </label>
                      <div className="flex gap-4">
                        {["Paid", "Unpaid", "PerformanceBased"].map((type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="radio"
                              value={type}
                              checked={internshipType === type}
                              disabled
                              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">
                              {type.replace(/([A-Z])/g, " $1 ").trim()}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="relative flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Internship Duration
                        </label>
                        <input
                          value={internshipDurationObj.value || ""}
                          disabled
                          type="number"
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit
                        </label>
                        <select
                          value={internshipDurationObj.unit || ""}
                          disabled
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                        >
                          <option value="">Select Unit</option>
                          <option value="Weeks">Weeks</option>
                          <option value="Months">Months</option>
                        </select>
                      </div>
                    </div>

                    {internshipType === "Paid" && (
                      <div className="relative flex gap-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Min Stipend (₹)
                          </label>
                          <input
                            value={internshipStipendRangeObj.min || ""}
                            disabled
                            type="number"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Stipend (₹)
                          </label>
                          <input
                            value={internshipStipendRangeObj.max || ""}
                            disabled
                            type="number"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                          />
                        </div>
                      </div>
                    )}

                    {internshipType === "PerformanceBased" && (
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Performance Criteria
                        </label>
                        <textarea
                          value={internshipPerformanceCriteria || ""}
                          disabled
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
                        />
                      </div>
                    )}
                  </div>
                )}
                {workBasisObj.Collaboration && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Collaboration Description
                    </label>
                    <textarea
                      value={collaborationDescription || ""}
                      disabled
                      className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
                    />
                  </div>
                )}
               {workBasisObj.Job && (
  <div className="relative flex gap-4">
    <div className="w-1/2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Min Amount (₹)
      </label>
      <input
        value={jobAmountRangeObj.min || ""}
        disabled
        type="number"
        className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
      />
    </div>
    <div className="w-1/2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Max Amount (₹)
      </label>
      <input
        value={jobAmountRangeObj.max || ""}
        disabled
        type="number"
        className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
      />
    </div>
  </div>
)}
                {workBasisObj.Freelance && (
                  <div className extraneous="relative flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Payment (₹)
                      </label>
                      <input
                        value={freelancePaymentRangeObj.min || ""}
                        disabled
                        type="number"
                        className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Payment (₹)
                      </label>
                      <input
                        value={freelancePaymentRangeObj.max || ""}
                        disabled
                        type="number"
                        className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                      />
                    </div>
                  </div>
                )}
                {workBasisObj.ProjectBasis && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Criteria
                    </label>
                    <textarea
                      value={projectDescription || ""}
                      disabled
                      className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
                    />
                  </div>
                )}
                {workBasisObj.PercentageBasis && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage Value (%)
                    </label>
                    <input
                      value={percentageBasisValue || ""}
                      disabled
                      type="number"
                      className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                    />
                  </div>
                )}
                {workBasisObj.EquityBasis && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Equity Value (%)
                    </label>
                    <input
                      value={equityBasisValue || ""}
                      disabled
                      type="number"
                      className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                    />
                  </div>
                )}
                {workBasisObj.Other && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other Work Basis
                    </label>
                    <textarea
                      value={otherWorkBasis || ""}
                      disabled
                      className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Commitment
              </label>
              <input
                value={timeCommitment || ""}
                disabled
                type="text"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              />
            </div>

            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Mode
              </label>
              <div className="flex flex-wrap gap-4">
                {["Remote", "Hybrid", "Onsite"].map((mode) => (
                  <div key={mode} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={workModeObj[mode]}
                      disabled
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label className="ml-2 text-gray-700">{mode}</label>
                  </div>
                ))}
              </div>
            </div>

            {(workModeObj.Hybrid || workModeObj.Onsite) && (
              <div className="relative col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    value={getCountryName(workLocation.country) || ""}
                    disabled
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    value={getStateName(workLocation.country, workLocation.state) || ""}
                    disabled
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <input
                    value={getCityName(workLocation.country, workLocation.state, workLocation.district) || ""}
                    disabled
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                  />
                </div>
              </div>
            )}

            <div className="relative col-span-2 flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Experience (Years)
                </label>
                <input
                  value={experienceRangeObj.min || ""}
                  disabled
                  type="number"
                  className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Experience (Years)
                </label>
                <input
                  value={experienceRangeObj.max || ""}
                  disabled
                  type="number"
                  className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Looking for
          <div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5 mt-8">
            <div className="flex flex-col">
              <p className="text-violet-700 text-xl">You’ve made it to the final step!</p>
              <p className="text-violet-400">
                This short form captures who you are, what you need, and how your team works —
                no fluff, no lengthy job descriptions. Just clear, honest details. Done in
                minutes.
              </p>
            </div>
            <img src="./FormImage3.svg" alt="" className="" />
          </div> */}

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsibilities
              </label>
              <textarea
                value={responsibilities || ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed resize-y min-h-[100px]"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why Should They Join?
              </label>
              <textarea
                value={whyShouldJoin || ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed resize-y min-h-[100px]"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Any Other Information
              </label>
              <textarea
                value={anyOtherInfo || ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed resize-y min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFounderPostModal;