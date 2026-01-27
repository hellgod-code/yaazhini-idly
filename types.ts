export interface Hotel {
  id: string;
  name: string;
  pricePerIdly: number;
  phoneNumber?: string;
  address?: string;
  color: string; // For UI differentiation
}

export interface DailySale {
  id: string;
  hotelId: string;
  date: string; // ISO YYYY-MM-DD
  morningQuantity: number;
  eveningQuantity: number;
}

export interface Payment {
  id: string;
  hotelId: string;
  date: string; // ISO YYYY-MM-DD
  amount: number;
  note?: string;
}

export type ViewState = 'dashboard' | 'sales' | 'billing' | 'hotels' | 'insights';

// Helper type for billing generation
export interface BillItem {
  date: string;
  morning: number;
  evening: number;
  totalQty: number;
  price: number;
  totalCost: number;
}

export interface BillSummary {
  hotelName: string;
  startDate: string;
  endDate: string;
  items: BillItem[];
  grandTotalQty: number;
  grandTotalCost: number;
  // Financials
  openingBalance: number;
  paymentsReceived: number;
  netPayable: number;
}