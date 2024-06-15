export interface VehicleKind {
    vehicleKindId: number;
    name: string;
    hourPrice: number;
    halfHourPrice: number;
    seats: number;
}

export interface Vehicle {
    vehicle_kind_id_dup?: number;
    vehicle_location_id_dup?: number;
    kind?: VehicleKind;
    vehicleId: number;
    uszkodzony: boolean;
}

export interface Location {
    locationId: number;
    name: string;
    city: string;
    street: string;
}

export interface Order {
    orderId: number;
    startTime: string;
    endTime: string;
    price: number;
}

export interface User {
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    password: string;
    isAdmin: boolean;
}