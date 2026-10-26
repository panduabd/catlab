import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
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
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Star,
  Package,
  Truck,
  Check,
  Upload,
  Video,
  Play,
  MoreVertical,
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  Globe
} from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';

// Security & Validation Constants (Best Practices)
export const MAX_PRODUCT_TITLE_LENGTH = 100;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB per image file
export const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB per video file
export const MAX_MEDIA_ITEMS = 10; // Max 10 media items per product
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_MEDIA_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/webm'
];

export interface ProductVariant {
  id: string;
  name: string;
  nameZh?: string;
  sku: string;
  price: number; // in TWD (Sale Price)
  originalPrice?: number; // Compare-at / Strikethrough price in TWD
  stock: number;
  imageUrl?: string; // variant image thumbnail
}

export interface TableRowItem {
  key: string;
  keyZh?: string;
  value: string;
  valueZh?: string;
}

export interface AccordionContentBlock {
  id: string;
  type: 'rich_text' | 'table';
  title: string;
  titleZh?: string;
  content?: string; // For rich_text (English)
  contentZh?: string; // For rich_text (Traditional Chinese)
  tableRows?: TableRowItem[]; // For table layout
}

export interface ContentAccordionItem {
  id: string;
  title: string;
  titleZh?: string;
  sortOrder: number;
  blocks: AccordionContentBlock[];
  contentType?: 'rich_text' | 'table' | 'pdf_download';
  content?: string;
}
export type PDPAccordionItem = ContentAccordionItem;

export interface ProductMediaItem {
  id?: string;
  url: string;
  type?: 'image' | 'video';
  isPrimary: boolean;
  name: string; // Caption / Display Title (English)
  nameZh?: string; // Caption / Display Title (Traditional Chinese)
  altText?: string; // SEO Alt text (English)
  altTextZh?: string; // SEO Alt text (Traditional Chinese)
}

export interface ProductItem {
  id: string;
  name: string;
  nameZh?: string;
  sku: string;
  category: string;
  basePrice: number; // in TWD
  originalPrice?: number; // Compare-at / Strikethrough price in TWD
  totalStock: number;
  status: 'Active' | 'Draft';
  images: ProductMediaItem[];
  weightGram: number; // in grams
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  variants: ProductVariant[];
  accordions: ContentAccordionItem[];
  description?: string;
  descriptionZh?: string;
}

