import { FaShippingFast } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";

export const cards = [
  {
    id: 1,
    heading: "Fast Shipping",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <FaShippingFast />,
    featured: true,
  },
  {
    id: 2,
    heading: "Big Savings",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <AiOutlineDollarCircle />,
    featured: true,
  },
  {
    id: 3,
    heading: "Safe Paying",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <RiSecurePaymentLine />,
    featured: true,
  },
  {
    id: 4,
    heading: "Big Selection",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <BsCart4 />,
    featured: true,
  },
];
