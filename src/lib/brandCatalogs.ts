// Comprehensive Brand Catalogs across all marketplace categories
// Featuring Nigerian (🇳🇬), African (🌍), Celebrity (🌟), and Global (🌐) brands

export type BrandOrigin = "Nigerian" | "African" | "Celebrity" | "Global";

export type BrandItem = {
  name: string;
  category?: string[];
  popular?: boolean;
  origin?: BrandOrigin;
  tier?: string;
};

// ============================================================================
// 1. VEHICLE & AUTOMOTIVE BRANDS
// ============================================================================
export const VEHICLE_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands & Assemblers
  { name: "Innoson (IVM)", category: ["Automobiles", "Buses & Commercial Vans", "Haulage Trucks & Trailers", "Heavy Duty & Plant Machinery"], popular: true, origin: "Nigerian" },
  { name: "Nord Motion", category: ["Automobiles", "Buses & Commercial Vans"], popular: true, origin: "Nigerian" },
  { name: "JET Motor Company", category: ["Automobiles", "Buses & Commercial Vans"], popular: true, origin: "Nigerian" },
  { name: "Proforce", category: ["Automobiles", "Heavy Duty & Plant Machinery"], popular: false, origin: "Nigerian" },
  { name: "Dangote Sinotruk", category: ["Haulage Trucks & Trailers", "Heavy Duty & Plant Machinery"], popular: true, origin: "Nigerian" },
  { name: "Phoenix", category: ["Bikes, Scooters & E-Mobility"], popular: false, origin: "Nigerian" },
  { name: "Simba / TVS Nigeria", category: ["Bikes, Scooters & E-Mobility", "Buses & Commercial Vans"], popular: true, origin: "Nigerian" },
  { name: "Bajaj Nigeria", category: ["Bikes, Scooters & E-Mobility"], popular: true, origin: "Nigerian" },
  { name: "Qlink Nigeria", category: ["Bikes, Scooters & E-Mobility"], popular: true, origin: "Nigerian" },
  { name: "Sanya", category: ["Bikes, Scooters & E-Mobility"], popular: true, origin: "Nigerian" },
  { name: "Daylong", category: ["Bikes, Scooters & E-Mobility"], popular: false, origin: "Nigerian" },
  { name: "Jincheng", category: ["Bikes, Scooters & E-Mobility"], popular: false, origin: "Nigerian" },
  { name: "Bovas Marine", category: ["Marine Vessels & Boats"], popular: false, origin: "Nigerian" },
  { name: "Almarine Nigeria", category: ["Marine Vessels & Boats"], popular: true, origin: "Nigerian" },

  // 🌍 African Brands
  { name: "Mobius Motors", category: ["Automobiles"], popular: true, origin: "African" },
  { name: "Kantanka", category: ["Automobiles", "Buses & Commercial Vans"], popular: true, origin: "African" },
  { name: "Wallyscar", category: ["Automobiles"], popular: false, origin: "African" },
  { name: "Birkin Cars", category: ["Automobiles"], popular: false, origin: "African" },
  { name: "Kiira Motors", category: ["Automobiles", "Buses & Commercial Vans"], popular: false, origin: "African" },
  { name: "Laraki", category: ["Automobiles"], popular: false, origin: "African" },
  { name: "SNVI", category: ["Buses & Commercial Vans", "Haulage Trucks & Trailers"], popular: false, origin: "African" },

  // 🌐 Global Brands (Top Popular in Nigeria & Worldwide)
  { name: "Toyota", category: ["Automobiles", "Buses & Commercial Vans"], popular: true, origin: "Global" },
  { name: "Mercedes-Benz", category: ["Automobiles", "Buses & Commercial Vans", "Haulage Trucks & Trailers"], popular: true, origin: "Global" },
  { name: "Lexus", category: ["Automobiles"], popular: true, origin: "Global" },
  { name: "Honda", category: ["Automobiles", "Bikes, Scooters & E-Mobility", "Marine Vessels & Boats"], popular: true, origin: "Global" },
  { name: "Hyundai", category: ["Automobiles", "Buses & Commercial Vans", "Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "Kia", category: ["Automobiles"], popular: true, origin: "Global" },
  { name: "Ford", category: ["Automobiles", "Buses & Commercial Vans", "Haulage Trucks & Trailers"], popular: true, origin: "Global" },
  { name: "BMW", category: ["Automobiles", "Bikes, Scooters & E-Mobility"], popular: true, origin: "Global" },
  { name: "Nissan", category: ["Automobiles", "Buses & Commercial Vans"], popular: true, origin: "Global" },
  { name: "Land Rover / Range Rover", category: ["Automobiles"], popular: true, origin: "Global" },
  { name: "Peugeot", category: ["Automobiles"], popular: true, origin: "Global" },
  { name: "Volkswagen", category: ["Automobiles", "Buses & Commercial Vans"], popular: true, origin: "Global" },
  { name: "Audi", category: ["Automobiles"], popular: true, origin: "Global" },
  { name: "Mazda", category: ["Automobiles"], popular: true, origin: "Global" },
  { name: "Mitsubishi", category: ["Automobiles", "Buses & Commercial Vans", "Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "Chevrolet", category: ["Automobiles"], popular: false, origin: "Global" },
  { name: "Subaru", category: ["Automobiles"], popular: false, origin: "Global" },
  { name: "Suzuki", category: ["Automobiles", "Bikes, Scooters & E-Mobility", "Marine Vessels & Boats"], popular: true, origin: "Global" },
  { name: "Jeep", category: ["Automobiles"], popular: true, origin: "Global" },
  { name: "Volvo", category: ["Automobiles", "Buses & Commercial Vans", "Haulage Trucks & Trailers", "Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "Mack", category: ["Haulage Trucks & Trailers"], popular: true, origin: "Global" },
  { name: "DAF", category: ["Haulage Trucks & Trailers"], popular: true, origin: "Global" },
  { name: "Scania", category: ["Haulage Trucks & Trailers", "Buses & Commercial Vans"], popular: true, origin: "Global" },
  { name: "MAN", category: ["Haulage Trucks & Trailers", "Buses & Commercial Vans"], popular: true, origin: "Global" },
  { name: "HOWO / Sinotruk", category: ["Haulage Trucks & Trailers", "Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "Shacman", category: ["Haulage Trucks & Trailers"], popular: true, origin: "Global" },
  { name: "FAW", category: ["Haulage Trucks & Trailers", "Buses & Commercial Vans"], popular: true, origin: "Global" },
  { name: "Iveco", category: ["Haulage Trucks & Trailers", "Buses & Commercial Vans"], popular: true, origin: "Global" },
  { name: "Caterpillar (CAT)", category: ["Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "Komatsu", category: ["Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "JCB", category: ["Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "Hitachi", category: ["Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "Sany", category: ["Heavy Duty & Plant Machinery"], popular: true, origin: "Global" },
  { name: "Yamaha", category: ["Bikes, Scooters & E-Mobility", "Marine Vessels & Boats"], popular: true, origin: "Global" },
  { name: "Kawasaki", category: ["Bikes, Scooters & E-Mobility"], popular: false, origin: "Global" },
  { name: "Ducati", category: ["Bikes, Scooters & E-Mobility"], popular: false, origin: "Global" },
  { name: "Mercury Marine", category: ["Marine Vessels & Boats"], popular: true, origin: "Global" },
  { name: "Sea-Doo", category: ["Marine Vessels & Boats"], popular: true, origin: "Global" },
  { name: "Bayliner", category: ["Marine Vessels & Boats"], popular: false, origin: "Global" },
  { name: "Boston Whaler", category: ["Marine Vessels & Boats"], popular: false, origin: "Global" },
  { name: "Chaparral", category: ["Marine Vessels & Boats"], popular: false, origin: "Global" },
];

// ============================================================================
// 2. TECH, PHONES, TABLETS & ACCESSORIES BRANDS
// ============================================================================
export const TECH_PHONE_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands
  { name: "AfriOne", category: ["Mobile Phones", "Tablets", "Accessories"], popular: true, origin: "Nigerian", tier: "Mid-Range" },
  { name: "Imose Mobile", category: ["Mobile Phones", "Tablets", "Accessories"], popular: true, origin: "Nigerian", tier: "Budget" },
  { name: "Zinox Technologies", category: ["Tablets", "Accessories"], popular: true, origin: "Nigerian", tier: "Mid-Range" },
  { name: "Solo Phone", category: ["Mobile Phones"], popular: false, origin: "Nigerian", tier: "Budget" },
  { name: "Pliris Mobile", category: ["Mobile Phones", "Tablets"], popular: false, origin: "Nigerian", tier: "Budget" },
  { name: "Yudala", category: ["Tablets", "Accessories"], popular: false, origin: "Nigerian", tier: "Budget" },

  // 🌍 African Brands
  { name: "Mara Phones", category: ["Mobile Phones"], popular: true, origin: "African", tier: "Mid-Range" },
  { name: "Mobicel", category: ["Mobile Phones", "Tablets"], popular: true, origin: "African", tier: "Budget" },
  { name: "Mint Mobile", category: ["Mobile Phones"], popular: false, origin: "African", tier: "Budget" },
  { name: "Onyx Connect", category: ["Mobile Phones", "Tablets"], popular: false, origin: "African", tier: "Budget" },
  { name: "VMK", category: ["Mobile Phones", "Tablets"], popular: false, origin: "African", tier: "Budget" },

  // 🌐 African-dominant & Global Tech Giants
  { name: "Tecno", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Infinix", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "itel", category: ["Mobile Phones", "Tablets", "Accessories"], popular: true, origin: "Global", tier: "Budget" },
  { name: "Oraimo", category: ["Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Accessories" },
  { name: "Apple", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Flagship" },
  { name: "Samsung", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Flagship" },
  { name: "Google (Pixel)", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Flagship" },
  { name: "Xiaomi", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Redmi", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "POCO", category: ["Mobile Phones", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Oppo", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Vivo", category: ["Mobile Phones", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "OnePlus", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Flagship" },
  { name: "Huawei", category: ["Mobile Phones", "Tablets", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Flagship" },
  { name: "Honor", category: ["Mobile Phones", "Tablets", "Smartwatches"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Realme", category: ["Mobile Phones", "Tablets", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Motorola", category: ["Mobile Phones", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Nokia", category: ["Mobile Phones", "Tablets", "Accessories"], popular: true, origin: "Global", tier: "Budget" },
  { name: "Sony", category: ["Mobile Phones", "Accessories"], popular: true, origin: "Global", tier: "Flagship" },
  { name: "Nothing", category: ["Mobile Phones", "Smartwatches", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Asus (ROG)", category: ["Mobile Phones", "Tablets"], popular: false, origin: "Global", tier: "Flagship" },
  { name: "Lenovo", category: ["Tablets", "Accessories"], popular: true, origin: "Global", tier: "Mid-Range" },
  { name: "Amazon (Kindle/Fire)", category: ["Tablets"], popular: true, origin: "Global", tier: "Budget" },
  { name: "Microsoft (Surface)", category: ["Tablets", "Accessories"], popular: true, origin: "Global", tier: "Flagship" },
  { name: "Teclast", category: ["Tablets"], popular: false, origin: "Global", tier: "Budget" },
  { name: "Blackview", category: ["Tablets", "Mobile Phones"], popular: false, origin: "Global", tier: "Budget" },
  { name: "Chuwi", category: ["Tablets"], popular: false, origin: "Global", tier: "Budget" },
  { name: "Alcatel", category: ["Tablets", "Mobile Phones"], popular: false, origin: "Global", tier: "Budget" },
  { name: "ZTE", category: ["Mobile Phones", "Tablets"], popular: false, origin: "Global", tier: "Mid-Range" },
  { name: "Nubia", category: ["Mobile Phones", "Tablets"], popular: false, origin: "Global", tier: "Mid-Range" },
  { name: "Oukitel", category: ["Mobile Phones", "Tablets"], popular: false, origin: "Global", tier: "Budget" },
  { name: "Ulefone", category: ["Mobile Phones", "Tablets"], popular: false, origin: "Global", tier: "Budget" },
  { name: "Doogee", category: ["Mobile Phones", "Tablets"], popular: false, origin: "Global", tier: "Budget" },
  { name: "Modio", category: ["Tablets"], popular: true, origin: "Global", tier: "Budget" },
  { name: "Atouch", category: ["Tablets"], popular: true, origin: "Global", tier: "Budget" },
  { name: "Bebe", category: ["Tablets"], popular: true, origin: "Global", tier: "Budget" },
  { name: "W&O", category: ["Tablets"], popular: false, origin: "Global", tier: "Budget" },
  { name: "Garmin", category: ["Smartwatches"], popular: true, origin: "Global", tier: "Wearables" },
  { name: "Amazfit", category: ["Smartwatches"], popular: true, origin: "Global", tier: "Wearables" },
  { name: "Fitbit", category: ["Smartwatches"], popular: true, origin: "Global", tier: "Wearables" },
  { name: "Anker / Soundcore", category: ["Accessories"], popular: true, origin: "Global", tier: "Accessories" },
  { name: "Baseus", category: ["Accessories"], popular: true, origin: "Global", tier: "Accessories" },
  { name: "Ugreen", category: ["Accessories"], popular: true, origin: "Global", tier: "Accessories" },
  { name: "Awei", category: ["Accessories"], popular: true, origin: "Global", tier: "Accessories" },
  { name: "New Vision", category: ["Accessories", "Tablets"], popular: false, origin: "Global", tier: "Budget" },
];

// ============================================================================
// 3. ELECTRONICS, TV, AUDIO, COMPUTERS & GADGETS
// ============================================================================
export const ELECTRONICS_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands
  { name: "Polystar", category: ["TV & DVD Equipment", "Audio & Music Systems", "General Specifications"], popular: true, origin: "Nigerian" },
  { name: "Scanfrost", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "Nigerian" },
  { name: "Haier Thermocool", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "Nigerian" },
  { name: "Nexus", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "Nigerian" },
  { name: "Maxi", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "Nigerian" },
  { name: "Skyrun", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "Nigerian" },
  { name: "Century", category: ["TV & DVD Equipment", "Audio & Music Systems", "General Specifications"], popular: true, origin: "Nigerian" },
  { name: "QASA", category: ["Audio & Music Systems", "General Specifications"], popular: true, origin: "Nigerian" },
  { name: "Binatone", category: ["TV & DVD Equipment", "General Specifications"], popular: true, origin: "Nigerian" },
  { name: "Ox", category: ["Audio & Music Systems", "General Specifications"], popular: true, origin: "Nigerian" },
  { name: "Zinox Computers", category: ["Laptops & Computers", "Computer Accessories & Hardware"], popular: true, origin: "Nigerian" },
  { name: "Omatek Computers", category: ["Laptops & Computers", "Computer Accessories & Hardware"], popular: true, origin: "Nigerian" },
  { name: "Oraimo", category: ["Audio & Music Systems", "Computer Accessories & Hardware"], popular: true, origin: "Nigerian" },
  { name: "StarTimes", category: ["TV & DVD Equipment"], popular: true, origin: "Nigerian" },
  { name: "TSTV", category: ["TV & DVD Equipment"], popular: false, origin: "Nigerian" },

  // 🌍 African Brands
  { name: "Syinix", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "African" },
  { name: "DStv / MultiChoice", category: ["TV & DVD Equipment"], popular: true, origin: "African" },
  { name: "Sinotec", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "African" },
  { name: "Solstar", category: ["TV & DVD Equipment"], popular: false, origin: "African" },
  { name: "Telefunken South Africa", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: false, origin: "African" },

  // 🌐 Global Brands
  { name: "LG", category: ["TV & DVD Equipment", "Audio & Music Systems", "General Specifications"], popular: true, origin: "Global" },
  { name: "Samsung", category: ["TV & DVD Equipment", "Audio & Music Systems", "General Specifications"], popular: true, origin: "Global" },
  { name: "Sony", category: ["TV & DVD Equipment", "Audio & Music Systems", "Video Games & Consoles", "Cameras & Camcorders"], popular: true, origin: "Global" },
  { name: "Hisense", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "TCL", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "HP", category: ["Laptops & Computers", "Printers & Scanners", "Computer Accessories & Hardware"], popular: true, origin: "Global" },
  { name: "Dell", category: ["Laptops & Computers", "Computer Accessories & Hardware"], popular: true, origin: "Global" },
  { name: "Lenovo", category: ["Laptops & Computers", "Computer Accessories & Hardware"], popular: true, origin: "Global" },
  { name: "Apple", category: ["Laptops & Computers", "Audio & Music Systems", "Computer Accessories & Hardware"], popular: true, origin: "Global" },
  { name: "ASUS", category: ["Laptops & Computers", "Computer Accessories & Hardware"], popular: true, origin: "Global" },
  { name: "Acer", category: ["Laptops & Computers", "Computer Accessories & Hardware"], popular: true, origin: "Global" },
  { name: "Toshiba", category: ["TV & DVD Equipment", "Laptops & Computers"], popular: true, origin: "Global" },
  { name: "Panasonic", category: ["TV & DVD Equipment", "Audio & Music Systems", "Cameras & Camcorders"], popular: true, origin: "Global" },
  { name: "Sharp", category: ["TV & DVD Equipment", "Printers & Scanners"], popular: true, origin: "Global" },
  { name: "Philips", category: ["TV & DVD Equipment", "Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "JBL", category: ["Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "Bose", category: ["Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "Harman Kardon", category: ["Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "Marshall", category: ["Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "Sennheiser", category: ["Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "Pioneer", category: ["Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "Yamaha", category: ["Audio & Music Systems"], popular: true, origin: "Global" },
  { name: "Nintendo", category: ["Video Games & Consoles"], popular: true, origin: "Global" },
  { name: "PlayStation (Sony)", category: ["Video Games & Consoles"], popular: true, origin: "Global" },
  { name: "Xbox (Microsoft)", category: ["Video Games & Consoles"], popular: true, origin: "Global" },
  { name: "Steam (Valve)", category: ["Video Games & Consoles"], popular: false, origin: "Global" },
  { name: "Canon", category: ["Cameras & Camcorders", "Printers & Scanners"], popular: true, origin: "Global" },
  { name: "Nikon", category: ["Cameras & Camcorders"], popular: true, origin: "Global" },
  { name: "Fujifilm", category: ["Cameras & Camcorders"], popular: true, origin: "Global" },
  { name: "DJI", category: ["Cameras & Camcorders"], popular: true, origin: "Global" },
  { name: "GoPro", category: ["Cameras & Camcorders"], popular: true, origin: "Global" },
  { name: "Epson", category: ["Printers & Scanners"], popular: true, origin: "Global" },
  { name: "Brother", category: ["Printers & Scanners"], popular: true, origin: "Global" },
  { name: "Hikvision", category: ["Security & Surveillance"], popular: true, origin: "Global" },
  { name: "Dahua", category: ["Security & Surveillance"], popular: true, origin: "Global" },
  { name: "Logitech", category: ["Computer Accessories & Hardware"], popular: true, origin: "Global" },
];

// ============================================================================
// 4. HOME, FURNITURE, APPLIANCES, POWER & SOLAR
// ============================================================================
export const HOME_APPLIANCE_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands
  { name: "Polystar", category: ["Home & Kitchen Appliances", "Furniture"], popular: true, origin: "Nigerian" },
  { name: "Haier Thermocool", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "Scanfrost", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "Nexus", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "Maxi", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "Skyrun", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "Century", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "Ox", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "Master Chef", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "Tower Aluminum", category: ["Home & Kitchen Appliances"], popular: true, origin: "Nigerian" },
  { name: "QASA", category: ["Home & Kitchen Appliances", "Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Elepaq", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "SUMEC Firman", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Lutian", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Tiger", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Senwei", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Soman", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Felicity Solar", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Luminous Nigeria", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Prag", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Blue Gate", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Mercury", category: ["Power, Solar & Generators"], popular: true, origin: "Nigerian" },
  { name: "Mouka Foam", category: ["Furniture", "Home Decor & Interior"], popular: true, origin: "Nigerian" },
  { name: "Vitafoam Nigeria", category: ["Furniture", "Home Decor & Interior"], popular: true, origin: "Nigerian" },
  { name: "Vono", category: ["Furniture"], popular: true, origin: "Nigerian" },
  { name: "Winco Foam", category: ["Furniture"], popular: true, origin: "Nigerian" },
  { name: "Royal Foam", category: ["Furniture"], popular: true, origin: "Nigerian" },
  { name: "Bedmate Furniture", category: ["Furniture"], popular: true, origin: "Nigerian" },
  { name: "Lifemate Furniture", category: ["Furniture"], popular: true, origin: "Nigerian" },
  { name: "Woodstyles Nigeria", category: ["Furniture"], popular: true, origin: "Nigerian" },
  { name: "IO Furniture", category: ["Furniture"], popular: true, origin: "Nigerian" },
  { name: "H&Y Furniture", category: ["Furniture"], popular: true, origin: "Nigerian" },
  { name: "Taeillo", category: ["Furniture", "Home Decor & Interior"], popular: true, origin: "Nigerian" },

  // 🌍 African Brands
  { name: "Defy Appliances", category: ["Home & Kitchen Appliances"], popular: true, origin: "African" },
  { name: "KIC Appliances", category: ["Home & Kitchen Appliances"], popular: false, origin: "African" },
  { name: "Syinix", category: ["Home & Kitchen Appliances"], popular: true, origin: "African" },
  { name: "Weylandts", category: ["Furniture", "Home Decor & Interior"], popular: false, origin: "African" },
  { name: "Coricraft", category: ["Furniture"], popular: false, origin: "African" },

  // 🌐 Global Brands
  { name: "LG", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Samsung", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Hisense", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Midea", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Gree", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Daikin", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Whirlpool", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Bosch", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Panasonic", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Beko", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Kenwood", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "Philips", category: ["Home & Kitchen Appliances"], popular: true, origin: "Global" },
  { name: "IKEA", category: ["Furniture", "Home Decor & Interior"], popular: true, origin: "Global" },
  { name: "Ashley Furniture", category: ["Furniture"], popular: true, origin: "Global" },
  { name: "La-Z-Boy", category: ["Furniture"], popular: false, origin: "Global" },
  { name: "Herman Miller", category: ["Furniture"], popular: false, origin: "Global" },
  { name: "Growatt", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
  { name: "Deye", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
  { name: "SunSynk", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
  { name: "Victron Energy", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
  { name: "Huawei Solar", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
  { name: "Pylontech", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
  { name: "Jinko Solar", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
  { name: "Canadian Solar", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
  { name: "Longi Solar", category: ["Power, Solar & Generators"], popular: true, origin: "Global" },
];

// ============================================================================
// 5. BEAUTY & PERSONAL CARE BRANDS
// ============================================================================
export const BEAUTY_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands
  { name: "House of Tara", category: ["Makeup & Cosmetics"], popular: true, origin: "Nigerian" },
  { name: "Zaron Cosmetics", category: ["Makeup & Cosmetics", "Skincare & Sunscreen"], popular: true, origin: "Nigerian" },
  { name: "BMPro", category: ["Makeup & Cosmetics"], popular: true, origin: "Nigerian" },
  { name: "Nuban Beauty", category: ["Makeup & Cosmetics"], popular: true, origin: "Nigerian" },
  { name: "Blot Beauty Cosmetics", category: ["Makeup & Cosmetics"], popular: true, origin: "Nigerian" },
  { name: "Hegai & Esther", category: ["Makeup & Cosmetics"], popular: true, origin: "Nigerian" },
  { name: "Kuddy Cosmetics", category: ["Makeup & Cosmetics", "Skincare & Sunscreen"], popular: true, origin: "Nigerian" },
  { name: "Arami Essentials", category: ["Skincare & Sunscreen", "Bath & Body"], popular: true, origin: "Nigerian" },
  { name: "R&R Luxury", category: ["Skincare & Sunscreen", "Bath & Body"], popular: true, origin: "Nigerian" },
  { name: "Skin Science Africa", category: ["Skincare & Sunscreen"], popular: true, origin: "Nigerian" },
  { name: "Oriki", category: ["Skincare & Sunscreen", "Bath & Body"], popular: true, origin: "Nigerian" },
  { name: "Fig Health Store", category: ["Skincare & Sunscreen"], popular: false, origin: "Nigerian" },
  { name: "Tiwi", category: ["Fragrances & Perfumes"], popular: false, origin: "Nigerian" },
  { name: "Lush Hair Nigeria", category: ["Hair Beauty & Extensions"], popular: true, origin: "Nigerian" },
  { name: "Darling Nigeria", category: ["Hair Beauty & Extensions"], popular: true, origin: "Nigerian" },
  { name: "X-Pression", category: ["Hair Beauty & Extensions"], popular: true, origin: "Nigerian" },
  { name: "Royal Hair", category: ["Hair Beauty & Extensions"], popular: true, origin: "Nigerian" },
  { name: "Wanneka Hair", category: ["Hair Beauty & Extensions"], popular: true, origin: "Nigerian" },

  // 🌍 African Brands
  { name: "Juvia's Place", category: ["Makeup & Cosmetics"], popular: true, origin: "African" },
  { name: "54 Thrones", category: ["Skincare & Sunscreen", "Bath & Body"], popular: true, origin: "African" },
  { name: "Portia M", category: ["Skincare & Sunscreen"], popular: true, origin: "African" },
  { name: "Malée Natural Science", category: ["Fragrances & Perfumes", "Bath & Body"], popular: false, origin: "African" },
  { name: "Skoon Skin", category: ["Skincare & Sunscreen"], popular: false, origin: "African" },
  { name: "Afrocetric", category: ["Hair Beauty & Extensions"], popular: false, origin: "African" },
  { name: "Marini Naturals", category: ["Hair Beauty & Extensions"], popular: true, origin: "African" },
  { name: "Kanekalon", category: ["Hair Beauty & Extensions"], popular: true, origin: "African" },
  { name: "Outre", category: ["Hair Beauty & Extensions"], popular: true, origin: "African" },

  // 🌟 Celebrity Brands
  { name: "Fenty Beauty (Rihanna)", category: ["Makeup & Cosmetics", "Skincare & Sunscreen"], popular: true, origin: "Celebrity" },
  { name: "Rare Beauty (Selena Gomez)", category: ["Makeup & Cosmetics"], popular: true, origin: "Celebrity" },
  { name: "Kylie Cosmetics", category: ["Makeup & Cosmetics"], popular: true, origin: "Celebrity" },
  { name: "Haus Labs (Lady Gaga)", category: ["Makeup & Cosmetics"], popular: false, origin: "Celebrity" },
  { name: "Pattern Beauty (Tracee Ellis Ross)", category: ["Hair Beauty & Extensions"], popular: false, origin: "Celebrity" },

  // 🌐 Global Brands
  { name: "MAC Cosmetics", category: ["Makeup & Cosmetics"], popular: true, origin: "Global" },
  { name: "Maybelline", category: ["Makeup & Cosmetics"], popular: true, origin: "Global" },
  { name: "L'Oréal", category: ["Makeup & Cosmetics", "Skincare & Sunscreen", "Hair Beauty & Extensions"], popular: true, origin: "Global" },
  { name: "NARS", category: ["Makeup & Cosmetics"], popular: true, origin: "Global" },
  { name: "Clinique", category: ["Skincare & Sunscreen", "Makeup & Cosmetics"], popular: true, origin: "Global" },
  { name: "Estée Lauder", category: ["Skincare & Sunscreen", "Fragrances & Perfumes"], popular: true, origin: "Global" },
  { name: "Huda Beauty", category: ["Makeup & Cosmetics"], popular: true, origin: "Global" },
  { name: "Charlotte Tilbury", category: ["Makeup & Cosmetics"], popular: true, origin: "Global" },
  { name: "CeraVe", category: ["Skincare & Sunscreen"], popular: true, origin: "Global" },
  { name: "La Roche-Posay", category: ["Skincare & Sunscreen"], popular: true, origin: "Global" },
  { name: "The Ordinary", category: ["Skincare & Sunscreen"], popular: true, origin: "Global" },
  { name: "Neutrogena", category: ["Skincare & Sunscreen"], popular: true, origin: "Global" },
  { name: "Dior", category: ["Fragrances & Perfumes", "Makeup & Cosmetics"], popular: true, origin: "Global" },
  { name: "Chanel", category: ["Fragrances & Perfumes", "Makeup & Cosmetics"], popular: true, origin: "Global" },
  { name: "Tom Ford", category: ["Fragrances & Perfumes"], popular: true, origin: "Global" },
  { name: "Creed", category: ["Fragrances & Perfumes"], popular: true, origin: "Global" },
  { name: "Lattafa Perfumes", category: ["Fragrances & Perfumes"], popular: true, origin: "Global" },
  { name: "Armaf", category: ["Fragrances & Perfumes"], popular: true, origin: "Global" },
  { name: "Maison Francis Kurkdjian", category: ["Fragrances & Perfumes"], popular: true, origin: "Global" },
  { name: "Olaplex", category: ["Hair Beauty & Extensions"], popular: true, origin: "Global" },
  { name: "SheaMoisture", category: ["Hair Beauty & Extensions", "Bath & Body"], popular: true, origin: "Global" },
  { name: "Cantu", category: ["Hair Beauty & Extensions"], popular: true, origin: "Global" },
  { name: "Vaseline", category: ["Bath & Body", "Skincare & Sunscreen"], popular: true, origin: "Global" },
  { name: "Nivea", category: ["Bath & Body", "Skincare & Sunscreen"], popular: true, origin: "Global" },
  { name: "Bath & Body Works", category: ["Bath & Body", "Fragrances & Perfumes"], popular: true, origin: "Global" },
];

// ============================================================================
// 6. AGRICULTURE & FOOD BRANDS
// ============================================================================
export const AGRICULTURE_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands
  { name: "Dangote (Agro / Fertilizers)", category: ["Farm Produce & Foodstuff", "Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "BUA Foods", category: ["Farm Produce & Foodstuff"], popular: true, origin: "Nigerian" },
  { name: "Golden Penny (FMN)", category: ["Farm Produce & Foodstuff", "Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "Honeywell Flour Mills", category: ["Farm Produce & Foodstuff"], popular: true, origin: "Nigerian" },
  { name: "Chi Farms", category: ["Livestock & Poultry", "Fish & Aquaculture"], popular: true, origin: "Nigerian" },
  { name: "Zartech Poultry & Farms", category: ["Livestock & Poultry"], popular: true, origin: "Nigerian" },
  { name: "Obasanjo Farms", category: ["Livestock & Poultry", "Farm Produce & Foodstuff"], popular: true, origin: "Nigerian" },
  { name: "Amo Farm Sieberer (NatnudO)", category: ["Livestock & Poultry", "Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "Premier Feeds (Top Feeds)", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "Animal Care Konsult", category: ["Feeds & Agro-Chemicals", "Livestock & Poultry"], popular: true, origin: "Nigerian" },
  { name: "Vital Feeds (Grand Cereals)", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "Notore Chemical Industries", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "Indorama Eleme Fertilizer", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "Jubaili Agrotec", category: ["Feeds & Agro-Chemicals", "Farm Machinery & Equipment"], popular: true, origin: "Nigerian" },
  { name: "Saro Agrosciences", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "Dizengoff Nigeria", category: ["Farm Machinery & Equipment", "Feeds & Agro-Chemicals"], popular: true, origin: "Nigerian" },
  { name: "C. Woermann Nigeria", category: ["Farm Machinery & Equipment"], popular: true, origin: "Nigerian" },
  { name: "Premier Seeds Nigeria", category: ["Feeds & Agro-Chemicals", "Farm Produce & Foodstuff"], popular: true, origin: "Nigerian" },
  { name: "AFEX Commodities", category: ["Farm Produce & Foodstuff"], popular: true, origin: "Nigerian" },

  // 🌍 African Brands
  { name: "Seed Co Africa", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "African" },
  { name: "Omnia Fertilizer", category: ["Feeds & Agro-Chemicals"], popular: false, origin: "African" },
  { name: "Astral Foods", category: ["Feeds & Agro-Chemicals", "Livestock & Poultry"], popular: false, origin: "African" },
  { name: "Olam Agri Africa", category: ["Farm Produce & Foodstuff", "Feeds & Agro-Chemicals"], popular: true, origin: "African" },

  // 🌐 Global Farm Machinery & Agro Brands
  { name: "John Deere", category: ["Farm Machinery & Equipment"], popular: true, origin: "Global" },
  { name: "Massey Ferguson", category: ["Farm Machinery & Equipment"], popular: true, origin: "Global" },
  { name: "New Holland", category: ["Farm Machinery & Equipment"], popular: true, origin: "Global" },
  { name: "Kubota", category: ["Farm Machinery & Equipment"], popular: true, origin: "Global" },
  { name: "Mahindra Tractors", category: ["Farm Machinery & Equipment"], popular: true, origin: "Global" },
  { name: "Case IH", category: ["Farm Machinery & Equipment"], popular: true, origin: "Global" },
  { name: "Sonalika", category: ["Farm Machinery & Equipment"], popular: true, origin: "Global" },
  { name: "CLAAS", category: ["Farm Machinery & Equipment"], popular: false, origin: "Global" },
  { name: "Syngenta", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Global" },
  { name: "Bayer CropScience", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Global" },
  { name: "Corteva Agriscience", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Global" },
  { name: "Yara International", category: ["Feeds & Agro-Chemicals"], popular: true, origin: "Global" },
  { name: "Stihl", category: ["Farm Machinery & Equipment"], popular: true, origin: "Global" },
];

// ============================================================================
// 7. SPORTS, ARTS & OUTDOORS BRANDS
// ============================================================================
export const SPORTS_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands
  { name: "AFA Sports", category: ["Fitness & Gym Equipment", "Team Sports & Ball Games"], popular: true, origin: "Nigerian" },
  { name: "Clan Sportswear", category: ["Fitness & Gym Equipment"], popular: true, origin: "Nigerian" },
  { name: "Jungle Gym Nigeria", category: ["Fitness & Gym Equipment"], popular: true, origin: "Nigerian" },
  { name: "Simba Sports", category: ["Bicycles & Cycling"], popular: true, origin: "Nigerian" },
  { name: "Bet9ja Sportswear", category: ["Team Sports & Ball Games"], popular: false, origin: "Nigerian" },
  { name: "Toke Makinwa Luxury Sport", category: ["Fitness & Gym Equipment"], popular: false, origin: "Nigerian" },

  // 🌍 African Brands
  { name: "Actively Black", category: ["Fitness & Gym Equipment", "Team Sports & Ball Games"], popular: true, origin: "African" },
  { name: "Africa Padel", category: ["Racket Sports"], popular: true, origin: "African" },
  { name: "Maxed (Mr Price)", category: ["Fitness & Gym Equipment"], popular: false, origin: "African" },

  // 🌐 Global Brands
  { name: "Nike", category: ["Fitness & Gym Equipment", "Team Sports & Ball Games", "Racket Sports"], popular: true, origin: "Global" },
  { name: "Adidas", category: ["Fitness & Gym Equipment", "Team Sports & Ball Games", "Racket Sports"], popular: true, origin: "Global" },
  { name: "Puma", category: ["Fitness & Gym Equipment", "Team Sports & Ball Games"], popular: true, origin: "Global" },
  { name: "Under Armour", category: ["Fitness & Gym Equipment"], popular: true, origin: "Global" },
  { name: "Reebok", category: ["Fitness & Gym Equipment"], popular: true, origin: "Global" },
  { name: "Jordan", category: ["Team Sports & Ball Games"], popular: true, origin: "Global" },
  { name: "Decathlon (Domyos/Kipsta)", category: ["Fitness & Gym Equipment", "Team Sports & Ball Games", "Bicycles & Cycling"], popular: true, origin: "Global" },
  { name: "Wilson", category: ["Team Sports & Ball Games", "Racket Sports"], popular: true, origin: "Global" },
  { name: "Spalding", category: ["Team Sports & Ball Games"], popular: true, origin: "Global" },
  { name: "Molten", category: ["Team Sports & Ball Games"], popular: true, origin: "Global" },
  { name: "NordicTrack", category: ["Fitness & Gym Equipment"], popular: true, origin: "Global" },
  { name: "ProForm", category: ["Fitness & Gym Equipment"], popular: true, origin: "Global" },
  { name: "Bowflex", category: ["Fitness & Gym Equipment"], popular: true, origin: "Global" },
  { name: "Yamaha (Music)", category: ["Musical Instruments"], popular: true, origin: "Global" },
  { name: "Fender", category: ["Musical Instruments"], popular: true, origin: "Global" },
  { name: "Gibson", category: ["Musical Instruments"], popular: true, origin: "Global" },
  { name: "Roland", category: ["Musical Instruments"], popular: true, origin: "Global" },
  { name: "Casio", category: ["Musical Instruments"], popular: true, origin: "Global" },
  { name: "Trek", category: ["Bicycles & Cycling"], popular: true, origin: "Global" },
  { name: "Giant", category: ["Bicycles & Cycling"], popular: true, origin: "Global" },
  { name: "Specialized", category: ["Bicycles & Cycling"], popular: true, origin: "Global" },

  // 📚 Books, Arts & Crafts Brands
  { name: "Learn Africa (Longman)", category: ["Books, Arts & Crafts"], popular: true, origin: "Nigerian" },
  { name: "University Press Plc (UPPLC)", category: ["Books, Arts & Crafts"], popular: true, origin: "Nigerian" },
  { name: "Evans Brothers Nigeria", category: ["Books, Arts & Crafts"], popular: true, origin: "Nigerian" },
  { name: "Cassava Republic Press", category: ["Books, Arts & Crafts"], popular: true, origin: "Nigerian" },
  { name: "Lantern Books", category: ["Books, Arts & Crafts"], popular: true, origin: "Nigerian" },
  { name: "Penguin Random House", category: ["Books, Arts & Crafts"], popular: true, origin: "Global" },
  { name: "Oxford University Press", category: ["Books, Arts & Crafts"], popular: true, origin: "Global" },
  { name: "Cambridge University Press", category: ["Books, Arts & Crafts"], popular: true, origin: "Global" },
  { name: "Faber-Castell", category: ["Books, Arts & Crafts"], popular: true, origin: "Global" },
  { name: "Winsor & Newton", category: ["Books, Arts & Crafts"], popular: true, origin: "Global" },
  { name: "Prismacolor", category: ["Books, Arts & Crafts"], popular: true, origin: "Global" },
  { name: "Wacom", category: ["Books, Arts & Crafts"], popular: true, origin: "Global" },
  { name: "Staedtler", category: ["Books, Arts & Crafts"], popular: true, origin: "Global" },

  // 🏕️ Camping & Outdoor Brands
  { name: "Coleman", category: ["Camping & Outdoor Gear"], popular: true, origin: "Global" },
  { name: "The North Face", category: ["Camping & Outdoor Gear"], popular: true, origin: "Global" },
  { name: "Columbia Sportswear", category: ["Camping & Outdoor Gear"], popular: true, origin: "Global" },
  { name: "Quechua (Decathlon)", category: ["Camping & Outdoor Gear"], popular: true, origin: "Global" },
];

// ============================================================================
// 8. PETS & ANIMAL CARE BRANDS
// ============================================================================
export const PET_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands
  { name: "Grand Cereals (Vital Dog)", category: ["Pet Care & Supplies", "Dogs & Puppies"], popular: true, origin: "Nigerian" },
  { name: "Animal Care / Funtuna", category: ["Pet Care & Supplies", "Dogs & Puppies"], popular: true, origin: "Nigerian" },
  { name: "Top Dog Nigeria", category: ["Pet Care & Supplies", "Dogs & Puppies"], popular: true, origin: "Nigerian" },
  { name: "Royal K9 Nigeria", category: ["Pet Care & Supplies", "Dogs & Puppies"], popular: true, origin: "Nigerian" },
  { name: "Breeder's Choice Nigeria", category: ["Pet Care & Supplies"], popular: true, origin: "Nigerian" },
  { name: "Pet Express Nigeria", category: ["Pet Care & Supplies"], popular: true, origin: "Nigerian" },
  { name: "Waggles Nigeria", category: ["Pet Care & Supplies"], popular: true, origin: "Nigerian" },
  { name: "Champion Dog Food", category: ["Pet Care & Supplies"], popular: true, origin: "Nigerian" },

  // 🌍 African Brands
  { name: "Montego Pet Nutrition (Karoo)", category: ["Pet Care & Supplies", "Dogs & Puppies", "Cats & Kittens"], popular: true, origin: "African" },
  { name: "Ultra Dog", category: ["Pet Care & Supplies"], popular: false, origin: "African" },
  { name: "Jock Dog Food", category: ["Pet Care & Supplies"], popular: false, origin: "African" },
  { name: "Bobtail", category: ["Pet Care & Supplies"], popular: false, origin: "African" },

  // 🌐 Global Brands
  { name: "Royal Canin", category: ["Pet Care & Supplies", "Dogs & Puppies", "Cats & Kittens"], popular: true, origin: "Global" },
  { name: "Pedigree", category: ["Pet Care & Supplies", "Dogs & Puppies"], popular: true, origin: "Global" },
  { name: "Purina (Pro Plan / Friskies)", category: ["Pet Care & Supplies", "Dogs & Puppies", "Cats & Kittens"], popular: true, origin: "Global" },
  { name: "Whiskas", category: ["Pet Care & Supplies", "Cats & Kittens"], popular: true, origin: "Global" },
  { name: "Hill's Science Diet", category: ["Pet Care & Supplies"], popular: true, origin: "Global" },
  { name: "Taste of the Wild", category: ["Pet Care & Supplies"], popular: true, origin: "Global" },
  { name: "Acana", category: ["Pet Care & Supplies"], popular: false, origin: "Global" },
  { name: "Orijen", category: ["Pet Care & Supplies"], popular: false, origin: "Global" },
  { name: "Farmina N&D", category: ["Pet Care & Supplies"], popular: true, origin: "Global" },
  { name: "Blue Buffalo", category: ["Pet Care & Supplies"], popular: false, origin: "Global" },
];

// ============================================================================
// 9. BABIES & KIDS BRANDS
// ============================================================================
export const BABY_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands & Local Giants
  { name: "Molfix Nigeria", category: ["Baby & Child Care", "Diapers & Wipes"], popular: true, origin: "Nigerian" },
  { name: "Cussons Baby Nigeria", category: ["Baby & Child Care", "Skin & Bath Care"], popular: true, origin: "Nigerian" },
  { name: "Bebem Natural", category: ["Baby & Child Care"], popular: true, origin: "Nigerian" },
  { name: "Kisskids Nigeria", category: ["Baby & Child Care"], popular: true, origin: "Nigerian" },
  { name: "Pears Baby (Unilever Nigeria)", category: ["Baby & Child Care", "Skin & Bath Care"], popular: true, origin: "Nigerian" },
  { name: "Virony Baby Care", category: ["Baby & Child Care"], popular: false, origin: "Nigerian" },

  // 🌐 Global Brands
  { name: "Chicco", category: ["Baby & Child Care", "Prams & Strollers", "Car Seats", "Toys & Games"], popular: true, origin: "Global" },
  { name: "Graco", category: ["Baby & Child Care", "Prams & Strollers", "Car Seats", "Children's Furniture & Cots"], popular: true, origin: "Global" },
  { name: "Philips Avent", category: ["Baby & Child Care", "Maternity & Nursing", "Feeding"], popular: true, origin: "Global" },
  { name: "Tommee Tippee", category: ["Baby & Child Care", "Feeding", "Maternity & Nursing"], popular: true, origin: "Global" },
  { name: "Fisher-Price", category: ["Toys & Games", "Baby & Child Care"], popular: true, origin: "Global" },
  { name: "Pampers", category: ["Baby & Child Care", "Diapers & Wipes"], popular: true, origin: "Global" },
  { name: "Huggies", category: ["Baby & Child Care", "Diapers & Wipes"], popular: true, origin: "Global" },
  { name: "Carter's", category: ["Children's Clothing & Costumes"], popular: true, origin: "Global" },
  { name: "Mothercare", category: ["Baby & Child Care", "Children's Clothing & Costumes", "Prams & Strollers"], popular: true, origin: "Global" },
  { name: "Maxi-Cosi", category: ["Baby & Child Care", "Car Seats", "Prams & Strollers"], popular: true, origin: "Global" },
  { name: "Joie", category: ["Baby & Child Care", "Prams & Strollers", "Car Seats"], popular: true, origin: "Global" },
  { name: "Evenflo", category: ["Baby & Child Care", "Car Seats", "Prams & Strollers"], popular: false, origin: "Global" },
  { name: "Sebamed Baby", category: ["Baby & Child Care", "Skin & Bath Care"], popular: true, origin: "Global" },
  { name: "Medela", category: ["Baby & Child Care", "Maternity & Nursing"], popular: true, origin: "Global" },
  { name: "Cybex", category: ["Baby & Child Care", "Car Seats", "Prams & Strollers"], popular: false, origin: "Global" },
  { name: "Disney Baby", category: ["Toys & Games", "Children's Clothing & Costumes"], popular: true, origin: "Global" },
  { name: "Lego", category: ["Toys & Games"], popular: true, origin: "Global" },
  { name: "Hot Wheels / Barbie (Mattel)", category: ["Toys & Games"], popular: true, origin: "Global" },
];

// ============================================================================
// 10. COMMERCIAL EQUIPMENT & TOOLS BRANDS
// ============================================================================
export const COMMERCIAL_EQUIPMENT_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands & Local Distributors
  { name: "Master Chef Commercial", category: ["Restaurant & Catering Equipment"], popular: true, origin: "Nigerian" },
  { name: "Century Commercial", category: ["Restaurant & Catering Equipment", "Commercial Appliances"], popular: true, origin: "Nigerian" },
  { name: "Haier Thermocool Commercial", category: ["Restaurant & Catering Equipment", "Chillers & Freezers"], popular: true, origin: "Nigerian" },
  { name: "Innoson Commercial Machinery", category: ["Industrial & Manufacturing Machinery"], popular: true, origin: "Nigerian" },

  // 🌐 Global Brands
  { name: "Hobart", category: ["Restaurant & Catering Equipment", "Bakery & Ovens"], popular: true, origin: "Global" },
  { name: "Unox", category: ["Restaurant & Catering Equipment", "Bakery & Ovens"], popular: true, origin: "Global" },
  { name: "Rational", category: ["Restaurant & Catering Equipment", "Combi Steamers"], popular: true, origin: "Global" },
  { name: "Roland DG", category: ["Printing & Graphics Machines", "Large Format"], popular: true, origin: "Global" },
  { name: "Mimaki", category: ["Printing & Graphics Machines", "Plotters & Printers"], popular: true, origin: "Global" },
  { name: "Epson Commercial / SureColor", category: ["Printing & Graphics Machines"], popular: true, origin: "Global" },
  { name: "Heidelberg", category: ["Printing & Graphics Machines", "Offset Printing"], popular: true, origin: "Global" },
  { name: "Juki Industrial", category: ["Industrial & Manufacturing Machinery", "Sewing Machines"], popular: true, origin: "Global" },
  { name: "Jack Industrial Sewing", category: ["Industrial & Manufacturing Machinery", "Sewing Machines"], popular: true, origin: "Global" },
  { name: "Brother Commercial", category: ["Printing & Graphics Machines", "Embroidery & Sewing"], popular: true, origin: "Global" },
  { name: "Kärcher Commercial", category: ["Industrial Cleaning Equipment"], popular: true, origin: "Global" },
  { name: "Mindray Medical", category: ["Medical, Dental & Laboratory Equipment"], popular: true, origin: "Global" },
  { name: "GE Healthcare", category: ["Medical, Dental & Laboratory Equipment"], popular: true, origin: "Global" },
  { name: "Siemens Healthineers", category: ["Medical, Dental & Laboratory Equipment"], popular: true, origin: "Global" },
  { name: "BarberPub", category: ["Salon, Spa & Barbershop Equipment"], popular: true, origin: "Global" },
  { name: "Takara Belmont", category: ["Salon, Spa & Barbershop Equipment"], popular: false, origin: "Global" },
  { name: "Robot Coupe", category: ["Restaurant & Catering Equipment"], popular: false, origin: "Global" },
];

// ============================================================================
// 11. REPAIR & CONSTRUCTION BRANDS
// ============================================================================
export const CONSTRUCTION_BRANDS: BrandItem[] = [
  // 🇳🇬 Nigerian Brands
  { name: "Dangote Cement", category: ["Building Materials"], popular: true, origin: "Nigerian" },
  { name: "BUA Cement", category: ["Building Materials"], popular: true, origin: "Nigerian" },
  { name: "Lafarge Africa (Elephant)", category: ["Building Materials"], popular: true, origin: "Nigerian" },
  { name: "Coleman Wires & Cables", category: ["Solar & Electrical Installations"], popular: true, origin: "Nigerian" },
  { name: "Cutix Cables", category: ["Solar & Electrical Installations"], popular: true, origin: "Nigerian" },
  { name: "Nigerite", category: ["Building Materials", "Roofing & Ceiling"], popular: true, origin: "Nigerian" },
  { name: "Berger Paints Nigeria", category: ["Building Materials", "Paints & Coatings"], popular: true, origin: "Nigerian" },
  { name: "Dulux Nigeria (CAP Plc)", category: ["Building Materials", "Paints & Coatings"], popular: true, origin: "Nigerian" },
  { name: "Meyer Paints", category: ["Building Materials", "Paints & Coatings"], popular: false, origin: "Nigerian" },
  { name: "Tower Aluminum Nigeria", category: ["Doors, Windows & Aluminium", "Roofing Sheets"], popular: true, origin: "Nigerian" },
  { name: "Felicity Solar Nigeria", category: ["Solar & Electrical Installations"], popular: true, origin: "Nigerian" },

  // 🌐 Global Brands
  { name: "Bosch Power Tools", category: ["Power & Hand Tools"], popular: true, origin: "Global" },
  { name: "DeWalt", category: ["Power & Hand Tools"], popular: true, origin: "Global" },
  { name: "Makita", category: ["Power & Hand Tools"], popular: true, origin: "Global" },
  { name: "Ingco Tools", category: ["Power & Hand Tools"], popular: true, origin: "Global" },
  { name: "Total Tools", category: ["Power & Hand Tools"], popular: true, origin: "Global" },
  { name: "Schneider Electric", category: ["Solar & Electrical Installations"], popular: true, origin: "Global" },
  { name: "ABB", category: ["Solar & Electrical Installations"], popular: true, origin: "Global" },
  { name: "Luminous Inverters", category: ["Solar & Electrical Installations"], popular: true, origin: "Global" },
  { name: "Growatt Solar", category: ["Solar & Electrical Installations"], popular: true, origin: "Global" },
  { name: "Deye Inverters", category: ["Solar & Electrical Installations"], popular: true, origin: "Global" },
  { name: "Milwaukee Tool", category: ["Power & Hand Tools"], popular: false, origin: "Global" },
  { name: "Stanley", category: ["Power & Hand Tools"], popular: true, origin: "Global" },
  { name: "Hilti", category: ["Power & Hand Tools", "Fasteners & Construction"], popular: false, origin: "Global" },
  { name: "Grohe", category: ["Plumbing & Water Supplies"], popular: true, origin: "Global" },
  { name: "Kohler", category: ["Plumbing & Water Supplies"], popular: false, origin: "Global" },
  { name: "Ariston Thermo", category: ["Plumbing & Water Supplies", "Water Heaters"], popular: true, origin: "Global" },
];
