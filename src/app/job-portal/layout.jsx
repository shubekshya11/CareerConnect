"use client"; 

import { AuthProvider } from "../context/AuthContext";
import JobPortalHeader from '../components/JobPortalHeader'
export default function JobPortalLayout({ children }) {
  return <AuthProvider>
        <JobPortalHeader />
    {children}
    </AuthProvider>;
}