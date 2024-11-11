interface BusinessDetails {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress: string | null;
    logo: string;
    banner: string | null;
  }
  
  interface PickupAddress {
    id: number;
    name: string;
    locality: string;
    address: string | null;
    city: string;
    state: string | null;
    code: string | null;
    phone: string | null;
  }
  
  interface BankDetails {
    accountNumber?: string;
    accountHolder?: string;
  }
  
  export interface ProfileSeller {
    id: number;
    sellerName: string;
    phone: string;
    email: string;
    password: string;
    businessDetails: BusinessDetails;
    bankDetails: BankDetails | null;
    pickupAddress: PickupAddress;
    taxCode: string;
    role: string;
    isEmailVerified: boolean;
    accountStatus: string;
  }

  export interface SellerReport {
    id: number;
    seller : ProfileSeller;
    totalEarnings: number;
    totalRefunds: number;
    totalTax: number
    netEarnings: number;
    totalOrders: number;
    canceledOrders: number;
    totalTransactions : number;
  }