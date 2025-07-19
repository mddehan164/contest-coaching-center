export const loginData =  {
    title: "কনটেস্টে স্বাগতম!",
    subtitle: "আপনার অ্যাকাউন্টে লগইন করুন",
    fields: [
      {
        label: "Email Adress",
        name: "email",
        type: "email",
        placeholder: "Email Address",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Password",
      },
    ],
    bottomText: "এখনও কোনো অ্যাকাউন্ট নেই?",
    spanText: " রেজিস্টার করুন",
    route:"/register",
    btnData: {
      btnName:['লগইন'],
      btnStyle:{
        btnBgColor:"headerColor",
        btnHoverColor:"headerColorHover",
        bgFull: true,
      }
  },
  }


export const registerData = {
    title: "কনটেস্টে স্বাগতম!",
    subtitle: "নতুন অ্যাকাউন্ট তৈরি করতে নিচের ফর্মটি পূর্ণ করুন।",
    fields: [
      {
        label: "Student's Name",
        name: "name",
        type: "text",
        placeholder: "Student's Name",
      },
      {
        label: "Email Address",
        name: "email",
        type: "email",
        placeholder: "Email Address",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Password",
      },
      {
        label: "Confirm Password",
        name: "password_confirmation",
        type: "password",
        placeholder: "Confirm Password",
      },
    ],
    bottomText: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
    spanText: " লগইন করুন",
    route:"/login",

    btnData: {
      btnName:['রেজিস্টার'],
      btnStyle:{
        btnBgColor:"headerColor",
        btnHoverColor:"headerColorHover",
        bgFull: true,
      }
  },
  }
