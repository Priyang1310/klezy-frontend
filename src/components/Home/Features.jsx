// import React from 'react'
import v1 from "../../assets/Home/SuccessStories1.svg"
import v2 from "../../assets/Home/SuccessStories2.svg"
import v3 from "../../assets/Home/SuccessStories3.svg"
import v4 from "../../assets/Home/SuccessStories4.svg"

const Features = () => {
  return (
    <div className='relative flex flex-col items-center justify-center'>
        {/* background color div's */}
      <div className="absolute inset-0  h-full w-full z-0">
        {/* Top-Left */}
        {/* <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div> */}
        
        {/* Top-Right */}
        <div className="absolute -right-[60%] top-[35%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
        
        {/* Bottom-Left */}
        <div className="absolute -left-[30%] bottom-[15%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div>
        <div className="absolute left-[10%] top-[85%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Bottom-Right */}
        <div className="absolute -right-[50%] top-[60%] w-[967px] h-[967px] opacity-10 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        {/* <div className="absolute -right-[15%] -bottom-[100%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500  z-0"></div> */}
      </div>



        <div className="flex flex-col items-center mx-8 my-4 font-semibold leading-15 mt-10 font-sans text-center tracking-tighter" >
            <h1 className="text-[3.7vw] py-3 " style={{ wordSpacing: '-0.2em' }}>Beyond Hiring – Find, Connect, and </h1>
            <h1 className="text-[3.7vw] mb-6" style={{ wordSpacing: '-0.2em' }}>Work with <span className="text-violet-600">Like-Minded People</span> on Shared Visions!</h1>
            <p className="text-2xl text-[#596780]" style={{fontWeight: "400"}}>Klezy isn’t just another job board—it’s a place to find the right people to build and grow with.</p>
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* Below is 1st section */}
        <div className='flex items-center justify-evenly py-15'>
            <div className='flex flex-col items-center justify-center w-[40%] gap-8'>
                <h1 className='text-black font-bold text-[2.7vw] leading-15'>No More Endless Messages – 
                Find the Right People Instantly!</h1>
                <p className='text-[1.5vw] text-[#596780]'>Stop wasting time messaging back and forth to ask about skills, roles, or work preferences. Whether you're looking for talent to build with or want to get discovered for your expertise, our platform provides all the details upfront. Connect instantly with people who align with your vision—effortlessly and meaningfully!</p>
            </div>
            <img src={v1} alt="" className='scale-110' />
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* Below is 2nd section */}
        <div className='flex items-center justify-evenly py-15'>
            <img src={v2} alt="" className='scale-110' />
            <div className='flex flex-col items-center justify-center w-[40%] gap-8'>
                <h1 className='text-black font-bold text-[2.7vw] leading-15'>Find People Who Work on the Same Terms as You!</h1>
                <p className='text-[1.5vw] text-[#596780]'>Looking for talent that fits your work conditions? Whether it’s stipend, salary, partnership, equity, or remote work, filter and connect only with those who match your terms. No more back-and-forth—just the right opportunities with the right people!`</p>
            </div>
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* Below is 3rd section */}
        <div className='flex items-center justify-evenly py-15'>
            <div className='flex flex-col items-center justify-center w-[40%] gap-8'>
                <h1 className='text-black font-bold text-[2.7vw] leading-15'>Showcase Your Skills & Connect 
                with the Right Opportunities!</h1>
                <p className='text-[1.5vw] text-[#596780]'>Want to work on your terms? Whether you're seeking an equity-based role, a partnership, an internship, or full-time work, get discovered by people who align with your vision. No endless messages—just meaningful connections that fit your goals!</p>
            </div>
            <img src={v3} alt="" className='scale-110' />
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* Below is 4th section */}
        <div className='flex items-center justify-evenly py-15'>
            <img src={v4} alt="" className='scale-110' />
            <div className='flex flex-col items-center justify-center w-[40%] gap-8'>
                <h1 className='text-black font-bold text-[2.7vw] leading-15'>Verified Profiles, Genuine 
                Connections!</h1>
                <p className='text-[1.5vw] text-[#596780]'>We ensure that all profiles are verified and authentic, giving you a trustworthy space to connect with the right people. No fake accounts, no uncertainty—just real opportunities with real professionals!</p>
            </div>
        </div>
        <h1 className='text-[#7C5CFC] font-semibold text-[1.7vw] w-[50%] text-center py-4 capitalize tracking-tight'>Try first connection for free. No Subscriptions. No Hidden Fees.
        Connect on Your Terms with Pay-as-You-Go Pricing!</h1>
        <div className='flex items-center justify-center gap-6 m-10 text-lg font-medium tracking-tight'>
            <button className='bg-[#7C5CFC] hover:bg-white text-white hover:text-black border-2 border-[#7C5CFC] transition-all duration-300  rounded-full px-5 py-3'>Discover Talent</button>
            <button className='text-black hover:text-white border-2 hover:bg-[#7C5CFC] transition-all duration-300  px-5 py-3 rounded-full'>Get Discovered</button>
        </div>
    </div>
  )
}

export default Features