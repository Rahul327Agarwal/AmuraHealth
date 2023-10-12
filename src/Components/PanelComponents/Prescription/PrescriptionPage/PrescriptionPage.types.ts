export interface IPrescriptionPageDetails {
  patientName: string;
  issuedOn: string;
  serialNumber: string;
  patientRegion: string;
  prescriptionNumber: string;
  ambroNutrition: {
    prescription: string;
    shoppingList: string;
    consumption7d: string;
    consumption90d: string;
    totalProducts: string;
    totalPrice: string;
    currency: string;
  };
  assortedBrands: {
    prescription: string;
    shoppingList: string;
    consumption7d: string;
    consumption90d: string;
    totalProducts: string;
    totalPrice: string;
    currency: string;
  };
}
