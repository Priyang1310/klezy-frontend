import React, { useState } from "react";
import {
  FaMoneyBills,
  FaUsersViewfinder,
  FaLocationArrow,
  FaTrash
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
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
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
  internshipStipendRange = {},
  internshipPerformanceCriteria,
  collaborationDescription = "",
  jobAmountRange = {},
  freelancePaymentRange = {},
  projectDescription = "",
  percentageBasisValue = "",
  equityBasisValue = "",
  otherWorkBasis = "",
  partnershipCriteria = "",
  _id: listingIdFromPost,
} = post || {};
  console.log("workBasis: ", workBasis);


const defaultFreelancePaymentRange = "";
const defaultJobAmountRange = "";
const defaultInternshipStipendRange = "";
const defaultPartnershipCriteria = "";
const defaultPercentageBasisValue = "";
const defaultProjectDescription = "";
const defaultEquityBasisValue = "";
const defaultCollaborationDescription = "";
const defaultOtherWorkBasis = "";

// Format work basis
const workBasisOrder = [
  "Partnership",
  "Collaboration",
  "Equity Basis",
  "Project Basis",
  "Percentage Basis",
  "Freelance",
  "Job",
  "Internship",
  "Other"
];

// Normalize function to handle case and spacing variations
const normalizeString = (str) => str.toLowerCase().replace(/ /g, "");

// Function to get the properly spaced form from workBasisOrder
const getSpacedForm = (normalizedStr) => {
  const matchedItem = workBasisOrder.find((item) => normalizeString(item) === normalizedStr);
  return matchedItem || normalizedStr; // Return the matched item or original if no match
};

