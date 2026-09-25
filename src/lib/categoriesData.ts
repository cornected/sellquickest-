export interface SubCategoryInfo {
  name: string;
  icon?: string;
}

export const CATEGORY_SUBCATEGORIES_MAP: Record<string, SubCategoryInfo[]> = {
  vehicles: [
    { name: "Automobiles", icon: "🚗" },
    { name: "Spares & Car Care", icon: "⚙️" },
    { name: "Bikes, Scooters & E-Mobility", icon: "🏍️" },
    { name: "Buses & Commercial Vans", icon: "🚐" },
    { name: "Haulage Trucks & Trailers", icon: "🚚" },
    { name: "Heavy Duty & Plant Machinery", icon: "🚜" },
    { name: "Marine Vessels & Boats", icon: "🚤" },
  ],
  property: [
    { name: "Houses & Apartments", icon: "🏠" },
    { name: "Land & Plots", icon: "📐" },
    { name: "Commercial Property", icon: "🏢" },
    { name: "Short Let", icon: "🛋️" },
    { name: "Office Space", icon: "💼" },
    { name: "Event Centres & Venues", icon: "🎉" },
    { name: "Warehouse & Industrial", icon: "🏭" },
    { name: "Farms & Agricultural Land", icon: "🌾" },
    { name: "New Builds", icon: "🏗️" },
  ],
  fashion: [
    { name: "Women's Fashion", icon: "👗" },
    { name: "Men's Fashion", icon: "👔" },
    { name: "Kids Fashion", icon: "🧒" },
    { name: "Shoes & Footwear", icon: "👟" },
    { name: "Bags & Luggage", icon: "👜" },
    { name: "Watches", icon: "⌚" },
    { name: "Jewelry & Accessories", icon: "💍" },
    { name: "Hair & Wigs", icon: "💇‍♀️" },
    { name: "Beauty & Personal Care", icon: "💄" },
    { name: "Fabrics & Traditional Wear", icon: "🧵" },
    { name: "Fashion Services", icon: "🪡" },
  ],
  "phones-tablets": [
    { name: "Mobile Phones", icon: "📱" },
    { name: "Tablets", icon: "📲" },
    { name: "Smartwatches & Trackers", icon: "⌚" },
    { name: "Accessories & Spares", icon: "🎧" },
  ],
  electronics: [
    { name: "TV & DVD Equipment", icon: "📺" },
    { name: "Audio & Music Systems", icon: "🔊" },
    { name: "Laptops & Computers", icon: "💻" },
    { name: "Video Games & Consoles", icon: "🎮" },
    { name: "Cameras & Camcorders", icon: "📷" },
    { name: "Security & Surveillance", icon: "📹" },
    { name: "Computer Accessories & Hardware", icon: "⌨️" },
    { name: "Printers & Scanners", icon: "🖨️" },
  ],
  home: [
    { name: "Furniture", icon: "🛋️" },
    { name: "Home & Kitchen Appliances", icon: "🍳" },
    { name: "Power, Solar & Generators", icon: "⚡" },
    { name: "Home Decor & Interior", icon: "🖼️" },
    { name: "Garden & Outdoor", icon: "🪴" },
  ],
  beauty: [
    { name: "Fragrances & Perfumes", icon: "🌸" },
    { name: "Skincare & Sunscreen", icon: "🧴" },
    { name: "Hair Beauty & Extensions", icon: "✨" },
    { name: "Makeup & Cosmetics", icon: "💄" },
    { name: "Bath, Body & Oral Care", icon: "🧼" },
    { name: "Beauty Equipment & Tools", icon: "✂️" },
  ],
  agriculture: [
    { name: "Farm Produce & Foodstuff", icon: "🌽" },
    { name: "Livestock & Poultry", icon: "🐄" },
    { name: "Fish & Aquaculture", icon: "🐟" },
    { name: "Farm Machinery & Equipment", icon: "🚜" },
    { name: "Feeds, Seeds & Agro-Chemicals", icon: "🌱" },
  ],
  sports: [
    { name: "Fitness & Gym Equipment", icon: "🏋️" },
    { name: "Team Sports & Athletics", icon: "⚽" },
    { name: "Musical Instruments & Gear", icon: "🎸" },
    { name: "Bicycles & Cycling Gear", icon: "🚴" },
    { name: "Books, Arts & Crafts", icon: "🎨" },
    { name: "Camping & Outdoor Gear", icon: "⛺" },
  ],
  pets: [
    { name: "Dogs & Puppies", icon: "🐶" },
    { name: "Birds & Parrots", icon: "🦜" },
    { name: "Cats & Kittens", icon: "🐱" },
    { name: "Pet Accessories & Kennels", icon: "🦴" },
    { name: "Pet Food & Animal Care", icon: "🥣" },
  ],
  services: [
    { name: "Building & Trades", icon: "🔨" },
    { name: "Cleaning & Fumigation", icon: "🧹" },
    { name: "Chauffeur, Haulage & Logistics", icon: "🚚" },
    { name: "Event Planning & Catering", icon: "🎂" },
    { name: "Computer & Digital Services", icon: "💻" },
    { name: "Auto Repair & Servicing", icon: "🔧" },
  ],
  jobs: [
    { name: "Job Vacancies (Hiring)", icon: "💼" },
    { name: "Job Seekers & CV (Available for Work)", icon: "📄" },
  ],
  "babies-kids": [
    { name: "Baby & Child Care", icon: "🍼" },
    { name: "Children's Clothing & Costumes", icon: "👕" },
    { name: "Children's Shoes", icon: "👟" },
    { name: "Children's Furniture & Cots", icon: "🛏️" },
    { name: "Toys & Learning Games", icon: "🧸" },
    { name: "Maternity & Nursing", icon: "🤱" },
  ],
  "commercial-equipment": [
    { name: "Restaurant & Catering Equipment", icon: "🍽️" },
    { name: "Industrial & Manufacturing Machinery", icon: "⚙️" },
    { name: "Printing & Graphics Machines", icon: "🖨️" },
    { name: "Medical, Dental & Laboratory Equipment", icon: "🔬" },
    { name: "Salon, Spa & Barbershop Equipment", icon: "💇" },
    { name: "Store, Supermarket & Retail Fixtures", icon: "🛒" },
  ],
  "repair-construction": [
    { name: "Building Materials", icon: "🧱" },
    { name: "Solar & Electrical Installations", icon: "☀️" },
    { name: "Plumbing & Water Supplies", icon: "🚰" },
    { name: "Doors, Windows & Aluminium", icon: "🚪" },
    { name: "Power & Hand Tools", icon: "🪚" },
    { name: "Flooring, Tiles & Granite", icon: "◻️" },
  ],
  "business-industry": [
    { name: "Businesses For Sale (Turnkey Operations)", icon: "🏪" },
    { name: "Industrial Raw Materials & Chemicals", icon: "🧪" },
    { name: "Wholesale & Bulk Inventory Clearance", icon: "📦" },
    { name: "Franchise & Dealership Opportunities", icon: "🤝" },
    { name: "Industrial Safety & PPE Gear", icon: "🦺" },
    { name: "Mining & Heavy Processing Equipment", icon: "⛏️" },
  ],
};

