import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  status: string;
}

export interface Address {
  label: string;
  recipientName: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  street: string;
  apartment?: string;
  postalCode: string;
  deliveryNotes?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export type PaymentStatus = 'Paid' | 'Pending Payment';
export type ProcessingStatus = 'Pending Payment' | 'Awaiting Shipment' | 'Shipped';
export type StandardOrderStatus = 'Pending Payment' | 'Awaiting Shipment' | 'Shipped';

export interface OrderTimeline {
  title: string;
  date: string;
  completed: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status?: StandardOrderStatus;
  paymentStatus: PaymentStatus;
  processingStatus: ProcessingStatus;
  items: OrderItem[];
  shippingAddress: Address;
  costBreakdown: {
    subtotal: number;
    shipping: number;
    discount?: number;
    total: number;
  };
  tracking?: {
    courier: string;
    trackingNumber: string;
    trackingUrl: string;
    timeline: OrderTimeline[];
  };
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile;
  address: Address;
  orders: Order[];
  login: (email?: string, password?: string) => AuthResult;
  register: (name: string, email: string, password: string) => AuthResult;
  resetPassword: (email: string, newPass: string) => AuthResult;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  updatePassword: (oldPass: string, newPass: string) => boolean;
  updateAddress: (updated: Address) => void;
}

const DEFAULT_USER: UserProfile = {
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@catmail.com',
  phone: '+1 (555) 234-5678',
  avatar: '/images/cat-avatar-1.webp',
  memberSince: 'March 2025',
  status: 'Active Member • Verified Pet Parent'
};

const DEFAULT_ADDRESS: Address = {
  label: 'Home (Primary Address)',
  recipientName: 'Sarah Jenkins',
  phone: '+1 (555) 234-5678',
  country: 'United States',
  province: 'Oregon (OR)',
  city: 'Springfield',
  street: '742 Evergreen Terrace',
  apartment: 'Apt 4B',
  postalCode: '97477'
};

const INITIAL_ORDERS: Order[] = [
  {
    id: '#CL-2026-8821',
    date: '22 Oct 2026',
    total: 29.0,
    paymentStatus: 'Paid',
    processingStatus: 'Shipped',
    items: [
      {
        id: 'catlab-collection-kit',
        name: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        image: '/images/product.webp',
        quantity: 1,
        price: 29.0
      }
    ],
    shippingAddress: DEFAULT_ADDRESS,
    costBreakdown: {
      subtotal: 29.0,
      shipping: 0.0,
      discount: 0.0,
      total: 29.0
    },
    tracking: {
      courier: 'FedEx Express Worldwide',
      trackingNumber: 'FX-9921048219',
      trackingUrl: 'https://fedex.com/track',
      timeline: [
        { title: 'Order Placed & Confirmed', date: '22 Oct 2026, 09:30 AM', completed: true },
        { title: 'Payment Received (Paid)', date: '22 Oct 2026, 09:32 AM', completed: true },
        { title: 'Package Dispatched from Hub', date: '23 Oct 2026, 02:15 PM', completed: true },
        { title: 'In Transit to Regional Facility', date: '24 Oct 2026, 07:45 AM', completed: true },
        { title: 'Out for Delivery', date: 'Est. 25 Oct 2026', completed: false },
        { title: 'Delivered', date: 'Est. 25 Oct 2026', completed: false }
      ]
    }
  },
  {
    id: '#CL-2026-7519',
    date: '12 Oct 2026',
    total: 47.0,
    paymentStatus: 'Paid',
    processingStatus: 'Shipped',
    status: 'Shipped',
    items: [
      {
        id: 'catlab-collection-kit',
        name: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        image: '/images/product.webp',
        quantity: 1,
        price: 29.0
      },
      {
        id: 'catlab-test-strips',
        name: 'CAT LAB+ 10-Parameter Urine Test Strip Foil Pack',
        image: '/images/product-front.webp',
        quantity: 1,
        price: 18.0
      }
    ],
    shippingAddress: DEFAULT_ADDRESS,
    costBreakdown: {
      subtotal: 47.0,
      shipping: 0.0,
      discount: 0.0,
      total: 47.0
    },
    tracking: {
      courier: 'DHL Express',
      trackingNumber: 'DHL-4402918402',
      trackingUrl: 'https://dhl.com/track',
      timeline: [
        { title: 'Order Placed', date: '12 Oct 2026, 11:00 AM', completed: true },
        { title: 'Payment Confirmed', date: '12 Oct 2026, 11:05 AM', completed: true },
        { title: 'Shipped', date: '13 Oct 2026, 03:00 PM', completed: true },
        { title: 'Delivered to Doorstep', date: '16 Oct 2026, 01:20 PM', completed: true }
      ]
    }
  },
  {
    id: '#CL-2026-6402',
    date: '28 Sep 2026',
    total: 18.0,
    paymentStatus: 'Pending Payment',
    processingStatus: 'Pending Payment',
    status: 'Pending Payment',
    items: [
      {
        id: 'catlab-test-strips',
        name: 'CAT LAB+ 10-Parameter Urine Test Strip Foil Pack',
        image: '/images/product-front.webp',
        quantity: 1,
        price: 18.0
      }
    ],
    shippingAddress: DEFAULT_ADDRESS,
    costBreakdown: {
      subtotal: 18.0,
      shipping: 0.0,
      discount: 0.0,
      total: 18.0
    }
  },
  {
    id: '#CL-2026-5120',
    date: '10 Aug 2026',
    total: 29.0,
    paymentStatus: 'Paid',
    processingStatus: 'Awaiting Shipment',
    status: 'Awaiting Shipment',
    items: [
      {
        id: 'catlab-collection-kit',
        name: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        image: '/images/product.webp',
        quantity: 1,
        price: 29.0
      }
    ],
    shippingAddress: DEFAULT_ADDRESS,
    costBreakdown: {
      subtotal: 29.0,
      shipping: 0.0,
      discount: 0.0,
      total: 29.0
    }
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('catlab_is_authenticated');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('catlab_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [address, setAddress] = useState<Address>(() => {
    try {
      const saved = localStorage.getItem('catlab_user_address');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_ADDRESS, ...parsed };
      }
      return DEFAULT_ADDRESS;
    } catch {
      return DEFAULT_ADDRESS;
    }
  });

  const [orders] = useState<Order[]>(INITIAL_ORDERS);

  useEffect(() => {
    try {
      localStorage.setItem('catlab_is_authenticated', JSON.stringify(isAuthenticated));
    } catch {
      // ignore
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('catlab_user_profile', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('catlab_user_address', JSON.stringify(address));
    } catch {
      // ignore
    }
  }, [address]);

  // Load / store registered accounts for prototype persistence
  const getRegisteredUsers = (): Record<string, { name: string; email: string; passwordHash: string }> => {
    try {
      const stored = localStorage.getItem('catlab_registered_users');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return {
      'sarah.jenkins@catmail.com': {
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@catmail.com',
        passwordHash: 'CatLab2026!'
      }
    };
  };

  const saveRegisteredUsers = (users: Record<string, { name: string; email: string; passwordHash: string }>) => {
    try {
      localStorage.setItem('catlab_registered_users', JSON.stringify(users));
    } catch {
      // ignore
    }
  };

  const validatePasswordRule = (pwd: string): boolean => {
    return pwd.length >= 8 && /[A-Za-z]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);
  };

  const login = (email?: string, password?: string): AuthResult => {
    if (!email && !password) {
      setIsAuthenticated(true);
      return { success: true };
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = password || '';

    if (!cleanEmail) {
      return { success: false, error: 'Email address is required.' };
    }

    if (!validatePasswordRule(cleanPass)) {
      return {
        success: false,
        error: 'Password must be at least 8 characters and include letters and symbols.'
      };
    }

    const registered = getRegisteredUsers();
    const existing = registered[cleanEmail];

    if (existing && existing.passwordHash !== cleanPass) {
      return { success: false, error: 'Invalid email or password.' };
    }

    // If new user or matching user, login
    if (existing) {
      setUser((prev) => ({
        ...prev,
        name: existing.name,
        email: existing.email
      }));
    } else {
      // Allow seamless prototype login
      const namePart = cleanEmail.split('@')[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      setUser((prev) => ({
        ...prev,
        name: capitalized,
        email: cleanEmail
      }));
    }

    setIsAuthenticated(true);
    return { success: true };
  };

  const register = (name: string, email: string, password: string): AuthResult => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password;

    if (!cleanName) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!validatePasswordRule(cleanPass)) {
      return {
        success: false,
        error: 'Password must be at least 8 characters and contain letters and symbols.'
      };
    }

    const registered = getRegisteredUsers();
    registered[cleanEmail] = {
      name: cleanName,
      email: cleanEmail,
      passwordHash: cleanPass
    };
    saveRegisteredUsers(registered);

    setUser((prev) => ({
      ...prev,
      name: cleanName,
      email: cleanEmail
    }));
    setIsAuthenticated(true);
    return { success: true };
  };

  const resetPassword = (email: string, newPass: string): AuthResult => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!validatePasswordRule(newPass)) {
      return {
        success: false,
        error: 'Password must be at least 8 characters and contain letters and symbols.'
      };
    }

    const registered = getRegisteredUsers();
    if (registered[cleanEmail]) {
      registered[cleanEmail].passwordHash = newPass;
      saveRegisteredUsers(registered);
    } else {
      registered[cleanEmail] = {
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        passwordHash: newPass
      };
      saveRegisteredUsers(registered);
    }

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const updatePassword = (_oldPass: string, newPass: string) => {
    if (!validatePasswordRule(newPass)) {
      return false;
    }
    return true;
  };

  const updateAddress = (updated: Address) => {
    setAddress(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        address,
        orders,
        login,
        register,
        resetPassword,
        logout,
        updateProfile,
        updatePassword,
        updateAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
