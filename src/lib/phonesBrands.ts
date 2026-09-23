// Clean Phone, Tablet, Smartwatch & Mobile Accessory Brands Catalog (Names Only, No Models)

export type TechBrand = {
  name: string;
  category: string[];
  popular?: boolean;
  tier?: "Flagship" | "Mid-Range" | "Budget" | "Accessories" | "Wearables";
};

export const PHONE_TABLET_BRANDS: TechBrand[] = [
  // ==========================================
  // TOP SMARTPHONE & TABLET BRANDS
  // ==========================================
  { name: "Apple", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Flagship" },
  { name: "Samsung", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Flagship" },
  { name: "Google", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Flagship" },
  { name: "Tecno", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "Infinix", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "Xiaomi", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "Redmi", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "POCO", category: ["Mobile Phones", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "itel", category: ["Mobile Phones", "Tablets", "Accessories"], popular: true, tier: "Budget" },
  { name: "Oppo", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "Vivo", category: ["Mobile Phones", "Smartwatches", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "OnePlus", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Flagship" },
  { name: "Huawei", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Flagship" },
  { name: "Honor", category: ["Mobile Phones", "Tablets", "Smartwatches"], popular: true, tier: "Mid-Range" },
  { name: "Realme", category: ["Mobile Phones", "Tablets", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "Motorola", category: ["Mobile Phones", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "Sony", category: ["Mobile Phones", "Accessories"], popular: true, tier: "Flagship" },
  { name: "Nokia", category: ["Mobile Phones", "Tablets", "Accessories"], popular: true, tier: "Budget" },
  { name: "Nothing", category: ["Mobile Phones", "Smartwatches", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "Asus", category: ["Tablets", "Mobile Phones"], popular: false, tier: "Flagship" },
  { name: "Lenovo", category: ["Tablets", "Accessories"], popular: true, tier: "Mid-Range" },
  { name: "Amazon", category: ["Tablets"], popular: true, tier: "Budget" },
  { name: "Microsoft", category: ["Tablets", "Accessories"], popular: true, tier: "Flagship" },
  { name: "Teclast", category: ["Tablets"], popular: false, tier: "Budget" },
  { name: "Blackview", category: ["Tablets", "Mobile Phones"], popular: false, tier: "Budget" },
  { name: "Chuwi", category: ["Tablets"], popular: false, tier: "Budget" },
  { name: "Alcatel", category: ["Tablets", "Mobile Phones"], popular: false, tier: "Budget" },
  { name: "ZTE", category: ["Mobile Phones", "Tablets"], popular: false, tier: "Mid-Range" },
  { name: "Nubia", category: ["Mobile Phones", "Tablets"], popular: false, tier: "Mid-Range" },
  { name: "Oukitel", category: ["Mobile Phones", "Tablets"], popular: false, tier: "Budget" },
  { name: "Ulefone", category: ["Mobile Phones", "Tablets"], popular: false, tier: "Budget" },
  { name: "Doogee", category: ["Mobile Phones", "Tablets"], popular: false, tier: "Budget" },
  { name: "Modio", category: ["Tablets"], popular: true, tier: "Budget" },
  { name: "Atouch", category: ["Tablets"], popular: true, tier: "Budget" },
  { name: "Bebe", category: ["Tablets"], popular: true, tier: "Budget" },
  { name: "W&O", category: ["Tablets"], popular: false, tier: "Budget" },

  // ==========================================
  // WEARABLES & SMARTWATCHES BRANDS
  // ==========================================
  { name: "Garmin", category: ["Smartwatches"], popular: true, tier: "Wearables" },
  { name: "Amazfit", category: ["Smartwatches"], popular: true, tier: "Wearables" },
  { name: "Fitbit", category: ["Smartwatches"], popular: true, tier: "Wearables" },
  { name: "Oraimo", category: ["Smartwatches", "Accessories"], popular: true, tier: "Wearables" },
  { name: "Kieslect", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "Haylou", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "Boat", category: ["Smartwatches", "Accessories"], popular: false, tier: "Wearables" },
  { name: "Noise", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "Fire-Boltt", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "Hoco", category: ["Smartwatches", "Accessories"], popular: false, tier: "Wearables" },
  { name: "Colmi", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "Zeblaze", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "Fossil", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "TicWatch", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "Suunto", category: ["Smartwatches"], popular: false, tier: "Wearables" },
  { name: "Polar", category: ["Smartwatches"], popular: false, tier: "Wearables" },

  // ==========================================
  // ACCESSORIES, AUDIO & POWER BRANDS
  // ==========================================
  { name: "Anker", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Soundcore", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Baseus", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Joyroom", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Remax", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "LDNIO", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "UGREEN", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Belkin", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "JBL", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Beats", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Bose", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Sennheiser", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Skullcandy", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Romoss", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Awei", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Zealot", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Spigen", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "OtterBox", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "UAG", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "ESR", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Pitaka", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Ringke", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Torras", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "SanDisk", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Kingston", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Zendure", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Shargeek", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Mcdodo", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "USAMS", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Budi", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Celebrat", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Earldom", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Yesido", category: ["Accessories"], popular: true, tier: "Accessories" },
  { name: "Borofone", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Dudao", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Riversong", category: ["Accessories"], popular: false, tier: "Accessories" },
  { name: "Generic", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, tier: "Budget" },
];
