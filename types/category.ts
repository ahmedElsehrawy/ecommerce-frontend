import { Product } from "./product";

export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  Product: Product[];
}
