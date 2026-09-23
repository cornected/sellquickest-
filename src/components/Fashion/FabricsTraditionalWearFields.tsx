"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { FashionFeatures } from "./FashionFeatures";
import { FashionBrandSelect } from "./FashionBrandSelect";

type FabricsTraditionalWearFieldsProps = {
  onChange: (data: object) => void;
};

const FABRIC_TYPES = [
  "Lace Fabrics (Swiss Voile, French, Cord, Beaded Lace)",
  "Ankara Wax Prints (Real Dutch Wax / Hollandais, Vlisco, Hi-Target)",
  "Aso-Oke Handwoven Fabric (Traditional Yoruba)",
  "Atiku / Polish Cotton Fabric (Men's Senator & Kaftan)",
  "Wool & Cashmere Suit Fabrics",
  "George Fabric (Indian George, Raw Silk George)",
  "Brocade / Guinea Brocade (Getzner, Bazin Riche)",
  "Velvet Fabric (Plain & Embroidered)",
  "Silk & Chiffon Prints",
  "Isi-Agu Traditional Igbo Velvet / Cotton",
  "Damask & Jacquard",
  "Adire / Tie & Dye (Batik)",
  "Ready-Made Traditional Attire (Sewn Agbada / Kaftan / Iro & Buba)",
];

const FABRIC_LENGTHS = [
  "Full 6 Yards (Standard Nigerian Wrapper)",
  "5 Yards (Men's Senator / Kaftan Standard)",
  "4 Yards",
  "Complete 3-Piece Lace (5 Yards + Headwrap Gele)",
  "Full Piece / 12 Yards (Double Wrapper)",
  "By the Yard (Cut to Length)",
  "Sewn Complete Ready-to-Wear Outfit",
];

const FABRIC_ORIGINS = [
  "Original Holland / Dutch Vlisco",
  "Swiss Original (Made in Switzerland)",
  "Austrian Brocade (Getzner)",
  "Indian Silk & Zari Embroidery",
  "Made in Nigeria (Abeokuta Adire / Kwara Aso-Oke)",
  "Made in Ghana (Original Kente / GTP)",
  "Hi-Target / Phoenix Wax",
  "China High Grade Super Wax",
];

const OCCASIONS = [
  "Wedding Ceremony / Bridal Aso-Ebi",
  "Traditional Wedding / Engagement",
  "Sunday Best / Church & Thanksgiving",
  "Coronation & Chieftaincy Celebrations",
  "Casual & Everyday Senator Wear",
  "Funeral Celebration of Life",
];

