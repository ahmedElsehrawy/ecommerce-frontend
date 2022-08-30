import { Product } from "./product";

export interface Inventory {
  id: number;
  product: Product;
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}
