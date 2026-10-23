import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  PackageCheck,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';

type DatePreset = 'today' | '7d' | '14d' | '30d';

interface AnalyticsData {
  rangeLabel: string;
  grossRevenue: number; // in TWD
  revenueGrowth: number;
  totalOrders: number;
  orderGrowth: number;
  aov: number; // in TWD
  aovGrowth: number;
  pendingShipment: number;
  chartPoints: {
    label: string;
    subLabel?: string;
    revenue: number;
    orders: number;
  }[];
}

const mockAnalytics: Record<DatePreset, AnalyticsData> = {
  today: {
    rangeLabel: 'Today (00:00 to 23:59)',
    grossRevenue: 48950,
    revenueGrowth: 14.2,
    totalOrders: 55,
    orderGrowth: 12.0,
    aov: 890,
    aovGrowth: 2.1,
    pendingShipment: 14,
    chartPoints: [
      { label: '00:00', revenue: 1780, orders: 2 },
      { label: '03:00', revenue: 890, orders: 1 },
      { label: '06:00', revenue: 2670, orders: 3 },
      { label: '09:00', revenue: 8900, orders: 10 },
      { label: '12:00', revenue: 11570, orders: 13 },
      { label: '15:00', revenue: 7120, orders: 8 },
      { label: '18:00', revenue: 9790, orders: 11 },
      { label: '21:00', revenue: 5340, orders: 6 },
      { label: '23:00', revenue: 890, orders: 1 }
    ]
  },
  '7d': {
    rangeLabel: 'Last 7 Days',
    grossRevenue: 284800,
    revenueGrowth: 8.5,
    totalOrders: 320,
    orderGrowth: 6.8,
    aov: 890,
    aovGrowth: 1.5,
    pendingShipment: 14,
    chartPoints: [
      { label: 'Oct 18', subLabel: 'Mon', revenue: 35600, orders: 40 },
      { label: 'Oct 19', subLabel: 'Tue', revenue: 42720, orders: 48 },
      { label: 'Oct 20', subLabel: 'Wed', revenue: 38270, orders: 43 },
      { label: 'Oct 21', subLabel: 'Thu', revenue: 32040, orders: 36 },
      { label: 'Oct 22', subLabel: 'Fri', revenue: 45390, orders: 51 },
      { label: 'Oct 23', subLabel: 'Sat', revenue: 51620, orders: 58 },
      { label: 'Oct 24', subLabel: 'Sun (Today)', revenue: 39160, orders: 44 }
    ]
  },
  '14d': {
    rangeLabel: 'Last 14 Days',
    grossRevenue: 596300,
    revenueGrowth: 11.4,
    totalOrders: 670,
    orderGrowth: 9.2,
    aov: 890,
    aovGrowth: 2.0,
    pendingShipment: 14,
    chartPoints: [
      { label: 'Oct 11', revenue: 32040, orders: 36 },
      { label: 'Oct 12', revenue: 37380, orders: 42 },
      { label: 'Oct 13', revenue: 41830, orders: 47 },
      { label: 'Oct 14', revenue: 39160, orders: 44 },
      { label: 'Oct 15', revenue: 48060, orders: 54 },
      { label: 'Oct 16', revenue: 53400, orders: 60 },
      { label: 'Oct 17', revenue: 44500, orders: 50 },
      { label: 'Oct 18', revenue: 35600, orders: 40 },
      { label: 'Oct 19', revenue: 42720, orders: 48 },
      { label: 'Oct 20', revenue: 38270, orders: 43 },
      { label: 'Oct 21', revenue: 32040, orders: 36 },
      { label: 'Oct 22', revenue: 45390, orders: 51 },
      { label: 'Oct 23', revenue: 51620, orders: 58 },
      { label: 'Oct 24', revenue: 39160, orders: 44 }
    ]
  },
  '30d': {
    rangeLabel: 'Last 30 Days',
    grossRevenue: 1246000,
    revenueGrowth: 16.8,
    totalOrders: 1400,
    orderGrowth: 14.1,
    aov: 890,
    aovGrowth: 2.4,
    pendingShipment: 14,
    chartPoints: [
      { label: 'Week 1', revenue: 267000, orders: 300 },
      { label: 'Week 2', revenue: 293700, orders: 330 },
      { label: 'Week 3', revenue: 338200, orders: 380 },
      { label: 'Week 4', revenue: 347100, orders: 390 }
    ]
  }
};



interface AdminAnalyticsDashboardProps {
  onNavigateToOrders?: () => void;
  onNavigateToProducts?: () => void;
}

