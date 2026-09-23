// Comprehensive Fashion Brands Catalog with Multi-Category Support, Origin Badges, and Popularity Tiers

export type FashionBrandOrigin = "Nigerian" | "African" | "Celebrity" | "Global";

export type FashionBrand = {
  name: string;
  category: string[];
  popular?: boolean;
  origin?: FashionBrandOrigin;
};

export const FASHION_BRANDS: FashionBrand[] = [
  {
    "name": "& Other Stories",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "24 Apparel",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "30BG / Timeless Official (Davido)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "313 Eko Footwear",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "7 For All Mankind",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "A-Cold-Wall*",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "AABOUX (Luxury Leather)",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "AAKS (Ghana Weave Bags)",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Aba Master Craft Footwear",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "ABC Wax (English Wax)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Abeokuta Pure Indigo Adire",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Abercrombie & Fitch",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Adekunle Gold Catch Me If You Can Merch",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Adele Dejak (Kenya)",
    "category": [
      "Jewelry & Accessories",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Adidas",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Adidas Kids",
    "category": [
      "Kids Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Adrianna Papell",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Aéropostale",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Afnan Perfumes",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "AG Jeans",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ahluwalia",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ajali Handmade Naturals",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Akin Faminu Sartorial",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Akwete Authentic Handloom",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Al Haramain",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Alaïa",
    "category": [
      "Women's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Aldo",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Alexander McQueen",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Alipearl Hair",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "AllSaints",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Amazfit",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "American Eagle",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "American Tourister",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Amina Muaddi",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Aminah Abdul Jillil",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Amiri",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Amouage",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Anastasia Beverly Hills",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Andrea Iyamah",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Ankara Heritage",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ann Taylor",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Anne Klein",
    "category": [
      "Women's Fashion",
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Anthropologie",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Anti Social Social Club",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Antler",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Anua",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Apple Watch",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "April by Kunbi",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Aquazzura",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Arami Essentials",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Armaf (Club De Nuit)",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Armani",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Watches",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Armani Exchange",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Aromokeye Herbal",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "As I Am",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Asake Mr Money Official Merch",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Ashluxe",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Asics",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "ASOS",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Astrid & Miyu",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "ATAFO",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Atto Tetteh (Ghana)",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "ATTRE Couture",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Audemars Piguet (AP)",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Awake NY",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Away",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Ayra Starr 19 & Dangerous Merch",
    "category": [
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Balenciaga",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Bally",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Balmain",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Banana Republic",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Banke Kuku",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Bape (A Bathing Ape)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Barbour",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bariano Footwear",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Barker",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bata",
    "category": [
      "Shoes & Footwear",
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bath & Body Works",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "BaubleBar",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bazin Riche Original",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Beauty Forever",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Beauty of Joseon",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "BeBe",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Beis (BÉIS)",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Belstaff",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ben Sherman",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Benefit Cosmetics",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Benetton Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Benyar",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Berluti",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bershka",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bespoke Cobbler Lagos (Handmade)",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Bespoke Royal Coral Beads (Benin/Delta)",
    "category": [
      "Jewelry & Accessories",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Billionaire",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Billionaire Boys Club",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Birkenstock",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Bloke",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bloke Nigeria",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Blq Basix",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "BMPro Bridal Artistry",
    "category": [
      "Fashion Services"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "BMPro Makeup",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "BMPro Makeup & Bridal",
    "category": [
      "Beauty & Personal Care",
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Bobbi Boss",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Boggi Milano",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bonwire Kente Weavers (Ghana)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Boohoo",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Boss",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Bottega Veneta",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Boucheron",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Brain Dead",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Brandon Blackwood",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Breitling",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Bridget Awosika",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Briggs & Riley",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Brioni",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Brooks Brothers",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Brooks Running",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Brunello Cucinelli",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Bulova",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Burberry",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Burberry Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Burna Boy x BoohooMAN",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Bvlgari (Bulgari)",
    "category": [
      "Jewelry & Accessories",
      "Watches",
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "BY FAR",
    "category": [
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Byredo",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Call It Spring",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Calvin Klein",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Underwear",
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Calvin Klein Jeans",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Camille Rose",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Canada Goose",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Canali",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Cantu",
    "category": [
      "Beauty & Personal Care",
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Carhartt",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Carhartt WIP",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Carter's",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Cartier",
    "category": [
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Cartier Jewelry",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Carvela",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Casio",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Casio / G-Shock / Edifice",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Catimini",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Celine",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "CeraVe",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Cesare Attolini",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Cetaphil",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Chaco",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Chanel",
    "category": [
      "Women's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear",
      "Jewelry & Accessories",
      "Watches",
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Chanel Beauty & Fragrance",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Charles & Keith",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Charles Tyrwhitt",
    "category": [
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Charlotte Tilbury",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Chaumet",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Chiganvy Wax",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Chike The Brother's Keeper Merch",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Children's Place",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Chloé",
    "category": [
      "Women's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Chopard",
    "category": [
      "Jewelry & Accessories",
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Christian Dior",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Christian Louboutin",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Christie Brown",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Christie Brown (Ghana)",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Church's",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Cinnamon Lagos",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Citizen",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Citizens of Humanity",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Clarks",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Classic Makeup USA",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Classic Makeup USA / NG",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Claudie Pierlot",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Clinique",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Club L London",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Coach",
    "category": [
      "Bags & Luggage",
      "Women's Fashion",
      "Men's Fashion",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Coast",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Cobbler / Luxury Shoe & Bag Spa",
    "category": [
      "Fashion Services"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Cole Haan",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Comme des Garçons",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Converse",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Coperni",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Corneliani",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Corteiz",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "COS",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Cosrx (Korean Skincare)",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Creed",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Crockett & Jones",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Crocs",
    "category": [
      "Shoes & Footwear",
      "Kids Fashion",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Cult Gaia",
    "category": [
      "Women's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Curren",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Daily Paper",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Daisy London",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Danessa Myricks Beauty",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Daniel Wellington",
    "category": [
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Danielle Allen",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Darling Hair Nigeria",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "David Tlale (South Africa)",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "David Wej",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "David Yurman",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Davido x Puma Collection",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Deco (Deco_D29)",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Deepa Dosaja (Kenya)",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Delsey Paris",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Delvaux",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Denim Project NG",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Denim Tears",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Denola Grey Collection",
    "category": [
      "Men's Fashion",
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Deola Sagoe",
    "category": [
      "Women's Fashion",
      "Wedding Wear",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Deuter",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Diesel",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Diesel Watches",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Dior",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage",
      "Beauty & Personal Care",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Dior Fragrance & Beauty",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Diptyque",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Dita Eyewear",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "DKNY",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "DNA by Iconic Invanity",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Dockers",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Dolce & Gabbana",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Don Jazzy Mavin Merch",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Donna Karan",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Dormeuil",
    "category": [
      "Fabrics & Traditional Wear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Dr. Martens",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Dricky",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Dsquared2",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Dune London",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Dunhill",
    "category": [
      "Men's Fashion",
      "Bags & Luggage",
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Dyson (Hair Care Tools)",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Dzyn Couture",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Eastpak",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ebuka Obi-Uchendu Collection",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Ecco",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Edward Green",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Edwin",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Eileen Fisher",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ejiro Amos Tafiri",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Elie Saab",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Emmy Kasbit",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Emporio Armani",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Enda Running (Kenya)",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Epara Skincare",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Equipment",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ermenegildo Zegna",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Essentials",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Estée Lauder",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ethnik by Tunde Owolabi",
    "category": [
      "Shoes & Footwear",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Everlane",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Evisu",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "F&F Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Fair & White Paris",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Falz The Bahd Guy Merch",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Fashion Nova",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Fashpa",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Faso Dan Fani (Burkina Faso)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Fear of God",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "FemiHandbags",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Fendi",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Fenty Beauty by Rihanna",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Fenty Skin",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ferragamo",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Men's Fashion",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Ferragamo Belts",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Filtex Voile Lace",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Fireboy DML Apollo Merch",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Fisayo Longe (Kai Collective)",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Fitbit",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Fjällräven (Kånken)",
    "category": [
      "Bags & Luggage",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Flavour Nabania Merch",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Forever 21",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Fossil",
    "category": [
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Fossil Bags",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "FRAME",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Fred Perry",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Free People",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Free Spirits Lagos",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Free The Youth",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Free The Youth (Ghana)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Freetress",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "French Connection",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "French Lace & Tulle",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Fruché",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Funke Adepoju",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "G-Shock",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "G-Star RAW",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Gallery Dept.",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Ganni",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Gap",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Gap Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Garmin",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Garmspot",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Gbenga Artsmith (African Jewelry)",
    "category": [
      "Jewelry & Accessories",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Geneva",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Gentle Monster",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "George at Asda",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Geox",
    "category": [
      "Shoes & Footwear",
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Getzner Brocade (Austrian Bazin)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "ghd",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Gianvito Rossi",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Gideon's Hermosa",
    "category": [
      "Men's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Gieves & Hawkes",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ginani Fashion Training",
    "category": [
      "Fashion Services"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Giorgio Armani",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Giorgio Armani Beauty",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Givenchy",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Glossier",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Golden Goose",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Goyard",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Graff",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Grenson",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Grey Projects",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "GTP (Ghana Textiles Printing)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Gucci",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage",
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Gucci Belts",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Gucci Eyewear",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Gucci Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Guess Bags",
    "category": [
      "Bags & Luggage",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Gymboree",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "H&M",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "H&M Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Hackett London",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Haggar",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hair by Wanneka",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Halston",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Harry Winston",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Haute Baso (Rwanda)",
    "category": [
      "Women's Fashion",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Havaianas",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Hawes & Curtis",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hellstar",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Henry Poole & Co",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hermès",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Hermès Belt & Jewelry",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Heron Preston",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Herschel Supply Co.",
    "category": [
      "Bags & Luggage",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Hesey Designs",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hesey Designs Footwear",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Hi-Target Wax",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "High Fashion by Tolubally",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Hitarget Super Wax",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hobbs",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "HOH Hofer Hecht Lace",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hoka One One",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Holland & Sherry",
    "category": [
      "Fabrics & Traditional Wear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hollister",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Homecore Lagos",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "House of CB",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "House of Kaya",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "House of Tara",
    "category": [
      "Beauty & Personal Care",
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "House of Tara Makeup Academy",
    "category": [
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "House of Tayo (Rwanda)",
    "category": [
      "Men's Fashion",
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Huawei Watch",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hublot",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Huda Beauty",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Hudayya Couture",
    "category": [
      "Women's Fashion",
      "Wedding Wear",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Hugo Boss",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Hunter",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Hush Puppies",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "IAMISIGO (Bubu Ogisi)",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Icecream",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Iconic Invanity",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Ileke Eko Traditional Beads",
    "category": [
      "Jewelry & Accessories",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Imad Eduso",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Initio Parfums Prives",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Invicta",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Ipanema",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Isee Hair",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Iseyin Aso-Oke Authentic",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Issey Miyake",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Ituen Basi",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "IWC Schaffhausen",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "J Brand",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "J-Reason",
    "category": [
      "Men's Fashion",
      "Fashion Services"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "J.Crew",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Jacadi Paris",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Jack & Jones",
    "category": [
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Jacquemus",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Jaeger-LeCoultre",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Janet Collection",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Jansport",
    "category": [
      "Bags & Luggage",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Jaxmon Tailoring",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Jil Sander",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Jimmy Choo",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Jo Malone London",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "John Hardy",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "John Lobb",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Johnny Drille Merch",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Joie",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Jordan / Air Jordan",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Jordan Kids",
    "category": [
      "Kids Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Jovani",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Julius Holland Wax",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Juvia's Place",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "JW Pei",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Kai Collective",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Kamsi Tcharles",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Kano Genuine Leatherworks",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Karen Millen",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kate Spade",
    "category": [
      "Bags & Luggage",
      "Women's Fashion",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Katush by Katungulu Mwendwa (Kenya)",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Keedo",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Keen",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kendra Scott",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Kene Rapu",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kene Rapu Footwear",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Kenneth Cole",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear",
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kenneth Ize",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Kente Gentlemen (Ivory Coast)",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Kenzo",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kenzo Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kérastase",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Khadijah (Kadiju)",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Khuraira Cosmetics",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Kiki Clothing (Ghana)",
    "category": [
      "Kids Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Kiki Kamanu",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "KikoRomeo (Kenya)",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Kilian Paris",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Kimono Kollection",
    "category": [
      "Men's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Kipfashion",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kipling",
    "category": [
      "Bags & Luggage",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Kisara",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kisara Handbags",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Kith",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kiton",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kizz Daniel Flyboy Merch",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Klaiyi Hair",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kobe Brocade",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Kojey Radical Merch",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Kola Kuddus",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Komole Kandids by Deola Sagoe",
    "category": [
      "Women's Fashion",
      "Wedding Wear",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Kurt Geiger",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Kwara Aso-Oke Handloom",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "L'Oréal Paris",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "La Roche-Posay",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Labrum London",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Lacoste",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Lady Biba",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Lafalaise Dion (Ivory Coast - Cowries)",
    "category": [
      "Jewelry & Accessories",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Lagos Space Programme",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Lancôme",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Lanre Da Silva Ajayi (LDA)",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Lanvin",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Lattafa Perfumes",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Le Labo",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Lee",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Lelli Kelly",
    "category": [
      "Kids Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Levi's",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Lipsy London",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Lisa Folawiyo",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Loake",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Loewe",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "LOFT",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Longchamp",
    "category": [
      "Bags & Luggage",
      "Travel Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Longines",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Loro Piana",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Loro Piana Fabrics",
    "category": [
      "Fabrics & Traditional Wear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Louis Vuitton",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear",
      "Jewelry & Accessories",
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Loza Maléombho (Ivory Coast)",
    "category": [
      "Women's Fashion",
      "Shoes & Footwear",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Lukhanyo Mdingi (South Africa)",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Lulu's",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Lush Hair Nigeria",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Luvme Hair",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Lyle & Scott",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "MAC Cosmetics",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Mac Duggal",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mach & Mach",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Magnanni",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mai Atafo",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Wedding Wear",
      "Fashion Services",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Mai Atafo Bespoke Tailoring",
    "category": [
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Maison Artc (Morocco)",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Maison Francis Kurkdjian (Baccarat Rouge)",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Maison Margiela",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Maje",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Maki Oh",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Mamas & Papas",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mancera Paris",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mango",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Manolo Blahnik",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Mansur Gavriel",
    "category": [
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Marc Jacobs",
    "category": [
      "Bags & Luggage",
      "Women's Fashion",
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Maria Black",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Marks & Spencer Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Marrakech Souk Leathercraft",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Massimo Dutti",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Matopeda Atelier (Tope FnR)",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Maui Jim",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Max Mara",
    "category": [
      "Women's Fashion",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Maxhosa Africa (Laduma Ngxokolo)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Bags & Luggage",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Maybelline New York",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Mayoral",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Mazelle Studio",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Mega Growth",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Megalook Hair",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Megir",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Meji Meji",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Mejuri",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Melissa",
    "category": [
      "Shoes & Footwear",
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Merrell",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Meshki",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Messika",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mezlan",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Michael Kors",
    "category": [
      "Bags & Luggage",
      "Women's Fashion",
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Mielle Organics",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Mikimoto (Pearls)",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mille Collines (Rwanda)",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Mina Stones (Fine Jewelry)",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Missguided",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Missoma London",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Mistress Rocks",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mitex Holland",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Miu Miu",
    "category": [
      "Women's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mizuno",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "MmusoMaxwell (South Africa)",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Model Model",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Monaa Footwear (Ghana)",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Moncler",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Moncler Enfant",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mondaine",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Monica Vinader",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Monos",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Monsoon",
    "category": [
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Montale Paris",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Montblanc",
    "category": [
      "Jewelry & Accessories",
      "Watches",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Moofa",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Moofa Designs",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Morafa",
    "category": [
      "Men's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Moschino",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mother Denim",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mothercare",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Motherlan Lagos",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Movado",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mowalola",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Moynat",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Mudi Africa",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "MVMT",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Nack Apparel",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Nadula Hair",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Naira Marley Marlian Merch",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "NARS Cosmetics",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Nasty Gal",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Natures Gentle Touch",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Nautica",
    "category": [
      "Men's Fashion",
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Naviforce",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Needle & Thread",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Neutrogena",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "New Balance",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "New Look",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Next Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Nibosi",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Nike",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Nike Jordan",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Nike Kids",
    "category": [
      "Kids Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Nine West",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Nivea",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Nixon",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Noah",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Nonnistics",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Nuban Beauty",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Nudie Jeans",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "NYX Professional Makeup",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Oakley",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Odio Mimonet",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Off-White",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Ogake Couture",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Oh Polly",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Okhtein Luxury Bags (Egypt)",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Okunoren Twins",
    "category": [
      "Men's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Olaplex",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Old Navy",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Oliver Peoples",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Omega",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "On Running",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Orange Culture",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Orient",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Original Akwete Weave",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Original George (Indian Raw Silk)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Original Swiss Voile Lace (St. Gallen)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Oriki Farm to Skin Spa",
    "category": [
      "Beauty & Personal Care",
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "ORS Olive Oil",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Osei Duro (Ghana)",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "OshKosh B'gosh",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Osprey",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Outre",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Pablosky",
    "category": [
      "Kids Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Pagani Design",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Paige",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Palace",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Palm Angels",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Pandora",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Panerai",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Parfums de Marly",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Patek Philippe",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Paul Smith",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Paula's Choice",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Penguin (Original Penguin)",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Pepe Jeans",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Perry Ellis",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Persol",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Petit Bateau",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Phase Eight",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Philipp Plein",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Phoenix Wax",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Phyno Highway Merch",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Piaget",
    "category": [
      "Jewelry & Accessories",
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Pistis Ghana",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "PITH Africa",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Polène Paris",
    "category": [
      "Bags & Luggage",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Police",
    "category": [
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Polo Ralph Lauren",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Polo Ralph Lauren Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Prada",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Prada Eyewear",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "PrettyLittleThing",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Primark Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Princess Polly",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Pull&Bear",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Puma",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Puma Kids",
    "category": [
      "Kids Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Quiz Clothing",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "R&R Luxury (Shea Oil)",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Rado",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Ralph Lauren",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Rare Beauty by Selena Gomez",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Rasasi",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rave & Roses Merch (Rema)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Ray-Ban",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Rebel NG",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Reebok",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Reiss",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rendoll Lagos",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Replay",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Represent",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Revolve",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rhobes Clothing",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Rhodes Fashion School",
    "category": [
      "Fashion Services"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rhude",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rich Mnisi (South Africa)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Richard Mille",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Rick Owens",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rider",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rimowa",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "River Island",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Rixo",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rocstar NG",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Rogue NG",
    "category": [
      "Men's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Rois & Reine",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Rolex",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Rotate Birger Christensen",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Rouje",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Royal Hair Lagos",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Ruff 'n' Tumble",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "S.T. Dupont",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Saint Laurent",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Salomon",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Salvatore Ferragamo",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Samsonite",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Samsung Galaxy Watch",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Sandro",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Sandstorm Kenya (Bags)",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Santoni",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Sanusi Lagos",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Saucony",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Savile Row Bespoke Standards",
    "category": [
      "Fashion Services"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Scabal (Luxury Wool & Cashmere)",
    "category": [
      "Fabrics & Traditional Wear",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Scotch & Soda",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Seiko",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Selected Homme",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Self-Portrait",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Selfi (South Africa)",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Selly Raby Kane (Senegal)",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Sensationnel",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Severe Nature",
    "category": [
      "Men's Fashion",
      "Streetwear",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Seyivodi",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear",
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Seyivodi Atelier Service",
    "category": [
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Sézane",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Shea Moisture",
    "category": [
      "Beauty & Personal Care",
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Shein",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Shekudo",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Shekudo Footwear",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Sherri Hill",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Shweshwe Fabric (South Africa)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Simi To Be Honest Merch",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Celebrity"
  },
  {
    "name": "Sindiso Khumalo (South Africa)",
    "category": [
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Skechers",
    "category": [
      "Shoes & Footwear",
      "Kids Fashion",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Skepta (Mains London)",
    "category": [
      "Men's Fashion",
      "Streetwear",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Skin Science Africa",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Skin1004",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Skmei",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Slawn (Beau Beau)",
    "category": [
      "Men's Fashion",
      "Streetwear",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Sol de Janeiro",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Sp5der (Spider Worldwide)",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Spaceship / Burna Boy Merch",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Starboy Official (Wizkid)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Start-Rite",
    "category": [
      "Kids Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Staud",
    "category": [
      "Women's Fashion",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Stefano Ricci",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear",
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Stella McCartney",
    "category": [
      "Women's Fashion",
      "Bags & Luggage",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Stella McCartney Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Steve Madden",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Stone Island",
    "category": [
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Stradivarius",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Strathberry",
    "category": [
      "Bags & Luggage",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Street Souk Official",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Stuart Weitzman",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Studio 189 (Ghana)",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Stüssy",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Style Temple",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Suitsupply",
    "category": [
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Superdry",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Supreme",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Swanky Signatures (Swanky Jerry)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Swarovski",
    "category": [
      "Jewelry & Accessories",
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Swatch",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Swiss Arabian",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Tag Heuer",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Taliah Waajid",
    "category": [
      "Hair & Wigs",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Tartine et Chocolat",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Taryor Gabriels",
    "category": [
      "Men's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Ted Baker",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Telfar",
    "category": [
      "Bags & Luggage",
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tems For Broken Ears Merch",
    "category": [
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Teva",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "The Kooples",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "The North Face",
    "category": [
      "Bags & Luggage",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "The Ordinary",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Thebe Magugu (South Africa)",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Theory",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Thirsty Lab",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Thom Browne",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Thomas Pink",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Thomas Sabo",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Tiannah Styling & Academy",
    "category": [
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tiannah's Empire (Toyin Lawani)",
    "category": [
      "Women's Fashion",
      "Fashion Services",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Tiffany & Co.",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tiffany Amber",
    "category": [
      "Women's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Tiger Mist",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Timberland",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Timex",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Timini Egbuson Dapper Collection",
    "category": [
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Tissot",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Titi Belo Footwear",
    "category": [
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "TJ Bespoke",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "TM Lewin",
    "category": [
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tod's",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Toju Foyeh",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Tokyo James",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Tom Ford",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Beauty & Personal Care",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tom Ford Beauty & Fragrances",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tom Ford Eyewear",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tommy Hilfiger",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Kids Fashion",
      "Watches",
      "Shoes & Footwear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tommy Hilfiger Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Tongoro Studio (Senegal - Diarrabousso)",
    "category": [
      "Women's Fashion",
      "Bags & Luggage",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Too Faced",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Topman",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Topshop",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Tory Burch",
    "category": [
      "Bags & Luggage",
      "Shoes & Footwear",
      "Women's Fashion",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Trapstar",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Travelpro",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Tribes by Nobs (Noble Igwe)",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Tricker's",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "True Religion",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "TT Dalk Footwear & Leather",
    "category": [
      "Shoes & Footwear",
      "Bags & Luggage",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Tubō (Tubo)",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Tudor",
    "category": [
      "Watches"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Tumi",
    "category": [
      "Bags & Luggage",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Turnbull & Asser",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Twelve06 Atelier",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "UGG",
    "category": [
      "Shoes & Footwear",
      "Women's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Ugo Monye",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Under Armour",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "UNice Hair",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Uniqlo",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Uniwax",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Uno de 50",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Urban Decay",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Urban Outfitters",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Vacheron Constantin",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Valentino",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Valextra",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Valisimo Fashion Academy",
    "category": [
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Van Cleef & Arpels",
    "category": [
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Vanguard Lagos",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Vans",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Vanskere",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Vanskere Bespoke Studio",
    "category": [
      "Fashion Services"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Veekee James",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Veekee James (VJ)",
    "category": [
      "Women's Fashion",
      "Wedding Wear",
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Vera Wang",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Versace",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Watches",
      "Jewelry & Accessories"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Victoria's Secret Beauty",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Vince",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Vivendii",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Vivienne Westwood",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Jewelry & Accessories",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Viviers (South Africa)",
    "category": [
      "Women's Fashion",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Vlisco (Original Dutch Wax / Hollandais)",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Vlone",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "WafflesNCream",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "WafflesNCream (waf.)",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Waliey Lagos",
    "category": [
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Nigerian"
  },
  {
    "name": "Wandler",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Water & Garri Merch (Tiwa Savage)",
    "category": [
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Whistles",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "White Fox Boutique",
    "category": [
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Wig Revival / Laundry Specialists",
    "category": [
      "Fashion Services"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Wiggins Hair",
    "category": [
      "Hair & Wigs"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Wizkid x Puma Africa",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Woodin",
    "category": [
      "Fabrics & Traditional Wear"
    ],
    "popular": true,
    "origin": "African"
  },
  {
    "name": "Wrangler",
    "category": [
      "Men's Fashion",
      "Women's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "X-Pression (Ultra Braid)",
    "category": [
      "Hair & Wigs"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Xerjoff",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Xiaomi Watch",
    "category": [
      "Watches"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "YBNL Nation Merch (Olamide)",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Yeezy",
    "category": [
      "Shoes & Footwear",
      "Men's Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Yomi Casual",
    "category": [
      "Men's Fashion",
      "Fabrics & Traditional Wear",
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Yomi Casual Bespoke",
    "category": [
      "Fashion Services"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Yves Saint Laurent",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Beauty & Personal Care"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Yves Saint Laurent Beauty",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Zaam Designs (Egypt)",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "African"
  },
  {
    "name": "Zadig & Voltaire",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Zara",
    "category": [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion",
      "Shoes & Footwear",
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Zara Fragrances",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Zara Kids",
    "category": [
      "Kids Fashion"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Zaron Cosmetics",
    "category": [
      "Beauty & Personal Care"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Zashadu",
    "category": [
      "Bags & Luggage"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Zashadu Luxury Handbags",
    "category": [
      "Bags & Luggage"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Zegna",
    "category": [
      "Men's Fashion",
      "Shoes & Footwear"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Zegna Fabrics",
    "category": [
      "Fabrics & Traditional Wear",
      "Men's Fashion"
    ],
    "popular": false,
    "origin": "Global"
  },
  {
    "name": "Zimmermann",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": true,
    "origin": "Global"
  },
  {
    "name": "Zip Republic",
    "category": [
      "Men's Fashion",
      "Women's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Nigerian"
  },
  {
    "name": "Zlatan Zanku Merch",
    "category": [
      "Men's Fashion",
      "Streetwear"
    ],
    "popular": true,
    "origin": "Celebrity"
  },
  {
    "name": "Zubair Couture",
    "category": [
      "Women's Fashion",
      "Wedding Wear"
    ],
    "popular": false,
    "origin": "Global"
  }
];
