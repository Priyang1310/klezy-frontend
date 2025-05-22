import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiCubeFill } from "react-icons/pi";
// import { GoArrowUpRight } from "react-icons/go";
// import { BiLogIn } from "react-icons/bi";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (             
    // in nav, there is one property given "-mt-10". take care of that.                     
    <nav className="h-[100px] bg-[#F8F6FF] w-full px-28 grid grid-cols-3 border-b-2 border-violet-400">
      {/* Logo */}
      <div className="flex items-center justify-start px-5 gap-3">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <PiCubeFill className="scale-x-[-1] text-3xl" />
        </Link>
        <h1 className="text-3xl font-semibold -tracking-tighter">Klezy</h1>
      </div>

      <div className="flex items-center justify-center space-x-14 flex-nowrap text-xl font-medium">
        <Link
          to="/"
          className="whitespace-nowrap"
        >
          How it works
        </Link>
        <button
          onClick={() => scrollToSection("AboutUs")}
          className="whitespace-nowrap"
        >
          Pricing
        </button>
        <button
          onClick={() => scrollToSection("ContactUs")}
          className="whitespace-nowrap"
        >
          About Us
        </button>
        <button
          onClick={() => scrollToSection("AboutUs")}
          className="whitespace-nowrap"
        >
          Contact Us
        </button>
      </div>

      {/* Search Bar */}
      <div className=" relative flex justify-end items-center gap-1">
        <button
          onClick={() => navigate('/login')}
          className="text-xl font-medium px-7 py-3"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signin')}
          className="bg-[#7C5CFC] text-white text-lg font-medium border-2 hover:shadow-md hover:shadow-violet-400 border-[#7C5CFC] px-8 py-3 rounded-full"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
