// import React from "react";
// // import bgVector from "../../assets/BG_Discover.svg";
// import { MdOutlineArrowOutward } from "react-icons/md";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import { FaChevronUp, FaChevronDown } from "react-icons/fa";
// import { IoMdTime } from "react-icons/io";

// const cardsData = [
//   {
//     id: 1,
//     name: "Carl Henderson",
//     role: "Full Stack Developer",
//     img: "https://i.pinimg.com/736x/93/64/ad/9364ad2e48775eabaa435aa8f908667a.jpg"
//   },
//   {
//     id: 2,
//     name: "Jane Doe",
//     role: "UI/UX Designer",
//     img: "https://i.pinimg.com/736x/93/64/ad/9364ad2e48775eabaa435aa8f908667a.jpg"
//   },
//   // {
//   //   id: 3,
//   //   name: "John Smith",
//   //   role: "Data Scientist" ,
//   //   img: "https://i.pinimg.com/736x/93/64/ad/9364ad2e48775eabaa435aa8f908667a.jpg"
//   // },
//   // {
//   //   id: 4,
//   //   name: "Alice Johnson",
//   //   role: "Product Manager",
//   //   img: "https://i.pinimg.com/736x/93/64/ad/9364ad2e48775eabaa435aa8f908667a.jpg"
//   // },
//   // {
//   //   id: 5,
//   //   name: "Bob Brown",
//   //   role: "Marketing Specialist",
//   //   img: "https://i.pinimg.com/736x/93/64/ad/9364ad2e48775eabaa435aa8f908667a.jpg"
//   // },
//   // {
//   //   id: 6,
//   //   name: "Charlie Davis",
//   //   role: "Data Analyst",
//   //   img: "https://i.pinimg.com/736x/93/64/ad/9364ad2e48775eabaa435aa8f908667a.jpg"
//   // },
// ];

// const DiscoveringTalent = () => {
//   const [cards, setCards] = useState(cardsData);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCards((prev) => [...prev.slice(1), prev[0]]); // Moves first card to the end
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="m-8 min-h-screen flex justify-evenly px-14 py-14">
//       <div className="flex flex-col items-start justify-center gap-5 w-[50%] px-10">
//         <h1 className="font-jakarta font-semibold text-4xl">
//           Find the Right people to Build & Grow Your next big thing
//         </h1>
//         <p className="mt-2">
//           Whether you're looking for top talent to grow your business or the
//           perfect co-founder to start your next venture, we connect you with
//           like-minded professionals ready to bring ideas to life.
//         </p>
//         <p className="text-[#7C5CFC] font-semibold">
//           Start Discovering People with Talent
//         </p>
//         <button className="text-white flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#7C5CFC]">
//           Discover now <MdOutlineArrowOutward />
//         </button>
//       </div>
//       {/* this is card section */}
//       <div className="relative h-full overflow-hidden flex flex-col items-center p-5">
//               <motion.div
//                 className="flex flex-col space-y-6"
//                 key={cards[0].id} // Force re-render to sync animation
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -30, opacity: 0 }}
//                 transition={{ ease: "easeInOut", duration: 0.8 }}
//               >
//                 {cards.map((card, i) => (
//                   <motion.div
//                     key={card.id}
//                     className={`w-[300px] p-6 bg-white shadow-lg rounded-4xl transition-all ${
//                       i === 1 ? "scale-105" : "scale-95 opacity-80"
//                     }`}
//                   >
//                     <div className="flex justify-between px-2">
//                       <div className="w-14 h-14 object-cover object-top rounded-full border-2 border-blue-500 overflow-hidden">
//                         <img src={card.img} alt="Nathi aavtu" />
//                       </div>
//                       <div className="flex flex-col items-start justify-center">
//                         <h3 className="text-md font-bold">{card.name}</h3>
//                         <p className="text-sm text-gray-600">{card.role}</p>
//                       </div>
//                       <div className="flex flex-col items-center justify-center">
//                         <span className="text-xs font-semibold text-gray-600 px-3 inline-block mt-2">On Site</span>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-start justify-center mt-4">
//                       <p className="text-gray-500 text-xs">Role</p>
//                       <div className="flex">
//                         <p className="text-sm font-bold">{card.role}</p>
//                         <div className="text-sm flex items-center justify-center gap-1 ml-2 text-gray-500">
//                           <IoMdTime />
//                           <p>On time</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-1 mt-3">
//                       <p className="text-gray-500 text-xs">Skills Required</p>
//                       <div className="flex gap-2">
//                         <p className="text-sm font-bold border-2 border-blue-600 rounded-full px-2">React</p>
//                         <p className="text-sm font-bold border-2 border-blue-600 rounded-full px-2">React</p>
//                         <p className="text-sm font-bold border-2 border-blue-600 rounded-full px-2">React</p>
//                       </div>
//                     </div>
//                     <p className="text-sm mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>
//     </div>
//   );
// };

