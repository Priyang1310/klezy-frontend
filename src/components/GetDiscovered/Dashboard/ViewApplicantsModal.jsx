import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function ViewApplicantsModal({ post, onClose, errors = {} }) {
  // Helper to get display value for domain
  const modalContentRef = useRef(null);

//   console.log(post.skills);

  const handleOverlayClick = (e) => {
    // Check if the click is outside the modal content
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      onClose(); // Trigger the onClose function
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-75 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalContentRef} // Attach ref
        className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-4xl m-4 relative h-full max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-[#7900BF] mb-6 text-center"> View Applicants </h2>
        <img src="./ComingSoon.svg" className="" alt="" />

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewApplicantsModal;