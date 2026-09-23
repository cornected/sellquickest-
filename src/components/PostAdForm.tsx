"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

import { NIGERIA_LOCATIONS } from "@/lib/nigeriaLocations";

import { SparePartsFields } from "@/components/Vehicles/SparePartsFields";
import { StyledSelect } from "@/components/StyledSelect";

/* VEHICLE */

import { AutomobileFields } from "@/components/Vehicles/AutomobileFields";
import DropdownWithOther from "./DropdownWithOther";
import { BikeFields } from "./Vehicles/BikeFields";
import { BusVanFields } from "@/components/Vehicles/BusVanFields";
import { TruckTrailerFields } from "./Vehicles/TruckTrailerFields";
import { HeavyMachineryFields } from "@/components/Vehicles/HeavyMachineryFields";
import { MarineFields } from "./Vehicles/MarineFields";

/* REAL-ESTATE */

import { ApartmentFields } from "@/components/Property/ApartmentFields";
import { LandFields } from "@/components/Property/LandFields";
import { CommercialPropertyFields } from "@/components/Property/CommercialPropertyFields";
import { ShortLetFields } from "@/components/Property/ShortLetFields";
import { EventSpaceFields } from "@/components/Property/EventSpaceFields";
import { OfficeFields } from "@/components/Property/OfficeFields";
import { WarehouseFields } from "@/components/Property/WarehouseFields";
import { FarmFields } from "@/components/Property/FarmFields";
import { NewBuildFields } from "@/components/Property/NewBuildFields";

/* FASHION */

import { WomensFashionFields } from "@/components/Fashion/WomensFashionFields";
import { MensFashionFields } from "@/components/Fashion/MensFashionFields";
import { KidsFashionFields } from "@/components/Fashion/Kids/KidsFashionFields";
import { ShoesFootwearFields } from "@/components/Fashion/ShoesFootwearFields";
import { BagsLuggageFields } from "@/components/Fashion/BagsLuggageFields";
import { WatchesFields } from "@/components/Fashion/WatchesFields";
import { JewelryAccessoriesFields } from "@/components/Fashion/JewelryAccessoriesFields";
import { HairWigsFields } from "@/components/Fashion/HairWigsFields";
import { BeautyPersonalCareFields } from "@/components/Fashion/BeautyPersonalCareFields";
import { FabricsTraditionalWearFields } from "@/components/Fashion/FabricsTraditionalWearFields";
import { FashionServicesFields } from "@/components/Fashion/FashionServicesFields";

/* PHONES & TABLETS */
import { MobilePhonesFields } from "@/components/Phones/MobilePhonesFields";
import { TabletsFields } from "@/components/Phones/TabletsFields";
import { SmartwatchesFields } from "@/components/Phones/SmartwatchesFields";
import { PhoneAccessoriesFields } from "@/components/Phones/PhoneAccessoriesFields";

/* ELECTRONICS */
import { TVVideoFields } from "@/components/Electronics/TVVideoFields";
import { ComputerLaptopsFields } from "@/components/Electronics/ComputerLaptopsFields";
import { AudioMusicFields } from "@/components/Electronics/AudioMusicFields";
import { VideoGamesFields } from "@/components/Electronics/VideoGamesFields";
import { CamerasOpticsFields } from "@/components/Electronics/CamerasOpticsFields";
import { GeneralElectronicsFields } from "@/components/Electronics/GeneralElectronicsFields";

/* HOME & APPLIANCES */
import { FurnitureFields } from "@/components/Home/FurnitureFields";
import { HomeAppliancesFields } from "@/components/Home/HomeAppliancesFields";
import { PowerSolarGeneratorsFields } from "@/components/Home/PowerSolarGeneratorsFields";
import { HomeDecorFields } from "@/components/Home/HomeDecorFields";

/* BEAUTY */
import { BeautyCategoryFields } from "@/components/Beauty/BeautyCategoryFields";

/* AGRICULTURE */
import { AgricultureFields } from "@/components/Agriculture/AgricultureFields";

/* SPORTS */
import { SportsFields } from "@/components/Sports/SportsFields";

/* PETS */
import { PetsFields } from "@/components/Pets/PetsFields";

/* SERVICES */
import { ServicesFields } from "@/components/Services/ServicesFields";

/* JOBS */
import { JobsFields } from "@/components/Jobs/JobsFields";

/* BABIES & KIDS */
import { BabiesKidsFields } from "@/components/Babies/BabiesKidsFields";

/* COMMERCIAL EQUIPMENT */
import { CommercialEquipmentFields } from "@/components/Commercial/CommercialEquipmentFields";

/* REPAIR & CONSTRUCTION */
import { RepairConstructionFields } from "@/components/Construction/RepairConstructionFields";

/* BUSINESS & INDUSTRY */
import { BusinessIndustryFields } from "@/components/Business/BusinessIndustryFields";
type Category = {
  id: string;
  name: string;
};