export function getSubcategoriesForCategory(
  slug: string,
  name?: string
): SubCategoryInfo[] {
  const normalizedSlug = slug.toLowerCase().trim();
  if (CATEGORY_SUBCATEGORIES_MAP[normalizedSlug]) {
    return CATEGORY_SUBCATEGORIES_MAP[normalizedSlug];
  }

  // Alias checks by slug key
  for (const [key, list] of Object.entries(CATEGORY_SUBCATEGORIES_MAP)) {
    if (normalizedSlug.includes(key) || key.includes(normalizedSlug)) {
      return list;
    }
  }

  // Fallback checks by name keywords
  const checkName = (name || slug).toLowerCase();
  if (checkName.includes("vehic")) return CATEGORY_SUBCATEGORIES_MAP["vehicles"];
  if (checkName.includes("prop")) return CATEGORY_SUBCATEGORIES_MAP["property"];
  if (checkName.includes("fash")) return CATEGORY_SUBCATEGORIES_MAP["fashion"];
  if (checkName.includes("phone") || checkName.includes("tablet"))
    return CATEGORY_SUBCATEGORIES_MAP["phones-tablets"];
  if (checkName.includes("elect"))
    return CATEGORY_SUBCATEGORIES_MAP["electronics"];
  if (checkName.includes("home")) return CATEGORY_SUBCATEGORIES_MAP["home"];
  if (checkName.includes("beauty")) return CATEGORY_SUBCATEGORIES_MAP["beauty"];
  if (checkName.includes("agric"))
    return CATEGORY_SUBCATEGORIES_MAP["agriculture"];
  if (checkName.includes("sport")) return CATEGORY_SUBCATEGORIES_MAP["sports"];
  if (checkName.includes("pet")) return CATEGORY_SUBCATEGORIES_MAP["pets"];
  if (checkName.includes("service"))
    return CATEGORY_SUBCATEGORIES_MAP["services"];
  if (checkName.includes("job")) return CATEGORY_SUBCATEGORIES_MAP["jobs"];
  if (checkName.includes("bab") || checkName.includes("kid"))
    return CATEGORY_SUBCATEGORIES_MAP["babies-kids"];
  if (checkName.includes("commercial") || checkName.includes("equipment"))
    return CATEGORY_SUBCATEGORIES_MAP["commercial-equipment"];
  if (checkName.includes("repair") || checkName.includes("construct"))
    return CATEGORY_SUBCATEGORIES_MAP["repair-construction"];
  if (checkName.includes("business") || checkName.includes("industry"))
    return CATEGORY_SUBCATEGORIES_MAP["business-industry"];

  return [];
}
