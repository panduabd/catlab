import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  CheckCircle2,
  Clock,
  Calendar,
  Truck,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Mail,
  Phone,
  X,
  Package,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle,
  CalendarDays
} from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed';
export type OrderStatus = 'Awaiting Shipment' | 'Shipped' | 'Cancelled';

export interface OrderItemProduct {
  sku: string;
  title: string;
  variant: string;
  quantity: number;
  price: number; // TWD
  weight: number; // in grams
  image: string;
  productId?: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  postalCode: string;
  city: string;
  country: string;
  items: OrderItemProduct[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  status?: OrderStatus; // alias for compatibility
  trackingNumber?: string;
  shippedAt?: string;
}

const initialOrders: OrderItem[] = [
  {
    id: 'ord-101',
    orderNumber: '#CL-2026-8821',
    createdAt: '2026-10-24 09:42',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.jenkins@example.com',
    customerPhone: '+886 912-345-678',
    shippingAddress: 'No. 168, Section 3, Zhongxiao E Rd, Daan District, Apt 4B',
    postalCode: '10601',
    city: 'Taipei City',
    country: 'Taiwan',
    items: [
      {
        sku: 'CLP-KIT-01',
        title: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        variant: 'Complete 10-Parameter Kit',
        quantity: 1,
        price: 890,
        weight: 420,
        image: '/images/product.webp',
        productId: 'prod-001'
      }
    ],
    subtotal: 890,
    shippingCost: 0,
    total: 890,
    paymentStatus: 'Paid',
    orderStatus: 'Awaiting Shipment',
    status: 'Awaiting Shipment'
  },
  {
    id: 'ord-102',
    orderNumber: '#CL-2026-8822',
    createdAt: '2026-10-24 08:15',
    customerName: 'Dr. Chen Wei-Ming',
    customerEmail: 'chen.vet@catcare.tw',
    customerPhone: '+886 928-876-543',
    shippingAddress: 'No. 88, Dunhua S Rd, Songshan District, Floor 2 Clinic',
    postalCode: '10557',
    city: 'Taipei City',
    country: 'Taiwan',
    items: [
      {
        sku: 'CLP-KIT-01',
        title: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        variant: 'Complete 10-Parameter Kit',
        quantity: 2,
        price: 890,
        weight: 420,
        image: '/images/product.webp',
        productId: 'prod-001'
      },
      {
        sku: 'CLP-RFL-10P',
        title: 'CAT LAB+ Urine Test Strip 10-Parameter Refill Pack',
        variant: '10 Foil Packs / Box',
        quantity: 3,
        price: 490,
        weight: 80,
        image: '/images/product-front.webp',
        productId: 'prod-002'
      }
    ],
    subtotal: 3250,
    shippingCost: 0,
    total: 3250,
    paymentStatus: 'Paid',
    orderStatus: 'Awaiting Shipment',
    status: 'Awaiting Shipment'
  },
  {
    id: 'ord-103',
    orderNumber: '#CL-2026-8823',
    createdAt: '2026-10-23 21:10',
    customerName: 'Lin Chia-Hao',
    customerEmail: 'chiahao.lin@outlook.com',
    customerPhone: '+886 933-112-233',
    shippingAddress: '7-11 Hsinchu Science Park Store (Store ID: 981203)',
    postalCode: '30078',
    city: 'Hsinchu City',
    country: 'Taiwan',
    items: [
      {
        sku: 'CLP-KIT-01',
        title: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        variant: 'Complete 10-Parameter Kit',
        quantity: 1,
        price: 890,
        weight: 420,
        image: '/images/product.webp',
        productId: 'prod-001'
      }
    ],
    subtotal: 890,
    shippingCost: 60,
    total: 950,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    status: 'Shipped',
    trackingNumber: '711-TW-98421039',
    shippedAt: '2026-10-24 07:30'
  },
  {
    id: 'ord-104',
    orderNumber: '#CL-2026-8824',
    createdAt: '2026-10-23 18:04',
    customerName: 'Emily Watson',
    customerEmail: 'emily.w@gmail.com',
    customerPhone: '+886 987-654-321',
    shippingAddress: 'No. 45, Wenxing Rd, Zhubei City',
    postalCode: '30264',
    city: 'Hsinchu County',
    country: 'Taiwan',
    items: [
      {
        sku: 'CLP-RFL-10P',
        title: 'CAT LAB+ Urine Test Strip 10-Parameter Refill Pack',
        variant: '10 Foil Packs / Box',
        quantity: 2,
        price: 490,
        weight: 80,
        image: '/images/product-front.webp',
        productId: 'prod-002'
      }
    ],
    subtotal: 980,
    shippingCost: 0,
    total: 980,
    paymentStatus: 'Pending',
    orderStatus: 'Awaiting Shipment',
    status: 'Awaiting Shipment'
  },
  {
    id: 'ord-105',
    orderNumber: '#CL-2026-8825',
    createdAt: '2026-10-23 14:22',
    customerName: 'Kao Shu-Fen',
    customerEmail: 'shufen.kao@yahoo.com.tw',
    customerPhone: '+886 910-998-877',
    shippingAddress: 'No. 12, Gongyuan Rd, Kinmen County (Outlying Island)',
    postalCode: '89345',
    city: 'Kinmen County',
    country: 'Taiwan',
    items: [
      {
        sku: 'CLP-KIT-01',
        title: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        variant: 'Complete 10-Parameter Kit',
        quantity: 1,
        price: 890,
        weight: 420,
        image: '/images/product.webp',
        productId: 'prod-001'
      }
    ],
    subtotal: 890,
    shippingCost: 180,
    total: 1070,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    status: 'Shipped',
    trackingNumber: 'TCAT-849102910',
    shippedAt: '2026-10-23 17:00'
  },
  {
    id: 'ord-106',
    orderNumber: '#CL-2026-8826',
    createdAt: '2026-10-23 11:05',
    customerName: 'Chang Yu-Ting',
    customerEmail: 'yuting.chang@gmail.com',
    customerPhone: '+886 921-334-455',
    shippingAddress: 'No. 320, Taiwan Blvd, Xitun District',
    postalCode: '40701',
    city: 'Taichung City',
    country: 'Taiwan',
    items: [
      {
        sku: 'CLP-KIT-01',
        title: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        variant: 'Complete 10-Parameter Kit',
        quantity: 1,
        price: 890,
        weight: 420,
        image: '/images/product.webp',
        productId: 'prod-001'
      }
    ],
    subtotal: 890,
    shippingCost: 0,
    total: 890,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    status: 'Shipped',
    trackingNumber: '711-TW-98319201',
    shippedAt: '2026-10-23 13:00'
  },
  {
    id: 'ord-107',
    orderNumber: '#CL-2026-8827',
    createdAt: '2026-10-22 15:30',
    customerName: 'David Lee',
    customerEmail: 'david.lee@example.tw',
    customerPhone: '+886 918-776-543',
    shippingAddress: 'No. 55, Sec. 2, Keelung Rd, Xinyi District',
    postalCode: '11052',
    city: 'Taipei City',
    country: 'Taiwan',
    items: [
      {
        sku: 'CLP-KIT-01',
        title: 'CAT LAB+ Hydrophobic Cat Litter Kit',
        variant: 'Complete 10-Parameter Kit',
        quantity: 1,
        price: 890,
        weight: 420,
        image: '/images/product.webp',
        productId: 'prod-001'
      }
    ],
    subtotal: 890,
    shippingCost: 0,
    total: 890,
    paymentStatus: 'Failed',
    orderStatus: 'Cancelled',
    status: 'Cancelled'
  }
];

interface AdminOrderManagementProps {
  onShowToast?: (msg: string) => void;
  onNavigateToStorefront?: (
    view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account' | 'admin',
    anchor?: string
  ) => void;
}

export const AdminOrderManagement: React.FC<AdminOrderManagementProps> = ({
  onShowToast,
  onNavigateToStorefront
}) => {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Date & Time Range Filter State
  const [isDateFilterModalOpen, setIsDateFilterModalOpen] = useState(false);
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);
  const [startDate, setStartDate] = useState('2026-10-22');
  const [startTime, setStartTime] = useState('00:00');
  const [endDate, setEndDate] = useState('2026-10-24');
  const [endTime, setEndTime] = useState('23:59');

