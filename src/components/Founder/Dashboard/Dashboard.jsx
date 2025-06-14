import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";
import { FiCheckSquare } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";
import { BsBookmarkStar, BsWhatsapp } from "react-icons/bs";
import { IoIdCard } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import PostNew from "./PostNew";
import FounderPostForm from "../FounderPostForm/FounderPostForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewCard from "./NewCard";
import Aos from "aos";
import { IoMdAddCircleOutline } from "react-icons/io";
import "aos/dist/aos.css";
import "./Dashboard.css";
import AccountSettings from "./AccountSettings";

// Bind modal to root element for accessibility
Modal.setAppElement("#root");

const Dashboard = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [credits, setCredits] = useState(0);
	const [filter, setFilter] = useState("All");
	const [posts, setPosts] = useState([]);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const sidebarRef = useRef(null);
	const hamburgerRef = useRef(null);
	const firstName = localStorage.getItem("firstName");
	const email = localStorage.getItem("email");
	
	const openAccountSettingsModal = () => setIsAccountSettingsModalOpen(true);
	const closeAccountSettingsModal = () => setIsAccountSettingsModalOpen(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
	const closeSidebar = () => setIsSidebarOpen(false);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	const fetchListings = async () => {
		try {
			const role = localStorage.getItem("role");
			if (!role) {
				console.error("User ID or role not found in localStorage");
				return;
			}
			const endpoint = `http://localhost:3333/api/get-discovered/get-all-listings-by-userId`;
			const response = await fetch(endpoint, {
				method: "GET",
				credentials: "include",
			});
			if (!response.ok) throw new Error("Failed to fetch listings");
			const res = await response.json();
			const data = res.data;
			console.log("Fetched Data:", data);
			setPosts(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Error fetching listings:", error);
		}
	};

	const logout = async () => {
		try {
			await fetch(`http://localhost:3333/api/auth/logout`, {
				method: "POST",
				credentials: "include",
			});
			localStorage.clear();
			navigate("/");
		} catch (err) {
			console.error("Logout failed", err);
		}
	};

	const fetchCredits = async () => {
		try {
			const response = await fetch(
				`http://localhost:3333/api/credits/get-credits`,
				{
					method: "POST",
					credentials: "include",
				}
			);
			const data = await response.json();
			setCredits(data.credits);
		} catch (error) {
			toast.error("Error fetching credits!");
		}
	};

	useEffect(() => {
		fetchCredits();
		fetchListings();
	}, []);

	// Effect to handle clicks outside the sidebar
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				isSidebarOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target) &&
				hamburgerRef.current &&
				!hamburgerRef.current.contains(event.target)
			) {
				setIsSidebarOpen(false);
			}
		};

		if (isSidebarOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden"; // Prevent background scroll on mobile
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "unset";
		};
	}, [isSidebarOpen]);

	const postsFiltered = filter === "All" ? posts : posts.filter((post) => post.status === filter);

	console.log("postFiltered: ", postsFiltered);

	return (
		<div className="flex flex-col bg-gray-100 min-h-screen poppins-medium">
			{/* Navbar */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo - Made more compact on mobile */}
						<div className="flex items-center flex-shrink-0 min-w-0">
							<img src="./Logo.svg" alt="Lezy Logo" className="h-6 sm:h-8 w-auto flex-shrink-0" />
							<div className="ml-1 sm:ml-2 flex items-center gap-1 sm:gap-2 min-w-0">
								<span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">lezy</span>
								<span className="px-1.5 sm:px-2 py-0.5 text-[0.65rem] sm:text-xs font-medium text-purple-600 bg-purple-100 border border-purple-200 rounded-full flex-shrink-0">
									BETA
								</span>
							</div>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center space-x-4">
							<IoMdNotificationsOutline className="w-6 h-6 text-violet-600 hover:text-violet-700 cursor-pointer" />
							<div className="px-3 py-1 text-sm text-violet-600 bg-purple-50 rounded-lg border border-purple-200 whitespace-nowrap">
								Market place opening soon
							</div>
							{/* <div className="flex items-center gap-2">
								<BiCoinStack className="w-6 h-6 text-violet-600" />
								<span className="text-lg font-medium text-violet-600">{credits}</span>
							</div> */}
							<button
								onClick={openModal}
								className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#A100FF] hover:bg-violet-700 rounded-lg transition-colors duration-200"
							>
								<MdOutlineAddToPhotos className="w-5 h-5 mr-2" />
								Add Post
							</button>
						</div>

						{/* Mobile Actions - Compact layout */}
						<div className="flex lg:hidden items-center space-x-2">
							{/* Add Post Button - Mobile */}
							<button
								onClick={openModal}
								className="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-[#A100FF] hover:bg-violet-700 rounded-md transition-colors duration-200"
							>
								<MdOutlineAddToPhotos className="w-4 h-4 sm:mr-1" />
								<span className="hidden sm:inline ml-1">Add</span>
							</button>

							{/* Hamburger menu button */}
							<button
								ref={hamburgerRef}
								onClick={toggleSidebar}
								className="inline-flex items-center justify-center p-2 text-white bg-violet-600 hover:bg-violet-700 rounded-md transition-colors duration-200"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile notification bar - Made more compact */}
				<div className="lg:hidden px-4 py-2 bg-purple-50 border-t border-purple-200">
					<div className="flex items-center justify-center">
						<div className="flex items-center space-x-2">
							<IoMdNotificationsOutline className="w-4 h-4 text-violet-600 flex-shrink-0" />
							<span className="text-xs sm:text-sm text-violet-600 text-center">Market place opening soon</span>
						</div>
					</div>
				</div>
			</nav>

			{/* Overlay for mobile sidebar */}
			{isSidebarOpen && (
				<div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden" />
			)}

			{/* Main Layout Container */}
			<div className="flex-1 pt-20 sm:pt-20 lg:pt-16 flex">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
						{/* Left Sidebar */}
						<aside
							ref={sidebarRef}
							className={`lg:col-span-3 fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-sm lg:rounded-xl lg:w-auto lg:inset-y-auto lg:z-auto lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] ${
								isSidebarOpen ? "translate-x-0" : "-translate-x-full"
							} lg:pt-0`}
						>
							<div className="h-full flex flex-col lg:h-auto lg:max-h-full">
								{/* Mobile Sidebar Header - Only visible on small screens */}
								<div className="lg:hidden px-6 py-4 border-b border-gray-200 bg-white">
									<div className="flex items-center justify-between">
										{/* Logo in mobile sidebar */}
										<div className="flex items-center">
											<img src="./Logo.svg" alt="Lezy Logo" className="h-6 w-auto flex-shrink-0" />
											<div className="ml-2 flex items-center gap-2">
												<span className="text-lg font-bold text-gray-900">lezy</span>
												<span className="px-2 py-0.5 text-xs font-medium text-purple-600 bg-purple-100 border border-purple-200 rounded-full">
													BETA
												</span>
											</div>
										</div>
										{/* Close button */}
										<button
											onClick={closeSidebar}
											className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
										>
											<IoClose className="w-5 h-5" />
										</button>
									</div>
								</div>

								<div className="flex-1 overflow-y-auto lg:overflow-y-auto p-6 space-y-6">
									{/* User Profile - Only visible on mobile sidebar */}
									<div className="lg:hidden">
										<div className="flex items-center space-x-3">
											<div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
												<img
													src="https://i.pinimg.com/736x/df/f2/c6/dff2c64108660e659bc12bfa306b56a3.jpg"
													alt="Profile"
													className="w-full h-full object-cover"
												/>
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">Hi, {firstName}</p>
												<p className="text-xs text-gray-500">Good to see you again!</p>
											</div>
										</div>
										<hr className="border-gray-200 mt-4" />
									</div>

									{/* Marketplace Button */}
									<div>
										<button className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-[#A100FF] hover:bg-violet-700 rounded-lg transition-colors duration-200">
											<AiOutlineShop className="w-5 h-5 mr-3" />
											Market Place
										</button>
									</div>

									<hr className="border-gray-200" />

									{/* Filter Buttons */}
									<div className="space-y-2">
										{[
											{ key: "All", label: "All Post", icon: <LuGalleryVerticalEnd className="w-5 h-5" /> },
											{ key: "Pending", label: "Pending Post", icon: <div className="w-3.5 h-3.5 bg-[#FFE167] rounded-full" /> },
											{ key: "Accepted", label: "Accepted Post", icon: <div className="w-3.5 h-3.5 bg-[#82FF5F] rounded-full" /> },
											{ key: "Rejected", label: "Rejected Post", icon: <div className="w-3.5 h-3.5 bg-[#FF7567] rounded-full" /> },
										].map(({ key, label, icon }) => (
											<button
												key={key}
												onClick={() => {
													setFilter(key);
													setIsSidebarOpen(false); // Close sidebar on mobile after selection
												}}
												className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
													filter === key
														? "bg-violet-100 text-violet-700"
														: "text-gray-700 hover:bg-gray-100 hover:text-violet-700"
												}`}
											>
												{icon}
												<span className="ml-3">{label}</span>
											</button>
										))}
									</div>

									<hr className="border-gray-200" />

									{/* Additional Menu Items */}
									<div className="space-y-2">
										
										{[
											{ icon: <BsBookmarkStar className="w-5 h-5" />, label: "Favourite Post" },
											{ icon: <IoIdCard className="w-5 h-5" />, label: "Purchased Post" },
											{ icon: <MdOutlineHistory className="w-5 h-5" />, label: "Purchase History" },
										].map(({ icon, label }) => (
											<button
												key={label}
												className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
											>
												{icon}
												<span className="ml-3">{label}</span>
											</button>
										))}
									</div>

									{/* Mobile-only Account Settings */}
									<div className="lg:hidden">
										<hr className="border-gray-200" />
										<div className="space-y-2 mt-6">
											<h3 className="text-sm font-medium text-gray-900 mb-3">Account</h3>
											<button
												onClick={() => {
													openAccountSettingsModal();
													setIsSidebarOpen(false);
												}}
												className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
											>
												<IoMdSettings className="w-5 h-5 mr-3" />
												Account Setting
											</button>
											<button
												onClick={() => {
													logout();
													setIsSidebarOpen(false);
												}}
												className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-lg transition-colors duration-200"
											>
												<IoLogOutOutline className="w-5 h-5 mr-3" />
												Logout
											</button>
											<button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200">
												Feedback
											</button>
											<button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200">
												Terms & Conditions
											</button>
										</div>
									</div>
								</div>
							</div>
						</aside>

						{/* Main Content Area - Scrollable */}
						<div className="lg:col-span-6 flex flex-col min-h-0">
							<div className="flex-1 overflow-y-auto">
								{filter === "All" && postsFiltered.length === 0 ? (
									<div className="text-center py-12">
										<div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
											<IoMdAddCircleOutline className="w-10 h-10 text-gray-400" />
										</div>
										<h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
										<p className="text-gray-500 mb-4">Create your first post to get started!</p>
										<button
											onClick={openModal}
											className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#A100FF] hover:bg-violet-700 rounded-lg transition-colors duration-200"
										>
											<IoMdAddCircleOutline className="w-5 h-5 mr-2" />
											create a new post
										</button>
									</div>
								) : (
									<div className="space-y-6 pb-6">
										{postsFiltered.map((card) => (
											<div key={card.id} className="w-full">
												<NewCard post={card} />
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Right Sidebar - Desktop only */}
						<aside className="lg:col-span-3 hidden lg:block">
							<div className="sticky top-24 bg-white rounded-xl shadow-sm p-6 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
								{/* User Profile */}
								<div className="flex items-center space-x-3">
									<div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
										<img
											src="https://i.pinimg.com/736x/df/f2/c6/dff2c64108660e659bc12bfa306b56a3.jpg"
											alt="Profile"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 truncate">Hi, {firstName}</p>
										<p className="text-xs text-gray-500">Good to see you again!</p>
									</div>
								</div>

								<hr className="border-gray-200" />

								{/* Account Actions */}
								<div className="space-y-2">
									<button
										onClick={openAccountSettingsModal}
										className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
									>
										<IoMdSettings className="w-5 h-5 mr-3" />
										Account Setting
									</button>
									<button
										onClick={logout}
										className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-lg transition-colors duration-200"
									>
										<IoLogOutOutline className="w-5 h-5 mr-3" />
										Logout
									</button>
								</div>

								<hr className="border-gray-200" />

								{/* Footer Links */}
								<div className="space-y-2">
									{["Feedback", "Terms & Conditions"].map((item) => (
										<button
											key={item}
											className="w-full px-4 py-2 text-sm text-gray-600 hover:text-violet-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left"
										>
											{item}
										</button>
									))}
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>

			{/* Modals */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-violet-300/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
					<div className="bg-white rounded-3xl p-4 w-full max-w-[95%] sm:max-w-[800px] max-h-[90vh] overflow-y-auto border border-violet-200 shadow-2xl">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-violet-900 tracking-tight">
								 
							</h2>
							<button
								className="text-gray-600 text-sm font-medium px-4 py-2 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
								onClick={closeModal}
							>
								Close
							</button>
						</div>
						<FounderPostForm onClose={closeModal} />
					</div>
				</div>
			)}

			<Modal
				isOpen={isAccountSettingsModalOpen}
				onRequestClose={closeAccountSettingsModal}
				style={{
					content: {
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
						width: "95%",
						maxWidth: "800px",
						maxHeight: "90vh",
						overflowY: "auto",
						padding: "0",
						borderRadius: "12px",
						backgroundColor: "#ffffff",
						border: "none",
					},
					overlay: {
						backgroundColor: "rgba(0, 0, 0, 0.75)",
						backdropFilter: "blur(8px)",
						WebkitBackdropFilter: "blur(8px)",
						zIndex: 1000,
					},
				}}
			>
				<AccountSettings onClose={closeAccountSettingsModal} />
			</Modal>
		</div>
	);
};

export default Dashboard;