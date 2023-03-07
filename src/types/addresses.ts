export type NewAddressInput = {
    businessId?: string,
    clientId?: string,
    name?: string,
    company?: string,
    street1: string,
    street2?: string,
    city: string,
    zip: string,
    state: string,
    country: string,
    phone?: string,
    notes?: string;
};

export type AddressData = NewAddressInput & {
    _id?: string;
};