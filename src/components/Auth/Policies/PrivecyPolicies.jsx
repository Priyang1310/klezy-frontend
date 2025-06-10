import React from 'react';
import { IoMdClose } from "react-icons/io";


const PrivecyPolicies = ({ onClose }) => {
    return (
        <div className="max-w-4xl mx-auto text-gray-800">
            <div className='flex items-center justify-between pb-2 mb-2 border-b border-gray-300'>
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#5E0194]">
                    Klezy Privacy Policy
                </h3>
                <button
                    onClick={onClose}
                    className="bg-[#5E0194] text-white px-1 py-1 xs:px-1 xs:py-1 sm:px-2 sm:py-2 rounded-full shadow-md hover:bg-violet-800 transition-all duration-300 text-xs xs:text-sm sm:text-base"
                >
                    <IoMdClose />
                </button>
            </div>
            <div className='w-full h-[60vh] overflow-y-auto'>
                <p className="text-sm xs:text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                    <strong>Effective Date:</strong> 09-06-2025
                </p>
                <p className="text-sm xs:text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                    Klezy is committed to protecting your privacy and ensuring transparency in how we handle your information. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our platform.
                </p>

                <section className="mb-4 sm:mb-6">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        1. Information We Collect
                    </h4>
                    <p className="text-sm xs:text-base sm:text-lg text-gray-600 mb-2">
                        We may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-5 text-sm xs:text-base sm:text-lg text-gray-600">
                        <li className="mb-1"><strong>Personal Information:</strong> Name, email, phone number, gender, and professional details you voluntarily submit.</li>
                        <li className="mb-1"><strong>Profile & Posts Information:</strong> Details you include in your profile or posted posts (e.g., skills, requirements, work preferences).</li>
                        <li className="mb-1"><strong>Technical Information:</strong> IP address, device details, and usage patterns.</li>
                    </ul>
                </section>

                <section className="mb-4 sm:mb-6">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        2. How We Use Your Information
                    </h4>
                    <ul className="list-disc pl-5 text-sm xs:text-base sm:text-lg text-gray-600">
                        <li className="mb-1">To allow you to create, publish, and manage profile or posts.</li>
                        <li className="mb-1">To facilitate mutual connections.</li>
                        <li className="mb-1">To enhance your user experience through AI suggestions and filters.</li>
                        <li className="mb-1">To send important platform updates or promotional messages.</li>
                    </ul>
                </section>

                <section className="mb-4 sm:mb-6">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        3. Data Sharing & Security
                    </h4>
                    <ul className="list-disc pl-5 text-sm xs:text-base sm:text-lg text-gray-600">
                        <li className="mb-1">We do not sell your personal data to third parties.</li>
                        <li className="mb-1">Your data may be shared only with trusted service providers who help operate our platform.</li>
                        <li className="mb-1">We implement standard security practices to protect your data.</li>
                    </ul>
                </section>

                <section className="mb-4 sm:mb-6">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        4. Profile Authenticity Disclaimer
                    </h4>
                    <p className="text-sm xs:text-base sm:text-lg text-gray-600">
                        We work hard to ensure all profiles and connections on Klezy are genuine. This includes the use of verification tools (e.g., OTP, activity checks) and manual reviews. However, we do not provide a 100% guarantee of authenticity, and users are advised to use discretion before engaging.
                    </p>
                </section>

                <section className="mb-4 sm:mb-6">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        5. Your Rights
                    </h4>
                    <ul className="list-disc pl-5 text-sm xs:text-base sm:text-lg text-gray-600">
                        <li className="mb-1">You can update or delete your profile at any time provided your post has not been purchased or mutually connected.</li>
                        <li className="mb-1">If your post is not accepted by any other party, or no mutual connect is established, you may delete your post.</li>
                        <li className="mb-1">Once a post has been purchased by another user or a mutual connect has occurred, you will no longer be able to edit or delete that post.</li>
                        <li className="mb-1">You may request full deletion of your account and personal data by contacting our support, unless blocked due to misconduct or ongoing disputes.</li>
                    </ul>
                </section>

                <section className="mb-4 sm:mb-6">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        6. Enforcement and Policy Violations
                    </h4>
                    <p className="text-sm xs:text-base sm:text-lg text-gray-600">
                        If we detect or receive reports of misuse, fraud, harassment, impersonation, or any activity that violates our terms, we reserve the right to suspend or permanently delete user accounts without notice or approval.
                    </p>
                </section>

                <section className="mb-4 sm:mb-6">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        7. Children’s Privacy
                    </h4>
                    <p className="text-sm xs:text-base sm:text-lg text-gray-600">
                        Our platform is not intended for individuals under the age of 14.
                    </p>
                </section>

                <section className="mb-4 sm:mb-6">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        8. Changes to This Policy
                    </h4>
                    <p className="text-sm xs:text-base sm:text-lg text-gray-600">
                        We reserve the right to modify or update this Privacy Policy at any time. Significant changes will be communicated via email or in-app notification.
                    </p>
                </section>

                <section className="mb-6 sm:mb-8">
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#5E0194] mb-2 sm:mb-3">
                        9. Contact
                    </h4>
                    <p className="text-sm xs:text-base sm:text-lg text-gray-600">
                        If you have any questions, reach out to: <a href="mailto:support@klezy.com" className="text-[#A100FF] underline">support@klezy.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivecyPolicies;