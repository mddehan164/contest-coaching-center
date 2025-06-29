
// start header from here

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

// start navbar data from here

import logo from "../../public/images/logo.png"

export const navData = 
  {data: {
      title: "কনটেস্ট",
      subTitle: "বিশ্ববিদ্যালয় ভর্তি কোচিং",
      logo: logo,
      links: [
        { name: "হোম" ,path: "/" },
        { name: "কোর্সসমূহ", path: "/courses"},
        { name: "শাখা সমূহ" ,path: "/branches"},
        { name: "এডমিশন" ,path: "/admission"},
      ],
      btnName:["Login | Register"],
      btnStyle:{
        btnColor:"headerColor",
      }
  }}

  
import sliderImg1 from "../../public/images/slider/slider-1.jpg";
import sliderImg2 from "../../public/images/slider/slider-2.jpg";
import sliderImg3 from "../../public/images/slider/slider-3.jpg";


  export const sliderData = {
    sliderImg:[sliderImg1, sliderImg2, sliderImg3]
  }

// start notice data from here
  
export const noticeData = {
  btnData: {
      btnName:['Admission', 'Administration', 'Department'],
      btnStyle:{
        btnBgColor:"headerColor",
        btnHoverColor:"headerColorHover",
      }
  },
  noticeBtn: {
      btnData: {
      btnName:['More Notices'],
      btnStyle:{
        btnBgColor:"headerColor",
        btnHoverColor:"headerColorHover",
        bgFull: true,
      }
  }
  },
  tabLabelMap : {
        Admission: "More Admission Notices..",
        Administration: "More Administration Notices..",
        Department: "More Department Notices..",
    },
  notices: {
            admissionNotices : [
              {currentDate: '14/01/2025'},
              {
              date: '14/01/2025',
              title: 'Economics, 2nd Admission Test Result Spring-2025',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Special Admission Test Result Spring-2025 (English)',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'CSE Spring 2025 B.Sc in CSE Special Admission Test Result',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Islamic History and Culture (IHC) Special Admission Test Result (Spring-2025)',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Nutrition and Food Engineering (NFE) Special Admission Test Result (Spring-2025)',
              link: '#',
            },
          ],
        administrationNotices : [
              {currentDate: '25/02/2025'},
              {
              date: '14/01/2025',
              title: 'Economics, 2nd Administration Test Result Spring-2025',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Special Administration Test Result Spring-2025 (English)',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'CSE Spring 2025 B.Sc in CSE Special Administration Test Result',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Islamic History and Culture (IHC) Special Administration Test Result (Spring-2025)',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Nutrition and Food Engineering (NFE) Special Administration Test Result (Spring-2025)',
              link: '#',
            },
          ],
        departmentNotices : [
              {currentDate: '12/05/2025'},
              {
              date: '14/01/2025',
              title: 'Economics, 2nd Department Test Result Spring-2025',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Special Department Test Result Spring-2025 (English)',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'CSE Spring 2025 B.Sc in CSE Special Department Test Result',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Islamic History and Culture (IHC) Special Department Test Result (Spring-2025)',
              link: '#',
            },
            {
              date: '13/01/2025',
              title: 'Nutrition and Food Engineering (NFE) Special Department Test Result (Spring-2025)',
              link: '#',
            },
          ]},
};


// ratio should be 3:2 of each card image
import card1 from "../../public/images/card/card-1.jpg";
import card2 from "../../public/images/card/card-2.jpg";

export const noticeStudyPrograms = [
  {
    titleStatus: true,
    image: card1,
    icon: true,
    btnData: {
      btnName: ['Undergraduate Study'],
      btnStyle: {
        btnBgColor: "headerColor",
        btnHoverColor: "headerColorHover",
        bgFull: true,
        fontBold: true,
      }
    },
    body: [
      'Academic Programs',
      'Admission Requirements',
      'Apply Online',
    ],
  },
  {
    titleStatus: true,
    image: card2,
    icon: true,
    btnData: {
      btnName: ['Graduate Study'],
      btnStyle: {
        btnBgColor: "headerColor",
        btnHoverColor: "headerColorHover",
        bgFull: true,
        fontBold: true,
      }
    },
    body: [
      'Academic Programs' ,
      'Admission Requirements' ,
      'Apply Online' ,
    ],
  }
]


