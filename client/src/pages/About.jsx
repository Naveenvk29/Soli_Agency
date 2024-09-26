const About = () => {
  return (
    <div className="max-w-screen-xl mt-8 mx-auto flex items-center justify-center gap-32 h-[80vh]">
      <div className="w-[40%]">
        <h1 className="text-5xl font-bold text-white">About Us</h1>
        <p className="text-lg text-white mt-4">
          Soli Farming is a non-profit organization dedicated to sustainable
          farming practices. Our mission is to create a more sustainable,
          equitable, and accessible way to grow our own produce.
        </p>
        <p className="text-lg text-zinc-300 mt-4">
          We are committed to supporting local businesses, farmers, and
          community members by providing them with the tools and resources they
          need to thrive in a sustainable way.
        </p>
        <p className="text-lg text-zinc-300 mt-4">
          We are committed to supporting local businesses, farmers, and
          community members by providing them with the tools and resources they
          need to thrive in a sustainable way.
        </p>
      </div>
      <div className="w-[40%] ">
        <img
          className="w-[100%] object-cover rounded-3xl "
          src="https://t3.ftcdn.net/jpg/05/76/35/68/360_F_576356840_0T0W4HRXm13YiP0MgCdpbmz7BF4v1lQv.jpg"
          alt="Soli Farming"
        />
      </div>
    </div>
  );
};

export default About;
