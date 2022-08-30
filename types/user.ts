import { Address } from "cluster";
import { Cart } from "./cart";
import { Order } from "./order";
import { Product } from "./product";

enum Role {
  CUSTOMER,
  VENDOR,
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  balance: number;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  token?: string;
  Order: Order[];
  Address: Address[];
  cart?: Cart;
  Product: Product[];
}
