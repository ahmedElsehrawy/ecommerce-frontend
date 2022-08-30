import { ReactiveVar } from "@apollo/client";
import { Auth } from "../apollo/initialState";

export const setAuthVar = async (AuthVar: ReactiveVar<Auth>, user: any) => {
  AuthVar({
    isLogin: true,
    token: user?.token,
    id: user?.id,
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    role: user?.role,
  });
};

export const resetAuthVar = async (AuthVar: ReactiveVar<Auth>) => {
  AuthVar({
    isLogin: false,
    token: null,
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    role: "CUSTOMER",
  });
};

export const storeAuth = async (user: any) => {
  await localStorage.setItem(
    "auth",
    JSON.stringify({
      isLogin: true,
      token: user?.token,
      id: user?.id,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      role: user?.role,
    })
  );
};

export const getAuth = async () => {
  return await localStorage.getItem("auth");
};

export const removeAuth = async () => {
  await localStorage.removeItem("auth");
};
