"use client";

import { useState } from "react";
import { StyledSelect } from "../StyledSelect";
import { FashionFeatures } from "./FashionFeatures";
import { FashionBrandSelect } from "./FashionBrandSelect";

type HairWigsFieldsProps = {
  onChange: (data: object) => void;
};

const HAIR_CATEGORIES = [
  "Lace Frontal Wig",
  "Closure Wig (4x4, 5x5, 6x6, 13x4, 13x6)",
  "Full Lace Wig / 360 Lace Wig",
  "Headband / Glueless Throw-on Wig",
  "Braided Wig (Million Braids, Knotless, Cornrows)",
  "Human Hair Bundles & Wefts (Pack Hair)",
  "Ponytail Extension / Drawstring Ponytail",
  "Clip-In / Tape-In Hair Extensions",
  "Short Pixie Cut / Bob Wig",
  "Crochet Braids & Locs",
  "Hair Care Products & Wig Accessories",
];

const HAIR_TYPES = [
  "100% Raw Virgin Human Hair (Single Donor)",
  "Virgin Human Hair (Double Drawn / Thick Ends)",
  "Human Hair Blend",
  "High-Temperature Synthetic Fiber",
  "Kanekalon Fiber (Braided Wigs)",
  "Semi-Human Hair",
];

const HAIR_ORIGINS = [
  "Vietnamese Hair (Silky / Bone Straight)",
  "Bone Straight Raw Hair",
  "Indian Human Hair",
  "Brazilian Human Hair",
  "Peruvian Hair",
  "Burmese Curly Hair",
  "Cambodian Raw Hair",
  "Synthetic Quality Blend",
];

const TEXTURES = [
  "Bone Straight",
  "Natural Straight",
  "Body Wave",
  "Deep Wave / Water Wave",
  "Kinky Curly / Jerry Curl",
  "Kinky Straight / Afro Blowout",
  "Loose Wave",
  "Pixie / Finger Wave",
];

const HAIR_LENGTHS = [
  "8 - 10 Inches (Short Bob / Pixie)",
  "12 - 14 Inches (Collarbone Length)",
  "16 - 18 Inches (Mid-back)",
  "20 - 22 Inches (Waist Length)",
  "24 - 26 Inches (Hip Length)",
  "28 - 30 Inches (Thigh Length)",
  "32+ Inches (Extra Long / Floor Length)",
];

const DENSITIES = [
  "150% Density (Natural Light Everyday)",
  "180% Density (Full Standard Volume)",
  "200% - 250% Density (Extra Full / Glam)",
  "300% Density (Mega Full Heavy)",
];

const LACE_TYPES = [
  "HD Invisible Swiss Lace (Melt Skin-Like)",
  "Transparent Lace",
  "Medium Brown Lace",
  "Glueless Pre-Plucked Pre-Cut Lace",
  "No Lace (Machine Made / Headband)",
];

