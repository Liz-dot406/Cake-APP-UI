import { FaUser, FaBirthdayCake, FaClipboardList, FaPalette, FaChartLine } from "react-icons/fa";
import type { IconType } from "react-icons"; 

export interface DrawerItem {
  id: string;
  name: string;
  link: string;
  icon: IconType; 
}

export const adminDrawerData: DrawerItem[] = [
  {
    id: "users",
    name: "Users",
    link: "/admin/dashboard/users",
    icon: FaUser,
  },
  {
    id: "cakes",
    name: "Cakes",
    link: "/admin/dashboard/cakes",
    icon: FaBirthdayCake,
  },
  {
    id: "orders",
    name: "Orders",
    link: "/admin/dashboard/orders",
    icon: FaClipboardList,
  },
 
  {
    id: "analytics",
    name: "Analytics",
    link: "/admin/dashboard/analytics",
    icon: FaChartLine,
  },
  
  
];
