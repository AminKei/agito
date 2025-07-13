export interface ProfileModelAds {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  condition: string;
  city: string;
  image: string[];
  date: string;
  address: string;
  phone: string;
  location?: { lat: number; lng: number };
  urgent?: boolean;
  negotiable?: boolean;
  status: "published" | "expired" | "canceled"; // فیلد جدید
}