// export default DiscoveringTalent;

// import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";
import { IoMdTime } from "react-icons/io";

const cardsData = [
  {
    id: 1,
    name: "Carl Henderson",
    role: "Full Stack Developer",
    img: "https://i.pinimg.com/736x/93/64/ad/9364ad2e48775eabaa435aa8f908667a.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "UI/UX Designer",
    img: "https://i.pinimg.com/736x/93/64/ad/9364ad2e48775eabaa435aa8f908667a.jpg",
  },
];

const DiscoveringTalent = () => {
  return (
    <div className="relative pt-20 flex px-14 py-14 items-center">
      {/* background color div's */}
      <div className="absolute inset-0  h-full w-full z-0">
        {/* Top-Left */}
        <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

        {/* Bottom-Left */}
        <div className="absolute -left-[30%] -top-[80%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div>
        
        {/* Bottom-Right */}
        <div className="absolute -right-[60%] -bottom-[90%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute -right-[15%] -bottom-[100%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div>
      </div>
      {/* Left Text Section */}
      <div className="flex flex-col items-start justify-center gap-5 w-[67%] px-16">
        <h1 className="font-jakarta font-semibold text-6xl leading-20">
          Find the Right People To Build & Grow Your{" "}
          <span className="text-[#7C5CFC]">Next Big Thing</span>
        </h1>
        <p className="mt-2 text-2xl font-light text-[#596780] w-[75%]">
          Whether you're looking for top talent to grow your business or the
          perfect co-founder to start your next venture, we connect you with
          like-minded professionals ready to bring ideas to life.
        </p>
        <p className="text-[#7C5CFC] font-medium text-2xl mt-4">
          Start Discovering People with Talent
        </p>
        <button className="text-white text-lg flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#7C5CFC]">
          Discover now <MdOutlineArrowOutward />
        </button>
      </div>
      <div className="relative h-[500px] overflow-hidden flex items-center justify-center p-5">
        <motion.div
          className="flex flex-col space-y-6"
          animate={{ y: ["34%", "-17%"] }} // scroll halfway (because duplicated)
          transition={{ ease: "linear", duration: 8, repeat: Infinity }}
          style={{ willChange: "transform" }}
        >
          {[...cardsData, ...cardsData].map((card, i) => (
            <div
              key={i}
              className={`w-[360px] p-6 bg-white shadow-lg rounded-4xl hover:scale-105 transition-all duration-300 `}
            >
              <div className="flex justify-between px-2 items-center">
                <div className="flex gap-3">
                  <img
                    className="w-14 h-14 object-cover object-top rounded-full overflow-hidden"
                    src={card.img}
                    alt="Profile"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <h3 className="text-md font-bold">{card.name}</h3>
                    <p className="text-sm text-gray-400">{card.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">On Site</p>
              </div>
              <div className="flex flex-col items-start justify-center mt-4">
                <p className="text-gray-500 text-xs">Role</p>
                <div className="flex">
                  <p className="text-sm font-bold">{card.role}</p>
                  <div className="text-sm flex items-center gap-1 ml-2 text-gray-500">
                    <IoMdTime />
                    <p>On time</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <p className="text-gray-500 text-xs">Skills Required</p>
                <div className="flex gap-2 flex-wrap">
                  <p className="text-sm font-bold border-2 border-[#7C5CFC] rounded-full px-3">
                    React
                  </p>
                  <p className="text-sm font-bold border-2 border-[#7C5CFC] rounded-full px-3">
                    React
                  </p>
                  <p className="text-sm font-bold border-2 border-[#7C5CFC] rounded-full px-3">
                    React
                  </p>
                </div>
              </div>
              <p className="text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim.
              </p>
              <div className="flex justify-center gap-2 mt-8">
                <button className="text-white px-6 py-2 text-sm rounded-full bg-[#7C5CFC] border border-[#7C5CFC]">
                  View Profile
                </button>
                <button className="px-6 py-2 text-sm rounded-full border">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DiscoveringTalent;