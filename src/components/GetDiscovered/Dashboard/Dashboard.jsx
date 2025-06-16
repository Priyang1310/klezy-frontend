import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { BsBookmarkStar } from "react-icons/bs";
import { IoIdCard } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoClose } from "react-icons/io5"; // Added close icon
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewCard from "./NewCard";
import TalentPostForm from "../TalentPostForm/TalentPostForm";
import Aos from "aos";
import "aos/dist/aos.css";
import AccountSettings from "./AccountSettings";

// Bind modal to root element
Modal.setAppElement("#root");

const Dashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [credits, setCredits] = useState(0);
    const [filter, setFilter] = useState("All");
    const [posts, setPosts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] =
        useState(false);
    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);

    const firstName = localStorage.getItem("firstName");

    // Modal handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openAccountSettingsModal = () => setIsAccountSettingsModalOpen(true);
    const closeAccountSettingsModal = () =>
        setIsAccountSettingsModalOpen(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false); // Added close sidebar function

    // API functions
    const fetchListings = async () => {
        try {
            const role = localStorage.getItem("role");
            if (!role) throw new Error("User role not found");
            const endpoint = `http://localhost:3333/api/founder/get-all-listings-by-userId`;
            const response = await fetch(endpoint, { credentials: "include" });
            if (!response.ok) throw new Error("Failed to fetch listings");
            const res = await response.json();
            setPosts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching listings:", error);
            toast.error("Failed to load posts");
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
            toast.error("Logout failed");
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

    // Effects
    useEffect(() => {
        fetchCredits();
        fetchListings();
        Aos.init({ duration: 900 });
    }, []);

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

    const postsFiltered =
        filter === "All"
            ? posts
            : posts.filter((post) => post.status === filter);

    return (
        <div className="flex flex-col bg-gray-100 min-h-screen poppins-medium">
            {/* Navbar */}
            {/* Navbar */}
<nav className="fixed top-0 left-0 pl-15 pr-24 right-0 z-50 bg-white border-b border-gray-200">
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      
      {/* Logo - Consistent left alignment */}
      <div className="flex items-center space-x-2">
        <img
          src="./Logo2.svg"
          alt="Lezy Logo"
          className="h-7 sm:h-8 w-auto"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-4">
        <div className="px-3 py-1 text-sm text-violet-600 bg-purple-50 rounded-lg border border-purple-200">
         🚀 Marketplace opening soon
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#a100ff] hover:bg-violet-700 rounded-lg shadow transition duration-200"
        >
          <MdOutlineAddToPhotos className="w-5 h-5 mr-2" />
          Create Post
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden items-center space-x-2">
        <button
          onClick={openModal}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-md shadow transition duration-200"
        >
          <MdOutlineAddToPhotos className="w-4 h-4 mr-1" />
          <span>Add</span>
        </button>

        <button
          ref={hamburgerRef}
          onClick={toggleSidebar}
          className="p-2 text-violet-700 bg-purple-100 hover:bg-purple-200 rounded-md transition duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {/* Mobile notification bar */}
  <div className="lg:hidden px-4 py-2 bg-purple-50 border-t border-purple-200 text-center">
    <div className="inline-flex items-center space-x-1 text-sm text-violet-600">
      <IoMdNotificationsOutline className="w-4 h-4" />
      <span>Marketplace opening soon</span>
    </div>
  </div>
</nav>


            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden" />
            )}

            {/* Main Layout Container */}
            <div className="flex-1 scrollbar-none pt-20 sm:pt-20 lg:pt-16 flex">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex w-full">
                    <div className="grid grid-cols-2 lg:grid-cols-13 gap-2 w-full">
                        {/* Left Sidebar */}
                        <aside
                            ref={sidebarRef}
                            className={`lg:col-span-3 fixed inset-y-0 left-0 z-50 w-70 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-sm lg:rounded-xl lg:w-58 lg:inset-y-auto lg:z-auto lg:sticky lg:top-20 lg:self-start lg:max-h-[85vh] ${
                                isSidebarOpen
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                            } lg:pt-0 lg:pr-`}
                        >
                            <div className="h-full flex flex-col">
                                {/* Mobile Sidebar Header */}
                                <div className="lg:hidden px-4 py-3 border-b border-gray-200 bg-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src="./Logo.svg"
                                                alt="Lezy Logo"
                                                className="h-5 w-auto flex-shrink-0"
                                            />
                                            <div className="ml-2 flex items-center gap-2">
                                                <span className="text-base font-semibold text-gray-900">
                                                    lezy
                                                </span>
                                                <span className="px-2 py-0.5 text-xs font-medium text-purple-600 bg-purple-100 border border-purple-200 rounded-full">
                                                    BETA
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={closeSidebar}
                                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                        >
                                            <IoClose className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {/* Mobile User Profile */}
                                    <div className="lg:hidden">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                                <img
                                                    src="https://i.pinimg.com/736x/df/f2/c6/dff2c64108660e659bc12bfa306b56a3.jpg"
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    Hi, {firstName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Good to see you again!
                                                </p>
                                            </div>
                                        </div>
                                        <hr className="border-gray-200 mt-3" />
                                    </div>

                                    {/* Marketplace Button */}
                                    <div>
                                        <button className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#a100ff] hover:bg-violet-700 rounded-lg">
                                            <AiOutlineShop className="w-5 h-5 mr-2" />
                                            Market Place
                                        </button>
                                    </div>

                                    <hr className="border-gray-200" />

                                    {/* Filter Buttons */}
                                    <div className="space-y-1.5">
                                        {[
                                            {
                                                key: "All",
                                                label: "All Posts",
                                                icon: (
                                                    <LuGalleryVerticalEnd className="w-5 h-5" />
                                                ),
                                            },
                                            {
                                                key: "Pending",
                                                label: "Pending Posts",
                                                icon: (
                                                    <div className="w-3.5 h-3.5 bg-yellow-400 rounded-full" />
                                                ),
                                            },
                                            {
                                                key: "Accepted",
                                                label: "Accepted Posts",
                                                icon: (
                                                    <div className="w-3.5 h-3.5 bg-green-400 rounded-full" />
                                                ),
                                            },
                                            {
                                                key: "Rejected",
                                                label: "Rejected Posts",
                                                icon: (
                                                    <div className="w-3.5 h-3.5 bg-red-400 rounded-full" />
                                                ),
                                            },
                                        ].map(({ key, label, icon }) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setFilter(key);
                                                    setIsSidebarOpen(false);
                                                }}
                                                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                                    filter === key
                                                        ? "bg-violet-100 text-violet-700"
                                                        : "text-gray-700 hover:bg-gray-100 hover:text-violet-700"
                                                }`}
                                            >
                                                {icon}
                                                <span className="ml-3">
                                                    {label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    <hr className="border-gray-200" />

                                    {/* Additional Menu */}
                                    <div className="space-y-1.5">
                                        {[
                                            {
                                                icon: (
                                                    <BsBookmarkStar className="w-5 h-5" />
                                                ),
                                                label: "Favourite Posts",
                                            },
                                            {
                                                icon: (
                                                    <IoIdCard className="w-5 h-5" />
                                                ),
                                                label: "Purchased Posts",
                                            },
                                            {
                                                icon: (
                                                    <MdOutlineHistory className="w-5 h-5" />
                                                ),
                                                label: "Purchase History",
                                            },
                                        ].map(({ icon, label }) => (
                                            <button
                                                key={label}
                                                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg"
                                            >
                                                {icon}
                                                <span className="ml-3">
                                                    {label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Mobile Account Settings */}
                                    <div className="lg:hidden">
                                        <hr className="border-gray-200" />
                                        <div className="space-y-2 mt-4">
                                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                                                Account
                                            </h3>
                                            <button
                                                onClick={() => {
                                                    openAccountSettingsModal();
                                                    setIsSidebarOpen(false);
                                                }}
                                                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg"
                                            >
                                                <IoMdSettings className="w-5 h-5 mr-2" />
                                                Account Settings
                                            </button>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsSidebarOpen(false);
                                                }}
                                                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-lg"
                                            >
                                                <IoLogOutOutline className="w-5 h-5 mr-2" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content Area - Scrollable */}
                        <div className="lg:col-span-7 lg:ml-[-20px] flex flex-col min-h-0 ">
                            <div className="flex-1 overflow-y-auto">
                                {postsFiltered.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <LuGalleryVerticalEnd className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            No posts found
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            Create your first talent post to get
                                            started!
                                        </p>
                                        <button
                                            onClick={openModal}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors duration-200"
                                        >
                                            <MdOutlineAddToPhotos className="w-5 h-5 mr-2" />
                                            Create Post
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6 pb-6">
                                        {postsFiltered.map((post) => (
                                            <NewCard
                                                key={post._id}
                                                post={post}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Sidebar - Desktop only */}
                        <aside
                            ref={sidebarRef}
                            className={`lg:col-span-3 fixed inset-y-0 left-0 z-50 w-70 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-sm lg:rounded-xl lg:w-58 lg:inset-y-auto lg:z-auto lg:sticky lg:top-20 lg:self-start lg:max-h-[85vh] ${
                                isSidebarOpen
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                            } lg:pt-0`}
                        >
                            <div className="sticky top-24 bg-white rounded-xl shadow-sm p-4 space-y-3 max-h-[85vh] overflow-y-auto">
                                {/* User Profile */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                        <img
                                            src="https://i.pinimg.com/736x/df/f2/c6/dff2c64108660e659bc12bfa306b56a3.jpg"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Hi, {firstName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Good to see you again!
                                        </p>
                                    </div>
                                </div>

                                <hr className="border-gray-200" />

                                {/* Account Actions */}
                                <div className="space-y-1.5">
                                    <button
                                        onClick={openAccountSettingsModal}
                                        className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
                                    >
                                        <IoMdSettings className="w-5 h-5 mr-2" />
                                        Account Settings
                                    </button>
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-lg transition-colors duration-200"
                                    >
                                        <IoLogOutOutline className="w-5 h-5 mr-2" />
                                        Logout
                                    </button>
                                </div>

                                <hr className="border-gray-200" />

                                {/* Footer Links */}
                                <div className="space-y-1.5">
                                    {[
                                        "Feedback",
                                        "Terms & Conditions",
                                        "Privacy & Policy",
                                    ].map((item) => (
                                        <button
                                            key={item}
                                            className="w-full px-3 py-2 text-sm text-gray-600 hover:text-violet-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left"
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
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
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
                        zIndex: 1000,
                    },
                }}
            >
                <TalentPostForm onClose={closeModal} />
            </Modal>

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
