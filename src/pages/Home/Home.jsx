// Home Page is Done. Nothing is required for change anything. Don't change anything.
import Navbar from "../../components/Home/Navbar";
import Hero from "../../components/Home/Hero";
import DiscoveringTalent from "../../components/Home/DiscoveringTalent";
import GetingDisscovered from "../../components/Home/GetingDisscovered";
import FindRightPeople from "../../components/Home/FindRightPeople";
import Features from "../../components/Home/Features";
import FindAndGet from "../../components/Home/FindAndGet";
import Steps from "../../components/Home/Steps";
import Pricing from "../../components/Home/Pricing";
const Home = () => {
    return (
        <div className="w-full min-h-screen bg-white overflow-hidden">
            <Navbar />
            <Hero />
            <DiscoveringTalent />
            <GetingDisscovered />
            <FindRightPeople />
            <Features />
            <FindAndGet />      
            <Steps /> 
            <Pricing /> 
        </div>
    );
};

export default Home;
