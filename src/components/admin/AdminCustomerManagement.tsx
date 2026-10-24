import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle,
  Ban,
  ShieldAlert,
  Mail,
  Calendar,
  AlertTriangle,
  Lock,
  Unlock,
  AlertOctagon
} from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  registeredAt: string;
  totalOrders: number;
  totalSpentTwd: number;
  isActive: boolean;
}

const initialCustomers: CustomerUser[] = [
  {
    id: 'CUST-001',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+886 912-345-678',
    registeredAt: '2026-09-12',
    totalOrders: 3,
    totalSpentTwd: 2670,
    isActive: true
  },
  {
    id: 'CUST-002',
    fullName: 'Dr. Chen Wei-Ming',
    email: 'chen.vet@catcare.tw',
    phone: '+886 928-876-543',
    registeredAt: '2026-08-01',
    totalOrders: 8,
    totalSpentTwd: 18450,
    isActive: true
  },
  {
    id: 'CUST-003',
    fullName: 'Lin Chia-Hao',
    email: 'chiahao.lin@outlook.com',
    phone: '+886 933-112-233',
    registeredAt: '2026-10-10',
    totalOrders: 1,
    totalSpentTwd: 950,
    isActive: true
  },
  {
    id: 'CUST-004',
    fullName: 'Emily Watson',
    email: 'emily.w@gmail.com',
    phone: '+886 987-654-321',
    registeredAt: '2026-10-18',
    totalOrders: 2,
    totalSpentTwd: 1870,
    isActive: true
  },
  {
    id: 'CUST-005',
    fullName: 'Suspicious Bot Account #92',
    email: 'suspicious.tester@mailinator.com',
    phone: '+886 900-000-000',
    registeredAt: '2026-10-23',
    totalOrders: 0,
    totalSpentTwd: 0,
    isActive: false
  }
];

interface AdminCustomerManagementProps {
  onShowToast: (msg: string) => void;
}

