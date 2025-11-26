"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);


  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include' // Include cookies in the request
      });

      if (response.ok) {
        const data = await response.json();
        // console.log (data.user);
        setUser(data.user);
      } else {
        // Not authenticated or token expired
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdminAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/admin', {
        credentials: 'include' // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Not authenticated or token expired
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking admin auth status:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };


  // const refreshToken = async () => {
  //   try {
  //     const response = await fetch('/api/auth/refresh', {
  //       method: 'POST',
  //       credentials: 'include' // Include cookies for refresh token
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setUser(data.user);
  //       return true;
  //     } else {
  //       // Refresh failed, logout user
  //       logout();
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //     logout();
  //     return false;
  //   }
  // };

  const clearClientCache = async () => {
    if (typeof window === 'undefined') return;

    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cache) => caches.delete(cache)));
      }
    } catch (error) {
      console.warn('Failed to clear caches on logout:', error);
    }

    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch (storageError) {
      console.warn('Failed to clear storage on logout:', storageError);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include' // Include cookies for logout
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
    await clearClientCache();
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    logout,
    setUser, // For manual login updates
    checkAuthStatus,
    checkAdminAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};