export function PostAdForm({ categories }: { categories: Category[] }) {
  const router = useRouter();

  const [brand, setBrand] = useState("");

  // BASIC STATES

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  // AD STATES
  const [negotiable, setNegotiable] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // CATEGORY + LOCATION STATES

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [selectedState, setSelectedState] = useState("");

  const [selectedLga, setSelectedLga] = useState("");

  const categoryRef = useRef<HTMLDivElement | null>(null);

  const locationRef = useRef<HTMLDivElement | null>(null);

  // MENU CONTROLLER
  const [activeMenu, setActiveMenu] = useState<"category" | "location" | "">(
    "",
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedInsideCategory = categoryRef.current?.contains(target);

      const clickedInsideLocation = locationRef.current?.contains(target);

      if (!clickedInsideCategory && !clickedInsideLocation) {
        setActiveMenu("");
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // AUTOMOBILE, SPARE PARTS, AND OTHER DATA STATES
  const [automobileData, setAutomobileData] = useState({});
  const [sparePartsData, setSparePartsData] = useState({});
  const [bikeData, setBikeData] = useState({});
  const [busVanData, setBusVanData] = useState({});
  const [truckTrailerData, setTruckTrailerData] = useState({});
  const [heavyMachineryData, setHeavyMachineryData] = useState({});
  const [marineData, setMarineData] = useState({});
  const [propertyData, setPropertyData] = useState({});
  const [fashionData, setFashionData] = useState({});
  const [phoneData, setPhoneData] = useState({});

  /* NEW MARKETPLACE CATEGORIES */
  const [electronicsData, setElectronicsData] = useState({});
  const [homeData, setHomeData] = useState({});
  const [beautyData, setBeautyData] = useState({});
  const [agricultureData, setAgricultureData] = useState({});
  const [sportsData, setSportsData] = useState({});
  const [petsData, setPetsData] = useState({});
  const [servicesData, setServicesData] = useState({});
  const [jobsData, setJobsData] = useState({});
  const [babiesData, setBabiesData] = useState({});
  const [commercialData, setCommercialData] = useState({});
  const [constructionData, setConstructionData] = useState({});
  const [businessData, setBusinessData] = useState({});

  // RESET ALL CATEGORY-SPECIFIC FORM DATA
  const resetAllCategoryData = () => {
    setAutomobileData({});
    setSparePartsData({});
    setBikeData({});
    setBusVanData({});
    setTruckTrailerData({});
    setHeavyMachineryData({});
    setMarineData({});
    setPropertyData({});
    setFashionData({});
    setPhoneData({});
    setElectronicsData({});
    setHomeData({});
    setBeautyData({});
    setAgricultureData({});
    setSportsData({});
    setPetsData({});
    setServicesData({});
    setJobsData({});
    setBabiesData({});
    setCommercialData({});
    setConstructionData({});
    setBusinessData({});
  };

  // SUB CATEGORY LIST
  let subCategories = ["General Specifications", "Standard Variant"];

  const catName = selectedCategory?.name.toLowerCase() || "";

  // 1. VEHICLES
  if (catName.includes("vehic")) {
    subCategories = [
      "Automobiles",
      "Spares & Car Care",
      "Bikes, Scooters & E-Mobility",
      "Buses & Commercial Vans",
      "Haulage Trucks & Trailers",
      "Heavy Duty & Plant Machinery",
      "Marine Vessels & Boats",
    ];
  }

  // 2. PROPERTY
  else if (catName.includes("prop")) {
    subCategories = [
      "Houses & Apartments",
      "Land & Plots",
      "Commercial Property",
      "Short Let",
      "Office Space",
      "Event Centres & Venues",
      "Warehouse & Industrial",
      "Farms & Agricultural Land",
      "New Builds",
    ];
  }

  // 3. FASHION
  else if (catName.includes("fashion")) {
    subCategories = [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion",
      "Shoes & Footwear",
      "Bags & Luggage",
      "Watches",
      "Jewelry & Accessories",
      "Hair & Wigs",
      "Beauty & Personal Care",
      "Fabrics & Traditional Wear",
      "Fashion Services",
    ];
  }

  // 4. PHONES & TABLETS
  else if (catName.includes("phone") || catName.includes("tablet")) {
    subCategories = [
      "Mobile Phones",
      "Tablets",
      "Smartwatches & Trackers",
      "Accessories & Spares",
    ];
  }

  // 5. ELECTRONICS
  else if (catName.includes("elect")) {
    subCategories = [
      "TV & DVD Equipment",
      "Audio & Music Systems",
      "Laptops & Computers",
      "Video Games & Consoles",
      "Cameras & Camcorders",
      "Security & Surveillance",
      "Computer Accessories & Hardware",
      "Printers & Scanners",
    ];
  }

  // 6. HOME, FURNITURE & APPLIANCES
  else if (catName.includes("home")) {
    subCategories = [
      "Furniture",
      "Home & Kitchen Appliances",
      "Power, Solar & Generators",
      "Home Decor & Interior",
      "Garden & Outdoor",
    ];
  }

  // 7. BEAUTY & PERSONAL CARE
  else if (catName.includes("beauty")) {
    subCategories = [
      "Fragrances & Perfumes",
      "Skincare & Sunscreen",
      "Hair Beauty & Extensions",
      "Makeup & Cosmetics",
      "Bath, Body & Oral Care",
      "Beauty Equipment & Tools",
    ];
  }

  // 8. AGRICULTURE & FOOD
  else if (catName.includes("agric")) {
    subCategories = [
      "Farm Produce & Foodstuff",
      "Livestock & Poultry",
      "Fish & Aquaculture",
      "Farm Machinery & Equipment",
      "Feeds, Seeds & Agro-Chemicals",
    ];
  }

  // 9. SPORTS, ARTS & OUTDOORS
  else if (catName.includes("sport")) {
    subCategories = [
      "Fitness & Gym Equipment",
      "Team Sports & Athletics",
      "Musical Instruments & Gear",
      "Bicycles & Cycling Gear",
      "Books, Arts & Crafts",
      "Camping & Outdoor Gear",
    ];
  }

  // 10. PETS
  else if (catName.includes("pet")) {
    subCategories = [
      "Dogs & Puppies",
      "Birds & Parrots",
      "Cats & Kittens",
      "Pet Accessories & Kennels",
      "Pet Food & Animal Care",
    ];
  }

  // 11. SERVICES
  else if (catName.includes("service")) {
    subCategories = [
      "Building & Trades",
      "Cleaning & Fumigation",
      "Chauffeur, Haulage & Logistics",
      "Event Planning & Catering",
      "Computer & Digital Services",
      "Auto Repair & Servicing",
    ];
  }

  // 12. JOBS
  else if (catName.includes("job")) {
    subCategories = [
      "Job Vacancies (Hiring)",
      "Job Seekers & CV (Available for Work)",
    ];
  }

  // 13. BABIES & KIDS
  else if (catName.includes("bab") || catName.includes("kid")) {
    subCategories = [
      "Baby & Child Care",
      "Children's Clothing & Costumes",
      "Children's Shoes",
      "Children's Furniture & Cots",
      "Toys & Learning Games",
      "Maternity & Nursing",
    ];
  }

  // 14. COMMERCIAL EQUIPMENT & TOOLS
  else if (catName.includes("commercial") || catName.includes("equipment")) {
    subCategories = [
      "Restaurant & Catering Equipment",
      "Industrial & Manufacturing Machinery",
      "Printing & Graphics Machines",
      "Medical, Dental & Laboratory Equipment",
      "Salon, Spa & Barbershop Equipment",
      "Store, Supermarket & Retail Fixtures",
    ];
  }

  // 15. REPAIR & CONSTRUCTION
  else if (catName.includes("repair") || catName.includes("construct")) {
    subCategories = [
      "Building Materials",
      "Solar & Electrical Installations",
      "Plumbing & Water Supplies",
      "Doors, Windows & Aluminium",
      "Power & Hand Tools",
      "Flooring, Tiles & Granite",
    ];
  }

  // 16. BUSINESS & INDUSTRY
  else if (catName.includes("business") || catName.includes("industry")) {
    subCategories = [
      "Businesses For Sale (Turnkey Operations)",
      "Industrial Raw Materials & Chemicals",
      "Wholesale & Bulk Inventory Clearance",
      "Franchise & Dealership Opportunities",
      "Industrial Safety & PPE Gear",
      "Mining & Heavy Processing Equipment",
    ];
  }

  // SUBMIT HANDLER

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setPending(true);

    const form = new FormData(e.currentTarget);

    const completeLocation = `${selectedState}, ${selectedLga}`;

    const imageFiles = form
      .getAll("images")
      .filter(
        (value): value is File => value instanceof File && value.size > 0,
      );

    if (imageFiles.length < 3 || imageFiles.length > 10) {
      setError("Please upload between 3 and 10 images.");

      setPending(false);

      return;
    }

    const imageData = await Promise.all(
      imageFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(String(reader.result));

            reader.onerror = () => reject(new Error("Could not read image"));

            reader.readAsDataURL(file);
          }),
      ),
    );

    try {
      const res = await fetch("/api/listings", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: form.get("title"),

          description: form.get("description"),

          price: Number(form.get("price")),

          negotiable,

          location: completeLocation,

          imageUrl: JSON.stringify(imageData),

          categoryId: selectedCategory?.id,

          subcategory: selectedSubCategory,

          spareDetails:
            selectedSubCategory === "Spares & Car Care" ? sparePartsData : null,

          metadata: {
            details:
              // VEHICLE
              catName.includes("vehic")
                ? selectedSubCategory === "Automobiles"
                  ? automobileData
                  : selectedSubCategory === "Bikes, Scooters & E-Mobility"
                    ? bikeData
                    : selectedSubCategory === "Buses & Commercial Vans"
                      ? busVanData
                      : selectedSubCategory === "Haulage Trucks & Trailers"
                        ? truckTrailerData
                        : selectedSubCategory === "Heavy Duty & Plant Machinery"
                          ? heavyMachineryData
                          : selectedSubCategory === "Marine Vessels & Boats"
                            ? marineData
                            : automobileData
                : // PROPERTY
                  catName.includes("prop")
                  ? propertyData
                  : // FASHION
                    catName.includes("fashion")
                    ? fashionData
                    : // PHONES & TABLETS
                      catName.includes("phone") || catName.includes("tablet")
                      ? phoneData
                      : // ELECTRONICS
                        catName.includes("elect")
                        ? electronicsData
                        : // HOME
                          catName.includes("home")
                          ? homeData
                          : // BEAUTY
                            catName.includes("beauty")
                            ? beautyData
                            : // AGRICULTURE
                              catName.includes("agric")
                              ? agricultureData
                              : // SPORTS
                                catName.includes("sport")
                                ? sportsData
                                : // PETS
                                  catName.includes("pet")
                                  ? petsData
                                  : // SERVICES
                                    catName.includes("service")
                                    ? servicesData
                                    : // JOBS
                                      catName.includes("job")
                                      ? jobsData
                                      : // BABIES & KIDS
                                        catName.includes("bab") || catName.includes("kid")
                                        ? babiesData
                                        : // COMMERCIAL EQUIPMENT
                                          catName.includes("commercial") || catName.includes("equipment")
                                          ? commercialData
                                          : // REPAIR & CONSTRUCTION
                                            catName.includes("repair") || catName.includes("construct")
                                            ? constructionData
                                            : // BUSINESS & INDUSTRY
                                              catName.includes("business") || catName.includes("industry")
                                              ? businessData
                                              : null,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        setError(data.error || "Could not post ad");

        setPending(false);

        return;
      }

      const listing = await res.json();

      router.push(`/listing/${listing.id}`);

      router.refresh();
    } catch {
      setError("Could not post ad. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const isGatewayUnlocked =
    selectedCategory && selectedSubCategory && selectedState && selectedLga;

  return (
    <form onSubmit={onSubmit} className="w-100 mt-3">
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div
            className="card border-0 shadow-sm p-4 mb-4"
            style={{
              borderRadius: "24px",
              backgroundColor: "#ffffff",
            }}
          >
            {/* CATEGORY + SUBCATEGORY */}

            <div ref={categoryRef} className="position-relative mb-3">
              <div className="row g-3">
                {/* CATEGORY */}

                <div
                  className="col-12 col-md-6"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    resetAllCategoryData();
                    setSelectedCategory(null);
                    setSelectedSubCategory("");

                    setActiveMenu(activeMenu === "category" ? "" : "category");
                  }}
                >
                  <label className="form-label text-secondary small fw-semibold mb-1">
                    Category
                  </label>

                  <div
                    className="form-select px-3 py-2 border-light-subtle text-secondary d-flex align-items-center"
                    style={{
                      borderRadius: "12px",
                      fontSize: "14px",
                    }}
                  >
                    {selectedCategory
                      ? selectedCategory.name
                      : "Select Category"}
                  </div>
                </div>

                {/* SUB CATEGORY */}

                <div
                  className="col-12 col-md-6"
                  style={{
                    cursor: selectedCategory ? "pointer" : "not-allowed",

                    opacity: selectedCategory ? 1 : 0.6,
                  }}
                  onClick={() => {
                    if (selectedCategory) {
                      setActiveMenu(
                        activeMenu === "category" ? "" : "category",
                      );
                    }
                  }}
                >
                  <label className="form-label text-secondary small fw-semibold mb-1">
                    Sub-Category
                  </label>

                  <div
                    className="form-select px-3 py-2 border-light-subtle text-secondary d-flex align-items-center"
                    style={{
                      borderRadius: "12px",
                      fontSize: "14px",
                    }}
                  >
                    {selectedSubCategory || "Select Sub-Category"}
                  </div>
                </div>
              </div>

              {/* CATEGORY MENU */}

              {activeMenu === "category" && (
                <div
                  className="position-absolute start-0 top-100 w-100 bg-white border shadow-sm p-4 mt-2"
                  style={{
                    borderRadius: "20px",
                    zIndex: 99,
                  }}
                >
                  <div className="d-flex justify-content-between mb-3">
                    <h4
                      className="h6 fw-bold mb-0"
                      style={{
                        color: "#0f172a",
                      }}
                    >
                      {!selectedCategory
                        ? "Choose a Category"
                        : "Choose a Sub-Category"}
                    </h4>

                    <button
                      type="button"
                      onClick={() => setActiveMenu("")}
                      className="btn border-0 text-secondary"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="row g-3">
                    {!selectedCategory
                      ? categories.map((c) => {
                          let bgCardColor = "#f1f5f9";
                          let graphicAsset = "📁";

                          const nameCheck = c.name.toLowerCase();

                          if (nameCheck.includes("agric")) {
                            bgCardColor = "#e8f5e9";
                            graphicAsset = "🌾";
                          } else if (nameCheck.includes("beauty")) {
                            bgCardColor = "#e3f2fd";
                            graphicAsset = "💄";
                          } else if (nameCheck.includes("elect")) {
                            bgCardColor = "#fff3e0";
                            graphicAsset = "📺";
                          } else if (nameCheck.includes("fash")) {
                            bgCardColor = "#f3e5f5";
                            graphicAsset = "👗";
                          } else if (nameCheck.includes("home")) {
                            bgCardColor = "#efebe9";
                            graphicAsset = "🛋️";
                          } else if (nameCheck.includes("phone")) {
                            bgCardColor = "#f1f5f9";
                            graphicAsset = "📱";
                          } else if (nameCheck.includes("prop")) {
                            bgCardColor = "#e8eaf6";
                            graphicAsset = "🏠";
                          } else if (nameCheck.includes("vehic")) {
                            bgCardColor = "#efe5fd";
                            graphicAsset = "🚗";
                          } else if (nameCheck.includes("job")) {
                            bgCardColor = "#e8f5e9";
                            graphicAsset = "💼";
                          } else if (nameCheck.includes("pet")) {
                            bgCardColor = "#fff3e0";
                            graphicAsset = "🐕";
                          } else if (nameCheck.includes("service")) {
                            bgCardColor = "#e3f2fd";
                            graphicAsset = "🔧";
                          }

                          return (
                            <div key={c.id} className="col-6 col-md-3">
                              <button
                                type="button"
                                onClick={() => {
                                  resetAllCategoryData();
                                  setSelectedCategory(c);
                                  setSelectedSubCategory("");
                                }}
                                className="btn w-100 d-flex flex-column align-items-center justify-content-center text-center p-3 border-0"
                                style={{
                                  backgroundColor: bgCardColor,

                                  borderRadius: "16px",

                                  minHeight: "105px",
                                }}
                              >
                                <span
                                  className="mb-2 d-block"
                                  style={{
                                    fontSize: "26px",
                                  }}
                                >
                                  {graphicAsset}
                                </span>

                                <span
                                  className="fw-medium text-dark text-wrap px-1"
                                  style={{
                                    fontSize: "12px",

                                    lineHeight: "1.3",
                                  }}
                                >
                                  {c.name}
                                </span>
                              </button>
                            </div>
                          );
                        })
                      : subCategories.map((subCategory) => {
                          let leftEmoji = "🔹";

                          const parentName =
                            selectedCategory?.name.toLowerCase() || "";

                          if (parentName.includes("vehic")) {
                            leftEmoji = "🚗";
                          } else if (parentName.includes("phone") || parentName.includes("tablet")) {
                            leftEmoji = "📱";
                          } else if (parentName.includes("fash")) {
                            leftEmoji = "👗";
                          } else if (parentName.includes("elect")) {
                            leftEmoji = "💻";
                          } else if (parentName.includes("prop")) {
                            leftEmoji = "🏢";
                          } else if (parentName.includes("home")) {
                            leftEmoji = "🛋️";
                          } else if (parentName.includes("beauty")) {
                            leftEmoji = "💄";
                          } else if (parentName.includes("agric")) {
                            leftEmoji = "🌾";
                          } else if (parentName.includes("sport")) {
                            leftEmoji = "⚽";
                          } else if (parentName.includes("pet")) {
                            leftEmoji = "🐕";
                          } else if (parentName.includes("service")) {
                            leftEmoji = "🔧";
                          } else if (parentName.includes("job")) {
                            leftEmoji = "💼";
                          }

                          return (
                            <div
                              key={subCategory}
                              className="col-12 col-sm-6 col-md-4"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  resetAllCategoryData();
                                  setSelectedSubCategory(subCategory);
                                  setActiveMenu("");
                                }}
                                className="btn w-100 d-flex align-items-center bg-white border border-light-subtle text-start py-3 px-3 location-option"
                                style={{
                                  borderRadius: "10px",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                                  minHeight: "64px",
                                }}
                              >
                                <span
                                  className="me-2 flex-shrink-0"
                                  style={{
                                    fontSize: "16px",
                                  }}
                                >
                                  {leftEmoji}
                                </span>

                                <span
                                  className="text-dark text-wrap fw-medium"
                                  style={{
                                    fontSize: "13px",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  {subCategory}
                                </span>
                              </button>
                            </div>
                          );
                        })}
                  </div>
                </div>
              )}
            </div>

            {/* LOCATION SECTION */}

            <div ref={locationRef} className="position-relative mb-3">
              <div className="row g-3">
                {/* STATE */}

                <div
                  className="col-12 col-md-6"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedState("");
                    setSelectedLga("");

                    setActiveMenu(activeMenu === "location" ? "" : "location");
                  }}
                >
                  <label className="form-label text-secondary small fw-semibold mb-1">
                    State
                  </label>

                  <div
                    className="form-select px-3 py-2 border-light-subtle text-secondary"
                    style={{
                      borderRadius: "12px",
                      fontSize: "14px",
                    }}
                  >
                    {selectedState || "Select State"}
                  </div>
                </div>

                {/* LGA */}

                <div
                  className="col-12 col-md-6"
                  style={{
                    cursor: selectedState ? "pointer" : "not-allowed",

                    opacity: selectedState ? 1 : 0.6,
                  }}
                  onClick={() => {
                    if (selectedState) {
                      setActiveMenu(
                        activeMenu === "location" ? "" : "location",
                      );
                    }
                  }}
                >
                  <label className="form-label text-secondary small fw-semibold mb-1">
                    Local Government (LGA)
                  </label>

                  <div
                    className="form-select px-3 py-2 border-light-subtle text-secondary"
                    style={{
                      borderRadius: "12px",
                      fontSize: "14px",
                    }}
                  >
                    {selectedLga || "Select LGA"}
                  </div>
                </div>
              </div>

              {activeMenu === "location" && (
                <div
                  className="position-absolute start-0 top-100 w-100 bg-white border shadow-sm p-4 mt-2"
                  style={{
                    borderRadius: "20px",
                    zIndex: 99,
                  }}
                >
                  <div className="d-flex justify-content-between mb-3">
                    <h4 className="h6 fw-bold">
                      {!selectedState ? "Choose State" : "Choose LGA"}
                    </h4>

                    <button
                      type="button"
                      className="btn border-0"
                      onClick={() => setActiveMenu("")}
                    >
                      ✕
                    </button>
                  </div>

                  <div
                    className="row g-2"
                    style={{
                      maxHeight: "230px",
                      overflowY: "auto",
                    }}
                  >
                    {!selectedState
                      ? Object.keys(NIGERIA_LOCATIONS).map((state) => (
                          <div key={state} className="col-6 col-md-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();

                                setSelectedState(state);
                                setSelectedLga("");
                              }}
                              className="btn btn-light w-100 text-start text-truncate py-2 px-3 border border-light-subtle bg-white text-secondary location-option"
                              style={{
                                fontSize: "13px",
                                minHeight: "46px",

                                borderRadius: "8px",
                              }}
                            >
                              {state}
                            </button>
                          </div>
                        ))
                      : NIGERIA_LOCATIONS[selectedState].map((lga) => (
                          <div key={lga} className="col-6 col-md-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();

                                setSelectedLga(lga);
                                setActiveMenu("");
                              }}
                              className="btn btn-light w-100 text-start text-truncate py-2 px-3 border border-light-subtle bg-white text-secondary location-option"
                              style={{
                                fontSize: "13px",

                                borderRadius: "8px",

                                minHeight: "46px",

                                display: "flex",

                                alignItems: "center",
                              }}
                            >
                              {lga}
                            </button>
                          </div>
                        ))}
                  </div>
                </div>
              )}
            </div>

            {/* EXPANSION LAYER */}

            {isGatewayUnlocked && (
              <div className="mt-4 pt-4 border-top border-light-subtle">
                {/* ONLY SPARE PARTS */}

                {selectedSubCategory === "Spares & Car Care" && (
                  <SparePartsFields
                    key={`veh-spares-${selectedSubCategory}`}
                    onChange={setSparePartsData}
                  />
                )}

                {/* ONLY AUTOMOBILES */}

                {selectedSubCategory === "Automobiles" && (
                  <AutomobileFields
                    key={`veh-auto-${selectedSubCategory}`}
                    onChange={setAutomobileData}
                  />
                )}

                {/* ONLY BIKES */}

                {selectedSubCategory === "Bikes, Scooters & E-Mobility" && (
                  <BikeFields
                    key={`veh-bike-${selectedSubCategory}`}
                    onChange={setBikeData}
                  />
                )}

                {/* ONLY BUS & COMMERCIAL VAN */}
                {selectedSubCategory === "Buses & Commercial Vans" && (
                  <BusVanFields
                    key={`veh-bus-${selectedSubCategory}`}
                    onChange={setBusVanData}
                  />
                )}

                {selectedSubCategory === "Haulage Trucks & Trailers" && (
                  <TruckTrailerFields
                    key={`veh-truck-${selectedSubCategory}`}
                    onChange={setTruckTrailerData}
                  />
                )}

                {selectedSubCategory === "Heavy Duty & Plant Machinery" && (
                  <HeavyMachineryFields
                    key={`veh-heavy-${selectedSubCategory}`}
                    onChange={setHeavyMachineryData}
                  />
                )}

                {selectedSubCategory === "Marine Vessels & Boats" && (
                  <MarineFields
                    key={`veh-marine-${selectedSubCategory}`}
                    onChange={setMarineData}
                  />
                )}

                {/* PROPERTY */}

                {selectedCategory?.name === "Property" && (
                  <>
                    {selectedSubCategory === "Houses & Apartments" && (
                      <ApartmentFields
                        key={`prop-apt-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}

                    {selectedSubCategory === "Land & Plots" && (
                      <LandFields
                        key={`prop-land-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}

                    {selectedSubCategory === "Commercial Property" && (
                      <CommercialPropertyFields
                        key={`prop-comm-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}

                    {selectedSubCategory === "Short Let" && (
                      <ShortLetFields
                        key={`prop-shortlet-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}

                    {selectedSubCategory === "Event Centres & Venues" && (
                      <EventSpaceFields
                        key={`prop-eventspace-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}

                    {selectedSubCategory === "Office Space" && (
                      <OfficeFields
                        key={`prop-office-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}

                    {selectedSubCategory === "Warehouse & Industrial" && (
                      <WarehouseFields
                        key={`prop-warehouse-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}

                    {selectedSubCategory === "Farms & Agricultural Land" && (
                      <FarmFields
                        key={`prop-farm-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}

                    {selectedSubCategory === "New Builds" && (
                      <NewBuildFields
                        key={`prop-newbuild-${selectedSubCategory}`}
                        onChange={setPropertyData}
                      />
                    )}
                  </>
                )}

                {/* FASHION */}

                {selectedCategory?.name === "Fashion" && (
                  <>
                    {selectedSubCategory === "Women's Fashion" && (
                      <WomensFashionFields
                        key={`fashion-women-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Men's Fashion" && (
                      <MensFashionFields
                        key={`fashion-men-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Kids Fashion" && (
                      <KidsFashionFields
                        key={`fashion-kids-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Shoes & Footwear" && (
                      <ShoesFootwearFields
                        key={`fashion-shoes-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Bags & Luggage" && (
                      <BagsLuggageFields
                        key={`fashion-bags-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Watches" && (
                      <WatchesFields
                        key={`fashion-watches-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Jewelry & Accessories" && (
                      <JewelryAccessoriesFields
                        key={`fashion-jewelry-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Hair & Wigs" && (
                      <HairWigsFields
                        key={`fashion-hair-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Beauty & Personal Care" && (
                      <BeautyPersonalCareFields
                        key={`fashion-beauty-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Fabrics & Traditional Wear" && (
                      <FabricsTraditionalWearFields
                        key={`fashion-fabrics-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}

                    {selectedSubCategory === "Fashion Services" && (
                      <FashionServicesFields
                        key={`fashion-services-${selectedSubCategory}`}
                        onChange={setFashionData}
                      />
                    )}
                  </>
                )}

                {/* PHONES & TABLETS */}
                {(selectedCategory?.name?.toLowerCase().includes("phone") ||
                  selectedCategory?.name?.toLowerCase().includes("tablet")) && (
                  <>
                    {(selectedSubCategory === "Mobile Phones" ||
                      selectedSubCategory === "General Specifications" ||
                      selectedSubCategory === "Standard Variant") && (
                      <MobilePhonesFields
                        key={`phones-${selectedSubCategory}`}
                        onChange={setPhoneData}
                      />
                    )}

                    {selectedSubCategory === "Tablets" && (
                      <TabletsFields
                        key={`tablets-${selectedSubCategory}`}
                        onChange={setPhoneData}
                      />
                    )}

                    {selectedSubCategory === "Smartwatches & Trackers" && (
                      <SmartwatchesFields
                        key={`smartwatches-${selectedSubCategory}`}
                        onChange={setPhoneData}
                      />
                    )}

                    {selectedSubCategory === "Accessories & Spares" && (
                      <PhoneAccessoriesFields
                        key={`phone-acc-${selectedSubCategory}`}
                        onChange={setPhoneData}
                      />
                    )}
                  </>
                )}

                {/* 5. ELECTRONICS */}
                {selectedCategory?.name?.toLowerCase().includes("elect") && (
                  <>
                    {(selectedSubCategory === "TV & DVD Equipment" ||
                      selectedSubCategory === "General Specifications" ||
                      selectedSubCategory === "Standard Variant" ||
                      !selectedSubCategory) && (
                      <TVVideoFields
                        key={`tv-video-${selectedSubCategory}`}
                        onChange={setElectronicsData}
                      />
                    )}

                    {selectedSubCategory === "Laptops & Computers" && (
                      <ComputerLaptopsFields
                        key={`laptop-${selectedSubCategory}`}
                        onChange={setElectronicsData}
                      />
                    )}

                    {selectedSubCategory === "Audio & Music Systems" && (
                      <AudioMusicFields
                        key={`audio-${selectedSubCategory}`}
                        onChange={setElectronicsData}
                      />
                    )}

                    {selectedSubCategory === "Video Games & Consoles" && (
                      <VideoGamesFields
                        key={`videogames-${selectedSubCategory}`}
                        onChange={setElectronicsData}
                      />
                    )}

                    {selectedSubCategory === "Cameras & Camcorders" && (
                      <CamerasOpticsFields
                        key={`cameras-${selectedSubCategory}`}
                        onChange={setElectronicsData}
                      />
                    )}

                    {selectedSubCategory === "Security & Surveillance" && (
                      <GeneralElectronicsFields
                        key={`elec-sec-${selectedSubCategory}`}
                        title="Security & Surveillance Specifications"
                        defaultDeviceType="Solar / IP Security Camera"
                        onChange={setElectronicsData}
                      />
                    )}

                    {selectedSubCategory === "Computer Accessories & Hardware" && (
                      <GeneralElectronicsFields
                        key={`elec-acc-${selectedSubCategory}`}
                        title="Computer Accessories & Hardware Specifications"
                        defaultDeviceType="Computer Accessory / Peripheral"
                        onChange={setElectronicsData}
                      />
                    )}

                    {selectedSubCategory === "Printers & Scanners" && (
                      <GeneralElectronicsFields
                        key={`elec-print-${selectedSubCategory}`}
                        title="Printers & Scanners Specifications"
                        defaultDeviceType="Laser / All-In-One Printer"
                        onChange={setElectronicsData}
                      />
                    )}
                  </>
                )}

                {/* 6. HOME, FURNITURE & APPLIANCES */}
                {selectedCategory?.name?.toLowerCase().includes("home") && (
                  <>
                    {(selectedSubCategory === "Furniture" ||
                      selectedSubCategory === "General Specifications" ||
                      selectedSubCategory === "Standard Variant" ||
                      !selectedSubCategory) && (
                      <FurnitureFields
                        key={`furniture-${selectedSubCategory}`}
                        onChange={setHomeData}
                      />
                    )}

                    {selectedSubCategory === "Home & Kitchen Appliances" && (
                      <HomeAppliancesFields
                        key={`home-appliances-${selectedSubCategory}`}
                        onChange={setHomeData}
                      />
                    )}

                    {selectedSubCategory === "Power, Solar & Generators" && (
                      <PowerSolarGeneratorsFields
                        key={`power-solar-${selectedSubCategory}`}
                        onChange={setHomeData}
                      />
                    )}

                    {(selectedSubCategory === "Home Decor & Interior" ||
                      selectedSubCategory === "Garden & Outdoor") && (
                      <HomeDecorFields
                        key={`home-decor-${selectedSubCategory}`}
                        onChange={setHomeData}
                      />
                    )}
                  </>
                )}

                {/* 7. BEAUTY & PERSONAL CARE */}
                {selectedCategory?.name?.toLowerCase().includes("beauty") && (
                  <BeautyCategoryFields
                    key={`beauty-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Beauty & Personal Care"}
                    onChange={setBeautyData}
                  />
                )}

                {/* 8. AGRICULTURE & FOOD */}
                {selectedCategory?.name?.toLowerCase().includes("agric") && (
                  <AgricultureFields
                    key={`agric-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Agriculture & Food"}
                    onChange={setAgricultureData}
                  />
                )}

                {/* 9. SPORTS, ARTS & OUTDOORS */}
                {selectedCategory?.name?.toLowerCase().includes("sport") && (
                  <SportsFields
                    key={`sports-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Sports, Arts & Outdoors"}
                    onChange={setSportsData}
                  />
                )}

                {/* 10. PETS */}
                {selectedCategory?.name?.toLowerCase().includes("pet") && (
                  <PetsFields
                    key={`pets-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Pets & Animal Care"}
                    onChange={setPetsData}
                  />
                )}

                {/* 11. SERVICES */}
                {selectedCategory?.name?.toLowerCase().includes("service") && (
                  <ServicesFields
                    key={`services-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Professional Services"}
                    onChange={setServicesData}
                  />
                )}

                {/* 12. JOBS */}
                {selectedCategory?.name?.toLowerCase().includes("job") && (
                  <JobsFields
                    key={`jobs-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Jobs & Employment"}
                    onChange={setJobsData}
                  />
                )}

                {/* 13. BABIES & KIDS */}
                {(selectedCategory?.name?.toLowerCase().includes("bab") ||
                  selectedCategory?.name?.toLowerCase().includes("kid")) && (
                  <BabiesKidsFields
                    key={`babies-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Babies & Kids"}
                    onChange={setBabiesData}
                  />
                )}

                {/* 14. COMMERCIAL EQUIPMENT & TOOLS */}
                {(selectedCategory?.name?.toLowerCase().includes("commercial") ||
                  selectedCategory?.name?.toLowerCase().includes("equipment")) && (
                  <CommercialEquipmentFields
                    key={`commercial-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Commercial Equipment & Tools"}
                    onChange={setCommercialData}
                  />
                )}

                {/* 15. REPAIR & CONSTRUCTION */}
                {(selectedCategory?.name?.toLowerCase().includes("repair") ||
                  selectedCategory?.name?.toLowerCase().includes("construct")) && (
                  <RepairConstructionFields
                    key={`construction-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Repair & Construction"}
                    onChange={setConstructionData}
                  />
                )}

                {/* 16. BUSINESS & INDUSTRY */}
                {(selectedCategory?.name?.toLowerCase().includes("business") ||
                  selectedCategory?.name?.toLowerCase().includes("industry")) && (
                  <BusinessIndustryFields
                    key={`business-${selectedCategory?.name}-${selectedSubCategory}`}
                    subCategoryTitle={selectedSubCategory || "Business & Industry"}
                    onChange={setBusinessData}
                  />
                )}

                {/* COMMON AD DETAILS */}

                <section
                  className="p-4 border border-light-subtle"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <h5 className="h6 fw-bold mb-3 text-dark">Ad Details</h5>

                  {/* TITLE */}

                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-semibold">
                      Title
                    </label>

                    <input
                      name="title"
                      required
                      placeholder={
                        selectedSubCategory === "Spares & Car Care"
                          ? "e.g. Toyota Camry replacement headlights"
                          : "e.g. Toyota Camry 2020"
                      }
                      className="form-control px-3 py-2 border-light-subtle form-field-hover"
                      style={{
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    {/* PRICE */}

                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary small fw-semibold">
                        Price (₦)
                      </label>

                      <input
                        id="ad-price"
                        name="price"
                        type="number"
                        min="0"
                        step="1"
                        required
                        placeholder="Enter price"
                        className="form-control px-3 py-2 border-light-subtle form-option-hover no-number-arrows"
                        style={{
                          borderRadius: "8px",
                          fontSize: "13px",
                          minHeight: "42px",
                        }}
                      />
                    </div>

                    {/* NEGOTIATES */}

                    <div className="col-12 col-md-6 pt-0">
                      <div style={{ marginTop: "2x" }}>
                        <StyledSelect
                          id="negotiable"
                          name="negotiable"
                          label="Negotiable?"
                          value={negotiable ? "Yes" : "No"}
                          options={["Yes", "No"]}
                          placeholder="Select Option"
                          onChange={(value) => setNegotiable(value === "Yes")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* IMAGES */}

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="ad-photo"
                        className="form-label text-secondary small fw-semibold mb-1"
                      >
                        Photos (3–10 images)
                      </label>

                      <input
                        id="ad-photo"
                        name="images"
                        type="file"
                        accept="image/*"
                        multiple
                        required
                        className="form-control px-3 py-2 border-light-subtle form-option-hover"
                        style={{
                          borderRadius: "8px",
                          fontSize: "13px",
                          minHeight: "42px",
                        }}
                        onChange={(event) => {
                          const files = Array.from(event.target.files || []);

                          if (files.length < 3) {
                            event.target.setCustomValidity(
                              "Please upload at least 3 images.",
                            );
                            return;
                          }

                          if (files.length > 10) {
                            event.target.setCustomValidity(
                              "You can upload a maximum of 10 images.",
                            );
                            return;
                          }

                          event.target.setCustomValidity("");

                          setSelectedImages(files);

                          const previews = files.map((file) =>
                            URL.createObjectURL(file),
                          );

                          setImagePreviews(previews);
                        }}
                      />

                      {imagePreviews.length > 0 && (
                        <div
                          className="d-flex gap-2 mt-3 overflow-auto"
                          style={{
                            maxWidth: "100%",
                            paddingBottom: "5px",
                          }}
                        >
                          {imagePreviews.map((src, index) => (
                            <div
                              key={src}
                              className="position-relative"
                              style={{
                                width: "55px",
                                height: "55px",
                                flexShrink: 0,
                              }}
                            >
                              <img
                                src={src}
                                alt={`preview-${index}`}
                                onClick={() => setPreviewImage(src)}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "12px",
                                  cursor: "pointer",
                                }}
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = selectedImages.filter(
                                    (_, i) => i !== index,
                                  );

                                  const newPreviews = imagePreviews.filter(
                                    (_, i) => i !== index,
                                  );

                                  setSelectedImages(newImages);

                                  setImagePreviews(newPreviews);
                                }}
                                className="btn btn-danger btn-sm position-absolute"
                                style={{
                                  top: "3px",
                                  right: "3px",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  padding: 0,
                                  fontSize: "20px",
                                  lineHeight: "10px",
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-semibold">
                      Description
                    </label>

                    <textarea
                      name="description"
                      rows={5}
                      required
                      className="form-control px-3 py-2 border-light-subtle form-field-hover"
                      style={{
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <button
                    type="submit"
                    disabled={pending}
                    className="btn btn-sq text-white w-100 fw-semibold py-2"
                    style={{
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  >
                    {pending ? "Posting..." : "Post ad"}
                  </button>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>

      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <img
            src={previewImage}
            alt="Selected preview"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              objectFit: "contain",
            }}
          />

          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              border: "none",
              background: "#dc3545",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      )}
    </form>
  );
}
