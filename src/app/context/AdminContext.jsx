"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();



export const useAdminAuth = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminAuthStatus();
  }, []);

  const checkAdminAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/admin', {
        credentials: 'include' // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.user);
        return data.user;
      } else {
        // Not authenticated or token expired
        setAdmin(null);
        return null;
      }
    } catch (error) {
      console.error('Error checking admin auth status:', error);
      setAdmin(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearClientCache = async () => {
    if (typeof window === 'undefined') return;

    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cache) => caches.delete(cache)));
      }
    } catch (error) {
      console.warn('Failed to clear caches on admin logout:', error);
    }

    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch (storageError) {
      console.warn('Failed to clear storage on admin logout:', storageError);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/adminLogout', {
        method: 'POST',
        credentials: 'include' // Include cookies for logout
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
    await clearClientCache();
    setAdmin(null);
  };

  const value = {
    admin,
    isLoading,
    logout,
    setAdmin, // For manual login updates
    checkAdminAuthStatus,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};