import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
// import { IoIosNotificationsOutline } from "react-icons/io";
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
// import { SiMarketo } from "react-icons/si";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import PostNew from "./PostNew";
import FounderPostForm from "../FounderPostForm/FounderPostForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewCard from "./NewCard";
import Aos from "aos";
import "aos/dist/aos.css";
// Initialize AOS for animations


// Bind modal to root element for accessibility
Modal.setAppElement("#root");

const Dashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [credits, setCredits] = useState(0);
    const [filter, setFilter] = useState("All");
    const [posts, setPosts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);

    const firstName = localStorage.getItem("firstName");
    const email = localStorage.getItem("email");

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

        // Add event listener when sidebar is open
        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    // Initialize AOS for animations
    useEffect(() => {
        Aos.init({ duration: 900 });
    }, []);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const postsFiltered =
        filter === "All" ? posts : posts.filter((post) => post.status === filter);

    return (
        <div className=" flex flex-col bg-gray-100 h-fit min-h-screen poppins-medium items-center">
            {/* Navbar - Fixed at the top */}
            <div className="fixed w-full bg-white flex items-center justify-center">
                <div className="h-[60px] w-[90%] px-[7.5%] bg-white flex items-center justify-between">
                    <div className="flex items-center text-lg xs:text-lg sm:text-xl md:text-3xl font-bold">
                        <img src="./Logo.svg" alt="" className="scale-75" />
                        <div className="flex items-center gap-2">lezy <span className="mt-2 font-light border border-[#A100FF] text-[#A100FF] text-[0.7rem] px-2.5 py-0.5 rounded-full">BETA</span></div>
                    </div>
                    <div className="flex items-center gap-2 xs:gap-2 sm:gap-4 md:gap-8">
                        <IoMdNotificationsOutline className="text-xl xs:text-xl sm:text-2xl md:text-3xl text-violet-800" />

                        <p className="text-ls px-4 py-1 bg-purple-100 text-violet-600 rounded-lg">Market place opening soon</p>

                        {/* Below is Credits */}
                        {/* <div className="flex items-center gap-1">
                            <BiCoinStack className="text-xl xs:text-xl sm:text-2xl md:text-3xl text-violet-800" />
                            <h1 className="text-base xs:text-base sm:text-lg md:text-2xl font-medium text-violet-800">{credits}</h1>
                        </div> */}

                        {/* Show buttons only at lg (992px) and above */}
                        {/* Below is Buttons of Buy credits and Add Post */}
                        <div className="hidden lg:flex items-center gap-2 xs:gap-2 sm:gap-4">
                            {/* <button className="bg-violet-600 px-2 py-1 xs:px-2 sm:px-3 md:px-4 xs:py-1 sm:py-1 md:py-2 rounded-lg flex items-center gap-1 xs:gap-1 sm:gap-2 text-white text-xs xs:text-xs sm:text-sm md:text-base">
                                Buy Credits
                            </button> */}
                            <button
                                onClick={openModal}
                                className="bg-violet-600 px-2 py-1 xs:px-2 sm:px-3 md:px-4 xs:py-1 sm:py-1 md:py-2 rounded-lg flex items-center gap-1 xs:gap-1 sm:gap-2 text-white text-xs xs:text-xs sm:text-sm md:text-base"
                            >
                                <MdOutlineAddToPhotos className="text-lg xs:text-lg sm:text-xl md:text-2xl" />
                                Add Post
                            </button>
                        </div>

                        {/* Below is the three dots icon and dropdown */}
                        {/* Three dots icon and dropdown for below lg (992px) */}
                        {/* <div className="relative lg:hidden">
                            <button onClick={toggleDropdown} className="text-xl xs:text-xl sm:text-2xl text-violet-800">
                                <HiDotsVertical />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 xs:w-40 sm:w-48 bg-white rounded-md shadow-lg z-10">
                                    <button
                                        className="block w-full text-left px-3 py-2 text-xs xs:text-xs sm:text-sm text-gray-700 hover:bg-violet-100 hover:text-violet-700"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Buy Credits
                                    </button>
                                    <button
                                        className="block w-full text-left px-3 py-2 text-xs xs:text-xs sm:text-sm text-gray-700 hover:bg-violet-100 hover:text-violet-700"
                                        onClick={() => {
                                            openModal();
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Add Post
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            ref={hamburgerRef}
                            onClick={toggleSidebar}
                            className="md:hidden bg-violet-600 p-2 rounded-lg text-white"
                        >
                            <svg
                                className="w-5 h-5 xs:w-5 sm:w-6 sm:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button> */}
                        

                    </div>
                </div>
            </div>


            {/* Main Content - Adjusted for fixed navbar */}
            <div className="mt-[60px] flex justify-center w-[90%] bg-gray-100 px-[7.5%] py-5 h-full">

                {/* Sidebar Lef Side */}
                <div
                    ref={sidebarRef}
                    className={` bg-white fixed left-[13%] h-fit shadow-sm rounded-2xl transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0 transition-transform duration-300`}
                >
                    <div className="flex flex-col items-center h-full px-4 py-4 gap-4 overflow-y-auto">
                        {/* <div className="h-[1px] w-full bg-black opacity-30"></div> */}
                        <div className="flex flex-col w-full items-center gap-1">
                            <button className="bg-violet-500 text-white font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base"><AiOutlineShop className="text-xl " /> Market Place</button>
                        </div>

                        <div className="h-[1px] w-full bg-black opacity-30"></div>

                        <div className="flex flex-col w-full items-center gap-1">

                            {/* All Post */}
                            <button
                                onClick={() => setFilter("All")}
                                className={` hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base ${filter === "All" ? "bg-violet-100 text-violet-700" : ""
                                }`}
                            >
                                <LuGalleryVerticalEnd /> All Post
                            </button>

                            {/* Pending post */}
                            <button
                                onClick={() => setFilter("Pending")}
                                className={`hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base ${filter === "Pending" ? "bg-violet-100 text-violet-700" : ""
                                    }`}
                            >
                                <div className="h-3.5 w-3.5 bg-[#FFE167] rounded-full"></div> Pending Post
                            </button>

                            {/* Accepted Post */}
                            <button
                                onClick={() => setFilter("Accepted")}
                                className={`hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base ${filter === "Accepted" ? "bg-violet-100 text-violet-700" : ""
                                    }`}
                            >
                                <div className="h-3.5 w-3.5 bg-[#82FF5F] rounded-full"></div> Accepted Post
                            </button>

                            {/* Rejected Post */}
                            <button
                                onClick={() => setFilter("Rejected")}
                                className={`hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base ${filter === "Rejected" ? "bg-violet-100 text-violet-700" : ""
                                    }`}
                            >
                                <div className="h-3.5 w-3.5 bg-[#FF7567] rounded-full"></div> Rejected Post
                            </button>

                        </div>

                        <div className="h-[1px] w-full bg-black opacity-30"></div>

                        {/* <div className="h-[1px] w-full bg-black opacity-30"></div> */}
                        <div className="flex flex-col w-full items-center gap-1">
                            <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base">
                                <BsBookmarkStar /> Favourite Post
                            </button>
                            <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base">
                                <IoIdCard /> Purchased Post
                            </button>
                            <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base">
                                <MdOutlineHistory /> Purchase History
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cards Section - Scrollable */}
                <div className="flex-1 flex justify-center h-full">
                    <div className="flex flex-col gap-5">
                        {/* {filteredPosts.map((post, index) => (
                            <div key={index} className="w-full max-w-[16rem] xs:max-w-[16rem] sm:max-w-none">
                                <PostNew
                                    post={post}
                                />
                            </div>
                        ))} */}
                        {postsFiltered.map((card) => (
                            <div key={card.id} className="w-full">
                                <NewCard post={card} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Right side*/}
                <div
                    ref={sidebarRef}
                    className={` bg-white fixed right-[12%] shadow-sm h-fit rounded-2xl transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0 transition-transform duration-300`}
                >
                    <div className="flex flex-col items-center h-full py-4 xs:py-4 sm:py-5 px-4 xs:px-4 sm:px-5 gap-3 xs:gap-3 sm:gap-4 md:gap-6 overflow-y-auto">
                        {/* Image and Profile */}
                        <div className="flex gap-2 items-center w-full">
                            <div className="h-8 xs:h-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
                                <img
                                    src="https://i.pinimg.com/736x/df/f2/c6/dff2c64108660e659bc12bfa306b56a3.jpg"
                                    alt="Profile"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs xs:text-xs sm:text-sm md:text-md">
                                    Hi, {firstName}
                                </p>
                                <p className="opacity-40 text-xs xs:text-xs sm:text-sm">Good to see you again!</p>
                            </div>
                        </div>
                        <div className="h-[1px] w-full bg-black opacity-30"></div>
                        {/* <div className="h-[1px] w-full bg-black opacity-30"></div> */}
                        <div className="flex flex-col justify-end h-full w-full gap-1">
                            <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base">
                                <IoMdSettings /> Account Setting
                            </button>
                            <button
                                onClick={logout}
                                className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base"
                            >
                                <IoLogOutOutline /> Logout
                            </button>
                        </div>
                        {/* <div className="h-[1px] w-full bg-black opacity-30"></div> */}
                        <div className="flex flex-col justify-end h-full w-full">
                            <button
                                className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-sm xs:text-sm sm:text-sm md:text-sm"
                            >
                                Feedback
                            </button>
                            <button
                                onClick={logout}
                                className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-sm sm:text-sm md:text-sm"
                            >
                                Terms & Conditions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
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
                        width: "90%",
                        maxWidth: "70vw", // 320-576px
                        xs: { maxWidth: "320px" }, // 320-576px
                        sm: { maxWidth: "600px" }, // 576-768px
                        md: { maxWidth: "700px" }, // 768-992px
                        lg: { maxWidth: "800px" }, // 992-1280px
                        xl: { maxWidth: "800px" }, // 1280-2400px
                        maxHeight: "90vh",
                        overflowY: "auto",
                        padding: "2px xs:2px sm:4px",
                        borderRadius: "12px xs:12px sm:16px",
                        backgroundColor: "#ffffff",
                        border: "none",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 1000,
                    },
                }}
            >
                <FounderPostForm onClose={closeModal} />
            </Modal>
        </div>
    );
};

export default Dashboard;