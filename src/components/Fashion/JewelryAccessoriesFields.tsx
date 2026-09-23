"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { FashionFeatures } from "./FashionFeatures";
import { FashionBrandSelect } from "./FashionBrandSelect";

type JewelryAccessoriesFieldsProps = {
  onChange: (data: object) => void;
};

const ACCESSORY_CATEGORIES = [
  "Necklaces & Pendants",
  "Rings (Wedding, Engagement & Fashion)",
  "Bracelets & Bangles",
  "Earrings (Studs, Hoops, Dangles)",
  "Jewelry Sets (Necklace + Earrings + Bracelet)",
  "Sunglasses & Eyewear",
  "Belts (Leather & Designer Buckle)",
  "Hats, Caps & Headwear",
  "Cufflinks, Tie Clips & Pocket Squares",
  "Brooches, Pins & Badges",
  "Traditional Beaded Jewelry (Corals & African Beads)",
];

const JEWELRY_METALS = [
  "18k Solid Gold",
  "24k Solid Gold",
  "14k Solid Gold",
  "925 Sterling Silver",
  "Gold-Plated / Vermeil (Long-lasting)",
  "Stainless Steel (Non-Tarnish / Water-safe)",
  "Titanium / Tungsten Carbide",
  "Brass / Copper Alloy",
  "Natural African Coral Beads (Original Ileke)",
  "Faux / Synthetic Beads",
  "Leather / Cord",
];

const GEMSTONES = [
  "Natural Diamond",
  "Moissanite (Passes Diamond Tester)",
  "Cubic Zirconia (CZ Sparkle)",
  "Original Red Coral Beads",
  "Freshwater Pearl",
  "Emerald / Ruby / Sapphire",
  "Swarovski Crystal",
  "No Stone / Plain Metal",
];

