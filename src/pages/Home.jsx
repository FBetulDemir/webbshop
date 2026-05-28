import Discount from "../components/Discount";
import HomePageBestsellers from "../components/HomePageBestsellers";
import Slider from "../components/Slider";
import USPBar from "../components/USPBar";
import CTABanner from "../components/CTABanner";

const Home = () => {
  return (
    <div>
      <Slider />
      <USPBar />
      <HomePageBestsellers />
      <Discount />
      <CTABanner />
    </div>
  );
};

export default Home;
