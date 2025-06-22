
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

import logo from "../data/images/logo.png"

export const navData = 
  {data: {
      title: "কনটেস্ট",
      subTitle: "বিশ্ববিদ্যালয় ভর্তি কোচিং",
      logo: logo,
      links: [
        { name: "হোম" ,path: "home" },
        { name: "কোর্সসমূহ", path: "courses"},
        { name: "ফ্রি এক্সাম" ,path: "exams"},
        { name: "শাখা সমূহ" ,path: "branches"},
      ],
      btnName:["Login | Register"],
      btnStyle:{
        btnColor:"headerColor",
      }
  }}

  
import sliderImg1 from "../data/images/slider/slider-1.jpg";
import sliderImg2 from "../data/images/slider/slider-2.jpg";
import sliderImg3 from "../data/images/slider/slider-3.jpg";

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
import card1 from "./images/card/card-1.jpg";
import card2 from "./images/card/card-2.jpg";

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
import courseImg1 from "./images/course-card/card-1.jpg";
import courseImg2 from "./images/course-card/card-3.jpg";
import courseImg3 from "./images/course-card/card-3.jpg";


export const courseData = {
  title: "আমাদের কোর্সসমূহ",
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


export const studentData = {
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


// start footer data from here

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
