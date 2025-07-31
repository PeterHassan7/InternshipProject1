"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export function useAuthLogic() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkAndRefreshToken() {
      let token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

      if (!token) {
        router.replace("/auth");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired && refreshToken) {
          const res = await fetch("http://localhost:5057/api/user/refresh-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          if (!res.ok) throw new Error("Refresh failed");

          const data = await res.json();
          token = data.token;

          if (localStorage.getItem("token")) {
            localStorage.setItem("token", data.token);
            if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
          } else {
            sessionStorage.setItem("token", data.token);
            if (data.refreshToken) sessionStorage.setItem("refreshToken", data.refreshToken);
          }
        }

        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.unique_name || decodedToken.name || "");
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        router.replace("/auth");
      }
    }

    checkAndRefreshToken();
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    router.replace("/auth");
  }

 const getInitialDark = () => {
  if (typeof window === "undefined") return false; // SSR safety
  if (localStorage.theme === "dark") return true;
  if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
  return false;
};

const [isDark, setIsDark] = useState(getInitialDark);

useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}, [isDark]);

function toggleDarkMode() {
  setIsDark(prev => !prev);
}


  return { username, logout , isDark , toggleDarkMode };
}
