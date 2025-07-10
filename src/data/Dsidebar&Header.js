import { MdOutlineMessage, MdOutlineNotificationsActive } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../assets/images/logo.png"


export const headerData = {
    logo:{
        image: logo,
        title:"Contest",
        subtitle:"Admin",
    },
    icons:[ {icon: MdOutlineMessage, link:"/message"}, {icon: MdOutlineNotificationsActive, link:"/notification", new: true}, {icon: BsCart4, link: "/cart"}, {icon: FaRegUserCircle, link: "/user"}]
}


import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { LuNotebookPen } from "react-icons/lu";
import { GrSchedules } from "react-icons/gr";
import { MdSettings } from "react-icons/md";
import { MdOutlineLiveHelp } from "react-icons/md";
import { GrLogout } from "react-icons/gr";

export const sidebarData = [
    {
        title:"Menu",
        items:[
        {icon: RiDashboardHorizontalFill , title:"Dashboard", link:"/dashboard"}, {icon: SiGoogleclassroom, title:"Student", link:"student"}, {icon: GiTeacher, title:"Teacher", link:"teacher"}, {icon: TfiLayoutSliderAlt, title:"Slider", link:"slider"}, {icon: LuNotebookPen, title:"Notice", link:"notice"}, {icon: GrSchedules, title:"Schedule", link:"schedule"}
    ]
    },
   {
    title:"General",
    items:[
        {icon: MdSettings, title:"Settings", link:"settings"}, {icon: MdOutlineLiveHelp, title:"Help", link:"help"},{icon: GrLogout, title:"Logout", link:"logout"}
    ]
   },
]