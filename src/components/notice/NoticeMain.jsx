import NoticeHeader from "./NoticeHeader";
import NoticeBody from "./NoticeBody";
// import NoticeCard from "./NoticeCard";
import { motion } from "framer-motion";

const NoticeMain = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="pt-8 xl:pt-20 max-sm:pt-4 flex gap-5 flex-wrap max-sm:block lg:justify-between mx-auto w-full min-h-[600px]"
    >
      <div className="w-full">
        <NoticeHeader />
        <NoticeBody />
      </div>
      {/* <div className="sm:w-[48%] md:w-[48%] flex-shrink-0 lg:w-[45%]">
        <NoticeCard />
      </div> */}
    </motion.div>
  );
};

export default NoticeMain;
