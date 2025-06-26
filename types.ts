// change or modify the types as your requirement

export type Product = {
  id: number;
  productName: string;
  category: string;
  description: string;
  aboutItem: string[];
  price: number;
  discount: number;
  rating: number;
  reviews: Review[];
  brand?: string;
  color?: string[];
  stockItems: number;
  images: string[];
};

export type Review = {  
  author: string;
  image: string;
  content: string;
  rating:number
  date: Date;
};

export type SearchParams = {
  page: string;
  category: string;
  brand: string;
  search: string;
  min: string;
  max: string;
  color: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  priceAtPurchase: number;
  totalPrice?: number;
  product: Product;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  gender?: string;
  phoneNumber?: string;
  profileImage?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode?: string;
  };
};