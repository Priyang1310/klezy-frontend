import { useState } from "react";
import { PiNumberOneBold, PiNumberTwoBold, PiNumberThreeBold  } from "react-icons/pi";
const steps = [
  {
    id: 1,
    title: "Register your Klezy account.",
    description:
      "Find developers, designers, marketers, and more who fit your vision.",
    image: "https://i.pinimg.com/736x/7a/3e/b5/7a3eb5fd2b553e992e34c2a56b082827.jpg",
    number: <PiNumberOneBold />,
  },
  {
    id: 2,
    title: "Register your Klezy account.",
    description:
      "Find developers, designers, marketers, and more who fit your vision.",
    image: "https://i.pinimg.com/736x/70/63/5a/70635ae93da43d358bbe1bca3e48706a.jpg",
    number: <PiNumberTwoBold />,
  },
  {
    id: 3,
    title: "Register your Klezy account.",
    description:
      "Find developers, designers, marketers, and more who fit your vision.",
    image: "https://i.pinimg.com/736x/48/87/fc/4887fc9ddb46662d910925ed71b31ab8.jpg",
    number: <PiNumberThreeBold />,
  },
  {
    id: 4,
    title: "Register your Klezy account.",
    description:
      "Find developers, designers, marketers, and more who fit your vision.",
    image: "https://i.pinimg.com/736x/70/63/5a/70635ae93da43d358bbe1bca3e48706a.jpg",
    number: <PiNumberTwoBold />,
  },
  {
    id: 5,
    title: "Register your Klezy account.",
    description:
      "Find developers, designers, marketers, and more who fit your vision.",
    image: "https://i.pinimg.com/736x/48/87/fc/4887fc9ddb46662d910925ed71b31ab8.jpg",
    number: <PiNumberThreeBold />,
  },
];

export default function Steps() {
  const [selected, setSelected] = useState(1);
  const [hovered, setHovered] = useState(null);

  const currentImage = steps.find((s) => s.id === (hovered ?? selected)).image;

  return (
    <div className="relative flex flex-col items-center justify-center py-10 mx-20 my-10 p-10 ">
      {/* background color div's */}
      <div className="absolute inset-0  h-full w-full z-0">
        {/* Top-Left */}
        {/* <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}

        {/* Top-Right */}
        {/* <div className="absolute -right-[45%] top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div> */}

        {/* Bottom-Left */}
        <div className="absolute -left-[40%] -top-[20%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div>
        <div className="absolute left-[10%] top-[70%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

        {/* Bottom-Right */}
        <div className="absolute -right-[65%] top-[30%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute -right-[30%] -bottom-[32%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div>
      </div>


      <div className="flex justify-between items-center gap-10 z-10">
        <div className="flex flex-col items-start justify-center w-[55%] p-10">
          <h1 className="text-[2.8vw] font-semibold">Get Started in Minutes</h1>
          <h1 className="text-[2.8vw] font-semibold text-[#7C5CFC]">Find & Connect Effortlessly!</h1>
        </div>
        <div className="flex items-end w-[50%] px-5">
          <p className="text-gray-500 text-[1.4vw] font-light tracking-tighter">
          Build your dream team or get discovered for your skills in just a few simple steps. No endless messages, no confusion—just instant, meaningful connections!
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between items-center p-10 z-10">
        {/* Left Side - Image */}
        <div className="w-[50%] flex justify-center">
          <img
            src={currentImage}
            alt="Selected Step"
            className="w-[50vw] h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Steps */}
        <div className="w-[40%]">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setSelected(step.id)}
              onMouseEnter={() => setHovered(step.id)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-start p-4 border-b-8 border-b-white rounded-lg text-left hover:bg-violet-100 w-[80%] transition-all ${
                selected === step.id
                  ? "bg-violet-100 border-l-4 border-[#7C5CFC]"
                  : "bg-transparent"
              }`}
            >
              <div className="mx-auto flex flex-col items-start justify-center gap-3">
                {/* <span
                  className={`rounded-full mr-3 p-1 ${
                    selected === step.id ? "bg-violet-500" : "bg-gray-300"
                  }`}
                >{step.number}</span> */}
                <div className="flex items-center gap-4">
                <img src="./user.svg" alt="" />
                  <h3
                    className={`font-semibold text-[1.4vw] ${
                      selected === step.id ? "text-[#7C5CFC]" : "text-black"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
                  <p className="text-gray-500 text-md">{step.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-stretch justify-center gap-10 py-10 z-10">
        <div className="flex items-center bg-white px-4 py-7 w-[37%] gap-3 rounded-3xl shadow-2xl tracking-tighter" style={{border: "2px solid rgba(0, 0, 0, 0.05)"}}>
          <img src="./tick.svg" alt="" className="w-8 h-8" />
          <p className="text-xl font-semibold">No subscription fees – pay only for the connections you need</p>
        </div>
        <div className="flex items-center bg-white px-4 py-7 w-[37%] gap-3 rounded-3xl shadow-2xl tracking-tighter" style={{border: "2px solid rgba(0, 0, 0, 0.05)"}}>
          <img src="./tick.svg" alt="" className="w-8 h-8" />
          <p className="text-xl font-semibold">Verified profiles for genuine collaborations</p>
        </div>
        <div className="flex items-center bg-white px-4 py-7 w-[37%] gap-3 rounded-3xl shadow-2xl tracking-tighter" style={{border: "2px solid rgba(0, 0, 0, 0.05)"}}>
          <img src="./tick.svg" alt="" className="w-8 h-8" />
          <p className="text-xl font-semibold">Perfect for startups, businesses, and individuals looking to grow</p>
        </div>
      </div>
    </div>
  );
}
