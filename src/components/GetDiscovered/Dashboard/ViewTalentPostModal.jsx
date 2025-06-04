import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State } from "country-state-city";
function ViewGetDiscoveredModal({ post, onClose, errors = {} }) {
	// Helper to get display value for domain
	const modalContentRef = useRef(null);

	console.log(post.skills);

	const getDomainName = (domainId) => {
		// Placeholder: In practice, fetch domain name from domains array or API
		return domainId || "N/A";
	};

	// Helper to get display value for role
	const getRoleName = (roleId) => {
		// Placeholder: In practice, fetch role name from roles array or API
		return roleId || "N/A";
	};

	// Helper to get display value for skills
	const getSkillNames = (skills) => {
		return skills.map((skill) => skill.name || "N/A").join(", ") || "None";
	};

	const handleOverlayClick = (e) => {
		// Check if the click is outside the modal content
		if (
			modalContentRef.current &&
			!modalContentRef.current.contains(e.target)
		) {
			onClose(); // Trigger the onClose function
		}
	};

	return (
		<div
			className="fixed inset-0 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto"
			onClick={handleOverlayClick}
		>
			<div
				ref={modalContentRef} // Attach ref
				className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-4xl m-4 relative max-h-[90vh] overflow-y-auto"
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
				>
					<FaTimes className="w-6 h-6" />
				</button>

				{/* Header */}
				<h2 className="text-2xl font-semibold text-[#7900BF] mb-6 text-center">
					View Profile Details
				</h2>

				{/* Step 1: About You */}
				<div className="mb-8">
					<div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5">
						<div className="flex flex-col">
							<p className="text-violet-700 text-xl">
								Tell Your Story
							</p>
							<p className="text-violet-400">
								Share who you are and how to reach you — keep it
								real, no corporate fluff needed.
							</p>
						</div>
						<img
							src="./FormImage1.svg"
							alt=""
							className="scale-150"
						/>
					</div>
					<h3 className="text-xl font-semibold text-[#7900BF] mb-4">
						Let’s introduce you to the world.
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								First Name{" "}
								<span className="text-red-500">*</span>
							</label>
							<input
								value={post.first_name}
								disabled
								type="text"
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.first_name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.first_name}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Middle Name
							</label>
							<input
								value={post.middle_name}
								disabled
								type="text"
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Last Name{" "}
								<span className="text-red-500">*</span>
							</label>
							<input
								value={post.last_name}
								disabled
								type="text"
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.last_name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.last_name}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Country <span className="text-red-500">*</span>
							</label>
							<input
								value={post.country}
								disabled
								type="text"
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.country && (
								<p className="text-red-500 text-sm mt-1">
									{errors.country}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								State <span className="text-red-500">*</span>
							</label>
							<input
								value={post.state}
								disabled
								type="text"
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.state && (
								<p className="text-red-500 text-sm mt-1">
									{errors.state}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								City <span className="text-red-500">*</span>
							</label>
							<input
								value={post.district}
								disabled
								type="text"
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.district && (
								<p className="text-red-500 text-sm mt-1">
									{errors.district}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Gender <span className="text-red-500">*</span>
							</label>
							<select
								value={post.gender}
								disabled
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							>
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Prefer not to specify">
									Prefer not to specify
								</option>
							</select>
							{errors.gender && (
								<p className="text-red-500 text-sm mt-1">
									{errors.gender}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email <span className="text-red-500">*</span>
							</label>
							<input
								value={post.email}
								disabled
								type="text"
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{errors.email}
								</p>
							)}
						</div>
						<div className="col-span-3">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								You are a{" "}
								<span className="text-red-500">*</span>
							</label>
							<div className="flex flex-wrap gap-4">
								{[
									"Working Professional",
									"Freelancer",
									"Student",
									"Other",
								].map((type) => (
									<label
										key={type}
										className="flex items-center"
									>
										<input
											type="radio"
											value={type}
											checked={post.userType === type}
											disabled
											className="h-4 w-4 text-purple-600"
										/>
										<span className="ml-2 text-gray-700">
											{type}
										</span>
									</label>
								))}
							</div>
							{errors.userType && (
								<p className="text-red-500 text-sm mt-1">
									{errors.userType}
								</p>
							)}
							{post.userType === "Other" && (
								<div className="mt-4">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Specify User Type{" "}
										<span className="text-red-500">*</span>
									</label>
									<input
										value={post.otherUserType}
										disabled
										type="text"
										className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
									/>
									{errors.otherUserType && (
										<p className="text-red-500 text-sm mt-1">
											{errors.otherUserType}
										</p>
									)}
								</div>
							)}
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								About Yourself
							</label>
							<textarea
								value={post.aboutSelf}
								disabled
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
							/>
						</div>
						<div className="col-span-3">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								How people can reach out to you (select at least
								two) <span className="text-red-500">*</span>
							</label>
							<div className="flex flex-wrap gap-4">
								{[
									"call",
									"whatsapp",
									"instagram",
									"linkedin",
									"facebook",
									"other",
								].map((method) => (
									<div
										key={method}
										className="flex items-center"
									>
										<input
											type="checkbox"
											checked={
												post.contact_methods[method]
													.selected
											}
											disabled
											className="h-4 w-4 text-purple-600"
										/>
										<label className="ml-2 text-gray-700">
											{method.charAt(0).toUpperCase() +
												method.slice(1)}
										</label>
									</div>
								))}
							</div>
							{errors.contact_methods && (
								<p className="text-red-500 text-sm mt-1">
									{errors.contact_methods}
								</p>
							)}
							<div className="mt-4 space-y-4 grid grid-cols-3 gap-10">
								{Object.entries(post.contact_methods).map(
									([method, { selected, value }]) =>
										selected && (
											<div key={method}>
												<label className="block font-medium mb-1 text-black opacity-[73%]">
													{method
														.charAt(0)
														.toUpperCase() +
														method.slice(1)}{" "}
													{method === "whatsapp" ||
													method === "call"
														? "Number"
														: "URL"}{" "}
													<span className="text-red-500">
														*
													</span>
												</label>
												{method === "call" ||
												method === "whatsapp" ? (
													<PhoneInput
														country="in"
														value={value}
														disabled
														containerClass="w-full"
														inputClass="w-full h-12 px-4 text-gray-900 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
														buttonClass="border-gray-300 h-14 w-16 bg-gray-100 cursor-not-allowed"
														containerStyle={{
															height: "56px",
															width: "100%",
														}}
														inputStyle={{
															height: "43px",
															width: "100%",
															backgroundColor:
																"#f3f4f6",
														}}
														buttonStyle={{
															position:
																"absolute",
															left: "5px",
															top: "1px",
															height: "40px",
															width: "40px",
															backgroundColor:
																"transparent",
															border: "none",
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
												{errors[`${method}Value`] && (
													<p className="text-red-500 text-sm mt-1">
														{
															errors[
																`${method}Value`
															]
														}
													</p>
												)}
											</div>
										)
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Step 2: Skills and Strength */}
				<div className="mb-8">
					<div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5">
						<div className="flex flex-col">
							<p className="text-violet-700 text-xl">
								Show Your Strengths
							</p>
							<p className="text-violet-400">
								Highlight your skills and what you’re open to —
								make it clear what you bring to the table.
							</p>
						</div>
						<img src="./FormImage2.svg" alt="" />
					</div>
					<h3 className="text-xl font-semibold text-[#7900BF] mb-4">
						Showcase your skills and what you’re open to.
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Headline (e.g., I am a...){" "}
								<span className="text-red-500">*</span>
							</label>
							<input
								value={post.headline}
								disabled
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.headline && (
								<p className="text-red-500 text-sm mt-1">
									{errors.headline}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Your Role{" "}
								<span className="text-red-500">*</span>
							</label>
							<input
								value={getRoleName(post.roleUnderDomain)}
								disabled
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.roleUnderDomain && (
								<p className="text-red-500 text-sm mt-1">
									{errors.roleUnderDomain}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Your Domain{" "}
								<span className="text-red-500">*</span>
							</label>
							<input
								value={getDomainName(post.domainName)}
								disabled
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.domainName && (
								<p className="text-red-500 text-sm mt-1">
									{errors.domainName}
								</p>
							)}
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Skills <span className="text-red-500">*</span>
							</label>
							<div className="mt-2 flex flex-wrap gap-2">
								{post.skills.length > 0 ? (
									post.skills.map((skill, index) => (
										<span
											key={index}
											className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
										>
											{skill}
										</span>
									))
								) : (
									<span className="text-gray-500">None</span>
								)}
							</div>
							{errors.skills && (
								<p className="text-red-500 text-sm mt-1">
									{errors.skills}
								</p>
							)}
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Work Basis{" "}
								<span className="text-red-500">*</span>
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
									<div
										key={basis}
										className="flex items-center"
									>
										<input
											type="checkbox"
											checked={post.workBasis[basis]}
											disabled
											className="h-4 w-4 text-purple-600"
										/>
										<label className="ml-2 text-gray-700">
											{basis
												.replace(/([A-Z])/g, " $1")
												.trim()}
										</label>
									</div>
								))}
							</div>
							{errors.workBasis && (
								<p className="text-red-500 text-sm mt-1">
									{errors.workBasis}
								</p>
							)}
							<div className="mt-4 space-y-4">
								{post.workBasis.Partnership && (
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Partnership Criteria{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<textarea
											value={post.partnershipCriteria}
											disabled
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
										/>
										{errors.partnershipCriteria && (
											<p className="text-red-500 text-sm mt-1">
												{errors.partnershipCriteria}
											</p>
										)}
									</div>
								)}
								{post.workBasis.Internship && (
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Internship Time Type{" "}
												<span className="text-red-500">
													*
												</span>
											</label>
											<div className="flex gap-4">
												{["FullTime", "PartTime"].map(
													(type) => (
														<label
															key={type}
															className="flex items-center"
														>
															<input
																type="radio"
																value={type}
																checked={
																	post.internshipTimeType ===
																	type
																}
																disabled
																className="h-4 w-4 text-purple-600"
															/>
															<span className="ml-2 text-gray-700">
																{type ===
																"FullTime"
																	? "Full-time"
																	: "Part-time"}
															</span>
														</label>
													)
												)}
											</div>
											{errors.internshipTimeType && (
												<p className="text-red-500 text-sm mt-1">
													{errors.internshipTimeType}
												</p>
											)}
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Internship Type{" "}
												<span className="text-red-500">
													*
												</span>
											</label>
											<div className="flex gap-4">
												{[
													"Paid",
													"Unpaid",
													"PerformanceBased",
												].map((type) => (
													<label
														key={type}
														className="flex items-center"
													>
														<input
															type="radio"
															value={type}
															checked={
																post.internshipType ===
																type
															}
															disabled
															className="h-4 w-4 text-purple-600"
														/>
														<span className="ml-2 text-gray-700">
															{type
																.replace(
																	/([A-Z])/g,
																	" $1"
																)
																.trim()}
														</span>
													</label>
												))}
											</div>
											{errors.internshipType && (
												<p className="text-red-500 text-sm mt-1">
													{errors.internshipType}
												</p>
											)}
										</div>
										<div className="flex gap-4">
											<div className="w-1/2">
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Internship Duration{" "}
													<span className="text-red-500">
														*
													</span>
												</label>
												<div className="flex items-center gap-2">
													<input
														value={
															post
																.internshipDuration
																.value
														}
														disabled
														type="number"
														className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
													/>
													<select
														value={
															post
																.internshipDuration
																.unit
														}
														disabled
														className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
													>
														<option value="">
															Select Unit
														</option>
														<option value="Days">
															Days
														</option>
														<option value="Weeks">
															Weeks
														</option>
														<option value="Months">
															Months
														</option>
													</select>
												</div>
												{errors.internshipDuration && (
													<div className="text-red-500 text-sm mt-1">
														{errors
															.internshipDuration
															.value && (
															<p>
																{
																	errors
																		.internshipDuration
																		.value
																}
															</p>
														)}
														{errors
															.internshipDuration
															.unit && (
															<p>
																{
																	errors
																		.internshipDuration
																		.unit
																}
															</p>
														)}
													</div>
												)}
											</div>
										</div>
										{post.internshipType === "Paid" && (
											<div className="flex gap-4">
												<div className="w-1/2">
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Stipend Range (₹){" "}
														<span className="text-red-500">
															*
														</span>
													</label>
													<div className="flex items-center gap-2">
														<input
															value={
																post
																	.internshipStipendRange
																	.min
															}
															disabled
															type="number"
															className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
														/>
														<input
															value={
																post
																	.internshipStipendRange
																	.max
															}
															disabled
															type="number"
															className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
														/>
													</div>
													{errors.internshipStipendRange && (
														<div className="text-red-500 text-sm mt-1">
															{errors
																.internshipStipendRange
																.min && (
																<p>
																	{
																		errors
																			.internshipStipendRange
																			.min
																	}
																</p>
															)}
															{errors
																.internshipStipendRange
																.max && (
																<p>
																	{
																		errors
																			.internshipStipendRange
																			.max
																	}
																</p>
															)}
														</div>
													)}
												</div>
											</div>
										)}
										{post.internshipType ===
											"PerformanceBased" && (
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Performance Criteria{" "}
													<span className="text-red-500">
														*
													</span>
												</label>
												<textarea
													value={
														post.internshipPerformanceCriteria
													}
													disabled
													className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
												/>
												{errors.internshipPerformanceCriteria && (
													<p className="text-red-500 text-sm mt-1">
														{
															errors.internshipPerformanceCriteria
														}
													</p>
												)}
											</div>
										)}
									</div>
								)}
								{post.workBasis.Collaboration && (
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Collaboration Description{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<textarea
											value={
												post.collaborationDescription
											}
											disabled
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
										/>
										{errors.collaborationDescription && (
											<p className="text-red-500 text-sm mt-1">
												{
													errors.collaborationDescription
												}
											</p>
										)}
									</div>
								)}
								{post.workBasis.Job && (
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Job Time Type{" "}
												<span className="text-red-500">
													*
												</span>
											</label>
											<div className="flex gap-4">
												{["FullTime", "PartTime"].map(
													(type) => (
														<label
															key={type}
															className="flex items-center"
														>
															<input
																type="radio"
																value={type}
																checked={
																	post.jobTimeType ===
																	type
																}
																disabled
																className="h-4 w-4 text-purple-600"
															/>
															<span className="ml-2 text-gray-700">
																{type ===
																"FullTime"
																	? "Full-time"
																	: "Part-time"}
															</span>
														</label>
													)
												)}
											</div>
											{errors.jobTimeType && (
												<p className="text-red-500 text-sm mt-1">
													{errors.jobTimeType}
												</p>
											)}
										</div>
										<div className="flex gap-4">
											<div className="w-1/2">
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Job Amount Range (₹){" "}
													<span className="text-red-500">
														*
													</span>
												</label>
												<div className="flex items-center gap-2">
													<input
														value={
															post.jobAmountRange
																.min
														}
														disabled
														type="number"
														className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
													/>
													<input
														value={
															post.jobAmountRange
																.max
														}
														disabled
														type="number"
														className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
													/>
												</div>
												{errors.jobAmountRange && (
													<div className="text-red-500 text-sm mt-1">
														{errors.jobAmountRange
															.min && (
															<p>
																{
																	errors
																		.jobAmountRange
																		.min
																}
															</p>
														)}
														{errors.jobAmountRange
															.max && (
															<p>
																{
																	errors
																		.jobAmountRange
																		.max
																}
															</p>
														)}
													</div>
												)}
											</div>
										</div>
									</div>
								)}
								{post.workBasis.Freelance && (
									<div className="flex gap-4">
										<div className="w-1/2">
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Freelance Payment Range (₹){" "}
												<span className="text-red-500">
													*
												</span>
											</label>
											<div className="flex items-center gap-2">
												<input
													value={
														post
															.freelancePaymentRange
															.min
													}
													disabled
													type="number"
													className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
												/>
												<input
													value={
														post
															.freelancePaymentRange
															.max
													}
													disabled
													type="number"
													className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
												/>
											</div>
											{errors.freelancePaymentRange && (
												<div className="text-red-500 text-sm mt-1">
													{errors
														.freelancePaymentRange
														.min && (
														<p>
															{
																errors
																	.freelancePaymentRange
																	.min
															}
														</p>
													)}
													{errors
														.freelancePaymentRange
														.max && (
														<p>
															{
																errors
																	.freelancePaymentRange
																	.max
															}
														</p>
													)}
												</div>
											)}
										</div>
									</div>
								)}
								{post.workBasis.ProjectBasis && (
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Project Description{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<textarea
											value={post.projectDescription}
											disabled
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
										/>
										{errors.projectDescription && (
											<p className="text-red-500 text-sm mt-1">
												{errors.projectDescription}
											</p>
										)}
									</div>
								)}
								{post.workBasis.PercentageBasis && (
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Percentage Basis Value (%){" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<input
											value={post.percentageBasisValue}
											disabled
											type="number"
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
										/>
										{errors.percentageBasisValue && (
											<p className="text-red-500 text-sm mt-1">
												{errors.percentageBasisValue}
											</p>
										)}
									</div>
								)}
								{post.workBasis.EquityBasis && (
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Equity Basis Value (%){" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<input
											value={post.equityBasisValue}
											disabled
											type="number"
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
										/>
										{errors.equityBasisValue && (
											<p className="text-red-500 text-sm mt-1">
												{errors.equityBasisValue}
											</p>
										)}
									</div>
								)}
								{post.workBasis.Other && (
									<div className="relative">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Other Work Basis{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<input
											value={post.otherWorkBasis}
											disabled
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
										/>
										{errors.otherWorkBasis && (
											<p className="text-red-500 text-sm mt-1">
												{errors.otherWorkBasis}
											</p>
										)}
									</div>
								)}
							</div>
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Work Mode{" "}
								<span className="text-red-500">*</span>
							</label>
							<div className="flex flex-wrap gap-4">
								{["Remote", "Hybrid", "Onsite"].map((mode) => (
									<div
										key={mode}
										className="flex items-center"
									>
										<input
											type="checkbox"
											checked={post.workMode[mode]}
											disabled
											className="h-4 w-4 text-purple-600"
										/>
										<label className="ml-2 text-gray-700">
											{mode}
										</label>
									</div>
								))}
							</div>
							{errors.workMode && (
								<p className="text-red-500 text-sm mt-1">
									{errors.workMode}
								</p>
							)}
							{(post.workMode.Hybrid || post.workMode.Onsite) && (
								<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Country{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<select
											value={post.workLocation.country}
											disabled
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
										>
											<option value="">
												{post.workLocation.country
													? Country.getCountryByCode(
															post.workLocation
																.country
													  )?.name ||
													  post.workLocation.country
													: "Select Country"}
											</option>
										</select>
										{errors.workLocation?.country && (
											<p className="text-red-500 text-sm mt-1">
												{errors.workLocation.country}
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											State{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<select
											value={post.workLocation.state}
											disabled
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
										>
											<option value="">
												{post.workLocation.state &&
												post.workLocation.country
													? State.getStateByCodeAndCountry(
															post.workLocation
																.state,
															post.workLocation
																.country
													  )?.name ||
													  post.workLocation.state
													: "Select State"}
											</option>
										</select>
										{errors.workLocation?.state && (
											<p className="text-red-500 text-sm mt-1">
												{errors.workLocation.state}
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											City{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<select
											value={post.workLocation.district}
											disabled
											className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
										>
											<option value="">
												{post.workLocation.district ||
													"Select City"}
											</option>
										</select>
										{errors.workLocation?.district && (
											<p className="text-red-500 text-sm mt-1">
												{errors.workLocation.district}
											</p>
										)}
									</div>
								</div>
							)}
						</div>
						<div className="col-span-1">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Time Commitment
							</label>
							<input
								value={post.timeCommitment}
								disabled
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
						</div>
						<div className="col-span-1">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Experience{" "}
								<span className="text-red-500">*</span>
							</label>
							<div className="grid grid-cols-3 gap-4">
								<div>
									<input
										value={post.experience.years}
										disabled
										type="number"
										placeholder="Years"
										className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
									/>
									{errors.experience?.years && (
										<p className="text-red-500 text-sm mt-1">
											{errors.experience.years}
										</p>
									)}
								</div>
								<div>
									<input
										value={post.experience.months}
										disabled
										type="number"
										placeholder="Months"
										className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
									/>
									{errors.experience?.months && (
										<p className="text-red-500 text-sm mt-1">
											{errors.experience.months}
										</p>
									)}
								</div>
								<div>
									<input
										value={post.experience.days}
										disabled
										type="number"
										placeholder="Days"
										className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
									/>
									{errors.experience?.days && (
										<p className="text-red-500 text-sm mt-1">
											{errors.experience.days}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Step 3: Portfolio */}
				<div>
					<div className="flex items-center w-full bg-violet-100 px-5 rounded-2xl mb-5">
						<div className="flex flex-col">
							<p className="text-violet-700 text-xl">
								Build Your Portfolio
							</p>
							<p className="text-violet-400">
								Showcase your work, experience, and what others
								can expect from you — make it shine.
							</p>
						</div>
						<img src="./FormImage3.svg" alt="" />
					</div>
					<h3 className="text-xl font-semibold text-[#7900BF] mb-4">
						Build your portfolio to stand out.
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Portfolio Link
							</label>
							<input
								value={post.portfolioLink}
								disabled
								type="text"
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
							/>
							{errors.portfolioLink && (
								<p className="text-red-500 text-sm mt-1">
									{errors.portfolioLink}
								</p>
							)}
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Resume Link
							</label>
							{post.resumeLink ? (
								<a
									href={post.resumeLink}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline break-all"
								>
									{post.resumeLink}
								</a>
							) : (
								<p className="text-gray-500">
									No resume link provided.
								</p>
							)}
							{errors.resumeLink && (
								<p className="text-red-500 text-sm mt-1">
									{errors.resumeLink}
								</p>
							)}
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Projects
							</label>
							{post.projects?.length > 0 ? (
								post.projects.map((project, index) => (
									<div
										key={index}
										className="mb-4 p-4 border rounded-lg bg-gray-200"
									>
										<h4 className="text-sm font-medium text-gray-700">
											Project {index + 1}
										</h4>
										<div className="mt-2 space-y-2">
											<input
												value={project.title}
												disabled
												type="text"
												className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
											/>
											<textarea
												value={project.description}
												disabled
												className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
											/>
											<input
												value={project.link}
												disabled
												type="text"
												className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
											/>
											{errors[`projectLink${index}`] && (
												<p className="text-red-500 text-sm mt-1">
													{
														errors[
															`projectLink${index}`
														]
													}
												</p>
											)}
										</div>
									</div>
								))
							) : (
								<p className="text-gray-500">
									No projects added.
								</p>
							)}
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Work Experience
							</label>
							{post.workExperience?.length > 0 ? (
								post.workExperience.map((experience, index) => (
									<div
										key={index}
										className="mb-4 p-4 border rounded-lg bg-gray-200"
									>
										<h4 className="text-sm font-medium text-gray-700">
											Experience {index + 1}
										</h4>
										<div className="mt-2 space-y-2">
											<input
												value={experience.startDate}
												disabled
												type="date"
												className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
											/>
											<input
												value={experience.endDate}
												disabled
												type="date"
												className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
											/>
											<input
												value={experience.companyName}
												disabled
												type="text"
												className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
											/>
											<input
												value={experience.role}
												disabled
												type="text"
												className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
											/>
											<textarea
												value={experience.description}
												disabled
												className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
											/>
										</div>
									</div>
								))
							) : (
								<p className="text-gray-500">
									No work experience added.
								</p>
							)}
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Other Links
							</label>
							{post.otherLinks?.length > 0 ? (
								post.otherLinks.map((link, index) => (
									<div
										key={index}
										className="mb-4 p-4 border rounded-lg bg-gray-200"
									>
										<h4 className="text-sm font-medium text-gray-700">
											Link {index + 1}
										</h4>
										<div className="mt-2 space-y-2">
											<div className="mb-4 flex items-center gap-2">
												<input
													value={link.title}
													disabled
													type="text"
													className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
												/>
												<input
													value={link.url}
													disabled
													type="text"
													className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
												/>
												{errors[
													`otherLink${index}`
												] && (
													<p className="text-red-500 text-sm mt-1">
														{
															errors[
																`otherLink${index}`
															]
														}
													</p>
												)}
											</div>
										</div>
									</div>
								))
							) : (
								<p className="text-gray-500">
									No other links added.
								</p>
							)}
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								What Talent seekers can expect from you
							</label>
							<textarea
								value={post.expectations}
								disabled
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
							/>
						</div>
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Any Other Information
							</label>
							<textarea
								value={post.anyOtherInfo}
								disabled
								className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300 min-h-[100px]"
							/>
						</div>
					</div>
				</div>

				{/* Close Button */}
				<div className="mt-6 flex justify-end">
					<button
						onClick={() =>
							onClose({ openUpdate: true, listingId: post._id })
						}
						className="bg-[#7900BF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5c0099] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 mr-4"
					>
						Update
					</button>
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

export default ViewGetDiscoveredModal;
