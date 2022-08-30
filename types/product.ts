import { CartItem } from "./cart";
import { Category } from "./category";
import { Discount } from "./discount";
import { Inventory } from "./inventory";
import { OrderItem } from "./order";
import { User } from "./user";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
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
}
