import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";
import { FiCheckSquare } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";
import { BsBookmarkStar } from "react-icons/bs";
import { IoIdCard } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineHistory } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import PostNew from "./PostNew";
import TalentPostForm from "../TalentPostForm/TalentPostForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const middleName = localStorage.getItem("middleName");
  const lastName = localStorage.getItem("lastName");
  const phoneNumber = localStorage.getItem("email");

  const fetchListings = async () => {
    try {
      const role = localStorage.getItem("role");
      if (!role) {
        console.error("User ID or role not found in localStorage");
        return;
      }
      const endpoint = `http://localhost:3333/api/founder/get-all-listings-by-userId`;
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
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const fetchCredits = async () => {
    try {
      const response = await fetch(`http://localhost:3333/api/credits/get-credits`, {
        method: "POST",
        credentials: "include",
      });
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const filteredPosts = filter === "All" ? posts : posts.filter((post) => post.status === filter);

  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      {/* Navbar - Fixed at the top */}
      <div className="fixed top-0 left-0 w-full h-[80px] bg-violet-100 flex items-center justify-between px-3 xs:px-3 sm:px-6 md:px-10 z-30">
        <div className="text-lg xs:text-lg sm:text-xl md:text-2xl font-bold">Klezy</div>
        <div className="flex items-center gap-2 xs:gap-2 sm:gap-4 md:gap-8">
          <div className="flex items-center gap-1">
            <BiCoinStack className="text-xl xs:text-xl sm:text-2xl md:text-3xl text-violet-800" />
            <h1 className="text-base xs:text-base sm:text-lg md:text-2xl font-medium text-violet-800">{credits}</h1>
          </div>
          {/* Show buttons only at lg (992px) and above */}
          <div className="hidden lg:flex items-center gap-2 xs:gap-2 sm:gap-4">
            <button className="bg-violet-600 px-2 py-1 xs:px-2 sm:px-3 md:px-4 xs:py-1 sm:py-1 md:py-2 rounded-lg flex items-center gap-1 xs:gap-1 sm:gap-2 text-white text-xs xs:text-xs sm:text-sm md:text-base">
              Buy Credits
            </button>
            <button
              onClick={openModal}
              className="bg-violet-600 px-2 py-1 xs:px-2 sm:px-3 md:px-4 xs:py-1 sm:py-1 md:py-2 rounded-lg flex items-center gap-1 xs:gap-1 sm:gap-2 text-white text-xs xs:text-xs sm:text-sm md:text-base"
            >
              <MdOutlineAddToPhotos className="text-lg xs:text-lg sm:text-xl md:text-2xl" />
              Add Post
            </button>
          </div>
          {/* Three dots icon and dropdown for below lg (992px) */}
          <div className="relative lg:hidden">
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
          </button>
          <IoIosNotificationsOutline className="text-xl xs:text-xl sm:text-2xl md:text-3xl text-violet-800" />
        </div>
      </div>
      {/* Main Content - Adjusted for fixed navbar */}
      <div className="flex w-full bg-blue-50 pt-[80px] h-screen">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed md:static top-[80px] md:top-0 left-0 h-[calc(100vh-80px)] md:h-full w-56 xs:w-56 sm:w-64 bg-[#F5E3FF] transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 z-20`}
        >
          <div className="flex flex-col items-center h-full py-4 xs:py-4 sm:py-5 px-4 xs:px-4 sm:px-5 gap-3 xs:gap-3 sm:gap-4 md:gap-6 overflow-y-auto">
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
            {/* <div className="h-[1px] w-full bg-black opacity-30"></div> */}
            <div className="flex flex-col w-full items-center gap-1">
              <button
                onClick={() => setFilter("All")}
                className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base ${
                  filter === "All" ? "bg-[#F4F4F4] text-violet-700" : ""
                }`}
              >
                <LuGalleryVerticalEnd /> All Post
              </button>
              <button
                onClick={() => setFilter("Pending")}
                className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base ${
                  filter === "Pending" ? "bg-[#F4F4F4] text-violet-700" : ""
                }`}
              >
                <MdOutlinePendingActions /> Pending Post
              </button>
              <button
                onClick={() => setFilter("Accepted")}
                className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base ${
                  filter === "Accepted" ? "bg-[#F4F4F4] text-violet-700" : ""
                }`}
              >
                <FiCheckSquare /> Accepted Post
              </button>
              <button
                onClick={() => setFilter("Rejected")}
                className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-xs sm:text-sm md:text-base ${
                  filter === "Rejected" ? "bg-[#F4F4F4] text-violet-700" : ""
                }`}
              >
                <IoTrashBinOutline /> Rejected Post
              </button>
            </div>
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
            <div className="flex flex-col justify-end h-full w-full gap-1">
              <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-sm xs:text-sm sm:text-sm md:text-sm">
                <img src="../../../assets/material-symbols-light_feedback-outline-sharp.svg"/> Feedback
              </button>
              <button
                onClick={logout}
                className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 transition-all duration-300 flex items-center gap-3 xs:gap-3 sm:gap-5 px-4 py-2 w-full rounded-md text-xs xs:text-sm sm:text-sm md:text-sm"
              >
                <IoLogOutOutline /> Terms & Conditions
              </button>
            </div>
          </div>
        </div>
        {/* Cards Section - Scrollable */}
        <div className="flex-1 flex justify-center p-3 xs:p-3 sm:p-4 md:p-5 overflow-y-auto h-full">
          <div className="flex flex-col items-center gap-3 xs:gap-3 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 md:gap-5 sm:items-start w-full max-w-[16rem] xs:max-w-[16rem] sm:max-w-none">
            {filteredPosts.map((post, index) => (
              <div key={index} className="w-full max-w-[16rem] xs:max-w-[16rem] sm:max-w-none">
                <PostNew
                  post={post}
                  status={post.status}
                  skills={post.skills}
                  role={post.categoryName}
                  description={post.aboutMe}
                />
              </div>
            ))}
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
            maxWidth: "320px", // 320-576px
            xs: { maxWidth: "320px" }, // 320-576px
            sm: { maxWidth: "600px" }, // 576-768px
            md: { maxWidth: "700px" }, // 768-992px
            lg: { maxWidth: "800px" }, // 992-1280px
            xl: { maxWidth: "800px" }, // 1280-2400px
            maxHeight: "80vh",
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
        <TalentPostForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Dashboard;