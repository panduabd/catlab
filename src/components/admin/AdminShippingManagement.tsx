import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Truck,
  Plus,
  Trash2,
  DollarSign,
  Layers,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Calculator,
  ShieldAlert,
  ArrowRight,
  Edit3,
  Search,
  Package,
  Boxes,
  HelpCircle
} from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';

export interface SubRegionException {
  id: string;
  regionName: string;
  surchargeTwd: number;
  serviceType: string;
  isActive: boolean;
}

export interface TieredRateRule {
  id: string;
  minDimensionCm: number;
  maxDimensionCm: number;
  rateTwd: number;
  note: string;
}

export interface ShippingZoneItem {
  id: string;
  name: string;
  type: 'country_default' | 'cvs_store' | 'sub_region_exception';
  territory: string;
  serviceName: string;
  rateType: 'Tiered Matrix' | 'Flat Rate' | 'Special Rate';
  rateTwd: number | string;
  freeShippingThreshold?: number;
  isActive: boolean;
}

export const AdminShippingManagement: React.FC<{ onShowToast: (msg: string) => void }> = ({ onShowToast }) => {
  // Country Default Config
  const [country] = useState('Taiwan (Taiwan Main Island)');
  const [defaultHomeDeliveryRate, setDefaultHomeDeliveryRate] = useState(100);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(800);
  const [is711Active] = useState(true);
  const [flat711Rate, setFlat711Rate] = useState(60);

  // Sub-Region Exceptions
  const [exceptions, setExceptions] = useState<SubRegionException[]>([
    {
      id: 'ex-1',
      regionName: 'Kinmen County (金門縣)',
      surchargeTwd: 180,
      serviceType: 'Black Cat Outlying Island Express',
      isActive: true
    },
    {
      id: 'ex-2',
      regionName: 'Penghu County (澎湖縣)',
      surchargeTwd: 180,
      serviceType: 'Black Cat Outlying Island Express',
      isActive: true
    },
    {
      id: 'ex-3',
      regionName: 'Lienchiang / Matsu (連江縣)',
      surchargeTwd: 220,
      serviceType: 'Postal Air / Boat Express',
      isActive: true
    }
  ]);

  // Tiered Matrix by Dimensions
  const [tieredRules, setTieredRules] = useState<TieredRateRule[]>([
    {
      id: 'tier-1',
      minDimensionCm: 0,
      maxDimensionCm: 60,
      rateTwd: 130,
      note: 'Small parcel (1 kit / trial pack)'
    },
    {
      id: 'tier-2',
      minDimensionCm: 61,
      maxDimensionCm: 90,
      rateTwd: 170,
      note: 'Medium parcel (2–3 kits bundle)'
    },
    {
      id: 'tier-3',
      minDimensionCm: 91,
      maxDimensionCm: 120,
      rateTwd: 210,
      note: 'Bulk carton / 6+ kits clinic stock'
    }
  ]);

  // List View Filter State
  const [activeTab, setActiveTab] = useState<'all' | 'country' | 'exceptions' | 'tiered'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Zone Modal State (Add / Edit)
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneService, setNewZoneService] = useState('Black Cat Outlying Express');
  const [newZoneRate, setNewZoneRate] = useState(190);

  // Interactive Test Simulator State
  const [testCity, setTestCity] = useState('Taipei City');
  const [testDim, setTestDim] = useState(50); // L+W+H in cm
  const [testSubtotal, setTestSubtotal] = useState(890);

  // Add new exception
  const handleAddException = () => {
    if (!newZoneName.trim()) {
      onShowToast('Please enter the exception region name.');
      return;
    }
    const newEx: SubRegionException = {
      id: 'ex-' + Date.now(),
      regionName: newZoneName,
      surchargeTwd: newZoneRate,
      serviceType: newZoneService,
      isActive: true
    };
    setExceptions([...exceptions, newEx]);
    setIsZoneModalOpen(false);
    setNewZoneName('');
    onShowToast(`New exception zone "${newEx.regionName}" added to the shipping rate matrix.`);
  };

  const handleDeleteException = (id: string, name: string) => {
    setExceptions(exceptions.filter((e) => e.id !== id));
    onShowToast(`Exception zone "${name}" removed. Checkout will fallback to country default rates.`);
  };

  // Add new tier
  const handleAddTier = () => {
    const lastTier = tieredRules[tieredRules.length - 1];
    const newTier: TieredRateRule = {
      id: 'tier-' + Date.now(),
      minDimensionCm: lastTier ? lastTier.maxDimensionCm + 1 : 121,
      maxDimensionCm: lastTier ? lastTier.maxDimensionCm + 30 : 150,
      rateTwd: 260,
      note: 'Oversized heavy parcel'
    };
    setTieredRules([...tieredRules, newTier]);
    onShowToast('New dimension rate tier added successfully.');
  };

  const handleDeleteTier = (id: string) => {
    if (tieredRules.length <= 1) {
      alert('At least 1 active dimension rate tier is required.');
      return;
    }
    setTieredRules(tieredRules.filter((t) => t.id !== id));
    onShowToast('Dimension rate tier deleted.');
  };

  // Calculate matching rate in test simulator
  const calculatedTestRate = () => {
    // 1. Check narrowest exception first
    const matchedEx = exceptions.find((e) =>
      testCity.toLowerCase().includes(e.regionName.toLowerCase().split(' ')[0].toLowerCase())
    );
    if (matchedEx) {
      return {
        ruleUsed: `Sub-Region Exception: ${matchedEx.regionName}`,
        amount: matchedEx.surchargeTwd,
        isException: true
      };
    }

    // 2. Free shipping threshold
    if (testSubtotal >= freeShippingThreshold) {
      return {
        ruleUsed: `Free Shipping (Subtotal ≥ NT$ ${freeShippingThreshold})`,
        amount: 0,
        isException: false
      };
    }

    // 3. Match tiered matrix by dimension
    const matchedTier = tieredRules.find(
      (t) => testDim >= t.minDimensionCm && testDim <= t.maxDimensionCm
    );
    if (matchedTier) {
      return {
        ruleUsed: `Tiered Matrix (${matchedTier.minDimensionCm}–${matchedTier.maxDimensionCm} cm)`,
        amount: matchedTier.rateTwd,
        isException: false
      };
    }

    // 4. Fallback to country default
    return {
      ruleUsed: `Country Default Rate (${country})`,
      amount: defaultHomeDeliveryRate,
      isException: false
    };
  };

  const simulatorResult = calculatedTestRate();

  // Unified Zones List Data for the Main List View
  const allZonesList: ShippingZoneItem[] = [
    {
      id: 'zone-default-mainland',
      name: 'Taiwan Main Island (臺灣本島)',
      type: 'country_default',
      territory: 'Taiwan (Main Island All Cities)',
      serviceName: 'Black Cat Yamato Delivery (黑貓宅急便)',
      rateType: 'Tiered Matrix',
      rateTwd: 'NT$ 130 – 210',
      freeShippingThreshold: freeShippingThreshold,
      isActive: true
    },
    {
      id: 'zone-cvs-711',
      name: '7-Eleven CVS Store Pickup (超商門市取貨)',
      type: 'cvs_store',
      territory: 'All 7-Eleven Stores across Taiwan',
      serviceName: '7-Eleven CVS Logistics B2C',
      rateType: 'Flat Rate',
      rateTwd: `Flat NT$ ${flat711Rate}`,
      isActive: is711Active
    },
    ...exceptions.map((ex) => ({
      id: ex.id,
      name: ex.regionName,
      type: 'sub_region_exception' as const,
      territory: ex.regionName,
      serviceName: ex.serviceType,
      rateType: 'Special Rate' as const,
      rateTwd: `NT$ ${ex.surchargeTwd}`,
      isActive: ex.isActive
    }))
  ];

  const filteredZones = allZonesList.filter((z) => {
    const matchSearch =
      z.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      z.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      z.territory.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'country') return matchSearch && z.type === 'country_default';
    if (activeTab === 'exceptions') return matchSearch && z.type === 'sub_region_exception';
    return matchSearch;
  });

  return (
    <div className="space-y-7 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* HEADER: Strictly "Shipping Management" with NO SUBTITLE                   */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Shipping Management
            </h1>
            <AdminHelpIcon text="Hierarchical Shipping Zones configuration, outlying island exceptions (Kinmen/Penghu), and tiered shipping rate matrix based on package dimensions or weight." />
          </div>
        </div>

        <AdminTooltip content="Open form to add a new shipping zone or region exception">
          <button
            type="button"
            onClick={() => setIsZoneModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2.5 text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4 text-yellow" />
            <span>+ Add Zone / Exception</span>
          </button>
        </AdminTooltip>
      </div>

      {/* ========================================================================= */}
      {/* SHIPPING ZONES & RATES DIRECTORY (LIST VIEW FIRST)                        */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-gray-200/90 bg-white shadow-2xs overflow-hidden space-y-4 p-5 sm:p-7">
        {/* Controls: Search & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-charcoal" />
            <h3 className="text-base font-bold text-gray-900">
              Shipping Zones & Rate Rules
            </h3>
            <AdminHelpIcon text="Complete directory of delivery coverage zones, registered couriers, and rate schemes (Country Default, Outlying Island Exceptions, and 7-Eleven CVS Pickup). The checkout engine prioritizes narrower geographical exceptions first." />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Pills */}
            <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'all' ? 'bg-charcoal text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Zones ({allZonesList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('country')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'country' ? 'bg-charcoal text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Country Default
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('exceptions')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'exceptions' ? 'bg-charcoal text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Island Exceptions ({exceptions.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search zone / courier..."
                className="h-9 w-44 sm:w-56 rounded-xl border border-gray-200 bg-white pl-8 pr-3 text-xs text-gray-900 focus:outline-none focus:border-charcoal"
              />
            </div>
          </div>
        </div>

        {/* Zones Table List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold select-none">
                <th className="py-3 px-3">Zone / Territory Name</th>
                <th className="py-3 px-3">Rule Type</th>
                <th className="py-3 px-3">Logistics Service & Courier</th>
                <th className="py-3 px-3">Rate Scheme (TWD)</th>
                <th className="py-3 px-3">Free Shipping Threshold</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">{zone.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{zone.territory}</p>
                  </td>

                  <td className="py-3.5 px-3">
                    {zone.type === 'country_default' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                        <Globe className="h-3 w-3" />
                        <span>Country Default</span>
                      </span>
                    ) : zone.type === 'cvs_store' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 ring-1 ring-amber-600/20">
                        <Boxes className="h-3 w-3" />
                        <span>CVS Store Pickup</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 ring-1 ring-purple-600/20">
                        <MapPin className="h-3 w-3" />
                        <span>Sub-Region Exception</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 font-medium text-gray-700">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-[11px] font-semibold border border-gray-200">
                      {zone.serviceName}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-extrabold text-gray-900 tabular-nums">
                    {zone.rateTwd}
                  </td>

                  <td className="py-3.5 px-3 text-gray-600">
                    {zone.freeShippingThreshold ? (
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        ≥ NT$ {zone.freeShippingThreshold}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[11px]">-</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      <span>Active</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {zone.type === 'sub_region_exception' && (
                        <AdminTooltip content="Delete this exception rule (will fallback to country default rate)">
                          <button
                            type="button"
                            onClick={() => handleDeleteException(zone.id, zone.name)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </AdminTooltip>
                      )}
                      <AdminTooltip content="Load this zone parameters into the test simulator">
                        <button
                          type="button"
                          onClick={() => {
                            setTestCity(zone.name.split(' ')[0]);
                            onShowToast(`Zone ${zone.name} selected for calculation simulation.`);
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-charcoal bg-gray-100 hover:bg-yellow hover:text-charcoal rounded-lg transition-all cursor-pointer"
                        >
                          Test Simulation
                        </button>
                      </AdminTooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COUNTRY DEFAULT CONFIGURATION & DIMENSION MATRIX                          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Country Default & 7-11 Config (Cols 1-5) */}
        <div className="lg:col-span-5 rounded-3xl border border-gray-200/90 bg-white p-6 shadow-2xs space-y-5">
          <div className="pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-charcoal" />
              <h3 className="text-base font-bold text-gray-900">
                Country Default Configuration
              </h3>
              <AdminHelpIcon text="Admin sets country baseline rates and delivery methods. All orders in this territory automatically follow these rules unless a specific sub-region exception matches." />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Primary fallback rules for all orders across the main territory.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Active Territory / Country
              </label>
              <input
                type="text"
                disabled
                value={country}
                className="w-full h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 font-semibold text-gray-800"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-gray-700">
                  Base Home Delivery Rate (Black Cat Courier)
                </label>
                <AdminHelpIcon text="Flat baseline rate for standard door-to-door courier to Taiwan main island addresses." />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-bold">NT$</span>
                <input
                  type="number"
                  value={defaultHomeDeliveryRate}
                  onChange={(e) => setDefaultHomeDeliveryRate(Number(e.target.value))}
                  className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm text-gray-900 focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-gray-700">
                  Free Shipping Threshold (TWD)
                </label>
                <AdminHelpIcon text="Orders with cart subtotal reaching or exceeding this amount automatically qualify for free shipping." />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-bold">NT$</span>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                  className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm text-gray-900 focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>

            {/* Flat Rate 7-Eleven */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">7-Eleven CVS Store Pickup (超商取貨)</span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <AdminHelpIcon text="Fixed flat rate per order regardless of package size or weight (Flat 60 TWD for 7-Eleven pickup)." />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-400 font-bold">NT$</span>
                <input
                  type="number"
                  value={flat711Rate}
                  onChange={(e) => setFlat711Rate(Number(e.target.value))}
                  className="w-24 h-9 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-xs text-gray-900 focus:outline-none focus:border-charcoal"
                />
                <span className="text-[11px] text-gray-500 font-medium">Flat Rate per order</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiered Shipping Rate Matrix by Dimensions (Cols 6-12) */}
        <div className="lg:col-span-7 rounded-3xl border border-gray-200/90 bg-white p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-charcoal" />
                <h3 className="text-base font-bold text-gray-900">
                  Tiered Rate Matrix by Dimensions (Tiered Matrix)
                </h3>
                <AdminHelpIcon text="Accumulated package dimension brackets (Length + Width + Height in cm). The system calculates total cart dimension and matches the rate automatically." />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Courier tiers: 0–60 cm = 130 TWD, 61–90 cm = 170 TWD, 91–120 cm = 210 TWD.
              </p>
            </div>

            <AdminTooltip content="Add a new dimension threshold bracket">
              <button
                type="button"
                onClick={handleAddTier}
                className="inline-flex items-center gap-1.5 rounded-xl bg-charcoal hover:bg-black text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
              >
                <Plus className="h-3.5 w-3.5 text-yellow" />
                <span>+ Add Tier</span>
              </button>
            </AdminTooltip>
          </div>

          {/* Tier Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tieredRules.map((tier, idx) => (
              <div
                key={tier.id}
                className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 space-y-2.5 shadow-2xs hover:border-gray-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal bg-yellow/30 px-2 py-0.5 rounded">
                    Tier #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-extrabold text-gray-900">NT$ {tier.rateTwd}</span>
                    {tieredRules.length > 1 && (
                      <AdminTooltip content="Delete this tier bracket">
                        <button
                          type="button"
                          onClick={() => handleDeleteTier(tier.id)}
                          className="text-gray-400 hover:text-rose-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </AdminTooltip>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-extrabold text-gray-900">
                    {tier.minDimensionCm} – {tier.maxDimensionCm} cm
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Accumulated dimension sum (Length + Width + Height)
                  </p>
                </div>

                <p className="text-[11px] text-gray-600 italic border-t border-gray-200 pt-2">
                  &ldquo;{tier.note}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REAL-TIME SHIPPING RATE CALCULATOR SIMULATOR                              */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-yellow/50 bg-yellow/10 p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-charcoal" />
          <h3 className="text-base font-bold text-gray-900">
            Real-Time Shipping Fee Calculator Simulator
          </h3>
          <AdminHelpIcon text="Test how the checkout engine calculates shipping fees based on recipient city, cart dimensions, and order subtotal." />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Destination City / District:</label>
            <select
              value={testCity}
              onChange={(e) => setTestCity(e.target.value)}
              className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-semibold text-gray-900 focus:outline-none focus:border-charcoal cursor-pointer"
            >
              <option value="Taipei City">Taipei City (Taiwan Main Island)</option>
              <option value="Taichung City">Taichung City (Taiwan Main Island)</option>
              <option value="Kaohsiung City">Kaohsiung City (Taiwan Main Island)</option>
              <option value="Kinmen County">Kinmen County (金門縣 - Island Exception)</option>
              <option value="Penghu County">Penghu County (澎湖縣 - Island Exception)</option>
              <option value="Lienchiang / Matsu">Lienchiang / Matsu (連江縣 - Island Exception)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Cart Dimensions (L+W+H cm):</label>
            <input
              type="number"
              value={testDim}
              onChange={(e) => setTestDim(Number(e.target.value))}
              className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-bold text-gray-900 focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Customer Cart Subtotal (TWD):</label>
            <input
              type="number"
              value={testSubtotal}
              onChange={(e) => setTestSubtotal(Number(e.target.value))}
              className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-bold text-gray-900 focus:outline-none focus:border-charcoal"
            />
          </div>

          {/* Result Output */}
          <div className="rounded-xl bg-white border border-yellow/60 p-3.5 flex flex-col justify-center shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-gray-400">Calculated Shipping Fee:</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-extrabold text-charcoal">
                {simulatorResult.amount === 0 ? 'FREE SHIPPING' : `NT$ ${simulatorResult.amount}`}
              </span>
            </div>
            <span className="text-[10px] font-medium text-gray-500 truncate mt-0.5">
              Active Rule: {simulatorResult.ruleUsed}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW SUB-REGION EXCEPTION                                       */}
      {/* ========================================================================= */}
      {isZoneModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">
                  Add Sub-Region Exception
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Define special delivery rates for outlying islands or remote districts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoneModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Exception Territory / Island Name:
                </label>
                <input
                  type="text"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  placeholder="e.g. Orchid Island / Lanyu (蘭嶼鄉)"
                  className="w-full h-10 rounded-xl border border-gray-300 px-3 text-xs font-semibold focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Logistics Courier Service Name:
                </label>
                <input
                  type="text"
                  value={newZoneService}
                  onChange={(e) => setNewZoneService(e.target.value)}
                  placeholder="e.g. Island Maritime / Air Express"
                  className="w-full h-10 rounded-xl border border-gray-300 px-3 text-xs font-semibold focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Special Rate for this Territory (TWD):
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold">NT$</span>
                  <input
                    type="number"
                    value={newZoneRate}
                    onChange={(e) => setNewZoneRate(Number(e.target.value))}
                    className="w-full h-10 rounded-xl border border-gray-300 px-3 text-xs font-extrabold text-gray-900 focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsZoneModalOpen(false)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddException}
                className="rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold transition-all cursor-pointer"
              >
                Save Exception
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
