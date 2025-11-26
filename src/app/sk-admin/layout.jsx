"use client"; 

import { AdminProvider } from "../context/AdminContext";

export default function SkdminLayout({ children }) {
  return <AdminProvider>{children}</AdminProvider>;
}