const mockProductsList: ProductItem[] = [
  {
    id: 'prod-001',
    name: 'CAT LAB+ Hydrophobic Cat Litter Kit (Complete Home Wellness)',
    nameZh: 'CAT LAB+ 貓咪專用疏水貓砂採樣檢測組 (居家日常健康監測套裝)',
    sku: 'CLP-KIT-01',
    category: 'Diagnostic Kits',
    basePrice: 890,
    originalPrice: 1200,
    totalStock: 148,
    status: 'Active',
    description:
      'Complete at-home feline wellness and diagnostic urine collection kit featuring non-absorbing hydrophobic sand and 10 clinical reagent testing parameters.',
    descriptionZh:
      '專為貓咪設計的無痛居家尿液採樣與檢測套組，採用 100% 疏水不吸水砂顆粒與 10 項臨床檢測試紙，輕鬆收集乾淨檢體。',
    images: [
      {
        url: '/images/product.webp',
        type: 'image',
        isPrimary: true,
        name: 'Main Kit Overview',
        nameZh: '套組完整外盒與全配件總覽',
        altText: 'CAT LAB+ feline diagnostic home urine collection kit complete box',
        altTextZh: 'CAT LAB+ 貓咪專用疏水貓砂居家採樣檢測組完整外盒包裝'
      },
      {
        url: '/images/product-front.webp',
        type: 'image',
        isPrimary: false,
        name: 'Box Packaging Front',
        nameZh: '外包裝正面展示',
        altText: 'CAT LAB+ medical packaging front showing 10 diagnostic clinical parameters',
        altTextZh: 'CAT LAB+ 醫學級包裝正面標示 10 項臨床檢測參數'
      },
      {
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: 'video',
        isPrimary: false,
        name: '3-Step Urine Collection Protocol (Video)',
        nameZh: '三步驟尿液採樣教學示範 (教學影片)',
        altText: 'Demonstration video tutorial for feline urine collection using hydrophobic sand',
        altTextZh: '使用專利疏水砂進行貓咪無痛採樣之教學示範影片'
      },
      {
        url: '/images/step-4.webp',
        type: 'image',
        isPrimary: false,
        name: 'Hydrophobic Collection Step',
        nameZh: '疏水砂自然集尿步驟',
        altText: 'Hydrophobic non-absorbing sand feline urine collection method',
        altTextZh: '專利疏水不吸水砂表面尿液凝結水珠採樣方式'
      },
      {
        url: '/images/step-6.webp',
        type: 'image',
        isPrimary: false,
        name: '10-Parameter Strip Foil',
        nameZh: '10 項試紙密封鋁箔包裝',
        altText: 'Foil sealed 10-parameter feline reagent urine test strip',
        altTextZh: '真空鋁箔封裝之 10 項貓咪尿液臨床診斷試紙'
      }
    ],
    weightGram: 420,
    lengthCm: 24,
    widthCm: 18,
    heightCm: 8,
    variants: [
      {
        id: 'var-1',
        name: 'Complete Kit with 10-Parameter Strip',
        nameZh: '完整檢測組 (含 10 項試紙)',
        sku: 'CLP-KIT-10P',
        price: 890,
        originalPrice: 1200,
        stock: 95,
        imageUrl: '/images/product.webp'
      },
      {
        id: 'var-2',
        name: 'Double Pack Value Bundle (2x Kits)',
        nameZh: '雙盒超值分享組 (2 組套裝)',
        sku: 'CLP-KIT-2PK',
        price: 1680,
        originalPrice: 1980,
        stock: 35,
        imageUrl: '/images/product-front.webp'
      },
      {
        id: 'var-3',
        name: 'Refill Pack (Sand + 5 Strips)',
        nameZh: '補充包 (疏水砂 + 5 份試紙)',
        sku: 'CLP-RFL-STD',
        price: 520,
        originalPrice: 650,
        stock: 18,
        imageUrl: '/images/step-4.webp'
      }
    ],
    accordions: [
      {
        id: 'acc-1',
        title: 'PRODUCT DETAILS & SPECIFICATIONS',
        titleZh: '商品詳情與臨床規格',
        sortOrder: 1,
        blocks: [
          {
            id: 'blk-1',
            type: 'rich_text',
            title: 'PACKAGE COMPOSITION',
            titleZh: '內容物配置說明',
            content:
              'Each diagnostic set includes 1x Hydrophobic Non-Absorbing Sand pouch (300g), 1x sterile urine collection pipette dropper, 1x airtight specimen vial, and 1x foil-sealed 10-parameter reagent testing strip.',
            contentZh:
              '每份檢測套組包含：專利疏水砂 1 包 (300g)、無菌採樣滴管 1 支、氣密封裝檢體保存管 1 支，以及真空鋁箔封裝之 10 項臨床檢測試紙 1 份。'
          },
          {
            id: 'blk-2',
            type: 'table',
            title: 'SPECIFICATIONS',
            titleZh: '詳細規格清單',
            tableRows: [
              { key: 'Product Name', keyZh: '商品名稱', value: 'CAT LAB+ Hydrophobic Cat Litter Kit', valueZh: 'CAT LAB+ 疏水貓砂居家採樣檢測組' },
              { key: 'Application', keyZh: '適用用途', value: 'At-Home Feline Urine Collection & Health Monitoring', valueZh: '居家貓咪尿液採集與基礎健康監測' },
              { key: 'Litter Material', keyZh: '貓砂材質', value: '100% Non-Absorbent, Non-Toxic Granules', valueZh: '100% 專利疏水無毒顆粒' },
              { key: 'Testing Method', keyZh: '檢測方式', value: '10-Parameter Urine Test Strip & Standard Diagnostic Color Chart', valueZh: '10 項尿液檢測試紙與標準比色卡' },
              { key: 'Target Species', keyZh: '適用對象', value: 'Felines (All Breeds)', valueZh: '全年齡全品種貓咪' },
              { key: 'Sample Storage', keyZh: '檢體保存', value: 'Refrigerate if not delivered to clinic within 1 hr (max 12 hrs)', valueZh: '如未即時送驗請冷藏保存 (最長不超過 12 小時)' }
            ]
          }
        ]
      },
      {
        id: 'acc-2',
        title: 'HOW IT WORKS (3-STEP PROTOCOL)',
        titleZh: '使用流程說明 (3 步驟採樣)',
        sortOrder: 2,
        blocks: [
          {
            id: 'blk-3',
            type: 'rich_text',
            title: 'STEP-BY-STEP CLINICAL GUIDE',
            titleZh: '臨床採樣步驟指引',
            content:
              '1. Empty the specialized hydrophobic sand into a thoroughly cleaned litter box.\n2. Allow your cat to urinate naturally; urine droplets bead cleanly on the surface without absorbing.\n3. Aspirate droplets using the sterile pipette dropper and dip the 10-parameter testing strip for 60 seconds.',
            contentZh:
              '1. 將專用疏水砂倒入清潔乾燥的貓砂盆中。\n2. 貓咪排尿後，尿液顆粒將完好懸浮於砂表面不被吸收。\n3. 使用無菌滴管吸取尿液滴於試紙，靜待 60 秒對照比色卡。'
          }
        ]
      },
      {
        id: 'acc-3',
        title: '10 DIAGNOSTIC CLINICAL PARAMETERS',
        titleZh: '10 項臨床診斷檢測參數',
        sortOrder: 3,
        blocks: [
          {
            id: 'blk-4',
            type: 'rich_text',
            title: 'REAGENTS & BIOMARKERS',
            titleZh: '檢測試劑與生物標誌物',
            content:
              'Parameters: Leukocytes, Nitrite, Urobilinogen, Protein, pH (5.0–8.5), Blood/Hemoglobin, Specific Gravity (1.000–1.030), Ketone, Bilirubin, Glucose. Matches feline veterinary triage standards.',
            contentZh:
              '檢測項目涵蓋：白血球、亞硝酸鹽、尿膽素原、蛋白質、酸鹼值 (pH 5.0–8.5)、潛血/血紅素、尿比重 (1.000–1.030)、酮體、膽紅素、葡萄糖。完全符合獸醫臨床篩檢標準。'
          },
          {
            id: 'blk-5',
            type: 'table',
            title: 'PARAMETER REAGENTS TABLE',
            titleZh: '檢測規格與保存標準',
            tableRows: [
              { key: 'Storage Condition', keyZh: '保存條件', value: 'Store at 2°C – 30°C (36°F – 86°F)', valueZh: '儲存於 2°C – 30°C 陰涼乾燥處' },
              { key: 'Desiccant Included', keyZh: '內附乾燥劑', value: 'Yes, Molecular Sieve Pack', valueZh: '包含分子篩乾燥劑包' },
              { key: 'Reading Time', keyZh: '判讀時間', value: '60 Seconds Exact Color Comparison', valueZh: '浸泡試紙 60 秒精準對照比色卡' },
              { key: 'Veterinary Standard', keyZh: '臨床標準規範', value: 'TVMA Diagnostic Consensus Compliant', valueZh: '符合 TVMA 獸醫醫學診斷共識標準' }
            ]
          }
        ]
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
    description:
      'Foil-sealed 10-parameter reagent test strips (10 strips per box) for ongoing feline health monitoring and routine urinalysis checkups.',
    images: [
      {
        url: '/images/product-front.webp',
        type: 'image',
        isPrimary: true,
        name: 'Refill Strip Box',
        altText: 'CAT LAB+ 10-parameter test strip refill pack carton'
      },
      {
        url: '/images/step-6.webp',
        type: 'image',
        isPrimary: false,
        name: 'Foil Packaging',
        altText: 'Individually wrapped test strips with moisture desiccant'
      }
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
        stock: 3,
        imageUrl: '/images/product-front.webp'
      }
    ],
    accordions: [
      {
        id: 'acc-201',
        title: 'COMPATIBILITY & STORAGE',
        sortOrder: 1,
        blocks: [
          {
            id: 'blk-201',
            type: 'rich_text',
            title: 'STORAGE GUIDELINES',
            content:
              'Individually foil-sealed with desiccant. Store between 2°C–30°C away from direct sunlight. Compatible with all CAT LAB+ sample collection kits.'
          },
          {
            id: 'blk-202',
            type: 'table',
            title: 'SPECIFICATIONS',
            tableRows: [
              { key: 'Quantity', value: '10 Individually Foil-Wrapped Strips' },
              { key: 'Shelf Life', value: '24 Months from Production Date' },
              { key: 'Storage Temp', value: '2°C – 30°C' }
            ]
          }
        ]
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
    description:
      'Bulk 500g refill pouch of hydrophobic non-absorbing quartz sand for painless at-home cat urine sample collection.',
    images: [
      {
        url: '/images/step-4.webp',
        type: 'image',
        isPrimary: true,
        name: 'Sand Refill Bag',
        altText: 'Hydrophobic cat sand 500g pouch for cat urine sampling'
      }
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
        stock: 0,
        imageUrl: '/images/step-4.webp'
      }
    ],
    accordions: [
      {
        id: 'acc-301',
        title: 'USAGE INSTRUCTIONS & SPECIFICATIONS',
        sortOrder: 1,
        blocks: [
          {
            id: 'blk-301',
            type: 'rich_text',
            title: 'USAGE INSTRUCTIONS',
            content:
              '100% natural, non-toxic hydrophobic quartz sand. Wash and dry litter tray thoroughly before pouring.'
          },
          {
            id: 'blk-302',
            type: 'table',
            title: 'SPECIFICATIONS',
            tableRows: [
              { key: 'Product Weight', value: '500 grams (Bulk Refill)' },
              { key: 'Granule Size', value: '0.8 – 1.2 mm Natural Quartz' },
              { key: 'Toxicity', value: 'Zero Chemical Additives, 100% Non-Toxic' }
            ]
          }
        ]
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
    description:
      'Medical-grade sterile aspiration pipettes and specimen collection vials (5 complete sets) for precise at-home feline diagnostic testing.',
    images: [
      {
        url: '/images/step-5.webp',
        type: 'image',
        isPrimary: true,
        name: 'Pipettes and Vials',
        altText: 'Medical-grade sterile cat urine dropper and specimen collection tube'
      }
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
        stock: 82,
        imageUrl: '/images/step-5.webp'
      }
    ],
    accordions: [
      {
        id: 'acc-401',
        title: 'STERILIZATION STANDARDS & SPECIFICATIONS',
        sortOrder: 1,
        blocks: [
          {
            id: 'blk-401',
            type: 'rich_text',
            title: 'STERILIZATION STANDARDS',
            content: 'Medical-grade polyethylene pipettes with calibrated mL volume indicators.'
          },
          {
            id: 'blk-402',
            type: 'table',
            title: 'SPECIFICATIONS',
            tableRows: [
              { key: 'Vial Capacity', value: '5 mL Airtight Screw-Top' },
              { key: 'Pipette Volume', value: '3 mL with 0.5 mL Markings' },
              { key: 'Sterilization Method', value: 'Ethylene Oxide (EO) Gas' }
            ]
          }
        ]
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

  // Active Tab for Product Detail Editor: 'general' | 'media' | 'variants' | 'accordions' (UntitledUI Segmented Tabs)
  const [activeDetailTab, setActiveDetailTab] = useState<'general' | 'media' | 'variants' | 'accordions'>('general');

  // Content Language Toggle: 'zh' (Traditional Chinese / 繁體中文 - Default Primary) | 'en' (English Translation)
  const [contentLanguage, setContentLanguage] = useState<'en' | 'zh'>('zh');

  // Media Gallery Form & Upload State
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaCaption, setNewMediaCaption] = useState('');
  const [newMediaAltText, setNewMediaAltText] = useState('');
  const [showSeoAltInput, setShowSeoAltInput] = useState(false); // Optional SEO Alt toggle
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Full Preview Lightbox Modal State
  const [previewMedia, setPreviewMedia] = useState<ProductMediaItem | null>(null);

  // Three-dot Menu State for Media Items
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  // Edit SEO Alt Text & Caption Modal State (Bilingual)
  const [editingMediaItem, setEditingMediaItem] = useState<{
    index: number;
    name: string;
    nameZh: string;
    altText: string;
    altTextZh: string;
  } | null>(null);
  const [mediaModalLang, setMediaModalLang] = useState<'en' | 'zh'>('zh');

  // Variant Image Picker Modal State
  const [pickingVariantImageId, setPickingVariantImageId] = useState<string | null>(null);
  const variantFileInputRef = useRef<HTMLInputElement>(null);

  // Content Accordions collapsible state
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({});

  // Dynamic Product Categories (User custom categories are preserved and selectable)
  const [categories, setCategories] = useState<string[]>(() => {
    const defaults = [
      'Diagnostic Kits',
      'Refill Supplies',
      'Litter Supplies',
      'Accessories',
      'Wellness & Care'
    ];
    const existing = mockProductsList.map((p) => p.category).filter(Boolean);
    return Array.from(new Set([...defaults, ...existing]));
  });
  const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Helper to determine if an accordion is open (default: first accordion is open)
  const isAccordionOpen = (id: string, index: number) => {
    if (expandedAccordions[id] === undefined) {
      return index === 0;
    }
    return expandedAccordions[id];
  };

  const toggleAccordion = (id: string, index: number) => {
    setExpandedAccordions((prev) => ({
      ...prev,
      [id]: !isAccordionOpen(id, index)
    }));
  };

  // Currently Editing Product Object
  const currentEditingProduct = products.find((p) => p.id === editingProductId);
  const [initialProductSnapshot, setInitialProductSnapshot] = useState<string>('');

  useEffect(() => {
    if (editingProductId) {
      const prod = products.find((p) => p.id === editingProductId);
      if (prod) {
        setInitialProductSnapshot(JSON.stringify(prod));
      }
    } else {
      setInitialProductSnapshot('');
    }
  }, [editingProductId]);

  const isProductDirty = Boolean(
    currentEditingProduct &&
    initialProductSnapshot &&
    JSON.stringify(currentEditingProduct) !== initialProductSnapshot
  );

  // Critical Low Stock Products (Stock <= 5 or 0)
  const criticalProducts = products.filter((p) => p.totalStock <= 5);

  // Filtered Products for List View
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.nameZh && p.nameZh.toLowerCase().includes(q)) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  // Helper to update current editing product state
  const updateCurrentProduct = (updated: ProductItem) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Sync category from loaded editing product if it's not yet in the categories list
  useEffect(() => {
    if (currentEditingProduct?.category && !categories.includes(currentEditingProduct.category)) {
      setCategories((prev) => [...prev, currentEditingProduct.category]);
    }
  }, [currentEditingProduct?.category, categories]);

  // Handler to add and apply custom product category
  const handleSaveCustomCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
    }
    if (currentEditingProduct) {
      updateCurrentProduct({
        ...currentEditingProduct,
        category: trimmed
      });
    }
    setIsAddingCustomCategory(false);
    setNewCategoryName('');
    onShowToast(`Category "${trimmed}" added and applied.`);
  };

  // Media Gallery Handlers: Set Primary, Delete, Reorder (Left & Right), Update SEO & Caption, Upload & Add
  const handleSetPrimaryImage = (index: number) => {
    if (!currentEditingProduct) return;
    const target = currentEditingProduct.images[index];
    if (target.type === 'video') {
      alert('Videos cannot be set as the cover image. Only images can be the cover.');
      return;
    }
    // Reorder: Move target cover image to index 0 (far left)
    const otherImages = currentEditingProduct.images.filter((_, i) => i !== index);
    const updatedImages = [
      { ...target, isPrimary: true },
      ...otherImages.map((im) => ({ ...im, isPrimary: false }))
    ];
    updateCurrentProduct({
      ...currentEditingProduct,
      images: updatedImages
    });
    if (activeMenuIndex !== null) {
      setActiveMenuIndex(null);
    }
    onShowToast(`Cover image set and moved to the first position.`);
  };

  const handleDeleteImage = (index: number) => {
    if (!currentEditingProduct) return;
    if (currentEditingProduct.images.length <= 1) {
      alert('A product must maintain at least 1 image or video.');
      return;
    }
    const nextImages = currentEditingProduct.images.filter((_, i) => i !== index);
    if (!nextImages.some((im) => im.isPrimary) && nextImages.length > 0) {
      // Find the first IMAGE (video cannot be cover)
      const firstImgIdx = nextImages.findIndex((im) => im.type !== 'video');
      if (firstImgIdx !== -1) {
        nextImages[firstImgIdx].isPrimary = true;
      }
    }
    updateCurrentProduct({
      ...currentEditingProduct,
      images: nextImages
    });
    if (activeMenuIndex === index) {
      setActiveMenuIndex(null);
    }
    onShowToast('Media deleted from gallery.');
  };

  // Reorder Media in Gallery: Move LEFT
  const handleMoveMediaLeft = (index: number) => {
    if (!currentEditingProduct || index === 0) return;
    const items = [...currentEditingProduct.images];
    const temp = items[index];
    items[index] = items[index - 1];
    items[index - 1] = temp;
    updateCurrentProduct({
      ...currentEditingProduct,
      images: items
    });
    onShowToast(`Media order updated: "${temp.name || 'Item'}" moved left.`);
  };

  // Reorder Media in Gallery: Move RIGHT
  const handleMoveMediaRight = (index: number) => {
    if (!currentEditingProduct || index === currentEditingProduct.images.length - 1) return;
    const items = [...currentEditingProduct.images];
    const temp = items[index];
    items[index] = items[index + 1];
    items[index + 1] = temp;
    updateCurrentProduct({
      ...currentEditingProduct,
      images: items
    });
    onShowToast(`Media order updated: "${temp.name || 'Item'}" moved right.`);
  };

  // Update Media Details (Caption / Alt Text / Type - Bilingual)
  const handleUpdateMediaItem = (
    index: number,
    field: 'name' | 'nameZh' | 'altText' | 'altTextZh' | 'type' | 'url',
    value: string
  ) => {
    if (!currentEditingProduct) return;
    const nextImages = currentEditingProduct.images.map((im, i) =>
      i === index ? { ...im, [field]: value } : im
    );
    updateCurrentProduct({
      ...currentEditingProduct,
      images: nextImages
    });
  };

  // File Upload Handler (Image or Video) with Security Best Practices
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentEditingProduct) return;

    // Security Check 1: Max Media Count Limit
    if (currentEditingProduct.images.length >= MAX_MEDIA_ITEMS) {
      onShowToast(`Upload blocked: Maximum limit of ${MAX_MEDIA_ITEMS} media items reached.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const isVideo = file.type.toLowerCase().startsWith('video/');
    const maxLimit = isVideo ? MAX_VIDEO_SIZE_BYTES : MAX_FILE_SIZE_BYTES;
    const maxLimitMb = isVideo ? 50 : 5;

    // Security Check 2: Max File Size Limit (5MB for images, 50MB for videos)
    if (file.size > maxLimit) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      onShowToast(
        `Upload blocked: ${isVideo ? 'Video' : 'Image'} size (${sizeMb} MB) exceeds maximum security limit of ${maxLimitMb} MB.`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Security Check 3: File Type Whitelist (Block SVG XSS, executables, scripts)
    const fileMime = file.type.toLowerCase();
    if (!ALLOWED_MEDIA_TYPES.includes(fileMime)) {
      onShowToast(
        `Upload blocked: File format "${file.type || 'unknown'}" is not supported. Use JPG, PNG, WEBP, or MP4/WEBM.`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const localUrl = URL.createObjectURL(file);
    const fileNameClean = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const isZh = contentLanguage === 'zh';

    const defaultEnName = fileNameClean || (isVideo ? 'Product Demo Video' : `Product Photo ${currentEditingProduct.images.length + 1}`);
    const defaultEnAlt = `${currentEditingProduct.name} - ${fileNameClean || (isVideo ? 'Video demonstration' : 'Product photo')}`;

    const newMedia: ProductMediaItem = {
      url: localUrl,
      type: isVideo ? 'video' : 'image',
      isPrimary: !isVideo && !currentEditingProduct.images.some((im) => im.isPrimary),
      name: isZh ? (newMediaCaption.trim() || defaultEnName) : (newMediaCaption.trim() || defaultEnName),
      nameZh: isZh ? newMediaCaption.trim() : undefined,
      altText: isZh ? (newMediaAltText.trim() || defaultEnAlt) : (newMediaAltText.trim() || defaultEnAlt),
      altTextZh: isZh ? newMediaAltText.trim() : undefined
    };

    updateCurrentProduct({
      ...currentEditingProduct,
      images: [...currentEditingProduct.images, newMedia]
    });

    setNewMediaCaption('');
    setNewMediaAltText('');
    setShowSeoAltInput(false);
    onShowToast(`Uploaded ${isVideo ? 'video' : 'image'}: "${newMedia.name}" (1:1 square ratio).`);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Add Media by URL with Validation
  const handleAddMedia = () => {
    if (!currentEditingProduct) return;
    const targetUrl = newMediaUrl.trim();
    if (!targetUrl) return;

    // Security Check 1: Max Media Count Limit
    if (currentEditingProduct.images.length >= MAX_MEDIA_ITEMS) {
      onShowToast(`Cannot add media: Maximum limit of ${MAX_MEDIA_ITEMS} media items reached.`);
      return;
    }

    // Security Check 2: Safe URL Protocol (Block javascript: and data: text vectors)
    if (!targetUrl.startsWith('https://') && !targetUrl.startsWith('http://') && !targetUrl.startsWith('/')) {
      onShowToast('Security warning: Only secure http(s):// or local relative image URLs are allowed.');
      return;
    }

    const detectedType =
      targetUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) ? 'video' : 'image';
    const isZh = contentLanguage === 'zh';
    const defaultEnCaption = detectedType === 'video' ? 'Product Demo Video' : `Product Photo ${currentEditingProduct.images.length + 1}`;
    const defaultEnAlt = `${currentEditingProduct.name} - ${defaultEnCaption}`;

    const newMedia: ProductMediaItem = {
      url: targetUrl,
      type: detectedType,
      isPrimary: detectedType !== 'video' && !currentEditingProduct.images.some((im) => im.isPrimary),
      name: isZh ? (newMediaCaption.trim() || defaultEnCaption) : (newMediaCaption.trim() || defaultEnCaption),
      nameZh: isZh ? newMediaCaption.trim() : undefined,
      altText: isZh ? (newMediaAltText.trim() || defaultEnAlt) : (newMediaAltText.trim() || defaultEnAlt),
      altTextZh: isZh ? newMediaAltText.trim() : undefined
    };

    updateCurrentProduct({
      ...currentEditingProduct,
      images: [...currentEditingProduct.images, newMedia]
    });

    setNewMediaUrl('');
    setNewMediaCaption('');
    setNewMediaAltText('');
    setShowSeoAltInput(false);
    onShowToast(`Added new ${detectedType} to gallery: "${newMedia.name}".`);
  };

  // Variant Image Selection Handlers
  const handleSetVariantImage = (variantId: string, imageUrl: string) => {
    if (!currentEditingProduct) return;
    const updatedVariants = currentEditingProduct.variants.map((v) =>
      v.id === variantId ? { ...v, imageUrl } : v
    );
    updateCurrentProduct({
      ...currentEditingProduct,
      variants: updatedVariants
    });
    setPickingVariantImageId(null);
    onShowToast('Variant image updated.');
  };

  const handleVariantFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentEditingProduct || !pickingVariantImageId) return;

    // Security Check: File Size Limit (5MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      onShowToast('Upload blocked: Variant image exceeds maximum security limit of 5 MB.');
      if (variantFileInputRef.current) variantFileInputRef.current.value = '';
      return;
    }

    // Security Check: Whitelist Allowed Image Types
    if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
      onShowToast('Upload blocked: Only JPEG, PNG, and WEBP formats are allowed for variant photos.');
      if (variantFileInputRef.current) variantFileInputRef.current.value = '';
      return;
    }

    const localUrl = URL.createObjectURL(file);
    handleSetVariantImage(pickingVariantImageId, localUrl);
    if (variantFileInputRef.current) variantFileInputRef.current.value = '';
  };

  // Variants & Stock Handlers
  const handleAddVariant = () => {
    if (!currentEditingProduct) return;
    const newVar: ProductVariant = {
      id: 'var-' + Date.now(),
      name: 'Additional Option',
      nameZh: '新增規格選項',
      sku: `${currentEditingProduct.sku}-V${currentEditingProduct.variants.length + 1}`,
      price: currentEditingProduct.basePrice,
      originalPrice: currentEditingProduct.originalPrice,
      stock: 20,
      imageUrl: currentEditingProduct.images[0]?.url || '/images/product.webp'
    };
    const updatedVariants = [...currentEditingProduct.variants, newVar];
    const updatedStock = updatedVariants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0);
    updateCurrentProduct({
      ...currentEditingProduct,
      variants: updatedVariants,
      totalStock: updatedStock
    });
    onShowToast('New variant added.');
  };

  const handleDeleteVariant = (varId: string) => {
    if (!currentEditingProduct) return;
    if (currentEditingProduct.variants[0]?.id === varId) {
      onShowToast('Default master variant represents the core product and cannot be deleted.');
      return;
    }
    const updatedVariants = currentEditingProduct.variants.filter((item) => item.id !== varId);
    const updatedStock =
      updatedVariants.length > 0
        ? updatedVariants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)
        : currentEditingProduct.totalStock || 0;
    updateCurrentProduct({
      ...currentEditingProduct,
      variants: updatedVariants,
      totalStock: updatedStock
    });
    onShowToast('Variant removed.');
  };

  const handleUpdateVariantField = (
    varId: string,
    field: 'name' | 'nameZh' | 'sku' | 'price' | 'originalPrice' | 'stock',
    value: string | number | undefined
  ) => {
    if (!currentEditingProduct) return;
    const isDefaultVariant = currentEditingProduct.variants[0]?.id === varId;

    const updatedVariants = currentEditingProduct.variants.map((v) => {
      if (v.id === varId) {
        return { ...v, [field]: value };
      }
      return v;
    });
    const updatedStock = updatedVariants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0);

    let updatedBasePrice = currentEditingProduct.basePrice;
    let updatedOriginalPrice = currentEditingProduct.originalPrice;
    let updatedSku = currentEditingProduct.sku;

    // Two-way synchronization: Default Master Variant (row 0) syncs with Master Product fields
    if (isDefaultVariant) {
      if (field === 'price') {
        updatedBasePrice = Number(value) || 0;
      } else if (field === 'originalPrice') {
        updatedOriginalPrice = value === '' || value === undefined ? undefined : Number(value);
      } else if (field === 'sku') {
        updatedSku = String(value || '');
      }
    }

    updateCurrentProduct({
      ...currentEditingProduct,
      basePrice: updatedBasePrice,
      originalPrice: updatedOriginalPrice,
      sku: updatedSku,
      variants: updatedVariants,
      totalStock: updatedStock
    });
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
    const newId = 'acc-' + Date.now();
    const newSortOrder = currentEditingProduct.accordions.length + 1;
    const newItem: PDPAccordionItem = {
      id: newId,
      title: 'ACCORDION TAB #' + newSortOrder,
      sortOrder: newSortOrder,
      blocks: [
        {
          id: 'blk-' + Date.now(),
          type: 'rich_text',
          title: 'OVERVIEW',
          content: 'Enter detailed clinical information, usage steps, or reference links here...'
        }
      ]
    };

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: [...currentEditingProduct.accordions, newItem]
    });
    setExpandedAccordions((prev) => ({ ...prev, [newId]: true }));
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

  // Accordion Content Blocks Handlers
  const handleAddBlockToAccordion = (accId: string, type: 'rich_text' | 'table') => {
    if (!currentEditingProduct) return;
    const newBlock: AccordionContentBlock =
      type === 'rich_text'
        ? {
            id: 'blk-' + Date.now(),
            type: 'rich_text',
            title: 'SECTION OVERVIEW',
            content: 'Enter detailed clinical information, usage steps, or guidelines here...'
          }
        : {
            id: 'blk-' + Date.now(),
            type: 'table',
            title: 'SPECIFICATIONS',
            tableRows: [
              { key: 'Product Name', value: currentEditingProduct.name },
              { key: 'Application', value: 'At-Home Feline Urine Collection & Health Monitoring' },
              { key: 'Litter Material', value: '100% Non-Absorbent, Non-Toxic Granules' }
            ]
          };

    const updatedAccordions = currentEditingProduct.accordions.map((acc) => {
      if (acc.id === accId) {
        const blocks = acc.blocks || [];
        return { ...acc, blocks: [...blocks, newBlock] };
      }
      return acc;
    });

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: updatedAccordions
    });
    onShowToast(`Added new ${type === 'rich_text' ? 'Rich Text' : 'Table Layout'} section.`);
  };

  const handleDeleteBlockFromAccordion = (accId: string, blockId: string) => {
    if (!currentEditingProduct) return;
    const updatedAccordions = currentEditingProduct.accordions.map((acc) => {
      if (acc.id === accId) {
        return {
          ...acc,
          blocks: (acc.blocks || []).filter((b) => b.id !== blockId)
        };
      }
      return acc;
    });

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: updatedAccordions
    });
    onShowToast('Content section removed.');
  };

  const handleMoveBlockInAccordion = (
    accId: string,
    blockIndex: number,
    direction: 'up' | 'down'
  ) => {
    if (!currentEditingProduct) return;
    const updatedAccordions = currentEditingProduct.accordions.map((acc) => {
      if (acc.id === accId) {
        const blocks = [...(acc.blocks || [])];
        const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
        if (targetIndex < 0 || targetIndex >= blocks.length) return acc;
        const temp = blocks[blockIndex];
        blocks[blockIndex] = blocks[targetIndex];
        blocks[targetIndex] = temp;
        return { ...acc, blocks };
      }
      return acc;
    });

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: updatedAccordions
    });
  };

  const handleUpdateBlockField = (
    accId: string,
    blockId: string,
    field: 'title' | 'titleZh' | 'content' | 'contentZh' | 'type',
    value: any
  ) => {
    if (!currentEditingProduct) return;
    const updatedAccordions: PDPAccordionItem[] = currentEditingProduct.accordions.map((acc) => {
      if (acc.id === accId) {
        const nextBlocks: AccordionContentBlock[] = (acc.blocks || []).map((b) => {
          if (b.id === blockId) {
            if (field === 'type' && value === 'table' && (!b.tableRows || b.tableRows.length === 0)) {
              return {
                ...b,
                type: 'table' as const,
                tableRows: [
                  {
                    key: 'Product Name',
                    keyZh: '商品名稱',
                    value: currentEditingProduct.name,
                    valueZh: currentEditingProduct.nameZh || currentEditingProduct.name
                  },
                  {
                    key: 'Application',
                    keyZh: '適用用途',
                    value: 'At-Home Feline Health Monitoring',
                    valueZh: '居家貓咪健康監測與尿液採樣'
                  }
                ]
              };
            }
            return { ...b, [field]: value } as AccordionContentBlock;
          }
          return b;
        });
        return {
          ...acc,
          blocks: nextBlocks
        };
      }
      return acc;
    });

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: updatedAccordions
    });
  };

  const handleAddTableRow = (accId: string, blockId: string) => {
    if (!currentEditingProduct) return;
    const updatedAccordions = currentEditingProduct.accordions.map((acc) => {
      if (acc.id === accId) {
        return {
          ...acc,
          blocks: (acc.blocks || []).map((b) => {
            if (b.id === blockId) {
              const rows = b.tableRows || [];
              return {
                ...b,
                tableRows: [...rows, { key: '', value: '' }]
              };
            }
            return b;
          })
        };
      }
      return acc;
    });

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: updatedAccordions
    });
  };

  const handleUpdateTableRow = (
    accId: string,
    blockId: string,
    rowIndex: number,
    field: 'key' | 'keyZh' | 'value' | 'valueZh',
    val: string
  ) => {
    if (!currentEditingProduct) return;
    const updatedAccordions = currentEditingProduct.accordions.map((acc) => {
      if (acc.id === accId) {
        return {
          ...acc,
          blocks: (acc.blocks || []).map((b) => {
            if (b.id === blockId) {
              const rows = [...(b.tableRows || [])];
              if (rows[rowIndex]) {
                rows[rowIndex] = { ...rows[rowIndex], [field]: val };
              }
              return { ...b, tableRows: rows };
            }
            return b;
          })
        };
      }
      return acc;
    });

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: updatedAccordions
    });
  };

  const handleDeleteTableRow = (accId: string, blockId: string, rowIndex: number) => {
    if (!currentEditingProduct) return;
    const updatedAccordions = currentEditingProduct.accordions.map((acc) => {
      if (acc.id === accId) {
        return {
          ...acc,
          blocks: (acc.blocks || []).map((b) => {
            if (b.id === blockId) {
              const rows = (b.tableRows || []).filter((_, i) => i !== rowIndex);
              return { ...b, tableRows: rows };
            }
            return b;
          })
        };
      }
      return acc;
    });

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: updatedAccordions
    });
  };


  const handleInsertFormatting = (
    accId: string,
    blockId: string,
    formatType: 'bold' | 'italic' | 'underline' | 'bullet' | 'number' | 'quote'
  ) => {
    if (!currentEditingProduct) return;
    const isZh = contentLanguage === 'zh';
    const updatedAccordions = currentEditingProduct.accordions.map((acc) => {
      if (acc.id === accId) {
        return {
          ...acc,
          blocks: (acc.blocks || []).map((b) => {
            if (b.id === blockId) {
              const currentContent = (isZh ? b.contentZh : b.content) || '';
              let addition = '';
              if (formatType === 'bold') addition = isZh ? ' **重點粗體文字** ' : ' **Bold highlight** ';
              if (formatType === 'italic') addition = isZh ? ' *斜體文字* ' : ' *Italic text* ';
              if (formatType === 'underline') addition = isZh ? ' <u>底線文字</u> ' : ' <u>Underlined text</u> ';
              if (formatType === 'bullet') addition = isZh ? '\n• 重點說明項目' : '\n• Feature point';
              if (formatType === 'number') addition = isZh ? '\n1. 第一步驟' : '\n1. First step';
              if (formatType === 'quote') addition = isZh ? '\n> 臨床備註說明：' : '\n> Clinical note: ';
              return {
                ...b,
                [isZh ? 'contentZh' : 'content']: currentContent + addition
              };
            }
            return b;
          })
        };
      }
      return acc;
    });

    updateCurrentProduct({
      ...currentEditingProduct,
      accordions: updatedAccordions
    });
  };

  // Restock simulation for inventory
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
      name: 'New CAT LAB+ Product (Click to edit)',
      sku: newSku,
      category: 'Diagnostic Kits',
      basePrice: 650,
      totalStock: 50,
      status: 'Draft',
      description: 'Add clinical descriptions and packaging contents.',
      images: [
        {
          url: '/images/product.webp',
          type: 'image',
          isPrimary: true,
          name: 'Default Cover',
          altText: 'New CAT LAB+ Product default cover photo'
        }
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
          stock: 50,
          imageUrl: '/images/product.webp'
        }
      ],
      accordions: [
        {
          id: 'acc-' + Date.now(),
          title: 'PRODUCT DETAILS & SPECIFICATIONS',
          sortOrder: 1,
          blocks: [
            {
              id: 'blk-' + Date.now(),
              type: 'rich_text',
              title: 'OVERVIEW',
              content: 'Add clinical descriptions and packaging contents.'
            },
            {
              id: 'blk-' + (Date.now() + 1),
              type: 'table',
              title: 'SPECIFICATIONS',
              tableRows: [
                { key: 'Product Name', value: 'New Diagnostic Item' },
                { key: 'Application', value: 'Feline Urinalysis & Health Monitoring' }
              ]
            }
          ]
        }
      ]
    };

    setProducts([newProduct, ...products]);
    setEditingProductId(newId);
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

  if (!editingProductId) {
    return (
      <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-7 animate-in fade-in duration-200">
        {/* ========================================================================= */}
        {/* HEADER: Strictly "Product Management" with NO SUBTITLE                   */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Product Management
              </h1>
              <AdminHelpIcon text="Catalog inventory management: product list, physical shipping dimensions, variants table with auto-stock deduction on Paid orders, and dynamic content accordion tab repeater." />
            </div>
          </div>

          {/* Global Action Button */}
          <button
            type="button"
            onClick={handleAddNewProduct}
            className="inline-flex items-center gap-2 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2.5 text-xs font-bold shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            <Plus className="h-4 w-4 text-yellow" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: PRODUCT LIST VIEW                                                 */}
        {/* ========================================================================= */}
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
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProductId(prod.id);
                              }}
                              className="h-12 w-12 rounded-xl border border-gray-200 bg-gray-50 p-1 flex items-center justify-center shrink-0 cursor-pointer hover:border-gray-400 hover:shadow-xs transition-all group overflow-hidden"
                              title={`Edit ${prod.name}`}
                            >
                              {primaryImg?.type === 'video' ? (
                                <div className="relative h-full w-full flex items-center justify-center bg-black rounded-lg">
                                  <video src={primaryImg.url} className="h-full w-full object-cover rounded-lg" muted />
                                  <Play className="h-3 w-3 text-white absolute fill-white" />
                                </div>
                              ) : (
                                <img
                                  src={primaryImg?.url || '/images/product.webp'}
                                  alt={prod.name}
                                  className="h-full w-full object-contain transition-transform group-hover:scale-105"
                                />
                              )}
                            </button>
                            <div className="min-w-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProductId(prod.id);
                                }}
                                className="text-left font-bold text-gray-900 text-xs sm:text-sm line-clamp-1 hover:text-charcoal hover:underline cursor-pointer transition-colors block"
                                title={`Edit ${prod.name}`}
                              >
                                {prod.name}
                              </button>
                              {prod.nameZh && (
                                <p className="text-[11px] font-medium text-gray-500 line-clamp-1">
                                  {prod.nameZh}
                                </p>
                              )}
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                {prod.variants.length} Variants • {prod.accordions.length} Content Accordions
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

                        <td className="py-4 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold border select-none ${
                              prod.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                                : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                          >
                            {prod.status}
                          </span>
                        </td>

                        <td className="py-4 pr-6 pl-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <AdminTooltip content="Edit physical specifications, images, variants, and content accordions">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProductId(prod.id);
                                }}
                                aria-label="Edit Details"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer shadow-2xs"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
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
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: PRODUCT DETAIL / EDITOR VIEW (UNIFIED 2-COLUMN LAYOUT)
  // =========================================================================
  if (!currentEditingProduct) return null;

  const totalStockSynced = currentEditingProduct.variants.reduce(
    (acc, v) => acc + (Number(v.stock) || 0),
    0
  );
  const accumulatedDim =
    (Number(currentEditingProduct.lengthCm) || 0) +
    (Number(currentEditingProduct.widthCm) || 0) +
    (Number(currentEditingProduct.heightCm) || 0);
  const volumetricWeight = (
    ((Number(currentEditingProduct.lengthCm) || 0) *
      (Number(currentEditingProduct.widthCm) || 0) *
      (Number(currentEditingProduct.heightCm) || 0)) /
    6000
  ).toFixed(2);
  const maxSide = Math.max(
    Number(currentEditingProduct.lengthCm) || 0,
    Number(currentEditingProduct.widthCm) || 0,
    Number(currentEditingProduct.heightCm) || 0
  );
  const isCvsEligible =
    accumulatedDim <= 105 &&
    maxSide <= 45 &&
    (Number(currentEditingProduct.weightGram) || 0) <= 5000;

  return (
    <div className="min-h-screen pb-16 animate-in fade-in duration-200">
      {/* Sticky Floating Full-Bleed Top Header Navigation & Action Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-2xs w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditingProductId(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group transition-colors py-1.5 px-2.5 rounded-xl hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Products List</span>
            </button>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                {currentEditingProduct.sku}
              </span>
              <span
                className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold border ${
                  currentEditingProduct.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                    : 'bg-gray-100 text-gray-600 border-gray-300'
                }`}
              >
                {currentEditingProduct.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={!isProductDirty}
              onClick={() => {
                if (!isProductDirty) return;
                if (!currentEditingProduct.name.trim()) {
                  onShowToast('Validation error: Product Title is required.');
                  setActiveDetailTab('general');
                  return;
                }
                if (!currentEditingProduct.category.trim()) {
                  onShowToast('Validation error: Category is required.');
                  setActiveDetailTab('general');
                  return;
                }
                if (!currentEditingProduct.sku.trim()) {
                  onShowToast('Validation error: Master SKU is required.');
                  setActiveDetailTab('general');
                  return;
                }
                if (!currentEditingProduct.basePrice || currentEditingProduct.basePrice <= 0) {
                  onShowToast('Validation error: Base Price (Sale Price) is required and must be greater than 0.');
                  return;
                }
                if (!currentEditingProduct.weightGram || currentEditingProduct.weightGram <= 0) {
                  onShowToast('Validation error: Shipping Weight in grams is required.');
                  return;
                }
                if (
                  !currentEditingProduct.lengthCm ||
                  !currentEditingProduct.widthCm ||
                  !currentEditingProduct.heightCm ||
                  currentEditingProduct.lengthCm <= 0 ||
                  currentEditingProduct.widthCm <= 0 ||
                  currentEditingProduct.heightCm <= 0
                ) {
                  onShowToast('Validation error: Shipping Dimensions (L × W × H) are required.');
                  return;
                }
                if (!currentEditingProduct.images || currentEditingProduct.images.length === 0) {
                  onShowToast('Validation error: Media Gallery requires at least 1 image or video.');
                  setActiveDetailTab('media');
                  return;
                }
                onShowToast(`All changes for ${currentEditingProduct.sku} saved successfully.`);
                setInitialProductSnapshot(JSON.stringify(currentEditingProduct));
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                isProductDirty
                  ? 'bg-yellow hover:bg-yellow/90 text-charcoal shadow-xs cursor-pointer active:scale-[0.99]'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              <Save className={`h-4 w-4 ${isProductDirty ? 'text-charcoal' : 'text-gray-400'}`} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Full-Bleed Tabs Navigation Bar */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex flex-wrap items-center p-1 rounded-2xl bg-gray-100/90 border border-gray-200 shadow-2xs gap-1">
            <button
              type="button"
              onClick={() => setActiveDetailTab('general')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDetailTab === 'general'
                  ? 'bg-white text-gray-900 font-bold shadow-xs border border-gray-200/80'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-white/50 border border-transparent'
              }`}
            >
              <FileText className={`h-4 w-4 ${activeDetailTab === 'general' ? 'text-charcoal' : 'text-gray-400'}`} />
              <span>General Info</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDetailTab('media')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDetailTab === 'media'
                  ? 'bg-white text-gray-900 font-bold shadow-xs border border-gray-200/80'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-white/50 border border-transparent'
              }`}
            >
              <ImageIcon className={`h-4 w-4 ${activeDetailTab === 'media' ? 'text-charcoal' : 'text-gray-400'}`} />
              <span>Media Gallery</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDetailTab('variants')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDetailTab === 'variants'
                  ? 'bg-white text-gray-900 font-bold shadow-xs border border-gray-200/80'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-white/50 border border-transparent'
              }`}
            >
              <Layers className={`h-4 w-4 ${activeDetailTab === 'variants' ? 'text-charcoal' : 'text-gray-400'}`} />
              <span>Product Variants</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDetailTab('accordions')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDetailTab === 'accordions'
                  ? 'bg-white text-gray-900 font-bold shadow-xs border border-gray-200/80'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-white/50 border border-transparent'
              }`}
            >
              <List className={`h-4 w-4 ${activeDetailTab === 'accordions' ? 'text-charcoal' : 'text-gray-400'}`} />
              <span>Content Accordions</span>
            </button>
          </div>

          {/* Storefront Content Language Switcher (Customer-Facing Translation) */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <div className="hidden sm:flex items-center gap-1.5 text-gray-500">
              <Globe className="h-3.5 w-3.5 text-charcoal/70" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-700">
                Content:
              </span>
              <AdminHelpIcon text="Switch which language version of this product content you are editing (for customer PDP view). This does NOT change the Admin Panel interface language (which is managed separately in the left sidebar)." />
            </div>

            <div className="inline-flex items-center p-1 rounded-2xl bg-gray-100/90 border border-gray-200 shadow-2xs gap-1">
              <button
                type="button"
                onClick={() => setContentLanguage('zh')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentLanguage === 'zh'
                    ? 'bg-white text-gray-900 shadow-xs border border-gray-200/80 ring-1 ring-black/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50 border border-transparent'
                }`}
                title="Edit customer-facing product content in Traditional Chinese (Default Storefront Locale)"
              >
                <span>🇹🇼</span>
                <span>繁體中文</span>
                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                  contentLanguage === 'zh'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-200/80 text-gray-500'
                }`}>
                  Default
                </span>
              </button>

              <button
                type="button"
                onClick={() => setContentLanguage('en')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentLanguage === 'en'
                    ? 'bg-white text-gray-900 shadow-xs border border-gray-200/80 ring-1 ring-black/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50 border border-transparent'
                }`}
                title="Edit customer-facing product content in English (Storefront Translation)"
              >
                <span>🇺🇸</span>
                <span>English</span>
                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                  contentLanguage === 'en'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-200/80 text-gray-400'
                }`}>
                  EN
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Body with standard padding */}
      <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-6">
        {/* 2-Column Unified Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* ================================================================= */}
                {/* LEFT COLUMN: Main Product Details (8 Cols - Floating Sticky)     */}
                {/* ================================================================= */}
                <div className="lg:col-span-8 space-y-6 lg:sticky lg:top-36 self-start">
                  {/* TAB 1: GENERAL INFORMATION */}
                  {activeDetailTab === 'general' && (
                    <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-gray-900">General Information</h3>
                          <AdminHelpIcon text="Primary catalog listing information, category classification, and master SKU." />
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Basic product identifiers displayed to customers in the catalog.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                            Product Title <span className="text-rose-500">*</span>
                          </label>
                          <span
                            className={`text-[11px] font-mono font-medium ${
                              (contentLanguage === 'en' ? currentEditingProduct.name.length : (currentEditingProduct.nameZh || '').length) >= MAX_PRODUCT_TITLE_LENGTH
                                ? 'text-rose-600 font-bold'
                                : 'text-gray-400'
                            }`}
                          >
                            {contentLanguage === 'en' ? currentEditingProduct.name.length : (currentEditingProduct.nameZh || '').length} / {MAX_PRODUCT_TITLE_LENGTH} characters
                          </span>
                        </div>
                        <input
                          type="text"
                          maxLength={MAX_PRODUCT_TITLE_LENGTH}
                          value={contentLanguage === 'en' ? currentEditingProduct.name : (currentEditingProduct.nameZh || '')}
                          onChange={(e) =>
                            updateCurrentProduct({
                              ...currentEditingProduct,
                              ...(contentLanguage === 'en' ? { name: e.target.value } : { nameZh: e.target.value })
                            })
                          }
                          placeholder={
                            contentLanguage === 'en'
                              ? `e.g. CAT LAB+ Hydrophobic Cat Litter Kit (ZH: ${currentEditingProduct.nameZh || '...'})`
                              : '例如: CAT LAB+ 貓咪專用疏水貓砂採樣檢測組'
                          }
                          className="w-full h-11 rounded-xl border border-gray-300 bg-white px-3.5 text-xs sm:text-sm font-bold text-gray-900 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none transition-all"
                        />
                        {contentLanguage === 'en' && currentEditingProduct.nameZh && (
                          <p className="mt-1.5 text-[11px] text-gray-500 flex items-center gap-1.5">
                            <span className="font-bold text-gray-400 uppercase tracking-wide text-[10px]">繁中正體原文 (Default):</span>
                            <span className="italic text-gray-800 font-semibold">"{currentEditingProduct.nameZh}"</span>
                          </p>
                        )}
                        {contentLanguage === 'zh' && currentEditingProduct.name && (
                          <p className="mt-1.5 text-[11px] text-gray-500 flex items-center gap-1.5">
                            <span className="font-bold text-gray-400 uppercase tracking-wide text-[10px]">EN Translation:</span>
                            <span className="italic text-gray-600 font-medium">"{currentEditingProduct.name}"</span>
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                              Category <span className="text-rose-500">*</span>
                            </label>
                            {!isAddingCustomCategory ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setIsAddingCustomCategory(true);
                                  setNewCategoryName('');
                                }}
                                className="text-[11px] font-bold text-charcoal hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="h-3 w-3 text-yellow" />
                                <span>Add Custom</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setIsAddingCustomCategory(false)}
                                className="text-[11px] font-semibold text-gray-400 hover:text-gray-700 cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>

                          {!isAddingCustomCategory ? (
                            <select
                              value={currentEditingProduct.category}
                              onChange={(e) => {
                                if (e.target.value === '__add_new__') {
                                  setIsAddingCustomCategory(true);
                                  setNewCategoryName('');
                                } else {
                                  updateCurrentProduct({
                                    ...currentEditingProduct,
                                    category: e.target.value
                                  });
                                }
                              }}
                              className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm font-semibold text-gray-800 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none cursor-pointer"
                            >
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                              <option value="__add_new__">+ Add Custom Category...</option>
                            </select>
                          ) : (
                            <div className="flex items-center gap-1.5 animate-in fade-in-50 duration-150">
                              <input
                                type="text"
                                autoFocus
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSaveCustomCategory();
                                  } else if (e.key === 'Escape') {
                                    setIsAddingCustomCategory(false);
                                  }
                                }}
                                placeholder="Enter category name..."
                                className="flex-1 h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none"
                              />
                              <button
                                type="button"
                                disabled={!newCategoryName.trim()}
                                onClick={handleSaveCustomCategory}
                                className="h-10 px-3 rounded-xl bg-charcoal hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                <Check className="h-3.5 w-3.5 text-yellow" />
                                <span>Save</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsAddingCustomCategory(false)}
                                className="h-10 px-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-600 text-xs font-semibold transition-all cursor-pointer shrink-0"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                            Master SKU <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={currentEditingProduct.sku}
                            onChange={(e) => {
                              const newSku = e.target.value;
                              const updatedVariants = currentEditingProduct.variants.map((v, idx) =>
                                idx === 0 ? { ...v, sku: newSku } : v
                              );
                              updateCurrentProduct({
                                ...currentEditingProduct,
                                sku: newSku,
                                variants: updatedVariants
                              });
                            }}
                            placeholder="e.g. CLP-KIT-01"
                            className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-mono text-xs sm:text-sm font-bold text-gray-800 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                            Short Description / Summary
                          </label>
                        </div>
                        <textarea
                          rows={3}
                          value={contentLanguage === 'en' ? (currentEditingProduct.description || '') : (currentEditingProduct.descriptionZh || '')}
                          onChange={(e) =>
                            updateCurrentProduct({
                              ...currentEditingProduct,
                              ...(contentLanguage === 'en' ? { description: e.target.value } : { descriptionZh: e.target.value })
                            })
                          }
                          placeholder={
                            contentLanguage === 'en'
                              ? 'Provide a concise clinical summary of the product for storefront listing cards and search previews...'
                              : '請輸入繁體中文產品簡述，用於商店卡片與搜尋預覽...'
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-xs sm:text-sm text-gray-800 leading-relaxed focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none transition-all"
                        />
                        {contentLanguage === 'en' && currentEditingProduct.descriptionZh && (
                          <div className="mt-2 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 text-[11px] text-gray-600 space-y-1">
                            <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider block">
                              繁中正體原文 (Storefront Default):
                            </span>
                            <p className="italic text-gray-700 leading-relaxed line-clamp-3">
                              {currentEditingProduct.descriptionZh}
                            </p>
                          </div>
                        )}
                        {contentLanguage === 'zh' && currentEditingProduct.description && (
                          <div className="mt-2 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 text-[11px] text-gray-600 space-y-1">
                            <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider block">
                              English Reference Translation:
                            </span>
                            <p className="italic text-gray-700 leading-relaxed line-clamp-3">
                              {currentEditingProduct.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Navigation footer */}
                    <div className="flex justify-end pt-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setActiveDetailTab('media')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group py-1.5 px-3 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <span>Next: Media Gallery</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: MEDIA GALLERY */}
                {activeDetailTab === 'media' && (
                  <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-gray-900">
                            Media Gallery <span className="text-rose-500">*</span>
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border transition-colors ${
                              currentEditingProduct.images.length >= MAX_MEDIA_ITEMS
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}
                          >
                            {currentEditingProduct.images.length} / {MAX_MEDIA_ITEMS} Media Items
                          </span>
                          <span className="rounded-md bg-yellow/20 text-charcoal border border-yellow/40 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                            1:1 Aspect Ratio
                          </span>
                          <AdminHelpIcon text="Images and videos are displayed in 1:1 square aspect ratio. Scroll horizontally to view all media. Maximum 10 media items. Images up to 5MB, videos up to 50MB. Supported formats: JPG, PNG, WEBP, MP4, WEBM." />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Product media strip (1:1 square ratio). Reorder items with ← and →, click to preview, or use the 3-dot menu.
                        </p>
                      </div>
                    </div>

                    {/* Horizontal Scrolling Media Track (1:1 Aspect Ratio) */}
                    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-thin snap-x">
                      {currentEditingProduct.images.map((media, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === currentEditingProduct.images.length - 1;
                        const isVideo = media.type === 'video';

                        return (
                          <div
                            key={idx}
                            className={`w-[22%] min-w-[160px] max-w-[195px] shrink-0 snap-start rounded-2xl border p-2 bg-white flex flex-col justify-between transition-all relative ${
                              media.isPrimary
                                ? 'border-charcoal ring-2 ring-yellow/50 shadow-xs'
                                : 'border-gray-200 hover:border-gray-300 shadow-2xs'
                            }`}
                          >
                            {/* 1:1 Aspect Ratio Media Container with Click-To-Preview */}
                            <div
                              onClick={() => setPreviewMedia(media)}
                              className="relative w-full aspect-square rounded-xl bg-gray-900/5 overflow-hidden flex items-center justify-center border border-gray-100 group/preview cursor-pointer"
                              title="Click to view full preview"
                            >
                              {isVideo ? (
                                <div className="relative w-full h-full bg-black flex items-center justify-center">
                                  <video
                                    src={media.url}
                                    className="w-full h-full object-cover"
                                    preload="metadata"
                                    muted
                                    playsInline
                                  />
                                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover/preview:bg-black/20 transition-colors pointer-events-none">
                                    <div className="h-9 w-9 rounded-full bg-white/95 text-charcoal flex items-center justify-center shadow-md">
                                      <Play className="h-4 w-4 fill-charcoal translate-x-0.5" />
                                    </div>
                                  </div>
                                  <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs pointer-events-none">
                                    <Video className="h-3 w-3 text-yellow" />
                                    <span>Video</span>
                                  </div>
                                </div>
                              ) : (
                                <img
                                  src={media.url}
                                  alt={media.altText || media.name}
                                  className="w-full h-full object-cover transition-transform group-hover/preview:scale-105"
                                />
                              )}

                              {/* Hover Hint: Click to preview */}
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 pointer-events-none">
                                <Eye className="h-4 w-4 text-yellow" />
                                <span>Preview</span>
                              </div>

                              {/* Primary Cover Badge (Top-Left) - Only for Images */}
                              {media.isPrimary && !isVideo && (
                                <div className="absolute top-2 left-2 z-10 bg-charcoal text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs pointer-events-none">
                                  <Star className="h-2.5 w-2.5 text-yellow fill-yellow" />
                                  <span>Cover</span>
                                </div>
                              )}

                              {/* Three-Dot Menu (Top-Right): Strictly Edit SEO Alt & Delete */}
                              <div className="absolute top-2 right-2 z-20">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuIndex(activeMenuIndex === idx ? null : idx);
                                  }}
                                  className="h-7 w-7 rounded-lg bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer shadow-xs"
                                  title="Media options"
                                >
                                  <MoreVertical className="h-3.5 w-3.5" />
                                </button>

                                {/* Dropdown Menu */}
                                {activeMenuIndex === idx && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-30"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenuIndex(null);
                                      }}
                                    />
                                    <div className="absolute right-0 top-8 z-40 w-44 rounded-xl border border-gray-200 bg-white p-1 shadow-lg text-xs space-y-0.5 animate-in fade-in-50 duration-100">
                                      {/* Set as Cover option in 3-dot menu */}
                                      {!isVideo && !media.isPrimary && (
                                        <>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveMenuIndex(null);
                                              handleSetPrimaryImage(idx);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 font-semibold cursor-pointer"
                                          >
                                            <Star className="h-3.5 w-3.5 text-yellow fill-yellow" />
                                            <span>Set as Cover</span>
                                          </button>
                                          <div className="border-t border-gray-100 my-1" />
                                        </>
                                      )}
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveMenuIndex(null);
                                          setEditingMediaItem({
                                            index: idx,
                                            name: media.name,
                                            nameZh: media.nameZh || '',
                                            altText: media.altText || '',
                                            altTextZh: media.altTextZh || ''
                                          });
                                          setMediaModalLang(contentLanguage);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 font-semibold cursor-pointer"
                                      >
                                        <Edit3 className="h-3.5 w-3.5 text-gray-500" />
                                        <span>Edit Caption &amp; Alt Text</span>
                                      </button>
                                      <div className="border-t border-gray-100 my-1" />
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveMenuIndex(null);
                                          handleDeleteImage(idx);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span>Delete</span>
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Media Caption & Alt Text Display */}
                            <div className="mt-2 px-1">
                              <p className="text-xs font-bold text-gray-800 truncate" title={contentLanguage === 'zh' ? (media.nameZh || media.name) : media.name}>
                                {contentLanguage === 'zh' ? (
                                  media.nameZh ? (
                                    media.nameZh
                                  ) : (
                                    <span className="text-gray-400 font-normal italic">{media.name} (EN)</span>
                                  )
                                ) : (
                                  media.name
                                )}
                              </p>
                              {(media.altText || media.altTextZh) && (
                                <p className="text-[10px] text-gray-400 truncate mt-0.5" title={contentLanguage === 'zh' ? (media.altTextZh || media.altText) : media.altText}>
                                  <span className="font-semibold text-gray-400">Alt:</span> {contentLanguage === 'zh' ? (media.altTextZh || media.altText) : media.altText}
                                </p>
                              )}
                            </div>

                            {/* Compact Card Footer: Reorder Arrows (Left & Right) & Index */}
                            <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                              {/* Left & Right Reorder Arrows */}
                              <div className="flex items-center gap-1.5">
                                <AdminTooltip content={isFirst ? 'First position' : 'Move left'}>
                                  <button
                                    type="button"
                                    disabled={isFirst}
                                    onClick={() => handleMoveMediaLeft(idx)}
                                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                                    aria-label="Move media left"
                                  >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                  </button>
                                </AdminTooltip>

                                <AdminTooltip content={isLast ? 'Last position' : 'Move right'}>
                                  <button
                                    type="button"
                                    disabled={isLast}
                                    onClick={() => handleMoveMediaRight(idx)}
                                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                                    aria-label="Move media right"
                                  >
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </button>
                                </AdminTooltip>
                              </div>

                              <span className="text-[10px] font-mono font-bold text-gray-400">
                                #{idx + 1}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Streamlined Add Media Box (Upload File or URL + Optional SEO Alt Text Toggle) */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                          Add Media (Image or Video)
                        </span>
                      </div>

                      {/* Hidden File Input for Upload with Security MIME Restrictions */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      {/* Upload Limit Notice when Reached */}
                      {currentEditingProduct.images.length >= MAX_MEDIA_ITEMS && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-2.5 text-xs text-amber-800 font-semibold flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                          <span>Maximum media capacity reached (10/10 items). Delete an existing item to upload a new one.</span>
                        </div>
                      )}

                      {/* Unified Upload & URL Input Row */}
                      <div className="space-y-1.5">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                          <button
                            type="button"
                            disabled={currentEditingProduct.images.length >= MAX_MEDIA_ITEMS}
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-gray-800 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-2xs shrink-0"
                          >
                            <Upload className="h-3.5 w-3.5 text-charcoal" />
                            <span>Upload from Device</span>
                          </button>

                          <span className="text-xs font-semibold text-gray-400 text-center sm:text-left">
                            or
                          </span>

                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="url"
                              value={newMediaUrl}
                              disabled={currentEditingProduct.images.length >= MAX_MEDIA_ITEMS}
                              onChange={(e) => setNewMediaUrl(e.target.value)}
                              placeholder="Paste direct image or video URL (https://...)..."
                              className="flex-1 h-10 rounded-xl border border-gray-300 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed px-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:border-charcoal focus:ring-1 focus:ring-charcoal outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddMedia()}
                              disabled={!newMediaUrl.trim() || currentEditingProduct.images.length >= MAX_MEDIA_ITEMS}
                              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-charcoal hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 text-xs font-bold transition-all cursor-pointer shrink-0"
                            >
                              <Plus className="h-3.5 w-3.5 text-yellow" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>

                        {/* Informative file size limit text directly below the button */}
                        <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium pl-0.5">
                          Max file size: Image up to 5MB (JPG, PNG, WebP) &bull; Video up to 50MB (MP4, WebM)
                        </p>
                      </div>

                      {/* Optional SEO Alt Text & Caption Toggle */}
                      {!showSeoAltInput ? (
                        <div>
                          <button
                            type="button"
                            onClick={() => setShowSeoAltInput(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group transition-colors"
                          >
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 group-hover:bg-yellow group-hover:text-charcoal text-[11px] font-extrabold transition-colors">
                              +
                            </span>
                            <span>Add Caption & SEO Alt Text (Optional)</span>
                          </button>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-gray-200 bg-white p-3.5 space-y-3 animate-in fade-in-50 duration-150">
                          <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                                Caption &amp; SEO Alt Settings
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                                {contentLanguage === 'en' ? '🇺🇸 English' : '🇹🇼 繁體中文'}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setShowSeoAltInput(false)}
                              className="text-xs text-gray-400 hover:text-gray-700 font-semibold cursor-pointer"
                            >
                              Hide
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                                Media Caption / Title ({contentLanguage === 'en' ? 'EN' : '繁中'})
                              </label>
                              <input
                                type="text"
                                value={newMediaCaption}
                                onChange={(e) => setNewMediaCaption(e.target.value)}
                                placeholder={
                                  contentLanguage === 'en'
                                    ? 'e.g. CAT LAB+ Hydrophobic Sand Kit'
                                    : '例如: CAT LAB+ 專利疏水砂示範套裝'
                                }
                                className="w-full h-9 rounded-lg border border-gray-300 bg-white px-2.5 text-xs text-gray-800 focus:border-charcoal outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                                SEO Alt Text ({contentLanguage === 'en' ? 'EN' : '繁中'})
                              </label>
                              <input
                                type="text"
                                value={newMediaAltText}
                                onChange={(e) => setNewMediaAltText(e.target.value)}
                                placeholder={
                                  contentLanguage === 'en'
                                    ? 'e.g. Non-absorbent veterinary urine collection sand'
                                    : '例如: 獸醫臨床專利疏水不吸水集尿砂'
                                }
                                className="w-full h-9 rounded-lg border border-gray-300 bg-white px-2.5 text-xs text-gray-800 focus:border-charcoal outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Navigation footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setActiveDetailTab('general')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group py-1.5 px-3 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back: General Info</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveDetailTab('variants')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group py-1.5 px-3 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <span>Next: Product Variants</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 4: CONTENT ACCORDIONS */}
                {activeDetailTab === 'accordions' && (
                  <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-gray-900">
                            Content Accordions
                          </h3>
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold text-gray-600">
                            {currentEditingProduct.accordions.length} Accordions
                          </span>
                          <AdminHelpIcon text="Configure collapsible content accordions on the storefront. Within each tab, you can add multiple content layout types: Rich Text and Table Layout specification columns." />
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Collapsible content accordion sections. Each accordion can contain multiple Rich Text blocks and two-column Table Layout specification sections.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddAccordion}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-charcoal hover:bg-black text-white px-3.5 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
                      >
                        <Plus className="h-3.5 w-3.5 text-yellow" />
                        <span>Add Content Accordion</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {currentEditingProduct.accordions.map((acc, index) => {
                        const isFirst = index === 0;
                        const isLast = index === currentEditingProduct.accordions.length - 1;
                        const isOpen = isAccordionOpen(acc.id, index);
                        const blocks = acc.blocks || [];

                        return (
                          <div
                            key={acc.id}
                            className={`rounded-2xl border transition-all ${
                              isOpen
                                ? 'border-gray-300 bg-gray-50/30 shadow-2xs'
                                : 'border-gray-200 bg-gray-50/10 hover:border-gray-300'
                            }`}
                          >
                            {/* Accordion Bar Header */}
                            <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div
                                onClick={() => toggleAccordion(acc.id, index)}
                                className="flex items-center gap-2.5 flex-1 cursor-pointer select-none"
                              >
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-charcoal text-white font-mono text-xs font-bold shrink-0">
                                  #{acc.sortOrder}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide truncate max-w-xs sm:max-w-md">
                                  {contentLanguage === 'en'
                                    ? (acc.title || 'Untitled Tab')
                                    : (acc.titleZh || acc.title || '未命名標籤 (Untitled)')}
                                </span>
                                <span className="rounded-md bg-gray-200/70 text-gray-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider shrink-0">
                                  {blocks.length} {blocks.length === 1 ? 'Section' : 'Sections'}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                                <AdminTooltip content={isFirst ? 'Top position' : 'Move tab up'}>
                                  <button
                                    type="button"
                                    disabled={isFirst}
                                    onClick={() => handleMoveUp(index)}
                                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                  >
                                    <ArrowUp className="h-3.5 w-3.5" />
                                  </button>
                                </AdminTooltip>

                                <AdminTooltip content={isLast ? 'Last position' : 'Move tab down'}>
                                  <button
                                    type="button"
                                    disabled={isLast}
                                    onClick={() => handleMoveDown(index)}
                                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                  >
                                    <ArrowDown className="h-3.5 w-3.5" />
                                  </button>
                                </AdminTooltip>

                                <AdminTooltip content="Delete this accordion tab">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAccordion(acc.id)}
                                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </AdminTooltip>

                                <button
                                  type="button"
                                  onClick={() => toggleAccordion(acc.id, index)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-900 transition-colors cursor-pointer ml-1"
                                >
                                  {isOpen ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Collapsible Content Body */}
                            {isOpen && (
                              <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-gray-200/80 space-y-4">
                                {/* Accordion Tab Title Setting (Bilingual) */}
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="block text-[11px] font-bold text-gray-600 uppercase">
                                      Accordion Tab Title
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    value={contentLanguage === 'en' ? acc.title : (acc.titleZh ?? '')}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      updateCurrentProduct({
                                        ...currentEditingProduct,
                                        accordions: currentEditingProduct.accordions.map((a) =>
                                          a.id === acc.id
                                            ? { ...a, [contentLanguage === 'zh' ? 'titleZh' : 'title']: val }
                                            : a
                                        )
                                      });
                                    }}
                                    placeholder={
                                      contentLanguage === 'en'
                                        ? `e.g. PRODUCT DETAILS & SPECIFICATIONS (ZH: ${acc.titleZh || '...'})`
                                        : '例如: 商品詳情與規格說明'
                                    }
                                    className="w-full h-9 rounded-lg border border-gray-300 bg-white px-3 font-bold text-xs sm:text-sm text-gray-900 focus:border-charcoal focus:ring-1 focus:ring-charcoal outline-none uppercase"
                                  />
                                  {contentLanguage === 'en' && acc.titleZh && (
                                    <p className="mt-1 text-[10px] text-gray-500">
                                      <span className="font-semibold text-gray-400">繁中正體原文 (Default):</span> "{acc.titleZh}"
                                    </p>
                                  )}
                                  {contentLanguage === 'zh' && acc.title && (
                                    <p className="mt-1 text-[10px] text-gray-500">
                                      <span className="font-semibold text-gray-400">EN Translation:</span> "{acc.title}"
                                    </p>
                                  )}
                                </div>

                                {/* Content Layout Blocks List */}
                                <div className="space-y-3.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider">
                                      Content Layout Sections ({blocks.length})
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                      Multiple sections per tab (Rich Text & Table Layout)
                                    </span>
                                  </div>

                                  {blocks.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center bg-white space-y-2">
                                      <p className="text-xs text-gray-500">
                                        No content sections added yet to this accordion tab.
                                      </p>
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => handleAddBlockToAccordion(acc.id, 'rich_text')}
                                          className="text-xs font-bold text-charcoal hover:underline"
                                        >
                                          + Add Rich Text
                                        </button>
                                        <span className="text-gray-300">•</span>
                                        <button
                                          type="button"
                                          onClick={() => handleAddBlockToAccordion(acc.id, 'table')}
                                          className="text-xs font-bold text-emerald-700 hover:underline"
                                        >
                                          + Add Table Layout
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    blocks.map((block, bIdx) => {
                                      const isFirstBlock = bIdx === 0;
                                      const isLastBlock = bIdx === blocks.length - 1;

                                      return (
                                        <div
                                          key={block.id}
                                          className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3 shadow-2xs"
                                        >
                                          {/* Block Header */}
                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-gray-100">
                                            <div className="flex items-center gap-2 flex-wrap">
                                              {/* Block Title Input (Bilingual) */}
                                              <div className="flex items-center gap-1.5">
                                                <input
                                                  type="text"
                                                  value={contentLanguage === 'en' ? block.title : (block.titleZh ?? '')}
                                                  onChange={(e) =>
                                                    handleUpdateBlockField(
                                                      acc.id,
                                                      block.id,
                                                      contentLanguage === 'zh' ? 'titleZh' : 'title',
                                                      e.target.value
                                                    )
                                                  }
                                                  placeholder={
                                                    contentLanguage === 'en'
                                                      ? (block.type === 'table' ? 'SPECIFICATIONS' : 'SECTION TITLE')
                                                      : (block.type === 'table' ? `規格說明 (EN: ${block.title})` : `章節標題 (EN: ${block.title})`)
                                                  }
                                                  className="h-8 rounded-lg border border-gray-300 bg-white px-2.5 text-xs font-bold uppercase text-gray-900 focus:border-charcoal outline-none w-52 sm:w-64"
                                                />
                                                <span className="text-[10px] font-bold text-gray-500 px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200">
                                                  {contentLanguage === 'en' ? 'EN' : '繁中'}
                                                </span>
                                              </div>

                                              {/* Type Pill Badge (Right of Title Input) */}
                                              {block.type === 'rich_text' ? (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-200/80 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                                                  <FileText className="h-3 w-3 text-blue-600" />
                                                  <span>Rich Text</span>
                                                </span>
                                              ) : (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                                                  <TableIcon className="h-3 w-3 text-emerald-600" />
                                                  <span>Table Layout</span>
                                                </span>
                                              )}
                                            </div>

                                            {/* Block Actions: Move Up, Move Down, Delete */}
                                            <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
                                              <button
                                                type="button"
                                                disabled={isFirstBlock}
                                                onClick={() =>
                                                  handleMoveBlockInAccordion(acc.id, bIdx, 'up')
                                                }
                                                className="h-6 w-6 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-25 flex items-center justify-center text-gray-600 cursor-pointer"
                                                title="Move section up"
                                              >
                                                <ArrowUp className="h-3 w-3" />
                                              </button>
                                              <button
                                                type="button"
                                                disabled={isLastBlock}
                                                onClick={() =>
                                                  handleMoveBlockInAccordion(acc.id, bIdx, 'down')
                                                }
                                                className="h-6 w-6 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-25 flex items-center justify-center text-gray-600 cursor-pointer"
                                                title="Move section down"
                                              >
                                                <ArrowDown className="h-3 w-3" />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleDeleteBlockFromAccordion(acc.id, block.id)
                                                }
                                                className="h-6 w-6 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer ml-1"
                                                title="Delete section"
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </button>
                                            </div>
                                          </div>

                                          {/* Block Body */}
                                          {block.type === 'rich_text' ? (
                                            /* RICH TEXT CONTENT EDITOR */
                                            <div className="space-y-2">
                                              {/* Formatting Toolbar */}
                                              <div className="flex items-center gap-1 flex-wrap p-1 rounded-lg border border-gray-200 bg-gray-50/80 text-xs">
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleInsertFormatting(acc.id, block.id, 'bold')
                                                  }
                                                  className="p-1.5 rounded hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
                                                  title="Bold (**text**)"
                                                >
                                                  <Bold className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleInsertFormatting(acc.id, block.id, 'italic')
                                                  }
                                                  className="p-1.5 rounded hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                                                  title="Italic (*text*)"
                                                >
                                                  <Italic className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleInsertFormatting(
                                                      acc.id,
                                                      block.id,
                                                      'underline'
                                                    )
                                                  }
                                                  className="p-1.5 rounded hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                                                  title="Underline"
                                                >
                                                  <Underline className="h-3.5 w-3.5" />
                                                </button>
                                                <span className="text-gray-300">|</span>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleInsertFormatting(acc.id, block.id, 'bullet')
                                                  }
                                                  className="p-1.5 rounded hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                                                  title="Bulleted list item"
                                                >
                                                  <List className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleInsertFormatting(acc.id, block.id, 'number')
                                                  }
                                                  className="p-1.5 rounded hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                                                  title="Numbered step item"
                                                >
                                                  <ListOrdered className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleInsertFormatting(acc.id, block.id, 'quote')
                                                  }
                                                  className="p-1.5 rounded hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                                                  title="Clinical quote notice"
                                                >
                                                  <Quote className="h-3.5 w-3.5" />
                                                </button>
                                              </div>

                                              <textarea
                                                rows={3}
                                                value={contentLanguage === 'en' ? (block.content || '') : (block.contentZh ?? '')}
                                                onChange={(e) =>
                                                  handleUpdateBlockField(
                                                    acc.id,
                                                    block.id,
                                                    contentLanguage === 'zh' ? 'contentZh' : 'content',
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={
                                                  contentLanguage === 'en'
                                                    ? 'Enter clinical paragraph content, bullet points, or step-by-step instructions...'
                                                    : '請輸入繁體中文內文、臨床段落或使用指引...'
                                                }
                                                className="w-full rounded-xl border border-gray-300 bg-white p-3 text-xs sm:text-sm text-gray-800 leading-relaxed focus:border-charcoal focus:ring-1 focus:ring-charcoal outline-none transition-all font-sans"
                                              />
                                              {contentLanguage === 'en' && block.contentZh && (
                                                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 text-[11px] text-gray-600 space-y-1">
                                                  <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider block">
                                                    繁中正體原文 (Storefront Default):
                                                  </span>
                                                  <p className="italic text-gray-700 leading-relaxed whitespace-pre-line line-clamp-4">
                                                    {block.contentZh}
                                                  </p>
                                                </div>
                                              )}
                                              {contentLanguage === 'zh' && block.content && (
                                                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 text-[11px] text-gray-600 space-y-1">
                                                  <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider block">
                                                    English Reference Translation:
                                                  </span>
                                                  <p className="italic text-gray-700 leading-relaxed whitespace-pre-line line-clamp-4">
                                                    {block.content}
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          ) : (
                                            /* TABLE LAYOUT EDITOR */
                                            <div className="space-y-3.5">
                                              <div className="flex items-center justify-end">
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleAddTableRow(acc.id, block.id)
                                                  }
                                                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-charcoal hover:bg-black text-white px-2.5 py-1 rounded-md transition-colors cursor-pointer shadow-2xs"
                                                >
                                                  <Plus className="h-3 w-3 text-yellow" />
                                                  <span>Add Row</span>
                                                </button>
                                              </div>

                                              {/* Table Row Inputs */}
                                              <div className="space-y-2 rounded-xl bg-gray-50/70 p-3 border border-gray-200">
                                                <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1">
                                                  <span className="col-span-5">Column 1 ({contentLanguage === 'zh' ? '欄位名稱 [繁中預設]' : 'Key [EN]'})</span>
                                                  <span className="col-span-6">Column 2 ({contentLanguage === 'zh' ? '規格內容 [繁中預設]' : 'Value [EN]'})</span>
                                                  <span className="col-span-1 text-right">Del</span>
                                                </div>

                                                {(block.tableRows || []).map((row, rIdx) => (
                                                  <div key={rIdx} className="grid grid-cols-12 gap-2 items-center">
                                                    <div className="col-span-5">
                                                      <input
                                                        type="text"
                                                        value={contentLanguage === 'en' ? row.key : (row.keyZh ?? '')}
                                                        onChange={(e) =>
                                                          handleUpdateTableRow(
                                                            acc.id,
                                                            block.id,
                                                            rIdx,
                                                            contentLanguage === 'zh' ? 'keyZh' : 'key',
                                                            e.target.value
                                                          )
                                                        }
                                                        placeholder={
                                                          contentLanguage === 'en'
                                                            ? 'Column 1 label'
                                                            : `欄位名稱 (EN: ${row.key || 'Label'})`
                                                        }
                                                        className="w-full h-8 rounded-lg border border-gray-300 bg-white px-2.5 text-xs text-gray-700 focus:border-charcoal outline-none font-medium"
                                                      />
                                                    </div>
                                                    <div className="col-span-6">
                                                      <input
                                                        type="text"
                                                        value={contentLanguage === 'en' ? row.value : (row.valueZh ?? '')}
                                                        onChange={(e) =>
                                                          handleUpdateTableRow(
                                                            acc.id,
                                                            block.id,
                                                            rIdx,
                                                            contentLanguage === 'zh' ? 'valueZh' : 'value',
                                                            e.target.value
                                                          )
                                                        }
                                                        placeholder={
                                                          contentLanguage === 'en'
                                                            ? 'Column 2 value'
                                                            : `內容數值 (EN: ${row.value || 'Value'})`
                                                        }
                                                        className="w-full h-8 rounded-lg border border-gray-300 bg-white px-2.5 text-xs text-gray-900 font-bold focus:border-charcoal outline-none"
                                                      />
                                                    </div>
                                                    <div className="col-span-1 flex justify-end">
                                                      <button
                                                        type="button"
                                                        onClick={() =>
                                                          handleDeleteTableRow(acc.id, block.id, rIdx)
                                                        }
                                                        className="h-7 w-7 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                                                        title="Delete row"
                                                      >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })
                                  )}

                                  {/* Add Content Layout Block Buttons */}
                                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
                                    <button
                                      type="button"
                                      onClick={() => handleAddBlockToAccordion(acc.id, 'rich_text')}
                                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-3.5 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                                    >
                                      <Plus className="h-3.5 w-3.5 text-charcoal" />
                                      <span>Add Rich Text Section</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleAddBlockToAccordion(acc.id, 'table')}
                                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 px-3.5 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                                    >
                                      <TableIcon className="h-3.5 w-3.5 text-emerald-700" />
                                      <span>Add Table Layout Section</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Navigation footer */}
                    <div className="flex justify-start pt-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setActiveDetailTab('variants')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group py-1.5 px-3 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back: Product Variants</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 3: PRODUCT VARIANTS & STOCK MANAGEMENT */}
                {activeDetailTab === 'variants' && (
                  <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-gray-900">Product Variants & Stock</h3>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold text-gray-600">
                          {currentEditingProduct.variants.length <= 1
                            ? '1 Option (Single Product / 0 Additional Variants)'
                            : `${currentEditingProduct.variants.length} Options (${currentEditingProduct.variants.length - 1} Additional Variants)`}
                        </span>
                        <AdminHelpIcon text="The first row is the Default Master Variant representing the core product. Its price and SKU are synchronized with the Master Product. Additional variants can be added, customized, and removed freely." />
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Manage individual SKU options, variant thumbnail photos, unit pricing in NT$, and stock quantities.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <Plus className="h-3.5 w-3.5 text-yellow" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Hidden File Input for Variant Image Upload */}
                  <input
                    ref={variantFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleVariantFileUpload}
                    className="hidden"
                  />

                  <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold text-xs uppercase tracking-wide">
                          <th className="py-3 px-3.5 text-center w-16">Image</th>
                          <th className="py-3 px-3.5 min-w-[220px] sm:min-w-[260px]">
                            Variant Option Name
                          </th>
                          <th className="py-3 px-3 min-w-[130px]">Variant SKU</th>
                          <th className="py-3 px-3 min-w-[140px]">Original Price (NT$)</th>
                          <th className="py-3 px-3 min-w-[130px]">Sale Price (NT$)</th>
                          <th className="py-3 px-3 min-w-[110px]">Stock Units</th>
                          <th className="py-3 px-3 text-right w-12">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {currentEditingProduct.variants.length > 0 ? (
                          currentEditingProduct.variants.map((v, index) => {
                            const isDefault = index === 0;
                            return (
                              <tr
                                key={v.id}
                                className={`transition-colors ${
                                  isDefault ? 'bg-amber-50/20 hover:bg-amber-50/35' : 'hover:bg-gray-50/70'
                                }`}
                              >
                                {/* Variant Thumbnail Image */}
                                <td className="py-3 px-3.5 text-center">
                                  {isDefault ? (
                                    <div
                                      className="relative h-11 w-11 mx-auto rounded-xl border border-gray-200 bg-gray-100/80 overflow-hidden flex items-center justify-center shrink-0 shadow-2xs opacity-80 cursor-not-allowed select-none"
                                      title="Master product primary image (managed in Media Gallery tab)"
                                    >
                                      {v.imageUrl ? (
                                        <img
                                          src={v.imageUrl}
                                          alt={v.name}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <ImageIcon className="h-5 w-5 text-gray-400" />
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => setPickingVariantImageId(v.id)}
                                      className="relative h-11 w-11 mx-auto rounded-xl border border-gray-200 bg-gray-50 overflow-hidden cursor-pointer group hover:ring-2 hover:ring-charcoal transition-all flex items-center justify-center shrink-0 shadow-2xs"
                                      title="Click to select or upload variant image"
                                    >
                                      {v.imageUrl ? (
                                        <img
                                          src={v.imageUrl}
                                          alt={v.name}
                                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                      ) : (
                                        <ImageIcon className="h-5 w-5 text-gray-400" />
                                      )}
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                        <Edit3 className="h-3.5 w-3.5 text-yellow" />
                                      </div>
                                    </div>
                                  )}
                                </td>

                                {/* Variant Option Name (Bilingual) */}
                                <td className="py-3 px-3.5 min-w-[220px] sm:min-w-[260px]">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="text"
                                        disabled={isDefault}
                                        value={
                                          isDefault
                                            ? (contentLanguage === 'zh'
                                                ? (currentEditingProduct.nameZh ? `${currentEditingProduct.nameZh} [主商品]` : '主商品預設規格 (Master)')
                                                : (v.name || 'Master Product'))
                                            : (contentLanguage === 'zh' ? (v.nameZh ?? '') : v.name)
                                        }
                                        onChange={(e) =>
                                          handleUpdateVariantField(
                                            v.id,
                                            contentLanguage === 'zh' ? 'nameZh' : 'name',
                                            e.target.value
                                          )
                                        }
                                        placeholder={
                                          isDefault
                                            ? (contentLanguage === 'zh' ? '主商品預設規格 (Master)' : 'Master Product')
                                            : (contentLanguage === 'zh'
                                                ? `例如: 雙盒超值組 (EN: ${v.name || 'Option'})`
                                                : 'e.g. Double Pack (20 Strips)')
                                        }
                                        className={`w-full min-w-[160px] rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                                          isDefault
                                            ? 'border-gray-200 bg-gray-100/80 text-gray-500 cursor-not-allowed select-none'
                                            : 'border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-charcoal'
                                        }`}
                                        title={isDefault ? 'Master product option name' : undefined}
                                      />
                                      {isDefault && (
                                        <span
                                          className="shrink-0 inline-flex items-center rounded-md bg-amber-100 text-amber-900 border border-amber-300/80 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
                                          title="Master Product Option"
                                        >
                                          [MASTER]
                                        </span>
                                      )}
                                    </div>
                                    {isDefault ? (
                                      <p className="text-[10px] text-gray-400">
                                        Core product option. Managed via General Info &amp; Pricing sidebar.
                                      </p>
                                    ) : contentLanguage === 'en' && v.nameZh ? (
                                      <p className="text-[10px] text-gray-400 font-medium">
                                        繁中 (Default): {v.nameZh}
                                      </p>
                                    ) : contentLanguage === 'zh' && v.name ? (
                                      <p className="text-[10px] text-gray-400 font-medium">
                                        EN: {v.name}
                                      </p>
                                    ) : null}
                                  </div>
                                </td>

                                <td className="py-3 px-3">
                                  <input
                                    type="text"
                                    disabled={isDefault}
                                    value={v.sku}
                                    onChange={(e) =>
                                      handleUpdateVariantField(v.id, 'sku', e.target.value)
                                    }
                                    className={`w-32 rounded-lg border px-2.5 py-1.5 text-xs font-mono font-semibold ${
                                      isDefault
                                        ? 'border-gray-200 bg-gray-100/80 text-gray-500 cursor-not-allowed select-none'
                                        : 'border-gray-200 bg-white text-gray-700 focus:outline-none focus:border-charcoal'
                                    }`}
                                    title={isDefault ? 'Inherited from Master SKU (edit in General Info)' : 'Variant SKU'}
                                  />
                                </td>

                                {/* Original Strikethrough Price */}
                                <td className="py-3 px-3 min-w-[140px]">
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-400 font-semibold text-xs line-through">NT$</span>
                                    <input
                                      type="number"
                                      disabled={isDefault}
                                      value={v.originalPrice ?? ''}
                                      onChange={(e) =>
                                        handleUpdateVariantField(
                                          v.id,
                                          'originalPrice',
                                          e.target.value === '' ? undefined : Number(e.target.value)
                                        )
                                      }
                                      placeholder="Optional"
                                      className={`w-24 rounded-lg border px-2 py-1.5 text-xs font-bold tabular-nums line-through placeholder:no-underline ${
                                        isDefault
                                          ? 'border-gray-200 bg-gray-100/80 text-gray-400 cursor-not-allowed select-none'
                                          : 'border-gray-200 bg-white text-gray-400 focus:text-gray-900 focus:outline-none focus:border-charcoal'
                                      }`}
                                      title={
                                        isDefault
                                          ? 'Inherited from Master Original Price (edit in Pricing sidebar)'
                                          : 'Original compare-at price'
                                      }
                                    />
                                  </div>
                                </td>

                                {/* Sale Price */}
                                <td className="py-3 px-3 min-w-[130px]">
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-400 font-bold text-xs">NT$</span>
                                    <input
                                      type="number"
                                      disabled={isDefault}
                                      value={v.price}
                                      onChange={(e) =>
                                        handleUpdateVariantField(v.id, 'price', Number(e.target.value))
                                      }
                                      className={`w-24 rounded-lg border px-2 py-1.5 text-xs font-bold tabular-nums ${
                                        isDefault
                                          ? 'border-gray-200 bg-gray-100/80 text-gray-500 cursor-not-allowed select-none'
                                          : 'border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-charcoal'
                                      }`}
                                      title={
                                        isDefault
                                          ? 'Inherited from Master Base Price (edit in Pricing sidebar)'
                                          : 'Variant sale price'
                                      }
                                    />
                                  </div>
                                </td>

                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      disabled={isDefault}
                                      value={v.stock}
                                      onChange={(e) =>
                                        handleUpdateVariantField(v.id, 'stock', Number(e.target.value))
                                      }
                                      className={`w-20 rounded-lg border px-2 py-1.5 text-xs font-bold tabular-nums ${
                                        isDefault
                                          ? 'border-gray-200 bg-gray-100/80 text-gray-500 cursor-not-allowed select-none'
                                          : v.stock <= 5
                                          ? 'border-amber-300 bg-amber-50 text-amber-900 focus:outline-none focus:border-charcoal'
                                          : 'border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-charcoal'
                                      }`}
                                      title={
                                        isDefault
                                          ? 'Inherited from Master Stock Units (edit in Pricing sidebar)'
                                          : 'Variant warehouse stock'
                                      }
                                    />
                                    <span className="text-xs text-gray-400">units</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-right">
                                  {isDefault ? (
                                    <button
                                      type="button"
                                      disabled
                                      title="Default master variant represents the core product and cannot be deleted"
                                      className="text-gray-300 cursor-not-allowed p-1 opacity-40"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteVariant(v.id)}
                                      title="Delete variant"
                                      className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-gray-500">
                              <Package className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-sm font-bold text-gray-700">No variants added (0 options)</p>
                              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                                This product operates as a standalone item without variant options. You can click &quot;Add&quot; above at any time.
                              </p>
                              <button
                                type="button"
                                onClick={handleAddVariant}
                                className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl bg-charcoal hover:bg-black text-white px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                              >
                                <Plus className="h-3.5 w-3.5 text-yellow" />
                                <span>Add</span>
                              </button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-1 px-1">
                    <span>Total Variant Options: <strong>{currentEditingProduct.variants.length}</strong></span>
                    <span>Total Synced Stock: <strong className="text-gray-900">{totalStockSynced} units</strong></span>
                  </div>

                  {/* Navigation footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setActiveDetailTab('media')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group py-1.5 px-3 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                      <span>Back: Media Gallery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDetailTab('accordions')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group py-1.5 px-3 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <span>Next: Content Accordions</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

                {/* ================================================================= */}
                {/* RIGHT COLUMN: Sidebar Summary Cards (4 Cols)                      */}
                {/* ================================================================= */}
                <div className="lg:col-span-4 space-y-6">
                  {/* SIDEBAR CARD 1: STATUS & VISIBILITY */}
                  <div className="rounded-3xl border border-gray-200/90 bg-white p-6 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                          Product Status
                        </h3>
                        <AdminHelpIcon text="Active products are immediately published to the storefront catalog. Draft products are hidden from public view." />
                      </div>
                      <span
                        className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold border ${
                          currentEditingProduct.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        }`}
                      >
                        {currentEditingProduct.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                          Catalog Visibility
                        </label>
                        <select
                          value={currentEditingProduct.status}
                          onChange={(e) =>
                            updateCurrentProduct({
                              ...currentEditingProduct,
                              status: e.target.value as 'Active' | 'Draft'
                            })
                          }
                          className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm font-bold text-gray-900 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none cursor-pointer"
                        >
                          <option value="Active">Active (Published to Storefront)</option>
                          <option value="Draft">Draft (Hidden from Customers)</option>
                        </select>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed">
                        {currentEditingProduct.status === 'Active'
                          ? 'This product is currently published and can be browsed and purchased on the storefront.'
                          : 'This product is hidden from storefront catalog navigation and direct customer access.'}
                      </p>
                    </div>
                  </div>

                  {/* SIDEBAR CARD 2: PRICING & INVENTORY SUMMARY */}
                  <div className="rounded-3xl border border-gray-200/90 bg-white p-6 shadow-2xs space-y-4">
                    <div className="pb-3 border-b border-gray-100">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        Pricing & Master Inventory
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Base pricing and aggregated warehouse inventory.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                          Base Price (Sale Price) <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 font-extrabold text-xs">NT$</span>
                          <input
                            type="number"
                            value={currentEditingProduct.basePrice}
                            onChange={(e) => {
                              const newPrice = Number(e.target.value);
                              const updatedVariants = currentEditingProduct.variants.map((v, idx) =>
                                idx === 0 ? { ...v, price: newPrice } : v
                              );
                              updateCurrentProduct({
                                ...currentEditingProduct,
                                basePrice: newPrice,
                                variants: updatedVariants
                              });
                            }}
                            className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm tabular-nums text-gray-900 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none"
                          />
                        </div>
                        <span className="text-[11px] text-gray-400 mt-1 block">
                          Default master price (synced with default master variant).
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700 uppercase">
                            Original Strikethrough Price
                          </label>
                          <span className="text-[10px] text-gray-400 font-semibold uppercase">Optional</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 font-bold text-xs line-through">NT$</span>
                          <input
                            type="number"
                            value={currentEditingProduct.originalPrice ?? ''}
                            onChange={(e) => {
                              const newOrigPrice =
                                e.target.value === '' ? undefined : Number(e.target.value);
                              const updatedVariants = currentEditingProduct.variants.map((v, idx) =>
                                idx === 0 ? { ...v, originalPrice: newOrigPrice } : v
                              );
                              updateCurrentProduct({
                                ...currentEditingProduct,
                                originalPrice: newOrigPrice,
                                variants: updatedVariants
                              });
                            }}
                            placeholder="e.g. 1200"
                            className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-bold text-sm tabular-nums text-gray-400 line-through placeholder:no-underline focus:text-gray-900 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none"
                          />
                        </div>
                        <span className="text-[11px] text-gray-400 mt-1 block">
                          Displays crossed out next to the sale price (synced with default master variant).
                        </span>
                      </div>

                      {/* Master Stock Units */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                          Master Stock Units <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            value={currentEditingProduct.variants[0]?.stock ?? currentEditingProduct.totalStock ?? 0}
                            onChange={(e) => {
                              const newStock = Math.max(0, Number(e.target.value));
                              const updatedVariants = currentEditingProduct.variants.map((v, idx) =>
                                idx === 0 ? { ...v, stock: newStock } : v
                              );
                              const updatedTotal =
                                updatedVariants.length > 0
                                  ? updatedVariants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)
                                  : newStock;
                              updateCurrentProduct({
                                ...currentEditingProduct,
                                totalStock: updatedTotal,
                                variants: updatedVariants
                              });
                            }}
                            className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm tabular-nums text-gray-900 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none"
                          />
                          <span className="text-xs font-bold text-gray-500 shrink-0">units</span>
                        </div>
                        <span className="text-[11px] text-gray-400 mt-1 block">
                          Warehouse inventory for the core master product option.
                        </span>
                      </div>

                      {currentEditingProduct.variants.length > 1 && (
                        <div className="rounded-2xl bg-gray-50/70 border border-gray-200 p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-600">Total Synced Stock (All Variants):</span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-extrabold ${
                                totalStockSynced === 0
                                  ? 'bg-rose-100 text-rose-800'
                                  : totalStockSynced <= 5
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {totalStockSynced} units
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SIDEBAR CARD 3: SHIPPING & DIMENSIONS */}
                  <div className="rounded-3xl border border-gray-200/90 bg-white p-6 shadow-2xs space-y-4">
                    <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                            Shipping Dimensions
                          </h3>
                          <AdminHelpIcon text="Physical specifications evaluated by couriers (Black Cat / CVS 7-Eleven) to determine tiered matrix rates and packaging constraints." />
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Package weight and dimensional parameters.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                          Weight (Grams) <span className="text-rose-500">*</span>
                        </label>
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
                            className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm tabular-nums text-gray-900 focus:border-charcoal focus:ring-2 focus:ring-yellow/30 outline-none"
                          />
                          <span className="text-xs font-bold text-gray-500 shrink-0">grams</span>
                        </div>
                        <span className="text-[11px] text-gray-400 mt-1 block">
                          Approx. {((currentEditingProduct.weightGram || 0) / 1000).toFixed(2)} kg
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                          Dimensions (L × W × H in cm) <span className="text-rose-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <span className="text-[10px] text-gray-500 font-semibold block mb-0.5">L (cm)</span>
                            <input
                              type="number"
                              value={currentEditingProduct.lengthCm}
                              onChange={(e) =>
                                updateCurrentProduct({
                                  ...currentEditingProduct,
                                  lengthCm: Number(e.target.value)
                                })
                              }
                              className="w-full h-9 rounded-lg border border-gray-300 bg-white px-2 font-bold text-xs text-center tabular-nums text-gray-900 focus:border-charcoal outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-semibold block mb-0.5">W (cm)</span>
                            <input
                              type="number"
                              value={currentEditingProduct.widthCm}
                              onChange={(e) =>
                                updateCurrentProduct({
                                  ...currentEditingProduct,
                                  widthCm: Number(e.target.value)
                                })
                              }
                              className="w-full h-9 rounded-lg border border-gray-300 bg-white px-2 font-bold text-xs text-center tabular-nums text-gray-900 focus:border-charcoal outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-semibold block mb-0.5">H (cm)</span>
                            <input
                              type="number"
                              value={currentEditingProduct.heightCm}
                              onChange={(e) =>
                                updateCurrentProduct({
                                  ...currentEditingProduct,
                                  heightCm: Number(e.target.value)
                                })
                              }
                              className="w-full h-9 rounded-lg border border-gray-300 bg-white px-2 font-bold text-xs text-center tabular-nums text-gray-900 focus:border-charcoal outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Packaging Logistics Calculation Box */}
                      <div className="rounded-2xl bg-yellow/10 border border-yellow/30 p-3.5 space-y-1.5 text-xs text-charcoal">
                        <div className="flex items-center justify-between font-bold">
                          <span>Total Dimension (L+W+H):</span>
                          <span>{accumulatedDim} cm</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-600 text-[11px]">
                          <span>Volumetric Weight:</span>
                          <span>{volumetricWeight} kg</span>
                        </div>
                        <div className="pt-1 border-t border-yellow/20 flex items-center justify-between text-[11px]">
                          <span className="font-semibold">7-Eleven CVS Rule:</span>
                          <span
                            className={`font-bold ${
                              isCvsEligible ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {isCvsEligible ? 'Eligible (< 105cm)' : 'Over Limits (Black Cat)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================================= */}
              {/* MODALS: Full Preview Lightbox, Edit SEO Alt, Variant Image Picker */}
              {/* ================================================================= */}

              {/* MODAL 1: Full Preview Lightbox Modal */}
              {previewMedia && (
                <div
                  className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                  onClick={() => setPreviewMedia(null)}
                >
                  <div
                    className="relative max-w-4xl w-full bg-charcoal rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {previewMedia.type === 'video' ? (
                          <Video className="h-4 w-4 text-yellow shrink-0" />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-yellow shrink-0" />
                        )}
                        <span className="text-sm font-bold truncate max-w-md">
                          {(contentLanguage === 'zh' ? (previewMedia.nameZh || previewMedia.name) : previewMedia.name) || 'Media Preview'}
                        </span>
                        {previewMedia.isPrimary && (
                          <span className="bg-yellow text-charcoal text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase shrink-0">
                            Cover
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewMedia(null)}
                        className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Modal Media Body */}
                    <div className="p-6 flex items-center justify-center bg-black/50 min-h-[320px]">
                      {previewMedia.type === 'video' ? (
                        <video
                          src={previewMedia.url}
                          controls
                          autoPlay
                          className="max-h-[70vh] w-auto max-w-full rounded-xl shadow-lg"
                        />
                      ) : (
                        <img
                          src={previewMedia.url}
                          alt={previewMedia.altText || previewMedia.name}
                          className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
                        />
                      )}
                    </div>

                    {/* Modal Footer Info */}
                    <div className="px-6 py-4 border-t border-white/10 bg-charcoal/90 text-xs text-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="font-bold text-white">SEO Alt Text: </span>
                        <span className="text-gray-300">
                          {(contentLanguage === 'zh' ? (previewMedia.altTextZh || previewMedia.altText) : previewMedia.altText) || <span className="italic text-gray-500">None configured</span>}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono shrink-0">
                        Format: {(previewMedia.type || 'image').toUpperCase()} (2:1 Ratio)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 2: Edit SEO Alt Text & Caption Modal (Bilingual) */}
              {editingMediaItem && (
                <div
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                  onClick={() => setEditingMediaItem(null)}
                >
                  <div
                    className="relative max-w-lg w-full bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Edit3 className="h-4 w-4 text-charcoal" />
                        <h3 className="text-base font-bold text-gray-900">Edit Caption &amp; SEO Alt Text</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingMediaItem(null)}
                        className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Inline Language Selector inside Modal */}
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl border border-gray-200">
                      <div className="flex items-center gap-1.5 pl-1.5">
                        <Globe className="h-3.5 w-3.5 text-charcoal/70" />
                        <span className="text-xs font-bold text-gray-700">Storefront Language:</span>
                      </div>
                      <div className="inline-flex items-center p-0.5 rounded-xl bg-gray-200/80 gap-1">
                        <button
                          type="button"
                          onClick={() => setMediaModalLang('zh')}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            mediaModalLang === 'zh'
                              ? 'bg-white text-gray-900 shadow-xs'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          <span>🇹🇼 繁體中文</span>
                          <span className={`text-[9px] px-1 py-0.5 rounded font-extrabold ${
                            mediaModalLang === 'zh' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-300 text-gray-600'
                          }`}>
                            Default
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMediaModalLang('en')}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            mediaModalLang === 'en'
                              ? 'bg-white text-gray-900 shadow-xs'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          <span>🇺🇸 English</span>
                          <span className={`text-[9px] px-1 py-0.5 rounded font-extrabold ${
                            mediaModalLang === 'en' ? 'bg-blue-100 text-blue-800' : 'bg-gray-300 text-gray-600'
                          }`}>
                            EN
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-gray-700 uppercase">
                            Media Caption / Name ({mediaModalLang === 'zh' ? '繁體中文 - 預設' : 'English Translation'})
                          </label>
                        </div>
                        <input
                          type="text"
                          value={mediaModalLang === 'en' ? editingMediaItem.name : editingMediaItem.nameZh}
                          onChange={(e) =>
                            setEditingMediaItem({
                              ...editingMediaItem,
                              [mediaModalLang === 'en' ? 'name' : 'nameZh']: e.target.value
                            })
                          }
                          placeholder={
                            mediaModalLang === 'zh'
                              ? '例如: CAT LAB+ 專利疏水砂示範套裝 (預設繁中)'
                              : 'e.g. CAT LAB+ Hydrophobic Sand Demonstration Kit (English translation)'
                          }
                          className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-charcoal focus:ring-1 focus:ring-charcoal outline-none"
                        />
                        {mediaModalLang === 'zh' && editingMediaItem.name && (
                          <p className="mt-1 text-[11px] text-gray-500">
                            <span className="font-semibold text-blue-600">EN Translation:</span> "{editingMediaItem.name}"
                          </p>
                        )}
                        {mediaModalLang === 'en' && editingMediaItem.nameZh && (
                          <p className="mt-1 text-[11px] text-gray-500">
                            <span className="font-semibold text-emerald-600">繁中正體原文 (Default):</span> "{editingMediaItem.nameZh}"
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-gray-700 uppercase">
                            SEO Alt Text ({mediaModalLang === 'zh' ? '繁體中文 - 預設' : 'English Translation'})
                          </label>
                          <span className="text-[10px] text-gray-500">Google Images &amp; Screen Readers</span>
                        </div>
                        <textarea
                          rows={3}
                          value={mediaModalLang === 'en' ? editingMediaItem.altText : editingMediaItem.altTextZh}
                          onChange={(e) =>
                            setEditingMediaItem({
                              ...editingMediaItem,
                              [mediaModalLang === 'en' ? 'altText' : 'altTextZh']: e.target.value
                            })
                          }
                          placeholder={
                            mediaModalLang === 'zh'
                              ? '準確描述圖片內容，有助於 Google 圖片搜尋引擎索引與視障螢幕報讀...'
                              : 'Accurately describe the media for search engines and accessibility (e.g. Non-absorbent veterinary urine collection sand in sterile tray)...'
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-xs text-gray-800 leading-relaxed focus:border-charcoal focus:ring-1 focus:ring-charcoal outline-none"
                        />
                        {mediaModalLang === 'zh' && editingMediaItem.altText && (
                          <p className="mt-1 text-[11px] text-gray-500">
                            <span className="font-semibold text-blue-600">EN Translation:</span> "{editingMediaItem.altText}"
                          </p>
                        )}
                        {mediaModalLang === 'en' && editingMediaItem.altTextZh && (
                          <p className="mt-1 text-[11px] text-gray-500">
                            <span className="font-semibold text-emerald-600">繁中正體原文 (Default):</span> "{editingMediaItem.altTextZh}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setEditingMediaItem(null)}
                        className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 text-xs font-bold transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateMediaItem(editingMediaItem.index, 'name', editingMediaItem.name);
                          handleUpdateMediaItem(editingMediaItem.index, 'nameZh', editingMediaItem.nameZh);
                          handleUpdateMediaItem(editingMediaItem.index, 'altText', editingMediaItem.altText);
                          handleUpdateMediaItem(editingMediaItem.index, 'altTextZh', editingMediaItem.altTextZh);
                          setEditingMediaItem(null);
                          onShowToast('SEO Alt Text & Caption updated for both languages.');
                        }}
                        className="rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 3: Variant Image Picker Modal */}
              {pickingVariantImageId && (
                <div
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                  onClick={() => setPickingVariantImageId(null)}
                >
                  <div
                    className="relative max-w-lg w-full bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">Select Variant Image</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Pick from media gallery or upload a dedicated photo for this variant.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPickingVariantImageId(null)}
                        className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Existing Gallery Media Grid */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase">
                        From Product Media Gallery
                      </label>
                      <div className="grid grid-cols-3 gap-3 max-h-56 overflow-y-auto p-1">
                        {currentEditingProduct.images.map((img, i) => (
                          <div
                            key={i}
                            onClick={() => handleSetVariantImage(pickingVariantImageId, img.url)}
                            className="relative aspect-square rounded-xl border-2 border-gray-200 hover:border-charcoal overflow-hidden cursor-pointer group transition-all"
                          >
                            <img
                              src={img.url}
                              alt={img.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                            />
                            {img.isPrimary && (
                              <span className="absolute top-1 left-1 bg-charcoal text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                Cover
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => variantFileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 text-xs font-bold cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5 text-charcoal" />
                        <span>Upload New Image</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPickingVariantImageId(null)}
                        className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </div>
    );
  };