//  start course data from here
// ratio should be 3:2 of each card image
import courseImg1 from "../../public/images/course-card/card-1.jpg";
import courseImg2 from "../../public/images/course-card/card-2.jpg";
import courseImg3 from "../../public/images/course-card/card-3.jpg";



export const courseData = {
  title: "আমাদের কোর্সসমূহ",
  btnData: {
      btnName: ['See More'],
      btnStyle: {
        btnBgColor: "headerColor",
        btnHoverColor: "headerColorHover",
      }
    },
  courses: [
    {
      unit: "B Unit 2025-26",
      btnData: {
      btnName: ['Enroll Now', 'Details'],
      btnStyle: {
        btnBgColor: "headerColor",
        btnHoverColor: "headerColorHover",
        btnStatus: true,
      }
    },
      body: [
        "মোট ক্লাস সংখ্যা: ১০৪+",
        "লেকচার শীট সংখ্যা: ৯",
        "ডেইলি এক্সাম সংখ্যা: ৫৪",
        "মডেল টেস্ট সংখ্যা: ৭",
        "ইনিশিয়াল গাইডলাইন ক্লাস",
        "টাইপ: অনলাইন",
        "ফি: ৭৫০ টাকা"
      ],
      image: courseImg1
    },
    {
      unit: "A Unit 2025-26",
      btnData: {
      btnName: ['Enroll Now', 'Details'],
      btnStyle: {
        btnBgColor: "headerColor",
        btnHoverColor: "headerColorHover",
        btnStatus: true,
      }
    },
      body: [
        "মোট ক্লাস সংখ্যা: ১০৫+",
        "লেকচার শীট সংখ্যা: ৯",
        "ডেইলি এক্সাম সংখ্যা: ৫৫",
        "মডেল টেস্ট সংখ্যা: ৮",
        "ইনিশিয়াল গাইডলাইন ক্লাস",
        "টাইপ: অনলাইন",
        "ফি: ৭৫০ টাকা"
      ],
      image: courseImg2
    },
    {
      unit: "C Unit 2025-26",
      btnData: {
      btnName: ['Enroll Now', 'Details'],
      btnStyle: {
        btnBgColor: "headerColor",
        btnHoverColor: "headerColorHover",
        btnStatus: true,
      }
    },
      body: [
        "মোট ক্লাস সংখ্যা: ৯৫+",
        "লেকচার শীট সংখ্যা: ৮",
        "ডেইলি এক্সাম সংখ্যা: ৫০",
        "মডেল টেস্ট সংখ্যা: ৬",
        "ইনিশিয়াল গাইডলাইন ক্লাস",
        "টাইপ: অনলাইন",
        "ফি: ৭৫০ টাকা"
      ],
      image: courseImg3
    },
    {
      unit: "C Unit 2025-26",
      btnData: {
      btnName: ['Enroll Now', 'Details'],
      btnStyle: {
        btnBgColor: "headerColor",
        btnHoverColor: "headerColorHover",
        btnStatus: true,
      }
    },
      body: [
        "মোট ক্লাস সংখ্যা: ৯৫+",
        "লেকচার শীট সংখ্যা: ৮",
        "ডেইলি এক্সাম সংখ্যা: ৫০",
        "মডেল টেস্ট সংখ্যা: ৬",
        "ইনিশিয়াল গাইডলাইন ক্লাস",
        "টাইপ: অনলাইন",
        "ফি: ৭৫০ টাকা"
      ],
      image: courseImg3
    },
    
    
  ],
  
}

// start stats data from here

import { FaUniversity, FaStethoscope, FaGraduationCap, FaTools } from 'react-icons/fa';

