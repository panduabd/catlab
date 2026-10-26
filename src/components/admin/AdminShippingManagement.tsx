import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Truck,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Edit3,
  Search,
  Check,
  X,
  Upload,
  Layers,
  ChevronDown,
  Building,
  HelpCircle,
  ArrowLeft,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Compass,
  Lock,
  Boxes,
  Sparkles,
  Save
} from 'lucide-react';
import { AdminHelpIcon, AdminTooltip } from './AdminTooltip';
import { CarrierLogo, CarrierBrandType } from './CarrierLogos';

// ============================================================================
// DATA INTERFACES & TYPES
// ============================================================================

export interface TaiwanDistrict {
  name: string;
  postalCode: string;
}

export interface TaiwanCity {
  cityId: string;
  cityName: string;
  districts: TaiwanDistrict[];
}

export interface TieredRateRow {
  id: string;
  minVal: number;
  maxVal: number;
  rateTwd: number;
}

export type RateCalculationType = 'flat' | 'tiered';
export type TieredBasisType = 'dimensions' | 'weight'; // Dimensions (L+W+H in cm) or Weight (in grams)

export interface CarrierConfig {
  carrierId: string;
  carrierName: string;
  carrierType: CarrierBrandType | 'custom';
  logoUrl?: string;
  category?: 'cvs' | 'courier' | 'postal' | 'custom';
  isEnabled: boolean;
  rateType: RateCalculationType;
  flatRateTwd: number;
  tieredBasis: TieredBasisType;
  tieredRows: TieredRateRow[];
  leadTimeText: string; // e.g. "1–2 Business Days"
}

export interface CustomCarrierDefinition {
  id: string;
  name: string;
  logoUrl: string;
  serviceType: string;
}

export interface CoverageAreaItem {
  id: string;
  name: string; // Internal label, e.g. "Taiwan Domestic", "East Asia Zone"
  coverageType: 'local' | 'global';
  isActive: boolean;

  // Global settings (Supports single or multiple destination countries per area)
  selectedCountry?: string; // Primary/legacy country code, e.g. "JP"
  selectedCountries?: string[]; // Multiple country codes or custom country codes, e.g. ["JP", "KR"]

  // Local (Taiwan) settings
  isAllTaiwan: boolean; // Fallback "All Taiwan"
  selectedCity: string; // e.g. "kinmen"
  isAllDistricts: boolean;
  selectedDistricts: string[]; // postal codes, e.g. ["893", "891"]

  // Carriers active for this area with specific rate rules
  carriers: CarrierConfig[];
}

// ============================================================================
// TAIWAN 22 ADMINISTRATIVE DIVISIONS WITH REAL DISTRICTS & POSTAL CODES
// ============================================================================

export const TAIWAN_CITIES: TaiwanCity[] = [
  {
    cityId: 'taipei',
    cityName: 'Taipei City (臺北市)',
    districts: [
      { name: 'Zhongzheng District (中正區)', postalCode: '100' },
      { name: 'Datong District (大同區)', postalCode: '103' },
      { name: 'Zhongshan District (中山區)', postalCode: '104' },
      { name: 'Songshan District (松山區)', postalCode: '105' },
      { name: 'Da\'an District (大安區)', postalCode: '106' },
      { name: 'Wanhua District (萬華區)', postalCode: '108' },
      { name: 'Xinyi District (信義區)', postalCode: '110' },
      { name: 'Shilin District (士林區)', postalCode: '111' },
      { name: 'Beitou District (北投區)', postalCode: '112' },
      { name: 'Neihu District (內湖區)', postalCode: '114' },
      { name: 'Nangang District (南港區)', postalCode: '115' },
      { name: 'Wenshan District (文山區)', postalCode: '116' }
    ]
  },
  {
    cityId: 'new_taipei',
    cityName: 'New Taipei City (新北市)',
    districts: [
      { name: 'Banqiao District (板橋區)', postalCode: '220' },
      { name: 'Sanchong District (三重區)', postalCode: '241' },
      { name: 'Zhonghe District (中和區)', postalCode: '235' },
      { name: 'Yonghe District (永和區)', postalCode: '234' },
      { name: 'Xinzhuang District (新莊區)', postalCode: '242' },
      { name: 'Xindian District (新店區)', postalCode: '231' },
      { name: 'Shulin District (樹林區)', postalCode: '238' },
      { name: 'Yingge District (鶯歌區)', postalCode: '239' },
      { name: 'Sanxia District (三峽區)', postalCode: '237' },
      { name: 'Tamsui District (淡水區)', postalCode: '251' },
      { name: 'Xizhi District (汐止區)', postalCode: '221' },
      { name: 'Tucheng District (土城區)', postalCode: '236' },
      { name: 'Luzhou District (蘆洲區)', postalCode: '247' },
      { name: 'Linkou District (林口區)', postalCode: '244' }
    ]
  },
  {
    cityId: 'taichung',
    cityName: 'Taichung City (臺中市)',
    districts: [
      { name: 'Central District (中區)', postalCode: '400' },
      { name: 'East District (東區)', postalCode: '401' },
      { name: 'South District (南區)', postalCode: '402' },
      { name: 'West District (西區)', postalCode: '403' },
      { name: 'North District (北區)', postalCode: '404' },
      { name: 'Xitun District (西屯區)', postalCode: '407' },
      { name: 'Nantun District (南屯區)', postalCode: '408' },
      { name: 'Beitun District (北屯區)', postalCode: '406' },
      { name: 'Fengyuan District (豐原區)', postalCode: '420' },
      { name: 'Dali District (大里區)', postalCode: '412' }
    ]
  },
  {
    cityId: 'kaohsiung',
    cityName: 'Kaohsiung City (高雄市)',
    districts: [
      { name: 'Xinxing District (新興區)', postalCode: '800' },
      { name: 'Qianjin District (前金區)', postalCode: '801' },
      { name: 'Lingya District (苓雅區)', postalCode: '802' },
      { name: 'Yancheng District (鹽埕區)', postalCode: '803' },
      { name: 'Gushan District (鼓山區)', postalCode: '804' },
      { name: 'Sanmin District (三民區)', postalCode: '807' },
      { name: 'Zuoying District (左營區)', postalCode: '813' },
      { name: 'Fengshan District (鳳山區)', postalCode: '830' }
    ]
  },
  {
    cityId: 'taoyuan',
    cityName: 'Taoyuan City (桃園市)',
    districts: [
      { name: 'Taoyuan District (桃園區)', postalCode: '330' },
      { name: 'Zhongli District (中壢區)', postalCode: '320' },
      { name: 'Bade District (八德區)', postalCode: '334' },
      { name: 'Pingzhen District (平鎮區)', postalCode: '324' },
      { name: 'Guishan District (龜山區)', postalCode: '333' }
    ]
  },
  {
    cityId: 'tainan',
    cityName: 'Tainan City (臺南市)',
    districts: [
      { name: 'East District (東區)', postalCode: '701' },
      { name: 'South District (南區)', postalCode: '702' },
      { name: 'North District (北區)', postalCode: '704' },
      { name: 'Anping District (安平區)', postalCode: '708' },
      { name: 'Yongkang District (永康區)', postalCode: '710' }
    ]
  },
  {
    cityId: 'hsinchu_city',
    cityName: 'Hsinchu City (新竹市)',
    districts: [
      { name: 'East District (東區)', postalCode: '300' },
      { name: 'North District (北區)', postalCode: '300' },
      { name: 'Xiangshan District (香山區)', postalCode: '300' }
    ]
  },
  {
    cityId: 'hsinchu_county',
    cityName: 'Hsinchu County (新竹縣)',
    districts: [
      { name: 'Zhubei City (竹北市)', postalCode: '302' },
      { name: 'Zhudong Township (竹東鎮)', postalCode: '310' },
      { name: 'Hukou Township (湖口鄉)', postalCode: '303' }
    ]
  },
  {
    cityId: 'keelung',
    cityName: 'Keelung City (基隆市)',
    districts: [
      { name: 'Ren\'ai District (仁愛區)', postalCode: '200' },
      { name: 'Xinyi District (信義區)', postalCode: '201' },
      { name: 'Zhongzheng District (中正區)', postalCode: '202' }
    ]
  },
  {
    cityId: 'kinmen',
    cityName: 'Kinmen County (金門縣)',
    districts: [
      { name: 'Jincheng Township (金城鎮)', postalCode: '893' },
      { name: 'Jinhu Township (金湖鎮)', postalCode: '891' },
      { name: 'Jinsha Township (金沙鎮)', postalCode: '890' },
      { name: 'Jinning Township (金寧鄉)', postalCode: '892' },
      { name: 'Lieyu Township / Little Kinmen (烈嶼鄉)', postalCode: '894' },
      { name: 'Wuqiu Township (烏坵鄉)', postalCode: '896' }
    ]
  },
  {
    cityId: 'penghu',
    cityName: 'Penghu County (澎湖縣)',
    districts: [
      { name: 'Magong City (馬公市)', postalCode: '880' },
      { name: 'Huxi Township (湖西鄉)', postalCode: '885' },
      { name: 'Baisha Township (白沙鄉)', postalCode: '884' },
      { name: 'Xiyu Township (西嶼鄉)', postalCode: '881' },
      { name: 'Wang\'an Township (望安鄉)', postalCode: '882' },
      { name: 'Qimei Township (七美鄉)', postalCode: '883' }
    ]
  },
  {
    cityId: 'lienchiang',
    cityName: 'Lienchiang County / Matsu (連江縣)',
    districts: [
      { name: 'Nangan Township (南竿鄉)', postalCode: '209' },
      { name: 'Beigan Township (北竿鄉)', postalCode: '210' },
      { name: 'Juguang Township (莒光鄉)', postalCode: '211' },
      { name: 'Dongyin Township (東引鄉)', postalCode: '212' }
    ]
  },
  {
    cityId: 'miaoli',
    cityName: 'Miaoli County (苗栗縣)',
    districts: [
      { name: 'Miaoli City (苗栗市)', postalCode: '360' },
      { name: 'Toufen City (頭份市)', postalCode: '351' },
      { name: 'Zhunan Township (竹南鎮)', postalCode: '350' }
    ]
  },
  {
    cityId: 'changhua',
    cityName: 'Changhua County (彰化縣)',
    districts: [
      { name: 'Changhua City (彰化市)', postalCode: '500' },
      { name: 'Yuanlin City (員林市)', postalCode: '510' },
      { name: 'Lukang Township (鹿港鎮)', postalCode: '505' }
    ]
  },
  {
    cityId: 'nantou',
    cityName: 'Nantou County (南投縣)',
    districts: [
      { name: 'Nantou City (南投市)', postalCode: '540' },
      { name: 'Puli Township (埔里鎮)', postalCode: '545' },
      { name: 'Caotun Township (草屯鎮)', postalCode: '542' }
    ]
  },
  {
    cityId: 'yunlin',
    cityName: 'Yunlin County (雲林縣)',
    districts: [
      { name: 'Douliu City (斗六市)', postalCode: '640' },
      { name: 'Huwei Township (虎尾鎮)', postalCode: '632' }
    ]
  },
  {
    cityId: 'chiayi_city',
    cityName: 'Chiayi City (嘉義市)',
    districts: [
      { name: 'East District (東區)', postalCode: '600' },
      { name: 'West District (西區)', postalCode: '600' }
    ]
  },
  {
    cityId: 'chiayi_county',
    cityName: 'Chiayi County (嘉義縣)',
    districts: [
      { name: 'Taibao City (太保市)', postalCode: '612' },
      { name: 'Minxiong Township (民雄鄉)', postalCode: '621' }
    ]
  },
  {
    cityId: 'pingtung',
    cityName: 'Pingtung County (屏東縣)',
    districts: [
      { name: 'Pingtung City (屏東市)', postalCode: '900' },
      { name: 'Chaozhou Township (潮州鎮)', postalCode: '920' },
      { name: 'Donggang Township (東港鎮)', postalCode: '928' }
    ]
  },
  {
    cityId: 'yilan',
    cityName: 'Yilan County (宜蘭縣)',
    districts: [
      { name: 'Yilan City (宜蘭市)', postalCode: '260' },
      { name: 'Luodong Township (羅東鎮)', postalCode: '265' },
      { name: 'Jiaoxi Township (礁溪鄉)', postalCode: '262' }
    ]
  },
  {
    cityId: 'hualien',
    cityName: 'Hualien County (花蓮縣)',
    districts: [
      { name: 'Hualien City (花蓮市)', postalCode: '970' },
      { name: 'Ji\'an Township (吉安鄉)', postalCode: '973' }
    ]
  },
  {
    cityId: 'taitung',
    cityName: 'Taitung County (臺東縣)',
    districts: [
      { name: 'Taitung City (臺東市)', postalCode: '950' },
      { name: 'Beinan Township (卑南鄉)', postalCode: '954' },
      { name: 'Lanyu / Orchid Island (蘭嶼鄉)', postalCode: '952' }
    ]
  }
];

