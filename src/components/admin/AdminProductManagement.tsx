import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Edit3,
  Box,
  Scale,
  Maximize2,
  Save,
  Layers,
  FileText,
  Search,
  AlertTriangle
} from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number; // in TWD
  stock: number;
}

export interface PDPAccordionItem {
  id: string;
  title: string;
  sortOrder: number;
  contentType: 'rich_text' | 'table' | 'pdf_download';
  content: string;
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  basePrice: number; // in TWD
  totalStock: number;
  status: 'Active' | 'Draft';
  images: {
    url: string;
    isPrimary: boolean;
    name: string;
  }[];
  weightGram: number; // in grams
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  variants: ProductVariant[];
  accordions: PDPAccordionItem[];
}

const mockProductsList: ProductItem[] = [
  {
    id: 'prod-001',
    name: 'CAT LAB+ Hydrophobic Cat Litter Kit (Complete Home Wellness)',
    sku: 'CLP-KIT-01',
    category: 'Diagnostic Kits',
    basePrice: 890,
    totalStock: 148,
    status: 'Active',
    images: [
      { url: '/images/product.webp', isPrimary: true, name: 'Main Kit Overview' },
      { url: '/images/product-front.webp', isPrimary: false, name: 'Box Packaging Front' },
      { url: '/images/step-4.webp', isPrimary: false, name: 'Hydrophobic Collection' },
      { url: '/images/step-6.webp', isPrimary: false, name: '10-Parameter Strip Foil' }
    ],
    weightGram: 420,
    lengthCm: 24,
    widthCm: 18,
    heightCm: 8,
    variants: [
      {
        id: 'var-1',
        name: 'Complete Kit with 10-Parameter Strip',
        sku: 'CLP-KIT-10P',
        price: 890,
        stock: 95
      },
      {
        id: 'var-2',
        name: 'Double Pack Value Bundle (2x Kits)',
        sku: 'CLP-KIT-2PK',
        price: 1680,
        stock: 35
      },
      {
        id: 'var-3',
        name: 'Refill Pack (Sand + 5 Strips)',
        sku: 'CLP-RFL-STD',
        price: 520,
        stock: 18
      }
    ],
    accordions: [
      {
        id: 'acc-1',
        title: 'PRODUCT DETAILS & COMPOSITION',
        sortOrder: 1,
        contentType: 'rich_text',
        content:
          'Each diagnostic set includes 1x Hydrophobic Non-Absorbing Sand pouch (300g), 1x sterile urine collection pipette dropper, 1x airtight specimen vial, and 1x foil-sealed 10-parameter reagent testing strip.'
      },
      {
        id: 'acc-2',
        title: 'HOW IT WORKS (3-STEP PROTOCOL)',
        sortOrder: 2,
        contentType: 'rich_text',
        content:
          '1. Empty the specialized hydrophobic sand into a thoroughly cleaned litter box.\n2. Allow your cat to urinate naturally; urine beads stay on top without absorbing.\n3. Aspirate droplets using the sterile pipette and dip the test strip for 60 seconds.'
      },
      {
        id: 'acc-3',
        title: '10 DIAGNOSTIC CLINICAL PARAMETERS',
        sortOrder: 3,
        contentType: 'table',
        content:
          'Parameters: Leukocytes, Nitrite, Urobilinogen, Protein, pH (5.0–8.5), Blood/Hemoglobin, Specific Gravity (1.000–1.030), Ketone, Bilirubin, Glucose. Matches feline veterinary triage standards.'
      },
      {
        id: 'acc-4',
        title: 'VETERINARIAN INTERPRETATION GUIDE (PDF)',
        sortOrder: 4,
        contentType: 'pdf_download',
        content:
          'Download official feline wellness color reference chart and urinalysis reference guide (Taiwan Veterinary Medical Association standard, PDF 2.4MB).'
      }
    ]
  },
  {
    id: 'prod-002',
    name: 'CAT LAB+ Urine Test Strip 10-Parameter Refill Pack (10 Strips / Box)',
    sku: 'CLP-RFL-10P',
    category: 'Refill Supplies',
    basePrice: 490,
    totalStock: 3, // LOW STOCK TRIGGER (<= 5)
    status: 'Active',
    images: [
      { url: '/images/product-front.webp', isPrimary: true, name: 'Refill Strip Box' },
      { url: '/images/step-6.webp', isPrimary: false, name: 'Foil Packaging' }
    ],
    weightGram: 80,
    lengthCm: 14,
    widthCm: 8,
    heightCm: 4,
    variants: [
      {
        id: 'var-201',
        name: 'Single Refill Box (10 Foil Strips)',
        sku: 'CLP-RFL-10P-S1',
        price: 490,
        stock: 3
      }
    ],
    accordions: [
      {
        id: 'acc-201',
        title: 'COMPATIBILITY & STORAGE',
        sortOrder: 1,
        contentType: 'rich_text',
        content:
          'Individually foil-sealed with desiccant. Store between 2°C–30°C away from direct sunlight. Compatible with all CAT LAB+ sample collection kits.'
      }
    ]
  },
  {
    id: 'prod-003',
    name: 'CAT LAB+ Hydrophobic Sand Refill Pouch (500g Bulk)',
    sku: 'CLP-SND-500',
    category: 'Litter Supplies',
    basePrice: 380,
    totalStock: 0, // OUT OF STOCK TRIGGER (0)
    status: 'Active',
    images: [
      { url: '/images/step-4.webp', isPrimary: true, name: 'Sand Refill Bag' }
    ],
    weightGram: 520,
    lengthCm: 20,
    widthCm: 15,
    heightCm: 5,
    variants: [
      {
        id: 'var-301',
        name: '500g Pouch',
        sku: 'CLP-SND-500G',
        price: 380,
        stock: 0
      }
    ],
    accordions: [
      {
        id: 'acc-301',
        title: 'USAGE INSTRUCTIONS',
        sortOrder: 1,
        contentType: 'rich_text',
        content:
          '100% natural, non-toxic hydrophobic quartz sand. Wash and dry litter tray thoroughly before pouring.'
      }
    ]
  },
  {
    id: 'prod-004',
    name: 'CAT LAB+ Sterile Pipette & Vial Duo Pack (5 Sets)',
    sku: 'CLP-ACC-PIP',
    category: 'Accessories',
    basePrice: 190,
    totalStock: 82,
    status: 'Draft',
    images: [
      { url: '/images/step-5.webp', isPrimary: true, name: 'Pipettes and Vials' }
    ],
    weightGram: 60,
    lengthCm: 12,
    widthCm: 6,
    heightCm: 3,
    variants: [
      {
        id: 'var-401',
        name: '5 Sets Pack',
        sku: 'CLP-ACC-PIP-5',
        price: 190,
        stock: 82
      }
    ],
    accordions: [
      {
        id: 'acc-401',
        title: 'STERILIZATION STANDARDS',
        sortOrder: 1,
        contentType: 'rich_text',
        content: 'Medical-grade polyethylene pipettes with calibrated mL volume indicators.'
      }
    ]
  }
];

