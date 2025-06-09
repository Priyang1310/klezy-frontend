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
import UpdateFounderPostForm from "../FounderPostForm/UpdateFoundersForm";
import ViewFounderPostModal from "./ViewFounderPostModal"; // Import the new component

const NewCard = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const statusColor = {
    Pending: "bg-[#FFE167] border-yellow-200",
    Accepted: "bg-[#82FF5F] border-green-200",
    Rejected: "bg-[#FF7567] border-red-200",
  };

  // Map fields from the schema
  const jobType = post.workBasis?.join(", ");
  const time = post.timeCommitment;
  const location = post.workMode?.join(", ");

  // Destructure fields from the schema
  const {
    headline,
    domainName,
    roleUnderDomain,
    skills = [],
    startUpName,
    aboutEntity,
    email: contact_email,
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
    status,
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
  } = post;

  // Format name and location
  const name = startUpName || "Anonymous";
  const locationString = [workCity, workState, workCountry]
    .filter(Boolean)
    .join(", ");

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
  const isLongDescription = aboutEntity?.length > 65;

  let visibleSkills = [];
  let totalLength = 0;

  for (let i = 0; i < sortedSkills.length; i++) {
    if (totalLength + sortedSkills[i].length <= 45) {
      visibleSkills.push(sortedSkills[i]);
      totalLength += sortedSkills[i].length;
    } else {
      break;
    }
  }

  const remainingCount = sortedSkills.length - visibleSkills.length;

  return (
    <>
      {/* Card Component */}
      <div className="text-gray-800 flex shadow-[1px_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_13px_rgba(0,0,0,0.2)] transition-all duration-300 flex-col h-fit w-[650px] bg-white rounded-3xl p-5 gap-0.5 hover:cursor-pointer">
        {/* Role, Domain and Status */}
        <div
          className="flex w-full items-start justify-between hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex w-full flex-col">
            <div className="flex items-center w-full">
              <p
                className="text-md hover:cursor-pointer font-semibold"
                onClick={() => setIsModalOpen(true)}
              >
                {roleUnderDomain || "Role not specified"}
              </p>
            </div>
            <div className="flex items-center w-full">
              <p
                className="text-sm hover:cursor-pointer font-medium"
                onClick={() => setIsModalOpen(true)}
              >
                {domainName || "Domain not specified"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="text-[#A100FF] text-xl border-[2px] p-1 font-medium rounded-full flex items-center justify-center hover:bg-purple-50 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineRemoveRedEye />
            </button>
            <div
              className={`w-3.5 h-3.5 rounded-full ${statusColor[status]}`}
            ></div>
          </div>
        </div>
        <hr
          className="mt-2 text-gray-200 hover:cursor-pointer w-full"
          onClick={() => setIsModalOpen(true)}
        />

        {/* Headline */}
        <div
          className="h-fit mt-1 mb-1 hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <h2
            className="text-md font-medium hover:cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {headline || "Job Title"}
          </h2>
        </div>

        {/* Experience, Work Mode and Work Basis */}
        <div className="my-1 flex items-center gap-2 text-sm text-gray-600">
          <div className="flex flex-col items-center border-r border-gray-300 pr-4">
            <div className="flex items-center gap-1 font-medium">
              <PiBagBold className="text-violet-500" />
              Experience: {experienceRange || "Not specified"}
            </div>
          </div>
          <div className="flex flex-col items-center border-r border-gray-300 pr-4">
            <div className="flex items-center gap-1 font-medium">
              <IoLocationOutline className="text-violet-500" />
              {location || "Location not specified"}
              {locationString && `: ${locationString}`}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 font-medium">
              <FaMoneyBills className="text-violet-500" />
              {workBasis?.join(", ") || "Not specified"}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div
          className="mt-1 flex flex-wrap items-center gap-1.5 hover:cursor-pointer w-full text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          {visibleSkills.map((skill, index) => (
            <span
              key={index}
              className="border border-[#ECCCFF] text-gray-700 text-[0.7rem] px-2.5 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className="text-xs text-gray-500 self-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              + {remainingCount}
            </span>
          )}
        </div>
        <hr
          className="mt-4 text-gray-200 hover:cursor-pointer w-full"
          onClick={() => setIsModalOpen(true)}
        />

        {/* Social media links */}
        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center gap-1.5 w-fit">
            {facebook && (
              <img
                src="./facebook.svg"
                alt="Facebook"
                className="h-4 w-4 object-cover"
              />
            )}
            {instagram && (
              <img
                src="./instagram.svg"
                alt="Instagram"
                className="h-4 w-4 object-cover"
              />
            )}
            {linkedin && (
              <img
                src="./linkedIn.svg"
                alt="LinkedIn"
                className="h-4 w-4 object-cover"
              />
            )}
            {whatsapp && (
              <img
                src="./whatsapp.svg"
                alt="WhatsApp"
                className="h-5 w-5 object-cover"
              />
            )}
            {email && (
              <img
                src="./email.svg"
                alt="Email"
                className="h-5 w-5 object-cover"
              />
            )}
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-1 w-full">
            <button
              className="bg-purple-600 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
              onClick={() => setIsUpdateModalOpen(true)}
            >
              Update
            </button>
            <button className="text-[#A100FF] border-[2px] border-[#A100FF] w-[25%] text-xs font-medium px-2 py-2 rounded-full flex items-center justify-center hover:bg-purple-50 transition-colors">
              Start Searching
            </button>
            <button className="text-white bg-[#A100FF] border-[2px] border-[#A100FF] w-[25%] text-xs font-medium px-2 py-2 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
              View Applications
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
     {isModalOpen && (
  <div
    className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) setIsModalOpen(false);
    }}
  >
    <div className="bg-white rounded-3xl p-8 w-full max-w-[800px] max-h-[95vh] overflow-y-auto border border-violet-200 shadow-2xl">
      <ViewFounderPostModal
        post={post}
        onClose={() => setIsModalOpen(false)}
        onUpdate={() => {
          setIsModalOpen(false);
          setIsUpdateModalOpen(true);
        }}
      />
    </div>
  </div>
)}

      {/* Update Modal */}
      {isUpdateModalOpen && (
  <div
    className="fixed inset-0 bg-violet-300/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) setIsUpdateModalOpen(false);
    }}
  >
    <div className="bg-white rounded-3xl p-8 w-full max-w-[800px] max-h-[95vh] overflow-y-auto border border-violet-200 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-violet-900 tracking-tight">
          Update Post
        </h2>
        <button
          className="text-gray-600 text-sm font-medium px-4 py-2 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
          onClick={() => setIsUpdateModalOpen(false)}
        >
          Close
        </button>
      </div>
      <UpdateFounderPostForm
        listingId={post._id}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </div>
  </div>
)}
    </>
  );
};

export default NewCard; 