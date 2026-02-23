// Centralized bank configuration
// Add new banks here — no need to change AddMoneyForm code

export const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

// Legacy export for backwards compatibility
export const BANKS = Object.fromEntries(
  SUPPORTED_BANKS.map((bank) => [
    bank.name.replace(/\s+/g, "_").toUpperCase(),
    bank,
  ]),
);