// ============================================================================
// GLOBAL COUNTRIES LIST (INTERNATIONAL DESTINATIONS)
// ============================================================================

export interface GlobalCountryDef {
  code: string;
  name: string;
  cleanName: string;
  region?: string;
  isCustom?: boolean;
}

export const GLOBAL_COUNTRIES: GlobalCountryDef[] = [
  { code: 'MY', name: 'Malaysia (馬來西亞)', cleanName: 'Malaysia', region: 'Southeast Asia' },
  { code: 'JP', name: 'Japan (日本)', cleanName: 'Japan', region: 'East Asia' },
  { code: 'SG', name: 'Singapore (新加坡)', cleanName: 'Singapore', region: 'Southeast Asia' },
  { code: 'HK', name: 'Hong Kong (香港)', cleanName: 'Hong Kong', region: 'East Asia' },
  { code: 'KR', name: 'South Korea (南韓)', cleanName: 'South Korea', region: 'East Asia' },
  { code: 'US', name: 'United States (美國)', cleanName: 'United States', region: 'North America' },
  { code: 'CA', name: 'Canada (加拿大)', cleanName: 'Canada', region: 'North America' },
  { code: 'AU', name: 'Australia (澳洲)', cleanName: 'Australia', region: 'Oceania' },
  { code: 'GB', name: 'United Kingdom (英國)', cleanName: 'United Kingdom', region: 'Europe' },
  { code: 'TH', name: 'Thailand (泰國)', cleanName: 'Thailand', region: 'Southeast Asia' },
  { code: 'PH', name: 'Philippines (菲律賓)', cleanName: 'Philippines', region: 'Southeast Asia' },
  { code: 'VN', name: 'Vietnam (越南)', cleanName: 'Vietnam', region: 'Southeast Asia' },
  { code: 'ID', name: 'Indonesia (印尼)', cleanName: 'Indonesia', region: 'Southeast Asia' },
  { code: 'DE', name: 'Germany (德國)', cleanName: 'Germany', region: 'Europe' },
  { code: 'FR', name: 'France (法國)', cleanName: 'France', region: 'Europe' },
  { code: 'NZ', name: 'New Zealand (紐西蘭)', cleanName: 'New Zealand', region: 'Oceania' }
];

// ============================================================================
// ALL 10 PRESET CARRIERS AVAILABLE IN TAIWAN WITH AUTHENTIC LOGOS
// ============================================================================

export interface PresetCarrierDef {
  carrierId: string;
  carrierName: string;
  carrierType: CarrierBrandType;
  serviceTag: string;
  category: 'cvs' | 'courier' | 'postal';
  defaultLeadTime: string;
  defaultFlatRate: number;
}

export const PRESET_CARRIERS: PresetCarrierDef[] = [
  // 1. CVS Store Pickups (Major 4 Convenience Chains in Taiwan)
  {
    carrierId: 'c-711',
    carrierName: '7-Eleven CVS (Pickup / Drop-off)',
    carrierType: '7eleven',
    serviceTag: 'Convenience Store Pickup (統一超商門市取貨)',
    category: 'cvs',
    defaultLeadTime: '2–3 Business Days',
    defaultFlatRate: 60
  },
  {
    carrierId: 'c-fm',
    carrierName: 'FamilyMart CVS (Pickup / Drop-off)',
    carrierType: 'familymart',
    serviceTag: 'Convenience Store Pickup (全家超商門市取貨)',
    category: 'cvs',
    defaultLeadTime: '2–3 Business Days',
    defaultFlatRate: 60
  },
  {
    carrierId: 'c-hilife',
    carrierName: 'Hi-Life CVS (Pickup / Drop-off)',
    carrierType: 'hilife',
    serviceTag: 'Convenience Store Pickup (萊爾富超商門市取貨)',
    category: 'cvs',
    defaultLeadTime: '2–3 Business Days',
    defaultFlatRate: 60
  },
  {
    carrierId: 'c-okmart',
    carrierName: 'OK Mart CVS (Pickup / Drop-off)',
    carrierType: 'okmart',
    serviceTag: 'Convenience Store Pickup (OK超商門市取貨)',
    category: 'cvs',
    defaultLeadTime: '2–3 Business Days',
    defaultFlatRate: 60
  },

  // 2. Door-to-Door Home Delivery Couriers
  {
    carrierId: 'c-blackcat',
    carrierName: 'Black Cat / Takkyubin (Home Delivery)',
    carrierType: 'blackcat',
    serviceTag: 'Door-to-Door Courier (黑貓宅急便 / 統一速達)',
    category: 'courier',
    defaultLeadTime: '1–2 Business Days',
    defaultFlatRate: 130
  },
  {
    carrierId: 'c-pelican',
    carrierName: 'Taiwan Pelican Express (Home Delivery)',
    carrierType: 'pelican',
    serviceTag: 'Door-to-Door Courier (台灣宅配通)',
    category: 'courier',
    defaultLeadTime: '1–2 Business Days',
    defaultFlatRate: 130
  },
  {
    carrierId: 'c-hct',
    carrierName: 'HCT Logistics (Cargo & Express)',
    carrierType: 'hct',
    serviceTag: 'Express Cargo & Heavy Freight (新竹物流)',
    category: 'courier',
    defaultLeadTime: '1–3 Business Days',
    defaultFlatRate: 120
  },
  {
    carrierId: 'c-kerry',
    carrierName: 'Kerry TJ Logistics (Freight Delivery)',
    carrierType: 'kerry',
    serviceTag: 'Commercial Freight & Express (嘉里大榮物流)',
    category: 'courier',
    defaultLeadTime: '2–4 Business Days',
    defaultFlatRate: 140
  },

  // 3. Postal & Priority Cross-Border Express
  {
    carrierId: 'c-post',
    carrierName: 'Chunghwa Post (Pos Taiwan / EMS)',
    carrierType: 'post',
    serviceTag: 'National Postal & EMS Air (中華郵政快捷/包裹)',
    category: 'postal',
    defaultLeadTime: '2–4 Business Days',
    defaultFlatRate: 80
  },
  {
    carrierId: 'c-sfexpress',
    carrierName: 'SF Express Taiwan (Priority Express)',
    carrierType: 'sfexpress',
    serviceTag: 'Priority Courier & Cross-Border (順豐速運 台灣)',
    category: 'courier',
    defaultLeadTime: '1–2 Business Days',
    defaultFlatRate: 150
  }
];

// ============================================================================
// INITIAL MOCK DATA (ONLY RELEVANT CARRIERS ADDED PER AREA)
// ============================================================================

const initialCoverageAreas: CoverageAreaItem[] = [
  {
    id: 'area-tw-mainland',
    name: 'Taiwan Domestic (All Taiwan)',
    coverageType: 'local',
    isActive: true,
    isAllTaiwan: true,
    selectedCity: 'taipei',
    isAllDistricts: true,
    selectedDistricts: [],
    selectedCountry: undefined,
    carriers: [
      {
        carrierId: 'c-711',
        carrierName: '7-Eleven CVS (Pickup / Drop-off)',
        carrierType: '7eleven',
        category: 'cvs',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 60,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '2–3 Business Days'
      },
      {
        carrierId: 'c-fm',
        carrierName: 'FamilyMart CVS (Pickup / Drop-off)',
        carrierType: 'familymart',
        category: 'cvs',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 60,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '2–3 Business Days'
      },
      {
        carrierId: 'c-blackcat',
        carrierName: 'Black Cat / Takkyubin (Home Delivery)',
        carrierType: 'blackcat',
        category: 'courier',
        isEnabled: true,
        rateType: 'tiered',
        flatRateTwd: 130,
        tieredBasis: 'dimensions',
        tieredRows: [
          { id: 't-1', minVal: 0, maxVal: 60, rateTwd: 130 },
          { id: 't-2', minVal: 61, maxVal: 90, rateTwd: 170 },
          { id: 't-3', minVal: 91, maxVal: 120, rateTwd: 210 }
        ],
        leadTimeText: '1–2 Business Days'
      },
      {
        carrierId: 'c-post',
        carrierName: 'Chunghwa Post (Pos Taiwan / EMS)',
        carrierType: 'post',
        category: 'postal',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 80,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '2–4 Business Days'
      }
    ]
  },
  {
    id: 'area-outlying-islands',
    name: 'Kinmen County Outlying Islands',
    coverageType: 'local',
    isActive: true,
    isAllTaiwan: false,
    selectedCity: 'kinmen',
    isAllDistricts: true,
    selectedDistricts: ['893', '891', '890', '892', '894', '896'],
    selectedCountry: undefined,
    carriers: [
      {
        carrierId: 'c-blackcat',
        carrierName: 'Black Cat / Takkyubin (Home Delivery)',
        carrierType: 'blackcat',
        category: 'courier',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 180,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '3–5 Business Days'
      },
      {
        carrierId: 'c-post',
        carrierName: 'Chunghwa Post (Pos Taiwan / EMS)',
        carrierType: 'post',
        category: 'postal',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 100,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '3–6 Business Days'
      }
    ]
  },
  {
    id: 'area-global-malaysia',
    name: 'Malaysia',
    coverageType: 'global',
    isActive: true,
    isAllTaiwan: false,
    selectedCity: '',
    isAllDistricts: false,
    selectedDistricts: [],
    selectedCountry: 'MY',
    selectedCountries: ['MY'],
    carriers: [
      {
        carrierId: 'c-post',
        carrierName: 'Chunghwa Post (Pos Taiwan / EMS)',
        carrierType: 'post',
        category: 'postal',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 320,
        tieredBasis: 'weight',
        tieredRows: [],
        leadTimeText: '4–7 Business Days'
      },
      {
        carrierId: 'c-sfexpress',
        carrierName: 'SF Express Taiwan (Priority Express)',
        carrierType: 'sfexpress',
        category: 'courier',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 460,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '2–4 Business Days'
      }
    ]
  },
  {
    id: 'area-global-japan',
    name: 'Japan',
    coverageType: 'global',
    isActive: true,
    isAllTaiwan: false,
    selectedCity: '',
    isAllDistricts: false,
    selectedDistricts: [],
    selectedCountry: 'JP',
    selectedCountries: ['JP'],
    carriers: [
      {
        carrierId: 'c-post',
        carrierName: 'Chunghwa Post (Pos Taiwan / EMS)',
        carrierType: 'post',
        category: 'postal',
        isEnabled: true,
        rateType: 'tiered',
        flatRateTwd: 350,
        tieredBasis: 'weight',
        tieredRows: [
          { id: 'w-1', minVal: 0, maxVal: 1000, rateTwd: 350 },
          { id: 'w-2', minVal: 1001, maxVal: 3000, rateTwd: 550 },
          { id: 'w-3', minVal: 3001, maxVal: 5000, rateTwd: 850 }
        ],
        leadTimeText: '3–5 Business Days'
      },
      {
        carrierId: 'c-dhl-custom',
        carrierName: 'DHL Express International',
        carrierType: 'custom',
        category: 'custom',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 650,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '2–3 Business Days'
      }
    ]
  }
];

