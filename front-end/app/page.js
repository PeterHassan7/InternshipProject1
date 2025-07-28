'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Homeredirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          router.replace("/auth");
        } else {
          router.replace("/homepage");
        }
      } catch (err) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        router.replace("/auth");
      }
    } else {
      router.replace("/auth");
    }
  }, [router]);

  return null;
}
