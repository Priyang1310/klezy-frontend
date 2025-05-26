
const img1 =
  "https://i.pinimg.com/736x/44/f2/c2/44f2c2b7f53a2f83d0ade6f95ea5a960.jpg";
const img2 =
  "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img3 =
  "https://i.pinimg.com/736x/22/8b/cf/228bcf5a0800f813cd1744d4ccbf01ea.jpg";
const img4 =
  "https://i.pinimg.com/736x/f9/c6/52/f9c652885dce8e483f3f3c517f8aeed0.jpg";
const img5 =
  "https://i.pinimg.com/736x/e7/1c/60/e71c603d1543b8a57b158ffef94a074c.jpg";
const img6 =
  "https://i.pinimg.com/736x/ac/18/07/ac1807061f437bc33eadaf99fd01bd5a.jpg";

function Hero() {
  return (
    // The Hero section contains a heading, a paragraph, and two buttons
    <div className="relative w-full min-h-screen  flex flex-col justify-center items-center py-10">
      {/* below div is having 4 background images and I amd unable to fix their positioning */}
      <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
        
        <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
      </div>
      <div className="top-[10%] flex flex-col justify-center items-center gap-5 mb-20 z-10">
        <h1 className="text-7xl leading-[97.20px] font-semibold text-center">
          Elevate Your Network
        </h1>
        <h1 className="text-7xl  font-semibold text-center text-[#7C5CFC] ">
          Discover Talent or Get Discovered
        </h1>

        <p className="text-2xl font-light text-center w-[65%] pb-10 text-[#90A3BF]">
          your one-stop plartform to find the right people, build powerfull
          connections, and turn ideas into reality. Find, Connect, Build!
        </p>
        <div className="flex justify-center items-center gap-7 text-lg font-medium">
          <button className="border-2 border-[#7C5CFC] bg-[#7C5CFC] text-white px-4 py-3 rounded-full shadow-md cursor-pointer">
            Discover Talent
          </button>
          <button className="border-2 px-4 py-3 rounded-full shadow-md cursor-pointer">
            Get Discovered
          </button>
        </div>
      </div>

      {/* Background image is applied via inline styles */}
      <div className="relative flex justify-center items-center w-full py-40">
        <div>
          <img
            src="./Vector11.svg"
            alt="Vector1 is not loading"
            className="absolute left-[17%] top-[22%] w-1/3 h-auto"
          />
          <img
            src={img1}
            alt="img1"
            className="absolute left-[20%] -top-[5%] rotate-5 w-22 h-30 object-cover object-top rounded-xl"
          />
          <img
            src={img2}
            alt="img2"
            className="absolute left-[12%] top-[38%] rotate-7 w-22 h-30 object-cover object-top rounded-xl"
          />
          <img
            src={img3}
            alt="img3"
            className="absolute left-[22%] bottom-[15%] -rotate-12 w-22 h-30 object-cover object-top rounded-xl"
          />
        </div>
        <img src="./Logo1.svg" alt="Logo" className="z-10 w-25 h-25" />
        <div>
          <img
            src="./Vector12.svg"
            alt="Vector2 is not loading"
            className="absolute right-[17%] top-[23%]  w-1/3 h-auto"
          />
          <img
            src={img4}
            alt="img4"
            className="absolute right-[20%] -top-[2%] -rotate-5 w-22 h-30 object-cover object-top rounded-xl"
          />
          <img
            src={img5}
            alt="img5"
            className="absolute right-[11%] top-[37%] -rotate-7 w-22 h-30 object-cover object-top rounded-xl"
          />
          <img
            src={img6}
            alt="img6"
            className="absolute right-[22%] bottom-[10%] rotate-12 w-22 h-30 object-cover object-top rounded-xl"
          />
        </div>
        </div>
    </div>
  );
}

export default Hero;
