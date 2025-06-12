import React, { useState } from "react";
import {
  FaMoneyBills,
  FaUsersViewfinder,
  FaLocationArrow,
} from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { PiBagBold } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import UpdateFounderPostForm from "../FounderPostForm/UpdateFoundersForm";
import ViewFounderPostModal from "./ViewFounderPostModal";

const NewCard = ({ post }) => {
  console.log("post is: ", post);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [listingId, setListingId] = useState(null);

  const statusColor = {
    Pending: "bg-[#FFE167] border-yellow-200",
    Accepted: "bg-[#82FF5F] border-green-200",
    Rejected: "bg-[#FF7567] border-red-200",
  };

  // Destructure fields from the schema
  const {
    headline = "Job Title",
    domainName = "Domain not specified",
    roleUnderDomain = "Role not specified",
    skills = [],
    startUpName = "Anonymous",
    aboutEntity = "",
    email: contact_email,
    workMode = [],
    workCity = "",
    workState = "",
    workCountry = "",
    workBasis = [],
    timeCommitment = "",
    userType,
    requirementType,
    otherUserType,
    otherRequirementType,
    experienceRange = "Not specified",
    responsibilities,
    status = "Pending",
    userId: userDetails,
    facebook,
    instagram,
    linkedin,
    whatsapp,
    email,
    whyShouldJoin,
    anyOtherInfo,
    profile_pic,
    comment,
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
    _id: listingIdFromPost,
  } = post || {};

  console.log("workBasis: ", workBasis);

  // Format work basis
  const jobType = Array.isArray(workBasis) 
    ? workBasis.join(", ") || "Not specified"
    : "Not specified";
  
  console.log("jobtype: ", jobType);

  // Format work mode and location
  const workModeString = Array.isArray(workMode) 
    ? workMode.join(", ") || ""
    : "";
    
  console.log("workModeString: ", workModeString);
  console.log("workMode: ", workMode);

  const locationString = [workCity, workState, workCountry].filter(Boolean).join(", ");
  const location = workModeString 
    ? `${workModeString}${locationString ? `: ${locationString}` : ""}` 
    : "Location not specified";

  // Format payment range for different work types
  const getPaymentRange = () => {
    if (jobAmountRange?.min && jobAmountRange?.max) {
      return `$${jobAmountRange.min} - $${jobAmountRange.max}`;
    }
    if (freelancePaymentRange?.min && freelancePaymentRange?.max) {
      return `$${freelancePaymentRange.min} - $${freelancePaymentRange.max}/hr`;
    }
    if (internshipStipendRange?.min && internshipStipendRange?.max) {
      return `$${internshipStipendRange.min} - $${internshipStipendRange.max}`;
    }
    return "";
  };
  const paymentRange = getPaymentRange();

  // Simulated user details
  const {
    email: userEmail,
    firstName,
    lastName,
    middleName,
    phoneNumber: phone,
    role: TalentRole,
  } = userDetails || {};

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
    if (options.openUpdate && options.listingId) {
      setListingId(options.listingId);
      setIsUpdateModalOpen(true);
    }
  };

  return (
    <>
      <div className="text-gray-800 flex shadow-[1px_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_13px_rgba(0,0,0,0.2)] transition-all duration-300 flex-col h-fit w-full max-w-[650px] bg-white rounded-3xl p-3 sm:p-5 gap-0.5 hover:cursor-pointer">
        
        {/* Role, Domain, Status */}
        <div className="flex w-full items-start justify-between" onClick={() => setIsModalOpen(true)}>
          <div className="flex items-start gap-2 sm:gap-5">
            <div className="flex flex-col border-r border-gray-300 pr-2 sm:pr-4">
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
          
          {/* Work Basis */}
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
                <span>Range: {paymentRange}</span>
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

        {/* Social Media and Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-2 gap-3 sm:gap-4">
  {/* Social Media Icons */}
  <div className="flex items-center gap-1.5 w-fit">
    {facebook && (
      <img src="./facebook.svg" alt="Facebook" className="h-4 w-4 object-cover" />
    )}
    {instagram && (
      <img src="./instagram.svg" alt="Instagram" className="h-4 w-4 object-cover" />
    )}
    {linkedin && (
      <img src="./linkedIn.svg" alt="LinkedIn" className="h-4 w-4 object-cover" />
    )}
    {whatsapp && (
      <img src="./whatsapp.svg" alt="WhatsApp" className="h-5 w-5 object-cover" />
    )}
    {email && (
      <img src="./email.svg" alt="Email" className="h-5 w-5 object-cover" />
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
      <button className="text-[#A100FF] border-[2px] border-[#A100FF] w-full sm:w-auto text-[0.65rem] sm:text-sm font-medium px-2 sm:px-6 py-2 sm:py-2.5 rounded-2xl hover:bg-purple-50 transition-colors duration-200 sm:min-w-[140px] sm:whitespace-nowrap">
        Start Searching
      </button>
      <button className="text-white bg-[#A100FF] border-[2px] border-[#A100FF] w-full sm:w-auto text-[0.65rem] sm:text-sm font-medium px-1 sm:px-6 py-2 sm:py-2.5 rounded-2xl hover:bg-purple-700 transition-colors duration-200 sm:min-w-[140px] sm:whitespace-nowrap">
        View Applications
      </button>
    </div>
  </div>
</div>
      </div>

      {/* View Modal */}
      {isModalOpen && (
  <div
    className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto"
    onClick={() => handleViewModalClose()}
  >
 
      {/* Close Button */}
      <button
        onClick={() => handleViewModalClose()}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          className="w-6 h-6"
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

      <ViewFounderPostModal
        post={post}
        onClose={handleViewModalClose}
        onUpdate={() => {
          setListingId(listingIdFromPost);
          setIsUpdateModalOpen(true);
          setIsModalOpen(false);
        }}
      />
    </div>
  
)}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto"
          onClick={() => setIsUpdateModalOpen(false)}
        >
          <div
            className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-4xl m-4 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
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
            <h2 className="text-xl sm:text-2xl font-semibold text-[#7900BF] mb-6 text-center">
              Update Founder Post
            </h2>

            {/* Render UpdateFounderPostForm */}
            <UpdateFounderPostForm
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