export function HairWigsFields({ onChange }: HairWigsFieldsProps) {
  const [data, setData] = useState({
    brand: "",
    customBrand: "",
    hairCategory: "",
    customHairCategory: "",
    hairType: "",
    customHairType: "",
    hairOrigin: "",
    customHairOrigin: "",
    hairTexture: "",
    customHairTexture: "",
    hairLength: "",
    hairDensity: "",
    laceType: "",
    laceSize: "",
    hairColor: "",
    customHairColor: "",
    capSize: "",
    dyeBleachCapability: "",
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

  const isWigOrExtension =
    !data.hairCategory.includes("Hair Care") &&
    !data.hairCategory.includes("Wig Accessories");

  return (
    <section
      className="mb-4 p-4 border border-light-subtle"
      style={{
        borderRadius: "20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fs-5">💇‍♀️</span>
        <h5 className="h6 fw-bold mb-0 text-dark">
          Hair, Wigs & Extensions Details
        </h5>
      </div>

      <div className="row g-3 mb-4">
        {/* BRAND / VENDOR */}
        <div className="col-12 col-md-6">
          <FashionBrandSelect
            category="Hair & Wigs"
            label="Brand / Hair Vendor"
            value={data.brand}
            onChange={(val: string) => updateField("brand", val)}
            customValue={data.customBrand}
            onCustomChange={(val: string) => updateField("customBrand", val)}
          />
        </div>

        {/* HAIR CATEGORY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-category"
            name="hairCategory"
            label="Hair Category"
            value={data.hairCategory}
            customValue={data.customHairCategory}
            onCustomChange={(val: string) => updateField("customHairCategory", val)}
            options={HAIR_CATEGORIES}
            placeholder="Select Hair Category"
            allowOther
            onChange={(val: string) => updateField("hairCategory", val)}
          />
        </div>

        {/* HAIR TYPE / GRADE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-type"
            name="hairType"
            label="Hair Quality & Fiber Type"
            value={data.hairType}
            customValue={data.customHairType}
            onCustomChange={(val: string) => updateField("customHairType", val)}
            options={HAIR_TYPES}
            placeholder="Select Hair Quality"
            allowOther
            onChange={(val: string) => updateField("hairType", val)}
          />
        </div>

        {/* HAIR ORIGIN / SOURCE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-origin"
            name="hairOrigin"
            label="Hair Origin / Grade"
            value={data.hairOrigin}
            customValue={data.customHairOrigin}
            onCustomChange={(val: string) => updateField("customHairOrigin", val)}
            options={HAIR_ORIGINS}
            placeholder="Select Origin"
            allowOther
            onChange={(val: string) => updateField("hairOrigin", val)}
          />
        </div>

        {/* TEXTURE */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-texture"
            name="hairTexture"
            label="Hair Texture / Pattern"
            value={data.hairTexture}
            customValue={data.customHairTexture}
            onCustomChange={(val: string) => updateField("customHairTexture", val)}
            options={TEXTURES}
            placeholder="Select Texture"
            allowOther
            onChange={(val: string) => updateField("hairTexture", val)}
          />
        </div>

        {/* LENGTH */}
        {isWigOrExtension && (
          <div className="col-12 col-md-6">
            <StyledSelect
              id="hair-length"
              name="hairLength"
              label="Hair Length (Inches)"
              value={data.hairLength}
              options={HAIR_LENGTHS}
              placeholder="Select Hair Length"
              onChange={(val: string) => updateField("hairLength", val)}
            />
          </div>
        )}

        {/* DENSITY */}
        {isWigOrExtension && (
          <div className="col-12 col-md-6">
            <StyledSelect
              id="hair-density"
              name="hairDensity"
              label="Wig Density / Fullness"
              value={data.hairDensity}
              options={DENSITIES}
              placeholder="Select Density"
              onChange={(val: string) => updateField("hairDensity", val)}
            />
          </div>
        )}

        {/* LACE TYPE */}
        {isWigOrExtension && (
          <div className="col-12 col-md-6">
            <StyledSelect
              id="hair-lace"
              name="laceType"
              label="Lace Quality"
              value={data.laceType}
              options={LACE_TYPES}
              placeholder="Select Lace Quality"
              onChange={(val: string) => updateField("laceType", val)}
            />
          </div>
        )}

        {/* LACE / PARTING SIZE */}
        {isWigOrExtension && (
          <div className="col-12 col-md-6">
            <StyledSelect
              id="hair-lace-size"
              name="laceSize"
              label="Closure / Frontal Dimension"
              value={data.laceSize}
              options={[
                "13x4 Lace Frontal",
                "13x6 Deep Part Frontal",
                "5x5 HD Lace Closure",
                "4x4 Classic Closure",
                "6x6 Large Parting Closure",
                "360 Perimeter Lace",
                "Full Lace Wig (All-over scalp)",
                "No Lace / Glueless Cap",
              ]}
              placeholder="Select Dimension"
              onChange={(val: string) => updateField("laceSize", val)}
            />
          </div>
        )}

        {/* COLOR */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-color"
            name="hairColor"
            label="Hair Color"
            value={data.hairColor}
            customValue={data.customHairColor}
            onCustomChange={(val: string) => updateField("customHairColor", val)}
            options={[
              "Natural Black (1B)",
              "Jet Black (1)",
              "Dark Brown (2 / 4)",
              "613 Honey Blonde / Bleached Platinum",
              "Burgundy / 99J Wine Red",
              "Ginger / Copper Orange",
              "Ombre / Piano Highlight",
              "Salt & Pepper / Grey",
            ]}
            placeholder="Select Color"
            allowOther
            onChange={(val: string) => updateField("hairColor", val)}
          />
        </div>

        {/* CAP SIZE & FIT */}
        {isWigOrExtension && (
          <div className="col-12 col-md-6">
            <StyledSelect
              id="hair-cap-size"
              name="capSize"
              label="Cap Size & Security"
              value={data.capSize}
              options={[
                "Medium Cap with Adjustable Straps & Elastic Band (Fits Most)",
                "Small Petite Cap",
                "Large Cap",
                "100% Glueless with Piano Combs + Elastic Band",
              ]}
              placeholder="Select Cap Size"
              onChange={(val: string) => updateField("capSize", val)}
            />
          </div>
        )}

        {/* CAN BE BLEACHED / DYED */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-bleach"
            name="dyeBleachCapability"
            label="Chemical & Heat Styling"
            value={data.dyeBleachCapability}
            options={[
              "Can be Bleached to 613 & Dyed Any Color",
              "Can be Dyed Darker Only",
              "Heat Friendly (Curling Iron / Straightener safe up to 200°C)",
              "Do Not Dye or Apply High Heat",
            ]}
            placeholder="Select Heat & Chemical Guidance"
            onChange={(val: string) => updateField("dyeBleachCapability", val)}
          />
        </div>

        {/* CONDITION */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-condition"
            name="condition"
            label="Condition"
            value={data.condition}
            customValue={data.customCondition}
            onCustomChange={(val: string) => updateField("customCondition", val)}
            options={[
              "Brand New (Unworn / Pre-plucked / Styled)",
              "Brand New (Raw Bundles / Uncut Lace)",
              "Pre-revamped / Cleaned & Styled Like New",
              "Nigerian Used (Pre-owned)",
            ]}
            placeholder="Select Condition"
            allowOther
            onChange={(val: string) => updateField("condition", val)}
          />
        </div>

        {/* PACKAGING */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-packaging"
            name="packaging"
            label="Packaging & Freebies"
            value={data.packaging}
            options={[
              "Includes Satin Bag + Free Wig Cap + Melt Band",
              "Includes Branded Hair Box + Freebies",
              "Packaged in Protective Polybag",
            ]}
            placeholder="Select Packaging"
            onChange={(val: string) => updateField("packaging", val)}
          />
        </div>

        {/* AVAILABILITY */}
        <div className="col-12 col-md-6">
          <StyledSelect
            id="hair-availability"
            name="availability"
            label="Availability"
            value={data.availability}
            customValue={data.customAvailability}
            onCustomChange={(val: string) =>
              updateField("customAvailability", val)
            }
            options={[
              "Ready to Ship / Instant Pickup",
              "Custom Made Wig (3-5 Days Processing)",
              "Pre-Order from Factory",
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
