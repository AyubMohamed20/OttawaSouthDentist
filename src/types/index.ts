export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  href: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  date?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}