export const statsData = [
  {
    title: 'BUET',
    count: '1290+',
    description: '২০২৩ BUET ভর্তি পরীক্ষায় লেখ পরীক্ষায় প্রথম ৫০ ও ১০০ জন সহ ৯০টিরও অধিক অ্যাডমিশন টেস্টে অংশ নিয়ে ঢাকা পেয়েছে ।',
    icon: FaUniversity,
    backgroundGradient: 'bg-gradient-to-br from-purple-400 to-purple-900',
  },
  {
    title: 'মেডিকেল',
    count: '4300+',
    description: '২০২৩ মেডিকেল ভর্তি পরীক্ষায় জাতীয় মেধায় প্রথম ৫০ ও ১০০ জন এবং DMC-তে ৪৯ জনসহ ৬৩০টি অ্যাডমিশনে ঢাকায় পেয়েছে ।',
    icon: FaStethoscope,
    backgroundGradient: 'bg-gradient-to-br from-red-500 to-red-800',
  },
  {
    title: "চাবি'ক",
    count: '1800+',
    description: '২০২৩ চাবি\'ক ইউনিট ভর্তি পরীক্ষায় লেখ পরীক্ষায় প্রথম ৫০ ও ১০০ জন সহ ১৮০টিরও অধিক অ্যাডমিশনে ঢাকায় পেয়েছে ।',
    icon: FaGraduationCap,
    backgroundGradient: 'bg-gradient-to-br from-green-500 to-green-900',
  },
  {
    title: 'CKRUET',
    count: '3180+',
    description: '২০২৩ CKRUET ভর্তি পরীক্ষায় লেখ পরীক্ষায় প্রথম ৫০ ও ১০০ জন সহ ৬৩০টিরও অধিক অ্যাডমিশনে ঢাকায় পেয়েছে ।',
    icon: FaTools,
    backgroundGradient: 'bg-gradient-to-br from-yellow-400 to-yellow-700',
  },
  {
    title: 'RUET',
    count: '2900+',
    description: '২০২৩ RUET ভর্তি পরীক্ষায় বিশাল সংখ্যক শিক্ষার্থী ভর্তি হয়েছে এবং তাদের পারফর্মেন্স ছিল অসাধারণ।',
    icon: FaTools,
    backgroundGradient: 'bg-gradient-to-br from-blue-500 to-blue-900',
  },
  {
    title: 'CUET',
    count: '3100+',
    description: '২০২৩ CUET ভর্তি পরীক্ষায় শীর্ষ র্যাংকধারী শিক্ষার্থীদের মধ্যেও অনেকেই এখানে ভর্তি হয়েছেন।',
    icon: FaTools,
    backgroundGradient: 'bg-gradient-to-br from-orange-500 to-orange-700',
  },
];


// succesfull person data from here...

// successData.js

import personImg1 from "../../public/images/successful-person/p-1.png";
import personImg2 from "../../public/images/successful-person/p-2.png";
import personImg3 from "../../public/images/successful-person/p-3.png";


