import React, { useState } from "react";
import { FaMoneyBills, FaLocationArrow } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { PiBagBold } from "react-icons/pi";
import UpdateTalentPostForm from "../TalentPostForm/UpdateTalentsForm"; // Ensure this path is correct
import ViewTalentPostModal from "./ViewTalentPostModal";

const NewCard = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [listingId, setListingId] = useState(null);

  const statusColor = {
    Pending: "bg-[#FFE167] border-yellow-200",
    Accepted: "bg-[#82FF5F] border-green-200",
    Rejected: "bg-[#FF7567] border-red-200",
  };

  // Extract and format data
  const {
    headline = "Talent Profile",
    domainName = "Domain not specified",
    roleUnderDomain = "Role not specified",
    skills = [],
    workBasis = {},
    workMode = {},
    country = "",
    state = "",
    district = "",
    timeCommitment = "",
    experience = {},
    status = "Pending",
    first_name = "Anonymous",
    contact_methods = {},
    aboutSelf = "",
    portfolioLink = "",
    projects = [],
    workExperience = [],
    otherLinks = [],
    expectations = "",
    anyOtherInfo = "",
    freelancePaymentRange = {},
    _id: listingIdFromPost,
  } = post || {};

  // Format work basis
  const jobType = Object.keys(workBasis)
    .filter((key) => workBasis[key])
    .join(", ") || "Not specified";

  // Format work mode and location
  const workModeString = Object.keys(workMode)
    .filter((key) => workMode[key])
    .join(", ") || "";
  const locationString = [district, state, country].filter(Boolean).join(", ");
  const location = workModeString ? `${workModeString}${locationString ? `: ${locationString}` : ""}` : "Location not specified";

  // Format experience
  const formatExperience = (exp) => {
    if (!exp || (!exp.years && !exp.months && !exp.days)) return "Not specified";
    const parts = [];
    if (exp.years) parts.push(`${exp.years} year${exp.years > 1 ? "s" : ""}`);
    if (exp.months) parts.push(`${exp.months} month${exp.months > 1 ? "s" : ""}`);
    if (exp.days) parts.push(`${exp.days} day${exp.days > 1 ? "s" : ""}`);
    return parts.join(", ") || "Not specified";
  };
  const experienceRange = formatExperience(experience);

  // Format freelance payment range
  const paymentRange =
    freelancePaymentRange?.min && freelancePaymentRange?.max
      ? `$${freelancePaymentRange.min} - $${freelancePaymentRange.max}/hr`
      : "";

  // Sort and filter skills
  const sortedSkills = [...skills].sort((a, b) => a.length - b.length);
  let visibleSkills = [];
  let totalLength = 0;
  for (let skill of sortedSkills) {
    if (totalLength + skill.length <= 45) {
      visibleSkills.push(skill);
      totalLength += skill.length;
    } else break;
  }
  const remainingCount = sortedSkills.length - visibleSkills.length;

  // Handle modal close with openUpdate flag
  const handleViewModalClose = (options = {}) => {
    setIsModalOpen(false);
    if (options.openUpdate && options.listingId) {
      setListingId(options.listingId);
      setIsUpdateModalOpen(true);
    }
  };

  return (
    <>
      <div className="text-gray-800 flex shadow-[1px_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_13px_rgba(0,0,0,0.2)] transition-all duration-300 flex-col h-fit w-[650px] bg-white rounded-3xl p-5 gap-0.5 hover:cursor-pointer">
        {/* Role, Domain, Status */}
        <div className="flex w-full items-start justify-between" onClick={() => setIsModalOpen(true)}>
          <div className="flex w-full flex-col">
            <p className="text-md font-semibold">{roleUnderDomain}</p>
            <p className="text-sm font-medium">{domainName}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="text-[#A100FF] text-xl border-[2px] p-1 rounded-full hover:bg-purple-50 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineRemoveRedEye />
            </button>
            <div className={`w-3.5 h-3.5 rounded-full ${statusColor[status] || "bg-gray-200"}`}></div>
          </div>
        </div>
        <hr className="mt-2 text-gray-200 w-full" />

        {/* Headline */}
        <div className="h-fit mt-1 mb-1" onClick={() => setIsModalOpen(true)}>
          <h2 className="text-md font-medium">{headline}</h2>
        </div>

        {/* Experience, Work Mode, Work Basis */}
        <div className="my-1 flex items-center gap-2 text-sm text-gray-600">
          <div className="flex flex-col items-center border-r border-gray-300 pr-4">
            <div className="flex items-center gap-1 font-medium">
              <PiBagBold className="text-violet-500" />
              Experience: {experienceRange}
            </div>
          </div>
          <div className="flex flex-col items-center border-r border-gray-300 pr-4">
            <div className="flex items-center gap-1 font-medium">
              <IoLocationOutline className="text-violet-500" />
              {location}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 font-medium">
              <FaMoneyBills className="text-violet-500" />
              {jobType}
            </div>
          </div>
        </div>

        {/* Time Commitment and Payment Range */}
        {(timeCommitment || paymentRange) && (
          <div className="my-1 flex items-center gap-4 text-sm text-gray-600">
            {timeCommitment && (
              <div className="flex items-center gap-1 font-medium">
                <IoMdTime className="text-violet-500" />
                Time: {timeCommitment}
              </div>
            )}
            {paymentRange && (
              <div className="flex items-center gap-1 font-medium">
                <FaMoneyBills className="text-violet-500" />
                Rate: {paymentRange}
              </div>
            )}
          </div>
        )}

        {/* Skills */}
        <div className="mt-1 flex flex-wrap items-center gap-1.5 w-full text-sm" onClick={() => setIsModalOpen(true)}>
          {visibleSkills.map((skill, index) => (
            <span key={index} className="border border-[#ECCCFF] text-gray-700 text-[0.7rem] px-2.5 py-0.5 rounded-full">
              {skill}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs text-gray-500 self-center cursor-pointer">+ {remainingCount}</span>
          )}
        </div>
        <hr className="mt-4 text-gray-200 w-full" />

        {/* Contact Methods and Buttons */}
        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center gap-1.5 w-fit">
            {contact_methods.facebook?.value && (
              <img src="/facebook.svg" alt="Facebook" className="h-4 w-4 object-cover" />
            )}
            {contact_methods.instagram?.value && (
              <img src="/instagram.svg" alt="Instagram" className="h-4 w-4 object-cover" />
            )}
            {contact_methods.linkedin?.value && (
              <img src="/linkedin.svg" alt="LinkedIn" className="h-4 w-4 object-cover" />
            )}
            {contact_methods.whatsapp?.value && (
              <img src="/whatsapp.svg" alt="WhatsApp" className="h-5 w-5 object-cover" />
            )}
            {contact_methods.call?.value && (
              <img src="/phone.svg" alt="Call" className="h-5 w-5 object-cover" />
            )}
            {contact_methods.otherContact?.value && (
              <img src="/link.svg" alt="Other" className="h-5 w-5 object-cover" />
            )}
          </div>
          <div className="flex justify-end gap-2 mt-1 w-full">
            <button
              className="bg-purple-600 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-purple-700"
              onClick={() => {
                setListingId(listingIdFromPost);
                setIsUpdateModalOpen(true);
              }}
            >
              Update
            </button>
            <button className="text-[#A100FF] border-[2px] border-[#A100FF] w-[25%] text-xs font-medium px-2 py-2 rounded-full hover:bg-purple-50">
              Share Profile
            </button>
            <button className="text-white bg-[#A100FF] border-[2px] border-[#A100FF] w-[25%] text-xs font-medium px-2 py-2 rounded-full hover:bg-purple-700">
              View Applications
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {isModalOpen && (
        <ViewTalentPostModal
          post={post}
          onClose={handleViewModalClose}
          errors={{}}
        />
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto"
          onClick={() => setIsUpdateModalOpen(false)} // Close on overlay click
        >
          <div
            className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-4xl m-4 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              onClick={() => setIsUpdateModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold text-[#7900BF] mb-6 text-center">
              Update Talent Profile
            </h2>

            {/* Render UpdateTalentPostForm */}
            <UpdateTalentPostForm
              listingId={listingId}
              onClose={() => setIsUpdateModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NewCard;