  // In-row tracking inputs state { [orderId]: string }
  const [inlineTrackingInputs, setInlineTrackingInputs] = useState<Record<string, string>>({});

  // Single Order Modal State
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [waybillInput, setWaybillInput] = useState('');
  const [isSubmittingFulfillment, setIsSubmittingFulfillment] = useState(false);

  // Copied state: 'contact' | 'address' | null
  const [copiedItem, setCopiedItem] = useState<'contact' | 'address' | null>(null);

  // Confirmation Modal State for Waybill & Status Change
  const [confirmShipModal, setConfirmShipModal] = useState<{
    orderId: string;
    orderNumber: string;
    customerName: string;
    trackingNumber: string;
  } | null>(null);

  // "Don't show confirmation again today" state
  const [skipShipConfirmToday, setSkipShipConfirmToday] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('catlab_skip_ship_confirm_date');
      const today = new Date().toISOString().slice(0, 10);
      return stored === today;
    } catch {
      return false;
    }
  });
  const [ignoreConfirmTodayCheckbox, setIgnoreConfirmTodayCheckbox] = useState(false);

  // Floating 5-Second Undo Toast State (Gmail-style)
  const [undoState, setUndoState] = useState<{
    previousOrders: OrderItem[];
    message: string;
    secondsRemaining: number;
  } | null>(null);
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Bulk CSV Import Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importParsedRows, setImportParsedRows] = useState<
    Array<{
      orderNumber: string;
      customerName: string;
      currentPaymentStatus: PaymentStatus;
      currentOrderStatus: OrderStatus;
      newTracking: string;
      isValid: boolean;
      orderId?: string;
    }>
  >([]);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle countdown for the 5-second Undo floating banner
  useEffect(() => {
    if (!undoState) return;

    if (undoTimerRef.current) {
      clearInterval(undoTimerRef.current);
    }

    undoTimerRef.current = setInterval(() => {
      setUndoState((prev) => {
        if (!prev) return null;
        if (prev.secondsRemaining <= 1) {
          if (undoTimerRef.current) clearInterval(undoTimerRef.current);
          return null;
        }
        return {
          ...prev,
          secondsRemaining: prev.secondsRemaining - 1
        };
      });
    }, 1000);

    return () => {
      if (undoTimerRef.current) {
        clearInterval(undoTimerRef.current);
      }
    };
  }, [undoState?.message, undoState?.previousOrders]);

  // Execute Undo Action
  const handlePerformUndo = () => {
    if (!undoState) return;
    setOrders(undoState.previousOrders);
    if (undoTimerRef.current) clearInterval(undoTimerRef.current);
    setUndoState(null);
  };

  // Helper to trigger status change with snapshot for Undo (ONLY bottom toast, no top-right toast)
  const triggerStatusChangeWithUndo = (
    newOrders: OrderItem[],
    message: string
  ) => {
    const previousSnapshot = [...orders];
    setOrders(newOrders);
    setUndoState({
      previousOrders: previousSnapshot,
      message,
      secondsRemaining: 5
    });
  };

  // Copy helper
  const handleCopy = (text: string, type: 'contact' | 'address') => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Filter Logic with Search, Payment, Order Status, and Date & Time Range
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchPayment =
        paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter;

      const matchOrder =
        orderStatusFilter === 'all' || order.orderStatus === orderStatusFilter;

      let matchDate = true;
      if (isDateFilterActive) {
        try {
          const orderTimestamp = new Date(order.createdAt.replace(' ', 'T')).getTime();
          const startTimestamp = new Date(`${startDate}T${startTime}`).getTime();
          const endTimestamp = new Date(`${endDate}T${endTime}`).getTime();
          matchDate = orderTimestamp >= startTimestamp && orderTimestamp <= endTimestamp;
        } catch {
          matchDate = true;
        }
      }

      return matchSearch && matchPayment && matchOrder && matchDate;
    });
  }, [orders, searchQuery, paymentStatusFilter, orderStatusFilter, isDateFilterActive, startDate, startTime, endDate, endTime]);

  // Bulk Selection Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter((item) => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const targetOrders =
      selectedOrderIds.length > 0
        ? orders.filter((o) => selectedOrderIds.includes(o.id))
        : filteredOrders;

    if (targetOrders.length === 0) {
      alert('No orders available to export.');
      return;
    }

    const headers = [
      'Order ID',
      'Recipient Name',
      'Phone Number',
      'Delivery Address',
      'Postal Code',
      'City',
      'Items Summary',
      'Total Weight (g)',
      'Total Amount (TWD)',
      'Payment Status',
      'Order Status',
      'Tracking Number'
    ];

    const rows = targetOrders.map((o) => {
      const itemSummary = o.items.map((i) => `${i.title} (${i.quantity}x)`).join('; ');
      const totalWeight = o.items.reduce((acc, curr) => acc + curr.weight * curr.quantity, 0);

      return [
        `"${o.orderNumber}"`,
        `"${o.customerName}"`,
        `"${o.customerPhone}"`,
        `"${o.shippingAddress.replace(/"/g, '""')}"`,
        `"${o.postalCode}"`,
        `"${o.city}"`,
        `"${itemSummary.replace(/"/g, '""')}"`,
        totalWeight,
        o.total,
        `"${o.paymentStatus}"`,
        `"${o.orderStatus}"`,
        `"${o.trackingNumber || ''}"`
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Direct In-Row Tracking Submission via Check Icon
  const handleInitiateInlineShip = (order: OrderItem) => {
    const tracking = (inlineTrackingInputs[order.id] || '').trim();
    if (!tracking) {
      alert('Please enter a tracking number before marking as Shipped.');
      return;
    }

    // If user already chose "Ignore for today", skip confirmation modal
    if (skipShipConfirmToday) {
      executeShipOrder(order.id, tracking, order.orderNumber);
    } else {
      setConfirmShipModal({
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        trackingNumber: tracking
      });
      setIgnoreConfirmTodayCheckbox(false);
    }
  };

  // Execute Shipment & Status Change
  const executeShipOrder = (orderId: string, trackingNumber: string, orderNumber: string) => {
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            trackingNumber,
            orderStatus: 'Shipped' as const,
            status: 'Shipped' as const,
            shippedAt: nowStr
          }
        : o
    );

    triggerStatusChangeWithUndo(
      updated,
      `Order ${orderNumber} marked as Shipped.`
    );

    setConfirmShipModal(null);
  };

  // Handle confirmation submit from modal
  const handleConfirmShipModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmShipModal) return;

    if (ignoreConfirmTodayCheckbox) {
      try {
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem('catlab_skip_ship_confirm_date', today);
        setSkipShipConfirmToday(true);
      } catch {
        // ignore
      }
    }

    executeShipOrder(
      confirmShipModal.orderId,
      confirmShipModal.trackingNumber,
      confirmShipModal.orderNumber
    );
  };

  // Modal Waybill Submit: IMMEDIATELY CLOSES MODAL and returns to Order Management
  const handleModalFulfillWaybill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !waybillInput.trim()) return;

    setIsSubmittingFulfillment(true);

    setTimeout(() => {
      const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
      const tracking = waybillInput.trim();
      const currentOrderNum = selectedOrder.orderNumber;

      const updatedList = orders.map((o) => {
        if (o.id === selectedOrder.id) {
          return {
            ...o,
            trackingNumber: tracking,
            orderStatus: 'Shipped' as const,
            status: 'Shipped' as const,
            shippedAt: nowStr
          };
        }
        return o;
      });

      // Close modal immediately and return to Order Management
      setSelectedOrder(null);
      setIsSubmittingFulfillment(false);

      // ONLY show the bottom floating toast (Undo bar), NO top-right notification
      triggerStatusChangeWithUndo(
        updatedList,
        `Order ${currentOrderNum} updated to Shipped.`
      );
    }, 250);
  };

  // Handle Sample CSV for Prototype Testing (Dev/Programmer only indicator)
  const handleLoadDemoCSV = () => {
    const pendingOrders = orders.filter((o) => o.orderStatus === 'Awaiting Shipment');
    if (pendingOrders.length === 0) {
      setImportError('No orders are currently in Awaiting Shipment status to test demo import.');
      return;
    }

    const demoRows = pendingOrders.map((ord, idx) => ({
      orderNumber: ord.orderNumber,
      customerName: ord.customerName,
      currentPaymentStatus: ord.paymentStatus,
      currentOrderStatus: ord.orderStatus,
      newTracking: `711-TW-98${idx}10${Math.floor(100 + Math.random() * 900)}`,
      isValid: true,
      orderId: ord.id
    }));

    setImportParsedRows(demoRows);
    setImportError(null);
  };

  // Handle Actual CSV File Upload & Parsing
  const handleCSVFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) {
        setImportError('Uploaded CSV file is empty.');
        return;
      }

      try {
        const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          setImportError('CSV file must have a header row and at least 1 order row.');
          return;
        }

        const parsed: Array<{
          orderNumber: string;
          customerName: string;
          currentPaymentStatus: PaymentStatus;
          currentOrderStatus: OrderStatus;
          newTracking: string;
          isValid: boolean;
          orderId?: string;
        }> = [];

        // Skip header line
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map((c) => c.replace(/^["']|["']$/g, '').trim());
          const orderNum = cols[0];
          const tracking = cols[11] || cols[10] || cols[1] || cols[cols.length - 1] || '';

          if (orderNum) {
            const matched = orders.find(
              (o) => o.orderNumber.toLowerCase() === orderNum.toLowerCase()
            );

            if (matched) {
              parsed.push({
                orderNumber: matched.orderNumber,
                customerName: matched.customerName,
                currentPaymentStatus: matched.paymentStatus,
                currentOrderStatus: matched.orderStatus,
                newTracking: tracking || `TCAT-${Math.floor(100000000 + Math.random() * 900000000)}`,
                isValid: true,
                orderId: matched.id
              });
            } else {
              parsed.push({
                orderNumber: orderNum,
                customerName: 'Unknown Order',
                currentPaymentStatus: 'Paid',
                currentOrderStatus: 'Awaiting Shipment',
                newTracking: tracking || 'N/A',
                isValid: false
              });
            }
          }
        }

        if (parsed.length === 0) {
          setImportError('No valid order IDs could be matched from the uploaded CSV file.');
          return;
        }

        setImportParsedRows(parsed);
      } catch {
        setImportError('Failed to parse CSV file. Please ensure valid UTF-8 format.');
      }
    };

    reader.readAsText(file);
  };

  // Apply Bulk CSV Update
  const handleApplyBulkImport = () => {
    const validRows = importParsedRows.filter((r) => r.isValid && r.orderId && r.newTracking);
    if (validRows.length === 0) {
      alert('No valid rows available to apply.');
      return;
    }

    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const trackingMap = new Map(validRows.map((r) => [r.orderId!, r.newTracking]));

    const updated = orders.map((o) => {
      if (trackingMap.has(o.id)) {
        return {
          ...o,
          trackingNumber: trackingMap.get(o.id),
          orderStatus: 'Shipped' as const,
          status: 'Shipped' as const,
          shippedAt: nowStr
        };
      }
      return o;
    });

    setIsImportModalOpen(false);
    setImportParsedRows([]);

    triggerStatusChangeWithUndo(
      updated,
      `Bulk updated ${validRows.length} orders to Shipped.`
    );
  };

  // Payment Status Badge: Pending | Paid | Failed (No dot, text-[11px] font-semibold)
  const renderPaymentStatusBadge = (status: PaymentStatus) => {
    if (status === 'Paid') {
      return (
        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/80">
          Paid
        </span>
      );
    }
    if (status === 'Pending') {
      return (
        <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 border border-amber-200/80">
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-md bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700 border border-rose-200/80">
        Failed
      </span>
    );
  };

  // Order Status Badge: Awaiting Shipment | Shipped | Cancelled (No dot, text-[11px] font-semibold)
  const renderOrderStatusBadge = (status: OrderStatus) => {
    if (status === 'Awaiting Shipment') {
      return (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 border border-blue-200/80">
          Awaiting Shipment
        </span>
      );
    }
    if (status === 'Shipped') {
      return (
        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/80">
          Shipped
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600 border border-gray-300">
        Cancelled
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* MODULE TITLE & TOP ACTION BUTTONS                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Order Management
            </h1>
            <AdminHelpIcon text="Transaction orders operations: separated Payment & Order Status, date-time range calendar filter, inline tracking with single-click fulfillment, CSV export, and bulk CSV tracking import with 5-second undo protection." />
          </div>
        </div>

        {/* Action Buttons: Import CSV & Export CSV */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Import CSV Button */}
          <AdminTooltip content="Bulk update tracking numbers using CSV spreadsheet file">
            <button
              type="button"
              onClick={() => {
                setIsImportModalOpen(true);
                setImportParsedRows([]);
                setImportError(null);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-4 py-2.5 text-xs font-semibold shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
            >
              <Upload className="h-4 w-4 text-charcoal" />
              <span>Import CSV</span>
            </button>
          </AdminTooltip>

          {/* Export to CSV Button */}
          <AdminTooltip content="Export order list to structured CSV for courier logistics portals and MOF tax reporting">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-[0.99] cursor-pointer"
            >
              <Download className="h-4 w-4 text-yellow" />
              <span>
                Export to CSV
                {selectedOrderIds.length > 0 && ` (${selectedOrderIds.length})`}
              </span>
            </button>
          </AdminTooltip>
        </div>
      </div>

      {/* Query Engine & Filter Controls (Search + Payment + Order Status + Date/Time Range) */}
      <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Bar */}
          <div className="sm:col-span-4 relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID or Customer..."
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all"
            />
          </div>

          {/* Payment Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-xs sm:text-sm text-gray-700 focus:bg-white focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none cursor-pointer"
            >
              <option value="all">All Payment</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Order Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-xs sm:text-sm text-gray-700 focus:bg-white focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none cursor-pointer"
            >
              <option value="all">All Order Status</option>
              <option value="Awaiting Shipment">Awaiting Shipment</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date & Time Range Calendar Filter Button */}
          <div className="sm:col-span-4 relative">
            <button
              type="button"
              onClick={() => setIsDateFilterModalOpen(!isDateFilterModalOpen)}
              className={`w-full h-11 rounded-xl border px-3 text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                isDateFilterActive
                  ? 'border-charcoal bg-yellow/15 text-charcoal shadow-2xs font-bold'
                  : 'border-gray-200 bg-gray-50/50 text-gray-700 hover:bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <CalendarDays className={`h-4 w-4 shrink-0 ${isDateFilterActive ? 'text-charcoal' : 'text-gray-400'}`} />
                <span className="truncate">
                  {isDateFilterActive
                    ? `${startDate} ${startTime} → ${endDate} ${endTime}`
                    : 'Date & Time Range'}
                </span>
              </div>

              {isDateFilterActive && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDateFilterActive(false);
                  }}
                  className="p-1 rounded-full hover:bg-black/10 text-gray-600 hover:text-black shrink-0"
                  aria-label="Clear date filter"
                >
                  ✕
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Selected count banner if rows selected */}
        {selectedOrderIds.length > 0 && (
          <div className="rounded-xl bg-yellow/15 border border-yellow/30 px-3.5 py-2 flex items-center justify-between text-xs text-charcoal">
            <span className="font-semibold">
              {selectedOrderIds.length} orders selected for batch processing.
            </span>
            <button
              type="button"
              onClick={() => setSelectedOrderIds([])}
              className="text-xs text-gray-600 hover:text-black underline cursor-pointer"
            >
              Deselect All
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* DATE & TIME RANGE CALENDAR POPOVER MODAL                                  */}
      {/* ========================================================================= */}
      {isDateFilterModalOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-charcoal text-yellow">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">
                    Filter by Date & Time Range
                  </h3>
                  <p className="text-xs text-gray-500">
                    Filter orders by precise start and end timestamp
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDateFilterModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xs p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Quick Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date().toISOString().slice(0, 10);
                    setStartDate(today);
                    setStartTime('00:00');
                    setEndDate(today);
                    setEndTime('23:59');
                  }}
                  className="rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-800 transition-all cursor-pointer text-center"
                >
                  Today
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    setStartDate(past.toISOString().slice(0, 10));
                    setStartTime('00:00');
                    setEndDate(now.toISOString().slice(0, 10));
                    setEndTime('23:59');
                  }}
                  className="rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-800 transition-all cursor-pointer text-center"
                >
                  Last 7 Days
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    const past = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
                    setStartDate(past.toISOString().slice(0, 10));
                    setStartTime('00:00');
                    setEndDate(now.toISOString().slice(0, 10));
                    setEndTime('23:59');
                  }}
                  className="rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-800 transition-all cursor-pointer text-center"
                >
                  Last 14 Days
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    setStartDate(past.toISOString().slice(0, 10));
                    setStartTime('00:00');
                    setEndDate(now.toISOString().slice(0, 10));
                    setEndTime('23:59');
                  }}
                  className="rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-800 transition-all cursor-pointer text-center"
                >
                  Last 30 Days
                </button>
              </div>
            </div>

            {/* Custom Range Picker Form */}
            <div className="space-y-3.5 pt-1 border-t border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Custom Timestamp Range
              </label>

              {/* Start Date & Time */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-3.5 space-y-2">
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-500" />
                  <span>Start Date & Time</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-900 focus:outline-none focus:border-charcoal"
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-900 focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>

              {/* End Date & Time */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-3.5 space-y-2">
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-500" />
                  <span>End Date & Time</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-900 focus:outline-none focus:border-charcoal"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-900 focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setIsDateFilterActive(false);
                  setIsDateFilterModalOpen(false);
                }}
                className="text-xs font-semibold text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                Clear Range Filter
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDateFilterModalOpen(false)}
                  className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDateFilterActive(true);
                    setIsDateFilterModalOpen(false);
                  }}
                  className="rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  Apply Date Range
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ORDERS MAIN TABLE (SEPARATED PAYMENT STATUS & ORDER STATUS)               */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-gray-200/90 bg-white shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold select-none">
                <th className="py-3.5 pl-4 sm:pl-6 pr-2 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredOrders.length > 0 &&
                      selectedOrderIds.length === filteredOrders.length
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-charcoal focus:ring-yellow accent-charcoal cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3">Order ID</th>
                <th className="py-3.5 px-3">Date & Time</th>
                <th className="py-3.5 px-3">Customer</th>
                <th className="py-3.5 px-3">Total Amount</th>
                <th className="py-3.5 px-3">Payment Status</th>
                <th className="py-3.5 px-3">Order Status</th>
                <th className="py-3.5 px-3 min-w-[180px]">Tracking Number</th>
                <th className="py-3.5 pr-4 sm:pr-6 pl-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const isSelected = selectedOrderIds.includes(order.id);

                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-gray-50/80 transition-colors ${
                        isSelected ? 'bg-yellow/5' : ''
                      }`}
                    >
                      <td className="py-4 pl-4 sm:pl-6 pr-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(order.id)}
                          className="h-4 w-4 rounded border-gray-300 text-charcoal focus:ring-yellow accent-charcoal cursor-pointer"
                        />
                      </td>

                      {/* Order ID: Formatted like #CL-2026-8821 */}
                      <td className="py-4 px-3 font-mono font-bold text-gray-900 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setWaybillInput(order.trackingNumber || '');
                          }}
                          className="hover:underline text-charcoal hover:text-black cursor-pointer text-left"
                        >
                          {order.orderNumber}
                        </button>
                      </td>

                      {/* Timestamp */}
                      <td className="py-4 px-3 text-gray-500 whitespace-nowrap text-xs">
                        {order.createdAt}
                      </td>

                      {/* Customer Name */}
                      <td className="py-4 px-3">
                        <p className="font-semibold text-gray-900">{order.customerName}</p>
                        <p className="text-[11px] text-gray-400 truncate max-w-[150px]">
                          {order.customerEmail}
                        </p>
                      </td>

                      {/* Total Amount */}
                      <td className="py-4 px-3 font-semibold text-gray-900 tabular-nums whitespace-nowrap">
                        NT$ {order.total.toLocaleString()}
                      </td>

                      {/* Payment Status Badge */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        {renderPaymentStatusBadge(order.paymentStatus)}
                      </td>

                      {/* Order Status: If Payment is Pending, show placeholder 'Awaiting payment' */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        {order.paymentStatus === 'Pending' ? (
                          <span className="text-gray-400 italic text-xs">
                            Awaiting payment
                          </span>
                        ) : (
                          renderOrderStatusBadge(order.orderStatus)
                        )}
                      </td>

                      {/* ============================================================= */}
                      {/* TRACKING NUMBER: If Payment is Pending, show placeholder      */}
                      {/* ============================================================= */}
                      <td className="py-4 px-3">
                        {order.paymentStatus === 'Pending' ? (
                          <span className="text-gray-400 italic text-xs">
                            Awaiting payment
                          </span>
                        ) : order.orderStatus === 'Awaiting Shipment' ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={inlineTrackingInputs[order.id] ?? ''}
                              onChange={(e) =>
                                setInlineTrackingInputs({
                                  ...inlineTrackingInputs,
                                  [order.id]: e.target.value
                                })
                              }
                              placeholder="e.g. 711-TW-98421039"
                              className="h-8 w-38 rounded-lg border border-gray-300 bg-white px-2.5 font-mono text-xs text-gray-900 placeholder:font-sans placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-2 focus:ring-yellow/20"
                            />
                            <AdminTooltip content="Save tracking & mark as Shipped">
                              <button
                                type="button"
                                onClick={() => handleInitiateInlineShip(order)}
                                className="h-8 w-8 flex items-center justify-center rounded-lg bg-charcoal hover:bg-black text-white cursor-pointer transition-all active:scale-95 shrink-0 shadow-2xs"
                                aria-label="Mark as Shipped"
                              >
                                <Check className="h-4 w-4 text-yellow" />
                              </button>
                            </AdminTooltip>
                          </div>
                        ) : order.orderStatus === 'Shipped' ? (
                          <span className="font-mono text-xs bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                            {order.trackingNumber}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-xs">
                            Cancelled
                          </span>
                        )}
                      </td>

                      {/* Actions: View Detail Modal */}
                      <td className="py-4 pr-4 sm:pr-6 pl-3 text-right whitespace-nowrap">
                        <AdminTooltip content="View full order details and packaging checklist">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedOrder(order);
                              setWaybillInput(order.trackingNumber || '');
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Details</span>
                          </button>
                        </AdminTooltip>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-500">
                    No orders match your filter criteria or search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="border-t border-gray-200/80 bg-gray-50/50 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>
              Showing 1–{filteredOrders.length} of {orders.length} total orders
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                className="h-7 w-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="px-2 font-semibold text-gray-800">1</span>
              <button
                type="button"
                disabled
                className="h-7 w-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SINGLE ORDER DETAIL MODAL                                                 */}
      {/* ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 space-y-6">
            {/* Modal Header with Both Badges */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-xl font-extrabold text-gray-900 font-mono">
                    {selectedOrder.orderNumber}
                  </h3>
                  {renderPaymentStatusBadge(selectedOrder.paymentStatus)}
                  {selectedOrder.paymentStatus === 'Pending' ? (
                    <span className="text-gray-400 italic text-xs bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                      Awaiting payment
                    </span>
                  ) : (
                    renderOrderStatusBadge(selectedOrder.orderStatus)
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Created on: {selectedOrder.createdAt} • System ID: {selectedOrder.id}
                </p>
              </div>

              {/* Close Button Only */}
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Customer & Shipping Details (WITH ICON-ONLY COPY BUTTONS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 p-4">
              {/* Recipient Contact with Icon-Only Copy Button */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>Recipient Contact</span>
                  </h4>
                  <AdminTooltip content="Copy recipient contact info">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `${selectedOrder.customerName} | ${selectedOrder.customerPhone} | ${selectedOrder.customerEmail}`,
                          'contact'
                        )
                      }
                      className="p-1 rounded-md text-gray-400 hover:text-charcoal hover:bg-gray-200 transition-colors cursor-pointer"
                      aria-label="Copy contact"
                    >
                      {copiedItem === 'contact' ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </AdminTooltip>
                </div>

                <p className="text-sm font-bold text-gray-900">{selectedOrder.customerName}</p>
                <p className="text-xs text-gray-600">{selectedOrder.customerEmail}</p>
                <p className="text-xs text-gray-600">{selectedOrder.customerPhone}</p>
              </div>

              {/* Delivery Address with Icon-Only Copy Button */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Delivery Address</span>
                  </h4>
                  <AdminTooltip content="Copy full shipping address for courier booking">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `${selectedOrder.shippingAddress}, ${selectedOrder.city} ${selectedOrder.postalCode}, ${selectedOrder.country}`,
                          'address'
                        )
                      }
                      className="p-1 rounded-md text-gray-400 hover:text-charcoal hover:bg-gray-200 transition-colors cursor-pointer"
                      aria-label="Copy address"
                    >
                      {copiedItem === 'address' ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </AdminTooltip>
                </div>

                <p className="text-xs text-gray-800 leading-relaxed font-medium">
                  {selectedOrder.shippingAddress}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedOrder.city}, Postal Code: {selectedOrder.postalCode} ({selectedOrder.country})
                </p>
              </div>
            </div>

            {/* =================================================================== */}
            {/* WAREHOUSE PACKING CHECKLIST & ITEM BREAKDOWN (STRONGLY HIGHLIGHTED) */}
            {/* =================================================================== */}
            <div className="rounded-2xl border-2 border-yellow/60 bg-amber-50/20 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-amber-200/70">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 px-2.5 items-center justify-center rounded-md bg-charcoal text-yellow font-extrabold text-[11px] uppercase tracking-wider">
                    Packing Checklist
                  </span>
                  <span className="text-xs font-bold text-gray-700">
                    Verify physical items before sealing package
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  Subtotal: NT$ {selectedOrder.subtotal.toLocaleString()}
                </span>
              </div>

              {/* Items List with Product Thumbnails & Clickable Storefront Link */}
              <div className="space-y-3 divide-y divide-amber-100">
                {selectedOrder.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Product Thumbnail Image */}
                      <img
                        src={it.image}
                        alt={it.title}
                        className="h-12 w-12 rounded-xl object-cover bg-white border border-gray-200 shrink-0 shadow-2xs"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] font-bold text-gray-700 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-2xs">
                            {it.sku}
                          </span>

                          {/* Clickable Title Navigating to Customer Storefront PDP */}
                          <button
                            type="button"
                            onClick={() => onNavigateToStorefront?.('product')}
                            className="font-bold text-gray-900 text-left hover:text-black hover:underline cursor-pointer inline-flex items-center gap-1 group transition-colors"
                            aria-label="Open product page on storefront"
                          >
                            <span className="truncate max-w-[280px] sm:max-w-md">{it.title}</span>
                            <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-charcoal shrink-0" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-gray-500 text-[11px]">
                          <span>Variant: {it.variant}</span>
                          <span>•</span>
                          <span>Weight: {it.weight}g</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Badge & Price */}
                    <div className="text-right shrink-0">
                      <div className="inline-block bg-charcoal text-yellow font-extrabold px-2 py-0.5 rounded text-xs tracking-wider mb-1">
                        QTY: {it.quantity}
                      </div>
                      <p className="font-semibold text-gray-900 tabular-nums text-xs">
                        NT$ {(it.quantity * it.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Financial Breakdown */}
              <div className="pt-3 border-t border-amber-200/70 space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Cost</span>
                  <span>
                    {selectedOrder.shippingCost === 0 ? 'FREE' : `NT$ ${selectedOrder.shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-1.5 border-t border-amber-200">
                  <span>Total Order Amount</span>
                  <span>NT$ {selectedOrder.total.toLocaleString()} TWD</span>
                </div>
              </div>
            </div>

            {/* =================================================================== */}
            {/* COURIER TRACKING: Apply Changes CLOSES MODAL DIRECTLY               */}
            {/* =================================================================== */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Courier Tracking & Fulfillment
                </h4>
                <AdminHelpIcon text="Saving the tracking number will update the order status to Shipped and immediately close this modal back to Order Management." />
              </div>

              <form onSubmit={handleModalFulfillWaybill} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={waybillInput}
                    onChange={(e) => setWaybillInput(e.target.value)}
                    placeholder="e.g. 711-TW-98421039 or TCAT-849102910"
                    className="flex-1 h-11 rounded-xl border border-gray-300 bg-white px-3.5 font-mono text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingFulfillment}
                    className="h-11 rounded-xl bg-charcoal hover:bg-black text-white px-5 text-xs font-bold shadow-sm transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 shrink-0"
                  >
                    {isSubmittingFulfillment ? (
                      <span>Saving & Closing...</span>
                    ) : selectedOrder.orderStatus === 'Shipped' ? (
                      <span>Apply Changes</span>
                    ) : (
                      <span>Update to Shipped</span>
                    )}
                  </button>
                </div>

                {selectedOrder.shippedAt && (
                  <p className="text-[11px] text-gray-500">
                    Active Tracking: <strong className="font-mono text-gray-800">{selectedOrder.trackingNumber}</strong> (Shipped on {selectedOrder.shippedAt})
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRMATION MODAL ON WAYBILL / STATUS CHANGE ("Ignore for today" option) */}
      {/* ========================================================================= */}
      {confirmShipModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow/20 text-charcoal">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">
                    Confirm Order Fulfillment
                  </h3>
                  <p className="text-xs text-gray-500">Auto-update status to Shipped</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfirmShipModal(null)}
                className="text-gray-400 hover:text-gray-600 text-xs p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono font-bold text-gray-900">
                  {confirmShipModal.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-semibold text-gray-900">
                  {confirmShipModal.customerName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking Number:</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {confirmShipModal.trackingNumber}
                </span>
              </div>

              <p className="pt-2 text-gray-600 leading-relaxed border-t border-gray-200/80">
                This order status will automatically change to <strong>Shipped</strong> and tracking notification will be logged.
              </p>
            </div>

            <form onSubmit={handleConfirmShipModalSubmit} className="space-y-4 pt-1">
              {/* Checkbox: Ignore for today */}
              <label className="flex items-center gap-2.5 text-xs text-gray-700 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={ignoreConfirmTodayCheckbox}
                  onChange={(e) => setIgnoreConfirmTodayCheckbox(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-charcoal focus:ring-yellow accent-charcoal cursor-pointer"
                />
                <span className="font-medium">
                  Don&apos;t show this confirmation again today (Ignore for today)
                </span>
              </label>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setConfirmShipModal(null)}
                  className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  Confirm & Ship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BULK CSV IMPORT MODAL (Instructions Emphasis & Dev Only Load Demo Tag)    */}
      {/* ========================================================================= */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-charcoal text-yellow">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">
                    Bulk Update Tracking Numbers via CSV
                  </h3>
                  <p className="text-xs text-gray-500">
                    Import courier tracking numbers to batch-fulfill pending orders
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Instructions Banner with Strong Emphasis: ONLY Tracking Number Changes */}
            <div className="rounded-2xl bg-blue-50/80 border border-blue-200 p-4 text-xs text-blue-900 space-y-2.5 leading-relaxed">
              <div className="rounded-xl bg-amber-50 border border-amber-300/80 p-3 text-amber-900 font-semibold text-xs flex items-start gap-2.5 shadow-2xs">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold uppercase tracking-wide block text-amber-950 mb-0.5">
                    Critical Notice:
                  </span>
                  <span>
                    Only the <strong>Tracking Number</strong> is updated by this CSV import. Customer details, shipping addresses, items, and pricing remain unchanged, and order status will automatically transition to <strong>Shipped</strong>.
                  </span>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-1 text-blue-800 pt-0.5">
                <li>Download your exported CSV file containing pending orders.</li>
                <li>Ensure columns include <code className="font-bold font-mono text-blue-950">Order ID</code> and <code className="font-bold font-mono text-blue-950">Tracking Number</code>.</li>
                <li>Upload your file below, review the validation preview, and click Apply.</li>
              </ol>
            </div>

            {/* Upload Area / Dropzone */}
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/60 p-6 text-center space-y-3">
              <Upload className="h-8 w-8 text-gray-400 mx-auto" />
              <div>
                <p className="text-xs font-bold text-gray-800">
                  Choose a CSV file or drag and drop here
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">Supports .csv UTF-8 format</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv"
                  onChange={handleCSVFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2 text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Browse CSV File
                </button>
                <span className="text-xs text-gray-400 font-medium">or</span>
                <button
                  type="button"
                  onClick={handleLoadDemoCSV}
                  className="rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 px-3.5 py-2 text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <span>Load Demo CSV</span>
                  <span className="text-[10px] font-mono uppercase bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-extrabold">
                    Dev / Testing Only
                  </span>
                </button>
              </div>
            </div>

            {importError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{importError}</span>
              </div>
            )}

            {/* Preview Table */}
            {importParsedRows.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    CSV Data Preview ({importParsedRows.length} Rows Detected)
                  </h4>
                  <span className="text-xs text-gray-500">
                    {importParsedRows.filter((r) => r.isValid).length} ready to update
                  </span>
                </div>

                <div className="border border-gray-200 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold select-none sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Status Transition</th>
                        <th className="py-2.5 px-3">New Tracking</th>
                        <th className="py-2.5 px-3 text-right">Validation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {importParsedRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="py-2.5 px-3 font-mono font-bold text-gray-900">
                            {row.orderNumber}
                          </td>
                          <td className="py-2.5 px-3 text-gray-700">{row.customerName}</td>
                          <td className="py-2.5 px-3">
                            <span className="text-gray-500 line-through mr-1 text-[11px]">
                              {row.currentOrderStatus}
                            </span>
                            <span className="font-bold text-emerald-700 text-[11px]">→ Shipped</span>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-gray-800">
                            {row.newTracking}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            {row.isValid ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <CheckCircle className="h-3 w-3" />
                                <span>Matched</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Not Found</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  importParsedRows.filter((r) => r.isValid).length === 0
                }
                onClick={handleApplyBulkImport}
                className="rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50 transition-all active:scale-95"
              >
                Apply Bulk Update ({importParsedRows.filter((r) => r.isValid).length} Orders)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING 5-SECOND UNDO BAR (GMAIL STYLE TOAST AT BOTTOM OF SCREEN)        */}
      {/* ========================================================================= */}
      {undoState && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999999] flex items-center gap-4 rounded-2xl bg-[#282828] text-white px-5 py-3 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-medium text-gray-200">{undoState.message}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePerformUndo}
              className="inline-flex items-center gap-1.5 rounded-xl bg-yellow text-charcoal px-3.5 py-1.5 text-xs font-bold hover:bg-yellow/90 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Undo ({undoState.secondsRemaining}s)</span>
            </button>

            <button
              type="button"
              onClick={() => setUndoState(null)}
              className="text-gray-400 hover:text-white text-xs p-1 cursor-pointer"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
