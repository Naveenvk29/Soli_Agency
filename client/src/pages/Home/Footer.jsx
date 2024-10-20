import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <>
      <hr className="mt-20 mb-5 max-w-screen-xl mx-auto border-gray-600" />
      <div className="flex flex-col md:flex-row w-full justify-around items-center p-8 text-gray-500">
        <div className="w-full md:w-auto mb-8 md:mb-0">
          <a href="/">
            <img src={logo} alt="Logo" className=" md:w-52" />
          </a>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-20 w-full md:w-auto justify-between items-start">
          <div className="flex flex-col gap-4">
            <a href="#">
              <i className="mr-2 ri-linkedin-box-fill"></i>LinkedIn
            </a>
            <a href="#">
              <i className="mr-2 ri-twitter-x-fill"></i>Twitter
            </a>
            <a href="#">
              <i className="mr-2 ri-instagram-line"></i>Instagram
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="/">Home</a>
            <a href="/distributors">Distributors</a>
            <a href="/soil">Soils</a>
            <a href="/about">About</a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#">Careers</a>
            <a href="#">Press Releases</a>
            <a href="#">Press Kit</a>
          </div>
        </div>
      </div>
      <hr className="max-w-screen-xl mx-auto my-8 border-gray-600" />
      <div>
        <p className="text-center text-zinc-500 font-semibold mb-5">
          © Copyright 2024. All Rights Reserved by Naveen Vinod Kumar.
        </p>
      </div>
    </>
  );
};

export default Footer;
