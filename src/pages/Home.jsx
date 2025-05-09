import Discount from "../components/Discount";
import HomePageBestsellers from "../components/HomePageBestsellers";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <HomePageBestsellers />
      <Discount />
    </div>
  )
}

export default Home;