interface AdminProductManagementProps {
  onShowToast: (msg: string) => void;
  onNavigateToStorefront?: (
    view: 'home' | 'catalog' | 'product' | 'contact' | 'checkout' | 'account' | 'admin',
    anchor?: string
  ) => void;
}

export const AdminProductManagement: React.FC<AdminProductManagementProps> = ({
  onShowToast,
  onNavigateToStorefront
}) => {
  const [products, setProducts] = useState<ProductItem[]>(mockProductsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Active Editor Sub-tab: 'accordions' | 'variants' | 'dimensions' | 'info'
  const [activeEditorTab, setActiveEditorTab] = useState<'accordions' | 'variants' | 'dimensions' | 'info'>('accordions');

  // Currently Editing Product Object
  const currentEditingProduct = products.find((p) => p.id === editingProductId);

  // Critical Low Stock Products (Stock <= 5 or 0)
  const criticalProducts = products.filter((p) => p.totalStock <= 5);

  // Filtered Products for List View
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  // Helper to update current editing product state
  const updateCurrentProduct = (updated: ProductItem) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Reorder Accordions: Move UP
  const handleMoveUp = (index: number) => {
    if (!currentEditingProduct || index === 0) return;
    const items = [...currentEditingProduct.accordions];
    const temp = items[index];
    items[index] = items[index - 1];
    items[index - 1] = temp;

    // Recalculate 1-based sortOrder
    const reordered = items.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1
    }));

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: reordered
    });
    onShowToast(`Tab order updated: "${temp.title}" moved up.`);
  };

  // Reorder Accordions: Move DOWN
  const handleMoveDown = (index: number) => {
    if (!currentEditingProduct || index === currentEditingProduct.accordions.length - 1) return;
    const items = [...currentEditingProduct.accordions];
    const temp = items[index];
    items[index] = items[index + 1];
    items[index + 1] = temp;

    // Recalculate 1-based sortOrder
    const reordered = items.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1
    }));

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: reordered
    });
    onShowToast(`Tab order updated: "${temp.title}" moved down.`);
  };

  // Add New Accordion Tab
  const handleAddAccordion = () => {
    if (!currentEditingProduct) return;
    const newSortOrder = currentEditingProduct.accordions.length + 1;
    const newItem: PDPAccordionItem = {
      id: 'acc-' + Date.now(),
      title: 'NEW ACCORDION TAB #' + newSortOrder,
      sortOrder: newSortOrder,
      contentType: 'rich_text',
      content: 'Enter detailed clinical information, usage steps, or reference links here...'
    };

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: [...currentEditingProduct.accordions, newItem]
    });
    onShowToast(`New accordion tab added (#${newSortOrder}).`);
  };

  // Delete Accordion Tab
  const handleDeleteAccordion = (accId: string) => {
    if (!currentEditingProduct) return;
    if (currentEditingProduct.accordions.length <= 1) {
      alert('A product must maintain at least 1 accordion tab.');
      return;
    }

    const filtered = currentEditingProduct.accordions
      .filter((a) => a.id !== accId)
      .map((item, idx) => ({ ...item, sortOrder: idx + 1 }));

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: filtered
    });
    onShowToast('Accordion tab deleted.');
  };

  // Restock simulation for low stock banner
  const handleRestockProduct = (productId: string, qty: number = 50) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextStock = p.totalStock + qty;
          const nextVariants = p.variants.map((v) => ({
            ...v,
            stock: v.stock + Math.round(qty / p.variants.length)
          }));
          return {
            ...p,
            totalStock: nextStock,
            variants: nextVariants
          };
        }
        return p;
      })
    );
    onShowToast(`Product stock successfully replenished (+${qty} units).`);
  };

  // Add New Product
  const handleAddNewProduct = () => {
    const newId = 'prod-' + Date.now();
    const newSku = 'CLP-NEW-' + Math.floor(100 + Math.random() * 900);
    const newProduct: ProductItem = {
      id: newId,
      name: 'New CAT LAB+ Product (Click Edit to modify)',
      sku: newSku,
      category: 'Diagnostic Kits',
      basePrice: 650,
      totalStock: 50,
      status: 'Draft',
      images: [
        { url: '/images/product.webp', isPrimary: true, name: 'Default Cover' }
      ],
      weightGram: 250,
      lengthCm: 15,
      widthCm: 10,
      heightCm: 5,
      variants: [
        {
          id: 'var-' + Date.now(),
          name: 'Standard Unit',
          sku: newSku + '-STD',
          price: 650,
          stock: 50
        }
      ],
      accordions: [
        {
          id: 'acc-' + Date.now(),
          title: 'PRODUCT OVERVIEW',
          sortOrder: 1,
          contentType: 'rich_text',
          content: 'Add clinical descriptions and packaging contents.'
        }
      ]
    };

    setProducts([newProduct, ...products]);
    setEditingProductId(newId);
    setActiveEditorTab('accordions');
    onShowToast(`New product ${newSku} created. You are now in the detail editor.`);
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    if (!confirm(`Are you sure you want to delete "${target?.name}" from catalog?`)) {
      return;
    }
    setProducts(products.filter((p) => p.id !== productId));
    if (editingProductId === productId) {
      setEditingProductId(null);
    }
    onShowToast(`Product ${target?.name} deleted from catalog.`);
  };

  // Toggle status
  const handleToggleProductStatus = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const next = p.status === 'Active' ? 'Draft' : 'Active';
          onShowToast(`Status for ${p.sku} updated to ${next}.`);
          return { ...p, status: next };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* HEADER: Strictly "Product Management" with NO SUBTITLE                   */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Product Management
            </h1>
            <AdminHelpIcon text="Catalog inventory management: product list, physical shipping dimensions, variants table with auto-stock deduction on Paid orders, and dynamic PDP collapsible accordion tab repeater." />
          </div>
        </div>

        {/* Global Action Button */}
        {!editingProductId && (
          <button
            type="button"
            onClick={handleAddNewProduct}
            className="inline-flex items-center gap-2 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2.5 text-xs font-bold shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            <Plus className="h-4 w-4 text-yellow" />
            <span>+ Add New Product</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CRITICAL INVENTORY WARNING (LOW STOCK ALERT) DIRECTLY UNDER TITLE         */}
      {/* ========================================================================= */}
      {!editingProductId && criticalProducts.length > 0 && (
        <div className="rounded-3xl border border-rose-200/90 bg-rose-50/50 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-rose-200/60">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
                    Critical Inventory Warning (Low Stock Alert)
                  </h3>
                  <AdminHelpIcon text="Automated detection of products with stock ≤ 5 units or zero (0). Prioritizes items that need immediate restocking before customer order fulfillment is blocked." />
                </div>
                <p className="text-xs text-rose-700 font-medium mt-0.5">
                  There are {criticalProducts.length} items with low or depleted stock requiring immediate replenishment!
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 self-start sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse"></span>
              <span>{criticalProducts.length} Critical Items</span>
            </span>
          </div>

          {/* Low Stock Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {criticalProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-rose-200/80 bg-white p-4 space-y-2.5 shadow-2xs hover:border-rose-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {item.sku}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      item.totalStock === 0
                        ? 'bg-rose-100 text-rose-800 font-extrabold'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.totalStock === 0 ? 'Out of Stock (0)' : `${item.totalStock} Units Left`}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{item.category}</p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-400">Threshold: ≤ 5 units</span>
                  <AdminTooltip content={`Simulate stock replenishment of +50 units for SKU ${item.sku}`}>
                    <button
                      type="button"
                      onClick={() => handleRestockProduct(item.id, 50)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-charcoal hover:text-black bg-yellow/20 hover:bg-yellow/40 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>+ Restock 50</span>
                    </button>
                  </AdminTooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: PRODUCT LIST VIEW                                                 */}
      {/* ========================================================================= */}
      {!editingProductId ? (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-2xs">
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, SKU code, or category..."
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-charcoal focus:ring-4 focus:ring-yellow/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Product List Table */}
          <div className="rounded-3xl border border-gray-200/90 bg-white shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold select-none">
                    <th className="py-3.5 pl-6 pr-3">Photo & Product Name</th>
                    <th className="py-3.5 px-3">SKU</th>
                    <th className="py-3.5 px-3">Category</th>
                    <th className="py-3.5 px-3">Base Price</th>
                    <th className="py-3.5 px-3">Total Stock</th>
                    <th className="py-3.5 px-3">Status</th>
                    <th className="py-3.5 pr-6 pl-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((prod) => {
                    const primaryImg = prod.images.find((i) => i.isPrimary) || prod.images[0];
                    return (
                      <tr key={prod.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl border border-gray-200 bg-gray-50 p-1 flex items-center justify-center shrink-0">
                              <img
                                src={primaryImg?.url || '/images/product.webp'}
                                alt={prod.name}
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-1">
                                {prod.name}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                {prod.variants.length} Variants • {prod.accordions.length} PDP Accordion Tabs
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-3 font-mono font-bold text-gray-600">
                          {prod.sku}
                        </td>

                        <td className="py-4 px-3 text-gray-600">
                          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                            {prod.category}
                          </span>
                        </td>

                        <td className="py-4 px-3 font-extrabold text-gray-900 tabular-nums">
                          NT$ {prod.basePrice.toLocaleString()}
                        </td>

                        <td className="py-4 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                              prod.totalStock === 0
                                ? 'bg-rose-100 text-rose-800'
                                : prod.totalStock <= 5
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {prod.totalStock} units
                          </span>
                        </td>

                        <td className="py-4 px-3">
                          <button
                            type="button"
                            onClick={() => handleToggleProductStatus(prod.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                              prod.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                prod.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'
                              }`}
                            />
                            <span>{prod.status}</span>
                          </button>
                        </td>

                        <td className="py-4 pr-6 pl-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <AdminTooltip content="Edit physical specifications, images, variants, and PDP accordions">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProductId(prod.id);
                                  setActiveEditorTab('accordions');
                                }}
                                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-3 py-1.5 text-xs font-bold shadow-2xs transition-all cursor-pointer"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit Details</span>
                              </button>
                            </AdminTooltip>

                            <AdminTooltip content="Delete product from catalog">
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shadow-2xs"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </AdminTooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: PRODUCT DETAIL / EDITOR VIEW                                      */
        /* ========================================================================= */
        currentEditingProduct && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Back Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setEditingProductId(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-black cursor-pointer group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>← Back to Products List</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  Editing: <strong>{currentEditingProduct.sku}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onShowToast(`All changes for ${currentEditingProduct.sku} saved.`);
                    setEditingProductId(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Save className="h-4 w-4 text-yellow" />
                  <span>Save & Finish</span>
                </button>
              </div>
            </div>

            {/* Product Overview Strip */}
            <div className="rounded-3xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-2xl border border-gray-200 bg-gray-50 p-1 flex items-center justify-center shrink-0">
                  <img
                    src={currentEditingProduct.images.find((i) => i.isPrimary)?.url || '/images/product.webp'}
                    alt={currentEditingProduct.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {currentEditingProduct.sku}
                    </span>
                    <span className="text-xs font-medium text-gray-500">• {currentEditingProduct.category}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                    {currentEditingProduct.name}
                  </h2>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                    <span>Price: <strong className="text-gray-900">NT$ {currentEditingProduct.basePrice}</strong></span>
                    <span>•</span>
                    <span>Stock: <strong className="text-gray-900">{currentEditingProduct.totalStock} units</strong></span>
                    <span>•</span>
                    <span>Dimensions: <strong className="text-gray-900">{currentEditingProduct.lengthCm}×{currentEditingProduct.widthCm}×{currentEditingProduct.heightCm} cm ({currentEditingProduct.weightGram}g)</strong></span>
                  </div>
                </div>
              </div>

              {/* Tab Navigation for Editor */}
              <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50/70 p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('accordions')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeEditorTab === 'accordions'
                      ? 'bg-charcoal text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  PDP Accordions ({currentEditingProduct.accordions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('variants')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeEditorTab === 'variants'
                      ? 'bg-charcoal text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Variants ({currentEditingProduct.variants.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('dimensions')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeEditorTab === 'dimensions'
                      ? 'bg-charcoal text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dimensions & Weight
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('info')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeEditorTab === 'info'
                      ? 'bg-charcoal text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Media & Info
                </button>
              </div>
            </div>

            {/* TAB: ACCORDIONS REPEATER */}
            {activeEditorTab === 'accordions' && (
              <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900">
                        Dynamic PDP Accordion Content Repeater
                      </h3>
                      <AdminHelpIcon text="Admin can add unlimited collapsible tabs to the PDP, update titles, edit content, and reorder positions using the ▲ Up and ▼ Down controls." />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      The order below directly reflects the arrangement on the customer Product Detail Page.
                    </p>
                  </div>

                  <AdminTooltip content="Add a new collapsible tab at the bottom of the PDP accordion list">
                    <button
                      type="button"
                      onClick={handleAddAccordion}
                      className="inline-flex items-center gap-2 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2 text-xs font-bold shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <Plus className="h-4 w-4 text-yellow" />
                      <span>+ Add Accordion Tab</span>
                    </button>
                  </AdminTooltip>
                </div>

                <div className="space-y-4">
                  {currentEditingProduct.accordions.map((acc, index) => {
                    const isFirst = index === 0;
                    const isLast = index === currentEditingProduct.accordions.length - 1;

                    return (
                      <div
                        key={acc.id}
                        className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 transition-all hover:border-gray-300 space-y-3.5 shadow-2xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-charcoal text-white font-mono text-xs font-bold shrink-0">
                              #{acc.sortOrder}
                            </span>

                            <div className="flex-1 max-w-md">
                              <input
                                type="text"
                                value={acc.title}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateCurrentProduct({
                                    ...currentEditingProduct,
                                    accordions: currentEditingProduct.accordions.map((a) =>
                                      a.id === acc.id ? { ...a, title: val } : a
                                    )
                                  });
                                }}
                                placeholder="Accordion Title (e.g. PRODUCT DETAILS, HOW IT WORKS)"
                                className="w-full h-9 rounded-lg border border-gray-300 bg-white px-3 font-bold text-xs sm:text-sm text-gray-900 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none uppercase"
                              />
                            </div>

                            <select
                              value={acc.contentType}
                              onChange={(e) => {
                                const val = e.target.value as any;
                                updateCurrentProduct({
                                  ...currentEditingProduct,
                                  accordions: currentEditingProduct.accordions.map((a) =>
                                    a.id === acc.id ? { ...a, contentType: val } : a
                                  )
                                });
                              }}
                              className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none cursor-pointer"
                            >
                              <option value="rich_text">Rich Text / Paragraph</option>
                              <option value="table">Clinical Parameters Table</option>
                              <option value="pdf_download">PDF Document Download</option>
                            </select>
                          </div>

                          {/* Order Action Buttons: ▲ Up & ▼ Down & Trash */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                            <AdminTooltip
                              content={
                                isFirst
                                  ? 'Up button disabled because this row is already in the top position (#1).'
                                  : 'Swap order upward with the preceding row.'
                              }
                            >
                              <button
                                type="button"
                                disabled={isFirst}
                                onClick={() => handleMoveUp(index)}
                                aria-label="Move tab order up"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </button>
                            </AdminTooltip>

                            <AdminTooltip
                              content={
                                isLast
                                  ? 'Down button disabled because this row is in the last position.'
                                  : 'Swap order downward with the following row.'
                              }
                            >
                              <button
                                type="button"
                                disabled={isLast}
                                onClick={() => handleMoveDown(index)}
                                aria-label="Move tab order down"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </button>
                            </AdminTooltip>

                            <AdminTooltip content="Delete this accordion tab from the customer PDP.">
                              <button
                                type="button"
                                onClick={() => handleDeleteAccordion(acc.id)}
                                aria-label="Delete tab"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shadow-2xs ml-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </AdminTooltip>
                          </div>
                        </div>

                        <div>
                          <textarea
                            rows={3}
                            value={acc.content}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCurrentProduct({
                                ...currentEditingProduct,
                                accordions: currentEditingProduct.accordions.map((a) =>
                                  a.id === acc.id ? { ...a, content: val } : a
                                )
                              });
                            }}
                            placeholder="Enter detailed paragraph content, clinical protocol, or PDF download links..."
                            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-xs sm:text-sm text-gray-800 leading-relaxed focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none transition-all"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: VARIANTS */}
            {activeEditorTab === 'variants' && (
              <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Product Variants & Inventory Relations
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Inventory deductions occur automatically per variant SKU when orders with Paid status are created.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newVar: ProductVariant = {
                        id: 'var-' + Date.now(),
                        name: 'Additional Variant',
                        sku: currentEditingProduct.sku + '-V' + (currentEditingProduct.variants.length + 1),
                        price: currentEditingProduct.basePrice,
                        stock: 20
                      };
                      updateCurrentProduct({
                        ...currentEditingProduct,
                        variants: [...currentEditingProduct.variants, newVar]
                      });
                      onShowToast('New variant added.');
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2 text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Plus className="h-4 w-4 text-yellow" />
                    <span>+ Add Variant</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold">
                        <th className="py-3 px-3">Variant Name</th>
                        <th className="py-3 px-3">Variant SKU</th>
                        <th className="py-3 px-3">Price (TWD)</th>
                        <th className="py-3 px-3">Stock Units</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentEditingProduct.variants.map((v) => (
                        <tr key={v.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3 px-3 font-bold text-gray-900">
                            <input
                              type="text"
                              value={v.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateCurrentProduct({
                                  ...currentEditingProduct,
                                  variants: currentEditingProduct.variants.map((item) =>
                                    item.id === v.id ? { ...item, name: val } : item
                                  )
                                });
                              }}
                              className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-charcoal"
                            />
                          </td>
                          <td className="py-3 px-3 font-mono text-gray-600">
                            <input
                              type="text"
                              value={v.sku}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateCurrentProduct({
                                  ...currentEditingProduct,
                                  variants: currentEditingProduct.variants.map((item) =>
                                    item.id === v.id ? { ...item, sku: val } : item
                                  )
                                });
                              }}
                              className="w-32 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-mono focus:outline-none focus:border-charcoal"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">NT$</span>
                              <input
                                type="number"
                                value={v.price}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  updateCurrentProduct({
                                    ...currentEditingProduct,
                                    variants: currentEditingProduct.variants.map((item) =>
                                      item.id === v.id ? { ...item, price: val } : item
                                    )
                                  });
                                }}
                                className="w-20 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold tabular-nums focus:outline-none focus:border-charcoal"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              value={v.stock}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                updateCurrentProduct({
                                  ...currentEditingProduct,
                                  variants: currentEditingProduct.variants.map((item) =>
                                    item.id === v.id ? { ...item, stock: val } : item
                                  )
                                });
                              }}
                              className="w-16 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold tabular-nums focus:outline-none focus:border-charcoal"
                            />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (currentEditingProduct.variants.length <= 1) {
                                  alert('A product must maintain at least 1 variant.');
                                  return;
                                }
                                updateCurrentProduct({
                                  ...currentEditingProduct,
                                  variants: currentEditingProduct.variants.filter((item) => item.id !== v.id)
                                });
                              }}
                              className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: DIMENSIONS & WEIGHT */}
            {activeEditorTab === 'dimensions' && (
              <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="text-base font-bold text-gray-900">
                    Physical Dimensions & Shipping Parameters
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    These parameters are evaluated by couriers (Black Cat / 7-Eleven CVS) to determine tiered matrix rates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase">Weight</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={currentEditingProduct.weightGram}
                        onChange={(e) =>
                          updateCurrentProduct({
                            ...currentEditingProduct,
                            weightGram: Number(e.target.value)
                          })
                        }
                        className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm"
                      />
                      <span className="text-xs font-bold text-gray-500">grams</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase">Length</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={currentEditingProduct.lengthCm}
                        onChange={(e) =>
                          updateCurrentProduct({
                            ...currentEditingProduct,
                            lengthCm: Number(e.target.value)
                          })
                        }
                        className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm"
                      />
                      <span className="text-xs font-bold text-gray-500">cm</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase">Width</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={currentEditingProduct.widthCm}
                        onChange={(e) =>
                          updateCurrentProduct({
                            ...currentEditingProduct,
                            widthCm: Number(e.target.value)
                          })
                        }
                        className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm"
                      />
                      <span className="text-xs font-bold text-gray-500">cm</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase">Height</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={currentEditingProduct.heightCm}
                        onChange={(e) =>
                          updateCurrentProduct({
                            ...currentEditingProduct,
                            heightCm: Number(e.target.value)
                          })
                        }
                        className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm"
                      />
                      <span className="text-xs font-bold text-gray-500">cm</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-yellow/15 border border-yellow/30 p-4 flex items-center justify-between text-xs text-charcoal">
                  <p className="font-bold">
                    Total Accumulated Dimension (L + W + H): {currentEditingProduct.lengthCm + currentEditingProduct.widthCm + currentEditingProduct.heightCm} cm
                  </p>
                  <button
                    type="button"
                    onClick={() => onShowToast('Physical specifications updated.')}
                    className="rounded-xl bg-charcoal text-white px-4 py-2 text-xs font-bold cursor-pointer"
                  >
                    Update Specifications
                  </button>
                </div>
              </div>
            )}

            {/* TAB: MEDIA & BASIC INFO */}
            {activeEditorTab === 'info' && (
              <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Basic Product Information & Gallery
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Product Title</label>
                      <input
                        type="text"
                        value={currentEditingProduct.name}
                        onChange={(e) => updateCurrentProduct({ ...currentEditingProduct, name: e.target.value })}
                        className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Master SKU</label>
                      <input
                        type="text"
                        value={currentEditingProduct.sku}
                        onChange={(e) => updateCurrentProduct({ ...currentEditingProduct, sku: e.target.value })}
                        className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-mono text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                      <input
                        type="text"
                        value={currentEditingProduct.category}
                        onChange={(e) => updateCurrentProduct({ ...currentEditingProduct, category: e.target.value })}
                        className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Base Price (TWD)</label>
                      <input
                        type="number"
                        value={currentEditingProduct.basePrice}
                        onChange={(e) => updateCurrentProduct({ ...currentEditingProduct, basePrice: Number(e.target.value) })}
                        className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-3">Product Image Gallery</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {currentEditingProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`rounded-2xl border p-2.5 bg-white ${
                          img.isPrimary ? 'border-charcoal ring-2 ring-yellow' : 'border-gray-200'
                        }`}
                      >
                        <div className="h-28 w-full rounded-xl bg-gray-50 flex items-center justify-center p-2">
                          <img src={img.url} alt={img.name} className="h-full w-full object-contain" />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="truncate">{img.name}</span>
                          {!img.isPrimary && (
                            <button
                              type="button"
                              onClick={() => {
                                const next = currentEditingProduct.images.map((im, i) => ({
                                  ...im,
                                  isPrimary: i === idx
                                }));
                                updateCurrentProduct({ ...currentEditingProduct, images: next });
                                onShowToast('Primary cover thumbnail updated.');
                              }}
                              className="text-[10px] text-gray-600 hover:text-black underline cursor-pointer"
                            >
                              Set Primary
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
