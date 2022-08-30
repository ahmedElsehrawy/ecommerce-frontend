import { Product } from "./product";

export interface Discount {
  id: number;
  name: string;
  percent: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  Product: Product[];
}
