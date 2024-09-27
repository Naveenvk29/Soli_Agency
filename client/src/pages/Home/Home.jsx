import Marquee from "../../components/Marquee";
import About from "../About";
const Home = () => {
  return (
    <div className="  flex flex-col gap-5">
      <div
        className="flex max-w-screen-xl h-[72vh] mx-auto justify-center items-center gap-20 my-10"
        // className="flex flex-col gap-10 h-screen overflow-hidden bg-gradient-to-b from-blue-800 to-indigo-900"
        // style={{
        //   backgroundImage:
        //     "url('https://www.usbiopower.com/hs-fs/hubfs/Blog%20Art/AOE-Blog-Organic-Soil.jpg?width=1280&name=AOE-Blog-Organic-Soil.jpg')",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <div className="w-[60%] ">
          <h1 className="text-5xl font-black leading-normal tracking-widest">
            Welcome to Soli Farming!
          </h1>

          <p className="text-xl my-2 font-medium text-balance ">
            Soli Farming is a non-profit organization dedicated to sustainable
            farming practices. Our mission is to create a more sustainable,
            equitable, and accessible way to grow our own produce.
          </p>
          <p className="text-lg my-2">
            You can explore various sections like soil, distributors, and more.
          </p>
          <p>Enjoy your stay!</p>
        </div>
        <div className="w-[50%] ">
          <img
            className="rounded-2xl"
            src="https://www.antaraag.ca/wp-content/uploads/2021/05/EE18-soil-health-regenerative-ag-getty.png"
            alt=""
          />
        </div>
      </div>
      <Marquee />
      <About />
    </div>
  );
};

export default Home;
