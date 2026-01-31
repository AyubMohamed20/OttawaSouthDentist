import type { ContactInfo, BusinessHours, NavigationItem } from "@/types";

export const siteConfig = {
  name: "Ottawa South Dental",
  description:
    "Your trusted partner in achieving and maintaining a healthy, beautiful smile.",
  url: "https://ottawasouthdental.com",
};

export const contactInfo: ContactInfo = {
  phone: "6137331312",
  email: "info@ottawasouthdental.com",
  address: {
    street: "1729 Bank St",
    city: "Ottawa",
    province: "ON",
    postalCode: "K1V 7Z4",
  },
};

export const businessHours: BusinessHours[] = [
  { day: "Monday", open: "9:00 AM", close: "5:00 PM" },
  { day: "Tuesday", open: "9:00 AM", close: "5:00 PM" },
  { day: "Wednesday", open: "9:00 AM", close: "5:00 PM" },
  { day: "Thursday", open: "9:00 AM", close: "5:00 PM" },
  { day: "Friday", open: "9:00 AM", close: "5:00 PM" },
  { day: "Saturday", open: "9:00 AM", close: "2:00 PM", isClosed: false },
  { day: "Sunday", open: "", close: "", isClosed: true },
];

export const mainNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "General Dentistry", href: "/services/general" },
      { label: "Cosmetic Dentistry", href: "/services/cosmetic" },
      { label: "Children's Dentistry", href: "/services/children" },
      { label: "Emergency Care", href: "/services/emergency" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
