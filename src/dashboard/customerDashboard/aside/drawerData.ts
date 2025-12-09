// drawerData.ts
import { FaUser, FaBirthdayCake, FaClipboardList, FaShoppingCart } from "react-icons/fa";
import { type IconType } from "react-icons";

export const customerDrawerData: { 
  id: string;
  name: string;
  link: string;
  icon: IconType;
}[] = [
  {
    id: "users",
    name: "Users",
    link: "users",
    icon: FaUser
  },
  {
    id: "cakes",
    name: "Cakes",
    link: "cakes",
    icon: FaBirthdayCake
  },
  {
    id: "orders",
    name: "Orders",
    link: "orders",
    icon: FaClipboardList
  },
  {
    id: "checkout",
    name: "Checkout",
    link: "checkout",
    icon: FaShoppingCart
  },
  
];
