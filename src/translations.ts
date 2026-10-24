export interface TranslationContent {
  nav: {
    product: string;
    instructions: string;
    features: string;
    benefits: string;
    faqs: string;
    contact: string;
    consultation: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    consultationBtn: string;
    howItWorksBtn: string;
    stats: {
      vetsCount: string;
      vetsLabel: string;
      stressFree: string;
      stressFreeLabel: string;
      sandTech: string;
      sandTechLabel: string;
    };
  };
  ticker: string[];
  product: {
    sectionTag: string;
    title: string;
    subtitle: string;
    desc: string;
    features: Array<{
      title: string;
      desc: string;
      icon: string;
    }>;
    packageIncludes: string;
    packageItems: string[];
  };
  video: {
    tag: string;
    title: string;
    desc: string;
    badges: string[];
  };
  instructions: {
    tag: string;
    title: string;
    desc: string;
    steps: Array<{
      step: number;
      title: string;
      desc: string;
      image: string;
    }>;
    noticeTitle: string;
    noticePoints: string[];
    disposalTitle: string;
    disposalPoints: Array<{
      step: number;
      title: string;
      desc: string;
    }>;
  };
  veterinary: {
    tag: string;
    title: string;
    desc: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  catOwner: {
    tag: string;
    title: string;
    desc: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  comparison: {
    tag: string;
    title: string;
    desc: string;
    headers: {
      feature: string;
      vet: string;
      owner: string;
    };
    items: Array<{
      title: string;
      vet: string;
      owner: string;
    }>;
  };
  careLoop: {
    tag: string;
    title: string;
    desc: string;
    nodes: {
      owner: { title: string; desc: string };
      catlab: { title: string; desc: string };
      vet: { title: string; desc: string };
    };
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
      location: string;
    }>;
  };
  cta: {
    tag: string;
    title: string;
    desc: string;
    btn: string;
    card: {
      name: string;
      highlight: string;
      desc: string;
      bullets: string[];
    };
  };
  faqs: {
    tag: string;
    title: string;
    desc: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      company: string;
      companyPlaceholder: string;
      name: string;
      namePlaceholder: string;
      telephone: string;
      telephonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      address: string;
      addressPlaceholder: string;
      subject: string;
      subjectOptions: Array<{ value: string; label: string }>;
      content: string;
      contentPlaceholder: string;
      captcha: string;
      captchaPlaceholder: string;
      refreshCaptcha: string;
      required: string;
      submitBtn: string;
      submitting: string;
      successMsg: string;
    };
    companyInfo: {
      title: string;
      producer: string;
      producerValue: string;
      address: string;
      hotline: string;
      email: string;
    };
  };
  footer: {
    desc: string;
    rights: string;
    companyTitle: string;
  };
  pdp: {
    breadcrumb: {
      home: string;
      products: string;
      current: string;
    };
    badgeCategory: string;
    inStockBadge: string;
    title: string;
    subtitle: string;
    priceAmount: number;
    priceDisplay: string;
    originalPriceDisplay?: string;
    priceNote: string;
    quantityLabel: string;
    addToCart: string;
    addedToCart: string;
    buyNow: string;
    trustPoints: Array<{ title: string; desc: string; icon: string }>;
    quickHighlights: string[];
    accordions: {
      detailsTitle: string;
      detailsIntro: string;
      packageIncludesTitle: string;
      packageItems: string[];
      specsTitle: string;
      specs: Array<{ label: string; value: string }>;
      deliveryTitle: string;
      deliveryPoints: string[];
      howToTitle?: string;
      howToSubtitle?: string;
      howToSteps?: Array<{ step: number; title: string; desc: string }>;
      parametersTitle?: string;
      parametersDesc?: string;
      parametersList?: Array<{ name: string; tag: string }>;
      downloadsTitle?: string;
      downloads?: Array<{ title: string; desc: string; format: string }>;
    };
    deepDive?: {
      tag: string;
      title: string;
      desc: string;
      cards: Array<{ title: string; desc: string; icon: string }>;
    };
    stepsSection?: {
      tag: string;
      title: string;
      desc: string;
    };
    biomarkersTable?: {
      tag: string;
      title: string;
      desc: string;
      headers: {
        parameter: string;
        measures: string;
        normal: string;
        clinical: string;
      };
      rows: Array<{
        param: string;
        measures: string;
        normal: string;
        clinical: string;
      }>;
    };
    faq?: {
      tag: string;
      title: string;
      desc: string;
      items: Array<{ q: string; a: string }>;
    };
    directCheckout: {
      modalTitle: string;
      stepSummary: string;
      stepForm: string;
      kitName: string;
      quantity: string;
      price: string;
      shipping: string;
      freeShipping: string;
      total: string;
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      addressLabel: string;
      addressPlaceholder: string;
      notesLabel: string;
      notesPlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      successTitle: string;
      successDesc: string;
      orderIdLabel: string;
      closeBtn: string;
    };
  };
}

