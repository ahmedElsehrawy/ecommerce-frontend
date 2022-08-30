import { makeVar } from "@apollo/client";

export interface Auth {
  isLogin: boolean;
  token: string | null;
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: "CUSTOMER" | "VENDOR";
}

const userInitialValue: Auth = {
  isLogin: false,
  token: null,
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  phone: null,
  role: "CUSTOMER",
};

export const AuthVar = makeVar<Auth>(userInitialValue);
