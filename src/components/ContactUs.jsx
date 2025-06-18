import { useState } from "react";

const ContactUs = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        type: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8001/api/support/submit",
                {
                    method: "POST",
                    body: JSON.stringify(form),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = await response.json();
            if (result.success) {
                alert("✅ Submitted successfully!");
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    type: "",
                    message: "",
                });
            } else {
                alert("❌ Submission failed.");
            }
        } catch (error) {
            alert("⚠️ Error submitting form.");
        }
    };

    const dropdownOptions = [
        "General Inquiry",
        "Give Feedback",
        "Report a Bug",
        "Request Feature",
        "File a Complaint",
        "Report a User or Post",
        "Account/Login Issue",
        "Billing/Payment Issue",
        "Delete My Account or Data",
        "Update Profile Details",
        "Issue with Mutual Connect",
        "Verification Help",
        "Partnership or Collaboration Inquiry",
        "Press/Media Inquiry",
        "Other (please specify)",
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#A100FF] mb-6 text-center">
                    Contact Us
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A100FF]"
                            placeholder="Your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A100FF]"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A100FF]"
                            placeholder="+91 12345 67890"
                        />
                    </div>

                    {/* Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reason
                        </label>
                        <select
                            name="type"
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#A100FF]"
                        >
                            <option value="">Select one</option>
                            {dropdownOptions.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            name="message"
                            required
                            rows="5"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#A100FF]"
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-[#A100FF] text-white font-medium py-2 rounded-md shadow-md hover:bg-[#8a00d4] transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-gray-600 mt-2">
                    For more enquiries, please feel free to reach us at{" "}
                    <a
                        className="text-[#A100FF] font-medium"
                        href="mailto:harsh@klezy.com"
                    >
                        support@klezy.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ContactUs;
