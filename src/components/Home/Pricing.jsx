import React from "react";
import crown from "../../assets/Home/crown.svg";
import lovely from "../../assets/Home/lovely.svg";
import share from "../../assets/Home/share.svg";
import tick from "../../assets/Home/tick-circle.svg";

const Pricing = () => {
  return (
    <div className="relative w-full min-h-screen  flex flex-col justify-center items-center py-10">
      {/* background color div's */}
      <div className="absolute inset-0  h-full w-full z-0">
        {/* Top-Left */}
        {/* <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}

        {/* Top-Right */}
        {/* <div className="absolute -right-[45%] top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div> */}

        {/* Bottom-Left */}
        <div className="absolute -left-[20%] -bottom-[17%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div>
        <div className="absolute left-[20%] top-[60%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

        {/* Bottom-Right */}
        <div className="absolute -right-[45%] top-[35%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        {/* <div className="absolute -right-[30%] -bottom-[40%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div> */}
        <div className="absolute -right-[55%] -bottom-[40%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>


      <div className="flex flex-col text-[3.4vw] font-semibold text-center justify-center items-center">
        <h1>
          Simple & <span className="text-[#7C5CFC]">Transparent Pricing</span>
        </h1>
        <h1>No Subscriptions, Just Meaningful Connections!</h1>
        <p className="text-[1.4vw] text-[#596780] py-2 font-light tracking-tight">
          Tired of expensive monthly subscriptions for hiring and networking
          platforms?
        </p>
      </div>
      <p className="text-2xl text-[#7C5CFC] py-8 mt-10 font-semibold">
        We believe you should only pay when it matters.
      </p>
      <p className="text-xl font-medium">HOW IT WORKS</p>
      {/* white div which shows 3 steps */}
      <div className="bg-white rounded-[2vw] shadow-xl py-4 px-8 flex flex-col items-start justify-center z-10">
        <div className="flex items-center py-5">
          <div className="h-12 w-12 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center text-2xl font-medium">
            1
          </div>
          <p className="text-[1.4vw] tracking-tighter font-semibold px-4">
            Your First Connection is Free –{" "}
            <span className="font-normal">
              Experience the platform risk-free.
            </span>
          </p>
        </div>
        <div className="flex items-center py-5">
          <div className="h-12 w-12 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center text-2xl font-medium">
            2
          </div>
          <p className="text-[1.4vw] tracking-tighter font-semibold px-4">
            Buy Credits & Connect –{" "}
            <span className="font-normal">
              Every connection costs credits, so you only pay for real, valuable
              interactions.
            </span>
          </p>
        </div>
        <div className="flex items-center py-5">
          <div className="h-12 w-12 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center text-2xl font-medium">
            3
          </div>
          <p className="text-[1.4vw] tracking-tighter font-semibold px-4">
            No Recurring Charges –{" "}
            <span className="font-normal">
              Use your credits at your own pace, no pressure!
            </span>
          </p>
        </div>
      </div>
      {/* Below is text between cards and steps white div */}
      <div className="flex flex-col text-[2.9vw] font-semibold text-center justify-center items-center mt-14 tracking-tight py-10 gap-5">
        <h1>
          Ready to <span className="text-[#7C5CFC]">Get Started ?</span>
        </h1>
        <p className="text-[1.5vw] text-[#596780]  font-light">
          Pricing Plans (Designed for Maximum Flexibility)
        </p>
      </div>
      {/* Below is pricing cards */}
        <div className="flex flex-col md:flex-row gap-[24px] justify-center items-center mt-10 z-10">
          <div className="bg-white rounded-[1.5vw] shadow-xl px-8 py-7 w-[384px] h-[470px] flex flex-col items-start justify-between hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-2">
              <img src={lovely} alt="" />
              <h1 className="text-[2.4vw] font-medium">Free</h1>
            </div>
            <p className="text-base text-[#596780] font-light">
              Perfect plan to get started
            </p>
            <p className="text-lg text-[#596780] font-semibold flex items-center gap-2 py-5">
              <span
                className="text-4xl text-black font-semibold"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                ₹0
              </span>
              /Connection
            </p>
            <p className="text-base font-medium">
              Get Started with Your First Match!
            </p>
            <div className="flex items-center gap-2 py-10">
              <img src={tick} alt="" />
              <h1 className="text-xl font-medium">1 Connection</h1>
            </div>
            <button className="w-[320px] h-[52px] bg-[#7C5CFC] rounded-full text-white font-medium text-base">
              Get Your Free Plan
            </button>
          </div>
          <div className="bg-white rounded-[1.5vw] shadow-xl px-8 py-6 w-[384px] h-[470px] flex flex-col items-start justify-between hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-3">
                <img src={crown} alt="" />
                <h1 className="text-[2.4vw] font-medium">Pro</h1>
              </div>
              <div className="bg-black text-white rounded-full text-md font-light text-center py-1.5 px-4">
                Popular
              </div>
            </div>
            <p className="text-base text-[#596780] font-light">
              Perfect plan for professionals!
            </p>
            <p className="text-lg text-[#596780] font-semibold flex items-center gap-2 py-5">
              <span
                className="text-4xl text-black font-semibold"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                ₹100
              </span>
              /Connection
            </p>
            <p className="text-base font-medium">
              Save 30% vs. Single Purchase
            </p>
            <div className="flex items-center gap-2 py-10">
              <img src={tick} alt="" />
              <h1 className="text-xl font-medium">5 Connection</h1>
            </div>
            <button className="w-[320px] h-[52px] bg-[#7C5CFC] rounded-full text-white font-medium text-base">
              Get Started
            </button>
          </div>
          <div className="bg-white rounded-[1.5vw] shadow-xl px-8 py-6 w-[384px] h-[470px] flex flex-col items-start justify-between hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-3">
                <img src={share} alt="" />
                <h1 className="text-[2.4vw] font-medium">Ultimate</h1>
              </div>
              <div className="bg-black text-white rounded-full text-md font-light text-center py-1.5 px-4">
                Best Value
              </div>
            </div>
            <p className="text-base text-[#596780] font-light">
              Best suits for great company!
            </p>
            <p className="text-lg text-[#596780] font-semibold flex items-center gap-2 py-5">
              <span
                className="text-4xl text-black font-semibold"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                ₹90
              </span>
              /Connection
            </p>
            <p className="text-base font-medium">Best Value!</p>
            <div className="flex items-center gap-2 py-10">
              <img src={tick} alt="" />
              <h1 className="text-xl font-medium">10 Connection</h1>
            </div>
            <button className="w-[320px] h-[52px] bg-[#7C5CFC] rounded-full text-white font-medium text-base">
              Get Started
            </button>
          </div>
        </div>
      <p className="text-2xl text-[#7C5CFC] py-10 mt-5 font-semibold tracking-tight">
        Need More? Buy Additional Credits Anytime!
      </p>
      <p className="text-[1.6vw] font-bold tracking-tighter mt-6">Why This is Better Than a Subscription?</p>
      {/* Below is 3 divs which I don't know why exists ? */}
      <div className="flex flex-wrap items-stretch justify-center gap-10 py-10 mx-10 z-10">
        <div className="flex items-center bg-white px-4 py-8 w-[37%] gap-5 rounded-3xl shadow-blue-100 shadow-2xl" style={{border: "2px solid rgba(0, 0, 0, 0.05)"}}>
          <img src={tick} alt="" className="w-8 h-8" />
          <p className="text-lg font-medium">
            No Monthly Fees – Don’t waste money when you don’t need connections.
          </p>
        </div>
        <div className="flex items-center bg-white px-4 py-8 w-[37%] gap-5 rounded-3xl shadow-blue-100 shadow-2xl" style={{border: "2px solid rgba(0, 0, 0, 0.05)"}}>
          <img src={tick} alt="" className="w-8 h-8" />
          <p className="text-lg font-medium">
            Only Pay for What You Use – Your credits never expire!
          </p>
        </div>
        <div className="flex items-center bg-white px-4 py-8 w-[37%] gap-5 rounded-3xl shadow-blue-100 shadow-2xl" style={{border: "2px solid rgba(0, 0, 0, 0.05)"}}>
          <img src={tick} alt="" className="w-8 h-8" />
          <p className="text-lg font-medium">
            100% Transparency – No hidden costs, no premium tiers just straightforward pricing.
          </p>
        </div>
      </div>
      <p className="text-[1.7vw] tracking-tight font-medium text-[#7C5CFC] mt-8">Start for Free & Make Your First Connection Today!</p>
      <div className='flex items-center justify-center my-10 text-[1.1vw] tracking-tight'>
            <button className='bg-[#7C5CFC] text-white border-2 border-[#7C5CFC] font-medium px-5 py-3 rounded-full hover:bg-white hover:text-[#7C5CFC] transition-all duration-300'>Disccover Talent</button>
            <button className='bg-white text-black font-medium px-5 py-3 rounded-full border-2 border-black hover:bg-[#7C5CFC] hover:border-[#7C5CFC] hover:text-white transition-all duration-300 ml-5'>Get Discovered</button>
        </div>
    </div>
  );
};

export default Pricing;
