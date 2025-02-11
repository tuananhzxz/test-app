export interface Address {
    id? : number;
    name: string;
    phone : string;
    code : string;
    state : string;
    locality : string;
    address : string;
    city : string;
}

export enum UserRole {
    ROLE_CUSTOMER = 'ROLE_CUSTOMER',
    ROLE_SELLER = 'ROLE_SELLER',
    ROLE_ADMIN = 'ROLE_ADMIN'
}

export interface User {
    id?: number;
    password? : string;
    email: string;
    fullName: string;
    phone? : string;
    role: UserRole;
    addresses : Address[];
}