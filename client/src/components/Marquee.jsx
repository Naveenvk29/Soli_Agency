import { motion } from "framer-motion";

const Marquee = () => {
  motion;
  return (
    <div className="w-full py-10  bg-[#3a5a21]">
      <div className="text border-t-2 border-b-2 border-zinc-400 flex overflow-hidden whitespace-nowrap">
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 5 }}
          className="text-[5vw] leading-none tracking-wider  uppercase  -mb-[1vw]  font-semibold pr-10"
        >
          Protect soil, nurture life!{" "}
        </motion.h1>
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 5 }}
          className="text-[5vw] leading-none tracking-wider uppercase font-semibold pr-10"
        >
          Protect soil, nurture life!
        </motion.h1>
      </div>
    </div>
  );
};

export default Marquee;