export const AdminAnalyticsDashboard: React.FC<AdminAnalyticsDashboardProps> = ({
  onNavigateToOrders,
  onNavigateToProducts
}) => {
  const [activeRange, setActiveRange] = useState<DatePreset>('today');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentData = mockAnalytics[activeRange];
  const maxRevenue = Math.max(...currentData.chartPoints.map((p) => p.revenue));

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-200">
      {/* Top Header & Range Preset Filter Control */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <AdminHelpIcon text="Sales analytics dashboard and operational KPIs integrated with ECPay payment gateway and CAT LAB+ Taiwan logistics." />
          </div>
        </div>

        {/* Date Range Preset Selector */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-2xs">
            {(['today', '7d', '14d', '30d'] as DatePreset[]).map((preset) => {
              const labels: Record<DatePreset, string> = {
                today: 'Today',
                '7d': '7d',
                '14d': '14d',
                '30d': '30d'
              };
              const tooltips: Record<DatePreset, string> = {
                today: 'Filter Today: Shows hourly breakdown metrics for today (00:00 to 23:59).',
                '7d': 'Filter 7d: Shows metrics for the last 7 days grouped by date.',
                '14d': 'Filter 14d: Shows metrics for the last 14 days for mid-month trend evaluation.',
                '30d': 'Filter 30d: Shows metrics for the last 30 days for monthly reporting.'
              };

              const isActive = activeRange === preset;
              return (
                <AdminTooltip key={preset} content={tooltips[preset]}>
                  <button
                    type="button"
                    onClick={() => setActiveRange(preset)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-charcoal text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {labels[preset]}
                  </button>
                </AdminTooltip>
              );
            })}
          </div>

          <AdminTooltip content="Refresh metrics and sync queries from ECPay database.">
            <button
              type="button"
              onClick={handleRefresh}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-2xs cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-charcoal' : ''}`} />
            </button>
          </AdminTooltip>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 KPI SUMMARY CARDS (All in TWD)                                          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Gross Revenue */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Gross Revenue
            </span>
            <AdminHelpIcon text="Gross Revenue: Accumulated incoming payments from Paid orders in New Taiwan Dollar (TWD)." />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-extrabold text-gray-900 tabular-nums tracking-tight">
                NT$ {currentData.grossRevenue.toLocaleString()}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>+{currentData.revenueGrowth}%</span>
                <span className="text-gray-400 font-normal ml-0.5">vs previous period</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow/20 text-charcoal">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Orders
            </span>
            <AdminHelpIcon text="Total Orders: Count of successfully completed Paid transactions recorded during the active period." />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-extrabold text-gray-900 tabular-nums tracking-tight">
                {currentData.totalOrders.toLocaleString()}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>+{currentData.orderGrowth}%</span>
                <span className="text-gray-400 font-normal ml-0.5">vs previous period</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Average Order Value (AOV) */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-2xs hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Average Order Value (AOV)
            </span>
            <AdminHelpIcon text="Average Order Value (AOV): Average revenue per transaction, calculated as Gross Revenue divided by Total Orders." />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-extrabold text-gray-900 tabular-nums tracking-tight">
                NT$ {currentData.aov.toLocaleString()}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>+{currentData.aovGrowth}%</span>
                <span className="text-gray-400 font-normal ml-0.5">basket stability</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Card 4: Pending Shipment (Unfulfilled) */}
        <div
          onClick={onNavigateToOrders}
          className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-2xs hover:border-amber-300 hover:bg-amber-50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Pending Shipment
            </span>
            <AdminHelpIcon text="Pending Shipment: Paid orders that do not yet have a tracking number (Unfulfilled) and require packing/dispatch." />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-extrabold text-amber-900 tabular-nums tracking-tight">
                {currentData.pendingShipment}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-amber-700">
                <Clock className="h-3.5 w-3.5" />
                <span>Requires fulfillment today</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 group-hover:scale-105 transition-transform">
              <PackageCheck className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SALES TREND VISUAL CHART                                                  */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">
                Sales Trends & Transaction Volume
              </h2>
              <AdminHelpIcon text="Time-series visualization of gross revenue and transaction count. Hover over any bar to view breakdown." />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeRange === 'today'
                ? 'X-axis displays hourly intervals (00:00 to 23:00) to monitor peak transaction hours.'
                : `X-axis groups sales data by date (${currentData.rangeLabel}).`}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md bg-[#fed700]" />
              <span>Gross Revenue (NT$)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-charcoal" />
              <span>Order Count</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart rendered with SVG / pure CSS flexbars for ultra crisp Untitled UI */}
        <div className="pt-8 pb-4">
          <div className="relative h-64 sm:h-72 w-full flex items-end gap-2 sm:gap-4 px-2">
            {/* Background horizontal guide lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-gray-200 w-full" />
              <div className="border-b border-dashed border-gray-200 w-full" />
              <div className="border-b border-dashed border-gray-200 w-full" />
              <div className="border-b border-gray-200 w-full" />
            </div>

            {/* Bars */}
            {currentData.chartPoints.map((point, idx) => {
              const heightPercent = Math.max(12, Math.round((point.revenue / maxRevenue) * 100));
              const isHovered = hoveredPoint === idx;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Floating Tooltip Hover */}
                  {isHovered && (
                    <div className="absolute bottom-full mb-3 z-30 pointer-events-none w-44 rounded-xl bg-gray-900 text-white p-2.5 shadow-xl text-left animate-in fade-in zoom-in-95 duration-150">
                      <p className="text-[11px] font-medium text-gray-400">
                        {point.label} {point.subLabel ? `(${point.subLabel})` : ''}
                      </p>
                      <p className="text-sm font-extrabold text-yellow mt-0.5">
                        NT$ {point.revenue.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-gray-300 mt-0.5">
                        {point.orders} paid transactions
                      </p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-t-4 border-x-4 border-t-gray-900 border-x-transparent" />
                    </div>
                  )}

                  {/* Top Order Dot */}
                  <span
                    className={`h-2 w-2 rounded-full mb-1 transition-all ${
                      isHovered ? 'bg-charcoal scale-125' : 'bg-gray-400 opacity-60'
                    }`}
                  />

                  {/* Vertical Revenue Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 ${
                      isHovered
                        ? 'bg-[#fed700] shadow-md scale-y-[1.02]'
                        : 'bg-yellow/40 hover:bg-yellow/70'
                    }`}
                  />

                  {/* Label */}
                  <div className="mt-3 text-center">
                    <p
                      className={`text-[11px] font-semibold transition-colors ${
                        isHovered ? 'text-gray-900 font-bold' : 'text-gray-500'
                      }`}
                    >
                      {point.label}
                    </p>
                    {point.subLabel && (
                      <p className="text-[10px] text-gray-400 hidden sm:block">{point.subLabel}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