export const translations: Record<'en' | 'zh', TranslationContent> = {
  en: {
    nav: {
      product: "Products",
      instructions: "Instructions",
      features: "Features",
      benefits: "Benefits",
      faqs: "FAQs",
      contact: "Contact",
      consultation: "Free Consultation"
    },
    hero: {
      badge: "Chosen by an increasing number of veterinarians",
      titleLine1: "The Veterinary-Approved",
      titleLine2: "Urine Collection System",
      description: "Trusted by veterinarians, adopted by animal hospitals, and loved by cat owners across Asia — CAT LAB+ brings the clinic, stress-free urine collection method that integrates seamlessly with any diagnostic workflow.",
      consultationBtn: "Free Consultation",
      howItWorksBtn: "How It Works",
      stats: {
        vetsCount: "1,200+",
        vetsLabel: "Animal Hospitals",
        stressFree: "99.8%",
        stressFreeLabel: "Stress-Free Collection",
        sandTech: "100%",
        sandTechLabel: "Non-Absorbent Sand"
      }
    },
    ticker: [
      "Veterinary-Approved",
      "Stress-Free Collection",
      "Patented Technology",
      "Chosen by more cat families",
      "Supporting everyday health care",
      "Trusted by veterinary professionals",
      "Professional quality, reliable sampling experience",
      "Expanding across global markets"
    ],
    product: {
      sectionTag: "Our Product",
      title: "CAT LAB+",
      subtitle: "Hydrophobic Cat Litter",
      desc: "A home-based solution designed to support feline urine collection and health monitoring.",
      features: [
        {
          title: "Veterinary-Approved Precision",
          desc: "Co-developed with veterinary professionals to support a more convenient at-home urine collection experience.",
          icon: "shield"
        },
        {
          title: "Stress-Free for Cats",
          desc: "No invasive collection, less cleanup — designed to provide a more natural and comfortable experience for cats.",
          icon: "heart"
        },
        {
          title: "Complete Home Kit",
          desc: "Complete solution for urine collection, storage, and submission — designed for a simple at-home sampling experience.",
          icon: "box"
        }
      ],
      packageIncludes: "Package Includes",
      packageItems: [
        "1x Hydrophobic Non-Absorbent Sand Pack",
        "1x Waterproof Urine Collection Bag & Cable Strap",
        "1x Cylindrical Volumetric Flask",
        "1x Specimen Collection Tube",
        "1x 10-Parameter Urine Test Strip Foil Pack",
        "1x Standard Diagnostic Color Chart"
      ]
    },
    video: {
      tag: "Product Demo",
      title: "See CAT LAB+ in Action",
      desc: "Watch how CAT LAB+ makes urine collection effortless for both you and your cat.",
      badges: ["Patented Technology", "Chosen by More Animal Lovers", "Clinically Validated"]
    },
    instructions: {
      tag: "Simple Process",
      title: "Instructions for Use",
      desc: "Eight simple steps from litter swap to professional diagnosis.",
      steps: [
        {
          step: 1,
          title: "Prepare the litter box",
          desc: "Lay the waterproof urine collection bag flat and secure it inside the original litter box, or place it directly over the existing litter surface.",
          image: "/images/step-1.webp"
        },
        {
          step: 2,
          title: "Add CAT LAB+",
          desc: "Pour the hydrophobic litter into the waterproof urine collection bag and spread it evenly to create a uniform litter layer.",
          image: "/images/step-2.webp"
        },
        {
          step: 3,
          title: "Collect urine sample",
          desc: "Allow the cat to urinate on the hydrophobic litter layer. For accurate sample collection, please separate the cat being sampled from other cats to prevent sample mix-up.",
          image: "/images/step-3.webp"
        },
        {
          step: 4,
          title: "Collect the urine collection bag",
          desc: "After the cat has urinated, securely seal the opening of the waterproof urine collection bag with the cable strap. Then, lift the bag and gently shake it to direct the urine toward the collection outlet.",
          image: "/images/step-4.webp"
        },
        {
          step: 5,
          title: "Transfer and measure urine sample",
          desc: "Insert the collection outlet into the cylindrical volumetric flask and allow the urine to flow into the volumetric flask.",
          image: "/images/step-5.webp"
        },
        {
          step: 6,
          title: "Perform urine testing",
          desc: "Open the foil pouch and remove the 10-parameter urine test strip. Avoid touching the testing areas. Fully immerse the test strip in the urine sample for approximately 10 seconds, then remove it. Once opened, use the test strip within 1 hour. Do not use the strip if it has been exposed to moisture or shows abnormal color changes, as this may affect test accuracy.",
          image: "/images/step-6.webp"
        },
        {
          step: 7,
          title: "Remove excess urine",
          desc: "Use the edge of the sample collection tube opening to gently remove excess urine from the test strip.",
          image: "/images/step-7.webp"
        },
        {
          step: 8,
          title: "Compare with the color chart",
          desc: "Compare the test results with the color chart provided in the package. Keep the test strip horizontal during reading to prevent interference between adjacent testing areas. Alternatively, you may take a photo of the test strip and use commercially available urine analysis apps for digital interpretation.",
          image: "/images/step-8.webp"
        }
      ],
      noticeTitle: "Important Notice",
      noticePoints: [
        "If the test result indicates an abnormal finding, or if your cat shows symptoms such as frequent urination, difficulty urinating, blood in urine, or reduced energy, consult a veterinarian promptly for further examination and professional evaluation.",
        "Test results should only be interpreted as part of a veterinary assessment. The urine sample and your pet should be taken to a veterinary clinic for further examination when necessary. The test strip is intended for in vitro diagnostic use only.",
        "The test results provided by this product are intended for routine health monitoring and home observation only, and should not be used as the sole basis for disease diagnosis or treatment decisions.",
        "Ensure the cap of the cylindrical volumetric flask is securely fastened to prevent urine leakage.",
        "Urine color may vary depending on physiological conditions or medication. Consult a veterinarian for professional interpretation.",
        "If the urine sample cannot be delivered to a veterinary clinic within 1 hour, store it refrigerated. Do not store for more than 12 hours."
      ],
      disposalTitle: "Waste Disposal",
      disposalPoints: [
        {
          step: 1,
          title: "Dispose of used litter and waste",
          desc: "Seal the waterproof urine collection bag, used hydrophobic litter, and waste together before disposal."
        },
        {
          step: 2,
          title: "Clean-up and disposal",
          desc: "Dispose of the sealed waterproof urine collection bag with standard household waste. Do not dispose of hydrophobic sand or waste directly into sinks or toilets to protect environmental sanitation."
        }
      ]
    },
    veterinary: {
      tag: "For Veterinarians",
      title: "Trusted by Veterinary Professionals",
      desc: "Designed around clinical needs. CAT LAB+ makes at-home feline urine collection convenient. The hydrophobic sand helps collect cleaner urine samples as a preliminary testing and health-monitoring support tool, while reducing the inconvenience of traditional collection methods.",
      points: [
        {
          title: "Reliable Sample Collection Quality",
          desc: "Co-developed with veterinary clinics to support clean, uncontaminated urine samples, helping clinicians obtain more reliable preliminary testing results."
        },
        {
          title: "Reduced Patient Stress",
          desc: "Helps minimize anxiety associated with clinic-based collection methods, supporting a gentler and more comfortable sampling experience for cats."
        },
        {
          title: "Improved Client Compliance",
          desc: "Simple, easy-to-follow steps help cat owners collect samples at home with confidence, encouraging timely follow-ups and routine monitoring."
        },
        {
          title: "Enhanced Clinic Efficiency",
          desc: "At-home collection allows veterinarians to receive samples directly, helping streamline clinical workflow and save consultation time."
        }
      ]
    },
    catOwner: {
      tag: "For Cat Owners",
      title: "The At-Home Health Monitoring Solution Every Cat Owner Needs",
      desc: "A cat-friendly system that makes at-home urine collection effortless and stress-free. Whether you're monitoring senior cats, tracking a health condition, or being proactive about your cat's wellness, CAT LAB+ gives you a veterinarian-recommended way to collect samples at home.",
      points: [
        {
          title: "Reduce Collection Pressure",
          desc: "Avoid the anxiety of manual methods or vet visits."
        },
        {
          title: "Early Detection Support",
          desc: "Catch health changes before they progress into major conditions."
        },
        {
          title: "Comfort for Your Cat",
          desc: "A gentle, non-invasive sampling approach that offers a more comfortable experience for cats."
        },
        {
          title: "Cost-Effective Monitoring",
          desc: "Reduce unnecessary vet visits while staying informed."
        }
      ]
    },
    comparison: {
      tag: "Feature Comparison",
      title: "Feature Comparison — Dual Benefits",
      desc: "See how CAT LAB+ delivers value to both veterinarians and cat owners",
      headers: {
        feature: "Feature",
        vet: "Veterinary Benefit",
        owner: "Cat Owner Benefit"
      },
      items: [
        {
          title: "Patented Bottom Collection",
          vet: "Pure, uncontaminated samples for accurate testing.",
          owner: "Clean, easy collection without disturbing your cat."
        },
        {
          title: "Hydrophobic Sand Technology",
          vet: "Preserves chemical integrity of urine samples.",
          owner: "Keeps litter completely dry."
        },
        {
          title: "Ultra-Soft Texture",
          vet: "Designed for cats with urinary tract disorders, kidney disease, or lower urinary tract inflammation, helping provide a more comfortable and supportive environment.",
          owner: "Preferred by cats of all ages and health statuses."
        },
        {
          title: "Simple Pull-Up Tray",
          vet: "Consistent sample volume every time.",
          owner: "Intuitive, no messier collection process."
        }
      ]
    },
    careLoop: {
      tag: "Connected Care",
      title: "From Home to Hospital: Seamless Health Management",
      desc: "CAT LAB+ creates a continuous care loop between home and veterinary practice. Owners can monitor their cats proactively, while veterinarians receive better quality samples for diagnosis.",
      nodes: {
        owner: {
          title: "Cat Owner",
          desc: "Monitor at home with ease using the CAT LAB+ collection system"
        },
        catlab: {
          title: "CAT LAB+",
          desc: "Smart collection system that bridges home care and clinical diagnosis"
        },
        vet: {
          title: "Veterinarian",
          desc: "Receive quality samples for accurate professional diagnosis"
        }
      },
      testimonials: [
        {
          quote: "Increase diagnostic accuracy while reducing patient stress. We've seen remarkable improvements from clients who collect at home using CAT LAB+.",
          author: "Dr. Chen",
          role: "Veterinary Surgeon",
          location: "Taoyuan, Taiwan"
        },
        {
          quote: "Take control of your cat's health monitoring with veterinary-grade tools at home. Be prepared for any health changes with a proactive, easy-to-use system.",
          author: "Mrs. Zhang",
          role: "Cat Owner of 3",
          location: "Taichung, Taiwan"
        }
      ]
    },
    cta: {
      tag: "Ready to Get Started?",
      title: "Ready to Transform Cat Health Monitoring?",
      desc: "Choose the plan that fits your needs — whether you're a veterinary professional or a caring cat owner",
      btn: "Contact Us for Consultation",
      card: {
        name: "CAT LAB+",
        highlight: "Hydrophobic Cat Litter",
        desc: "A home-based solution designed to support feline urine collection and health monitoring.",
        bullets: [
          "Veterinary-Approved Precision: Co-developed with veterinary professionals.",
          "Stress-Free for Cats: No invasive collection, natural comfort.",
          "Complete Home Kit: Ready-to-use collection and test materials."
        ]
      }
    },
    faqs: {
      tag: "Got Questions?",
      title: "Frequently Asked Questions",
      desc: "Everything you need to know about CAT LAB+ and how it works",
      items: [
        {
          q: "What is CAT LAB+?",
          a: "The hydrophobic cat litter is specially designed to support stress-free feline urine sampling at home. The non-absorbent granules allow urine to pass through and be collected easily, helping provide a clean and convenient solution for routine urine testing and health monitoring."
        },
        {
          q: "Is CAT LAB+ safe for all cats?",
          a: "This product is specially designed for feline urine collection, with a focus on both safety and comfort. It allows cats to urinate naturally in a familiar environment with minimal stress. Made with non-absorbent, natural, non-toxic granules, the litter does not retain urine, allowing urine to pass through the litter layer for easy collection. At the same time, it helps maintain cats’ original litter box habits, reducing disruption and stress during the sampling process. The gentle texture is designed to be comfortable for cats’ paws and is suitable for at-home urine sampling. When used according to the instructions, this product provides a convenient, low-stress solution for feline urine collection and health monitoring."
        },
        {
          q: "How long does it take for a cat to adapt to the new litter?",
          a: "Every cat adapts at a different pace, and it may take some time for them to become familiar with a new type of litter. For first-time use, it is recommended to replace the litter box contents directly with the hydrophobic sand and place the litter box in a location familiar to your cat. Provide a quiet and comfortable environment, allowing your cat to gradually adjust at their own pace. For more sensitive cats, the adaptation period may vary depending on individual differences."
        },
        {
          q: "Can I use CAT LAB+ for multiple cats?",
          a: "To ensure the accuracy of urine samples, each portion of hydrophobic sand should be used for urine collection from only one cat. If you have multiple cats at home, it is recommended to provide the hydrophobic sand exclusively for the cat being tested and complete the collection separately to avoid sample contamination or mixing."
        },
        {
          q: "How should I store the collected sample before bringing it to the vet?",
          a: "After collection, please seal the sample in the provided collection container and deliver it to your veterinary clinic within 1 hour. If immediate delivery is not possible, refrigerate the sample and do not store it for more than 12 hours. Unless otherwise instructed by your veterinarian, avoid freezing the sample to help maintain sample quality."
        }
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team for clinical partnerships, distributor inquiries, or product information.",
      form: {
        company: "Company name",
        companyPlaceholder: "Enter your company or hospital name",
        name: "Name",
        namePlaceholder: "Enter your contact name",
        telephone: "Telephone",
        telephonePlaceholder: "+886 4 2615 2878",
        email: "Email",
        emailPlaceholder: "example@domain.com",
        address: "Address",
        addressPlaceholder: "Enter your address",
        subject: "Subject",
        subjectOptions: [
          { value: "Product Inquiry", label: "Product Inquiry" },
          { value: "Cross-Industry Collaboration", label: "Cross-Industry Collaboration" },
          { value: "Other Questions", label: "Other Questions" }
        ],
        content: "Content",
        contentPlaceholder: "Write your message or inquiry details here...",
        captcha: "Verification code",
        captchaPlaceholder: "Enter 4-digit code",
        refreshCaptcha: "Refresh",
        required: "*Required",
        submitBtn: "Send Message",
        submitting: "Sending...",
        successMsg: "Thank you for reaching out! Your message has been sent successfully."
      },
      companyInfo: {
        title: "Company",
        producer: "Producer",
        producerValue: "CL Infinite Technology Co., Ltd.",
        address: "No. 3, Lane 598, Section 1, Zhonghang Rd., Shalu Dist., Taichung City, Taiwan",
        hotline: "Customer Service Hotline: +886-4-2615-2878 (9:00 AM – 5:00 PM)",
        email: "Customer Service Email: chloe.chang@clitech.com.tw"
      }
    },
    footer: {
      desc: "Veterinary-approved feline urine collection system providing a stress-free testing experience for animal hospitals and cat parents.",
      rights: "© 2026 CAT LAB+. All rights reserved.",
      companyTitle: "Company"
    },
    pdp: {
      breadcrumb: {
        home: "Home",
        products: "Products",
        current: "CAT LAB+ Hydrophobic Cat Litter Kit"
      },
      badgeCategory: "FOR CATS",
      inStockBadge: "In Stock",
      title: "CAT LAB+ Hydrophobic Cat Litter Kit",
      subtitle: "A home-based solution designed to support feline urine collection and health monitoring. Complete solution for urine collection, storage, and submission — designed for a simple at-home sampling experience.",
      priceAmount: 29.0,
      priceDisplay: "$29.00",
      originalPriceDisplay: "$35.00",
      priceNote: "Single purchase • All-inclusive kit",
      quantityLabel: "Quantity",
      addToCart: "Add to Cart",
      addedToCart: "Added to Cart!",
      buyNow: "Buy Now",
      trustPoints: [
        {
          title: "Veterinary-Approved Precision",
          desc: "Co-developed with veterinary professionals to support a more convenient at-home urine collection experience.",
          icon: "fi-sr-shield-check"
        },
        {
          title: "Stress-Free for Cats",
          desc: "No invasive collection, less cleanup — designed to provide a more natural and comfortable experience for cats.",
          icon: "fi-sr-heart"
        },
        {
          title: "Complete Home Kit",
          desc: "Complete solution for urine collection, storage, and submission — designed for a simple at-home sampling experience.",
          icon: "fi-sr-box"
        }
      ],
      quickHighlights: [
        "100% Non-Absorbent Sand",
        "Veterinary-Approved Precision",
        "Stress-Free Collection",
        "Complete Home Kit"
      ],
      accordions: {
        detailsTitle: "Product Details & What's Included",
        detailsIntro: "A home-based solution designed to support feline urine collection and health monitoring. Complete solution for urine collection, storage, and submission — designed for a simple at-home sampling experience.",
        packageIncludesTitle: "Package Includes",
        packageItems: [
          "1x Hydrophobic Non-Absorbent Sand Pack",
          "1x Waterproof Urine Collection Bag & Cable Strap",
          "1x Cylindrical Volumetric Flask",
          "1x Specimen Collection Tube",
          "1x 10-Parameter Urine Test Strip Foil Pack",
          "1x Standard Diagnostic Color Chart"
        ],
        specsTitle: "Specifications",
        specs: [
          { label: "Product Name", value: "CAT LAB+ Hydrophobic Cat Litter Kit" },
          { label: "Application", value: "At-Home Feline Urine Collection & Health Monitoring" },
          { label: "Litter Material", value: "100% Non-Absorbent, Non-Toxic Granules" },
          { label: "Testing Method", value: "10-Parameter Urine Test Strip & Standard Diagnostic Color Chart" },
          { label: "Target Species", value: "Felines (All Breeds)" },
          { label: "Sample Storage", value: "Refrigerate if not delivered to clinic within 1 hr (max 12 hrs)" }
        ],
        deliveryTitle: "Usage Guidelines & Storage",
        deliveryPoints: [
          "If the urine sample cannot be delivered to a veterinary clinic within 1 hour, store it refrigerated. Do not store for more than 12 hours.",
          "The test strip is intended for in vitro diagnostic use only. Once opened, use within 1 hour.",
          "Ensure the cap of the cylindrical volumetric flask is securely fastened to prevent urine leakage.",
          "Dispose of the sealed waterproof urine collection bag with standard household waste. Do not dispose into sinks or toilets."
        ]
      },
      deepDive: {
        tag: "Clinical Precision",
        title: "Why At-Home Feline Urinalysis Matters",
        desc: "Cats are notorious for hiding pain until urinary conditions become critical. CAT LAB+ enables early screening right from the comfort of home.",
        cards: [
          {
            title: "Catch Conditions Months Earlier",
            desc: "Feline Lower Urinary Tract Disease (FLUTD), kidney disease, and diabetes develop silently. Regular home screening detects microscopic blood and proteins before visible symptoms arise.",
            icon: "fi-sr-microscope"
          },
          {
            title: "Zero-Stress Non-Invasive Collection",
            desc: "Traditional cystocentesis (needle inserted directly into the bladder) can cause severe anxiety and pain for cats. CAT LAB+ allows voluntary, natural urination in their familiar environment.",
            icon: "fi-sr-heart"
          },
          {
            title: "Patented Hydrophobic Capillarity",
            desc: "Ordinary litters absorb urine instantly or alter chemical pH. CAT LAB+'s inert quartz technology maintains natural droplet beads without leaching chemicals or skewing biomarker readings.",
            icon: "fi-sr-raindrops"
          },
          {
            title: "Trusted Vet Clinic Ecosystem",
            desc: "Designed to complement — not replace — veterinary care. Seal the gathered specimen in the provided sterile tube to bring fresh, uncontaminated urine straight to your clinic.",
            icon: "fi-sr-stethoscope"
          }
        ]
      },
      stepsSection: {
        tag: "Visual Step-by-Step",
        title: "How to Collect & Screen in 8 Easy Steps",
        desc: "Follow the veterinarian-recommended protocol to capture clean urine and read 10 biomarkers accurately."
      },
      biomarkersTable: {
        tag: "Diagnostic Guide",
        title: "10 Urine Biomarkers Reference Guide",
        desc: "Understand what each diagnostic reagent pad measures on the CAT LAB+ 10-parameter test strip.",
        headers: {
          parameter: "Biomarker",
          measures: "Clinical Purpose",
          normal: "Healthy Baseline",
          clinical: "Potential Clinical Significance"
        },
        rows: [
          {
            param: "Occult Blood (Hematuria)",
            measures: "Detects intact red blood cells & free hemoglobin",
            normal: "Negative",
            clinical: "Urinary tract infections (UTI), bladder stones (urolithiasis), cystitis, trauma"
          },
          {
            param: "Glucose",
            measures: "Screens for blood sugar threshold overflow",
            normal: "Negative",
            clinical: "Feline diabetes mellitus, severe stress hyperglycemia, renal tubule dysfunction"
          },
          {
            param: "Protein",
            measures: "Measures albumin filtration efficiency in kidneys",
            normal: "Negative to Trace",
            clinical: "Glomerular kidney disease, renal failure, chronic hypertension, lower urinary tract inflammation"
          },
          {
            param: "pH Level",
            measures: "Acid-base balance of cat urine",
            normal: "6.0 – 6.5 (Slightly Acidic)",
            clinical: "Alkaline (>7.0) fosters struvite crystals; Acidic (<6.0) fosters calcium oxalate stones"
          },
          {
            param: "Specific Gravity (SG)",
            measures: "Kidney concentration ability & hydration",
            normal: "1.035 – 1.060",
            clinical: "Low SG (<1.035) indicates early chronic kidney disease (CKD) or diabetes insipidus"
          },
          {
            param: "Ketones",
            measures: "Fat breakdown byproducts in bloodstream",
            normal: "Negative",
            clinical: "Diabetic ketoacidosis (DKA), prolonged fasting, hepatic lipidosis"
          },
          {
            param: "Bilirubin",
            measures: "Hemoglobin degradation byproduct",
            normal: "Negative",
            clinical: "Hepatic dysfunction, biliary duct obstruction, hemolytic anemia"
          },
          {
            param: "Urobilinogen",
            measures: "Intestinal bacterial byproduct of bilirubin",
            normal: "0.2 – 1.0 mg/dL",
            clinical: "Liver parenchyma damage, hepatitis, acute hemolysis"
          },
          {
            param: "Nitrite",
            measures: "Conversion of dietary nitrates by bacteria",
            normal: "Negative",
            clinical: "Bacterial colonization and active urinary tract infection"
          },
          {
            param: "Leukocytes",
            measures: "White blood cell esterase activity",
            normal: "Negative",
            clinical: "Infection, bacterial cystitis, urinary inflammation or immune activation"
          }
        ]
      },
      faq: {
        tag: "Product FAQs",
        title: "Frequently Asked Questions",
        desc: "Everything you need to know about using CAT LAB+ at home for your feline.",
        items: [
          {
            q: "What does the CAT LAB+ testing kit contain?",
            a: "Each kit includes 300g of patented hydrophobic sand, 1 waterproof collection liner with cable strap, 1 volumetric flask & pipette, 1 sterile specimen collection vial with leakproof seal, 1 sealed 10-parameter diagnostic test strip, and 1 standard clinical color reference card."
          },
          {
            q: "How does the hydrophobic sand work without absorbing urine?",
            a: "CAT LAB+ is engineered with a proprietary biocompatible hydrophobic surface coating that increases water surface tension. Urine naturally beads up and rests on the grains like droplets on a freshly waxed car, preventing absorption and keeping the sample chemically pristine."
          },
          {
            q: "When is the best time of day to test my cat's urine?",
            a: "The first morning urine is generally the most concentrated and provides the most consistent baseline for testing parameters such as specific gravity, protein, and glucose. However, sample collection can be done whenever your cat naturally uses the litter box."
          },
          {
            q: "Does at-home testing replace a professional veterinary visit?",
            a: "No. CAT LAB+ is an at-home screening and non-invasive sample collection aid. If test pads show abnormal coloration or your cat exhibits symptoms (straining, frequent litter box visits, crying while urinating), promptly bring the collected sample in the provided vial to your licensed veterinarian for formal diagnosis."
          },
          {
            q: "How quickly do I need to read the test strip results?",
            a: "Submerge the test strip in urine for 2 seconds, remove excess liquid, and read the colors within 30 to 60 seconds. Do not wait longer than 2 minutes, as exposure to ambient air will cause further oxidation and alter pad coloration."
          },
          {
            q: "How do I safely dispose of the used sand and collection bag?",
            a: "Once you have completed your test and safely transferred any required samples into the collection tube, seal the waterproof liner with the included cable strap and dispose of it in standard household municipal garbage. The silica minerals are non-toxic and environmentally benign."
          }
        ]
      },
      directCheckout: {
        modalTitle: "Quick Express Checkout",
        stepSummary: "Order Summary",
        stepForm: "Shipping Information",
        kitName: "CAT LAB+ Hydrophobic Cat Litter Kit",
        quantity: "Qty",
        price: "Price",
        shipping: "Standard Delivery",
        freeShipping: "Free Shipping",
        total: "Total Due",
        nameLabel: "Recipient Full Name",
        namePlaceholder: "e.g., Sarah Johnson",
        phoneLabel: "Phone Number",
        phonePlaceholder: "+1 (555) 000-0000",
        emailLabel: "Email Address",
        emailPlaceholder: "sarah@example.com",
        addressLabel: "Delivery Address",
        addressPlaceholder: "Street, Apt, City, State, Postal Code",
        notesLabel: "Delivery Instructions (Optional)",
        notesPlaceholder: "Leave at front door, gate code, etc.",
        submitBtn: "Complete Order",
        submittingBtn: "Processing Order...",
        successTitle: "Order Confirmed!",
        successDesc: "Thank you for your order. We have received your express request and will dispatch your CAT LAB+ kit within 24 hours.",
        orderIdLabel: "Order Reference Number",
        closeBtn: "Done"
      }
    }
  },
  zh: {
    nav: {
      product: "產品介紹",
      instructions: "使用說明",
      features: "專業認可",
      benefits: "雙重優勢",
      faqs: "常見問題",
      contact: "聯絡我們",
      consultation: "免費諮詢"
    },
    hero: {
      badge: "受到越來越多獸醫的信賴",
      titleLine1: "獸醫認可的",
      titleLine2: "尿液收集系統",
      description: "受到亞洲各地獸醫信賴、動物醫院採用，以及貓主人的喜愛 — CAT LAB+ 提供診所級別的無壓力尿液採集方法，與任何診斷流程無縫融合。",
      consultationBtn: "免費諮詢",
      howItWorksBtn: "使用流程",
      stats: {
        vetsCount: "1,200+",
        vetsLabel: "合作動物醫院",
        stressFree: "99.8%",
        stressFreeLabel: "無壓力採集體驗",
        sandTech: "100%",
        sandTechLabel: "疏水不吸收貓砂"
      }
    },
    ticker: [
      "獸醫認可",
      "無壓力採集",
      "專利技術",
      "受到更多貓家庭選擇",
      "支持日常健康照護",
      "獸醫專業人士信賴",
      "專業品質，可靠採樣體驗",
      "拓展全球市場"
    ],
    product: {
      sectionTag: "我們的產品",
      title: "CAT LAB+",
      subtitle: "疏水性貓砂",
      desc: "為支持貓咪尿液採集與健康監測而設計的居家解決方案。",
      features: [
        {
          title: "獸醫認可的精度",
          desc: "與獸醫專業人士共同開發，支持更便利的居家尿液採集體驗。",
          icon: "shield"
        },
        {
          title: "貓咪零壓力",
          desc: "無創採集、減少清理——為貓咪提供更自然、更舒適的體驗。",
          icon: "heart"
        },
        {
          title: "完整家庭套裝",
          desc: "尿液採集、儲存與送檢的完整解決方案——為簡單的居家採集體驗而設計。",
          icon: "box"
        }
      ],
      packageIncludes: "包裝內容",
      packageItems: [
        "1x 疏水性無吸收顆粒貓砂包",
        "1x 防水尿液收集袋與束帶",
        "1x 圓柱量瓶",
        "1x 樣本收集管",
        "1x 10項尿液檢測試紙鋁箔包",
        "1x 專業標準比色卡"
      ]
    },
    video: {
      tag: "產品演示",
      title: "觀看 CAT LAB+ 的實際效果",
      desc: "看看 CAT LAB+ 如何讓您和您的貓咪的尿液收集變得輕鬆自如。",
      badges: ["專利技術", "受到更多動物愛好者的選擇", "臨床驗證"]
    },
    instructions: {
      tag: "簡單流程",
      title: "使用說明",
      desc: "從更換貓砂到專業診斷，八個簡單步驟。",
      steps: [
        {
          step: 1,
          title: "準備貓砂盆",
          desc: "將防水尿液收集袋平鋪並固定於原有貓砂盆內，或直接覆蓋於現有貓砂表面。",
          image: "/images/step-1.webp"
        },
        {
          step: 2,
          title: "添加 CAT LAB+",
          desc: "將疏水貓砂倒入防水尿液收集袋中，均勻鋪平以形成均勻的貓砂層。",
          image: "/images/step-2.webp"
        },
        {
          step: 3,
          title: "收集尿液樣本",
          desc: "讓貓咪在疏水貓砂層上排尿。為確保採集準確，請將受檢貓咪與其他貓咪分開，以免樣本混淆。",
          image: "/images/step-3.webp"
        },
        {
          step: 4,
          title: "收集尿液收集袋",
          desc: "貓咪排尿後，提起防水尿液收集袋並輕搖，使尿液流向收集口。使用附帶的束帶將袋口密封。",
          image: "/images/step-4.webp"
        },
        {
          step: 5,
          title: "轉移並量測尿液樣本",
          desc: "將收集口對準圓柱量瓶開口，讓尿液流入瓶中。準確記錄總尿量。然後小心地將量瓶中的尿液轉移至樣本收集管中。",
          image: "/images/step-5.webp"
        },
        {
          step: 6,
          title: "進行尿液檢測",
          desc: "打開鋁箔袋並取出10項尿液檢測試紙。請勿觸碰檢測區。將試紙完全浸入尿液樣本約10秒後取出。開封後請於1小時內使用。",
          image: "/images/step-6.webp"
        },
        {
          step: 7,
          title: "移除多餘尿液",
          desc: "利用樣本收集管開口邊緣，輕輕刮除試紙上多餘的尿液。",
          image: "/images/step-7.webp"
        },
        {
          step: 8,
          title: "與比色卡對照",
          desc: "將檢測結果與包裝內附的比色卡對照。判讀時請保持試紙水平，以免相鄰檢測區互相干擾。您也可以拍攝試紙照片進行數位判讀。",
          image: "/images/step-8.webp"
        }
      ],
      noticeTitle: "重要說明",
      noticePoints: [
        "若檢測結果顯示異常，或您的貓咪出現頻尿、排尿困難、血尿或精神不振等症狀，請立即諮詢獸醫以進一步檢查與專業評估。",
        "檢測結果僅應作為獸醫評估的一部分。必要時，請將尿液樣本與您的寵物送往獸醫診所以進一步檢查。本試紙僅供體外診斷使用。",
        "本產品提供的檢測結果僅供日常健康監測與居家觀察之用，不應作為疾病診斷或治療決策的唯一依據。",
        "請確保圓柱量瓶的瓶蓋已鎖緊，以防止尿液滲漏。",
        "尿液顏色可能因生理狀況或藥物影響而有所不同。請諮詢獸醫以獲得專業判讀。",
        "若無法在 1 小時內送達獸醫診所，請將尿液樣本冷藏保存。請勿保存超過 12 小時。"
      ],
      disposalTitle: "廢棄物處理",
      disposalPoints: [
        {
          step: 1,
          title: "處理使用過的貓砂與廢棄物",
          desc: "請將防水尿液收集袋、使用過的疏水貓砂與廢棄物一同密封後再行丟棄。"
        },
        {
          step: 2,
          title: "清理與丟棄",
          desc: "請將密封後的防水尿液收集袋作為一般家庭廢棄物丟棄。請勿將疏水貓砂或廢棄物直接倒入水槽或馬桶，以維護環境衛生。"
        }
      ]
    },
    veterinary: {
      tag: "專為獸醫",
      title: "深受獸醫專業人士信賴",
      desc: "以臨床需求為設計基礎。CAT LAB+ 讓居家尿液採集更加便利。疏水貓砂有助於採集更潔淨的尿液樣本，作為初步檢測與健康監測的輔助工具，同時減少傳統採集方式的不便。",
      points: [
        {
          title: "可靠的樣本採集品質",
          desc: "無創採集方式有助於降低外部污染風險，支持取得適合分析的尿液樣本。"
        },
        {
          title: "減少患者應激",
          desc: "在許多情況下，採集時無需鎮靜或人工保定。"
        },
        {
          title: "提高客戶依從性",
          desc: "更舒適的居家採集體驗可能有助於鼓勵主人參與寵物的健康監測。"
        },
        {
          title: "提升診所效率",
          desc: "簡化尿液採集流程，並支持獸醫進行後續評估。"
        }
      ]
    },
    catOwner: {
      tag: "專為貓主人",
      title: "每位貓主人都需要的居家健康監測解決方案",
      desc: "專為貓咪設計的系統，讓居家尿液採集變得輕鬆無壓力。無論您是在監測老年貓、追蹤健康狀況，還是積極關注貓咪健康，CAT LAB+ 都為您提供獸醫推薦的居家採集方式。",
      points: [
        {
          title: "減少採集壓力",
          desc: "避免手動方法或就診帶來的焦慮。"
        },
        {
          title: "早期偵測支援",
          desc: "在健康變化惡化為重大病症之前及早發現。"
        },
        {
          title: "貓咪的舒適",
          desc: "溫和、無創的採集方式，為貓咪提供更舒適的體驗。"
        },
        {
          title: "經濟實惠的監測",
          desc: "在保持掌握健康狀況的同時減少不必要的就診次數。"
        }
      ]
    },
    comparison: {
      tag: "功能對比",
      title: "功能對比 — 雙重優勢",
      desc: "了解 CAT LAB+ 如何為獸醫和貓主人雙方創造價值",
      headers: {
        feature: "功能",
        vet: "獸醫益處",
        owner: "貓主人益處"
      },
      items: [
        {
          title: "專利底部收集",
          vet: "純淨、未受污染的樣本，確保檢測準確。",
          owner: "清潔、簡便的採集，不打擾貓咪。"
        },
        {
          title: "疏水砂技術",
          vet: "保持尿液樣本的化學完整性。",
          owner: "貓砂保持完全乾燥。"
        },
        {
          title: "超柔觸感",
          vet: "專為泌尿道疾病、腎臟疾病或下泌尿道發炎的貓咪設計，提供更舒適且支持性的體驗。",
          owner: "各年齡、各健康狀態的貓咪均喜愛。"
        },
        {
          title: "簡易提拉托盤",
          vet: "每次採集量穩定一致。",
          owner: "直觀操作，採集過程更整潔。"
        }
      ]
    },
    careLoop: {
      tag: "連接護理",
      title: "從家到醫院：無縫健康管理",
      desc: "CAT LAB+ 在家庭與獸醫診所之間建立了持續的護理閉環。主人可以主動監測貓咪健康，獸醫也能收到更高品質的樣本進行診斷。",
      nodes: {
        owner: {
          title: "貓主人",
          desc: "使用 CAT LAB+ 採集系統輕鬆居家監測"
        },
        catlab: {
          title: "CAT LAB+",
          desc: "連接居家護理與臨床診斷的智能採集系統"
        },
        vet: {
          title: "獸醫",
          desc: "接收高品質樣本，進行精準專業診斷"
        }
      },
      testimonials: [
        {
          quote: "在減少患者應激的同時提高診斷準確率。我們看到使用 CAT LAB+ 在家採集的客戶取得了顯著改善。",
          author: "陳醫生",
          role: "主治獸醫師",
          location: "桃園，台灣"
        },
        {
          quote: "掌控您貓咪的健康監測，在家使用獸醫級工具。隨時準備好應對任何健康變化，使用簡單易用的主動監測系統。",
          author: "張女士",
          role: "3隻貓的飼主",
          location: "台中，台灣"
        }
      ]
    },
    cta: {
      tag: "準備開始了嗎？",
      title: "準備好改變貓咪健康監測了嗎？",
      desc: "選擇適合您需求的方案——無論您是獸醫專業人員還是細心的貓主人",
      btn: "聯絡我們諮詢方案",
      card: {
        name: "CAT LAB+",
        highlight: "疏水性貓砂",
        desc: "為支持貓咪尿液採集與健康監測而設計的居家解決方案。",
        bullets: [
          "獸醫認可的精度：與專業獸醫臨床合作研發",
          "貓咪零壓力：非侵入式採集，維持自然習慣",
          "完整家庭套裝：開箱即用的採集與檢測工具"
        ]
      }
    },
    faqs: {
      tag: "有問題嗎？",
      title: "常見問題",
      desc: "關於 CAT LAB+ 及其使用方法的一切您需要了解的資訊",
      items: [
        {
          q: "什麼是 CAT LAB+？",
          a: "這款疏水性貓砂專為支持居家、無壓力的貓咪尿液採樣而設計。無吸收性顆粒讓尿液能輕鬆穿過並被收集，為日常尿液檢測與健康監測提供乾淨、方便的解決方案。"
        },
        {
          q: "CAT LAB+ 對所有貓咪都安全嗎？",
          a: "本產品專為貓咪尿液採集而設計，兼顧安全與舒適。它可讓貓咪在熟悉的環境中自然排尿，壓力最小。採用無吸收性、天然無毒顆粒，貓砂不會吸收尿液，使尿液通過貓砂層便於收集。同時，它可維持貓咪原有的貓砂習慣，減少干擾與壓力。溫和質地適合貓咪的爪子，適用於居家尿液採集。按照使用說明，本產品提供方便、低壓力的尿液採集與健康監測方案。"
        },
        {
          q: "貓咪需要多長時間適應新貓砂？",
          a: "每隻貓咪適應的速度不同，可能需要一些時間才能熟悉新型貓砂。首次使用時，建議直接以疏水貓砂替換貓砂盆內容物，並將貓砂盆放置於貓咪熟悉的位置。提供安靜舒適的環境，讓貓咪依自己的步調逐漸適應。對於較敏感的貓咪，適應期可能因個體差異而有所不同。"
        },
        {
          q: "我可以為多隻貓咪使用 CAT LAB+ 嗎？",
          a: "為確保尿液樣本的準確性，每一份疏水貓砂應僅供一隻貓咪採集尿液使用。若家中有多隻貓咪，建議將疏水貓砂專門提供給受檢貓咪，並分別完成採集，以避免樣本污染或混淆。"
        },
        {
          q: "送往獸醫前，如何儲存已採集的樣本？",
          a: "採集後，請將樣本密封於提供的收集容器中，並於 1 小時內送達您的獸醫診所。若無法立即送達，請將樣本冷藏保存，且勿保存超過 12 小時。除非獸醫另有指示，否則請避免冷凍樣本，以維持樣本品質。"
        }
      ]
    },
    contact: {
      title: "聯絡我們",
      subtitle: "歡迎與我們的團隊聯繫，了解臨床合作、經銷商諮詢或產品詳情。",
      form: {
        company: "公司名稱",
        companyPlaceholder: "請輸入您的公司或動物醫院名稱",
        name: "姓名",
        namePlaceholder: "請輸入聯絡人姓名",
        telephone: "電話號碼",
        telephonePlaceholder: "+886 4 2615 2878",
        email: "電子郵件",
        emailPlaceholder: "example@domain.com",
        address: "地址",
        addressPlaceholder: "請輸入聯絡地址",
        subject: "主旨",
        subjectOptions: [
          { value: "Product Inquiry", label: "產品諮詢" },
          { value: "Cross-Industry Collaboration", label: "異業合作" },
          { value: "Other Questions", label: "其他問題" }
        ],
        content: "諮詢內容",
        contentPlaceholder: "請在此輸入您的留言或諮詢詳情...",
        captcha: "驗證碼",
        captchaPlaceholder: "請輸入 4 位驗證碼",
        refreshCaptcha: "換一張",
        required: "*必填",
        submitBtn: "送出訊息",
        submitting: "送出中...",
        successMsg: "感謝您的來信！我們已收到您的訊息，將儘快與您聯繫。"
      },
      companyInfo: {
        title: "公司資訊",
        producer: "製造商",
        producerValue: "智聯無穹科技股份有限公司 (CL Infinite Technology Co., Ltd.)",
        address: "台中市沙鹿區中航路一段598巷3號",
        hotline: "客服專線: +886-4-2615-2878 (週一至週五 9:00 AM – 5:00 PM)",
        email: "客服信箱: chloe.chang@clitech.com.tw"
      }
    },
    footer: {
      desc: "獸醫認可的貓咪尿液採集系統，為動物醫院與飼主提供無壓力、純淨可靠的檢測體驗。",
      rights: "© 2026 CAT LAB+. 版權所有。",
      companyTitle: "公司"
    },
    pdp: {
      breadcrumb: {
        home: "首頁",
        products: "產品專區",
        current: "CAT LAB+ 疏水性貓砂採集套裝"
      },
      badgeCategory: "FOR CATS",
      inStockBadge: "現貨在庫",
      title: "CAT LAB+ 疏水性貓砂採集套裝",
      subtitle: "為支持貓咪尿液採集與健康監測而設計的居家解決方案。尿液採集、儲存與送檢的完整解決方案——為簡單的居家採集體驗而設計。",
      priceAmount: 890,
      priceDisplay: "NT$ 890",
      originalPriceDisplay: "NT$ 1,080",
      priceNote: "單盒全配完整套裝 • 內含10項試紙 • 已含稅",
      quantityLabel: "購買數量",
      addToCart: "加入購物車",
      addedToCart: "已成功加入購物車！",
      buyNow: "立即購買",
      trustPoints: [
        {
          title: "獸醫認可的精度",
          desc: "與獸醫專業人士共同開發，支持更便利的居家尿液採集體驗。",
          icon: "fi-sr-shield-check"
        },
        {
          title: "貓咪零壓力",
          desc: "無創採集、減少清理——為貓咪提供更自然、更舒適的體驗。",
          icon: "fi-sr-heart"
        },
        {
          title: "完整家庭套裝",
          desc: "尿液採集、儲存與送檢的完整解決方案——為簡單的居家採集體驗而設計。",
          icon: "fi-sr-box"
        }
      ],
      quickHighlights: [
        "100% 疏水性無吸收顆粒貓砂",
        "獸醫認可的精度",
        "貓咪零壓力",
        "完整家庭套裝"
      ],
      accordions: {
        detailsTitle: "產品規格與完整包裝內容",
        detailsIntro: "為支持貓咪尿液採集與健康監測而設計的居家解決方案。尿液採集、儲存與送檢的完整解決方案——為簡單的居家採集體驗而設計。",
        packageIncludesTitle: "包裝內容",
        packageItems: [
          "1x 疏水性無吸收顆粒貓砂包",
          "1x 防水尿液收集袋與束帶",
          "1x 圓柱量瓶",
          "1x 樣本收集管",
          "1x 10項尿液檢測試紙鋁箔包",
          "1x 專業標準比色卡"
        ],
        specsTitle: "詳細規格參數",
        specs: [
          { label: "產品名稱", value: "CAT LAB+ 疏水性貓砂採集套裝" },
          { label: "適用對象", value: "貓咪居家尿液採集與日常健康監測 (全品種適用)" },
          { label: "貓砂材質", value: "100% 疏水性無吸收無毒顆粒" },
          { label: "檢測方式", value: "10項尿液檢測試紙與專業標準比色卡" },
          { label: "適用物種", value: "貓咪 (全年齡與品種)" },
          { label: "樣本保存", value: "若無法在1小時內送達診所請冷藏保存（不超過12小時）" }
        ],
        deliveryTitle: "使用規範與保存方式",
        deliveryPoints: [
          "若無法在 1 小時內送達獸醫診所，請將尿液樣本冷藏保存。請勿保存超過 12 小時。",
          "本試紙僅供體外診斷使用。開封後請於 1 小時內使用完畢。",
          "請確保圓柱量瓶的瓶蓋已鎖緊，以防止尿液滲漏。",
          "請將密封後的防水尿液收集袋作為一般家庭廢棄物丟棄。請勿將疏水貓砂或廢棄物直接倒入水槽或馬桶。"
        ]
      },
      deepDive: {
        tag: "臨床專業優勢",
        title: "為什麼居家尿液篩檢如此重要？",
        desc: "貓咪天生善於隱忍疼痛，泌尿與腎臟疾病往往在初期沒有顯著外在徵兆。CAT LAB+ 讓飼主能及早發現微小變化。",
        cards: [
          {
            title: "提前數月發現潛在病徵",
            desc: "貓下泌尿道疾病 (FLUTD)、慢性腎病與糖尿病通常是漸進發展。定期居家篩檢能在肉眼無法看見症狀前檢測出微量潛血與尿蛋白。",
            icon: "fi-sr-microscope"
          },
          {
            title: "完全無創零緊迫採樣",
            desc: "傳統膀胱穿刺需要將長針直接扎入腹腔膀胱，常導致貓咪強烈掙扎與心理創傷。CAT LAB+ 讓貓咪在熟悉的砂盆中自然排尿，毫無恐懼。",
            icon: "fi-sr-heart"
          },
          {
            title: "專利疏水砂毛細水滴科技",
            desc: "普通貓砂會吸收尿液或改變化學酸鹼度。CAT LAB+ 惰性石英表面處理能將尿液維持在表面純淨水珠狀態，不釋放化學物質，確保檢體絕對純淨。",
            icon: "fi-sr-raindrops"
          },
          {
            title: "無縫銜接動物醫院臨床診斷",
            desc: "本產品並非取代專業獸醫，而是最佳的臨床輔助。將採集好的新鮮樣本放入無菌試管密封，可直接送至信任的動物醫院進一步做沉渣鏡檢與細菌培養。",
            icon: "fi-sr-stethoscope"
          }
        ]
      },
      stepsSection: {
        tag: "圖解操作",
        title: "簡單8步驟，輕鬆完成居家採尿與比對",
        desc: "遵循獸醫師推薦的標準採集流程，確保檢體純淨與檢測結果準確。"
      },
      biomarkersTable: {
        tag: "臨床指南",
        title: "10項尿液生化指標臨床對照表",
        desc: "深入了解 CAT LAB+ 10項檢測試紙上各個化學反應區所代表的生理意義。",
        headers: {
          parameter: "生化指標",
          measures: "檢測目的與物質",
          normal: "健康正常範圍",
          clinical: "異常時可能之臨床意義"
        },
        rows: [
          {
            param: "潛血 / 隱血 (Occult Blood)",
            measures: "檢測尿液中紅血球與游離血紅素",
            normal: "陰性 (-)",
            clinical: "泌尿道感染 (UTI)、膀胱結石、自發性膀胱炎、外傷出血"
          },
          {
            param: "葡萄糖 (Glucose)",
            measures: "篩檢血糖是否超過腎閾值",
            normal: "陰性 (-)",
            clinical: "貓糖尿病、高度緊迫性高血糖、腎小管重吸收功能受損"
          },
          {
            param: "蛋白質 (Protein)",
            measures: "測量白蛋白等蛋白質過濾濾漏",
            normal: "陰性至微量",
            clinical: "腎絲球腎病、慢性腎臟病 (CKD)、高血壓或下泌尿道炎症"
          },
          {
            param: "酸鹼值 (pH)",
            measures: "尿液酸鹼平衡狀態",
            normal: "6.0 – 6.5 (弱酸性)",
            clinical: "偏鹼 (>7.0) 易生成鳥糞石結晶；偏酸 (<6.0) 易生成草酸鈣結石"
          },
          {
            param: "尿比重 (SG)",
            measures: "評估腎臟濃縮尿液能力與水分狀態",
            normal: "1.035 – 1.060",
            clinical: "比重偏低 (<1.035) 為早期慢性腎功能不全或尿崩症之警訊"
          },
          {
            param: "酮體 (Ketones)",
            measures: "體內脂肪不完全代謝之產物",
            normal: "陰性 (-)",
            clinical: "糖尿病酮酸中毒 (DKA)、長期絕食飢餓、脂肪肝"
          },
          {
            param: "膽紅素 (Bilirubin)",
            measures: "血紅素分解代謝副產物",
            normal: "陰性 (-)",
            clinical: "肝實質損傷、膽管阻塞疾病、溶血性貧血"
          },
          {
            param: "尿膽素原 (Urobilinogen)",
            measures: "腸道細菌轉化之膽紅素產物",
            normal: "0.2 – 1.0 mg/dL",
            clinical: "肝臟疾病、肝炎、急性溶血性疾病"
          },
          {
            param: "亞硝酸鹽 (Nitrite)",
            measures: "革蘭氏陰性細菌將硝酸鹽還原之反應",
            normal: "陰性 (-)",
            clinical: "泌尿道細菌增生感染"
          },
          {
            param: "白血球 (Leukocytes)",
            measures: "白血球酯酶活性反應",
            normal: "陰性 (-)",
            clinical: "泌尿道發炎、膀胱炎、細菌感染引發之免疫反應"
          }
        ]
      },
      faq: {
        tag: "常見問答",
        title: "常見問題與解答",
        desc: "關於 CAT LAB+ 居家採樣與試紙檢測的實用問答指南。",
        items: [
          {
            q: "CAT LAB+ 檢測套裝內包含哪些配件？",
            a: "每盒完整套裝內含：300g專利疏水礦砂、1份防水採尿襯墊與固定束帶、1個刻度量瓶與採樣滴管、1支防漏密封檢體試管、1包10項檢測試紙（防潮鋁箔封裝），以及1張專業標準比色卡。"
          },
          {
            q: "專利疏水砂是如何做到不吸水、讓尿液浮在表面的？",
            a: "CAT LAB+ 採用專利生物相容改性技術處理天然石英礦砂，大幅提升表面張力與疏水角度。當貓咪排尿時，尿液無法滲入顆粒內部，而是如荷葉上的露珠般匯聚成清澈水滴，使檢體保持100%未被污染的原生狀態。"
          },
          {
            q: "一天當中什麼時候採集尿液最理想？",
            a: "早晨排出的第一泡尿液通常濃度最高、指標最為穩定，最適合用於評估尿比重、尿蛋白與葡萄糖等指標。不過，若日常觀察貓咪排尿，任何時間收集到的新鮮尿液皆具有重要參考價值。"
          },
          {
            q: "這款居家套裝能直接取代獸醫臨床診斷嗎？",
            a: "不能。CAT LAB+ 定位為非侵入式居家初步篩檢與採樣輔助工具。若試紙顯示異常，或貓咪出現頻繁如廁、排尿困難、滴尿、血尿或精神萎靡等症狀，請務必將密封試管中的尿液檢體與貓咪一同帶至動物醫院，由主治獸醫師進行全套尿檢與診斷。"
          },
          {
            q: "浸入試紙後多久之內必須判讀比對色卡？",
            a: "請將試紙完全浸入尿液2秒後取出，用紙巾輕吸邊緣多餘尿液，並在 30 至 60 秒內完成色卡比對。請勿超過 2 分鐘判讀，以免空氣氧化造成反應區變色而影響準確度。"
          },
          {
            q: "使用完的疏水砂與採集包應如何處理？",
            a: "採樣完成後，使用附帶的束帶將防水襯墊束緊密封，直接作為一般家庭生活垃圾丟棄即可。天然二氧化矽成分環保無毒，符合環境保護規範。"
          }
        ]
      },
      directCheckout: {
        modalTitle: "快速直接購買",
        stepSummary: "訂單明細",
        stepForm: "收件人資料",
        kitName: "CAT LAB+ 居家疏水性貓砂尿液採集與檢測套裝",
        quantity: "數量",
        price: "單價",
        shipping: "配送方式",
        freeShipping: "免運費",
        total: "結帳總額",
        nameLabel: "收件人姓名",
        namePlaceholder: "請輸入真實姓名（例：王小明）",
        phoneLabel: "聯絡手機",
        phonePlaceholder: "0912-345-678",
        emailLabel: "電子信箱",
        emailPlaceholder: "yourname@example.com",
        addressLabel: "收件地址",
        addressPlaceholder: "請填寫縣市、市區鄉鎮、路街巷弄及樓層",
        notesLabel: "配送備註 (選填)",
        notesPlaceholder: "例如：管理室代收、送達前請先電聯等",
        submitBtn: "立即送出訂單",
        submittingBtn: "訂單處理中...",
        successTitle: "訂購成功！",
        successDesc: "感謝您的訂購！我們已收到您的快速購買需求，CAT LAB+ 套裝將於24小時內為您迅速包裝出貨。",
        orderIdLabel: "訂單編號",
        closeBtn: "完成"
      }
    }
  }
};
