import { Address } from "./address";
import { Product } from "./product";
import { User } from "./user";

enum OrderStatus {
  COMPLETED,
  ONGOING,
  CANCELED,
}

export interface Order {
  id: number;
  user: User;
  userId: number;
  orderStatus: OrderStatus;
  totalPrice: number;
  address: Address;
  addressId: number;
  OrderItem: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  order: Order;
  orderId: number;
  product: Product;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
