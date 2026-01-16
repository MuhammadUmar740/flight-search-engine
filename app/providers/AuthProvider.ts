import { useEffect } from "react";
import { fetchToken } from "../api/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const expiry = localStorage.getItem("token_expiry");

      if (token && expiry && Date.now() < Number(expiry)) return;

      const res = await fetchToken();
      localStorage.setItem("token", res.access_token);
      localStorage.setItem(
        "token_expiry",
        (Date.now() + res.expires_in * 1000).toString()
      );
    };

    init();
  }, []);

  return children;
}
