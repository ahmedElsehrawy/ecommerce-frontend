import { Order } from "./order";
import { User } from "./user";

export interface Address {
  id: number;
  user: User;
  userId: number;
  country: string;
  city: string;
  postalCode: string;
  telephone: string;
  street: string;
  houseNumber: string;
  Order: Order[];
}
