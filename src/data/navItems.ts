import { RiCoupon2Line, RiSettings4Line } from "react-icons/ri";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { CiGift } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineLiveTv } from "react-icons/md";
export const navItems = [
  {
    key: "coupon",
    href: "/coupon",
    icon: RiCoupon2Line,
    showInMobile: true,
    showInLeft: false,
    showInLogin: true,
  },
  {
    key: "order",
    href: "/order",
    icon: TfiLayoutListThumb,
    showInMobile: true,
    showInLeft: false,
    showInLogin: true,
  },
  {
    key: "settings",
    href: "/setting",
    icon: RiSettings4Line,
    showInMobile: true,
    showInLeft: false,
    showInLogin: true,
  },
  {
    key: "home",
    href: "/",
    icon: "",
    showInMobile: false,
    showInLeft: true,
    showInLogin: false,
  },
  {
    key: "event",
    href: "/event",
    icon: CiGift,
    showInMobile: true,
    showInLeft: true,
    showInLogin: false,
  },
  {
    key: "help",
    href: "/help",
    icon: IoMdHelpCircleOutline,
    showInMobile: true,
    showInLeft: true,
    showInLogin: false,
  },
  {
    key: "live",
    href: "/live",
    icon: MdOutlineLiveTv,
    showInMobile: true,
    showInLeft: true,
    showInLogin: false,
  },
];
