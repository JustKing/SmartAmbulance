export interface IUser {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  sex: 0 | 1;
  bornYear: string;
  passportSeries: number;
  passportNumber: number;
  insurancePolicySeries: string;
  insurancePolicyNumber: string;
  address: string;
  addressFiasCode: string;
  snils: string;
  medicalCard: IMedicalCard;
}

interface IMedicalCard {
  disability: 0 | 1 | 2 | 3 | 10;
  bloodType: string;
  rhesus: string;
  chronicDiseases: string;
  allergy: string;
  others: string;
}