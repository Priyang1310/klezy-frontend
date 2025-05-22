import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Icon for the button
// import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    // Show button when user scrolls down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 z-10 p-3 bg-[#7C5CFC] text-white rounded-full shadow-lg 
                transition-all duration-300 ease-in-out transform hover:scale-125
                ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-90"}
            `}
            style={{
                boxShadow: "0 4px 10px rgba(0, 0, 255, 0.3)",
            }}
        >
            <ArrowUp 
                size={28} 
                className="transition-transform duration-200 group-hover:-translate-y-1" 
            />
        </button>
    );
};

export default ScrollToTopButton;