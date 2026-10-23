export interface ProductData {
  id: string;
  eyebrow: { en: string; zh: string };
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  priceEn: number;
  priceZh: number;
  originalPriceEn?: number;
  originalPriceZh?: number;
  image: string;
  specs: { en: string[]; zh: string[] };
}

export const PRODUCTS: ProductData[] = [
  {
    id: 'catlab-collection-kit',
    eyebrow: {
      en: 'FOR CATS',
      zh: 'FOR CATS'
    },
    title: {
      en: 'CAT LAB+ Hydrophobic Cat Litter Kit',
      zh: 'CAT LAB+ 疏水性貓砂採集套裝'
    },
    description: {
      en: 'A home-based solution designed to support feline urine collection and health monitoring. Complete solution for urine collection, storage, and submission.',
      zh: '為支持貓咪尿液採集與健康監測而設計的居家解決方案。尿液採集、儲存與送檢的完整解決方案。'
    },
    priceEn: 29.0,
    priceZh: 890,
    originalPriceEn: 35.0,
    originalPriceZh: 1080,
    image: '/images/product.webp',
    specs: {
      en: [
        '1x Hydrophobic Non-Absorbent Sand Pack',
        '1x Waterproof Urine Collection Bag & Cable Strap',
        '1x Cylindrical Volumetric Flask',
        '1x Specimen Collection Tube',
        '1x 10-Parameter Urine Test Strip Foil Pack',
        '1x Standard Diagnostic Color Chart'
      ],
      zh: [
        '1x 疏水性無吸收顆粒貓砂包',
        '1x 防水尿液收集袋與束帶',
        '1x 圓柱量瓶',
        '1x 樣本收集管',
        '1x 10項尿液檢測試紙鋁箔包',
        '1x 專業標準比色卡'
      ]
    }
  },
  {
    id: 'catlab-test-strips',
    eyebrow: {
      en: 'FOR CATS',
      zh: 'FOR CATS'
    },
    title: {
      en: 'CAT LAB+ 10-Parameter Urine Test Strip Foil Pack',
      zh: 'CAT LAB+ 10項尿液檢測試紙鋁箔包'
    },
    description: {
      en: '10-parameter urine test strip with standard diagnostic color chart for at-home feline routine health monitoring, observation, and veterinary preliminary testing support.',
      zh: '10項尿液檢測試紙與專業標準比色卡，用於貓咪居家日常健康監測、觀察與獸醫初步檢測輔助。'
    },
    priceEn: 18.0,
    priceZh: 550,
    originalPriceEn: 22.0,
    originalPriceZh: 680,
    image: '/images/product-front.webp',
    specs: {
      en: [
        '10-Parameter Urine Test Strip',
        'Standard Diagnostic Color Chart',
        'Veterinary-Approved Precision',
        'Routine Health Monitoring',
        'In Vitro Diagnostic Use'
      ],
      zh: [
        '10項尿液檢測試紙',
        '專業標準比色卡',
        '獸醫認可的精度',
        '日常健康監測與觀察',
        '供體外診斷使用'
      ]
    }
  }
];