// Format work basis
let jobType = "Not specified";
let remainingWorkBasisCount = 0;
if (Array.isArray(workBasis) && workBasis.length > 0) {
  const sortedWorkBasis = [...workBasis].sort((a, b) => {
    const normalizedA = normalizeString(a);
    const normalizedB = normalizeString(b);
    const indexA = workBasisOrder.findIndex((item) => normalizeString(item) === normalizedA);
    const indexB = workBasisOrder.findIndex((item) => normalizeString(item) === normalizedB);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return normalizedA.localeCompare(normalizedB);
  });
  let visibleWorkBasis = [];
  let totalLength = 0;
  for (let basis of sortedWorkBasis) {
    const normalizedBasis = normalizeString(basis);
    if (totalLength + basis.length <= 80) {
      visibleWorkBasis.push(getSpacedForm(normalizedBasis));
      totalLength += basis.length + 2; // Account for ", "
    } else {
      break;
    }
  }
  jobType = visibleWorkBasis.join(", ") || "Not specified";
  remainingWorkBasisCount = sortedWorkBasis.length - visibleWorkBasis.length;
}
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
const confirmDelete = async () => {
    try {
        const response = await fetch(
            `http://localhost:3333/api/founder/delete-post/${post._id}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }
        );
        if (!response.ok) throw new Error("Failed to delete post");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error Deleting post:", error);
    }
};

const handleDelete = () => {
    setIsDeletePopupOpen(true);
};

// Function to convert number to readable format (e.g., lakhs or crores)
const formatCurrency = (value) => {
  if (!value) return "";
  const num = parseInt(value, 10);
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`; // Crores
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`; // Lakhs
  return num.toString(); // Default to original number
};

// Function to extract and format range from string (e.g., "233-444 rupees" -> "233-444")
const extractRange = (rangeStr) => {
  if (!rangeStr) return "";
  const match = rangeStr.match(/(\d+)-(\d+)/);
  if (match) {
    const min = formatCurrency(match[1]);
    const max = formatCurrency(match[2]);
    return `${min}-${max}`;
  }
  return "";
};

// Format payment and description fields with titles
const paymentAndDescFields = [
  freelancePaymentRange ? `Freelance Rate: ${extractRange(freelancePaymentRange)} ₹` : "",
  jobAmountRange ? `Job Payment: ${extractRange(jobAmountRange)} ₹` : "",
  internshipStipendRange ? `Internship Stipend Range: ${extractRange(internshipStipendRange)} ₹` : "",
  partnershipCriteria ? `Partnership Criteria: ${partnershipCriteria}` : "",
  percentageBasisValue ? `Percentage Basis: ${percentageBasisValue}%` : "",
  projectDescription ? `Project Description: ${projectDescription}` : "",
  equityBasisValue ? `Equity Basis: ${equityBasisValue}%` : "",
  collaborationDescription ? `Collaboration Description: ${collaborationDescription}` : "",
  otherWorkBasis ? `Other Work Basis: ${otherWorkBasis}` : "",
].filter(Boolean); // Remove any undefined or empty values

let visiblePaymentFields = [];
let totalPaymentLength = 0;
let remainingPaymentCount = 0;
const paymentOrder = [
  "Freelance Rate",           // freelancePaymentRange
  "Job Payment",              // jobAmountRange
  "Internship Stipend Range", // internshipStipendRange
  "Partnership Criteria",     // partnershipCriteria
  "Percentage Basis",         // percentageBasisValue
  "Project Description",      // projectDescription
  "Equity Basis",             // equityBasisValue
  "Collaboration Description",// collaborationDescription
  "Other Work Basis"          // otherWorkBasis
];

if (paymentAndDescFields.length > 0) {
  const sortedPaymentFields = [...paymentAndDescFields].sort((a, b) => {
    const indexA = paymentOrder.findIndex((item) => a.startsWith(item));
    const indexB = paymentOrder.findIndex((item) => b.startsWith(item));
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
  for (let field of sortedPaymentFields) {
    if (totalPaymentLength + field.length <= 60) { // Adjust limit as needed
      visiblePaymentFields.push(field);
      totalPaymentLength += field.length + 2; // Account for ", "
    } else {
      break;
    }
  }
  remainingPaymentCount = sortedPaymentFields.length - visiblePaymentFields.length;
}
const paymentDisplay = visiblePaymentFields.join(", ") || "";
console.log("paymentDisplay: ", paymentDisplay);
  return (
    <>
      <div className="relative  text-gray-800 flex shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 flex-col h-fit w-full max-w-[700px] bg-white rounded-3xl p-3 sm:p-5 gap-0.5 hover:cursor-pointer">
        
        {/* Role, Domain, Status */}
        <div className="flex w-full items-start justify-between" onClick={() => setIsModalOpen(true)}>
          <div className="flex items-start gap-2 sm:gap-5">
            <div className="flex flex-col  border-gray-300 pr-2 sm:pr-4">
              <p className="text-sm sm:text-md font-semibold">{roleUnderDomain}</p>
              <p className="text-xs sm:text-sm font-medium">{domainName}</p>
            </div>
          </div>
          <div className={`w-3.5 h-3.5 absolute right-3 rounded-full ${statusColor[status] || "bg-gray-200"}`}></div>
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
    {remainingWorkBasisCount > 0 && (
      <span className="text-xs text-gray-500 self-center bg-gray-200 rounded-full px-1.5 py-0.5 ml-1">
        +{remainingWorkBasisCount}
      </span>
    )}
  </div>
</div>
        </div>

        {/* Time Commitment and Payment Range */}
        {(timeCommitment || paymentDisplay) && (
  <div className="my-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
    {timeCommitment && (
      <div className="flex items-center gap-1 font-medium">
        <IoMdTime className="text-violet-500" />
        <span>Time: {timeCommitment}</span>
      </div>
    )}
    {paymentDisplay && (
      <div className="flex items-center gap-1 font-medium">
        <FaMoneyBills className="text-violet-500" />
        <span>{paymentDisplay}</span>
        {remainingPaymentCount > 0 && (
          <span className="text-xs text-gray-500 self-center bg-gray-200 rounded-full px-1.5 py-0.5 ml-1">
            +{remainingPaymentCount}
          </span>
        )}
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
   <button
  className="text-red-500 w-10 h-10   rounded-full hover:bg-red-50 transition-colors duration-200 flex items-center justify-center"
  onClick={handleDelete}
  title="Delete"
>
  <FaTrash className="text-xl" />
</button>
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
    <div className="flex gap-1 sm:gap-3 sm:w-auto">
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
  <div
    className="fixed inset-0 bg-black/50  bg-opacity-50  flex items-center justify-center z-50 overflow-y-auto"
    onClick={() => handleViewModalClose()}
  >
 
      {/* Close Button */}
      {/* <button
        onClick={() => handleViewModalClose()}
        className=" text-gray-500 hover:text-gray-700"
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
      </button> */}

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
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={() => setIsUpdateModalOpen(false)}
  >
    <div
      className="bg-white rounded-2xl w-full max-w-3xl m-4 max-h-[90vh] flex flex-col relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Fixed Header */}
      <div className="sticky top-0 bg-white rounded-3xl z-10 p-4 sm:p-6 border-b border-gray-200">
        <button
          onClick={() => setIsUpdateModalOpen(false)}
          className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-500 hover:text-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
          aria-label="Close modal"
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
        <h2 className="text-xl sm:text-2xl font-semibold text-[#a100ff] text-center">
          Update your post
        </h2>
      </div>

      {/* Form Content (Delegate Scrolling to Form) */}
      <UpdateFounderPostForm
        listingId={listingId}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </div>
  </div>
)}
{isDeletePopupOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div
            className="bg-white rounded-lg p-5 w-full max-w-sm flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="text-lg font-semibold text-gray-800">
                Are you sure?
            </h3>
            <p className="text-sm text-gray-600">
                This action cannot be recovered. Do you want to delete this post?
            </p>
            <div className="flex justify-end gap-3">
                <button
                    className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsDeletePopupOpen(false)}
                >
                    Cancel
                </button>
                <button
                    className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => {
                        confirmDelete();
                        setIsDeletePopupOpen(false);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
)}
    </>
  );
};

export default NewCard;