export const data = {
  courses: [
    {
      title: "ভর্তি 'খ' + প্রস্তুতি",
      unit: "B Unit 2025-26",
      details: [
        "মোট ক্লাস সংখ্যা: ১০৪+",
        "লেকচার শীট সংখ্যা: ৯",
        "ডেইলি এক্সাম সংখ্যা: ৫৪",
        "মডেল টেস্ট সংখ্যা: ৭",
        "ইনিশিয়াল গাইডলাইন ক্লাস",
        "টাইপ: অনলাইন",
        "ফি: ৭৫০ টাকা"
      ],
      image: "course_b_unit.jpg"
    },
    {
      title: "ভর্তি 'ক' + প্রস্তুতি",
      unit: "A Unit 2025-26",
      details: [
        "মোট ক্লাস সংখ্যা: ১০৫+",
        "লেকচার শীট সংখ্যা: ৯",
        "ডেইলি এক্সাম সংখ্যা: ৫৫",
        "মডেল টেস্ট সংখ্যা: ৮",
        "ইনিশিয়াল গাইডলাইন ক্লাস",
        "টাইপ: অনলাইন",
        "ফি: ৭৫০ টাকা"
      ],
      image: "course_a_unit.jpg"
    },
    {
      title: "ভর্তি 'গ' + প্রস্তুতি",
      unit: "C Unit 2025-26",
      details: [
        "মোট ক্লাস সংখ্যা: ৯৫+",
        "লেকচার শীট সংখ্যা: ৮",
        "ডেইলি এক্সাম সংখ্যা: ৫০",
        "মডেল টেস্ট সংখ্যা: ৬",
        "ইনিশিয়াল গাইডলাইন ক্লাস",
        "টাইপ: অনলাইন",
        "ফি: ৭৫০ টাকা"
      ],
      image: "course_c_unit.jpg"
    }
  ],
  students: [
    {
      name: "মোঃ আনিসুজ্জামান জামিল",
      institution: "BUET ১ম",
      session: "২০২৩-২৪",
      story: "আমি ফোকাসের একজন স্টুডেন্ট ছিলাম...",
      image: "student_1.jpg"
    },
    {
      name: "মাহবুবুল হাসান",
      institution: "BUET ২য়",
      session: "২০২৩-২৪",
      story: "আমি ফোকাসের নিয়মিত স্টুডেন্ট ছিলাম...",
      image: "student_2.jpg"
    },
    {
      name: "সুনীতি ঘোষাল",
      institution: "BUET ৩য়",
      session: "২০২৩-২৪",
      story: "আমি ফোকাসের একজন সাফল্যপ্রাপ্ত শিক্ষার্থী...",
      image: "student_3.jpg"
    }
  ]
}

import { FaEnvelope, FaLinkedinIn , FaFacebook, FaYoutube, FaTwitter  } from "react-icons/fa";
import { FaPhone} from "react-icons/fa6";

export const headerData = {
  headerS1: [
    {
      icon: FaEnvelope, // JSX element নয়, component ref
      data: "focusedu@gmail.com"
    },
    {
      icon: FaPhone,
      data: "01719520202"
    }
  ],
  headerS2: [
    {
      icon: FaFacebook
    },
    {
      icon: FaTwitter
    },
    {
      icon: FaYoutube
    },
    {
      icon: FaLinkedinIn
    }
  ],
};

import logo from "../data/images/logo.png"

export const navData = 
  {navbar: {
      title: "কনটেস্ট",
      subTitle: "বিশ্ববিদ্যালয় ভর্তি কোচিং",
      logo: logo,
      links: [
        { name: "হোম" ,path: "home" },
        { name: "কোর্সসমূহ", path: "courses"},
        { name: "ফ্রি এক্সাম" ,path: "exams"},
        { name: "শাখা সমূহ" ,path: "branches"},
      ]
  }}

export const footerData = 
{footer: {
    about: "ফোকাস অনলাইন কেয়ার একটি অনলাইন ভিত্তিক শিক্ষা প্রতিষ্ঠান, যা শিক্ষার্থীদের অনলাইন কোর্স, লাইভ ক্লাস, মডেল টেস্ট ও মেন্টর সাপোর্ট দিয়ে সাফল্যের দিকে এগিয়ে নিতে সহায়তা করে।",
    links: [
      { label: "শর্তাবলী", path: "/terms", icon: "MdOutlineLibraryBooks" },
      { label: "প্রাইভেসি পলিসি", path: "/privacy", icon: "MdOutlineLibraryBooks" },
      { label: "সচরাচর প্রশ্ন", path: "/faq", icon: "MdOutlineCastForEducation" },
      { label: "যোগাযোগ", path: "/contact", icon: "MdOutlineContactPhone" }
    ],
    contactInfo: [
      { type: "phone", label: "০১৮১২-৩৪৫৬৭৮", icon: "FaPhone" },
      { type: "email", label: "support@focuscare.com", icon: "FaEnvelope" },
      { type: "address", label: "ধানমন্ডি, ঢাকা, বাংলাদেশ", icon: "FaMapMarkerAlt" }
    ],
    social: [
      { platform: "Facebook", url: "https://facebook.com/focuscare", icon: "FaFacebook" },
      { platform: "YouTube", url: "https://youtube.com/focuscare", icon: "FaYoutube" },
      { platform: "Instagram", url: "https://instagram.com/focuscare", icon: "FaInstagram" }
    ]
  }}
