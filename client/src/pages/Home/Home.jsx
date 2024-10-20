import Marquee from "../../components/Marquee";
import About from "../About";
const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row max-w-screen-xl h-auto lg:h-[72vh] mx-auto justify-center items-center gap-10 lg:gap-20 my-10">
        <div className="w-full lg:w-[60%]">
          <h1 className="text-4xl lg:text-5xl font-black leading-snug lg:leading-normal tracking-widest text-center lg:text-left">
            Welcome to Soli Farming!
          </h1>
          <p className="text-lg lg:text-xl my-2 font-medium text-center lg:text-left">
            Soli Farming is a non-profit organization dedicated to sustainable
            farming practices.
          </p>
          <p className="text-sm lg:text-lg my-2 text-center lg:text-left">
            Explore various sections like soil, distributors, and more.
          </p>
        </div>
        <div className="w-full lg:w-[50%]">
          <img
            className="rounded-2xl w-full h-auto"
            src="https://www.antaraag.ca/wp-content/uploads/2021/05/EE18-soil-health-regenerative-ag-getty.png"
            alt="Soil farming"
          />
        </div>
      </div>
      <Marquee />
      <About />
    </div>
  );
};

export default Home;
