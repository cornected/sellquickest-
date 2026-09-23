"use client";

import { StyledSelect } from "../../StyledSelect";

type WalletsPursesFieldsProps = {
  data: any;
  updateField: (key: string, value: any) => void;
};

export function WalletsPursesFields({
  data,
  updateField,
}: WalletsPursesFieldsProps) {
  return (
    <div className="row g-3 p-3 mb-3 bg-white border border-light-subtle rounded-3">
      <div className="col-12">
        <h6 className="fw-semibold text-dark mb-0">
          👛 Wallet, Purse & Cardholder Details
        </h6>
      </div>

      {/* WALLET / PURSE STYLE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="wallet-style"
          name="walletStyle"
          label="Wallet / Purse Style"
          value={data.walletStyle}
          customValue={data.customWalletStyle}
          onCustomChange={(val: string) => updateField("customWalletStyle", val)}
          options={[
            "Bifold Wallet (Men's Classic)",
            "Trifold Wallet",
            "Long Continental Zip-Around Wallet",
            "Minimalist Slim Cardholder",
            "Money Clip Wallet",
            "Coin Purse / Pouch",
            "Passport & Travel Document Wallet",
            "Key Holder Wallet Pouch",
          ]}
          placeholder="Select Wallet Style"
          allowOther
          onChange={(val: string) => updateField("walletStyle", val)}
        />
      </div>

      {/* CARD CAPACITY */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="wallet-card-slots"
          name="cardSlots"
          label="Card Slot Capacity"
          value={data.cardSlots}
          options={[
            "1 - 4 Cards (Ultra Slim)",
            "5 - 8 Cards (Standard)",
            "9 - 14 Cards (High Capacity)",
            "15+ Cards (Accordion / Organizer)",
          ]}
          placeholder="Select Card Capacity"
          onChange={(val: string) => updateField("cardSlots", val)}
        />
      </div>

      {/* RFID SHIELDING */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="wallet-rfid"
          name="rfidProtection"
          label="RFID Anti-Theft Shielding"
          value={data.rfidProtection}
          options={[
            "Yes - Certified RFID Blocking Lining",
            "No RFID Shielding",
          ]}
          placeholder="Select RFID Protection"
          onChange={(val: string) => updateField("rfidProtection", val)}
        />
      </div>

      {/* CURRENCY & COIN STORAGE */}
      <div className="col-12 col-md-6">
        <StyledSelect
          id="wallet-cash-storage"
          name="cashStorage"
          label="Cash & Coin Storage"
          value={data.cashStorage}
          options={[
            "Fits Full-length Naira Bills without Folding",
            "Includes Zippered Coin Pocket",
            "Money Clip Bar Only",
            "Folded Cash Pocket Only",
          ]}
          placeholder="Select Cash Storage"
          onChange={(val: string) => updateField("cashStorage", val)}
        />
      </div>
    </div>
  );
}
