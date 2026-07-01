export function estimateProcessorPricing(annualVolume: number, averageTicket: number) {
  const vendors = [
    { name: "Stripe", processingPercent: 0.029, fixedFee: 0.3 },
    { name: "Adyen", processingPercent: 0.031, fixedFee: 0.5 },
    { name: "Checkout.com", processingPercent: 0.03, fixedFee: 0.45 },
    { name: "Airwallex", processingPercent: 0.031, fixedFee: 0.4 }
  ];

  return vendors.map((vendor) => ({
    ...vendor,
    estimatedAnnualProcessingCost: annualVolume * vendor.processingPercent + vendor.fixedFee * Math.max(annualVolume / Math.max(averageTicket, 1), 1)
  }));
}

export function estimateFxCost(volume: number, fxSpread: number) {
  return volume * (fxSpread / 100);
}

export function estimateWorkingCapital(dailySales: number, settlementDays: number) {
  return dailySales * settlementDays;
}
