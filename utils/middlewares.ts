import { useRouter } from "next/router";

export const middleware = () => {
  const blockAuthenticatedRoutes = ["/login", "/register"];
  const blockNonAuthenticatedRoutes = ["/cart", "/profile"];
  const router = useRouter();
  if (typeof window !== "undefined") {
    let auth = localStorage.getItem("auth");
    if (auth) {
      let token = JSON.parse(auth).token;
      if (token && blockAuthenticatedRoutes.includes(router.asPath)) {
        router.push("/");
      }
    } else {
      if (blockNonAuthenticatedRoutes.includes(router.asPath)) {
        router.push("/");
      }
    }
  }
};
