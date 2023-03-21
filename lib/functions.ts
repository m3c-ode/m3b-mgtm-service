import { AddressData } from "../src/types/addresses";

export const capitalize = (word: string) => {
    if (word.length === 0) return '';

    return (
        word
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character of each word
            .replace(/^./, function (str) {
                return str.toUpperCase();
            })
    );
};

export const addressParser = (data: AddressData) => {
    const { street1, street2, city, state } = data;
    return `${street2 ? street2 + ', ' : ''}${street1}, ${city}, ${state}`;
};

export const dateTableParser = (value: string | Date) => {
    if (typeof value === 'string') {
        if (value.includes("T")) {
            return value.split("T")[0];
        } else return value;
    } else {
        return new Date(value).toISOString().split('T')[0];
    }
};

export const parsePhoneNumber = (value?: string) => {
    // if (!value) return undefined;
    const phoneNumber = value?.toString().replace(/\D/g, '');
    // return parseInt(phoneNumber!)!;
    return phoneNumber!;
};