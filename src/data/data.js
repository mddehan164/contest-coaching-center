//full homepage Data
// start header from here

import {
  FaEnvelope,
  FaLinkedinIn,
  FaFacebook,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

export const headerData = {
  headerS1: [
    {
      icon: FaEnvelope, // JSX element নয়, component ref
      data: "contest@gmail.com",
    },
    {
      icon: FaPhone,
      data: "01719520202",
    },
  ],
  headerS2: [
    {
      icon: FaFacebook,
    },
    {
      icon: FaTwitter,
    },
    {
      icon: FaYoutube,
    },
    {
      icon: FaLinkedinIn,
    },
  ],
};

// start navbar data from here

import logo from "../../src/assets/images/logo.png";

export const navData = {
  data: {
    title: "কনটেস্ট",
    subTitle: "বিশ্ববিদ্যালয় ভর্তি কোচিং",
    logo: logo,
    links: [
      { name: "হোম", path: "/" },
      { name: "কোর্সসমূহ", path: "/courses" },
      { name: "শাখা সমূহ", path: "/branches" },
      { name: "গ্যালারী", path: "/gallery" },
      { name: "এডমিশন", path: "/admission" },
    ],
    btnName: ["Login | Register"],
    btnStyle: {
      btnColor: "headerColor",
    },
  },
};

// slider data

import slider1 from "../assets/images/slider/slider-1.jpg";
import slider2 from "../assets/images/slider/slider-2.jpg";
import slider3 from "../assets/images/slider/slider-3.jpg";

export const sliderData = [
  {
    id: 1,
    title: "1st slider",
    preview: slider1,
  },
  {
    id: 2,
    title: "2nd slider",
    preview: slider2,
  },
  {
    id: 3,
    title: "3rd slider",
    preview: slider3,
  },
];

// start notice data from here

export const noticeBtnMore = {
  btnName: ["More Notices"],
  btnStyle: {
    btnBgColor: "headerColor",
    btnHoverColor: "headerColorHover",
    bgFull: true,
  },
};

export const noticeBtnData = {
  btnName: ["Admission", "Administration", "Department"],
  btnStyle: {
    btnBgColor: "headerColor",
    btnHoverColor: "headerColorHover",
  },
};

export const noticeData = {
  tabLabelMap: {
    Admission: "More Admission Notices..",
    Administration: "More Administration Notices..",
    Department: "More Department Notices..",
  },
  notices: {
    admissionNotices: [
      { currentDate: "14/01/2025" },
      {
        date: "14/01/2025",
        title: "Economics, 2nd Admission Test Result Spring-2025",
        link: "#",
      },
      {
        date: "13/01/2025",
        title: "Special Admission Test Result Spring-2025 (English)",
        link: "#",
      },
      {
        date: "13/01/2025",
        title: "CSE Spring 2025 B.Sc in CSE Special Admission Test Result",
        link: "#",
      },
      {
        date: "13/01/2025",
        title:
          "Islamic History and Culture (IHC) Special Admission Test Result (Spring-2025)",
        link: "#",
      },
      {
        date: "13/01/2025",
        title:
          "Nutrition and Food Engineering (NFE) Special Admission Test Result (Spring-2025)",
        link: "#",
      },
    ],
    administrationNotices: [
      { currentDate: "25/02/2025" },
      {
        date: "14/01/2025",
        title: "Economics, 2nd Administration Test Result Spring-2025",
        link: "#",
      },
      {
        date: "13/01/2025",
        title: "Special Administration Test Result Spring-2025 (English)",
        link: "#",
      },
      {
        date: "13/01/2025",
        title: "CSE Spring 2025 B.Sc in CSE Special Administration Test Result",
        link: "#",
      },
      {
        date: "13/01/2025",
        title:
          "Islamic History and Culture (IHC) Special Administration Test Result (Spring-2025)",
        link: "#",
      },
      {
        date: "13/01/2025",
        title:
          "Nutrition and Food Engineering (NFE) Special Administration Test Result (Spring-2025)",
        link: "#",
      },
    ],
    departmentNotices: [
      { currentDate: "12/05/2025" },
      {
        date: "14/01/2025",
        title: "Economics, 2nd Department Test Result Spring-2025",
        link: "#",
      },
      {
        date: "13/01/2025",
        title: "Special Department Test Result Spring-2025 (English)",
        link: "#",
      },
      {
        date: "13/01/2025",
        title: "CSE Spring 2025 B.Sc in CSE Special Department Test Result",
        link: "#",
      },
      {
        date: "13/01/2025",
        title:
          "Islamic History and Culture (IHC) Special Department Test Result (Spring-2025)",
        link: "#",
      },
      {
        date: "13/01/2025",
        title:
          "Nutrition and Food Engineering (NFE) Special Department Test Result (Spring-2025)",
        link: "#",
      },
    ],
  },
};

// ratio should be 3:2 of each card image
import card1 from "../assets/images/card/card-1.jpg";
import card2 from "../assets/images/card/card-2.jpg";

export const noticeStydyBtnData = {
  btnStyle: {
    btnBgColor: "headerColor",
    btnHoverColor: "headerColorHover",
    bgFull: true,
    fontBold: true,
  },
};
export const noticeStudyPrograms = [
  {
    noticeBtn: true,
    title: "Undergraduate Study",
    image: card1,
    icon: true,
    short_des: ["Academic Programs", "Admission Requirements", "Apply Online"],
  },
  {
    noticeBtn: true,
    title: "Graduate Study",
    image: card2,
    icon: true,
    short_des: ["Academic Programs", "Admission Requirements", "Apply Online"],
  },
];

// start stats data from here

import {
  FaUniversity,
  FaStethoscope,
  FaGraduationCap,
  FaTools,
} from "react-icons/fa";

export const statsData = [
  {
    title: "BUET",
    count: "1290+",
    description:
      "২০২৩ BUET ভর্তি পরীক্ষায় লেখ পরীক্ষায় প্রথম ৫০ ও ১০০ জন সহ ৯০টিরও অধিক অ্যাডমিশন টেস্টে অংশ নিয়ে ঢাকা পেয়েছে ।",
    icon: FaUniversity,
    backgroundGradient: ["#a78bfa", "#5b21b6"],
  },
  {
    title: "মেডিকেল",
    count: "4300+",
    description:
      "২০২৩ মেডিকেল ভর্তি পরীক্ষায় জাতীয় মেধায় প্রথম ৫০ ও ১০০ জন এবং DMC-তে ৪৯ জনসহ ৬৩০টি অ্যাডমিশনে ঢাকায় পেয়েছে ।",
    icon: FaStethoscope,
    backgroundGradient: ["#ef4444", "#991b1b"],
  },
  {
    title: "চাবি'ক",
    count: "1800+",
    description:
      "২০২৩ চাবি'ক ইউনিট ভর্তি পরীক্ষায় লেখ পরীক্ষায় প্রথম ৫০ ও ১০০ জন সহ ১৮০টিরও অধিক অ্যাডমিশনে ঢাকায় পেয়েছে ।",
    icon: FaGraduationCap,
    backgroundGradient: ["#22c55e", "#14532d"],
  },
  {
    title: "CKRUET",
    count: "3180+",
    description:
      "২০২৩ CKRUET ভর্তি পরীক্ষায় লেখ পরীক্ষায় প্রথম ৫০ ও ১০০ জন সহ ৬৩০টিরও অধিক অ্যাডমিশনে ঢাকায় পেয়েছে ।",
    icon: FaTools,
    backgroundGradient: ["#facc15", "#854d0e"],
  },
  {
    title: "RUET",
    count: "2900+",
    description:
      "২০২৩ RUET ভর্তি পরীক্ষায় বিশাল সংখ্যক শিক্ষার্থী ভর্তি হয়েছে এবং তাদের পারফর্মেন্স ছিল অসাধারণ।",
    icon: FaTools,
    backgroundGradient: ["#3b82f6", "#1e3a8a"],
  },
  {
    title: "CUET",
    count: "3100+",
    description:
      "২০২৩ CUET ভর্তি পরীক্ষায় শীর্ষ র্যাংকধারী শিক্ষার্থীদের মধ্যেও অনেকেই এখানে ভর্তি হয়েছেন।",
    icon: FaTools,
    backgroundGradient: ["#f97316", "#9a3412"],
  },
];

//services data from here

import {
  FaBookOpen,
  FaHeadphones,
  FaUsers,
  FaFileAlt,
  FaQuestion,
  FaSms,
  FaChartBar,
} from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { BiBookOpen } from "react-icons/bi";

export const services = {
  title: "আমাদের সেবা সমূহ",
  data: [
    { title: "অনলাইন গ্রন্থাগার", icon: FaBookOpen },
    { title: "মেধাবী ও অভিজ্ঞ শিক্ষক", icon: GiTeacher },
    { title: "মানসম্পন্ন অডিও ম্যাটেরিয়ালস", icon: FaHeadphones },
    { title: "কনসেপ্ট হেইভড ক্লাস", icon: MdOutlineVideoLibrary },
    { title: "ইউনিক এপ্রোচ সিস্টেম", icon: FaFileAlt },
    { title: "সার্বজনিক Q&A সেবা", icon: FaQuestion },
    { title: "Auto SMS রেজাল্ট", icon: FaSms },
    { title: "এপ্রোচ এনালাইসিস রিপোর্ট", icon: FaChartBar },
  ],
};

// summary data from here

export const summary = {
  title: "আমাদের সারসংক্ষেপ",
  data: [
    { title: "সকল শিক্ষার্থী", value: "48712 জন", icon: FaUsers },
    { title: "সর্বমোট কোর্স", value: "১৫ টি", icon: BsClipboardData },
    { title: "অভিজ্ঞ শিক্ষক", value: "৪৮৭ জন", icon: GiTeacher },
    { title: "সর্বমোট সাবজেক্ট", value: "১৫ টি", icon: BiBookOpen },
  ],
};

// start footer data from here
import { FaInstagramSquare } from "react-icons/fa";
import footerLogo from "../assets/images/footer-logo.png";

export const footerData = {
  logo: {
    slogan: "সম্পর্ক হোক সহযোগিতার....",
    brand: "কনটেস্ট",
    des: "Online Care",
    logoImage: footerLogo, // চাইলে তোমার লোগোর রিলেটিভ পাথ দাও
  },
  helpLinks: [
    { name: "About Us", url: "/about" },
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms & Conditions", url: "/terms" },
    { name: "FAQs", url: "/faq" },
    { name: "Contact Us", url: "/contact" },
  ],
  exploreLinks: [
    { name: "Udvash", url: "/udvash" },
    { name: "Unmesh", url: "/unmesh" },
  ],
  contact: {
    address: `Hossain Tower (5th Floor), 75, Green Road, 
Farmgate, Sher-e-Bangla Nagar PS, Dhaka-1205.`,
    helpline: "09666775566",
    email: "info@udvash-unmesh.com",
  },
  socialMedia: [
    { icon: FaFacebook, url: "https://www.facebook.com" },
    { icon: FaYoutube, url: "https://www.twitter.com" },
    { icon: FaInstagramSquare, url: "https://www.twitter.com" },
  ],
  copyright: "Copyright © Contest Online Care. All rights reserved.",
  year: "2025",
};
