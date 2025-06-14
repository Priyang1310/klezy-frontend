import React, { useState } from "react";
import { FaMoneyBills, FaLocationArrow } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { PiBagBold } from "react-icons/pi";
import UpdateTalentPostForm from "../TalentPostForm/UpdateTalentsForm"; // Ensure this path is correct
import ViewTalentPostModal from "./ViewTalentPostModal";
import { CiEdit } from "react-icons/ci";
import ViewApplicantsModal from "./ViewApplicantsModal";

const NewCard = ({ post }) => {
  console.log("post is: ",post);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isViewApplicantsModalOpen, setIsViewApplicantsModalOpen] = useState(false);
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
  
  // Extract contact methods from the nested structure
  const {
    instagram = {},
    linkedin = {},
    whatsapp = {},
    email = {},
    facebook = {},
    call = {},
    other = {}
  } = contact_methods || {};

  console.log(post)
  console.log("workBasis: ",workBasis)
  console.log("contact_methods: ", contact_methods)
  
  // Format work basis
  const jobType = Object.keys(workBasis)
    .filter((key) => workBasis[key])
    .join(", ") || "Not specified";
  console.log("jobtype: ",jobType);
  
  // Format work mode and location
  const workModeString = Object.keys(workMode)
    .filter((key) => workMode[key])
    .join(", ") || "";
    console.log(workModeString)
    console.log(workMode)

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
    if (totalLength + skill.length <= 70) {
      visibleSkills.push(skill);
      totalLength += skill.length;
    } else break;
  }
  const remainingCount = sortedSkills.length - visibleSkills.length;

  // Handle modal close with openUpdate flag
  const handleViewModalClose = (options = {}) => {
    setIsModalOpen(false);
    setIsViewApplicantsModalOpen(false);
    if (options.openUpdate && options.listingId) {
      setListingId(options.listingId);
      setIsUpdateModalOpen(true);
    }
  };

  return (
    <>
      <div className="text-gray-800 flex shadow-md transition-all duration-300 flex-col h-fit w-full max-w-[650px] bg-white rounded-3xl p-3 sm:p-5 gap-0.5 hover:cursor-pointer">

        {/* Role, Domain, Status */}
        <div className="flex w-full items-start justify-between" onClick={() => setIsModalOpen(true)}>
          <div className="flex items-start gap-2 sm:gap-5">
            <div className="flex flex-col   pr-2 sm:pr-4">
              <p className="text-sm sm:text-md font-semibold">{roleUnderDomain}</p>
              <p className="text-xs sm:text-sm font-medium">{domainName}</p>
            </div>
          </div>
          <div className={`w-3.5 h-3.5 rounded-full ${statusColor[status] || "bg-gray-200"}`}></div>
        </div>
        <hr className="mt-2 text-gray-200 w-full" />

        {/* Headline */}
        <div className="h-fit mt-1 mb-1" onClick={() => setIsModalOpen(true)}>
          <h2 className="text-sm sm:text-md font-medium">{headline}</h2>
        </div>

        {/* Experience, Work Mode, Work Basis */}
        <div className="my-1 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 text-xs sm:text-sm text-gray-600">
          {/* Experience */}
          <div className="flex flex-col items-start sm:items-center border-b sm:border-b-0 sm:border-r border-gray-300 pb-2 sm:pb-0 sm:pr-4 w-full sm:w-auto">
            <div className="flex items-start gap-1 font-medium">
              <PiBagBold className="text-violet-500 text-base sm:text-lg" />
              <span className="text-xs sm:text-sm">Exp: {experienceRange}</span>
            </div>
          </div>
          {/* Location */}
          <div className="flex flex-col items-start sm:items-center border-b sm:border-b-0 sm:border-r border-gray-300 pb-2 sm:pb-0 sm:pr-4 w-full sm:w-auto">
            <div className="flex items-start gap-1 font-medium">
              <IoLocationOutline className="text-violet-500 text-base sm:text-lg" />
              <span className="text-xs sm:text-sm">{location}</span>
            </div>
          </div>
          {/* Partnership */}
          <div className="flex flex-col items-start sm:items-center w-full sm:w-auto">
            <div className="flex items-start gap-1 font-medium">
              <FaMoneyBills className="text-violet-500 text-base sm:text-lg" />
              <span className="text-xs sm:text-sm">{jobType}</span>
            </div>
          </div>
        </div>

        {/* Time Commitment and Payment Range */}
        {(timeCommitment || paymentRange) && (
          <div className="my-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            {timeCommitment && (
              <div className="flex items-center gap-1 font-medium">
                <IoMdTime className="text-violet-500" />
                <span>Time: {timeCommitment}</span>
              </div>
            )}
            {paymentRange && (
              <div className="flex items-center gap-1 font-medium">
                <FaMoneyBills className="text-violet-500" />
                <span>Rate: {paymentRange}</span>
              </div>
            )}
          </div>
        )}

        {/* Skills */}
        <div className="mt-1 flex flex-wrap items-center gap-1.5 w-full text-sm" onClick={() => setIsModalOpen(true)}>
          {visibleSkills.map((skill, index) => (
            <span key={index} className="border border-[#ECCCFF] text-gray-700 text-[0.6rem] sm:text-[0.7rem] px-2 sm:px-2.5 py-0.5 rounded-full">
              {skill}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs text-gray-500 self-center cursor-pointer">+ {remainingCount}</span>
          )}
        </div>
        <hr className="mt-4 text-gray-200 w-full" />

        {/* Contact Methods and Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-2 gap-3 sm:gap-4">
          {/* Social Media Icons */}
          <div className="flex items-center gap-1.5 w-fit">
            {instagram?.selected && (
              <img src="./instagram.svg" alt="Instagram" className="h-4 w-4 object-cover" />
            )}
            {linkedin?.selected && (
              <img src="./linkedIn.svg" alt="LinkedIn" className="h-4 w-4 object-cover" />
            )}
            {whatsapp?.selected && (
              <img src="./whatsapp.svg" alt="WhatsApp" className="h-5 w-5 object-cover" />
            )}
            {email?.selected && (
              <img src="./email.svg" alt="Email" className="h-5 w-5 object-cover" />
            )}
            {facebook?.selected && (
              <img src="./facebook.svg" alt="Facebook" className="h-4 w-4 object-cover" />
            )}
            {call?.selected && (
              <img src="./phone.svg" alt="Phone" className="h-4 w-4 object-cover" />
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-space gap-1 sm:gap-3 mt-1 w-full sm:w-auto">
            {/* Icon Buttons */}
            <div className="flex gap-1 sm:gap-2">
              <button
                className="text-[#A100FF] text-lg sm:text-xl p-1.5 sm:p-2 rounded-full hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center"
                onClick={() => {
                  setListingId(listingIdFromPost);
                  setIsUpdateModalOpen(true);
                }}
                title="Edit"
              >
                <CiEdit />
              </button>
              <button
                className="text-[#A100FF] text-lg sm:text-xl p-1.5 sm:p-2 rounded-full hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center"
                onClick={() => setIsModalOpen(true)}
                title="View Details"
              >
                <MdOutlineRemoveRedEye />
              </button>
            </div>
            
            {/* Text Buttons */}
            <div className="flex gap-1 sm:gap-3 w-full sm:w-auto">
            <button className="text-[#A100FF] w-24 sm:w-32 h-9 border-[2px] border-[#A100FF] text-[0.65rem] sm:text-sm font-medium px-1 sm:px-2 py-1 sm:py-1 rounded-full hover:bg-purple-50 transition-colors duration-200">
  Start Searching
</button>
<button className="text-white h-9 w-27 sm:w-36 bg-[#A100FF] border-[2px] border-[#A100FF] text-[0.65rem] sm:text-sm font-medium px-2 sm:px-2 py-2 sm:py-1 rounded-full hover:bg-purple-700 transition-colors duration-200">
  View Applications
</button>
            </div>
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

      {/* VIew Applicans */}
      {isViewApplicantsModalOpen && (
        <ViewApplicantsModal
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
            className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-3xl m-4 relative max-h-[90vh] overflow-y-auto"
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