export const AdminShippingManagement: React.FC<{ onShowToast: (msg: string) => void }> = ({ onShowToast }) => {
  // Main State
  const [coverageAreas, setCoverageAreas] = useState<CoverageAreaItem[]>(initialCoverageAreas);
  const [customCarriers, setCustomCarriers] = useState<CustomCarrierDefinition[]>([
    {
      id: 'c-dhl-custom',
      name: 'DHL Express International',
      logoUrl: '',
      serviceType: 'International Priority Air'
    },
    {
      id: 'c-lalamove-custom',
      name: 'Lalamove Same Day',
      logoUrl: '',
      serviceType: 'On-Demand Instant Courier'
    }
  ]);

  // View state: 'list' or 'form'
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [editingArea, setEditingArea] = useState<CoverageAreaItem | null>(null);
  const [initialAreaSnapshot, setInitialAreaSnapshot] = useState<string>('');

  const isAreaDirty = Boolean(
    editingArea &&
    initialAreaSnapshot &&
    JSON.stringify(editingArea) !== initialAreaSnapshot
  );

  // Filter state for list view
  const [activeTab, setActiveTab] = useState<'all' | 'local' | 'global' | 'active'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Delete Confirmation Modal State
  const [deleteTargetArea, setDeleteTargetArea] = useState<CoverageAreaItem | null>(null);

  // Unified "Add Carrier" Modal State (Select from preset or create custom)
  const [isAddCarrierModalOpen, setIsAddCarrierModalOpen] = useState(false);
  const [modalCarrierTab, setModalCarrierTab] = useState<'preset' | 'custom'>('preset');
  const [modalCarrierCategory, setModalCarrierCategory] = useState<'all' | 'cvs' | 'courier' | 'postal'>('all');

  // Custom Carrier Form Sub-state
  const [newCarrierName, setNewCarrierName] = useState('');
  const [newCarrierService, setNewCarrierService] = useState('');
  const [newCarrierLogoPreview, setNewCarrierLogoPreview] = useState<string>('');

  // Custom Destination Countries State
  const [customCountries, setCustomCountries] = useState<GlobalCountryDef[]>([]);
  const [showAddCustomCountryModal, setShowAddCustomCountryModal] = useState(false);
  const [newCountryName, setNewCountryName] = useState('');
  const [newCountryCode, setNewCountryCode] = useState('');

  // Unified Countries List (Predefined + Custom)
  const allCountries: GlobalCountryDef[] = [
    ...GLOBAL_COUNTRIES,
    ...customCountries
  ];

  // Engine Matching Tester Modal State
  const [isTesterModalOpen, setIsTesterModalOpen] = useState(false);
  const [testerCountry, setTesterCountry] = useState<'Taiwan' | string>('Taiwan');
  const [testerCity, setTesterCity] = useState<string>('kinmen');
  const [testerDistrictPostal, setTesterDistrictPostal] = useState<string>('893');
  const [testerDim, setTesterDim] = useState<number>(55); // cm
  const [testerWeight, setTesterWeight] = useState<number>(1200); // grams

  // ============================================================================
  // CONFLICT DETECTION MAPS
  // ============================================================================

  // 1. Countries already claimed by other Global areas
  const claimedCountriesMap = new Map<string, string>(); // countryCode -> areaName
  coverageAreas.forEach((area) => {
    if ((!editingArea || area.id !== editingArea.id) && area.coverageType === 'global') {
      const countries =
        area.selectedCountries && area.selectedCountries.length > 0
          ? area.selectedCountries
          : area.selectedCountry
          ? [area.selectedCountry]
          : [];
      countries.forEach((code) => {
        claimedCountriesMap.set(code, area.name);
      });
    }
  });

  // 2. Is "All Taiwan" already claimed by another Local area?
  const otherAllTaiwanArea = coverageAreas.find(
    (area) => (!editingArea || area.id !== editingArea.id) && area.coverageType === 'local' && area.isAllTaiwan
  );

  // 3. For the currently selected city in editingArea: which districts are already claimed?
  const claimedDistrictsMap = new Map<string, string>(); // postalCode -> areaName
  if (editingArea && editingArea.coverageType === 'local' && editingArea.selectedCity) {
    coverageAreas.forEach((area) => {
      if (area.id !== editingArea.id && area.coverageType === 'local' && !area.isAllTaiwan) {
        if (area.selectedCity === editingArea.selectedCity) {
          if (area.isAllDistricts) {
            const cityObj = TAIWAN_CITIES.find((c) => c.cityId === area.selectedCity);
            cityObj?.districts.forEach((d) => claimedDistrictsMap.set(d.postalCode, area.name));
          } else {
            area.selectedDistricts.forEach((postal) => claimedDistrictsMap.set(postal, area.name));
          }
        }
      }
    });
  }

  // 4. Countries currently selected in editingArea
  const editingSelectedCountries: string[] =
    editingArea && editingArea.coverageType === 'global'
      ? editingArea.selectedCountries && editingArea.selectedCountries.length > 0
        ? editingArea.selectedCountries
        : editingArea.selectedCountry
        ? [editingArea.selectedCountry]
        : []
      : [];

  const editingConflictCountry = editingSelectedCountries.find((code) => {
    const assigned = claimedCountriesMap.get(code);
    return assigned && assigned !== editingArea?.name;
  });

  // ============================================================================
  // HIERARCHICAL FALLBACK ENGINE MATCHING ALGORITHM (FITUR 4.4)
  // ============================================================================
  const executeEngineMatching = () => {
    const activeAreas = coverageAreas.filter((a) => a.isActive);

    if (testerCountry === 'Taiwan') {
      const selectedCityObj = TAIWAN_CITIES.find((c) => c.cityId === testerCity);
      const cityName = selectedCityObj?.cityName || testerCity;

      // 1. Level 1: Match Local Specific District Exception
      if (testerCity && testerDistrictPostal) {
        const districtMatch = activeAreas.find((a) => {
          if (a.coverageType !== 'local' || a.isAllTaiwan) return false;
          if (a.selectedCity === testerCity) {
            if (!a.isAllDistricts && a.selectedDistricts.includes(testerDistrictPostal)) {
              return true;
            }
          }
          return false;
        });

        if (districtMatch) {
          return {
            matchedArea: districtMatch,
            hierarchyLevel: 'Level 1: District Exception Match',
            hierarchyBadge: 'District Match',
            reason: `Specific district rule matched for postal code ${testerDistrictPostal} in ${cityName}.`,
            isSupported: true
          };
        }
      }

      // 2. Level 2: Match Local City / County Level
      if (testerCity) {
        const cityMatch = activeAreas.find((a) => {
          if (a.coverageType !== 'local' || a.isAllTaiwan) return false;
          return a.selectedCity === testerCity && (a.isAllDistricts || a.selectedDistricts.includes(testerDistrictPostal));
        });

        if (cityMatch) {
          return {
            matchedArea: cityMatch,
            hierarchyLevel: 'Level 2: City / County Level Match',
            hierarchyBadge: 'City Match',
            reason: `City level coverage rule matched for ${cityName}.`,
            isSupported: true
          };
        }
      }

      // 3. Level 3: Fallback to "All Taiwan" Area
      const allTaiwanFallback = activeAreas.find(
        (a) => a.coverageType === 'local' && a.isAllTaiwan
      );

      if (allTaiwanFallback) {
        return {
          matchedArea: allTaiwanFallback,
          hierarchyLevel: 'Level 3: "All Taiwan" Baseline Fallback',
          hierarchyBadge: 'All Taiwan Fallback',
          reason: `No narrower district/city exception rules found. Fallback to general zone "${allTaiwanFallback.name}".`,
          isSupported: true
        };
      }

      // Not supported
      return {
        matchedArea: null,
        hierarchyLevel: 'Unsupported Territory',
        hierarchyBadge: 'Unmatched',
        reason: 'Shipping destination is currently not supported.',
        isSupported: false
      };
    } else {
      // International Global Match (Single or Multiple Country Match)
      const globalMatch = activeAreas.find((a) => {
        if (a.coverageType !== 'global') return false;
        const countries =
          a.selectedCountries && a.selectedCountries.length > 0
            ? a.selectedCountries
            : a.selectedCountry
            ? [a.selectedCountry]
            : [];
        return countries.includes(testerCountry);
      });

      if (globalMatch) {
        const countryObj = allCountries.find((c) => c.code === testerCountry);
        return {
          matchedArea: globalMatch,
          hierarchyLevel: 'Global International Coverage',
          hierarchyBadge: 'Global Match',
          reason: `Country destination "${countryObj?.name || testerCountry}" is covered by "${globalMatch.name}".`,
          isSupported: true
        };
      }

      return {
        matchedArea: null,
        hierarchyLevel: 'Unsupported Global Territory',
        hierarchyBadge: 'Unmatched',
        reason: 'Shipping destination is currently not supported.',
        isSupported: false
      };
    }
  };

  const simulationResult = executeEngineMatching();

  // Helper: Calculate carrier fee for simulation
  const calculateCarrierFee = (carrier: CarrierConfig) => {
    if (carrier.rateType === 'flat') {
      return carrier.flatRateTwd;
    }
    if (carrier.tieredRows.length === 0) {
      return carrier.flatRateTwd;
    }

    const metricValue = carrier.tieredBasis === 'dimensions' ? testerDim : testerWeight;
    const matchedTier = carrier.tieredRows.find(
      (r) => metricValue >= r.minVal && metricValue <= r.maxVal
    );

    if (matchedTier) {
      return matchedTier.rateTwd;
    }
    return carrier.tieredRows[carrier.tieredRows.length - 1]?.rateTwd || carrier.flatRateTwd;
  };

  // ============================================================================
  // HANDLERS FOR AREA LIST & ACTIONS
  // ============================================================================

  const handleToggleAreaStatus = (areaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCoverageAreas((prev) =>
      prev.map((a) => {
        if (a.id === areaId) {
          const nextActive = !a.isActive;
          onShowToast(`Area "${a.name}" set to ${nextActive ? 'Active' : 'Inactive'}.`);
          return { ...a, isActive: nextActive };
        }
        return a;
      })
    );
  };

  const handleOpenAddArea = () => {
    // Pick first available unclaimed country for global default
    const firstAvailableCountry = allCountries.find((c) => !claimedCountriesMap.has(c.code))?.code || 'MY';

    // Initial default preset carriers for new area (starts with standard 7-Eleven and Black Cat)
    const initialCarriers: CarrierConfig[] = [
      {
        carrierId: 'c-711',
        carrierName: '7-Eleven CVS (Pickup / Drop-off)',
        carrierType: '7eleven',
        category: 'cvs',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 60,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '2–3 Business Days'
      },
      {
        carrierId: 'c-blackcat',
        carrierName: 'Black Cat / Takkyubin (Home Delivery)',
        carrierType: 'blackcat',
        category: 'courier',
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 130,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '1–2 Business Days'
      }
    ];

    const newArea: CoverageAreaItem = {
      id: 'area-' + Date.now(),
      name: 'Taiwan Domestic',
      coverageType: 'local',
      isActive: true,
      isAllTaiwan: !otherAllTaiwanArea,
      selectedCity: 'taipei',
      isAllDistricts: true,
      selectedDistricts: [],
      selectedCountry: firstAvailableCountry,
      selectedCountries: [firstAvailableCountry],
      carriers: initialCarriers
    };

    setEditingArea(newArea);
    setInitialAreaSnapshot(JSON.stringify(newArea));
    setCurrentView('form');
  };

  const handleOpenEditArea = (area: CoverageAreaItem) => {
    const cloned: CoverageAreaItem = JSON.parse(JSON.stringify(area));
    if (!cloned.selectedCountries || cloned.selectedCountries.length === 0) {
      if (cloned.selectedCountry) {
        cloned.selectedCountries = [cloned.selectedCountry];
      } else {
        cloned.selectedCountries = [];
      }
    }
    setEditingArea(cloned);
    setInitialAreaSnapshot(JSON.stringify(cloned));
    setCurrentView('form');
  };

  // Helper to add country to the global area and update the Area Name if not customized
  const handleAddCountry = (countryCode: string) => {
    if (!editingArea || !countryCode) return;
    const current =
      editingArea.selectedCountries && editingArea.selectedCountries.length > 0
        ? [...editingArea.selectedCountries]
        : editingArea.selectedCountry
        ? [editingArea.selectedCountry]
        : [];

    if (current.includes(countryCode)) return;

    const nextCountries = [...current, countryCode];
    const nextPrimary = nextCountries[0];

    const isAutoName =
      !editingArea.name.trim() ||
      editingArea.name === 'New Global Area' ||
      editingArea.name === 'Global Destination' ||
      editingArea.name === 'Taiwan Domestic' ||
      allCountries.some((c) => c.cleanName === editingArea.name || c.name === editingArea.name);

    let nextName = editingArea.name;
    if (isAutoName) {
      if (nextCountries.length === 1) {
        const cObj = allCountries.find((c) => c.code === nextCountries[0]);
        nextName = cObj ? cObj.cleanName : 'Global Zone';
      } else if (nextCountries.length <= 3) {
        nextName = nextCountries
          .map((c) => allCountries.find((item) => item.code === c)?.cleanName || c)
          .join(', ');
      } else {
        const c1 = allCountries.find((item) => item.code === nextCountries[0])?.cleanName || nextCountries[0];
        const c2 = allCountries.find((item) => item.code === nextCountries[1])?.cleanName || nextCountries[1];
        nextName = `${c1}, ${c2} & ${nextCountries.length - 2} more`;
      }
    }

    setEditingArea({
      ...editingArea,
      selectedCountry: nextPrimary,
      selectedCountries: nextCountries,
      name: nextName
    });
  };

  // Helper to remove country from the global area
  const handleRemoveCountry = (countryCode: string) => {
    if (!editingArea) return;
    const current =
      editingArea.selectedCountries && editingArea.selectedCountries.length > 0
        ? [...editingArea.selectedCountries]
        : editingArea.selectedCountry
        ? [editingArea.selectedCountry]
        : [];

    const nextCountries = current.filter((c) => c !== countryCode);
    const nextPrimary = nextCountries[0] || '';

    setEditingArea({
      ...editingArea,
      selectedCountry: nextPrimary,
      selectedCountries: nextCountries
    });
  };

  // Helper to create a new custom destination country
  const handleCreateCustomCountry = () => {
    const trimmedName = newCountryName.trim();
    if (!trimmedName) {
      alert('Please enter a country name.');
      return;
    }

    let code = newCountryCode.trim().toUpperCase();
    if (!code) {
      const clean = trimmedName.replace(/[^A-Za-z]/g, '').toUpperCase();
      code = clean.slice(0, 3) || `C${Date.now().toString().slice(-3)}`;
    }

    if (allCountries.some((c) => c.code === code)) {
      alert(`Country code "${code}" already exists. Please choose a unique country code.`);
      return;
    }

    const cleanName = trimmedName.replace(/\s*\(.*?\)\s*/g, '').trim() || trimmedName;
    const newCustomCountry: GlobalCountryDef = {
      code,
      name: trimmedName,
      cleanName,
      isCustom: true
    };

    setCustomCountries((prev) => [...prev, newCustomCountry]);

    if (editingArea) {
      handleAddCountry(code);
    }

    setNewCountryName('');
    setNewCountryCode('');
    setShowAddCustomCountryModal(false);
    onShowToast(`Custom country "${trimmedName}" created and added to zone.`);
  };

  // Helper to handle local city selection and automatically update Area Name if not customized
  const handleSelectCity = (cityId: string) => {
    const cityObj = TAIWAN_CITIES.find((c) => c.cityId === cityId);
    const cleanCityName = cityObj ? cityObj.cityName.split(' ')[0] : '';

    setEditingArea((prev) => {
      if (!prev) return null;
      const prevCityObj = TAIWAN_CITIES.find((c) => c.cityId === prev.selectedCity);
      const prevCleanName = prevCityObj ? prevCityObj.cityName.split(' ')[0] : '';
      const isAutoName = !prev.name.trim() || prev.name.includes(prevCleanName) || prev.name === 'Taiwan Domestic';

      const firstDistricts = cityObj ? cityObj.districts.map((d) => d.postalCode) : [];
      return {
        ...prev,
        selectedCity: cityId,
        isAllDistricts: true,
        selectedDistricts: firstDistricts,
        name: isAutoName && cleanCityName ? `${cleanCityName} Area` : prev.name
      };
    });
  };

  const handleSaveArea = () => {
    if (!editingArea) return;
    if (!editingArea.name.trim()) {
      alert('Please enter an Area Name (e.g., "Malaysia", "Japan", or "Taiwan Domestic").');
      return;
    }

    if (editingArea.coverageType === 'global') {
      const selected =
        editingArea.selectedCountries && editingArea.selectedCountries.length > 0
          ? editingArea.selectedCountries
          : editingArea.selectedCountry
          ? [editingArea.selectedCountry]
          : [];

      if (selected.length === 0) {
        alert('Please select or add at least one destination country for this Global area.');
        return;
      }

      // Conflict check across all countries in this area
      for (const countryCode of selected) {
        const assignedTo = claimedCountriesMap.get(countryCode);
        if (assignedTo && assignedTo !== editingArea.name) {
          const cObj = allCountries.find((c) => c.code === countryCode);
          alert(
            `Conflict: Country "${cObj?.name || countryCode}" is already assigned to active zone "${assignedTo}". Please remove it from this zone.`
          );
          return;
        }
      }

      editingArea.selectedCountry = selected[0];
      editingArea.selectedCountries = selected;
    }

    if (editingArea.coverageType === 'local') {
      if (editingArea.isAllTaiwan && otherAllTaiwanArea && otherAllTaiwanArea.id !== editingArea.id) {
        alert(`Conflict: "All Taiwan" baseline is already assigned to "${otherAllTaiwanArea.name}".`);
        return;
      }

      if (
        !editingArea.isAllTaiwan &&
        !editingArea.isAllDistricts &&
        editingArea.selectedDistricts.length === 0
      ) {
        alert('Please select at least one district or check "Select All Available Districts".');
        return;
      }
    }

    if (editingArea.carriers.length === 0) {
      alert('Please add at least 1 carrier to this coverage area using the "Add Carrier" button.');
      return;
    }

    setCoverageAreas((prev) => {
      const exists = prev.some((a) => a.id === editingArea.id);
      if (exists) {
        return prev.map((a) => (a.id === editingArea.id ? editingArea : a));
      }
      return [editingArea, ...prev];
    });

    onShowToast(`Coverage area "${editingArea.name}" saved successfully.`);
    setInitialAreaSnapshot(JSON.stringify(editingArea));
  };

  const handleDeleteAreaConfirmed = () => {
    if (!deleteTargetArea) return;
    setCoverageAreas((prev) => prev.filter((a) => a.id !== deleteTargetArea.id));
    onShowToast(`Coverage area "${deleteTargetArea.name}" has been deleted.`);
    setDeleteTargetArea(null);
  };

  // Remove a carrier from the current area
  const handleRemoveCarrierFromArea = (carrierId: string) => {
    if (!editingArea) return;
    const target = editingArea.carriers.find((c) => c.carrierId === carrierId);
    setEditingArea({
      ...editingArea,
      carriers: editingArea.carriers.filter((c) => c.carrierId !== carrierId)
    });
    if (target) {
      onShowToast(`Removed "${target.carrierName}" from this area.`);
    }
  };

  // Add a preset carrier from the modal into the area
  const handleAddPresetCarrierToArea = (preset: PresetCarrierDef) => {
    if (!editingArea) return;
    if (editingArea.carriers.some((c) => c.carrierId === preset.carrierId)) {
      onShowToast(`"${preset.carrierName}" is already added to this area.`);
      return;
    }

    const newConfig: CarrierConfig = {
      carrierId: preset.carrierId,
      carrierName: preset.carrierName,
      carrierType: preset.carrierType,
      category: preset.category,
      isEnabled: true,
      rateType: 'flat',
      flatRateTwd: preset.defaultFlatRate,
      tieredBasis: 'dimensions',
      tieredRows: [
        { id: 't-1', minVal: 0, maxVal: 60, rateTwd: 130 },
        { id: 't-2', minVal: 61, maxVal: 90, rateTwd: 170 }
      ],
      leadTimeText: preset.defaultLeadTime
    };

    setEditingArea({
      ...editingArea,
      carriers: [...editingArea.carriers, newConfig]
    });
    onShowToast(`Added "${preset.carrierName}" to ${editingArea.name || 'area'}.`);
  };

  // Add a custom carrier from modal
  const handleSaveAndAddCustomCarrier = () => {
    if (!newCarrierName.trim()) {
      alert('Please enter a carrier name (e.g. "Lalamove Same Day" or "GOGOX Freight").');
      return;
    }

    const newId = 'custom-' + Date.now();
    const createdCarrier: CustomCarrierDefinition = {
      id: newId,
      name: newCarrierName.trim(),
      logoUrl: newCarrierLogoPreview,
      serviceType: newCarrierService.trim() || 'Express Courier'
    };

    setCustomCarriers((prev) => [...prev, createdCarrier]);

    if (editingArea) {
      const newCarrierConfig: CarrierConfig = {
        carrierId: newId,
        carrierName: createdCarrier.name,
        carrierType: 'custom',
        category: 'custom',
        logoUrl: createdCarrier.logoUrl,
        isEnabled: true,
        rateType: 'flat',
        flatRateTwd: 120,
        tieredBasis: 'dimensions',
        tieredRows: [],
        leadTimeText: '1–2 Business Days'
      };

      setEditingArea({
        ...editingArea,
        carriers: [...editingArea.carriers, newCarrierConfig]
      });
    }

    onShowToast(`Custom carrier "${createdCarrier.name}" added to area.`);
    setIsAddCarrierModalOpen(false);
    setNewCarrierName('');
    setNewCarrierService('');
    setNewCarrierLogoPreview('');
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('Logo file size exceeds the 1 MB limit (PNG/JPG/SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setNewCarrierLogoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Filtered list for directory table
  const filteredAreas = coverageAreas.filter((a) => {
    const countries =
      a.selectedCountries && a.selectedCountries.length > 0
        ? a.selectedCountries
        : a.selectedCountry
        ? [a.selectedCountry]
        : [];
    const countriesMatch = countries.some((c) => {
      const cObj = allCountries.find((item) => item.code === c);
      return (
        c.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cObj && cObj.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    const matchSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.selectedCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      countriesMatch ||
      a.carriers.some((c) => c.carrierName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'local') return matchSearch && a.coverageType === 'local';
    if (activeTab === 'global') return matchSearch && a.coverageType === 'global';
    if (activeTab === 'active') return matchSearch && a.isActive;
    return matchSearch;
  });

  // Territory Summary helper
  const renderTerritorySummary = (area: CoverageAreaItem) => {
    if (area.coverageType === 'global') {
      const countries =
        area.selectedCountries && area.selectedCountries.length > 0
          ? area.selectedCountries
          : area.selectedCountry
          ? [area.selectedCountry]
          : [];

      if (countries.length === 0) {
        return <span className="text-gray-400 italic">No destination countries</span>;
      }

      if (countries.length === 1) {
        const countryObj = allCountries.find((c) => c.code === countries[0]);
        return (
          <span className="font-semibold text-gray-800">
            {countryObj ? countryObj.name : countries[0]}
          </span>
        );
      }

      return (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center rounded-md bg-charcoal/10 text-charcoal px-2 py-0.5 text-[11px] font-extrabold">
            {countries.length} Countries
          </span>
          <span className="text-gray-600 text-xs">
            {countries
              .map((code) => allCountries.find((c) => c.code === code)?.cleanName || code)
              .slice(0, 3)
              .join(', ')}
            {countries.length > 3 ? ` +${countries.length - 3} more` : ''}
          </span>
        </div>
      );
    }

    if (area.isAllTaiwan) {
      return <span>All Taiwan Territory (22 Cities & Outlying Islands)</span>;
    }

    const cityObj = TAIWAN_CITIES.find((c) => c.cityId === area.selectedCity);
    const cityName = cityObj ? cityObj.cityName.split(' ')[0] : area.selectedCity;

    if (area.isAllDistricts) {
      return <span>{cityName} (All Districts)</span>;
    }

    return (
      <span>
        {cityName} ({area.selectedDistricts.length} Specific Districts)
      </span>
    );
  };

  // ============================================================================
  // RENDER: VIEW 1 - MAIN COVERAGE TABLE
  // ============================================================================
  if (currentView === 'list') {
    return (
      <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Shipping & Coverage Management
            </h1>
            <AdminHelpIcon text="Manage domestic Taiwan delivery zones (22 administrative divisions with hierarchical district exceptions) and international global export. Configure Flat Rate or Tiered matrices per courier." />
          </div>

          <div className="flex items-center gap-2.5">
            {/* Engine Matching Tester Trigger */}
            <AdminTooltip content="Open hierarchical matching engine simulation for customer addresses">
              <button
                type="button"
                onClick={() => setIsTesterModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3.5 py-2.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <Compass className="h-4 w-4 text-charcoal" />
                <span>Test Matching Engine</span>
              </button>
            </AdminTooltip>

            {/* Add Coverage Area Button (Clean, no redundant '+') */}
            <AdminTooltip content="Create a new coverage zone and rate scheme">
              <button
                type="button"
                onClick={handleOpenAddArea}
                className="inline-flex items-center gap-2 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2.5 text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4 text-yellow" />
                <span>Add Coverage Area</span>
              </button>
            </AdminTooltip>
          </div>
        </div>

        {/* Directory Card & Table */}
        <div className="rounded-3xl border border-gray-200/90 bg-white shadow-2xs overflow-hidden space-y-4 p-5 sm:p-7">
          {/* Controls: Tabs & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-charcoal" />
              <h3 className="text-base font-bold text-gray-900">Coverage Areas Directory</h3>
              <AdminHelpIcon text="Complete list of coverage zones. Checkout matching checks district exceptions first, then city level, then falls back to All Taiwan baseline." />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Filter Pills */}
              <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'all' ? 'bg-charcoal text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All ({coverageAreas.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('local')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'local' ? 'bg-charcoal text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Local Taiwan
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('global')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'global' ? 'bg-charcoal text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Global Export
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('active')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'active' ? 'bg-charcoal text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Active Only
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search area name, country, or courier..."
                  className="h-9 w-48 sm:w-64 rounded-xl border border-gray-200 bg-white pl-8 pr-3 text-xs text-gray-900 focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold select-none">
                  <th className="py-3 px-3">Area Name</th>
                  <th className="py-3 px-3">Coverage Type</th>
                  <th className="py-3 px-3">Territory Summary</th>
                  <th className="py-3 px-3">Configured Carriers</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((area) => {
                    const activeCarriers = area.carriers.filter((c) => c.isEnabled);
                    return (
                      <tr key={area.id} className="hover:bg-gray-50/80 transition-colors">
                        {/* Area Name */}
                        <td className="py-3.5 px-3">
                          <p className="font-bold text-gray-900 text-xs sm:text-sm">{area.name}</p>
                          <span className="text-[11px] text-gray-400">ID: {area.id}</span>
                        </td>

                        {/* Coverage Type Badge */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          {area.coverageType === 'local' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                              <MapPin className="h-3 w-3" />
                              <span>Local (Taiwan)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                              <Globe className="h-3 w-3" />
                              <span>Global Export</span>
                            </span>
                          )}
                        </td>

                        {/* Territory Summary */}
                        <td className="py-3.5 px-3 text-gray-700 font-medium">
                          {renderTerritorySummary(area)}
                        </td>

                        {/* Configured Carriers with Brand Logos */}
                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-700 border border-gray-200 shrink-0">
                              {activeCarriers.length} Carriers
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {activeCarriers.slice(0, 4).map((c) => (
                                <CarrierLogo
                                  key={c.carrierId}
                                  carrierType={c.carrierType}
                                  customLogoUrl={c.logoUrl}
                                  carrierName={c.carrierName}
                                  size="sm"
                                />
                              ))}
                              {activeCarriers.length > 4 && (
                                <span className="text-[10px] font-bold text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded">
                                  +{activeCarriers.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Status Toggle Switch */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => handleToggleAreaStatus(area.id, e)}
                            className="inline-flex items-center gap-2 cursor-pointer group"
                            title="Click to toggle status"
                          >
                            <div
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                                area.isActive ? 'bg-emerald-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                  area.isActive ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </div>
                            <span
                              className={`text-[11px] font-semibold ${
                                area.isActive ? 'text-emerald-700' : 'text-gray-500'
                              }`}
                            >
                              {area.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <AdminTooltip content="Edit area coverage and carrier rate schemes">
                              <button
                                type="button"
                                onClick={() => handleOpenEditArea(area)}
                                className="p-1.5 text-gray-500 hover:text-charcoal hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                            </AdminTooltip>

                            <AdminTooltip content="Delete this coverage area">
                              <button
                                type="button"
                                onClick={() => setDeleteTargetArea(area)}
                                className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </AdminTooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-gray-500">
                      No coverage areas found matching your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Delete Confirmation */}
        {deleteTargetArea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <AlertCircle className="h-6 w-6 shrink-0" />
                <h3 className="text-base font-extrabold text-gray-900">Delete Coverage Area?</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Are you sure you want to delete <strong>&ldquo;{deleteTargetArea.name}&rdquo;</strong>?
                Orders placed for this territory will automatically fallback to other active areas or be marked as unsupported if no matches exist.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setDeleteTargetArea(null)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAreaConfirmed}
                  className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Delete Area
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Engine Matching Tester (Hierarchical Fallback Simulator) */}
        {isTesterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-charcoal" />
                  <h3 className="text-base font-extrabold text-gray-900">
                    Engine Matching Logic Simulator (Hierarchical Fallback)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTesterModalOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Input Simulator Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Country */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Destination Country</label>
                  <select
                    value={testerCountry}
                    onChange={(e) => setTesterCountry(e.target.value)}
                    className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold focus:border-charcoal focus:outline-none cursor-pointer"
                  >
                    <option value="Taiwan">Taiwan (Domestic)</option>
                    {allCountries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name} {c.isCustom ? '(Custom)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City (If Taiwan) */}
                {testerCountry === 'Taiwan' ? (
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">City / County</label>
                    <select
                      value={testerCity}
                      onChange={(e) => {
                        const newCity = e.target.value;
                        setTesterCity(newCity);
                        const cityObj = TAIWAN_CITIES.find((c) => c.cityId === newCity);
                        if (cityObj && cityObj.districts[0]) {
                          setTesterDistrictPostal(cityObj.districts[0].postalCode);
                        }
                      }}
                      className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold focus:border-charcoal focus:outline-none cursor-pointer"
                    >
                      {TAIWAN_CITIES.map((c) => (
                        <option key={c.cityId} value={c.cityId}>
                          {c.cityName}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Destination Region</label>
                    <input
                      type="text"
                      disabled
                      value="Global Export Destination"
                      className="w-full h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs text-gray-500 font-medium"
                    />
                  </div>
                )}

                {/* District (If Taiwan) */}
                {testerCountry === 'Taiwan' ? (
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">District & Postal Code</label>
                    <select
                      value={testerDistrictPostal}
                      onChange={(e) => setTesterDistrictPostal(e.target.value)}
                      className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold focus:border-charcoal focus:outline-none cursor-pointer"
                    >
                      {TAIWAN_CITIES.find((c) => c.cityId === testerCity)?.districts.map((d) => (
                        <option key={d.postalCode + d.name} value={d.postalCode}>
                          {d.name} ({d.postalCode})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Package Weight (grams)</label>
                    <input
                      type="number"
                      value={testerWeight}
                      onChange={(e) => setTesterWeight(Number(e.target.value))}
                      className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs font-bold focus:border-charcoal focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Package Dimension & Weight Context */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <label className="block font-semibold text-gray-600 mb-1">
                    Cart Total Dimensions (L+W+H cm)
                  </label>
                  <input
                    type="number"
                    value={testerDim}
                    onChange={(e) => setTesterDim(Number(e.target.value))}
                    className="w-full h-9 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold focus:border-charcoal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-600 mb-1">
                    Cart Total Weight (grams)
                  </label>
                  <input
                    type="number"
                    value={testerWeight}
                    onChange={(e) => setTesterWeight(Number(e.target.value))}
                    className="w-full h-9 rounded-xl border border-gray-300 bg-white px-3 text-xs font-semibold focus:border-charcoal focus:outline-none"
                  />
                </div>
              </div>

              {/* Simulation Result Box */}
              <div
                className={`rounded-2xl border p-4.5 space-y-3 transition-all ${
                  simulationResult.isSupported
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-rose-200 bg-rose-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {simulationResult.isSupported ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-rose-600" />
                    )}
                    <span className="font-extrabold text-sm text-gray-900">
                      {simulationResult.isSupported
                        ? `Supported Area: ${simulationResult.matchedArea?.name}`
                        : 'Shipping Destination Not Supported'}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      simulationResult.isSupported
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}
                  >
                    {simulationResult.hierarchyBadge}
                  </span>
                </div>

                <p className="text-xs text-gray-600">{simulationResult.reason}</p>

                {/* Available Carriers in matched area with Brand Logos */}
                {simulationResult.isSupported && simulationResult.matchedArea && (
                  <div className="pt-2 border-t border-emerald-200/80 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                      Active Carriers Available to Shopper:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {simulationResult.matchedArea.carriers
                        .filter((c) => c.isEnabled)
                        .map((carrier) => {
                          const fee = calculateCarrierFee(carrier);
                          return (
                            <div
                              key={carrier.carrierId}
                              className="rounded-xl border border-emerald-200 bg-white p-3 flex items-center justify-between shadow-2xs"
                            >
                              <div className="flex items-center gap-2.5">
                                <CarrierLogo
                                  carrierType={carrier.carrierType}
                                  customLogoUrl={carrier.logoUrl}
                                  carrierName={carrier.carrierName}
                                  size="sm"
                                />
                                <div>
                                  <p className="font-bold text-xs text-gray-900">{carrier.carrierName}</p>
                                  <p className="text-[10px] text-gray-500 mt-0.5">
                                    {carrier.leadTimeText} • {carrier.rateType === 'flat' ? 'Flat Rate' : 'Tiered Matrix'}
                                  </p>
                                </div>
                              </div>
                                <div className="flex items-center gap-1.5">
                                  {fee === 0 ? (
                                    <>
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                        FREE
                                      </span>
                                      <span className="text-sm font-extrabold text-emerald-700 tabular-nums">
                                        NT$ 0
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-sm font-extrabold text-charcoal tabular-nums">
                                      NT$ {fee}
                                    </span>
                                  )}
                                </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsTesterModalOpen(false)}
                  className="rounded-xl bg-charcoal text-white px-5 py-2 text-xs font-bold hover:bg-black transition-all cursor-pointer"
                >
                  Close Simulator
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // RENDER: VIEW 2 - FORM ADD / EDIT COVERAGE AREA
  // ============================================================================
  if (!editingArea) return null;

  return (
    <div className="min-h-screen pb-16 animate-in fade-in duration-200">
      {/* Sticky Floating Full-Bleed Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-2xs w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setCurrentView('list');
              setEditingArea(null);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-charcoal cursor-pointer group transition-colors py-1.5 px-2.5 rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Coverage Areas</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={!isAreaDirty}
              onClick={handleSaveArea}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                isAreaDirty
                  ? 'bg-yellow hover:bg-yellow/90 text-charcoal shadow-xs cursor-pointer active:scale-[0.99]'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              <Save className={`h-4 w-4 ${isAreaDirty ? 'text-charcoal' : 'text-gray-400'}`} />
              <span>Save Coverage Area</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-6">
        {/* SECTION 1: AREA BASIC INFO & COVERAGE TYPE */}
        <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Building className="h-5 w-5 text-charcoal" />
            <h2 className="text-base font-bold text-gray-900">
              1. Area Information & Coverage Type
            </h2>
            <AdminHelpIcon text="Specify an internal identifier and select whether this zone covers local Taiwan districts or international global destinations." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <label className="block font-bold text-gray-700 uppercase">
                  Coverage Area Name <span className="text-rose-500">*</span>
                </label>
                <AdminHelpIcon text="Internal label used exclusively in admin management to identify this shipping zone. Not displayed to customers." />
              </div>
              <input
                type="text"
                value={editingArea.name}
                onChange={(e) => setEditingArea({ ...editingArea, name: e.target.value })}
                placeholder='e.g. "East Asia Zone", "Europe Express", "Taiwan Domestic"'
                className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-charcoal focus:outline-none"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                Internal reference label for admin management only.
              </span>
            </div>

            {/* Coverage Type Switch */}
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Coverage Type
              </label>
              <div className="grid grid-cols-2 gap-2 h-10">
                <button
                  type="button"
                  onClick={() => {
                    const cleanName = editingArea.name === 'Malaysia' || editingArea.name === 'Japan' ? 'Taiwan Domestic' : editingArea.name;
                    setEditingArea({
                      ...editingArea,
                      coverageType: 'local',
                      name: cleanName
                    });
                  }}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    editingArea.coverageType === 'local'
                      ? 'border-charcoal bg-charcoal text-white shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Local (Taiwan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const existingCountries =
                      editingArea.selectedCountries && editingArea.selectedCountries.length > 0
                        ? editingArea.selectedCountries
                        : editingArea.selectedCountry
                        ? [editingArea.selectedCountry]
                        : [];
                    const initialCountries =
                      existingCountries.length > 0
                        ? existingCountries
                        : [allCountries.find((c) => !claimedCountriesMap.has(c.code))?.code || 'MY'];
                    const primaryCountryObj = allCountries.find((c) => c.code === initialCountries[0]);
                    const cleanName = primaryCountryObj ? primaryCountryObj.cleanName : 'Global Destination';
                    setEditingArea({
                      ...editingArea,
                      coverageType: 'global',
                      selectedCountry: initialCountries[0],
                      selectedCountries: initialCountries,
                      name: editingArea.name === 'Taiwan Domestic' ? cleanName : editingArea.name
                    });
                  }}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    editingArea.coverageType === 'global'
                      ? 'border-charcoal bg-charcoal text-white shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Global (Export)</span>
                </button>
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">
                Local covers Taiwan 22 divisions; Global configures multiple international destination countries per zone.
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: TERRITORY CONFIGURATION (LOCAL VS GLOBAL DROPDOWN) */}
        <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Compass className="h-5 w-5 text-charcoal" />
            <h2 className="text-base font-bold text-gray-900">
              2. Geographical Territory Configuration
            </h2>
          </div>

          {/* GLOBAL CONFIGURATION: MULTIPLE DESTINATION COUNTRIES + CUSTOM COUNTRY CREATION */}
          {editingArea.coverageType === 'global' ? (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <label className="font-bold text-gray-700 uppercase">
                      Destination Countries (Multiple Global Countries) <span className="text-rose-500">*</span>
                    </label>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-extrabold text-gray-600">
                      {editingSelectedCountries.length}{' '}
                      {editingSelectedCountries.length === 1 ? 'Country' : 'Countries'}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span>Auto-syncs Area Name</span>
                  </span>
                </div>

                {/* Selected Countries Tag Container */}
                <div className="p-3 rounded-2xl border border-gray-200 bg-gray-50/70 min-h-[52px] mb-3">
                  {editingSelectedCountries.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {editingSelectedCountries.map((code) => {
                        const countryObj = allCountries.find((c) => c.code === code);
                        const isCustom = countryObj?.isCustom;
                        return (
                          <span
                            key={code}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-900 shadow-2xs group hover:border-gray-300 transition-all"
                          >
                            <Globe className="h-3.5 w-3.5 text-charcoal/70" />
                            <span>{countryObj ? countryObj.name : code}</span>
                            {isCustom && (
                              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-extrabold border border-amber-200">
                                Custom
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveCountry(code)}
                              className="text-gray-400 hover:text-rose-600 p-0.5 rounded-md hover:bg-rose-50 cursor-pointer transition-colors"
                              title={`Remove ${countryObj?.cleanName || code}`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-800 text-xs py-1">
                      <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>No destination countries selected yet. Add at least one country below.</span>
                    </div>
                  )}
                </div>

                {/* Country Picker & Custom Country Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1">
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddCountry(e.target.value);
                        }
                      }}
                      className="w-full h-11 rounded-xl border border-gray-300 bg-white px-3.5 text-xs sm:text-sm font-semibold text-gray-900 focus:border-charcoal focus:outline-none cursor-pointer"
                    >
                      <option value="">+ Add a Destination Country...</option>
                      {allCountries.map((country) => {
                        const isSelectedInCurrent = editingSelectedCountries.includes(country.code);
                        const assignedAreaName = claimedCountriesMap.get(country.code);
                        const isAssignedToOther = !!assignedAreaName && assignedAreaName !== editingArea.name;
                        const isDisabled = isSelectedInCurrent || isAssignedToOther;

                        return (
                          <option
                            key={country.code}
                            value={country.code}
                            disabled={isDisabled}
                            className={isDisabled ? 'text-gray-400 bg-gray-50' : 'text-gray-900'}
                          >
                            {country.name}
                            {isSelectedInCurrent
                              ? ' (Already in zone)'
                              : isAssignedToOther
                              ? ` (Assigned to: "${assignedAreaName}")`
                              : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddCustomCountryModal(true)}
                    className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 hover:border-charcoal text-xs font-bold text-gray-800 transition-all cursor-pointer shadow-2xs shrink-0"
                  >
                    <Plus className="h-4 w-4 text-charcoal" />
                    <span>Add Custom Country</span>
                  </button>
                </div>

                <p className="text-[11px] text-gray-500 mt-2">
                  Add one or multiple destination countries to this international shipping zone. Rates and carriers configured below will apply to all selected countries in this zone. Countries already assigned to another active area are protected from conflicts.
                </p>
              </div>

              {/* Conflict Status Display if any selected country is already claimed by another active area */}
              {editingConflictCountry && (
                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-900 flex items-center gap-2.5">
                  <Lock className="h-4 w-4 text-amber-700 shrink-0" />
                  <span className="text-xs">
                    Country &ldquo;<strong>{allCountries.find((c) => c.code === editingConflictCountry)?.name || editingConflictCountry}</strong>&rdquo; is already active under zone &ldquo;
                    <strong>{claimedCountriesMap.get(editingConflictCountry)}</strong>&rdquo;. Please remove it to avoid rate conflicts.
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* LOCAL (TAIWAN) CONFIGURATION WITH CONFLICT PREVENTION */
            <div className="space-y-4 text-xs">
              {/* Option Fallback: "All Taiwan" */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  otherAllTaiwanArea
                    ? 'border-gray-200 bg-gray-100/70'
                    : 'border-gray-200 bg-gray-50/70'
                }`}
              >
                <label
                  className={`flex items-start gap-3 select-none ${
                    otherAllTaiwanArea ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={!!otherAllTaiwanArea}
                    checked={editingArea.isAllTaiwan && !otherAllTaiwanArea}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setEditingArea({
                        ...editingArea,
                        isAllTaiwan: isChecked,
                        isAllDistricts: true,
                        name: isChecked ? 'Taiwan Domestic (All Taiwan)' : editingArea.name
                      });
                    }}
                    className="h-4 w-4 rounded text-charcoal focus:ring-charcoal mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-xs text-gray-900">
                      Cover Entire Taiwan Territory (All Taiwan Mainland & Islands)
                    </span>
                    {otherAllTaiwanArea ? (
                      <p className="text-[11px] text-amber-700 font-semibold mt-0.5 flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        <span>
                          Disabled: "All Taiwan" is already assigned to active area &ldquo;{otherAllTaiwanArea.name}&rdquo;.
                        </span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Enable this if this area acts as the baseline fallback rate for all addresses across Taiwan (unless specific district/city exceptions apply).
                      </p>
                    )}
                  </div>
                </label>
              </div>

              {/* City & District Selector when not All Taiwan */}
              {!editingArea.isAllTaiwan && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block font-bold text-gray-700 uppercase mb-1">
                      Select City / County
                    </label>
                    <select
                      value={editingArea.selectedCity}
                      onChange={(e) => handleSelectCity(e.target.value)}
                      className="w-full sm:w-80 h-10 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-charcoal focus:outline-none cursor-pointer"
                    >
                      {TAIWAN_CITIES.map((c) => (
                        <option key={c.cityId} value={c.cityId}>
                          {c.cityName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District & Postal Code Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="font-bold text-gray-700 uppercase">
                        Districts / Townships & Postal Codes
                      </label>

                      {/* Select All Districts toggle */}
                      <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal">
                        <input
                          type="checkbox"
                          checked={editingArea.isAllDistricts}
                          onChange={(e) => {
                            const isAll = e.target.checked;
                            const cityObj = TAIWAN_CITIES.find(
                              (c) => c.cityId === editingArea.selectedCity
                            );
                            const availablePostals = cityObj
                              ? cityObj.districts
                                  .filter((d) => !claimedDistrictsMap.has(d.postalCode))
                                  .map((d) => d.postalCode)
                              : [];
                            setEditingArea({
                              ...editingArea,
                              isAllDistricts: isAll,
                              selectedDistricts: isAll ? availablePostals : []
                            });
                          }}
                          className="h-4 w-4 rounded text-charcoal focus:ring-charcoal"
                        />
                        <span>Select All Available Districts</span>
                      </label>
                    </div>

                    {/* Districts Grid with Conflict Protection */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {TAIWAN_CITIES.find((c) => c.cityId === editingArea.selectedCity)?.districts.map(
                        (dist) => {
                          const assignedAreaName = claimedDistrictsMap.get(dist.postalCode);
                          const isAssigned = !!assignedAreaName;
                          const isDistChecked =
                            !isAssigned &&
                            (editingArea.isAllDistricts ||
                              editingArea.selectedDistricts.includes(dist.postalCode));

                          const districtCard = (
                            <label
                              className={`flex items-center gap-2 p-2 rounded-xl border select-none transition-all ${
                                isAssigned
                                  ? 'border-gray-200 bg-gray-100/70 text-gray-400 opacity-60 cursor-not-allowed'
                                  : isDistChecked
                                  ? 'border-charcoal bg-gray-50 text-gray-900 cursor-pointer'
                                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 cursor-pointer'
                              }`}
                            >
                              <input
                                type="checkbox"
                                disabled={isAssigned}
                                checked={isDistChecked}
                                onChange={(e) => {
                                  if (isAssigned) return;
                                  const checked = e.target.checked;
                                  let nextList: string[] = [];
                                  if (editingArea.isAllDistricts) {
                                    const allPostals =
                                      TAIWAN_CITIES.find(
                                        (c) => c.cityId === editingArea.selectedCity
                                      )
                                        ?.districts.filter((d) => !claimedDistrictsMap.has(d.postalCode))
                                        .map((d) => d.postalCode) || [];
                                    nextList = checked
                                      ? allPostals
                                      : allPostals.filter((p) => p !== dist.postalCode);
                                  } else {
                                    nextList = checked
                                      ? [...editingArea.selectedDistricts, dist.postalCode]
                                      : editingArea.selectedDistricts.filter(
                                          (p) => p !== dist.postalCode
                                        );
                                  }
                                  setEditingArea({
                                    ...editingArea,
                                    isAllDistricts: false,
                                    selectedDistricts: nextList
                                  });
                                }}
                                className="h-4 w-4 rounded text-charcoal focus:ring-charcoal"
                              />
                              <div className="truncate flex-1">
                                <span className="font-semibold text-xs">{dist.name}</span>
                                <span className="text-[10px] text-gray-400 ml-1 font-mono">
                                  ({dist.postalCode})
                                </span>
                                {isAssigned && (
                                  <span className="block text-[9px] text-amber-800 font-bold mt-0.5 truncate">
                                    Assigned: {assignedAreaName}
                                  </span>
                                )}
                              </div>
                            </label>
                          );

                          return isAssigned ? (
                            <AdminTooltip
                              key={dist.postalCode + dist.name}
                              content={`This district is already assigned to "${assignedAreaName}" and cannot be added here to prevent rate conflicts.`}
                            >
                              <div>{districtCard}</div>
                            </AdminTooltip>
                          ) : (
                            <div key={dist.postalCode + dist.name}>{districtCard}</div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 3: ADDED CARRIERS & SHIPPING RATES CONFIGURATION */}
        <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-charcoal" />
                <h2 className="text-base font-bold text-gray-900">
                  3. Carriers & Shipping Rates Configuration
                </h2>
                <AdminHelpIcon text="Add carriers that serve this territory. Click 'Add Carrier' to select from official Taiwan logistics (7-Eleven, FamilyMart, Black Cat, Chunghwa Post, etc.) or add a custom courier." />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Only carriers explicitly added to this area will be configured and presented to customers at checkout.
              </p>
            </div>

            {/* "Add Carrier" Button (Clean, no redundant '+', opens modal to select preset or custom) */}
            <button
              type="button"
              onClick={() => {
                setModalCarrierTab('preset');
                setIsAddCarrierModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2.5 text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
            >
              <Plus className="h-3.5 w-3.5 text-yellow" />
              <span>Add Carrier</span>
            </button>
          </div>

          {/* List of Added Carriers (Only shows carriers that have been added to this area!) */}
          {editingArea.carriers.length > 0 ? (
            <div className="space-y-4">
              {editingArea.carriers.map((carrier) => {
                const preset = PRESET_CARRIERS.find((p) => p.carrierId === carrier.carrierId);
                return (
                  <div
                    key={carrier.carrierId}
                    className="rounded-2xl border border-gray-300 bg-white shadow-2xs transition-all overflow-hidden"
                  >
                    {/* Carrier Header / Brand Logo & Remove Action */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/40">
                      <div className="flex items-center gap-3">
                        {/* Authentic Brand SVG Logo */}
                        <CarrierLogo
                          carrierType={carrier.carrierType}
                          customLogoUrl={carrier.logoUrl}
                          carrierName={carrier.carrierName}
                          size="md"
                        />

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                            {carrier.carrierName}
                          </h4>
                          <span className="text-[10px] text-gray-500">
                            {preset?.serviceTag || 'Custom Integrated Carrier'}
                          </span>
                        </div>
                      </div>

                      {/* Remove Carrier Button */}
                      <div className="flex items-center gap-2">
                        <AdminTooltip content="Remove this courier from this coverage area">
                          <button
                            type="button"
                            onClick={() => handleRemoveCarrierFromArea(carrier.carrierId)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200/80 transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        </AdminTooltip>
                      </div>
                    </div>

                    {/* Carrier Rate Configuration */}
                    <div className="p-4 sm:p-5 space-y-4 text-xs">
                      {/* Rate Type Selector: Flat Rate vs Tiered Matrix */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-700 uppercase">Rate Scheme:</span>
                          <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingArea({
                                  ...editingArea,
                                  carriers: editingArea.carriers.map((c) =>
                                    c.carrierId === carrier.carrierId ? { ...c, rateType: 'flat' } : c
                                  )
                                });
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                carrier.rateType === 'flat'
                                  ? 'bg-charcoal text-white shadow-xs'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              Flat Rate
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingArea({
                                  ...editingArea,
                                  carriers: editingArea.carriers.map((c) =>
                                    c.carrierId === carrier.carrierId
                                      ? {
                                          ...c,
                                          rateType: 'tiered',
                                          tieredRows:
                                            c.tieredRows.length > 0
                                              ? c.tieredRows
                                              : [
                                                  { id: 't-1', minVal: 0, maxVal: 60, rateTwd: 130 },
                                                  { id: 't-2', minVal: 61, maxVal: 90, rateTwd: 170 }
                                                ]
                                        }
                                      : c
                                  )
                                });
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                carrier.rateType === 'tiered'
                                  ? 'bg-charcoal text-white shadow-xs'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              Tiered Matrix
                            </button>
                          </div>
                        </div>

                        {/* Estimated Lead Time */}
                        <div className="flex items-center gap-2">
                          <label className="font-bold text-gray-700 uppercase shrink-0">
                            Estimated Lead Time:
                          </label>
                          <input
                            type="text"
                            value={carrier.leadTimeText}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingArea({
                                ...editingArea,
                                carriers: editingArea.carriers.map((c) =>
                                  c.carrierId === carrier.carrierId ? { ...c, leadTimeText: val } : c
                                )
                              });
                            }}
                            placeholder='e.g. "1–2 Business Days"'
                            className="h-8 w-44 rounded-xl border border-gray-300 bg-white px-2.5 text-xs font-semibold focus:border-charcoal focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* If Flat Rate */}
                      {carrier.rateType === 'flat' ? (
                        <div className="flex items-center gap-3">
                          <label className="font-bold text-gray-700 uppercase">Flat Rate (TWD):</label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-400 font-bold">NT$</span>
                            <input
                              type="number"
                              value={carrier.flatRateTwd}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingArea({
                                  ...editingArea,
                                  carriers: editingArea.carriers.map((c) =>
                                    c.carrierId === carrier.carrierId ? { ...c, flatRateTwd: val } : c
                                  )
                                });
                              }}
                              className="h-9 w-32 rounded-xl border border-gray-300 bg-white px-3 font-extrabold text-sm text-gray-900 focus:border-charcoal focus:outline-none"
                            />
                            {Number(carrier.flatRateTwd) === 0 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-in fade-in">
                                FREE
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-500 font-medium">
                            Charged as a fixed fee per order regardless of package weight or dimensions.
                          </span>
                        </div>
                      ) : (
                        /* If Tiered Matrix */
                        <div className="space-y-3">
                          {/* Basis selector: Dimensions vs Weight */}
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-700 uppercase">Tier Basis:</span>
                            <div className="flex items-center gap-3">
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`basis-${carrier.carrierId}`}
                                  checked={carrier.tieredBasis === 'dimensions'}
                                  onChange={() => {
                                    setEditingArea({
                                      ...editingArea,
                                      carriers: editingArea.carriers.map((c) =>
                                        c.carrierId === carrier.carrierId
                                          ? { ...c, tieredBasis: 'dimensions' }
                                          : c
                                      )
                                    });
                                  }}
                                  className="text-charcoal focus:ring-charcoal"
                                />
                                <span className="font-semibold text-gray-800">
                                  Total Dimensions (L+W+H in cm)
                                </span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`basis-${carrier.carrierId}`}
                                  checked={carrier.tieredBasis === 'weight'}
                                  onChange={() => {
                                    setEditingArea({
                                      ...editingArea,
                                      carriers: editingArea.carriers.map((c) =>
                                        c.carrierId === carrier.carrierId
                                          ? { ...c, tieredBasis: 'weight' }
                                          : c
                                      )
                                    });
                                  }}
                                  className="text-charcoal focus:ring-charcoal"
                                />
                                <span className="font-semibold text-gray-800">Total Weight (grams)</span>
                              </label>
                            </div>
                          </div>

                          {/* Tier Rows Table */}
                          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                            <table className="w-full text-left text-xs">
                              <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold">
                                  <th className="py-2 px-3">Min Value</th>
                                  <th className="py-2 px-3">Max Value</th>
                                  <th className="py-2 px-3">Shipping Rate (TWD)</th>
                                  <th className="py-2 px-3 text-right">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {carrier.tieredRows.map((tier, idx) => (
                                  <tr key={tier.id}>
                                    <td className="py-2 px-3">
                                      <input
                                        type="number"
                                        value={tier.minVal}
                                        onChange={(e) => {
                                          const val = Number(e.target.value);
                                          setEditingArea({
                                            ...editingArea,
                                            carriers: editingArea.carriers.map((c) => {
                                              if (c.carrierId === carrier.carrierId) {
                                                const nextRows = c.tieredRows.map((r, i) =>
                                                  i === idx ? { ...r, minVal: val } : r
                                                );
                                                return { ...c, tieredRows: nextRows };
                                              }
                                              return c;
                                            })
                                          });
                                        }}
                                        className="h-8 w-24 rounded-lg border border-gray-300 px-2 font-bold text-gray-900"
                                      />
                                    </td>
                                    <td className="py-2 px-3">
                                      <input
                                        type="number"
                                        value={tier.maxVal}
                                        onChange={(e) => {
                                          const val = Number(e.target.value);
                                          setEditingArea({
                                            ...editingArea,
                                            carriers: editingArea.carriers.map((c) => {
                                              if (c.carrierId === carrier.carrierId) {
                                                const nextRows = c.tieredRows.map((r, i) =>
                                                  i === idx ? { ...r, maxVal: val } : r
                                                );
                                                return { ...c, tieredRows: nextRows };
                                              }
                                              return c;
                                            })
                                          });
                                        }}
                                        className="h-8 w-24 rounded-lg border border-gray-300 px-2 font-bold text-gray-900"
                                      />
                                    </td>
                                    <td className="py-2 px-3">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-gray-400 font-bold">NT$</span>
                                        <input
                                          type="number"
                                          value={tier.rateTwd}
                                          onChange={(e) => {
                                            const val = Number(e.target.value);
                                            setEditingArea({
                                              ...editingArea,
                                              carriers: editingArea.carriers.map((c) => {
                                                if (c.carrierId === carrier.carrierId) {
                                                  const nextRows = c.tieredRows.map((r, i) =>
                                                    i === idx ? { ...r, rateTwd: val } : r
                                                  );
                                                  return { ...c, tieredRows: nextRows };
                                                }
                                                return c;
                                              })
                                            });
                                          }}
                                          className="h-8 w-24 rounded-lg border border-gray-300 px-2 font-extrabold text-gray-900"
                                        />
                                        {Number(tier.rateTwd) === 0 && (
                                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-in fade-in">
                                            FREE
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="py-2 px-3 text-right">
                                      {carrier.tieredRows.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingArea({
                                              ...editingArea,
                                              carriers: editingArea.carriers.map((c) => {
                                                if (c.carrierId === carrier.carrierId) {
                                                  return {
                                                    ...c,
                                                    tieredRows: c.tieredRows.filter((_, i) => i !== idx)
                                                  };
                                                }
                                                return c;
                                              })
                                            });
                                          }}
                                          className="p-1 text-gray-400 hover:text-rose-600 cursor-pointer"
                                        >
                                          <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Add Rate Tier Button */}
                          <button
                            type="button"
                            onClick={() => {
                              const lastRow = carrier.tieredRows[carrier.tieredRows.length - 1];
                              const newRow: TieredRateRow = {
                                id: 't-' + Date.now(),
                                minVal: lastRow ? lastRow.maxVal + 1 : 0,
                                maxVal: lastRow ? lastRow.maxVal + 30 : 60,
                                rateTwd: lastRow ? lastRow.rateTwd + 40 : 130
                              };
                              setEditingArea({
                                ...editingArea,
                                carriers: editingArea.carriers.map((c) => {
                                  if (c.carrierId === carrier.carrierId) {
                                    return {
                                      ...c,
                                      tieredRows: [...c.tieredRows, newRow]
                                    };
                                  }
                                  return c;
                                })
                              });
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal hover:underline cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5 text-yellow" />
                            <span>Add Rate Tier</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State when no carriers have been added yet */
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center space-y-3">
              <Truck className="h-8 w-8 text-gray-400 mx-auto" />
              <h4 className="text-sm font-bold text-gray-800">No Carriers Added Yet</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                This coverage area does not have any delivery services configured yet. Click &ldquo;Add Carrier&rdquo; to select from standard Taiwan logistics services (7-Eleven, FamilyMart, Black Cat, Chunghwa Post, etc.) or create a custom courier.
              </p>
              <button
                type="button"
                onClick={() => {
                  setModalCarrierTab('preset');
                  setIsAddCarrierModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-charcoal hover:bg-black text-white px-4 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-yellow" />
                <span>Add Carrier</span>
              </button>
            </div>
          )}
        </div>


      </div>

      {/* ========================================================================= */}
      {/* UNIFIED "ADD CARRIER" MODAL (SELECT PRESET TAIWAN CARRIERS OR ADD CUSTOM) */}
      {/* ========================================================================= */}
      {isAddCarrierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-charcoal" />
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">
                    Add Carrier to Coverage Area
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Choose from standard Taiwan logistics services or register a custom courier.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddCarrierModalOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mode Switch Tabs: Available Taiwan Carriers vs Create Custom */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setModalCarrierTab('preset')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  modalCarrierTab === 'preset'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Available Taiwan Carriers ({PRESET_CARRIERS.length})
              </button>
              <button
                type="button"
                onClick={() => setModalCarrierTab('custom')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  modalCarrierTab === 'custom'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Add Custom Carrier
              </button>
            </div>

            {/* TAB 1: PRESET TAIWAN CARRIERS LIST */}
            {modalCarrierTab === 'preset' ? (
              <div className="space-y-4">
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setModalCarrierCategory('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      modalCarrierCategory === 'all'
                        ? 'bg-charcoal text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All ({PRESET_CARRIERS.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalCarrierCategory('cvs')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      modalCarrierCategory === 'cvs'
                        ? 'bg-charcoal text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    CVS Store Pickup (4)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalCarrierCategory('courier')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      modalCarrierCategory === 'courier'
                        ? 'bg-charcoal text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Home Delivery Couriers (4)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalCarrierCategory('postal')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      modalCarrierCategory === 'postal'
                        ? 'bg-charcoal text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Postal & Priority (2)
                  </button>
                </div>

                {/* Grid of Carrier Cards to Pick */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                  {PRESET_CARRIERS.filter((p) => {
                    if (modalCarrierCategory === 'all') return true;
                    return p.category === modalCarrierCategory;
                  }).map((preset) => {
                    const isAlreadyAdded = editingArea.carriers.some(
                      (c) => c.carrierId === preset.carrierId
                    );
                    return (
                      <div
                        key={preset.carrierId}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isAlreadyAdded
                            ? 'border-gray-200 bg-gray-50/70 opacity-75'
                            : 'border-gray-200 bg-white hover:border-gray-300 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <CarrierLogo
                            carrierType={preset.carrierType}
                            carrierName={preset.carrierName}
                            size="md"
                          />
                          <div className="truncate">
                            <h4 className="text-xs font-bold text-gray-900 truncate">
                              {preset.carrierName}
                            </h4>
                            <p className="text-[10px] text-gray-500 truncate mt-0.5">
                              {preset.serviceTag}
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        {isAlreadyAdded ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg shrink-0">
                            <Check className="h-3 w-3" />
                            <span>Added</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddPresetCarrierToArea(preset)}
                            className="inline-flex items-center gap-1 text-xs font-bold bg-charcoal hover:bg-black text-white px-3 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer shrink-0"
                          >
                            <Plus className="h-3 w-3 text-yellow" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* TAB 2: CREATE CUSTOM CARRIER */
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Carrier / Service Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCarrierName}
                    onChange={(e) => setNewCarrierName(e.target.value)}
                    placeholder='e.g. "Lalamove Same Day", "GOGOX Freight"'
                    className="w-full h-10 rounded-xl border border-gray-300 px-3 text-xs font-semibold focus:border-charcoal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Service Category
                  </label>
                  <input
                    type="text"
                    value={newCarrierService}
                    onChange={(e) => setNewCarrierService(e.target.value)}
                    placeholder='e.g. "Instant Motor Courier", "Air Freight"'
                    className="w-full h-10 rounded-xl border border-gray-300 px-3 text-xs font-semibold focus:border-charcoal focus:outline-none"
                  />
                </div>

                {/* Logo Upload Box */}
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Upload Carrier Logo (PNG / JPG / SVG, Max 1 MB)
                  </label>
                  <div className="flex items-center gap-4 mt-1.5">
                    <label className="flex flex-col items-center justify-center w-36 h-20 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-charcoal bg-gray-50/50 hover:bg-gray-50 transition-all">
                      <Upload className="h-5 w-5 text-gray-400 mb-1" />
                      <span className="text-[10px] font-bold text-gray-600">Select Logo File</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/svg+xml"
                        onChange={handleLogoFileUpload}
                        className="hidden"
                      />
                    </label>

                    {newCarrierLogoPreview ? (
                      <div className="relative">
                        <img
                          src={newCarrierLogoPreview}
                          alt="Logo Preview"
                          className="h-20 w-36 object-contain rounded-2xl border border-gray-200 bg-white p-2"
                        />
                        <button
                          type="button"
                          onClick={() => setNewCarrierLogoPreview('')}
                          className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-400">No logo file selected.</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              {modalCarrierTab === 'preset' ? (
                <button
                  type="button"
                  onClick={() => setIsAddCarrierModalOpen(false)}
                  className="rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Done
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setNewCarrierName('');
                      setNewCarrierService('');
                      setNewCarrierLogoPreview('');
                      setModalCarrierTab('preset');
                    }}
                    className="rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAndAddCustomCarrier}
                    className="rounded-xl bg-charcoal hover:bg-black text-white px-5 py-2 text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Save & Add Carrier to Area
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD CUSTOM DESTINATION COUNTRY */}
      {showAddCustomCountryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-charcoal">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Add Custom Destination Country</h3>
                  <p className="text-[11px] text-gray-500">Define a new international destination country</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAddCustomCountryModal(false);
                  setNewCountryName('');
                  setNewCountryCode('');
                }}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-lg cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Country Name (Local &amp; English) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCountryName}
                  onChange={(e) => setNewCountryName(e.target.value)}
                  placeholder="e.g. Netherlands (荷蘭) or Spain (西班牙)"
                  className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-semibold text-gray-900 focus:border-charcoal focus:outline-none"
                  autoFocus
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  The primary label displayed across storefront shipping options and invoice previews.
                </span>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Country Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={newCountryCode}
                  onChange={(e) => setNewCountryCode(e.target.value.toUpperCase())}
                  placeholder="e.g. NL, ES, IT"
                  className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 font-mono font-bold uppercase text-gray-900 focus:border-charcoal focus:outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  2-letter ISO country code.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setShowAddCustomCountryModal(false);
                  setNewCountryName('');
                  setNewCountryCode('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCustomCountry}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-charcoal hover:bg-black text-white cursor-pointer transition-all shadow-xs"
              >
                Save &amp; Add Country
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
