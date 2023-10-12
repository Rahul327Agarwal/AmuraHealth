export interface IProps {
  products: Array<any>;
  setTreatedProducts: Function;
  setShowLoader: Function;
  defaultNoRamping: boolean;
  prescriptionLength: string;
  setIsPrescriptionApproved: Function;
  setIsProtocolsLoaded: Function;
  errorMessages: string;
  setErrorMessages: Function;
  prescriptionKey: string;
  prescriptionHistory?: any;
}