export function FabricsTraditionalWearFields({
  onChange,
}: FabricsTraditionalWearFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    gender: "",
    fabricType: "",
    customFabricType: "",
    fabricLength: "",
    customFabricLength: "",
    fabricOrigin: "",
    customFabricOrigin: "",
    primaryColor: "",
    customPrimaryColor: "",
    designPattern: "",
    customDesignPattern: "",
    embroideryBeading: "",
    textureFeel: "",
    occasion: "",
    customOccasion: "",
    condition: "",
    customCondition: "",
    packaging: "",
    asoEbiWholesale: "",
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

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">🪡</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Fabrics & Traditional Wear Details
        </h5>
      </div>

      <div className="row g-3 mb-4">
        {/* BRAND / MILL / WEAVER */}
        <div className="col-12 col-md-6">
          <FashionBrandSelect
            category="Fabrics & Traditional Wear"
            label="Brand / Mill / Textile Maker"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* TARGET GENDER / ATTIRE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-gender"
            name="gender"
            label="Suitable For"
            value={data.gender}
            options={[
              "Women's Traditional Wear (Lace, Iro & Buba, George)",
              "Men's Traditional Wear (Senator, Kaftan, Agbada, Atiku)",
              "Unisex Fabric / Couples Uniform",
              "Bridal & Groom Wedding Special",
            ]}
            placeholder="Select Suitability"
            onChange={(val: string) => updateField("gender", val)}
          />
        </div>

        {/* FABRIC CATEGORY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-type"
            name="fabricType"
            label="Fabric / Attire Type"
            value={data.fabricType}
            customValue={data.customFabricType}
            onCustomChange={(val: string) => updateField("customFabricType", val)}
            options={FABRIC_TYPES}
            placeholder="Select Fabric Type"
            allowOther
            onChange={(val: string) => updateField("fabricType", val)}
          />
        </div>

        {/* FABRIC LENGTH / QUANTITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-length"
            name="fabricLength"
            label="Length / Package Size"
            value={data.fabricLength}
            customValue={data.customFabricLength}
            onCustomChange={(val: string) =>
              updateField("customFabricLength", val)
            }
            options={FABRIC_LENGTHS}
            placeholder="Select Length"
            allowOther
            onChange={(val: string) => updateField("fabricLength", val)}
          />
        </div>

        {/* BRAND / FABRIC ORIGIN */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-origin"
            name="fabricOrigin"
            label="Origin & Quality Grade"
            value={data.fabricOrigin}
            customValue={data.customFabricOrigin}
            onCustomChange={(val: string) =>
              updateField("customFabricOrigin", val)
            }
            options={FABRIC_ORIGINS}
            placeholder="Select Origin / Mill"
            allowOther
            onChange={(val: string) => updateField("fabricOrigin", val)}
          />
        </div>

        {/* PRIMARY COLOR */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-color"
            name="primaryColor"
            label="Dominant / Base Color"
            value={data.primaryColor}
            customValue={data.customPrimaryColor}
            onCustomChange={(val: string) =>
              updateField("customPrimaryColor", val)
            }
            options={[
              "White / Cream Voile",
              "Emerald Green / Forest Green",
              "Burgundy / Wine Red",
              "Navy Blue / Royal Blue",
              "Gold / Mustard Yellow",
              "Champagne / Onion Skin",
              "Teal / Turquoise",
              "Black & Multi-Colored Wax Print",
              "Peach / Dusty Rose Pink",
            ]}
            placeholder="Select Dominant Color"
            allowOther
            onChange={(val: string) => updateField("primaryColor", val)}
          />
        </div>

        {/* TEXTURE & FEEL */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-texture"
            name="textureFeel"
            label="Texture & Weight"
            value={data.textureFeel}
            options={[
              "100% Breathable Soft Cotton",
              "Heavy Luxury Shine Cotton (Stiff & Crisp Finish)",
              "Silky Smooth Drape",
              "Heavy Beaded / Embellished Weight",
              "Lightweight Cool Voile",
            ]}
            placeholder="Select Texture & Weight"
            onChange={(val: string) => updateField("textureFeel", val)}
          />
        </div>

        {/* EMBELLISHMENTS & CRAFT */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-embroidery"
            name="embroideryBeading"
            label="Embellishment & Stones"
            value={data.embroideryBeading}
            options={[
              "Heavy Hand-Cut & Rhinestone Stoned",
              "Intricate Metallic Zari Embroidery",
              "Raw Silk Beaded Border",
              "Plain Print (No Stones)",
              "Laser Cut-Out Patterns",
            ]}
            placeholder="Select Embellishment"
            onChange={(val: string) => updateField("embroideryBeading", val)}
          />
        </div>

        {/* RECOMMENDED OCCASION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-occasion"
            name="occasion"
            label="Event & Ceremony"
            value={data.occasion}
            customValue={data.customOccasion}
            onCustomChange={(val: string) => updateField("customOccasion", val)}
            options={OCCASIONS}
            placeholder="Select Occasion"
            allowOther
            onChange={(val: string) => updateField("occasion", val)}
          />
        </div>

        {/* ASO-EBI & WHOLESALE BULK SUPPLY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-asoe-bi"
            name="asoEbiWholesale"
            label="Aso-Ebi / Uniform Availability"
            value={data.asoEbiWholesale}
            options={[
              "Available for Aso-Ebi Bulk Orders (50+ Pieces Available)",
              "Small Group Uniforms (10 - 30 Pieces Available)",
              "Exclusive Single Piece (Only 1 Available - No Duplicates)",
              "Wholesale Bundles for Retailers",
            ]}
            placeholder="Select Bulk / Aso-Ebi Availability"
            onChange={(val: string) => updateField("asoEbiWholesale", val)}
          />
        </div>

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) =>
              updateField("customCondition", val)
            }
            options={[
              "Brand New (In Factory Fold & Foil Seal)",
              "Brand New (Sewn Custom Wear)",
              "Deadstock / Vintage Mint",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* AVAILABILITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="fabric-availability"
            name="availability"
            label="Availability"
            value={data.availability}
            customValue={data.customAvailability}
            onCustomChange={(val: string) =>
              updateField("customAvailability", val)
            }
            options={[
              "In Stock / Instant Dispatch",
              "Aso-Ebi Pre-Order (Requires Booking)",
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
