import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { AiOutlineNotification } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineSummarize } from "react-icons/md";
import { GiTreeBranch } from "react-icons/gi";
import { GrGallery } from "react-icons/gr";

export const customiseData = [
  { icon: TfiLayoutSliderAlt, name: "Add/Edit current Slider", link: "slider" },
  {
    icon: AiOutlineNotification,
    name: "Add/Edit Existing Notice data",
    link: "notice",
  },
  {
    icon: ImStatsDots,
    name: "Add/Edit current Successfull person",
    link: "success-editor",
  },
  {
    icon: FaAward,
    name: "Add/Edit current stats data",
    link: "stats-editor",
  },
  {
    icon: MdSupportAgent,
    name: "Add/Edit current Service data",
    link: "service-editor",
  },
  {
    icon: MdOutlineSummarize,
    name: "Edit current Summary data",
    link: "summary-editor",
  },
  {
    icon: GiTreeBranch,
    name: "Add/Edit current Branch data",
    link: "branch-editor",
  },
  {
    icon: GrGallery,
    name: "Add/Edit current Gallery data",
    link: "gallery-editor",
  },
];
