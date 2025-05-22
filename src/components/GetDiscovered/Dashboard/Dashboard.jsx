import { useState, useEffect } from "react";
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
  const [filter, setFilter] = useState("All"); // New state for filter
  const [posts, setPosts] = useState([]);

  const firstName = localStorage.getItem("firstName");
  const middleName = localStorage.getItem("middleName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const fetchListings = async () => {
    try {
      const role = localStorage.getItem("role");

      if (!role) {
        console.error("User ID or role not found in localStorage");
        return;
      }

      const endpoint = `http://localhost:3333/api/founder/get-all-listings-by-userId`;
      // role === "Founder"
      //   // ? `http://localhost:8000/api/get-discovered/get-all-listings-by-userId`
      //   : `http://localhost:8000/api/founder/get-all-listings-by-userId`;

      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch listings");

      const res = await response.json();
      const data = res.data;
      console.log("Fetched Data:", data);
      setPosts(Array.isArray(data) ? data : []);

      //   if (data && Array.isArray(data)) {
      //     fetchInvitationsForPosts(data, role);
      //   }
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3333/api/auth/logout", {
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
      const response = await fetch(
        "http://localhost:3333/api/credits/get-credits",
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
  }, []); // Fetch credits on component mount

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Filter posts based on the current filter state
  const filteredPosts =
    filter === "All" ? posts : posts.filter((post) => post.status === filter);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-300">
      {/* Navbar */}
      <div className="w-screen h-[80px] bg-violet-100">
        <div className="flex flex-row justify-between items-center h-full px-10">
          <div className="text-2xl font-bold">Klezy</div>
          <div className="flex flex-row gap-8 items-center justify-center">
            <div className="flex flex-row gap-1 items-center">
              <BiCoinStack className="text-3xl text-violet-800" />
              <h1 className="text-2xl font-medium text-violet-800">
                {credits}
              </h1>
            </div>
            <button className="bg-violet-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-white">
              Buy Credits
            </button>
            <button
              onClick={openModal}
              className="bg-violet-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-white"
            >
              <MdOutlineAddToPhotos className="text-2xl" />
              Add Post
            </button>
            <IoIosNotificationsOutline className="text-3xl text-violet-800" />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-row w-full h-[92%] bg-blue-50">
        {/* Sidebar */}
        <div className="h-full w-[240px] bg-[#F5E3FF]">
          <div className="flex flex-col items-center h-full py-5 px-5 gap-6">
            <div className="flex gap-2 items-center">
              <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/df/f2/c6/dff2c64108660e659bc12bfa306b56a3.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <p className="text-md">Hi, {firstName}</p>
                <p className="opacity-40 text-sm">{email}</p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-black opacity-30"></div>
            <div className="flex flex-col w-full items-center gap-1">
              <button
                onClick={() => setFilter("All")}
                className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
                  filter === "All" ? "bg-[#F4F4F4] text-violet-700" : ""
                }`}
              >
                <LuGalleryVerticalEnd /> All Post
              </button>
              <button
                onClick={() => setFilter("Pending")}
                className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
                  filter === "Pending" ? "bg-[#F4F4F4] text-violet-700" : ""
                }`}
              >
                <MdOutlinePendingActions /> Pending Post
              </button>
              <button
                onClick={() => setFilter("Accepted")}
                className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
                  filter === "Accepted" ? "bg-[#F4F4F4] text-violet-700" : ""
                }`}
              >
                <FiCheckSquare /> Accepted Post
              </button>
              <button
                onClick={() => setFilter("Rejected")}
                className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
                  filter === "Rejected" ? "bg-[#F4F4F4] text-violet-700" : ""
                }`}
              >
                <IoTrashBinOutline /> Rejected Post
              </button>
            </div>
            <div className="h-[1px] w-full bg-black opacity-30"></div>
            <div className="flex flex-col w-full items-center gap-1">
              <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md">
                <BsBookmarkStar /> Favourite Post
              </button>
              <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md">
                <IoIdCard /> Purchased Post
              </button>
              <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md">
                <MdOutlineHistory /> Purchase History
              </button>
            </div>
            <div className="h-[1px] w-full bg-black opacity-30"></div>
            <div className="flex flex-col justify-end h-full w-full gap-1">
              <button className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md">
                <IoMdSettings /> Account Setting
              </button>
              <button
                onClick={logout}
                className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md"
              >
                <IoLogOutOutline /> Logout
              </button>
              <div className="flex flex-col gap-0">
                <p className="text-black opacity-30">Feedback</p>
                <p className="text-black opacity-30">Terms and Conditions</p>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-4 w-full h-full overflow-y-scroll gap-5 px-5 py-5">
          {filteredPosts.map((post, index) => (
            <PostNew
              key={index}
              post = {post}
              status={post.status}
              skills={post.skills}
              // jobType={post.workType}
              // location={post.workType}
              // time={post.paymentMode}
              role={post.categoryName}
              description={post.aboutMe}
            />
          ))}
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
            maxWidth: "800px",
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "4px",
            borderRadius: "16px",
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
