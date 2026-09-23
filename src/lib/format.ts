export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function timeAgo(dateInput: Date | string) {
  // Automatically convert text strings back into real, usable Date objects safely
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  // Guard clause against invalid date values to prevent runtime crashes
  if (isNaN(date.getTime())) return "recently";

  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const LOCATIONS = [
  "All Nigeria",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
  "Abeokuta",
  "Accra",
  "Nairobi",
];
