"use client";
import Cookies from "js-cookie";

export function isLoggedIn() {
  return Cookies.get("kk_partner") === "1";
}

export function login(password) {
  if (!process.env.NEXT_PUBLIC_PARTNER_PASSWORD) {
    alert("Password belum diset di .env");
    return false;
  }

  if (password === process.env.NEXT_PUBLIC_PARTNER_PASSWORD) {
    Cookies.set("kk_partner", "1", { expires: 3 });
    return true;
  }
  return false;
}

export function logout() {
  Cookies.remove("kk_partner");
}
