import { Product } from "./product";
import { User } from "./user";

export interface Cart {
  id: number;
  user: User;
  userId: number;
  CartItem: CartItem[];
  totalPrice: number;
}

export interface CartItem {
  id: number;
  cart: Cart;
  cartId: number;
  product: Product;
  productId: number;
  quantity: number;
}
