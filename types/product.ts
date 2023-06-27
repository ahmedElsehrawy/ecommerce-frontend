import { CartItem } from "./cart";
import { Category } from "./category";
import { Comment } from "./comment";
import { Discount } from "./discount";
import { Inventory } from "./inventory";
import { OrderItem } from "./order";
import { User } from "./user";

interface GalleryItem {
  id: number;
  url: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  mainImage: string;
  Gallery: GalleryItem[];
  category: Category;
  categoryId: number;
  discount?: Discount;
  discountId?: number;
  vendor: User;
  vendorId: number;
  OrderItem: OrderItem[];
  Inventory: Inventory[];
  createdAt: Date;
  updatedAt: Date;
  CartItem: CartItem[];
  averageRatingValue: number;
  // Comment: Comment[];
}