export const successData = {
  mainTitle: "সফল শিক্ষার্থীদের গল্প",
  btnData: {
      btnName: ['See More'],
      btnStyle: {
        btnBgColor: "headerColor",
        btnHoverColor: "headerColorHover",
      }
    },
  mainData :[
  {
    img: personImg1,
    title: "মোঃ আল-আমিন আহমেদ",
    subtitle: "প্রাণ প্রকৌশল ২০২০-২১",
    rank: "BUET ৪৭",
    description: `আমার শিক্ষাজীবনের শুরু থেকেই গণিতের প্রতি তীব্র আগ্রহ ছিল। আমি ভর্তি প্রস্তুতির শুরুটা করেছি ক্লাস ১০ থেকেই। সিলেবাস শেষ করে প্র্যাকটিসে মনোযোগ দেই। এ সময়টি ছিল অনেক পরিশ্রমের। প্ল্যাটফর্মের ক্লাস গুলো আমাকে কনসেপ্ট ক্লিয়ার করতে অনেক সাহায্য করেছে, বিশেষ করে লজিক্যাল ম্যাথ অংশে। 
                প্ল্যাটফর্মের সাবজেক্টভিত্তিক এক্সপার্ট টিচারদের গাইডলাইন, প্রচুর সংখ্যক কনসেপ্ট ক্লিয়ারিং ক্লাস, রুটিন মোতাবেক রিভিশন, প্রতিটি অধ্যায়ের জন্য স্পেশাল কোয়েশ্চেন সেট, এবং রিয়েল লাইফ এক্সপেরিয়েন্স শেয়ার – এই গুলোই সফলতার পেছনে মূল চাবিকাঠি ছিল।`
  },
  {
    img: personImg2,
    title: "হারিছুল্লাহ খান",
    subtitle: "প্রাণ প্রকৌশল ২০২০-২১",
    rank: "BUET ৩১",
    description: `আমি সফলভাবে প্রতিটি বিষয়ে গুরুত্বসহকারে পড়াশোনা করেছি এবং প্রতিটি বিষয়ে আলাদা করে সময় দিয়েছি। গণিত এবং পদার্থবিজ্ঞানে ভালো ফল করার জন্য নিয়মিত চর্চা করতাম। আমার সফলতার জন্য গুরুত্বপূর্ণ ছিল প্ল্যাটফর্মের নিয়মিত মডেল টেস্ট, কুইজ এবং চমৎকার ব্যাখ্যাসহ প্রশ্ন বিশ্লেষণ। 
                প্রতিটি ভুল থেকে শিখে নিজেকে আপডেট করতাম। প্ল্যাটফর্মের ভিডিও গুলো আমাকে অনেক অনুপ্রাণিত করেছে এবং পরীক্ষার আগে মানসিকভাবে প্রস্তুত হতে সাহায্য করেছে।`
  },
  {
    img: personImg3,
    title: "সুশান্ত দৌলতর",
    subtitle: "প্রাণ প্রকৌশল ২০২০-২১",
    rank: "BUET ০৩",
    description: `আমি সফলতার পেছনে সবচেয়ে বড় অবদান হিসেবে মনে করি ধৈর্য্য এবং পরিশ্রম। প্রতিদিনের টার্গেট ঠিক করতাম এবং সেই অনুযায়ী পড়াশোনা করতাম। 
                প্ল্যাটফর্মের প্রতিটি ক্লাস ছিল খুবই তথ্যবহুল। কোর্স ম্যাটেরিয়াল, কুইজ এবং মডেল টেস্ট আমার প্রস্তুতিকে অনেক মজবুত করেছে। আমি কৃতজ্ঞ প্ল্যাটফর্মের প্রতি তাদের অসাধারণ সাপোর্ট এবং সময়োপযোগী গাইডলাইনের জন্য।`
  }
]};

//services data from here

import { FaBookOpen, FaHeadphones, FaUsers, FaFileAlt, FaQuestion, FaSms, FaChartBar } from 'react-icons/fa';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { BsClipboardData } from 'react-icons/bs';
import { GiTeacher } from 'react-icons/gi';
import { BiBookOpen } from 'react-icons/bi';

export const services = {
  title: "আমাদের সেবা সমূহ",
  data:[
  { title: 'অনলাইন গ্রন্থাগার', icon: FaBookOpen },
  { title: 'মেধাবী ও অভিজ্ঞ শিক্ষক', icon: GiTeacher },
  { title: 'মানসম্পন্ন অডিও ম্যাটেরিয়ালস', icon: FaHeadphones },
  { title: 'কনসেপ্ট হেইভড ক্লাস', icon: MdOutlineVideoLibrary },
  { title: 'ইউনিক এপ্রোচ সিস্টেম', icon: FaFileAlt },
  { title: 'সার্বজনিক Q&A সেবা', icon: FaQuestion },
  { title: 'Auto SMS রেজাল্ট', icon: FaSms },
  { title: 'এপ্রোচ এনালাইসিস রিপোর্ট', icon: FaChartBar },
]};


// summary data from here

export const summary = {
  title: "আমাদের সারসংক্ষেপ",
  data:[
  { title: 'সকল শিক্ষার্থী', value: '48712 জন', icon: FaUsers },
  { title: 'সর্বমোট কোর্স', value: '১৫ টি', icon: BsClipboardData },
  { title: 'অভিজ্ঞ শিক্ষক', value: '৪৮৭ জন', icon: GiTeacher },
  { title: 'সর্বমোট সাবজেক্ট', value: '১৫ টি', icon: BiBookOpen },
]};




// start footer data from here
import { FaInstagramSquare } from "react-icons/fa";
import footerLogo from "../../public/images/footer-logo.png"

export const footerData = {
  logo: {
    slogan: "সম্পর্ক হোক সহযোগিতার....",
    brand: "কনটেস্ট",
    des:"Online Care",
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
    { icon: FaInstagramSquare , url: "https://www.twitter.com" },
  ],
  copyright: "Copyright © Contest Online Care. All rights reserved.",
  year: "2025",
};


