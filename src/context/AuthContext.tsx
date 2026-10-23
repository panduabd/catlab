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

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile;
  address: Address;
  orders: Order[];
  login: () => void;
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
  label: 'Home (Alamat Utama)',
  recipientName: 'Sarah Jenkins',
  phone: '+1 (555) 234-5678',
  country: 'United States',
  province: 'Oregon (OR)',
  city: 'Springfield',
  street: '742 Evergreen Terrace',
  apartment: 'Apt 4B',
  postalCode: '97477',
  deliveryNotes: 'Leave at front porch or parcel locker if unattended'
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

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const updatePassword = (_oldPass: string, _newPass: string) => {
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
