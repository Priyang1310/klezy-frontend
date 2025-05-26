// import React from "react";

const FindAndGet = () => {
  return (
    <div className="relative flex flex-col items-center justify-center mt-28 text-center">
      {/* background color div's */}
      <div className="absolute inset-0  h-full w-full z-0">
        {/* Top-Left */}
        {/* <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}

        {/* Top-Right */}
        <div className="absolute -right-[45%] top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>

        {/* Bottom-Left */}
        {/* <div className="absolute -left-[30%] bottom-[15%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div> */}
        {/* <div className="absolute left-[10%] top-[85%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}

        {/* Bottom-Right */}
        {/* <div className="absolute -right-[50%] top-[60%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
        {/* <div className="absolute -right-[15%] -bottom-[100%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div> */}
      </div>

      <h1 className="font-semibold text-[3.5vw]">
        Find and Get founded{" "}
        <span className="text-[#7C5CFC]">Effortlessly</span>
      </h1>
      <p className="text-[1.5vw] text-[#596780] w-[67%] mt-1 font-light tracking-tight">
        klezy is where Ideas Become Startups, Businesses, and Game-Changing
        Collaborations by Connecting the Right People!
      </p>
      <div className="relative flex justify-evenly items-center w-full py-28 px-28">
        <div
          className="rounded-3xl z-10 w-[376px] h-[214px] bg-white shadow-xl shadow-blue-100 flex flex-col items-center justify-center"
          style={{ border: "2px solid rgba(0, 0, 0, 0.05)" }}
        >
          <img src="./Frame1.svg" alt="Frame1 is not loading" className="scale-105" />
          <h1 className="text-[#7C5CFC] font-semibold text-2xl mb-4">
            Looking for talent?
          </h1>
          <p className="text-[#737373] text-[1.1vw] font-light px-6 py-4">
            Find developers, designers, marketers, and more who fit your vision.
          </p>
        </div>
        <img
          src="./Vector11.svg"
          alt="Vector1 is not loading"
          className="absolute scale-75 left-[21%] top-[24%] w-1/3 h-auto"
        />
        <img src="./Logo1.svg" alt="Logo" className="z-10 w-25 h-25" />
        <img
          src="./Vector12.svg"
          alt="Vector2 is not loading"
          className="absolute scale-75 right-[21%] top-[25%]  w-1/3 h-auto"
        />
        <div
          className="rounded-3xl z-10 w-[376px] h-[214px] bg-white shadow-xl shadow-blue-100 flex flex-col items-center justify-center"
          style={{ border: "2px solid rgba(0, 0, 0, 0.05)" }}
        >
          <img src="./Frame2.svg" alt="Frame2 is not loading" className="scale-105" />
          <h1 className="text-[#7C5CFC] font-semibold text-2xl mb-4">
            Want to be discovered?
          </h1>
          <p className="text-[#737373] text-[1.1vw] font-light px-6 py-4">
            Showcase your skills and let startups & teams find you.
          </p>
        </div>
      </div>
      <h1 className="text-2xl capitalize font-semibold text-[#7C5CFC]">
        Klezy is your gateway to the right people.
      </h1>
      <p className="text-[#596780] text-xl font-light mt-5">
        Find. connect. build.
      </p>
      <div className="flex items-center justify-center my-10">
        <button className="bg-[#7C5CFC] text-white border border-[#7C5CFC] font-medium px-4 py-3.5 rounded-full hover:bg-white hover:text-[#7C5CFC] transition-all duration-300">
          Disccover Talent
        </button>
        <button className="bg-white font-medium px-4 py-3.5 rounded-full border hover:bg-[#7C5CFC] hover:text-white transition-all duration-300 ml-5">
          Get Discovered
        </button>
      </div>
    </div>
  );
};

export default FindAndGet;
