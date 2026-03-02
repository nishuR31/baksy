'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  provider?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load user from cookie/session on mount
    async function fetchUser() {
      setLoading(true);
      try {
        const res = await axios.get('/api/auth/me', { withCredentials: true });
        setUser(res.data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const login = async (data: any) => {
    setLoading(true);
    try {
      if (data) {
        // Set demo user directly
        setUser({
          id: 'demo-id',
          email: 'demo@baksy.com',
          username: 'DemoUser',
          userName: 'DemoUser',
          avatar: '',
          provider: 'demo',
        });
      } else {
        const res = await axios.post('/api/auth/login', data, { withCredentials: true });
        setUser(res.data.user);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