export const AdminCustomerManagement: React.FC<AdminCustomerManagementProps> = ({ onShowToast }) => {
  const [customers, setCustomers] = useState<CustomerUser[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Confirmation Modal State (Guarded Action to prevent accidental clicks)
  const [confirmModal, setConfirmModal] = useState<{
    customer: CustomerUser;
    action: 'deactivate' | 'activate';
  } | null>(null);

  const filteredCustomers = customers.filter((cust) => {
    const matchSearch =
      cust.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? cust.isActive
        : !cust.isActive;

    return matchSearch && matchStatus;
  });

  // Execute Guarded Status Change after user confirms in the modal
  const handleExecuteStatusChange = () => {
    if (!confirmModal) return;

    const { customer, action } = confirmModal;
    const nextStatus = action === 'activate';

    setCustomers(
      customers.map((c) => (c.id === customer.id ? { ...c, isActive: nextStatus } : c))
    );

    if (!nextStatus) {
      onShowToast(
        `Account ${customer.fullName} deactivated (users.is_active = false). Active sessions terminated and login disabled.`
      );
    } else {
      onShowToast(
        `Account ${customer.fullName} reactivated. Customer can now sign in normally.`
      );
    }

    setConfirmModal(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* HEADER: Strictly "Customer Management" with NO SUBTITLE                   */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Customer Management
            </h1>
            <AdminHelpIcon text="Registered customer directory module, instant search by name/email, and account access management with guarded security confirmation for immediate session termination (force logout) and login access control." />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers by Name, Email, or Customer ID..."
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 text-xs sm:text-sm text-gray-700 focus:bg-white focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none cursor-pointer"
            >
              <option value="all">All Account Statuses</option>
              <option value="active">Active Accounts Only</option>
              <option value="inactive">Inactive / Suspended Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="rounded-3xl border border-gray-200/90 bg-white shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold select-none">
                <th className="py-3.5 pl-6 pr-3">Customer ID</th>
                <th className="py-3.5 px-3">Full Name</th>
                <th className="py-3.5 px-3">Email Address</th>
                <th className="py-3.5 px-3">Registered Date</th>
                <th className="py-3.5 px-3">Total Spend</th>
                <th className="py-3.5 px-3">Account Status</th>
                <th className="py-3.5 pr-6 pl-3 text-right">
                  <span className="inline-flex items-center gap-1">
                    Access Control
                    <AdminHelpIcon text="Sensitive security action: Account status changes require an explicit confirmation modal to prevent accidental clicks. Deactivating immediately terminates active customer sessions." />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className={`hover:bg-gray-50/80 transition-colors ${
                      !cust.isActive ? 'bg-rose-50/30' : ''
                    }`}
                  >
                    <td className="py-4 pl-6 pr-3 font-mono font-bold text-gray-700">
                      {cust.id}
                    </td>

                    <td className="py-4 px-3 font-bold text-gray-900">
                      <div>
                        <p>{cust.fullName}</p>
                        <p className="text-[11px] text-gray-400 font-normal">
                          {cust.totalOrders} total orders
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-3 text-gray-600 font-mono text-xs">
                      {cust.email}
                    </td>

                    <td className="py-4 px-3 text-gray-500 whitespace-nowrap">
                      {cust.registeredAt}
                    </td>

                    <td className="py-4 px-3 font-semibold text-gray-900 tabular-nums">
                      NT$ {cust.totalSpentTwd.toLocaleString()}
                    </td>

                    {/* Status Badge (Same component style as Order Management, no dot) */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      {cust.isActive ? (
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/80">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700 border border-rose-200/80">
                          Inactive / Suspended
                        </span>
                      )}
                    </td>

                    {/* Explicit Action Button with Guarded Confirmation (No icons, text Deactivate / Activate) */}
                    <td className="py-4 pr-6 pl-3 text-right whitespace-nowrap">
                      {cust.isActive ? (
                        <AdminTooltip content="Open confirmation dialog to deactivate account and terminate active login sessions">
                          <button
                            type="button"
                            onClick={() =>
                              setConfirmModal({ customer: cust, action: 'deactivate' })
                            }
                            className="inline-flex items-center rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 px-3.5 py-1.5 text-xs font-bold transition-all active:scale-[0.98] cursor-pointer"
                          >
                            Deactivate
                          </button>
                        </AdminTooltip>
                      ) : (
                        <AdminTooltip content="Open confirmation dialog to restore customer storefront login access">
                          <button
                            type="button"
                            onClick={() =>
                              setConfirmModal({ customer: cust, action: 'activate' })
                            }
                            className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3.5 py-1.5 text-xs font-bold transition-all active:scale-[0.98] cursor-pointer"
                          >
                            Activate
                          </button>
                        </AdminTooltip>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No customers match the current search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GUARDED CONFIRMATION MODAL (Prevents accidental account deactivation)      */}
      {/* ========================================================================= */}
      {confirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start gap-3.5">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl shrink-0 ${
                  confirmModal.action === 'deactivate'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {confirmModal.action === 'deactivate' ? (
                  <AlertOctagon className="h-6 w-6" />
                ) : (
                  <CheckCircle className="h-6 w-6" />
                )}
              </div>

              <div>
                <h3 className="text-base font-extrabold text-gray-900 leading-snug">
                  {confirmModal.action === 'deactivate'
                    ? 'Confirm Account Deactivation'
                    : 'Confirm Account Activation'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  This action requires administrator confirmation for data and access security.
                </p>
              </div>
            </div>

            {/* Target Customer Info Box */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Customer ID:</span>
                <span className="font-mono font-bold text-gray-900">{confirmModal.customer.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Customer Name:</span>
                <span className="font-bold text-gray-900">{confirmModal.customer.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Email:</span>
                <span className="font-mono text-gray-700">{confirmModal.customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Total Purchases:</span>
                <span className="font-semibold text-gray-900">
                  NT$ {confirmModal.customer.totalSpentTwd.toLocaleString()} ({confirmModal.customer.totalOrders} orders)
                </span>
              </div>
            </div>

            {/* Security Explanation Box */}
            {confirmModal.action === 'deactivate' ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 text-xs text-rose-800 space-y-1.5 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-rose-900">
                  <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>System Impact (users.is_active = false):</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-rose-700">
                  <li>The customer&apos;s active login session will be forcibly terminated immediately.</li>
                  <li>New login attempts will be rejected with: <em>&ldquo;Your account is currently suspended. Please contact support.&rdquo;</em></li>
                  <li>The customer will be blocked from checkout and order placement.</li>
                </ul>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-800 leading-relaxed">
                <p className="font-semibold text-emerald-900">
                  Reactivating this account will restore full storefront login access, allowing the customer to view order history and place orders normally.
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="rounded-xl border border-gray-300 px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              {confirmModal.action === 'deactivate' ? (
                <button
                  type="button"
                  onClick={handleExecuteStatusChange}
                  className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  Yes, Deactivate
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleExecuteStatusChange}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  Yes, Activate
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
