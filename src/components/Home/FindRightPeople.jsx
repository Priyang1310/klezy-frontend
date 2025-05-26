// import React from "react";

const FindRightPeople = () => {
  return (
    <div className="relative flex flex-col items-center m-8 mt-20 font-semibold p-20">
      {/* background color div's */}
      <div className="absolute inset-0  h-full w-full z-0">
        {/* Top-Left */}
        {/* <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
        
        {/* Top-Right */}
        {/* <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div> */}
        {/* <div className="absolute w-[914px] h-[914px] opacity-5 rounded-full border-[100px] border-violet-500 -right-[50%]" /> */}
        
        {/* Bottom-Left */}
        {/* <div className="absolute -left-[30%] -bottom-[70%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div> */}
        <div className="absolute left-[20%] top-[100%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Bottom-Right */}
        {/* <div className="absolute -right-[60%] top-[100%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
        {/* <div className="absolute -right-[15%] -bottom-[100%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div> */}
      </div>


      <h1 className="text-[3.5vw]">
        Find the Right People,{" "}
        <span className="text-[#7C5CFC]">Get Discovered </span>Instantly!
      </h1>
      <p className="text-[#596780] text-[1.4vw] w-[80%] text-center py-2  font-light">
        Great startups aren’t built alone. Whether you’re looking for a
        co-founder, CTO, CFO, or skilled talent to bring your idea to life—or
        you’re a developer, marketer, or strategist searching for the right
        startup to join
      </p>
      <h2 className="text-[1.65vw] text-[#7C5CFC] capitalize mt-1">
        Klezy connects you with like-minded people who share your vision.
      </h2>

      {/* Below is text section  */}
      <div className="flex items-center justify-between mt-10 py-10  w-full">
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* First Image and text section */}
        <div className="flex flex-col items-center justify-center text-center w-1/3">
          {/* image section of first image */}
          <div className="relative">
            <img src="./F1.svg" alt="" />
            <div className="w-15 h-15 text-2xl font-medium rounded-full border-5 border-[#E7E1FF] flex items-center justify-center text-white bg-[#7C5CFC] top-0 left-2 absolute -translate-x-1/2 -translate-y-1/2">
              1
            </div>
          </div>
          {/* Text section for the first image */}
          <div className="flex flex-col items-center justify-center text-[1.4vw] font-medium mt-8 ">
            <p className="font-semibold text-[#7C5CFC]">Have an idea but no funding?</p>
            <p className="">
              Find passionate individuals ready to build with you on an equity
              or partnership basis.
            </p>
          </div>
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* Second Image and text section */}
        <div className="flex flex-col items-center justify-center text-center w-1/3">
          {/* image section of second image */}
          <div className="relative">
            <img src="./F2.svg" alt="" />
            <div className="w-15 h-15 text-2xl font-medium rounded-full border-5 border-[#E7E1FF] flex items-center justify-center text-white bg-[#7C5CFC] top-0 left-2 absolute -translate-x-1/2 -translate-y-1/2">
              2
            </div>
          </div>
          {/* Text section for the second image */}
          <div className="flex flex-col items-center justify-center text-[1.4vw] font-medium mt-8 ">
            <p className="font-semibold text-[#7C5CFC]">Want to be part of something big?</p>
            <p className="w-[78%]">Get discovered by founders and teams looking for your skills.</p>
          </div>
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* Third Image and text section */}
        <div className="flex flex-col items-center justify-center text-center w-1/3">
          {/* image section of third image */}
          <div className="relative">
            <img src="./F3.svg" alt="" />
            <div className="w-15 h-15 text-2xl font-medium rounded-full border-5 border-[#E7E1FF] flex items-center justify-center text-white bg-[#7C5CFC] top-0 left-2 absolute -translate-x-1/2 -translate-y-1/2">
              3
            </div>
          </div>
          {/* Text section for the third image */}
          <div className="flex flex-col items-center justify-center text-[1.4vw] font-medium mt-8 ">
            <p className="font-semibold text-[#7C5CFC]">No more endless messaging!</p>
            <p className="w-[65%]">see all the details upfront and connect instantly!</p>
          </div>
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      </div>
      <h1 className="uppercase text-[#7C5CFC] font-semibold text-[1.1vw] py-5">
        Start Connecting Now!
      </h1>
      <div className="flex items-center justify-between gap-7 mt-10 text-[1.15vw] font-semibold">
        <button className="bg-[#7C5CFC] hover:bg-violet-200 text-white hover:text-[#7C5CFC] transition-all duration-300 border-2 border-[#7C5CFC] py-3.5 px-5 rounded-full">
          Discover Talent
        </button>
        <button className=" hover:text-white border-2 hover:border-[#7C5CFC] hover:bg-[#7C5CFC] transition-all duration-300 py-3.5 px-5 rounded-full">
          Get Discovered
        </button>
      </div>
    </div>
  );
};

export default FindRightPeople;