export function JewelryAccessoriesFields({
  onChange,
}: JewelryAccessoriesFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    gender: "",
    accessoryType: "",
    customAccessoryType: "",
    metalType: "",
    customMetalType: "",
    gemstone: "",
    customGemstone: "",
    color: "",
    customColor: "",
    ringSize: "",
    necklaceLength: "",
    nonTarnish: "",
    glassesFrameShape: "",
    glassesLensProtection: "",
    beltWidth: "",
    beltBuckleStyle: "",
    condition: "",
    customCondition: "",
    packaging: "",
    availability: "",
    customAvailability: "",
    features: [] as string[],
  });

  const updateField = (key: string, value: any) => {
    const updated = {
      ...data,
      [key]: value,
    };
    setData(updated);
    onChange(updated);
  };

  const isRing = data.accessoryType.includes("Ring");
  const isNecklace =
    data.accessoryType.includes("Necklace") ||
    data.accessoryType.includes("Jewelry Sets");
  const isGlasses = data.accessoryType.includes("Sunglasses");
  const isBelt = data.accessoryType.includes("Belts");
  const isTraditionalBeads = data.accessoryType.includes("Traditional Beaded");

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">💎</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Jewelry & Accessories Details
        </h5>
      </div>

      <div className="row g-3 mb-4">
        {/* BRAND / DESIGNER */}
        <div className="col-12 col-md-6">
          <FashionBrandSelect
            category="Jewelry & Accessories"
            label="Brand / Designer"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* TARGET GENDER */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-gender"
            name="gender"
            label="Department / Gender"
            value={data.gender}
            options={["Women's", "Men's", "Unisex", "Bridal & Couples"]}
            placeholder="Select Gender"
            onChange={(val: string) => updateField("gender", val)}
          />
        </div>

        {/* ACCESSORY TYPE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-type"
            name="accessoryType"
            label="Accessory Category"
            value={data.accessoryType}
            customValue={data.customAccessoryType}
            onCustomChange={(val: string) => updateField("customAccessoryType", val)}
            options={ACCESSORY_CATEGORIES}
            placeholder="Select Category"
            allowOther
            onChange={(val: string) => updateField("accessoryType", val)}
          />
        </div>

        {/* PRIMARY METAL / MATERIAL */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-metal"
            name="metalType"
            label="Material / Metal"
            value={data.metalType}
            customValue={data.customMetalType}
            onCustomChange={(val: string) => updateField("customMetalType", val)}
            options={JEWELRY_METALS}
            placeholder="Select Material"
            allowOther
            onChange={(val: string) => updateField("metalType", val)}
          />
        </div>

        {/* GEMSTONE / MAIN STONE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-stone"
            name="gemstone"
            label="Main Stone / Embellishment"
            value={data.gemstone}
            customValue={data.customGemstone}
            onCustomChange={(val: string) => updateField("customGemstone", val)}
            options={GEMSTONES}
            placeholder="Select Stone"
            allowOther
            onChange={(val: string) => updateField("gemstone", val)}
          />
        </div>

        {/* COLOR / TONE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-color"
            name="color"
            label="Color / Finish Tone"
            value={data.color}
            customValue={data.customColor}
            onCustomChange={(val: string) => updateField("customColor", val)}
            options={[
              "Gold Tone",
              "Silver / White Gold Tone",
              "Rose Gold Tone",
              "Two-Tone (Gold & Silver)",
              "Red / Coral Coral",
              "Black / Onyx",
              "Multi-Color",
            ]}
            placeholder="Select Color"
            allowOther
            onChange={(val: string) => updateField("color", val)}
          />
        </div>

        {/* NON-TARNISH / WATER-SAFE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-tarnish"
            name="nonTarnish"
            label="Non-Tarnish Guarantee"
            value={data.nonTarnish}
            options={[
              "100% Non-Tarnish & Water-Resistant (Lifetime Shine)",
              "Tarnish-Resistant with Care",
              "Fashion Jewelry (Avoid Water/Perfume)",
              "Authentic Precious Metal (Gold/Silver)",
            ]}
            placeholder="Select Durability / Tarnish"
            onChange={(val: string) => updateField("nonTarnish", val)}
          />
        </div>

        {/* DYNAMIC: RING SIZE */}
        {isRing && (
          <div className="col-12">
            <div className="p-3 bg-white border border-light-subtle rounded-3">
              <h6 className="fw-semibold text-dark mb-2">💍 Ring Specifications</h6>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="ring-size"
                    name="ringSize"
                    label="Ring Size (US Standard)"
                    value={data.ringSize}
                    options={[
                      "Adjustable / Free Size",
                      "US Size 5 (EU 49)",
                      "US Size 6 (EU 52)",
                      "US Size 7 (EU 54)",
                      "US Size 8 (EU 57)",
                      "US Size 9 (EU 60)",
                      "US Size 10 (EU 62)",
                      "US Size 11 (EU 65)",
                      "US Size 12 (EU 67)",
                      "Couples Matching Ring Pair",
                    ]}
                    placeholder="Select Ring Size"
                    onChange={(val: string) => updateField("ringSize", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC: NECKLACE LENGTH */}
        {isNecklace && (
          <div className="col-12">
            <div className="p-3 bg-white border border-light-subtle rounded-3">
              <h6 className="fw-semibold text-dark mb-2">📿 Necklace Specifications</h6>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="necklace-length"
                    name="necklaceLength"
                    label="Chain / Necklace Length"
                    value={data.necklaceLength}
                    options={[
                      "Choker (14 - 16 Inches)",
                      "Princess Standard (18 Inches)",
                      "Matinee (20 - 24 Inches)",
                      "Opera / Long Rope (30+ Inches)",
                      "Adjustable Chain Extender Included",
                    ]}
                    placeholder="Select Length"
                    onChange={(val: string) => updateField("necklaceLength", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC: SUNGLASSES */}
        {isGlasses && (
          <div className="col-12">
            <div className="p-3 bg-white border border-light-subtle rounded-3">
              <h6 className="fw-semibold text-dark mb-2">🕶️ Eyewear Specifications</h6>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="glasses-shape"
                    name="glassesFrameShape"
                    label="Eyewear Frame Shape"
                    value={data.glassesFrameShape}
                    options={[
                      "Aviator Classic",
                      "Square / Rectangular Chunky",
                      "Cat-Eye",
                      "Round Vintage",
                      "Rimless / Frameless",
                      "Shield / Sporty Wrap",
                    ]}
                    placeholder="Select Frame Shape"
                    onChange={(val: string) =>
                      updateField("glassesFrameShape", val)
                    }
                  />
                </div>
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="glasses-lens"
                    name="glassesLensProtection"
                    label="Lens Type & Protection"
                    value={data.glassesLensProtection}
                    options={[
                      "UV400 Polarized (Anti-Glare)",
                      "UV400 100% Protection",
                      "Gradient Tinted Fashion Lens",
                      "Clear Anti-Blue Light Lens (Computer Glasses)",
                    ]}
                    placeholder="Select Lens Protection"
                    onChange={(val: string) =>
                      updateField("glassesLensProtection", val)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC: BELTS */}
        {isBelt && (
          <div className="col-12">
            <div className="p-3 bg-white border border-light-subtle rounded-3">
              <h6 className="fw-semibold text-dark mb-2">👔 Belt Specifications</h6>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="belt-buckle"
                    name="beltBuckleStyle"
                    label="Belt Buckle Style"
                    value={data.beltBuckleStyle}
                    options={[
                      "Automatic Ratchet Click Buckle",
                      "Designer Monogram Logo Buckle",
                      "Classic Pin & Prong Buckle",
                      "Reversible 2-in-1 Buckle (Black/Brown)",
                    ]}
                    placeholder="Select Buckle Style"
                    onChange={(val: string) =>
                      updateField("beltBuckleStyle", val)
                    }
                  />
                </div>
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="belt-width"
                    name="beltWidth"
                    label="Belt Width & Use"
                    value={data.beltWidth}
                    options={[
                      "3.5cm - 3.8cm (Standard Men's Corporate & Jeans)",
                      "Slim 2.0cm - 2.5cm (Women's Dress & Formal)",
                      "Wide Waist Cincher Belt",
                    ]}
                    placeholder="Select Belt Width"
                    onChange={(val: string) => updateField("beltWidth", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC: TRADITIONAL CORAL BEADS */}
        {isTraditionalBeads && (
          <div className="col-12">
            <div className="p-3 bg-white border border-light-subtle rounded-3">
              <h6 className="fw-semibold text-dark mb-2">👑 Traditional Coral Beads Specifications</h6>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <StyledSelect
                    id="bead-type"
                    name="beadType"
                    label="Bead Origin & Grade"
                    value={(data as any).beadType || ""}
                    options={[
                      "Original Benin Royal Coral Beads",
                      "Edo / Delta Traditional Wedding Coral Set",
                      "Yoruba Iyun / Ileke Traditional Beads",
                      "Igbo Traditional Wedding Crown & Neckpiece Set",
                      "Crystal Bead Handcrafted Aso-Ebi Set",
                    ]}
                    placeholder="Select Bead Tradition"
                    onChange={(val: string) => updateField("beadType", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) =>
              updateField("customCondition", val)
            }
            options={[
              "Brand New (In Velvet Box / Gift Bag)",
              "Brand New (Never Worn)",
              "Foreign Used / Vintage",
              "Nigerian Used (Good Condition)",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* PACKAGING */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-packaging"
            name="packaging"
            label="Packaging"
            value={data.packaging}
            options={[
              "Comes in Luxury Velvet Jewelry Box + Gift Bag",
              "Velvet Pouch Only",
              "Zip Bag Sealed Packaging",
            ]}
            placeholder="Select Packaging"
            onChange={(val: string) => updateField("packaging", val)}
          />
        </div>

        {/* AVAILABILITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="jewelry-availability"
            name="availability"
            label="Availability"
            value={data.availability}
            customValue={data.customAvailability}
            onCustomChange={(val: string) =>
              updateField("customAvailability", val)
            }
            options={[
              "In Stock / Ready to Ship Immediately",
              "Custom Engraving / Made to Order",
              "Pre-Order",
            ]}
            placeholder="Select Availability"
            allowOther
            onChange={(val: string) => updateField("availability", val)}
          />
        </div>
      </div>

      <div className="mt-4">
        <FashionFeatures data={data} updateField={updateField} />
      </div>
    </section>
  );
}
