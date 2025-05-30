// Description: This component displays a job post with its details and allows the user to view more information in a modal.
import React, { useState } from "react";
import {
  FaMoneyBills,
  FaUsersViewfinder,
  FaLocationArrow,
} from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";

const PostNew = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log("post is: ", post);
  const statusColor = {
    Pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
    Accepted: "bg-green-50 text-green-600 border-green-200",
    Rejected: "bg-red-50 text-red-600 border-red-200",
  };
  const jobType = post.paymentMode;
  const location = post.workType;
  const time = post.paymentMode;
  const {
    // aboutUs: description,
    categoryName: role,
    companyName,
    createdAt,
    facebook: facebookLink,
    instagram: instagramLink,
    linkedin: linkedinLink,
    portfolio_link,
    profile_pic,
    projects,
    resume_link,
    skills,
    status,
    updatedAt,
    userId: userDetails,
    whatsapp,
    workLocation,
    workType,
    _id,
    comment,
  } = post;

  const {
    email,
    firstName,
    lastName,
    middleName,
    phoneNumber: phone,
    role: TalentRole,
  } = userDetails;
  const description = ""
  const sortedSkills = [...skills].sort((a, b) => a.length - b.length);
  const isLongDescription = description.length > 65;
  let visibleSkills = [];
  let totalLength = 0;

  for (let i = 0; i < sortedSkills.length; i++) {
    if (totalLength + sortedSkills[i].length <= 8) {
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
      <div className="flex flex-col h-[340px] w-[300px] bg-white rounded-lg p-4 border border-gray-300 gap-0.5 hover:cursor-pointer">
        {/* Status */}
        <div className="flex w-full justify-end hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <p
            className={`rounded-full px-3 py-1 text-xs border ${
              statusColor[status] || "bg-gray-100 text-gray-600 border-gray-300"
            }`}
          >
            {status}
          </p>
        </div>
        {/* Profile section */}
        {/* <div className="flex gap-3 items-center">
          <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1547701787-1ad8f348080a?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <p className="text-md">Harsh Goyel</p>
            <div className="flex gap-4 text-xs">
              <p className="flex gap-2 items-center opacity-50">
                <FaMoneyBills />
                Stipend
              </p>
              <p className="flex gap-2 opacity-50 ml-2">Remote</p>
            </div>
          </div>
        </div> */}
        {/* Role */}
        <p className="text-md hover:cursor-pointer w-full" onClick={() => setIsModalOpen(true)}> <span className="text-violet-800 font-semibold">{role}</span> </p>
        <hr className="my-2.5 text-gray-300 hover:cursor-pointer w-full" onClick={() => setIsModalOpen(true)} />

        {/* Info Row */}
        <div className="flex flex-col hover:cursor-pointer w-full" onClick={() => setIsModalOpen(true)}>
          <div className="flex gap-4 text-sm text-violet-800">
            <p className="flex gap-2 items-center">
              <FaMoneyBills />
              {jobType}
            </p>
            <p className="flex gap-1 ml-2 items-center">
              <FaLocationArrow />
              {location}
            </p>
            <p className="flex gap-1 ml-2 items-center">
              <IoMdTime />
              {time}
            </p>
          </div>
        </div>
        <hr className="my-2.5 text-gray-300 hover:cursor-pointer w-full" onClick={() => setIsModalOpen(true)} />

        {/* Skills */}
        <div className="flex flex-wrap gap-2 hover:cursor-pointer w-full" onClick={() => setIsModalOpen(true)}>
          {visibleSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className="text-xs text-gray-500 self-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              and {remainingCount} more...
            </span>
          )}
        </div>
        <hr className="my-2.5 text-gray-300 hover:cursor-pointer w-full" onClick={() => setIsModalOpen(true)} />

        {/* About Role */}
        <div className="flex flex-col h-[20%] text-xs font-regular gap-1 text-gray-600 py-1.5 hover:cursor-pointer w-full" onClick={() => setIsModalOpen(true)}>
          <p className="text-sm font-semibold text-gray-900">About the role</p>
          <p className="text-xs text-gray-700">
            {isLongDescription ? `${description.slice(0, 65)}...` : description}
            {isLongDescription && (
              <span
                className="text-violet-600 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                {" "}
                Read more...
              </span>
            )}
          </p>
        </div>
        <hr className="my-2.5 text-gray-300 hover:cursor-pointer w-full" onClick={() => setIsModalOpen(true)} />

        {/* Buttons */}
        <div className="flex justify-between gap-2 mt-2">
          <button className="bg-purple-600 text-white text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center">
            Start Searching
          </button>
          <button className="bg-purple-600 text-white text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center">
            View Applications
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-violet-300/20 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[600px] max-h-[90%] overflow-y-auto border border-violet-300 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-violet-800">{role}</h2>
              <button
                className="text-red-500 text-xs px-3 py-1.5 rounded-full bg-red-100 border border-red-300"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
            <hr className="my-2.5 text-gray-300" />
            {/* Personal Info */}
            <div className="flex gap-3 items-center mb-4">
              <div className="h-40 w-40 rounded-2xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/e7/8c/35/e78c359eefec9d1d7b338b4c294b789e.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 items-start mb-4">
                <p>
                  <strong>Founder:</strong> {firstName} {lastName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Phone:</strong> {phone}
                </p>
                <p>
                  <strong>WhatsApp:</strong> {whatsapp}
                </p>
              </div>
            </div>
            <hr className="my-2.5 text-gray-300" />
            <div className="text-sm text-gray-700 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Company:</strong> {companyName}
                </p>
                <p>
                  <strong>Job Type:</strong> {workType}
                </p>
                <p>
                  <strong>Location:</strong> {workLocation}
                </p>
                <p>
                  <strong>Status:</strong> {status}
                </p>
              </div>
              <hr className="my-2.5 text-gray-300" />
              <p className="mt-3">
                <strong>All Skills:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {sortedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <hr className="my-2.5 text-gray-300" />
              <p className="mt-4">
                <strong>About the Role:</strong>
              </p>
              <p>{description}</p>
              <hr className="my-2.5 text-gray-300" />
              <div className="mt-4">
                <p className="mt-2">
                  <strong>Social Links:</strong>
                </p>
                <div className="flex gap-4 text-blue-600 underline">
                  {facebookLink && (
                    <a href={facebookLink} target="_blank">
                      Facebook
                    </a>
                  )}
                  {instagramLink && (
                    <a href={instagramLink} target="_blank">
                      Instagram
                    </a>
                  )}
                  {linkedinLink && (
                    <a href={linkedinLink} target="_blank">
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
            {status == "Rejected" && (<hr className="my-2.5 text-gray-300" />)}
            {status === "Rejected" && (
              <div className="flex flex-col">
                <p className="text-md font-semibold text-red-500">Reason for the Rejection:</p>
                <p>{comment}</p>
              </div>
            )}
            <hr className="my-2.5 text-gray-300" />
            <div className="flex justify-center gap-2">
              <button className="bg-purple-600 text-white text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center">
                Start Searching
              </button>
              <button className="bg-purple-600 text-white text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center">
                View Applications
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostNew;
