// los datos del usuario
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// respuesta al registrarnos o iniciar sesión
export interface AuthResponse {
  accessToken: string;
  user: User;
}

// info del paquete
export interface PackageItem {
  lengthCm: number;
  heightCm: number;
  widthCm: number;
  weightLb: number;
  content: string;
}

// los datos de quien recibirá
export interface Recipient {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  address: string;
  department: string;
  municipality: string;
  referencePoint?: string;
  instructions?: string;
}

export interface SettlementSummary {
  amountToSettle: number;
}

// la info completa de una orden
export interface Order {
  id: string;
  orderNumber: string;
  pickupAddress: string;
  scheduledDate: string;
  recipient: Recipient;
  packages: PackageItem[];
  packageCount: number;
  status: string;
  cashOnDelivery: boolean;
  expectedCollectionAmount?: number | null;
  actualCollectedAmount?: number | null;
  shippingCost?: number | null;
  codCommission?: number | null;
  settlementAmount?: number | null;
  createdAt: string;
}
