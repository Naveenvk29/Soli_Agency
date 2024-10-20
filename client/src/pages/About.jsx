const About = () => {
  return (
    <div className="max-w-screen-xl mt-8 mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-32 h-auto lg:h-[80vh] px-4 md:px-8 lg:px-16">
      <div className="w-full md:w-[45%] lg:w-[40%] mb-8 md:mb-0">
        <img
          className="w-full object-cover rounded-3xl"
          src="https://t3.ftcdn.net/jpg/05/76/35/68/360_F_576356840_0T0W4HRXm13YiP0MgCdpbmz7BF4v1lQv.jpg"
          alt="Soli Farming"
        />
      </div>
      <div className="w-full md:w-[55%] lg:w-[50%]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left">
          About Us
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-white mt-4 text-center md:text-left">
          Soli Farming is a non-profit organization dedicated to sustainable
          farming practices. Our mission is to create a more sustainable,
          equitable, and accessible way to grow our own produce.
        </p>
        <p className="text-sm md:text-base lg:text-lg text-zinc-300 mt-4 text-center md:text-left">
          We are committed to supporting local businesses, farmers, and
          community members by providing them with the tools and resources they
          need to thrive in a sustainable way.
        </p>
        <p className="text-sm md:text-base lg:text-lg text-zinc-300 mt-4 text-center md:text-left">
          We are committed to supporting local businesses, farmers, and
          community members by providing them with the tools and resources they
          need to thrive in a sustainable way.
        </p>
      </div>
    </div>
  );
};

export default About;
