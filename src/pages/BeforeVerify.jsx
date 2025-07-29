import React, { use } from "react";
import { motion } from "framer-motion";
import { useStateContext } from "../context/ContextProvider";

const BeforeVerify = () => {
    const {email} = useStateContext();
    const userEmail = email || ""; // Fallback to empty string if email is not set
    const getInboxLink = (email) => {
    if (!email) return "https://mail.google.com/mail/u/0/#inbox"; // fallback

    const domain = email.split("@")[1].toLowerCase();

    if (domain.includes("gmail")) {
      return "https://mail.google.com/mail/u/0/#inbox";
    } else if (domain.includes("yahoo")) {
      return "https://mail.yahoo.com/";
    } else if (domain.includes("outlook") || domain.includes("hotmail") || domain.includes("live")) {
      return "https://outlook.live.com/mail/inbox";
    } else {
      return "mailto:"; // fallback to open default mail app
    }
  };

  const inboxLink = getInboxLink(userEmail);

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-[#aae7ff]  to-contestLight p-6 px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-[50%] w-full text-center"
      >
        <motion.h1
          className="text-3xl font-bold mb-4 text-gray-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Verify Your Email
        </motion.h1>
        <motion.p
          className="text-gray-500 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          We’ve sent a verification link to your inbox. Click the button below to open your mail.
        </motion.p>

        <motion.a
          href={inboxLink}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-headerColor hover:bg-headerColorHover text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
        >
          Open Mail
        </motion.a>
      </motion.div>
    </div>
  );
};

export default BeforeVerify;
