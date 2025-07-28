"use client";

import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.unique_name || decoded.name || "");
      } catch {
        setUsername("");
      }
    }
  }, []);

  useEffect(() => {
    // Close dropdown if clicking outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.replace("/auth");
  };

  return (
    <div className={styles.page}>
      <div className={styles.greeting} ref={dropdownRef}>
        <div onClick={() => setDropdownOpen(!dropdownOpen)} style={{ cursor: "pointer" }}>
          Hi, {username || "User"} ▾
        </div>
        {dropdownOpen && (
          <div className={styles.dropdown}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      {/* Your homepage content below */}
    </div>
  );
}
